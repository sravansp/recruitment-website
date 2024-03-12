"use client";
import { useEffect } from "react";
import { Switch } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';

export default function ToggleBtn({
  title = "",
  change = () => { },
  value = false,
  width = "",
  text = false,
  flexText = false,
  className,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  const [isChecked, setIsChecked] = useState(value);
  const [ontext, setOntext] = useState();

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <div className={`flex flex-col gap-2 ${className}`} width={width}>
      {title && <label className="text-xs 2xl:text-sm">{title}</label>}
      <Switch
        checked={isChecked}
        onChange={(checked) => {
          setIsChecked(checked);
          change(checked);
        }}
        className={`w-fit`}
        // className={`bg-[#F2F4F7] w-fit`}
        size={isSmallScreen ? "small" : "default"}
      />
      {text && (
        <span className="flex items-center px-2 text-sm">{ontext}</span>
      )}
    </div>
  );
}


