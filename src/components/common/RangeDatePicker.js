import React, { useState } from "react";
import { DatePicker } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import { HiMiniStar } from "react-icons/hi2";

const { RangePicker } = DatePicker;

export default function RangeDatePicker({
  change = () => {},
  className,
  picker = "",
  dateFormat = "",
  value = "",
  title = "",
  description = "",
  error = "",
  required = false,
}) {
  const [dates, setDates] = useState(null);
  const [values, setValues] = useState(null);
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 61;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 61;
    return !!tooEarly || !!tooLate;
  };
  const onOpenChange = (open) => {
    console.log(open);
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
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

      <RangePicker
        value={dates || values}
        disabledDate={disabledDate}
        onCalendarChange={(val) => {
          setDates(val);
        }}
        onChange={(val, date) => {
          console.log(val);
          setValues(val);
          change(date);
        }}
        onOpenChange={onOpenChange}
        changeOnBlur
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
