import React from "react";
import { twMerge } from 'tailwind-merge'

const Card = ({ children, className = "", cardName = "" }) => {
  return (
    <div
      className={twMerge(`bg-white dark:bg-[#0C101C] borderb dark:border-none rounded-xl h-full w-full,  ${className}`)}
    >
      {cardName && (
        <div className="header">
          <div className="p-3">
            <h3 className="h3"> {cardName} </h3>
          </div>
          <div className="divider-h" />
        </div>
      )}
      <div className="p-3"> {children}</div>
    </div>
  );
};

export default Card;
