import React from "react";
import ButtonClick from "../../common/Button";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { RiHome6Line, RiStickyNoteLine } from "react-icons/ri";
import TextEditor from "../../common/TextEditor/TextEditor";
import TabsNew from "../../common/TabsNew";
import RadioButton from "../../common/RadioButton";
import Radiobuttonnew from "../../common/Radiobuttonnew";
import Dropdown from "../../common/Dropdown";

const Evaluations = () => {
  const primaryColor = localStorage.getItem("mainColor");
  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  const tabData = [
    {
      id: 9,
      title: "Notes",
      value: "notes",
      // content: <Overview />,
      icon: <RiHome6Line className="text-base" />,
    },
    {
      id: 10,
      title: "Tags",
      value: "tags",
      icon: <RiStickyNoteLine className="text-base" />,
    },
    {
      id: 11,
      title: "Documents",
      value: "documents",
      // content: <ActivityFeed />,
      icon: <BsFileEarmarkRichtext className="text-base" />,
    },
  ];
  return (
    <div className="flex flex-row gap-6 lg:col-span-8">
      <div className="rounded-md h-[446px] sm:w-[1150px] bg-white border">
        <div className="flex justify-between items-center">
          <h3 className="w-[150px] h-[22px] mt-[18.88px] ml-[13.61px] font-[sf pro] size-[16px] text-black font-bold ">
            Evaluation Form
          </h3>
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
            // style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Create New Form" BtnType="primary" />
          </div>
        </div>
        <div className="v-divider mt-4 border-[1px] opacity-[10px]" />
        {/* <div>
          <RadioButton
            title="email"
            value="dsbj"
            options={["hjwdj", "whejh"]}
            label={["jkne", "eer"]}
          />
        </div> */}
      </div>

      <div className="">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <div className="flex flex-grow justify-between items-center">
            <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
            <ButtonClick buttonName="Unpin" BtnType="link" />
          </div>

          <TextEditor
            // initialValue={content}
            // onChange={handleEditorChange}
            className="h-[250px] w-[580px]"
          />
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Save" BtnType="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
