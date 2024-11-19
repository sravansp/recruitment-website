import { Checkbox } from "antd";
import React from "react";
import { HiMiniStar } from "react-icons/hi2";

export default function CheckBoxInput({
  change = () => {},
  value = "",
  title = "",
  titleRight = "",
  titleDescription = "",
  required = false,
  actionId = null,
  roleId = null,
}) {
  return (
    <div className={`flex flex-col ${title ? "gap-2" : "gap-0 "} `}>
      <div className="flex">
        <p className="text-xs font-medium 2xl:text-sm dark:text-white ">
          {/* {title} */}
        </p>
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}
      </div>
      <div className={`${titleRight ? " flex items-center gap-2" : null}`}>
        <Checkbox
          checked={value}
          onChange={(e) => {
            const isChecked = e.target.checked;
            if (actionId !== null && roleId !== null) {
              change(isChecked, actionId, roleId); // Pass actionId and roleId along with the checkbox value
            } else {
              change(isChecked ? true : false); // If actionId and roleId are not provided, just pass the checkbox value
            }
          }}
        />
        {titleRight && (
          <p className="text-xs font-medium 2xl:text-sm">{titleRight}</p>
        )}
        {titleDescription && (
          <p className=" text-sx font-normal">{titleDescription}</p>
        )}
      </div>
    </div>
  );
}
