import { Radio } from "antd";
import React from "react";
import { HiMiniStar } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";

export default function RadioButton({
  change = () => {},
  value = "",
  title = "",
  error = "",
  options = [],
  required = false,
  children,
  gap = 0
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  return (
    <div className={`flex flex-col ${title ? "gap-2" : "gap-0 items-center"} `}>
      <div className="flex dark:text-white">
        <p className="text-xs font-medium 2xl:text-sm dark:text-white">{title}</p>
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}
      </div>
      <Radio.Group
        name="radiogroup"
        defaultValue={value}
        size={isSmallScreen ? "default" : "large"}
        onChange={(e) => {
          change(e.target.value);
        }}
      >
        {options?.map((radio) => (
          <Radio value={radio.value}><span className="text-xs 2xl:text-sm dark:text-white">{radio.label}</span></Radio>
        ))}
        {/* <Radio value={"male"}>Male</Radio>
        <Radio value={"female"}>Female</Radio> */}
      </Radio.Group>
      {/* <Radio.Group
        onChange={(e) => {
          change(e.target.value);
        }}
        value={value}
        name="radiogroup"
      >
        {children}
        {/* {options?.map((radio) => (
          <Radio value={radio.value}>{radio.label}</Radio>
        ))} 
      
      </Radio.Group> */}
      {error && (
        <p className=" flex justify-start items-center my-1 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
