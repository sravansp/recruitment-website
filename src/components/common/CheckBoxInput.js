import { Checkbox } from "antd";
import React from "react";

export default function CheckBoxInput({ onChange = () => {}, checked, actionId, roleId }) {
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => {
        const isChecked = e.target.checked;
        onChange(isChecked, actionId, roleId); // Notify the parent component about the change
      }}
    />
  );
}