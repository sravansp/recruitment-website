import React from "react";
import { Button } from "antd";
import { IoMdAdd } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

export default function ButtonClick({
  handleSubmit = () => {},
  updateFun = () => {},
  updateBtn = false,
  buttonName = "",
  className,
  BtnType = "",
  icon,
  iconAdd = false,
  backgroundColor, // Add backgroundColor prop
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
        return "default";
    }
  };

  const buttonStyle = {
    backgroundColor: backgroundColor // Apply backgroundColor to inline style
  };

  return (
    <Button
      icon={BtnType.toLowerCase() === "add" ? (
        <IoMdAdd />
      ) : icon ? (
        icon
      ) : iconAdd === true && (
        <IoMdAdd />
      )}
      onClick={() => (!updateBtn ? handleSubmit() : updateFun())}
      type={getButtonType()}
      size={isSmallScreen ? "default" : "large"}
      className={`
      ${
        (BtnType.toLowerCase() === "add" || getButtonType() === "primary") &&
        "bg-accent"
      } ${
        getButtonType() === "default" || getButtonType() === ""
          ? ` ${className}!bg-white dark:!bg-transparent`
          : ""
      } text-xs 2xl:text-sm font-medium w-fit flex items-center justify-center leading-6 z-50 ${className}`}
        style={{ backgroundColor }} // Set background color inline style
    >
      {buttonName}
    </Button>
  );
}
