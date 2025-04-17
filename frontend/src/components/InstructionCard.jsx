import React from 'react';

function InstructionCard({ title, children }) {
  return (
    <div className="instruction-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default InstructionCard;
