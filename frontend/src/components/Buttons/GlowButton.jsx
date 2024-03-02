import React from 'react';

function GlowButton({ className, text, onClick }) {
  return (
    <div className={`buttonNeon ${className}`} onClick={onClick}>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {text}
      </div>
    </div>
  );
}

export default GlowButton;
