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
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper">
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Questionair</h6>
              <div
                className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
                // style={{ backgroundColor: `${primaryColor}10` }}
              >
                {/* <ButtonClick
                  buttonName="Choose Questionair"
                  BtnType="primary"
                /> */}
              </div>
            </div>

            <div className=" ">
              <p className="text-gray-700 dark:text-white font-Inter font-weight:500 mt-5">
                <strong>Q1.</strong> &nbsp; &nbsp;Can you provide an overview of
                your experience in designing and managing network
                infrastructures? <br />
                <br /> <strong> Ans.</strong> &nbsp;In my previous role, I
                designed and maintained a robust network infrastructure that
                included routers, switches, and firewalls. I ensured high <br />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;availability by
                implementing redundancy and conducted regular performance
                assessments to optimize network efficiency. <br /> <br />
                <strong>Q2.</strong> &nbsp; &nbsp;How do you approach network
                security, and what measures have you implemented to protect
                against potential threats? <br />
                <br /> <strong> Ans.</strong> &nbsp;I prioritize security
                through measures such as implementing firewalls, intrusion
                detection systems, and regularly updating security policies.{" "}
                <br />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Additionally, I
                conduct regular vulnerability assessments and penetration
                testing to identify and address potential vulnerabilities.{" "}
                <br /> <br />
                <strong>Q3.</strong> &nbsp; &nbsp;Can you provide an overview of
                your experience in designing and managing network
                infrastructures? <br />
                <br /> <strong> Ans.</strong> &nbsp;In my previous role, I
                designed and maintained a robust network infrastructure that
                included routers, switches, and firewalls. I ensured high <br />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;availability by
                implementing redundancy and conducted regular performance
                assessments to optimize network efficiency. <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor
            // initialValue={content}
            // onChange={handleEditorChange}
            minheight="250px"
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
