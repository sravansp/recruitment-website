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
import CheckBoxInput from "../common/CheckBoxInput";

function Integration() {
  const data = [
    { title: "Naukarigulf", image: Naukrigulf },
    { title: "Bayt", image: bayt },
    { title: "Linked in", image: linkedin },
    { title: "Gulf Talent", image: gulftalent },
    { title: "Indeed", image: indeed },
    { title: "Loyaltri", image: loyaltri },
  ];
  const [selectedItems, setSelectedItems] = useState([]);
  const { t } = useTranslation();

  const breadcrumbItems = [{ label: t("Integration"), url: "" }];

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex justify-between">

        <div className='flex flex-col'>
          <p className='font-bold text-lg'>{t("Integration")}</p>
          <p className='para font-medium'>{t("Main_Description")}</p>
        </div>

        <ButtonClick
          buttonName={`Add Integration `} // Set the button name
          className="your-custom-styles" // Add any additional class names for styling
          BtnType="Add" // Specify the button type (Add or Update)
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="flex flex-wrap gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-[#0c101c] rounded-lg border p-2 max-w-[300px] relative ${selectedItems.includes(index)
                    ? "border-primary"
                    : "border-black/10 dark:border-white/10"
                  }`}
              >
                <div className="flex flex-col items-center lg:flex-row">
                  <div className="rounded-md borderb size-12 2xl:size-[58px] overflow-hidden">
                    <img
                      src={item.image}
                      alt="Logo"
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="h6 ">{item.title}</h3>
                    <p className="para">abcd@gmail</p>
                  </div>

                  <div className="absolute top-2 right-2">
                    <CheckBoxInput
                      value={selectedItems.includes(index)}
                      change={() => handleCheckboxChange(index)}
                    />
                  </div>
                </div>
                <div className="text-wrap">
                  <p className="mt-4 para !font-normal">
                    Indeed is a global job search engine for job listings with
                    over 200 million unique monthly visitors
                  </p>
                </div>
                <div className="mt-4">
                  <ButtonClick
                    BtnType="text"
                    icon={<RiEdit2Line />}
                    buttonName="Edit"
                    className={"bg-black/5 dark:border-white/10 dark:border"}
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

export default Integration;
