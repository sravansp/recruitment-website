import React from "react";
import { twMerge } from "tailwind-merge";
import Dropdown from "../common/Dropdown";

const Card = ({
  children,
  className = "",
  cardName = "",
  filters = false,
  dropdown1,
  dropdown2,
}) => {
  return (
    <div
      className={twMerge(
        `bg-white dark:bg-[#0C101C] borderb dark:border-none rounded-xl h-full w-full,  ${className}`
      )}
    >
      {cardName && (
        <div className="header">
          <div className="p-3 flex justify-between items-center">
            <h3 className="h3"> {cardName} </h3>
            {filters && (
              <div className="flex gap-3">
                {dropdown1 && <Dropdown options={dropdown1} value="Any Time" />}
                {dropdown2 && (
                  <Dropdown options={dropdown2} value="All Users" />
                )}
              </div>
            )}
          </div>
          <div className="divider-h" />
        </div>
      )}
      <div className="p-3"> {children}</div>
    </div>
  );
};

export default Card;
