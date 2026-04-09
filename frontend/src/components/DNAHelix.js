import React from "react";

function DNAHelix() {
  const dots = Array.from({ length: 40 });

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
        background: "radial-gradient(circle at center, #020617, #000)"
      }}
    >
      {dots.map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            background: "#00c3ff",
            borderRadius: "50%",
            left: `${i * 2.5}%`,
            top: `${Math.sin(i) * 50 + 50}%`,
            animation: `float 6s infinite ease-in-out`,
            animationDelay: `${i * 0.2}s`,
            boxShadow: "0 0 10px #00c3ff"
          }}
        />
      ))}

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); opacity: 0.3; }
            50% { transform: translateY(-40px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
}

export default DNAHelix;