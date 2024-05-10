import { Input } from "antd";
import React, { useRef, useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { HiMiniStar } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";

export default function FormInput({
  title = "",
  type = "text",
  placeholder = "",
  value = "",
  icon = "",
  className = "",
  phoneNumber,
  websiteLink,
  change = () => { },
  error = "",
  width = "full",
  description,
  required = false,
  maxLength = 30,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    change(inputValue);
  };

  return (
    <div className={`flex flex-col ${title ? "gap-2" : "gap-0 items-center "} `}>
      <div className="flex">
        <p className={`text-xs font-medium 2xl:text-sm dark:text-white ${className}`}>
          {title}
        </p>
        {required && <FaAsterisk className="text-[8px] text-rose-600" />}
      </div>
      {websiteLink ? (
        <span className="relative w-full ">
          <Input
            addonBefore="http://"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => change(e.target.value)}
            className={`rounded-lg w-full pl-0 text-sm relative ${className}  ${error ? "border-rose-400" : ""
              }`}
            status={error ? "error" : ""}
            size={isSmallScreen ? "default" : "large"}
            style={
              error && {
                boxShadow:
                  "0px 0px 0px 4px #FEE4E2, 0px 2px 4px 0px rgba(16, 24, 40, 0.05)",
              }
            }
          />

          {error && (
            <FiAlertCircle className="absolute top-2.5 right-2 mr-3 transform -translate-y-1/5 text-red-400" />
          )}

          {error && (
            <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
              <span className="text-[10px] pl-1">{error}</span>
            </p>
          )}
        </span>
      ) : (
        <span className="relative w-full ">
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={`w-full relative dark:text-white ${className} 
            } ${error ? "border-rose-400" : ""}`}
            status={error ? "error" : ""}
            size={isSmallScreen ? "default" : "large"}
            prefix={icon && icon}
            style={
              error && {
                boxShadow:
                  "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              }
            }
          />

          {error && (
            <FiAlertCircle className="absolute top-2.5 right-2 mr-3 transform -translate-y-1/5 text-red-400" />
          )}

          {/* {icon && (
            <span className="absolute text-2xl opacity-50 top-2 left-2">
              {icon}
            </span>
          )} */}
          {error && (
            <p className=" flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
              <span className="text-[10px] pl-1">{error}</span>
            </p>
          )}
        </span>
      )}
      {description && (
        <p className="2xl:text-sm text-xs font-normal opacity-70 dark:text-white">
          {description}
        </p>
      )}
    </div>
  );
}
