import { TimePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { HiMiniStar } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";

export default function TimeSelect({
  title = "",
  change = () => {},
  error = "",
  className = "",
  placeholder = "",
  props,
  value = "",
  format = "",
  description,
  required = false,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    console.log(value);
    setDefaultValue(value);
  }, [value]);

  return (
    <div className={` w-full ${className} flex flex-col gap-2 `}>
      <div className="flex">
        <p className="text-xs font-medium 2xl:text-sm dark:text-white">
          {title}
        </p>
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}
      </div>

      <TimePicker
        placeholder={placeholder}
        {...props}
        onChange={(time, timeString) => {
          console.log(timeString);
          change(timeString);
        }}
        size={isSmallScreen ? "default" : "large"}
        className={`w-full ${error ? "border-rose-400" : ""}`}
        value={value ? moment(value, format) : null}
        // defaultOpen={value ? moment(value, format) : null}
        format={format}
        status={error ? "error" : ""}
        style={
          error && {
            boxShadow:
              "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          }
        }
      />
      {error && (
        <FiAlertCircle className="absolute top-3.5 right-5 mr-3 transform -translate-y-2/5 text-red-400" />
      )}
      {error && (
        <p className="flex justify-start items-center mt-2 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
      {description && (
        <p className="text-xs 2xl:text-sm font-normal opacity-70 dark:text-white">
          {description}
        </p>
      )}
    </div>
  );
}
