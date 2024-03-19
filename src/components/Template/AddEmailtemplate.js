import React, { useState } from "react";
import DrawerPop from "../common/DrawerPop";
import Accordion from "../common/Accordion";
import { useTranslation } from "react-i18next";
import { Button, Card, Space, notification } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "../common/TextArea";
// import image from '../../assets/images/generate-ai-img.png'
import TextEditor from "../common/TextEditor/TextEditor";
import FormInput from "../common/FormInput";
import image from "../../assets/images/attachment-2.svg";
import image2 from "../../assets/images/emoji-sticker-line.svg";

import { saveRecruitmentEmailTemplate } from "../Api1";
const Emailtemplate = ({
  open = "",
  close = () => {},
  inputshow = false,
  isUpdate = {},
  updateId,
}) => {
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [templateName, setTemplateName] = useState("");
  const [show, setShow] = useState(open);
  const { t } = useTranslation();
  const handleClose = () => {
    close(false);
  };
  const [content, setContent] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      // stack: 2,
      style: {
        background: `${
          type === "success"
            ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
            : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
        }`,
        boxShadow: `${
          type === "success"
            ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
            : "0px 22px 60px rgba(134, 92, 144, 0.20)"
        }`,
      },
      // duration: null,
    });
  };

  const handleSubmit = async () => {
    try {
     
      const response = await saveRecruitmentEmailTemplate({
        companyId: companyId, 
        emailTemplateName: templateName,
        emailTemplate: {
          subject: "Invitation to Interview for [Job Title] Position",
          body: content, 
        },
        createdBy: null,
      });

      // Handle API response
      console.log(response);
      if (response.status === 200) {
      
      
        openNotification(
          "success",
          "Successful",
          response.message
        );
        setTimeout(() => {
          handleClose();
        }, 2000);
      
      }else if (response.status === 500) {
        openNotification("error", "input field is empty..", response.message);
      }
    } catch (error) {
      console.error("Error saving email template:", error);
      notification.error({
        message: "Error",
        description: "Failed to save email template. Please try again.",
      });
    }
  };
  const handleEditorChange = (content) => {
    setContent(content);
  };

  return (
    <div>
      <DrawerPop
        open={show}
        contentWrapperStyle={{
          position: "absolute",
          height: "100%",
          top: 0,
          // left: 0,
          bottom: 0,
          right: 0,
          width: "100%",
          borderRadius: 0,
          borderTopLeftRadius: "0px !important",
          borderBottomLeftRadius: 0,
        }}
        close={(e) => {
          setShow(e);
          //    setUpdateId(null);
          handleClose();
        }}
        header={[
          !isUpdate ? t("Create Email Template") : t("Create a Email Template"),
          t("Lorem ipsum dummy text doret solo."),
        ]}
        //  headerRight={
        //    <div className="flex items-center gap-10">
        //      <p className="text-sm font-medium text-gray-400">
        //        Draft Saved 10 Seconds ago
        //      </p>
        //      <div className="flex items-center gap-2.5">
        //        <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
        //        <RxQuestionMarkCircled className="text-2xl font-medium text-gray-400 " />
        //      </div>
        //    </div>
        //  }
        footerBtn={[
          t("Cancel"),
          !isUpdate ? t("Save Template") : t("Save Template"),
        ]}
        className="widthFull"
        handleSubmit={handleSubmit}

        //  buttonClickCancel={(e) => {
        //    if (activeBtn > 0) {
        //      setActiveBtn(activeBtn - 1);
        //      setNextStep(nextStep - 1);
        //      setActiveBtnValue(steps?.[activeBtn - 1].data);
        //      console.log(activeBtn - 1);
        //    }
        //    setBtnName("");
        //  }}
        //  nextStep={nextStep}
        //  activeBtn={activeBtn}
        //  saveAndContinue={true}
        //  stepsData={steps}
      >
        {" "}
        <div className="relative max-w-[1070px]  w-full mx-auto">
          <Accordion
            title={"Email Templates"}
            className="Text_area"
            padding={true}
            toggleBtn={false}
            click={() => {
              //  setPresentage(1.4);
            }}
            initialExpanded={true}
          >
            <div className="grid grid-cols-2 ">
              <FormInput
                title={"Template Name"}
                placeholder={"type here"}
                value={templateName}
                change={setTemplateName}
              />
            </div>

            <TextEditor
              initialValue={content}
              onChange={handleEditorChange}
              minheight="250px"
            />
            <div class="relative max-w-[1070px]  w-full mx-auto h-[49.72px] bg-purple-50 rounded-lg">
              <div className="flex justify-start items-center m-3 gap-3">
                <img src={image}></img>
                <img src={image2}></img>
              </div>
            </div>
          </Accordion>
        </div>
      </DrawerPop>
      {contextHolder}
    </div>
  );
};

export default Emailtemplate;
