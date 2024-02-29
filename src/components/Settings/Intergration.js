import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import ButtonClick from "../common/Button";
import Heading from "../common/Heading";

function Intergration() {
  const data = [
    "Naukarigulf",
    "Bayt",
    "Linked in",
    "Gulf Talent",
    "Indeed",
    "Loyaltri",
  ];
  const [selectedDivs, setSelectedDivs] = useState([]);

  const handleCheckboxChange = (index) => {
    if (selectedDivs.includes(index)) {
      setSelectedDivs(selectedDivs.filter((item) => item !== index));
    } else {
      setSelectedDivs([...selectedDivs, index]);
    }
  };
  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex justify-between">
        <Heading title="Intergration" description="Lorem ipsum " />
        <div className="flex gap-4">
          {" "}
          <ButtonClick buttonName={"Add Intergration"} BtnType="add" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-9">
        {/* LEFT COLUMN  */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="flex flex-wrap gap-4">
            {/* Small card-like div */}
            {data.map((item, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-black rounded-lg border-[1px] p-4 max-w-[300px] ${
                  selectedDivs.includes(index)
                    ? "border-[#6A4BFC]"
                    : "border-[#DADADA]"
                }`}
              >
                <div className="items-center flex flex-col lg:flex-row">
                  <img
                    src="logo.png"
                    alt="Logo"
                    className="w-[58px] h-[58px] object-contain rounded-md border-b lg:border-b-0"
                  />
                  <div className="ml-2">
                    <h3 className="text-lg font-semibold">{item}</h3>
                    <p>abcd@gmail</p>
                  </div>
                  <input
                    id={`comments-${index}`}
                    name={`comments-${index}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border text-indigo-600 focus:ring-indigo-600 absolute mt-[-60px] ml-64"
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
                <div>
                  <p className="text-sm text-[#667085] mt-4">
                    Indeed is a global job search engine for job listings with
                    over 200 million unique monthly visitors.
                  </p>
                </div>
                <div className="mt-4">
                  <button className="flex bg-green-500 text-black bg-[#DADADA] py-2 px-4 rounded lg:mt-4">
                    <BiEditAlt className="mr-2" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intergration;
