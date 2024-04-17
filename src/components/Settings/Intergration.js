import React, { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import ButtonClick from "../common/Button";
import Heading from "../common/Heading";
import indeed from "../../assets/images/indeed.png";
import bayt from "../../assets/images/Bayt.png";
import linkedin from "../../assets/images/Linked.png";
import gulftalent from "../../assets/images/gulftalent.png";
import Naukrigulf from "../../assets/images/Naukrigulf.png";
import loyaltri from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../common/BreadCrumbs";
function Intergration() {
  const data = [
    { title: "Naukarigulf", image: Naukrigulf },
    { title: "Bayt", image: bayt },
    { title: "Linked in", image: linkedin },
    { title: "Gulf Talent", image: gulftalent },
    { title: "Indeed", image: indeed },
    { title: "Loyaltri", image: loyaltri },
  ];
  const [selectedDivs, setSelectedDivs] = useState([]);
  const { t } = useTranslation();


  const breadcrumbItems = [


    { label: t("Settings"), url: "" },
    { label: t("Other"), url: "" },
    { label: t("Intergration"), url: "" },

  ];

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
        <div className='flex flex-col'>
          <p className='font-bold text-lg'> Integrations</p>
          <p className='para font-medium'>{t("Main_Description")}</p>
        </div>
        <ButtonClick
          buttonName={`Add Intergration `}// Set the button name
          className="your-custom-styles" // Add any additional class names for styling
          BtnType="Add" // Specify the button type (Add or Update)
        />
      </div>

      {/* <div className="flex justify-between">
        <Heading title="Intergration" description="Lorem ipsum " />
        <div className="flex gap-4">
          {" "}
          <ButtonClick buttonName={"Add Intergration"} BtnType="add" />
        </div>
      </div> */}
      <div className="grid gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="flex flex-wrap gap-6">
            {/* Small card-like div */}
            {data.map((item, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-black rounded-lg border-[1px] p-4 max-w-[300px] ${selectedDivs.includes(index)
                  ? "border-[#6A4BFC]"
                  : "border-[#DADADA]"
                  }`}
              >
                <div className="items-center flex flex-col lg:flex-row">
                  <img
                    src={item.image}
                    alt="Logo"
                    className="w-[58px] h-[58px] object-cover rounded-md borderb lg:border-b-0"
                  />
                  <div className="ml-2">
                    <h3 className="h6  ">{item.title}</h3>
                    <p className="para">abcd@gmail</p>
                  </div>
                  <input
                    id={`comments-${index}`}
                    name={`comments-${index}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border  text-indigo-600 focus:ring-indigo-600 absolute mt-[-60px] ml-64"
                    onChange={() => handleCheckboxChange(index)}
                    style={{ borderColor: "red" }}
                  />
                </div>
                <div className="text-wrap">
                  <p className="para mt-4 ">
                    Indeed is a global job search engine for job listings with
                    over 200 million unique monthly visitors
                  </p>
                </div>
                <div className="mt-4">
                  <ButtonClick
                    BtnType="text"
                    icon={<RiEdit2Line />}
                    buttonName="Edit"
                    className={"bg-[#e8e4e4]"}
                  />
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
