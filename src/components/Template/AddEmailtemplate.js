import React, { useEffect, useState } from "react";
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

import {getAllRecruitmentEmailTemplates, saveRecruitmentEmailTemplate, getRecruitmentEmailTemplateById, updateRecruitmentEmailTemplate } from "../Api1";
import { Subject, SubscriptionsOutlined } from "@mui/icons-material";
import { FaAsterisk } from "react-icons/fa";
import TextEditorcopy from "../common/TextEditor/textEditorCopy";
const Emailtemplate = ({
  open = "",
  close = () => { },
  inputshow = false,
  isUpdate = {},
  updateId,
  refresh,
}) => {
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [templateName, setTemplateName] = useState("");
  const [show, setShow] = useState(open);
  const [subject, setsubject] = useState("")
  const { t } = useTranslation();
  const [templateNameError, setTemplateNameError] = useState('');
  const [subjectError, setSubjectError] = useState('')
  const [contentError, setContentError] = useState('');
  const [Length,setLength] = useState("")
  const[copytemplateName,setcopytemplateName] = useState("")
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
        background: `${type === "success"
          ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
          : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
          }`,
        boxShadow: `${type === "success"
          ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
          : "0px 22px 60px rgba(134, 92, 144, 0.20)"
          }`,
      },
      // duration: null,
    });
  };
  console.log(updateId)
  console.log(subject)

  const handletemplateName = (Value) => {
    if (!Value) {
      setTemplateNameError('Template Name is required.');
      // Set flag to true if there's an error
    } else {
      setTemplateNameError('');
    }
  }
  const handleSubject = (value) => {
    if (value) {
      setSubjectError('');
      // Set flag to true if there's an error
    }
  }
  const handleSubmit = async () => {
    try {
      let hasError = false; // Flag to track if any error occurred

      // Check if templateName is empty
      if (!templateName) {
        setTemplateNameError('Template Name is required.');
        hasError = true; // Set flag to true if there's an error
      } else if (!/^[a-zA-Z\s]+$/.test(templateName)) {
        setTemplateNameError('Template Name should only contain letters.');
        hasError = true; // Set flag to true if there's an error
      } else if (templateName.length < 3) {
        setTemplateNameError('Template Name should have at least 3 letters.');
        hasError = true; // Set flag to true if there's an error
      }else if (Length > 0 && templateName !== copytemplateName) {
        setTemplateNameError('Template Name already exist');
        hasError = true; // Set flag to true if there's an error
      }  
      else {
        setTemplateNameError('');
      }


      // Check if subject is empty
      if (!subject) {
        setSubjectError('Subject is required.');
        hasError = true; // Set flag to true if there's an error
      } else {
        setSubjectError('');
      }

      if (!content) {
        setContentError('Content is required.');
        hasError = true;


      } else {
        setContentError('');
      }

      // If any error occurred, return early
      if (hasError) {
        return;
      }
      if (updateId) {
        const id = updateId
        const response = await updateRecruitmentEmailTemplate(
          {
            id: id,
            companyId: companyId,
            emailTemplateName: templateName,
            emailTemplate: {
              subject: subject,
              body: content,
            },
            createdBy: null,


          }


        )
        if (response.status === 200) {


          openNotification(
            "success",
            "Success",
            response.message
          );
          setTimeout(() => {
            handleClose();
            refresh()
          }, 1500);

        } else if (response.status === 500) {
          openNotification("error", "Failed", response.message.replace(/<br\/>/g, '\n'));
        }

      }
      else {
        const response = await saveRecruitmentEmailTemplate({
          companyId: companyId,
          emailTemplateName: templateName,
          emailTemplate: {
            subject: subject,
            body: content,
          },
          createdBy: null,
        });

        // Handle API response
        console.log(response);
        if (response.status === 200) {


          openNotification(
            "success",
            "Success",
            response.message
          );
          setTimeout(() => {
            handleClose();
            refresh()
          }, 1500);

        } else if (response.status === 500) {
          openNotification("error", "Failed", response.message);
        }
      }
    }
    catch (error) {
      console.error("Error saving email template:", error);
      notification.error({
        message: "Error",
        description: "Failed to save email template. Please try again.",
      });
    }
  };
  const handleEditorChange = (content) => {
    console.log(content,"content")
    setContent(content);
    if (content) {
      setContentError('');


    }
  };
  //Get Template By Name 
  const getEmailtemplateByName = async()=>{
    try{
     const response = await getAllRecruitmentEmailTemplates({
      companyId:companyId,
      emailTemplateName:templateName,
     })
     setLength(response.result.length)

    //  if(response.result.length>0){
    //   setTemplateNameError('Template Name Already Exist')
    //   return
    //  }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    if (templateName !== copytemplateName) {
    getEmailtemplateByName()
    }
  },[templateName])
  const getEmailById = async () => {
    const id = updateId
    try {
      const response = await getRecruitmentEmailTemplateById({ id })
      console.log(response)
      setTemplateName(response.result[0].emailTemplateName);
      setcopytemplateName(response.result[0].emailTemplateName)
      setContent(response.result[0].emailTemplate.body);
      setsubject(response.result[0].emailTemplate.subject)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    
    getEmailById()
    console.log(templateName)
    console.log(content)
  }, [updateId])

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
          !updateId ? t("Create Email Template") : t("Update Email Template"),
          !updateId ? t("Create Email Template") : t("Update Email Template"),
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
          t("Save"),
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
                placeholder={"Enter Template Name"}
                value={templateName}
                change={(e) => {
                  setTemplateName(e)
                  handletemplateName(e)
                }}
                error={templateNameError}
                required={true}
              />
            </div>
            <div>
              <FormInput
                title={"Subject"}
                placeholder={"Enter Subject"}
                maxLength={125}
                value={subject}
                change={(e) => {
                  setsubject(e)
                  handleSubject(e)
                }}
                error={subjectError}
                required={true}
              />

            </div>
            <div>
              <p className="flex">
                <p className="pb-2">Email</p>
                <FaAsterisk className="ml-1.5 text-[6px] text-rose-600" />
              </p>
              <TextEditorcopy
                placeholder={"Start typing your email"}
                initialValue={content}
                onChange={handleEditorChange}
                minheight="250px"
                error={contentError}

              />
            </div>
            {/* <div class="relative max-w-[1070px]  w-full mx-auto h-[49.72px] bg-purple-50 rounded-lg">
              <div className="flex justify-start items-center m-3 gap-3">
                <img src={image}></img>
                  <img src={image2}></img>
              </div>
            </div> */}
          </Accordion>
        </div>
      </DrawerPop>
      {contextHolder}
    </div>
  );
};

export default Emailtemplate;
