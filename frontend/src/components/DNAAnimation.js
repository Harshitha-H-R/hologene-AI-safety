import React from 'react';

export default function DNAAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
      <div className="helix-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="dna-strand" style={{ animationDelay: `${i * 0.2}s`, top: `${i * 5}%` }}>
            <div className="dot dot-1"></div>
            <div className="bar"></div>
            <div className="dot dot-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}