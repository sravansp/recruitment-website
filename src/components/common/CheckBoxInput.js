import { Checkbox } from "antd";
import React from "react";

export default function CheckBoxInput({ change = () => {}, value, title, description }) {
  return (
    <div>
      <Checkbox
        checked={value}
        onChange={(e) => {
          change(e.target.checked);
        }}
      >
        {title}
      </Checkbox>
      {description && <p>{description}</p>}
    </div>
  );
}