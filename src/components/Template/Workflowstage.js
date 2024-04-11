import React,{useEffect, useState} from 'react'
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
import { saveRecruitmentWorkFlow,saveRecruitmentWorkFlowStageBatch,getRecruitmentWorkFlowById,updateWorkFlowWithStages } from '../Api1';
import { PiPencilSimpleLineThin } from 'react-icons/pi';
import { Modal,Button,notification } from 'antd';
import image from "../../assets/images/image 622.png"
import TextArea from '../common/TextArea';

const Workflowstage = ({open = "", close = () => { },inputshow= false,isUpdate={},updateId,refresh}) => {
  
  
  const [successNotificationVisible, setSuccessNotificationVisible] = useState(false);   
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
  
    
    const[show,setShow] =useState(open);
    const { t } = useTranslation();
    const handleClose = () => {
        close(false);
        formik.resetForm();
        
        
      };
      const [editStageIndex, setEditStageIndex] = useState(null)
      const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
      const [presentage, setPresentage] = useState(0);
      const [stageName, setStageName] = useState('');
      const[insertedId,setInsertedId]=useState("")
      const [stages,setstages] = useState(
       [
       
      ]
      )
      const [selectedStageName, setSelectedStageName] = useState('');
      
      const handleEditStage = (stageIndex) => {
        // Find the index of the stage with the given stage name
        const index = stages.findIndex(stage => stage.stageName === stageIndex);
        
      
        if (index !== -1) { // Check if the stage name exists in the stages array
          setSelectedStageName(stages[index].stageName);
          setEditStageIndex(index);
          setIsModalVisible(true);
        } else {
          console.error('Invalid stage name:', stageIndex);
        }
      };
      useEffect(()=>{
        console.log(stages)
      },[stages])
      const handleAddStageClick = () => {
        if (editStageIndex !== null) {
          // If editStageIndex is not null, it means we're editing an existing stage
          // Update the corresponding stage name in the stages array
          setstages((prevStages) =>
            prevStages.map((stage, index) =>
              index === editStageIndex ? { ...stage, stageName: stageName } : stage
            )
          );
        } else {
          // Otherwise, we're adding a new stage
          // Add the new stage to the stages array
          setstages ((prevEvaluation) => [
            ...prevEvaluation,
            {
              id: stages.length + 1,
              workFlowId: insertedId,
              stageOrder: stages.length + 1,
              stageName: stageName,
              stageRules: {
                id: 1,
                key1: '',
                value: '',
              },
              createdBy: 9,
            },
          ]);
        }
    
        setIsModalVisible(false); // Close the modal
        setEditStageIndex(null); // Clear the editStageIndex
      };
      const handleDeleteStage = (id) => {
        setstages((prevStages) => prevStages.filter((stage) => stage.id !== id));
      };
//Modal
const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleAddStageClick = () => {
  //   // Set the state to true to show the modal
  //   setIsModalVisible(true);
  //   console.log("hhhh");
  // };

  const handleModalClose = () => {
    // Set the state to false to hide the modal
    setIsModalVisible(false);
  };
 const formik1 = useFormik ({
  
 })

//  const handleAddStageRule = () => {
//   // Add your logic for handling the "Add stage rule" button click
//   // You can use the values of stageName and other inputs here
//   // For now, let's just update the SVG content with the stageName
//   setSvgContent(stageName);
//   setIsModalVisible(false);
// };

const [svgContent, setSvgContent] = useState('');

const formik = useFormik({
  initialValues: {
    companyId: "",
    workFlowName: "",
    description: "",
    createdBy: "",
  },
  onSubmit: async (values, { setSubmitting }) => {
    try {
      if(updateId){
        const formattedData = stages.map((item) => ({
          stageId: item.id, // Add stageId property
          stageOrder: item.stageOrder,
          stageName: item.stageName,
          stageRules: JSON.stringify(item.stageRules),
          workFlowId:updateId,  // Assuming stageRules is available in item
          createdBy: 9,
        }));
        const response = await updateWorkFlowWithStages({
          RecruitmentWorkFlow:{
            workFlowId:updateId,
            companyId: companyId,
            workFlowName:values.workFlowName,
            description:values.description,
            modifiedBy:9,

          },
          RecruitmentWorkFlowStage:[
            ...formattedData

          ]
         
        });
        console.log(response)
        if (response.status === 200) {
          openNotification("success", "Successful", response.message);
          setTimeout(() => {
            handleClose();
            refresh();
          }, 1500);
        } else if (response.status === 500) {
          openNotification("error", "error", response.message);
        }


      }else{
        const response = await saveRecruitmentWorkFlow({
        companyId: companyId,
        workFlowName: values.workFlowName,
        description: values.description,
        createdBy: 9,
      });

      console.log(response);

      if (response.status === 200) {
        const insertedId = response.result.insertedId; // Get insertedId here
        const formattedData = stages.map((item) => ({
          workFlowId: insertedId,
          stageOrder: item.stageOrder,
          stageName: item.stageName,
          stageRules: JSON.stringify(item.stageRules),
          createdBy: 9,
        }));

        const response2 = await saveRecruitmentWorkFlowStageBatch(formattedData);
        console.log('Response2:', response2);
        console.log(formattedData);
        console.log(insertedId);

        if (response2.status === 200) {
          openNotification("success", "Successful", response2.message);
          setTimeout(() => {
            handleClose();
            refresh();
          }, 1500);
        } else if (response2.status === 500) {
          openNotification("error", "error", response2.message);
        }
      }
    }
  } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  },
});
//update


const[workFlowsatges,setworkFlowsatges] = useState([])
const getworkFlow =async()=>{
  const id = updateId
  try{
   const response = await getRecruitmentWorkFlowById({id})
   console.log(response)
   setworkFlowsatges(response.result)
   
   if (response.result.length > 0) {
    const firstJob = response.result[0];
    
    // Set workflow name
    formik.setFieldValue("workFlowName", firstJob.workFlowName);
    formik.setFieldValue("description",firstJob.description)

    // Set stages
    const stagesData = firstJob.recruitmentWorkFlowStages.map(stage => ({
      id: stage.stageId,
      workFlowId: stage.workFlowId,
      stageOrder: stage.stageOrder,
      stageName: stage.stageName,
      stageRules:stage.stageRules
    }));
    setstages(stagesData);
    console.log(stagesData); // Check here
  }
  }catch (error){
   
    console.log(error)
   
  }
}
useEffect(()=>{
  getworkFlow()
  console.log(stages);
},[])

//update workflow

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
         ? t("Create a Worklow Template")
         : t("Update Worklow stages"),
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextArea
                title={"Description"}
                placeholder={"Type here..."}
                className="!text-[#344054]"
                change={(e)=>{
                  formik.setFieldValue('description',e)
                }}
                value={formik.values.description}
                
                />
                </div>
                <div className="w-full sm:w-[545px] grid grid-cols-1 gap-4">
                {console.log(stages)}
                {stages.map((stage) => (
        <div key={stage.id} className="flex gap-5">
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
      <span>{stage.stageName}</span>
      <MdOutlineLock className='mr-12' />
    </div>
  </foreignObject >
  </svg>
  <div className='flex  gap-5'> 
 
 <div className='flex items-center gap-5'>
 <PiPencilSimpleLineThin onClick={() => handleEditStage(stage.stageName)}/>
   <MdDelete onClick={() => handleDeleteStage(stage.id)}
                                           
                                           className="cursor-pointer text-red-500" />
 </div>
 </div>
        </div>
        
      ))}



 
</div>

                </div>
                <AddMore name="Add Stage" className="text-black" change={(e)=>setIsModalVisible(true)} />
                <Modal
        // title="Vertically centered modal dialog"
        wrapClassName="vertical-center-modal"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary"  onClick={handleAddStageClick}>
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
        value={selectedStageName}
        change={(e) => {
          setStageName(e)
          setSelectedStageName(e)
        
        }}
        
        />
        <AddMore name="Add stage rule" className="text-black" />
        </div>
        
      </Modal>
  </Accordion>
  {contextHolder}
  </div>
    </DrawerPop>
  )
}

export default Workflowstage