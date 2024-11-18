import React, { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import ButtonClick from "../common/Button";
import indeed from "../../assets/images/Hiring_patners/indeed.png";
import bayt from "../../assets/images/Hiring_patners/Bayt.png";
import linkedin from "../../assets/images/Hiring_patners/Linkedin.png";
import gulftalent from "../../assets/images/Hiring_patners/gulftalent.png";
import Naukrigulf from "../../assets/images/Hiring_patners/Naukrigulf.png";
import loyaltri from "../../assets/images/Hiring_patners/loyaltri.png";
import { useTranslation } from "react-i18next";
import CheckBoxInput from "../common/CheckBoxInput";

const Integration = () => {
  const data = [
    { title: "Naukrigulf", email: "abcd@gmail", image: Naukrigulf },
    { title: "Bayt", email: "abcd@gmail", image: bayt },
    { title: "Linked in", email: "abcd@gmail", image: linkedin },
    { title: "Gulf Talent", email: "abcd@gmail", image: gulftalent },
    { title: "Indeed", email: "abcd@gmail", image: indeed },
    { title: "Loyaltri", email: "abcd@gmail", image: loyaltri },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const { t } = useTranslation();

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
        <div className="flex flex-col">
          <p className="font-bold text-lg">{t("Integration")}</p>
          <p className="para font-medium">{t("Main_Description")}</p>
        </div>
        <ButtonClick
          buttonName={`Add Integration `}
          className="your-custom-styles"
          BtnType="Add"
        />
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((data, i) => (
          <div
            key={i}
            className={`bg-white dark:bg-[#0c101c] rounded-lg border p-2 relative ${
              selectedItems.includes(i)
                ? "border-primary"
                : "border-black/10 dark:border-white/10"
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="rounded-md borderb size-12 2xl:size-[58px] overflow-hidden">
                  <img
                    src={data.image}
                    alt="Logo"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="ml-2">
                  <h3 className="h6 ">{data.title}</h3>
                  <p className="para">{data.email}</p>
                </div>
              </div>
              <div>
                <CheckBoxInput
                  value={selectedItems.includes(i)}
                  change={() => handleCheckboxChange(i)}
                />
              </div>
            </div>
            <div>
              <p className="mt-4 para !font-normal">
                Indeed is a global job search engine for job listings with over
                200 million unique monthly visitors
              </p>
            </div>
            <div className="mt-4">
              <ButtonClick
                BtnType="text"
                icon={<RiEdit2Line className="size-4 text-gray-600" />}
                buttonName="Edit"
                className={"bg-black/5 dark:border-white/10 dark:border"}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid gap-6 lg:grid-cols-9">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="flex flex-wrap gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-[#0c101c] rounded-lg border p-2 max-w-[300px] relative ${
                  selectedItems.includes(index)
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
                    <p className="para">{item.email}</p>
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
                    icon={<RiEdit2Line className="size-4 text-gray-600" />}
                    buttonName="Edit"
                    className={"bg-black/5 dark:border-white/10 dark:border"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Integration;
