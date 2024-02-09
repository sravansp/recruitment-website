import { Select } from "antd";
import React from "react";
import dollar from "../../assets/images/fi-ss-dollar.png";

export default function CustomDropDown({ OptionData = [] }) {
  const Option = { Select };

  return (
    <Select
      className="text-white dark:bg-secondaryDark"
      style={{
        width: "100%",
      }}
      value={""}
      onChange={(value, option) => {}}
      size="large"
      optionFilterProp="children"
      filterSort={(optionA, optionB) => {
        const labelA = optionA.children?.toString().toLowerCase();
        const labelB = optionB.children?.toString().toLowerCase();
        return labelA.localeCompare(labelB);
      }}
    >
      {OptionData.map((language) => (
        <Option key={language.value} value={language.value}>
          <div className="flex items-center gap-3 country-option">
            <div>
              <img src={dollar} alt="" />
              {/* <FlagIcon code={language.code} className="w-5 h-5 rounded-full" /> */}
            </div>
            <span>{language.label}</span>
          </div>
        </Option>
      ))}
    </Select>
  );
}
