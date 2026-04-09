import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Analyze() {
  const [vcfText, setVcfText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setError("");
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setVcfText("");
    }
  };

  const handleSubmit = async () => {
    setError("");
    setStatus("Submitting analysis...");

    if (!selectedFile && !vcfText.trim()) {
      setError("Please upload a VCF file or paste VCF text.");
      setStatus("");
      return;
    }

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("vcfFile", selectedFile);
      } else {
        formData.append("vcfText", vcfText.trim());
      }

      const response = await axios.post("http://localhost:5000/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        navigate("/result", { state: response.data });
      } else {
        setError("Analysis returned no data.");
      }
    } catch (submitError) {
      setError(submitError.response?.data?.error || submitError.message || "Request failed.");
    } finally {
      setStatus("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 900, padding: 28, borderRadius: 32, background: "rgba(6,16,36,0.94)", border: "1px solid rgba(96,165,250,0.16)", boxShadow: "0 30px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <h1 style={{ color: "#e2e8f0", fontSize: 34, margin: 0 }}>Analyze VCF Data</h1>
            <p style={{ color: "#94a3b8", marginTop: 10, fontSize: 16 }}>Upload a .vcf file or paste the file content below, then submit to run HoloGene AI sequence analysis.</p>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <label style={{ display: "block", color: "#cbd5e1", fontSize: 14 }}>
              Pick a VCF file
              <input
                type="file"
                accept=".vcf,text/vcf"
                onChange={handleFileChange}
                style={{ marginTop: 10, width: "100%" }}
              />
            </label>

            <label style={{ display: "block", color: "#cbd5e1", fontSize: 14 }}>
              Or paste VCF content
              <textarea
                value={vcfText}
                onChange={(e) => {
                  setVcfText(e.target.value);
                  setSelectedFile(null);
                }}
                placeholder="##fileformat=VCFv4.3\n#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO\n..."
                rows={12}
                style={{ width: "100%", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#f8f9fa", padding: 16, fontFamily: "monospace", resize: "vertical" }}
              />
            </label>

            {selectedFile ? (
              <div style={{ color: "#7dd3fc", fontSize: 14 }}>
                Selected file: <strong>{selectedFile.name}</strong>
              </div>
            ) : null}

            {error ? (
              <div style={{ padding: 14, borderRadius: 18, background: "rgba(248,113,113,0.18)", color: "#fecaca" }}>{error}</div>
            ) : null}

            {status ? (
              <div style={{ padding: 14, borderRadius: 18, background: "rgba(59,130,246,0.16)", color: "#bfdbfe" }}>{status}</div>
            ) : null}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={handleSubmit}
                style={{ flex: "1 1 220px", minWidth: 180, borderRadius: 18, border: "none", background: "linear-gradient(135deg, #38bdf8, #0ea5e9)", color: "white", padding: "16px 22px", fontSize: 16, cursor: "pointer" }}
              >
                Submit analysis
              </button>
              <button
                type="button"
                onClick={() => {
                  setVcfText("");
                  setSelectedFile(null);
                  setError("");
                }}
                style={{ flex: "1 1 180px", minWidth: 180, borderRadius: 18, border: "1px solid rgba(148,163,184,0.32)", background: "transparent", color: "#cbd5e1", padding: "16px 22px", fontSize: 16, cursor: "pointer" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
