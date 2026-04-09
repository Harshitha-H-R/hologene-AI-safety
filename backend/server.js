const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const parseVcf = (vcfText) => {
  const lines = vcfText.split(/\r?\n/).filter((line) => line.trim() && !line.startsWith("#"));
  const variants = lines.map((line) => {
    const [chrom, pos, id, ref, alt, qual, filter, info] = line.split("\t");
    const impact = alt && ref && alt.length > ref.length ? "High" : "Moderate";
    return {
      chrom: chrom || "-",
      pos: pos || "-",
      id: id === "." ? "" : id || "",
      ref: ref || "-",
      alt: alt || "-",
      impact,
      info: info || "",
    };
  });

  return variants.filter((variant) => variant.chrom && variant.pos && variant.ref && variant.alt);
};

const buildSummary = (variants) => ({
  sampleCount: 1,
  variantCount: variants.length,
  keyFinding: variants.length > 0 ? "Potential clinically relevant variants detected" : "No high-priority variants detected",
});

const createAiSummary = async (variants, summary) => {
  if (!process.env.OPENAI_API_KEY) {
    return "OpenAI key is not configured. Analysis was generated from local VCF parsing only.";
  }

  const prompt = `You are a clinical genomics assistant. Summarize the following patient variant analysis.\n\nSummary:\n- Sample count: ${summary.sampleCount}\n- Variant count: ${summary.variantCount}\n- Key finding: ${summary.keyFinding}\n\nVariants:\n${variants.map((variant) => `- ${variant.chrom}:${variant.pos} ${variant.ref}>${variant.alt} (${variant.impact})`).join("\n")}`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful clinical genomics assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 340,
    });

    return completion.data.choices?.[0]?.message?.content?.trim() || "AI returned no summary.";
  } catch (error) {
    console.error("OpenAI request error:", error.message || error);
    return "AI summary is unavailable due to an OpenAI request error.";
  }
};

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "HoloGene AI backend is running." });
});

app.post("/api/analyze", upload.single("vcfFile"), async (req, res) => {
  try {
    let vcfText = "";
    if (req.file) {
      vcfText = req.file.buffer.toString("utf8");
    } else if (req.body.vcfText) {
      vcfText = req.body.vcfText.toString();
    }

    if (!vcfText.trim()) {
      return res.status(400).json({ error: "No VCF content received. Please upload a valid .vcf file or paste the file text." });
    }

    const variants = parseVcf(vcfText);
    const summary = buildSummary(variants);
    const aiSummary = await createAiSummary(variants, summary);

    return res.json({ summary, variants, aiSummary });
  } catch (error) {
    console.error("Analysis error:", error);
    return res.status(500).json({ error: "Server error during analysis. Please try again." });
  }
});

app.listen(port, () => {
  console.log(`HoloGene AI backend listening on port ${port}`);
});
