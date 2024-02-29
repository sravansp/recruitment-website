import React, { useState } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { IoMdAdd } from "react-icons/io";
import {
  RiArrowDownLine,
  RiFileList3Line,
  RiStickyNoteLine,
} from "react-icons/ri";
import PDFViewer from "../../common/PDFViewer";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import pdfFile from "../../../assets/documents/sample.pdf";

const tabData = [
  {
    id: 9,
    title: "Notes",
    value: "notes",
    // content: <Overview />,
    icon: <RiStickyNoteLine className="text-base" />,
  },
  {
    id: 10,
    title: "Documents",
    value: "documents",
    // content: <ActivityFeed />,
    icon: <BsFileEarmarkRichtext className="text-base" />,
  },
];
const QA = [
  {
    id: 1,
    question: "Do you prefer an in-office setup or Remote?*",
    answer: "Remote",
  },
  {
    id: 2,
    question: "Are you legally eligible to work in the country?",
    answer: "Yes, I’ve resident visa",
  },
  {
    id: 3,
    question: "Do you prefer an in-office setup or Remote?",
    answer: "Remote",
  },
];
const CVResume = () => {
  const [content, setContent] = useState("");
  const primaryColor = localStorage.getItem("mainColor");

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper">
          <div className="flex items-center justify-between">
            <h6 className="h6 !text-black dark:!text-white">CV / Resume</h6>
            <ButtonClick buttonName="Add Cover Note" icon={<IoMdAdd />} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
                <div className="text-black opacity-50 ">
                  {<RiFileList3Line />}
                </div>
              </div>
              <p className="text-xs font-semibold leading-tight text-black dark:text-white">
                Pdfname.pdf
              </p>
            </div>
            <ButtonClick
              buttonName="Download"
              BtnType="primary"
              icon={<RiArrowDownLine />}
            />
          </div>
          <div className="divider-h" />
          <PDFViewer pdfUrl={pdfFile} />
        </div>

        <div className="flex flex-col gap-5 divide-y box-wrapper">
          <div className="flex items-center justify-between">
            <h6 className="h6">Question</h6>
            <ButtonClick iconAdd={true} buttonName="Add Cover Note" />
          </div>
          <div className="inline-flex flex-col items-start justify-start pt-4 gap-7">
            {QA?.map((qans) => (
              <div className="flex flex-col gap-3" key={qans.id}>
                <div className="flex">
                  <div className="w-12 ">
                    <span className="pblack">Q{qans.id}.</span>
                  </div>
                  <div>
                    <span className="pblack !text-opacity-80">
                      {qans.question}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 ">
                    <p className="pblack">Ans.</p>
                  </div>
                  <p className="pblack !text-opacity-80">{qans.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN  */}
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor
            initialValue={content}
            onChange={handleEditorChange}
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

export default CVResume;
