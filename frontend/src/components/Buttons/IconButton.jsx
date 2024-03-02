import React from 'react';

function IconButton({ className, onClick, icon }) {
  return (
    <button onClick={onClick} className={`${className}`}>
      {icon}
    </button>
  );
}

export default IconButton;
