import { Popover, Select } from "antd";
import React from "react";
import { FlagIcon } from "react-flag-kit";
import { FiAlertCircle } from "react-icons/fi";
import { HiMiniStar } from "react-icons/hi2";
import { IoAlertCircleOutline } from "react-icons/io5";
// import logo from "../../assets/images/Avatar.png";
import { useMediaQuery } from "react-responsive";
import { FaAsterisk } from "react-icons/fa";

export default function Dropdown({
  title = "",
  formik,
  value = null,
  change = () => {},
  options = [],
  error = "",
  placeholder = "",
  className = "",
  onSearch = () => {},
  styles,
  description,
  required = false,
  descriptionTop = "",
  rightIcon = false,
  PopoverContent = {},
  icondropDown = false,
  icon = false,
  image = false,
}) {
  console.log(options,"hi");
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const { Option } = Select;

  return (
    <div className={`${className} flex flex-col gap-2`}>
      {title && (
        <div className="flex flex-col gap-0.5">
          <div className="flex dark:text-white">
            <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
              {title}
            </label>

            {required && <FaAsterisk className="text-[10px] text-rose-600" />}
          </div>
          {descriptionTop && (
            <p className="text-xs font-medium opacity-50 dark:text-white">
              {descriptionTop}
            </p>
          )}
        </div>
      )}
      {/* <div className="relative flex items-center "> */}
      {icondropDown ? (
        <Select
          showSearch
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={change}
          onSearch={onSearch}
          filterOption={filterOption}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          // options={options}
          className={` rounded-lg capitalize `} //${title && "mt-[6px]"}
          style={{
            ...styles,
            borderRadius: "8px",
            boxShadow: error
              ? "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              : "", // Add box shadow for error
          }}
          menuItemSelectedIcon={<HiMiniStar className="text-[10px]" />}
          value={value}
          status={`${error && "error"}`}
          size={isSmallScreen ? "default" : "large"}
          optionLabelProp="label"
          formik={formik}
        >
          {options?.map((each, i) => (
            <Option key={i} value={each.value}>
              <div className="flex flex-col gap-1 country-option">
                <div className="flex items-center gap-2">
                {each.icon}
                  {/* {image && (
                    <img
                      src={each.image}
                      alt=""
                      className="w-5 h-5 rounded-full"
                    />
                  )} */}
                  {/* <FlagIcon code={91} className="w-5 h-5 rounded-full" />
                    <span>mkck</span> */}
                    <span>{each.label}</span>
                </div>
                
                <p class="text-gray-500 text-xs font-medium font-['Inter'] leading-none">
                  {each.description}
                </p>
              </div>
            </Option>
          ))}
        </Select>
      ) : (
        <Select
          showSearch
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={change}
          onSearch={onSearch}
          filterOption={filterOption}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options}
          className={`w-full rounded-lg capitalize `}
          style={{
            ...styles,
            borderRadius: "8px",
            boxShadow: error
              ? "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              : "", // Add box shadow for error
          }}
          menuItemSelectedIcon={<HiMiniStar className="text-[10px]" />}
          value={value}
          status={`${error && "error"}`}
          size={isSmallScreen ? "default" : "large"}
        />
      )}
      {error && (
        <FiAlertCircle className="absolute top-2.7 right-8 -mr-1 transform -translate-y-2/5 text-red-400" />
      )}
      {rightIcon && (
        <Popover
          content={PopoverContent}
          style={{
            borderRadius: "13.45px",
          }}
        >
          <IoAlertCircleOutline className="pl-1 text-xl opacity-50" />
        </Popover>
      )}
      {/* </div> */}
      {description && (
        <p className="text-xs font-normal 2xl:text-sm opacity-70 dark:text-white">
          {description}
        </p>
      )}
      {error && (
        <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
