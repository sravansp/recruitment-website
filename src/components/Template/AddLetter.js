import React, { useState,useEffect } from "react";
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
import {getRecruitmentLetterTemplateById, saveRecruitmentLetterTemplate,updateRecruitmentLetterTemplate } from "../Api1";
const AddLetter = ({
  open = "",
  close = () => {},
  inputshow = false,
  isUpdate = {},
  updateId,
  refresh
}) => {
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [templateName, setTemplateName] = useState("");
  const [show, setShow] = useState(open);
  const [subject,setsubject] = useState("")
  const { t } = useTranslation();
  const [templateNameError, setTemplateNameError] = useState('');
  const [ subjectError,setSubjectError] = useState('')
  const [contentError, setContentError] = useState('');
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
  console.log(updateId)

  const handletemplateName =(Value) =>{
    if (!Value) {
      setTemplateNameError('Template Name is required.');
      // Set flag to true if there's an error
  } else {
      setTemplateNameError('');
  }
  }
  const handleSubject = (value) =>{
    if (value) {
      setSubjectError('');
       // Set flag to true if there's an error
  } 
  }
  const handleSubmit = async () => {
    try {
      // API call

      let hasError = false; // Flag to track if any error occurred

        // Check if templateName is empty
        if (!templateName) {
            setTemplateNameError('Template Name is required.');
            hasError = true; // Set flag to true if there's an error
        } else {
            setTemplateNameError('');
        }

        // Check if subject is empty
        if (!subject) {
            setSubjectError('Please enter a subject.');
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
  
      if(updateId){
        const id = updateId
       const response = await updateRecruitmentLetterTemplate(
       
        {
            id:id,
            companyId: companyId,
            letterTemplateName: templateName,
            letterTemplate:{
              subject: subject,
                body: content, 
            },
            modifiedBy:null
        }
       )
       console.log(response)
       if (response.status === 200) {
        
        
        openNotification(
          "success",
          "success",
          response.message
        );
        setTimeout(() => {
          handleClose();
          refresh()
        }, 1500);
      
      }else if (response.status === 500) {
        openNotification("error", "Error..", response.message.replace(/<br\/>/g, '\n'));
      }
      }
      else{
        const response = await saveRecruitmentLetterTemplate({
        companyId: companyId,

        letterTemplateName: templateName,
        letterTemplate: {
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
          "success",
          response.message
        );
        setTimeout(() => {
          handleClose();
          refresh()
        }, 1500);
      } else {
        openNotification("error", "Error..", response.message);
      }
    }
    } catch (error) {
      console.error("Error saving email template:", error);
      openNotification("error", "Error..", error);
    }
  };
  const getLetterById= async()=>{
    const id = updateId
    try{
    const response = await getRecruitmentLetterTemplateById({id})
    console.log(response)
    setTemplateName(response.result[0].letterTemplateName );
    setContent(response.result[0].letterTemplate.body );
    setsubject(response.result[0].letterTemplate.subject)
    
    }catch(error){
    console.log(error)
    }
  }
  useEffect(()=>{
    getLetterById()
    console.log(templateName)
    console.log(content)  
  },[])

  

  const handleEditorChange = (content) => {
    setContent(content);
    if (content) {
      setContentError('');
      
      
    } 
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
          !updateId ? t("Create Letter Template") : t("Update Letter Template"),
          !updateId ? t("Create Letter Template") : t("Update Letter Template"),
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
            title={"Letter Templates"}
            className="Text_area"
            padding={true}
            toggleBtn={false}
            click={() => {
              //    setPresentage(1.4);
            }}
            initialExpanded={true}
          >
            <div className="grid grid-cols-2 ">
              <FormInput
                title={"Letter Template Name"}
                placeholder={"Enter Letter Template Name"}
                value={templateName}
                change={(e)=>{
                  setTemplateName(e)
                  handletemplateName(e)
                }}
                error={templateNameError}
                required={true}
              />
            </div>
            <FormInput
                title={"Subject"}
                placeholder={"Enter Subject"}
                value={subject}
                change={(e)=>{setsubject(e)
                  handleSubject(e)
                 }}
                error={subjectError}
                required={true}
              />

            <TextEditor
              initialValue={content}
              onChange={handleEditorChange}
              minheight="250px"
              error={contentError}
            />
            <div class="relative max-w-[1070px]  w-full mx-auto h-[49.72px] bg-purple-50 rounded-lg">
              <div className="flex justify-start items-center m-3 gap-3">
                {/* <img src={image}></img>
                <img src={image2}></img> */}
              </div>
            </div>
          </Accordion>
        </div>
      </DrawerPop>
      {contextHolder}
    </div>
  );
};

export default AddLetter;
