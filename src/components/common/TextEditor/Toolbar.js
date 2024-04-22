import React from 'react';

const Toolbar = ({ handleChange }) => {
  return (
    <div id="toolbar">
      <select
        className="ql-header"
        defaultValue=""
        onChange={(e) => e.persist() || handleChange(e.target.value)}
      >
        <option value="1"></option>
        <option value="2"></option>
        <option value=""></option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button className="ql-blockquote"></button>
      <select className="ql-size" defaultValue=""></select>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
      <button className="ql-clean"></button>
    </div>
  );
};

export default Toolbar;
