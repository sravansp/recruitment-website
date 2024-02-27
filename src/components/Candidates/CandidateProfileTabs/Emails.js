import React, { useState } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { RiStickyNoteLine } from "react-icons/ri";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { Divider } from "antd";

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
const Emails = () => {
  const [content, setContent] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const primaryColor = localStorage.getItem("mainColor");

  const handleEditorChange = (content) => {
    setContent(content);
  };
  const handleEditorChange2 = (emailContent) => {
    setEmailContent(emailContent);
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
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Question</h6>
              <ButtonClick iconAdd={true} buttonName="Add Cover Note" />
            </div>
            <div className="flex items-center gap-2 pt-4">
              <p>Subject:</p>
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none"
              />
            </div>
            <div className="pt-4">
              <TextEditor
                initialValue={emailContent}
                onChange={handleEditorChange2}
                minheight="300px"
                className="border-none"
              />
            </div>
          </div>

          <div
            className="flex items-center justify-end gap-2.5 p-1.5  rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Send Now" BtnType="primary" />
          </div>
        </div>
        <div className="flex flex-col gap-4 divide-y box-wrapper">
          <h6 className="h6">Previously Sent Email</h6>
          {/* <div className="v-divider h-[2px]" /> */}
          <div className="flex flex-col gap-4 pt-4 prevemail">
            <div className="flex items-center gap-2.5">
              <div className="size-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-full">
                <p className="para">SN</p>
              </div>
              <div className="inline-flex flex-col items-start justify-start gap-1">
                <p className="text-xs font-semibold leading-tight text-black dark:text-white ">
                  You sent an email to Haseeb
                </p>
                <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
                  Jan 26 - 11:34
                </p>
              </div>
            </div>
            <div className="v-divider" />
            <div className="space-y-3 pblack !font-normal">
              <div className="subject !font-semibold">
                <p> Subject: haseeb, regarding your Web Designer application</p>
              </div>
              <p>Dear Haseeb, </p>

              <p>
                We're sorry to inform you that your application for Web Designer
                with Oryx Digital wos unsuccessful.
              </p>

              <p>
                I would like to take this opportunity to thank you for your
                interest in the role. Being unsuccessful at this stage is most
                likely due to other applicants demonstrating more relevant
                experience on their CV.
              </p>

              <p>
                Please do not hesitate to apply again in the future for other
                positions. We will add your details to our talent pool and
                should a role matching your skills and experience arise in the
                future. we will be in touch.
              </p>

              <p>
                We'd like to Wish you the best Of luck With your future search
                'Or employment,
              </p>

              <p>
                <span>Best regards.</span>
                <br />
                <span>Sharekh Nair</span>
                <br />
                <span>Oryx Digital</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-4 prevemail">
            <div className="flex items-center gap-2.5">
              <div className="size-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-full">
                <p className="para">SN</p>
              </div>
              <div className="inline-flex flex-col items-start justify-start gap-1">
                <p className="text-xs font-semibold leading-tight text-black dark:text-white ">
                  You sent an email to Haseeb
                </p>
                <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
                  Jan 26 - 11:34
                </p>
              </div>
            </div>
            <div className="v-divider" />
            <div className="space-y-3 pblack !font-normal">
              <div className="subject !font-semibold">
                <p> Subject: haseeb, regarding your Web Designer application</p>
              </div>
              <p>Dear Haseeb, </p>

              <p>
                We're sorry to inform you that your application for Web Designer
                with Oryx Digital wos unsuccessful.
              </p>

              <p>
                I would like to take this opportunity to thank you for your
                interest in the role. Being unsuccessful at this stage is most
                likely due to other applicants demonstrating more relevant
                experience on their CV.
              </p>

              <p>
                Please do not hesitate to apply again in the future for other
                positions. We will add your details to our talent pool and
                should a role matching your skills and experience arise in the
                future. we will be in touch.
              </p>

              <p>
                We'd like to Wish you the best Of luck With your future search
                'Or employment,
              </p>

              <p>
                <span>Best regards.</span>
                <br />
                <span>Sharekh Nair</span>
                <br />
                <span>Oryx Digital</span>
              </p>
            </div>
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

export default Emails;
