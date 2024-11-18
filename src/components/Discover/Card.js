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
  value,
  value1,
  placeholder,
  change = () => {},
  dropdown2Change = () => {},
}) => {
  return (
    <div
      className={twMerge(
        `bg-white dark:bg-[#0C101C] borderb dark:border-none rounded-xl h-full w-full, ${className}`
      )}
    >
      {cardName && (
        <div className="p-3 items-center header max-[320px]:grid xs:grid sm:flex md:flex lg:flex xl: flex">
          <div className="grid grid-cols-1 xs:w-full sm:w-[35%] md:w-[55%] lg:w-[55%]">
            <div>
              <h3 className="h3"> {cardName} </h3>
            </div>
          </div>
          {filters && (
            <div className="gap-3 max-[320px]:mt-2 xs:mt-2 xs:w-full sm:w-full md:w-[45%] lg:w-[45%] grid max-[320px]:grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <div>
                {dropdown1 && (
                  <Dropdown
                    options={dropdown1}
                    value={value}
                    change={change}
                    placeholder={placeholder}
                  />
                )}
              </div>
              <div>
                {dropdown2 && (
                  <Dropdown
                    options={dropdown2}
                    value={value1}
                    change={dropdown2Change}
                    placeholder={placeholder}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
};

export default Card;
