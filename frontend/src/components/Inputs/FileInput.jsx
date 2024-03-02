import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

export function FileInput(props) {
  return (
    <label
      className={`flex flex-col items-center px-4 py-4 bg-primary text-text-color rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white ${props.className}`}
    >
      <FaCloudUploadAlt className="text-2xl" />
      <span className="mt-2 text-lg">{props.text}</span>
      <input type="file" className="hidden" onChange={props.handleSelectFile} />
    </label>
  );
}
