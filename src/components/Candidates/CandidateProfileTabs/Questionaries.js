import React, { useState } from "react";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import TabsNew from "../../common/TabsNew";
import { Editor } from "draft-js";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { RiHome6Line, RiStickyNoteLine } from "react-icons/ri";

const Questionaries = () => {
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
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-3 lg:col-span-8">
        <div className="relative h-96 bg-white border border-black rounded-lg border-opacity-10">
          <div className=" flex justify-between p-2.5 left-[4px] top-[4.31px]   mt-5 ml-3.5 ">
            <h1 className=" font-['SF Pro'] font-semibold text-black ">
              Questioniare Form
            </h1>
            <div className="ml-64">
              <ButtonClick buttonName="Choose Questioniare" />
            </div>

            <div className="v-divider mt-16 w-full" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          {/* <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor initialValue={content} onChange={handleEditorChange} className="h-[250px]" /> */}
          {/* <TabsNew/> */}
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor className={"h-[250px]"} />
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Save" BtnType="primary" />
          </div>
        </div>
      </div>
      {/* <Editor/> */}
    </div>
  );
};

export default Questionaries;
