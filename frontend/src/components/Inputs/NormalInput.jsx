import React, { useRef, useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa';

function NormalInput({ type, className, value, id, placeholder, onChange, copy = false, ...extra }) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  function copyText() {
    if (!inputRef?.current?.value) return;
    navigator.clipboard.writeText(inputRef?.current?.value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <div className="relative flex w-full flex-wrap items-center">
      <input
        ref={inputRef}
        type={`${type ? type : "text"}`}
        id={id}
        placeholder={placeholder}
        className={`input_1 ${className}`}
        value={value}
        onChange={(e) => onChange(e)}
        {...extra}
      />
      {copy && (
        <span className="z-10 h-full absolute right-4 flex_center">
          {copied ? (
            <FaCheck className="text-primary" />
          ) : (
            <FaCopy onClick={copyText} className="cursor-pointer" />
          )}
        </span>
      )}
    </div>
  );
}

export default NormalInput;
