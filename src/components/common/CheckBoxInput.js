import { Checkbox } from "antd";
import React from "react";

export default function CheckBoxInput({ change = () => {}, value }) {
  return (
    <Checkbox
      checked={value}
      onChange={(e) => {
        change(e.target.checked);
      }}
    />
  );
}
