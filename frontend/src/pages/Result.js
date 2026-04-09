import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const analysis = location.state || {};
  const summary = analysis.summary || {};
  const variants = analysis.variants || [];
  const aiSummary = analysis.aiSummary || "";

  if (!analysis || !analysis.summary) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 680, textAlign: "center", padding: 28, borderRadius: 26, background: "rgba(7,19,43,0.94)", border: "1px solid rgba(56,189,248,0.18)" }}>
          <h1 style={{ color: "#f8fafc", fontSize: 32, marginBottom: 18 }}>No analysis results available</h1>
          <p style={{ color: "#94a3b8", marginBottom: 24 }}>Please start from the dashboard and submit a VCF file for analysis.</p>
          <button onClick={() => navigate("/dashboard")} style={{ borderRadius: 18, border: "none", background: "#0ea5e9", color: "white", padding: "14px 24px", cursor: "pointer" }}>
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 24, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 1100, display: "grid", gap: 24 }}>
        <div style={{ padding: 24, borderRadius: 32, background: "rgba(7,19,43,0.94)", border: "1px solid rgba(56,189,248,0.18)" }}>
          <h1 style={{ color: "#e2e8f0", fontSize: 34, margin: 0 }}>Analysis complete</h1>
          <p style={{ color: "#94a3b8", marginTop: 10, fontSize: 16 }}>Review the variant summary and AI interpretation below.</p>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
            <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>Patient count</h3>
              <p style={{ color: "#93c5fd", fontSize: 28, fontWeight: 700, margin: "12px 0 0" }}>{summary.sampleCount ?? "-"}</p>
            </div>
            <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>Variants detected</h3>
              <p style={{ color: "#93c5fd", fontSize: 28, fontWeight: 700, margin: "12px 0 0" }}>{summary.variantCount ?? "-"}</p>
            </div>
            <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ color: "#e2e8f0", margin: 0, fontSize: 18 }}>Important signal</h3>
              <p style={{ color: "#7dd3fc", fontSize: 22, fontWeight: 700, margin: "12px 0 0" }}>{summary.keyFinding ?? "Stable"}</p>
            </div>
          </div>

          {aiSummary ? (
            <div style={{ padding: 22, borderRadius: 28, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.16)" }}>
              <h2 style={{ color: "#dbeafe", margin: 0, fontSize: 22 }}>AI summary</h2>
              <p style={{ color: "#c7d2fe", marginTop: 14, lineHeight: 1.8, whiteSpace: "pre-line" }}>{aiSummary}</p>
            </div>
          ) : null}

          <div style={{ borderRadius: 28, overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ padding: 20, borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(15,23,42,0.96)" }}>
              <h2 style={{ color: "#e2e8f0", margin: 0, fontSize: 22 }}>Variant details</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 740 }}>
                <thead>
                  <tr style={{ color: "#94a3b8", textAlign: "left", fontSize: 14, borderBottom: "1px solid rgba(148,163,184,0.18)" }}>
                    <th style={{ padding: "16px 18px" }}>Chrom</th>
                    <th style={{ padding: "16px 18px" }}>Position</th>
                    <th style={{ padding: "16px 18px" }}>ID</th>
                    <th style={{ padding: "16px 18px" }}>Ref</th>
                    <th style={{ padding: "16px 18px" }}>Alt</th>
                    <th style={{ padding: "16px 18px" }}>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.length ? (
                    variants.map((variant, index) => (
                      <tr key={index} style={{ color: "#e2e8f0", borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                        <td style={{ padding: "14px 18px" }}>{variant.chrom}</td>
                        <td style={{ padding: "14px 18px" }}>{variant.pos}</td>
                        <td style={{ padding: "14px 18px" }}>{variant.id || "-"}</td>
                        <td style={{ padding: "14px 18px" }}>{variant.ref}</td>
                        <td style={{ padding: "14px 18px" }}>{variant.alt}</td>
                        <td style={{ padding: "14px 18px" }}>{variant.impact}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ padding: "18px", color: "#94a3b8" }}>
                        No variants found from the uploaded VCF.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={() => navigate("/analyze")} style={{ borderRadius: 18, border: "none", background: "#38bdf8", color: "white", padding: "14px 24px", cursor: "pointer" }}>
            Analyze another file
          </button>
          <button onClick={() => navigate("/dashboard")} style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.16)", background: "transparent", color: "#cbd5e1", padding: "14px 24px", cursor: "pointer" }}>
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
