import React,{useState} from 'react'
import DrawerPop from '../common/DrawerPop'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next'
import { Button, Card, Space ,notification } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from '../common/TextArea'
import image from '../../assets/images/generate-ai-img.png'
import TextEditor from '../common/TextEditor/TextEditor'
import FormInput from '../common/FormInput'
import ToggleBtn from '../common/ToggleBtn'
import Dropdown from '../common/Dropdown'
import { MdDelete, MdOutlineFileCopy } from 'react-icons/md'
import { Form } from '../data'
import { CgAdd } from 'react-icons/cg'
import { saveRecruitmentEvaluationTemplate,saveRecruitmentEvaluationTemplateDetailBatch} from '../Api1'
import { Formik, useFormik } from 'formik';


const TemEvaluation = ({open = "", close = () => { },inputshow= false,isUpdate={}}) => {
    
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  console.log(companyId)  
  const [savedContent, setSavedContent] = useState([]);

    const[show,setShow] =useState(open);
    const { t } = useTranslation();
    const handleClose = () => {
        close(false);
      };
      const [content, setContent] = useState("")
      const handleEditorChange = (content) => {
        setContent(content);
      };
      const [conditions, setConditions] = useState([
        {
          id: 1,
          inputValue: '',
          selectedValue: '',
        },
    ]);
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
    
    const handleAddCondition = () => {
      const newCondition = {
        id: conditions.length + 1,
        inputValue: '',
      selectedValue: '',
       
      };
     
      setConditions([...conditions, newCondition]);
  };
  
  
  const handleDeleteCondition = (conditionId) => {
      if (conditions.length > 1) {
        const updatedConditions = conditions.filter((condition) => condition.id !== conditionId);
        setConditions(updatedConditions);
      }
  };
  const[insertedId,setinsertedId] =useState(null)
  
  const formik = useFormik({
    initialValues: {
      companyId:"",
      evaluationTemplateName:"",
      createdBy:""
     
   
    },
       //  enableReinitialize: true,
       //   validateOnChange: false,
       //   validationSchema: yup.object().shape({
       //     firstName: yup.string().required("First Name is Required"),
       //     lastName: yup.string().required("Last Name is Required"),
       //     email: yup.string().required("Email is Required"),
       //     mobile: yup.string().min(10).max(10).required("Mobile is Required"),
       //     gender: yup.string().required("Gender is Required"),
       //     dateOfBirth: yup.string().required("Date of Birth Group is Required"),
       //   }),
    onSubmit: async (e) => {
     try{
       console.log({companyId:companyId,
        evaluationTemplateName:e.evaluationTemplateName,
        createdBy:null,})
       const response = await saveRecruitmentEvaluationTemplate({
       companyId:companyId,
       evaluationTemplateName:e.evaluationTemplateName,
       createdBy:null,
   
       
       })
       console.log(response)
       
       
       if (response.status === 200) {
         
         
         openNotification(
           "success",
           "Successful",
           "createpoilicy update saved. Changes are now reflected."
         );
         setinsertedId(response.result.insertedId)
         if(response.result.insertedId)
         formik1.handleSubmit()
       }
     }
     catch (error) {
       // Handle the error here
       console.error("Error during form submission:", error);
           openNotification(
             "error",
             "Error saving category",
             "There was an error while saving the category. Please try again."
           );
     }
   
    },
   })
   const formik1 = useFormik({
    initialValues: {
      
      customFields:[
      {companyId:"",
      evaluationTemplateId:"",
      question: "" , // Provide a default value if 'each' or 'each.question' is undefined
      // answer_type: each?.answer_type || "",
      // Assuming is_required should be a number (0 or 1)
      answerMetaData: "" , 
      description:""
    }
  ]  
      
      
      
    },
    onSubmit: async (e) => {
      
      try {
        console.log(e,insertedId)
        const response = await saveRecruitmentEvaluationTemplateDetailBatch(
         {
          customFields: (e.customFields.default ||[]).map((each) => ({
            companyId:companyId,
            evaluationTemplateId:insertedId,
            question: each?.question , // Provide a default value if 'each' or 'each.question' is undefined
            // answer_type: each?.answer_type || "",
            // Assuming is_required should be a number (0 or 1)
            answerMetaData: each?.answerMetaData , 
            description:null
            // Provide a default value if 'each.answer_meta_data' is undefined
          })),
        
  
  
  
         } );
  
        // Handle the response if needed
        console.log('Response:', response);
        
        if (response.status === 200) {
        
        
          openNotification(
            "success",
            "Successful",
            "createpoilicy update saved. Changes are now reflected."
          );
       
       
        }
      } catch (error) {
        // Handle the error here
        console.error('Error:', error);
      }
    },
  });
  
  
  const generateInputField = (e, condition, index) => {
    console.log("value",e)
    
   
    console.log('Saved content:', savedContent);
    switch (e) {
      
//       case 'Paragraph':
//         return (
//           <TextArea
//   value={formik.values.customFields[index].answer_meta_data}
//   change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
// />
//         );
//       case 'ShortAnswer':
//         return (
//           <FormInput
//   value={formik.values.customFields[index].answer_meta_data}
//   change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
// />
//         );
      case 'Drop-down':
        return (
          
          <FormInput
            // value={formik.values.customFields[index].answer_meta_data}
            // change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
          />
        
      
        
          
        );
      default:
        // return <FormInput value={formik.value.Default} change={(newValue) => handleChange(newValue, index)} />;
    }
  };

  const handleDropdownChange = (e, conditionIndex) => {
    const updatedConditions = [...conditions];
    updatedConditions[conditionIndex].e = e;
    setConditions(updatedConditions); 
  };

  const handleSubmit = async () => {
  formik.handleSubmit()
  

  }
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
       !isUpdate
         ? t("Create Evaluation Template")
         : t("Create Evaluation Template"),
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
    
    
    > <div  className="relative max-w-[1070px]  w-full mx-auto">
          <Accordion
                                               title={"New Evaluation Templates"}
                                               className="Text_area"
                                               padding={true}
                                               toggleBtn={false}
                                               click={() => {
                                              //    setPresentage(1.4);
                                               }}
                                               initialExpanded={true}
                                        > 
                                       <div className='grid grid-cols-2'>
                                       <FormInput
                                       title={"Template Name"}
                                       placeholder={"Type here..."}
                                       value={formik.values.evaluationTemplateName}
                                       change={(e)=>{
                                        formik.setFieldValue('evaluationTemplateName',e)
                                       }}
                                       
                                       />
                                       </div>
                                    
                                       {conditions.map((condition, index) => (
                <div key={index} className="grid grid-cols-4 gap-16  justify-between">
       <FormInput
  placeholder={'Type question here'}
  value={formik.values.customFields.default?.[index]?.question}

  change={(e) => {
    formik.setFieldValue(`customFields.default[${index}].question`, e);
    console.log("question value", e);
  }}
/>

<Dropdown
  options={Form}
  change={(e) => {
    formik.setFieldValue(`customFields.default[${index}].answerMetaData`, e);
    handleDropdownChange(e,index)
    console.log("dropdown", e);
  }}
  value={formik.values.customFields.default?.[index]?.answerMetaData}
  icondropDown={true}
/>


                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <p>Mandatory</p>
                        <ToggleBtn />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <MdOutlineFileCopy
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <MdDelete
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            onClick={() => handleDeleteCondition(condition.id)}
                        />
                    </div>
                    {generateInputField(
                        condition.e,
                        condition,
                        index,
                        'Drop-down',
                        null,
                        condition.inputValue
                        
                    )}
                </div>
            ))}
             <div className="flex items-center gap-2">
                <CgAdd style={{ width: '34px', height: '34px', cursor: 'pointer' }} onClick={handleAddCondition} />
                <p style={{ cursor: 'pointer' }}>  Add Custom Field</p>
            </div>
                                        </Accordion>
                                        </div>  
    </DrawerPop>
   
    </div>
  )
}

export default TemEvaluation