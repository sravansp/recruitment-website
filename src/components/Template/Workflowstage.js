import React,{useState} from 'react'
import { useTranslation } from 'react-i18next';
import DrawerPop from '../common/DrawerPop';
import FlexCol from '../common/FlexCol';
import Accordion from '../common/Accordion';
import FormInput from '../common/FormInput';
import { MdDelete, MdOutlineLock } from 'react-icons/md';
import AddMore from '../common/AddMore';
import { SlEnergy } from 'react-icons/sl';
import { AiFillThunderbolt } from 'react-icons/ai';
import { Formik,useFormik } from 'formik';
import { saveRecruitmentWorkFlow } from '../Api1';
import { PiPencilSimpleLineThin } from 'react-icons/pi';
import { Modal,Button } from 'antd';
import image from "../../assets/images/image 622.png"

const Workflowstage = ({open = "", close = () => { },inputshow= false,isUpdate={}}) => {
  
  
    const[show,setShow] =useState(open);
    const { t } = useTranslation();
    const handleClose = () => {
        close(false);
      };
      const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
      const [presentage, setPresentage] = useState(0);

      const formik = useFormik({
        initialValues :{
          companyId : "",
          workFlowName:"",
          description:"",
          createdBy:"",

        },
        onSubmit : async (e)=>{

         try{
        const response = await saveRecruitmentWorkFlow({
         companyId:companyId,
         workFlowName:e.workFlowName,
         description :null,
         createdBy: 9,

        })
        console.log(response)

         }catch(error)
         {
         console.log(error)          
         }

        }

      })
//Modal
const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddStageClick = () => {
    // Set the state to true to show the modal
    setIsModalVisible(true);
    console.log("hhhh");
  };

  const handleModalClose = () => {
    // Set the state to false to hide the modal
    setIsModalVisible(false);
  };
 const formik1 = useFormik ({
  
 })
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
         : t("Create a Job Description Template"),
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
    
    handleSubmit={()=>{formik.handleSubmit()}}
    >

{/* <div class="vertical-container background" id="main">
  <div class="vertical-body">
    <div class="container">
      <h2 class="title">Comming Soon</h2>
      <p>Something will appear here</p>
    </div>
  </div>
</div> */}
 
 <div className="relative max-w-[1070px]  w-full mx-auto">
<FlexCol/>
<Accordion
title={"Workflow"}
className="Text_area"
description={"lorem ipsum dummy text dolar sit."}
padding={false}
toggleBtn={false}
click={() => {
  setPresentage(1.4);
}}
initialExpanded={true}
>
<div
              id={`acco-text-item`}
              role="region"
              aria-labelledby={`acco-title-item`}
              className="flex flex-col gap-6  justify-between w-full px-6 py-4"
            >
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  title={"Workflow Name"}
                  placeholder={"Type here..."}
                  className="!text-[#344054]"
                  change={(e)=>{
                    formik.setFieldValue('workFlowName',e)
                  }}
                  value={formik.values.workFlowName}
                />


                </div>
                <div className="w-full sm:w-[545px] grid grid-cols-1 gap-4">
  <div className='flex  gap-5'> 
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="545"
    height="55"
    viewBox="0 0 545 55"
    fill="none"
    className="hover:fill-violet-100 w-full h-auto"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M0 6C0 2.68629 2.68629 0 6 0H532.47L544.753 27.0908L532.47 54.1816H5.99998C2.68627 54.1816 0 51.4953 0 48.1816V6Z"
      fill="#FCFCFC"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M0.5 6C0.5 2.96244 2.96243 0.5 6 0.5H532.148L544.204 27.0908L532.148 53.6816H5.99998C2.96241 53.6816 0.5 51.2192 0.5 48.1816V6Z"
      stroke="black"
      stroke-opacity="0.1"

    />
     <foreignObject x="30" y="0" width="545" height="55">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
      <span>Sourced</span>
      <MdOutlineLock className='mr-12' />
    </div>
  </foreignObject >
  </svg>
<div className='flex items-center gap-5'>
<PiPencilSimpleLineThin />
  <MdDelete
                                          
                                          className="cursor-pointer text-red-500" />
</div>
</div>

 
</div>

                </div>
                <AddMore name="Add Stage" className="text-black" change={(e)=>{handleAddStageClick()}} />
                <Modal
        // title="Vertically centered modal dialog"
        wrapClassName="vertical-center-modal"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalClose}>
            OK
          </Button>,
        ]}
      >
        <div className='flex flex-col gap-5'>
        <div className="flex flex-col items-center justify-center font-semibold font-['Inter'] leading-relaxed">
  <p>Add Stages</p>
  <img
  src={image}
  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
  alt="Your Image"
/>
</div>
        <FormInput
        title={"Stage Name"}
        placeholder={"Type here..."}
        value={formik.values}
        
        />
        <AddMore name="Add stage rule" className="text-black" />
        </div>
        
      </Modal>
  </Accordion>
  </div>
    </DrawerPop>
  )
}

export default Workflowstage