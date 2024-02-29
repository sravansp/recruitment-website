import React, { useState } from "react";
import ButtonClick from "../../common/Button";
import TextEditor from "../../common/TextEditor/TextEditor";
import TabsNew from "../../common/TabsNew";
import {
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
    // <div className="grid gap-6 lg:grid-cols-12">
    <div className="flex flex-row gap-6 lg:col-span-8">
      <div className="rounded-md h-[446px] sm:w-full bg-white border">
        <div className="flex justify-between items-center">
          <h3 className="w-[87px] h-[22px] mt-[18.88px] ml-[13.61px] font-[sf pro] size-[16px] text-black font-bold ">
            Offer Letter
          </h3>
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
            // style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Reject" />
            <ButtonClick buttonName="Accept" icon={<FcCheckmark />} />
            <ButtonClick buttonName="Choose Template" BtnType="primary" />
          </div>
        </div>

        <div className="v-divider mt-4 border-[1px] opacity-[10px]" />
        <div>
          <Editor
            // editorState={editorState}
            onEditorStateChange={handleEditorChange}
            placeholder="Type your text here..." // Add placeholder here
            toolbar={{
              options: ["inline", "fontSize", "list", "textAlign"],
              inline: {
                options: ["bold", "italic", "underline", "strikethrough"],
              },
              list: {
                options: ["unordered", "ordered", "indent"],
              },
              textAlign: {
                options: ["left", "center", "right", "justify"],
              },
            }}
            toolbarStyle={{
              position: "absolute",
              bottom: "110px",
              left: "50px",
              right: "0",
            }}
            toolbarClassName=" bg-black"
          />
          <div
            className="flex justify-between items-center gap-2.5 p-1.5 mt-60 rounded-lg "
            style={{
              backgroundColor: `${primaryColor}10`,
              color: `${primaryColor}10`,
            }}
          >
            <div className="flex justify-items-start !important  gap-2.5 p-1.5 ">
              <ButtonClick
                buttonName=""
                BtnType="link"
                icon={<ImAttachment />}
              />
              <ButtonClick
                buttonName=""
                BtnType="link"
                icon={<RiEmojiStickerFill />}
              />

              <ButtonClick buttonName="Add Signature" BtnType="link" />
            </div>
            <div className="flex gap-2.5 p-1.5">
              <ButtonClick buttonName="Cancel" />
              <ButtonClick buttonName="Send now" BtnType="primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor
            initialValue={content}
            onChange={handleEditorChange}
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
    // </div>
  );
};

export default Offers;
