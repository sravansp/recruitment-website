
import { Button, Tooltip } from "antd";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LuMailPlus } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
 
export default function ButtonClick({
  handleSubmit = () => {},
  updateFun = () => {},
  updateBtn = false,
  buttonName,
  className,
  BtnType = "", // Updated prop name to avoid conflict with BtnType
  icon,
  danger = false,
  tooltip = "",
  children,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
 
  const getButtonType = () => {
    switch (BtnType.toLowerCase()) {
      case "add":
        return "primary";
      case "text":
        return "text";
      case "link":
        return "link";
      case "primary":
        return "primary";
      default:
        return "default"; // Default to "primary" type if the type is not recognized
    }
  };
 
  return danger ? (
    <Button
      icon={BtnType.toLowerCase() === "add" ? <IoMdAdd /> : icon}
      onClick={() => (!updateBtn ? handleSubmit() : updateFun())}
      type={getButtonType()}
      size={isSmallScreen ? "default" : "large"}
      danger={danger}
      className={` text-xs 2xl:text-sm font-medium w-fit flex items-center justify-center leading-6 z-50 ${className}`}
    >
      {buttonName} {children}
    </Button>
  ) : (
    <Tooltip placement="top" title={tooltip}>
      <Button
        icon={BtnType.toLowerCase() === "add" ? <IoMdAdd /> : icon}
        onClick={() => (!updateBtn ? handleSubmit() : updateFun())}
        type={getButtonType()}
        size={isSmallScreen ? "default" : "large"}
        className={` ${
          (BtnType.toLowerCase() === "add" || getButtonType() === "primary") &&
          "bg-accent"
        } text-xs 2xl:text-sm font-medium w-fit flex items-center justify-center leading-6 z-50 ${className}`}
      >
        {buttonName} {children}
      </Button>
    </Tooltip>
  );
}
 