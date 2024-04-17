import { Select, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

// const options = [
//   {
//     value: "goldw",
//   },
//   {
//     value: "limex",
//   },
//   {
//     value: "green",
//   },
//   {
//     value: "cyan",
//   },
// ];
// const tagRender = (props) => {
//   const { label, value, closable, onClose } = props;
//   const onPreventMouseDown = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };
//   return (
//     <Tag
//       color={value}
//       onMouseDown={onPreventMouseDown}
//       closable={closable}
//       onClose={onClose}
//       style={{
//         marginRight: 3,
//       }}
//       bordered={false}
//     >
//       {label}
//     </Tag>
//   );
// };

export default function MultiSelect({
  title = "",
  value = [],
  options = [],
  placeholder = "",
  change = () => {},
  onSearch = () => {},
  error = "",
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  let textColor = "black"; // Default text color

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getOptionStyle = (optionValue) => {
    if (optionValue === "break") {
      textColor = "#fff";
    } else if (optionValue === "c12") {
      textColor = "blue";
    } else if (optionValue === "h17") {
      textColor = "green";
    } else if (optionValue === "j19") {
      textColor = "purple";
    } else if (optionValue === "k20") {
      textColor = "orange";
    }

    return {
      textColor,
    };
  };

  const selectProps = {
    mode: "multiple",
    style: {
      color: textColor,
      width: "100%",
      // height: 40,
      boxShadow: error
        && "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        // : value &&
          // "0px 0px 0px 4px #F4EBFF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      // borderRadius: error ? "8px" : "none",
      border: error ? "0.5px solid #f76002" : "none",
      borderRadius: "7px",
    },
    value,
    options,
    onChange: (newValue) => {
      change(newValue);
    },
    filterOption: { filterOption },
    placeholder: placeholder,
    maxTagCount: "responsive",
  };
  const tagRender = (props) => {
    const { label, value, closable, onClose, color } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    
    return (
      <div className=" px-0.5" onMouseDown={onPreventMouseDown}>
        <span className=" flex items-center gap-1 bg-[#F9F5FF] rounded-xl p-1 ">
          <p className=" text-[#6941C6] font-medium">{label}</p>
          {closable && (
            <IoClose
              className=" cursor-pointer font-bold text-[10px] text-[#9E77ED]"
              onClick={(e) => onClose(e)}
            />
          )}
        </span>
      </div>
      // <Tag
      //   color={color}
      //   onMouseDown={onPreventMouseDown}
      //   closable={closable}
      //   onClose={onClose}
      //   style={{
      //     marginRight: 3,
      //   }}
      //   className={`text-[${"primary"}]`}
      //   optionSelectedColor="primary  "
      // >
      //   {label}
      // </Tag>
    );
  };
  const selectedValues = options.filter((option) => value.includes(option.value));
  return (
    <div className="relative block dark:text-white ">
      {title && (
        <label className="text-xs font-medium 2xl:text-sm dark:text-white">
          {title}
        </label>
      )}
 

      
      <Space
        direction="vertical"
        style={{ width: "100%", marginBottom: "16px" }}
        className="mt-[6px]"
        status={`  ${error && "error"}`}
      >
        <Select
          tagRender={tagRender}
          showSearch
          onSearch={onSearch}
          size={isSmallScreen ? "default" : "large"}
          style={{
            option: (base, state) => ({
              ...base,
              ...getOptionStyle(state.isSelected),
              ":active": {
                ...getOptionStyle(state.isSelected),
                backgroundColor: state.isSelected ? "blue" : "green",
              },
              optionSelectedColor: "black",
            }),
          }}
          {...selectProps}
        />
        {error && (
          <FiAlertCircle className="absolute top-3.5 right-4 mr-5 mt-5 transform -translate-y-3/5 text-red-400" />
        )}
      </Space>

      {error && (
        <p className=" flex justify-start items-center mb-0 text-[10px] text-red-600 ">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
      <div className="flex items-center gap-3 selectedAttendies">
      {selectedValues.length > 0 && (
        <div className="flex">
          {selectedValues.map((selected) => {
            const fullNameParts = selected.label.split(' ');
            let displayName = fullNameParts[0]; // First name
            if (fullNameParts.length > 2) {
              displayName += ` ${fullNameParts[1]}`; // Middle name
            }
            return (
              <div key={selected.value} className="mr-2">
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/60x60"
                    alt=""
                    className="rounded-full size-12"
                  />
                  
                  {/* <span title={selected.label}>{displayName}</span> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}
