import { DatePicker } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import { HiMiniStar } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";
import React from "react";

export default function DateSelect({
  change = () => {},
  className,
  picker = "",
  dateFormat = "YYYY-MM-DD", // Default date format
  value = "",
  title = "",
  description = "",
  error = "",
  required = false,
  placeholder = "",
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  return (
    <div className={`${className} flex flex-col gap-2 relative`}>
      <div className="flex">
        {title && (
          <label
            htmlFor=""
            className="text-xs font-medium 2xl:text-sm dark:text-white"
          >
            {title}
          </label>
        )}
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}
      </div>

      <DatePicker
        format={dateFormat} // Pass the provided date format
        onChange={(date, dateString) => {
          console.log(dateString);
          change(dateString);
        }}
        status={error && "error"}
        size={isSmallScreen ? "default" : "large"}
        placeholder={placeholder}
      />

      {error && (
        <FiAlertCircle className="absolute top-3.5 mt-6 right-8 -mr-1 transform -translate-y-2/5 text-red-400" />
      )}

      {description && (
        <p className="text-sm font-normal opacity-70">{description}</p>
      )}

      {error && (
        <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
