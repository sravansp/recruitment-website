import React, { useState } from "react";
import ButtonClick from "../../common/Button";
import TextEditor from "../../common/TextEditor/TextEditor";
import TabsNew from "../../common/TabsNew";
import {
  RiAttachment2,
  RiEmojiStickerFill,
  RiHome6Line,
  RiStickyNoteLine,
} from "react-icons/ri";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FcCheckmark } from "react-icons/fc";
import { ImAttachment } from "react-icons/im";

const Offers = () => {
  const [content, setContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
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
  const handleFileChange = (event) => {
    const files = event.target.files;
    setUploadedFiles([...uploadedFiles, ...files]);
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
              <h6 className="h6">Offer Letter</h6>
              <div
                className="flex items-center justify-end gap-2.5 p-1.5  rounded-lg"
                // style={{ backgroundColor: `${primaryColor}10` }}
              >
                <ButtonClick buttonName="Reject" />
                <ButtonClick buttonName="Accept" icon={<FcCheckmark />} />
                <ButtonClick buttonName="Choose Template" BtnType="primary" />
              </div>
            </div>

            <div>
              <div className="pt-4">
                <TextEditor
                  // initialValue={emailContent}
                  // onChange={handleEditorChange2}
                  minheight="300px"
                  className="border-none"
                />
              </div>
              <div
                className="flex justify-between items-center gap-2.5 p-1.5  rounded-lg "
                style={{
                  backgroundColor: `${primaryColor}10`,
                  color: `${primaryColor}10`,
                }}
              >
                <div className="flex justify-items-start !important  gap-2.5 p-1.5 ">
                  <label className="p-2 cursor-pointer">
                    <RiAttachment2 size={18} className="text-primary" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                      accept=".doc, .docx, .pdf, .jpg, .jpeg, .png" // Specify the allowed file types
                    />
                  </label>
                  <label className="p-2 cursor-pointer">
                    <RiEmojiStickerFill size={18} className="text-primary" />
                  </label>

                  <ButtonClick
                    buttonName="Add Signature"
                    BtnType="link"
                    className="text-primary"
                  />
                </div>
                <div className="flex gap-2.5 p-1.5">
                  <ButtonClick buttonName="Cancel" />
                  <ButtonClick buttonName="Send now" BtnType="primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Offers;
