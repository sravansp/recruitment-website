import React from 'react';
import 'react-quill/dist/quill.snow.css'; // import the styles

const Toolbar = () => {
  return (
    <div>
      {/* Customize the toolbar as needed */}
      <div id="toolbar">
        <select className="ql-header" defaultValue="">
          <option value="1"></option>
          <option value="2"></option>
          <option value=""></option>
        </select>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
      </div>
    </div>
  );
};

export default Toolbar;
