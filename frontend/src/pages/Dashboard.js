import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div style={{ width: "100%", maxWidth: 980, display: "grid", gap: 24, padding: 28, borderRadius: 32, background: "rgba(7,19,43,0.94)", border: "1px solid rgba(56,189,248,0.18)", boxShadow: "0 28px 90px rgba(0,0,0,0.28)" }}>
        <section style={{ display: "grid", gap: 16 }}>
          <div>
            <h1 style={{ color: "#e0f2fe", fontSize: 38, margin: 0 }}>Welcome back, Doctor</h1>
            <p style={{ color: "#94a3b8", fontSize: 16, marginTop: 8, lineHeight: 1.75 }}>
              Upload your patient&apos;s VCF data, run sequence analysis, and review variant insights with HoloGene AI.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <div style={{ padding: 18, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 style={{ color: "#dbeafe", margin: 0, fontSize: 22 }}>Clinical Workflow</h2>
              <p style={{ color: "#a5b4fc", marginTop: 8, fontSize: 15 }}>1. Authenticate as provider. 2. Browse dashboard. 3. Upload VCF. 4. Review the report.</p>
            </div>
            <div style={{ padding: 18, borderRadius: 24, background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.16)" }}>
              <h2 style={{ color: "#bfdbfe", margin: 0, fontSize: 22 }}>Ready for analysis</h2>
              <p style={{ color: "#c7d2fe", marginTop: 8, fontSize: 15 }}>Click below to upload your VCF file or paste its contents manually for the AI-assisted genomics review.</p>
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gap: 18 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/analyze")}
              style={{ flex: "1 1 220px", minWidth: 200, borderRadius: 18, border: "none", background: "linear-gradient(135deg, #06b6d4, #0ea5e9)", color: "white", padding: "16px 20px", fontSize: 16, cursor: "pointer" }}
            >
              Start VCF analysis
            </button>
            <button
              onClick={() => window.open("https://www.example.com/vcf-format", "_blank")}
              style={{ flex: "1 1 220px", minWidth: 200, borderRadius: 18, border: "1px solid rgba(255,255,255,0.14)", background: "transparent", color: "#cbd5e1", padding: "16px 20px", fontSize: 16, cursor: "pointer" }}
            >
              VCF format help
            </button>
          </div>
          <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 style={{ color: "#f8fafc", margin: 0, fontSize: 18 }}>Quick notes</h3>
            <ul style={{ marginTop: 12, paddingLeft: 20, color: "#cbd5e1", lineHeight: 1.8 }}>
              <li>Only VCF text or file uploads are required.</li>
              <li>Results include detected variants and AI summary.</li>
              <li>If analysis stalls, check the backend server at port 5000.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
