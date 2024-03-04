import React,{useState} from 'react'
import DrawerPop from '../common/DrawerPop'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next'
import { Button, Card, Space } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from '../common/TextArea'
import image from '../../assets/images/generate-ai-img.png'

const TemplateDec = ({open = "", close = () => { },inputshow= false,isUpdate={}}) => {
  
    const[show,setShow] =useState(open);
    const { t } = useTranslation();
    const handleClose = () => {
        close(false);
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
         : t("Create a Job Temaplate"),
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
                                        <Card>
                                            <TextArea
                                             title={t("Description")}
                                             placeholder={t("Enter the Job description here; include key reas of responsibility an what the candidate mi ht do on a typical day.")}
                                             required={true}
                                             hideBorder={true} 
                                             
                                            //  value={formik1.values.jobDescription}
                                            //  change={(e)=>{
                                            //    formik1.setFieldValue('jobDescription',e)
                                            //  }}
                                             />
                                                  <TextArea
                                             title={t("Requirement")}
                                             placeholder={t("Enter the job requirements here; from soft skills to the specific qualifications needed to perform the role.")}
                                             required={true}
                                             hideBorder={true} 
                                              // value={formik1.values.jobDescription}
                                              // change={(e)=>{
                                              //   formik1.setFieldValue('jobDescription',e)
                                              // }}
                                             />
                                                  <TextArea
                                             title={t("Benefits")}
                                             placeholder={t("Enter the benefits here; Include nat just sa aty details but the perks that make your ca:npany unique.")}
                                             required={true}
                                             hideBorder={true} 
                                            //  change={(e) => {
                                            //    formik.setFieldValue("description", e);
                                            //    if (presentage < 1.3)
                                            //          setPresentage(presentage + 0.1);
                                               
                                            //  }}
                                            //  value={formik.values.description || selectedAccordionItem?.description || fetchedData.description}
                                            //  error={formik.errors.description}
                                             />
                                             </Card>

                                        </Accordion>
                                        </div>
    </DrawerPop>
  )
}

export default TemplateDec