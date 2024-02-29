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
    <div className="flex flex-row gap-6 lg:col-span-8">
      <div className="rounded-md h-[446px] sm:w-[1150px] bg-white border">
        <div className="flex justify-between items-center">
          <h3 className="w-[87px] h-[22px] mt-[18.88px] ml-[13.61px] font-[sf pro] size-[16px] text-black font-bold ">
            Questionair
          </h3>
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
            // style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Choose Questionair" BtnType="primary" />
          </div>
        </div>

        <div className="v-divider mt-4 border-[1px] opacity-[10px]" />
        <div className="ml-8 mt-8">
          <p className="text-gray-700 font-Inter font-weight:500">
            <strong>Q1.</strong> &nbsp; &nbsp;Can you provide an overview of
            your experience in designing and managing network infrastructures?{" "}
            <br />
            <br /> <strong> Ans.</strong> &nbsp;In my previous role, I designed
            and maintained a robust network infrastructure that included
            routers, switches, and firewalls. I ensured high <br />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;availability by
            implementing redundancy and conducted regular performance
            assessments to optimize network efficiency. <br /> <br />
            <strong>Q2.</strong> &nbsp; &nbsp;How do you approach network
            security, and what measures have you implemented to protect against
            potential threats? <br />
            <br /> <strong> Ans.</strong> &nbsp;I prioritize security through
            measures such as implementing firewalls, intrusion detection
            systems, and regularly updating security policies. <br />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Additionally, I
            conduct regular vulnerability assessments and penetration testing to
            identify and address potential vulnerabilities. <br /> <br />
            <strong>Q3.</strong> &nbsp; &nbsp;Can you provide an overview of
            your experience in designing and managing network infrastructures?{" "}
            <br />
            <br /> <strong> Ans.</strong> &nbsp;In my previous role, I designed
            and maintained a robust network infrastructure that included
            routers, switches, and firewalls. I ensured high <br />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;availability by
            implementing redundancy and conducted regular performance
            assessments to optimize network efficiency. <br />
          </p>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
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

export default Questionaries;
