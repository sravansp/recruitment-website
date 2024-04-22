import React, { useEffect, useState } from 'react'
import DrawerPop from '../common/DrawerPop'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next'
import { Button, Card, Space, notification } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from '../common/TextArea'
import image from '../../assets/images/generate-ai-img.png'
import TextEditor from '../../components/common/TextEditor/TextEditor'
import { updateRecruitmentJobDescriptionTemplate, saveRecruitmentJobDescriptionTemplate, getRecruitmentJobDescriptionTemplateById } from '../Api1'
import FormInput from '../common/FormInput'
import ButtonClick from '../common/Button'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import { IoClose } from 'react-icons/io5'
import AI_Text from '../../assets/images/AI_Text.jpg';

const TemplateDec = ({ open = "", close = () => { }, inputshow = false, isUpdate = {}, updateId, refresh }) => {

  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [templateName, setTemplateName] = useState("");
  const [show, setShow] = useState(open);
  const [content, setContent] = useState("");
  const [templateNameError, setTemplateNameError] = useState('');
  const [contentError, setContentError] = useState('');
  console.log(updateId)
  const { t } = useTranslation();
  const handleClose = () => {
    close(false);

  };
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
  const [loader, setloader] = useState(false)
  const handleGenerateWithAI = async () => {
    setloader(true); 
    try {
      const requestBody = {
        val: templateName,
        radioval: '1',
        summarise: null
      };

      const response = await fetch('https://chat.bmark.in/ai/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response data as needed
        console.log(data);
        setContent(data.receivedData)
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }finally {
      setloader(false); // Hide loader after response is received
    }
  };

  const handlesubmit = async (e) => {
    try {
      console.log(content)

      let hasError = false; 
      if (templateName=== undefined) {
        setTemplateNameError('Template Name is required.');
        hasError = true;
      } else {
        setTemplateNameError('');
      }

      // Check if content is empty
      if (content=== undefined) {
        setContentError('Description is required.');
        hasError = true;

        
      } else {
        setContentError('');
      }
      if (hasError) {
        return;
    }
      if (!updateId) {
        const response = await saveRecruitmentJobDescriptionTemplate({
          companyId: companyId,
          descriptionTemplateName: templateName,
          descriptionTemplate: content,
          createdBy: null
        })
        console.log(response)
        if (response.status === 200) {


          openNotification(
            "success",
            "Successful",
            response.message.replace(/<br\/>/g, '\n')
          );
          setTimeout(() => {
            handleClose();
            refresh()
          }, 2000);

        } else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message.replace(/<br\/>/g, '\n'));
        }
      } else {
        const id = updateId
        const response = await updateRecruitmentJobDescriptionTemplate({
          id: id,
          companyId: companyId,
          descriptionTemplateName: templateName,
          descriptionTemplate: content,
          modifiedBy: null
        })
        console.log(response)
        if (response.status === 200) {


          openNotification(
            "success",
            "Successful",
            response.message
          );
          setTimeout(() => {
            handleClose();
            refresh()
          }, 2000);

        } else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message);
        }

      }
    } catch (error) {
      openNotification("error", "input field is empty..", "Template name already exist");
    }

  }
  const getDecriptionById = async () => {
    const id = updateId
    try {
      const response = await getRecruitmentJobDescriptionTemplateById({ id: id })
      console.log(response)
      setTemplateName(response.result[0].descriptionTemplateName);
      setContent(response.result[0].descriptionTemplate);


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDecriptionById()
    console.log(templateName)
    console.log(content)
  }, [])

  // const handleEditorChange = (content) => {
  //   setContent(content);
  // };
  return (
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
        !updateId
          ? t("Create a Job Description Template")
          : t("Update Job Description Template"),
        !updateId
          ? t("Create a Job Description Template")
          : t("Update Job Description Template"),]}

      headerRight={
        <div className="flex items-center gap-10">
          {/* <p className="text-sm font-medium text-gray-400">
             Draft Saved 10 Seconds ago
           </p> */}
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
            <RxQuestionMarkCircled className="text-2xl font-medium text-gray-400 " />
          </div>
        </div>
      }
      footerBtn={[
        t("Cancel"),
        !updateId ? t("Save Template") : t("Update Template"),

      ]}
      className="widthFull"
      handleSubmit={(e)=>{handlesubmit(e)}}
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
      <div className="relative max-w-[1070px]  w-full mx-auto">
        <Accordion
          title={"Job Description"}
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
              title={"Template Name"}
              placeholder={"Enter Template Name..."}
              value={templateName}
              change={setTemplateName}
              error={templateNameError}
              required={true}
            />
          </div>
          <div className="border rounded-md bg-primaryalpha/5">
                        <div className="flex items-center px-1.5  ">
                          <img src={AI_Text} alt=''className="border rounded-md"></img>
                          <div className="flex flex-col gap-1 p-1.5">
                            <div className="flex items-center justify-between ">
                              <p className="font-bold">Generate personalized job descriptions based on pas account data.
                              </p>
                              {/* <p className="text-primary"><IoClose /></p> */}
                            </div>
                            <p className="text-gray-400">When you generate with Al, we look for similar jobs you've created in the past and use he data to create content that's
                              impactful, accurate, and personalized to your company
                            </p>
                          </div>
                        </div>
                        </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            {/* <Button>
        <Space>
        Choose Job Description
          <DownOutlined />
        </Space>
      </Button> */}

            <ButtonClick handleSubmit={handleGenerateWithAI} BtnType="primary" icon={<img src={image} alt="image" style={{ height: '20px', width: '20px', alignItems: "center" }} />} buttonName={"Generate with AI"} />
          </div>

          <div className='font-bold'>About the role</div>
          <div className='border rounded-2xl p-5'>
            {/* <TextArea
              title={"Description"}
              placeholder={"Enter the job description here, include key areas of resposibility on what the candidate might do on a typical day."}
            /> */}
            <div className='pt-5'>
              <TextEditor
                title={"Description"}
                onChange={(e)=>{
                  setContent(e)
                  console.log(e)
                }}
                initialValue={content}
                placeholder={"Enter the job description here, include key areas of resposibility on what the candidate might do on a typical day."}
                error={contentError}
                loader={loader}
              />
            </div>
          </div>

        </Accordion>
      </div>
      {contextHolder}
    </DrawerPop>
  )
}

export default TemplateDec