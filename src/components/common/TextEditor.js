
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ value, onChange, modules }) => {
  const handleChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
    />
  );
};

export default TextEditor;
