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
}) => {
  const [templateName, setTemplateName] = useState("");
  const [show, setShow] = useState(open);
  const { t } = useTranslation();
  const handleClose = () => {
    close(false);
  };
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      // API call
      const response = await saveRecruitmentEmailTemplate({
        companyId: 1, // Replace with your companyId value
        // Replace with your emailTemplateName value
        emailTemplateName: templateName,
        emailTemplate: {
          subject: "Invitation to Interview for [Job Title] Position",
          body: content, // Use the content state for the email body
        },
        createdBy: null, // Replace with your createdBy value
      });

      // Handle API response
      console.log(response);
      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Email template saved successfully.",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to save email template.",
        });
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
    </div>
  );
};

export default Emailtemplate;
