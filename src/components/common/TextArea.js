import { Input } from "antd";
import React, { useState } from "react";
import { FiAlertCircle } from 'react-icons/fi';
import { HiMiniStar } from "react-icons/hi2";
import { TbNorthStar } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive';

export default function TextArea({
  className = "",
  title = "",
  error = "",
  placeholder = "",
  change = () => { },
  value = "",
  required = false,
  rows = "",
  hideBorder = false,
  maxLength=250,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const { TextArea } = Input;

  const [letterCount, setLetterCount] = useState(value?.length);
  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    setLetterCount(inputValue.length);
    change(inputValue);
  };

  return (
    <div className={` ${className}  relative flex flex-col gap-1`}>
      <div className="flex">
        {
          <label className="text-xs font-medium 2xl:text-sm dark:text-white">
            {title}
          </label>
          
        }        {required && <TbNorthStar className="text-[10px] text-rose-600" />}
      </div>
      <div style={{ position: "relative" }}>
        <TextArea
          rows={4}
          name=""
          id=""
          placeholder={placeholder}
          value={value}
          onChange={handleChange} 
          size={isSmallScreen ? "default" : "large"}
          className={`w-full ${hideBorder ? "border-none" : "border"} rounded-lg text-sm mt-[6px] dark:bg-black`}
          style={{
            ...(error && {
              boxShadow:
                "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            }),
          }}
          status={error ? "error" : ""}
        />

        {error && (
          <FiAlertCircle className="absolute text-red-400 transform top-12 right-5 -translate-y-1/5" />
        )}
      </div>
      {error && (
        <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
       <p className="text-xs text-gray-500">{letterCount}/{maxLength}</p>
    </div>
  );
}
