import React from "react";

const Card = ({ children, className = "", cardName = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-[#0C101C] borderb dark:border-none rounded-xl h-full w-full  ${className}`}
    >
      {cardName && (
        <div className="header">
          <div className="p-3">
            <h2 className="h6"> {cardName} </h2>
          </div>
          <div className="divider-h" />
        </div>
      )}
      <div className="p-3"> {children}</div>
    </div>
  );
};

export default Card;
