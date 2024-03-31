import React,{useEffect, useState} from 'react'
import DrawerPop from '../common/DrawerPop'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next'
import { Button, Card, Space,notification } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from '../common/TextArea'
import image from '../../assets/images/generate-ai-img.png'
import TextEditor from '../common/TextEditor/TextEditor'
import {updateRecruitmentJobDescriptionTemplate, saveRecruitmentJobDescriptionTemplate,getRecruitmentJobDescriptionTemplateById } from '../Api1'
import FormInput from '../common/FormInput'

const TemplateDec = ({open = "", close = () => { },inputshow= false,isUpdate={},updateId}) => {
    
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [templateName, setTemplateName] = useState("");  
  const[show,setShow] =useState(open);
    const [content, setContent] = useState("");
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

      const handlesubmit =async ()=>{
      try{
        if(!updateId){
        const response = await saveRecruitmentJobDescriptionTemplate({
        companyId: companyId,
        descriptionTemplateName: templateName ,
        descriptionTemplate: content ,
        createdBy: null
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
          }, 2000);
        
        }else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message);
        }
      }else{
        const id= updateId
        const response = await updateRecruitmentJobDescriptionTemplate({
          id:id,
          companyId:companyId,
          descriptionTemplateName:templateName,
          descriptionTemplate:content,
          modifiedBy:null
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
          }, 2000);
        
        }else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message);
        }

      }
      }catch(error){
         console.log(error)
      }

      }
      const getDecriptionById= async()=>{
        const id = updateId
        try{
        const response = await getRecruitmentJobDescriptionTemplateById({id:id})
        console.log(response)
        setTemplateName(response.result[0].descriptionTemplateName );
        setContent(response.result[0].descriptionTemplate );
        
        
        }catch(error){
        console.log(error)
        }
      }
      useEffect(()=>{
        getDecriptionById()
        console.log(templateName)
        console.log(content)  
      },[])

      const handleEditorChange = (content) => {
        setContent(content);
      };
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
       !isUpdate
         ? t("Create a Job Description Template")
         : t("Update Job Description Template"),
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
       !updateId ? t("Save Template") : t("Update Template"),
       
     ]}
     className="widthFull"
     handleSubmit={handlesubmit}
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
        <div  className="relative max-w-[1070px]  w-full mx-auto">
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
                  placeholder={"type here"}
                  value={templateName}
                  change={setTemplateName}
                />
              </div>
                                        <Card>
                                         <div>
                                        <img alt=''></img>
                                         <p>Generate personalized job descriptions based on pas account data.</p>
                                         <p>When you generate with Al, we look for similar jobs you've created in the past and use he data to create content that's
impactful, accurate, and personalized to your company</p>
                                         </div>
                                        
                                        </Card>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                                        {/* <Button>
        <Space>
        Choose Job Description
          <DownOutlined />
        </Space>
      </Button> */}
      <Button type="primary" icon={<img src={image} alt="image" style={{ height: '20px', width: '20px',justifyContent:"center" }} />} >
      <span >Generate with AI</span>
      
          </Button>
                                        </div>
                                    
              <TextEditor
                initialValue={content}
                onChange={handleEditorChange}
                minheight="250px"
              />

                                        </Accordion>
                                        </div>
                                        {contextHolder}
    </DrawerPop>
  )
}

export default TemplateDec