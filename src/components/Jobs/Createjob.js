import React, { useState,useEffect } from 'react'
import DrawerPop from '../common/DrawerPop';
import { useTranslation } from "react-i18next"; 
import { RxCross2, RxQuestionMarkCircled } from "react-icons/rx";
import Stepper from '../common/Stepper';
import { Button, Card, Checkbox, Flex, List, Radio ,Space, notification} from 'antd';
import Accordion from '../common/Accordion';
import FlexCol from '../common/FlexCol';
import Dropdown from '../common/Dropdown';
import FormInput from '../common/FormInput';
import VirtualList from "rc-virtual-list";
import CheckBoxInput from '../common/CheckBoxInput';
import { Employees } from '../data';
import * as Yup from 'yup';

import TextArea from '../common/TextArea';
import Radiobuttonnew from '../common/Radiobuttonnew';
import GoogleForm from '../common/GoogleForm';
import JobCard from '../common/JobCard';
import { cardData, regularOvertime,Requirment,JobType,experiencelevel,eductaion,saleryCurrency } from '../data';
import { saveRecruitmentJobApplicationFormSetting,saveRecruitmentJob,getAllRecruitmentWorkFlows,updateRecruitmentJob,getAllRecruitmentJobTeamMembers } from '../Api1';
import { Formik, useFormik } from 'formik';
import { CgAdd } from "react-icons/cg";
import { Form } from '../data';
import { MdContentCopy, MdOutlineFileCopy } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ToggleBtn from '../common/ToggleBtn';
import { index } from 'd3';
import axios from "axios";
import API from '../Api';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import image from '../../assets/images/generate-ai-img.png'
import Item from 'antd/es/list/Item';
import TableAnt from '../common/TableAnt';
import SearchBox from '../common/SearchBox';
import TabsNew from '../common/TabsNew';
import Tabs from '../common/Tabs';
import indeed from "../../assets/images/indeed.png";
import bayt from "../../assets/images/Bayt.png";
import linkedin from "../../assets/images/Linked.png";
import gulftalent from "../../assets/images/gulftalent.png";
import Naukrigulf from "../../assets/images/Naukrigulf.png";
import loyaltri from "../../assets/images/logo.png";
import ButtonClick from '../common/Button';





 

const Createjob = ( {open = "", close = () => { },inputshow= false,isUpdate={}}) => {
  
  const[show,setShow] =useState(open);
  const { t } = useTranslation();
  // const [isUpdate, setIsUpdate] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState("Jobdetails"); //LeaveType
  const [btnName, setBtnName] = useState();
  const [customRate, setCustomRate] = useState(1);
  const [savedContent, setSavedContent] = useState([]);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [selectedCompany, setSelectedCompany] = useState(null);
  const loginDataString = localStorage.getItem('LoginData');
  const [userid, setuserid] = useState("");
  const [workFlows, setWorkFlows] = useState([]);
  const [selectedWorkFlowId, setSelectedWorkFlowId] = useState(null);
  const [selectedDivs, setSelectedDivs] = useState([]);

  useEffect(() => {
    // Retrieve the login data JSON string from local storage
    const loginDataString = localStorage.getItem('LoginData');

    if (loginDataString) {
      // Parse the JSON string to get the LoginData object
      const loginData = JSON.parse(loginDataString);

      // Extract the username from the userData object
      setuserid(loginData && loginData.userData && loginData.userData.id);

      // Now, 'username' variable contains the username
      
    } else {
      console.error('Login data not found in local storage.');
    }
  }, []); // Empty dependency array ensures the useEffect runs only once

  console.log('Username:', userid);
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
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    
  }, []);
  const [organisationId, setOrganisationId] = useState(
    localStorage.getItem("organisationId")
  );
  // const [isGoogleFormVisible, setIsGoogleFormVisible] = useState(false);
  const [conditions, setConditions] = useState([
    {
      id: 1,
      inputValue: '',
      selectedValue: '',
    },
]);
const [dropdownOptions, setDropdownOptions] = useState([]);
const [jobId,setJobId] =useState("")


//job applying

const formik1 = useFormik({
 initialValues: {
  companyId:"",
  jobTitle:"",
  departmentId:"",
  jobCode:"",
  workLocationType:"Onsite",
  location:"",
  requirementType:"",
  jobType:"",
  experience:"",
  education:"",
  searchKeywords:"",
  salaryRangeFrom:"",
  salaryRangeTo:"",
  salaryCurrency:"",
  isSalaryPublic: "true",
  jobDescription:"",
  workFlowId:"",
  jobPublishType:"",
  jobPublishDetails:"",
  createdBy:"",
  

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
    console.log(e)
    const response = await saveRecruitmentJob({
    companyId:companyId,
    jobTitle:e.jobTitle,
    departmentId:e.departmentId,
    jobCode:e.jobCode,
    workLocationType:e.workLocationType,
    location:e.location,
    requirementType:e.requirementType,
    jobType:e.jobType,
    experience:e.experience,
    education:e.education,
    searchKeywords:e.searchKeywords,
    salaryRangeFrom:e.salaryRangeFrom,
    salaryRangeTo:e.salaryRangeFrom,
    salaryCurrency:e.salaryCurrency,
    isSalaryPublic:e.isSalaryPublic,
    jobDescription:e.jobDescription,
    workFlowId:null,
    jobPublishType:null,
    jobPublishDetails:null,
    createdBy:userid

    
    })
    console.log(response)
    setJobId(response.result.insertedId)
    console.log(jobId)
    if (response.status === 200) {
      
      
      openNotification(
        "success",
        "Successful",
        "createpoilicy update saved. Changes are now reflected."
      );
      setPresentage(2);
      setNextStep(nextStep + 1);
    }else if (response.status === 500) {
      openNotification("error", "input field is empty..", response.message);
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
const [departmentList, setDepartmentList] = useState();

const getDepartmentList = async () => {
  console.log(API.HOST + API.GET_DEPARTMENT + "/" + companyId);
  const result = await axios.post(
    API.HOST + API.GET_DEPARTMENT + "/" + companyId
  );
  // setDepartmentList(result.data.tbl_department);
     setDepartmentList( result.data.tbl_department.map((each) => ({
      label: each.department,
      value: each.departmentId,
    })))
  console.log("calue" ,departmentList);
  console.log(isUpdate)
};
useEffect(() => {
  // switch (assignBtnName) {
  //   default:
  getDepartmentList();

}, []);
// const [locationList, setLocationList] = useState([]);
// const getLocationList = async () => {
//   console.log(companyId);
//   console.log(API.HOST + API.GET_LOCATION + "/" + companyId);
//   // console.log("navigationPath",navigationPath);
//   const result = await axios.post(
//     API.HOST + API.GET_LOCATION + "/" + companyId
//   );
//   // setLocationList(result.data.tbl_location);
//   setLocationList( result.data.tbl_location.map((each) => ({
//     label: each.location,
//     value: each.locationId,
//   })))
//   console.log(result);
// };
// useEffect(() => {
//   // switch (assignBtnName) {
//   //   default:
//   getLocationList();

// }, []);
const formik = useFormik({
  initialValues: {
    jobId:"1",
    name: "1",
    email: "1",
    headline: "1",
    phone: "1",
    address: "1",
    country: "1",
    education: "1",
    experience: "1",
    summary: "1",
    resume: "1",
    coverLetter: "1",
    customFields: [
      {
        question: "",
        answer_type: "",
        is_required: "", //0 or 1
        answer_meta_data: "",
      },
    ],
  },
  onSubmit: async (e) => {
    try {
      console.log(e)
      const response = await saveRecruitmentJobApplicationFormSetting({
        jobId:jobId,
        name: e.name,
        email: e.email,
        headline: e.headline,
        phone: e.phone,
        address: e.address,
        country: e.country,
        education: e.education,
        experience: e.experience,
        summary: e.summary,
        resume: e.resume,
        coverLetter: e.coverLetter,
        customFields: (e.customFields.default || []).map((each) => ({
          question: each?.question || "", // Provide a default value if 'each' or 'each.question' is undefined
          answer_type: each?.answer_type || "",
          is_required: each?.is_required || 0, // Assuming is_required should be a number (0 or 1)
          answer_meta_data: each?.answer_meta_data || [], // Provide a default value if 'each.answer_meta_data' is undefined
        })),
         
      



      });

      // Handle the response if needed
      console.log('Response:', response);
      if (response.status === 200) {
      
      
        openNotification(
          "success",
          "Successful",
          "createpoilicy update saved. Changes are now reflected."
        );
        setPresentage(2);
        setNextStep(nextStep + 1);
      }else if (response.status === 500) {
        openNotification("error", "input field is empty", response.message);
      }
    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      openNotification("error", "Failed..", error);
    }
  },
});



const handleDropdownChange = (e, conditionIndex) => {
  const updatedConditions = [...conditions];
  updatedConditions[conditionIndex].e = e;
  setConditions(updatedConditions); 
};

const handleAddCondition = () => {
    const newCondition = {
      id: conditions.length + 1,
      inputValue: '',
    selectedValue: '',
     
    };
    // formik.setFieldValue(`customFields[${conditions.length}].question`, '');
    // formik.setFieldValue(`customFields[${conditions.length}].answer_type`, '');
    // formik.setFieldValue(`customFields[${conditions.length}].answer_meta_data`, '');
    setConditions([...conditions, newCondition]);
};


const handleDeleteCondition = (conditionId) => {
    if (conditions.length > 1) {
      const updatedConditions = conditions.filter((condition) => condition.id !== conditionId);
      setConditions(updatedConditions);
    }
};

const handleChange = (newValue, index) => {
    const updatedConditions = [...conditions];
    const currentCondition = updatedConditions[index];

    if (currentCondition) {
        // Ensure the condition object is defined before updating its properties
        currentCondition.inputValue = newValue;
        setConditions(updatedConditions);
    }
};
const handleSaveInput = (index) => {
    const updatedDropdownOptions = [...dropdownOptions];
  
    if (index === 0) {
      // Handle the first condition differently
      const numberOfArraysToAdd = 1; // You can adjust this number as needed
      for (let i = 0; i < numberOfArraysToAdd; i++) {
        updatedDropdownOptions.push({
          id: conditions[0].id,
          label: conditions[0].inputValue , // Adjust label as needed
          value: conditions[index].selectedValue,
        });
      }
    } else {
      // For other conditions, update the existing array
      updatedDropdownOptions[index] = {
        id: conditions[index].id,
        label: conditions[index].inputValue,
        value: conditions[index].inputValue,
      };
    }
  
    setDropdownOptions(updatedDropdownOptions);
  };
  const handleAddField = () => {
    // Add a new custom field to the formik values array
    formik.setFieldValue("customFields", [
      ...formik.values.customFields,
      { answer_meta_data: "" },
    ]);
  };

  const handleDeleteField = (index) => {
    // Remove the custom field at the specified index
    const updatedFields = [...formik.values.customFields];
    updatedFields.splice(index, 1);
    formik.setFieldValue("customFields", updatedFields);
  };
  const generateInputField = (e, condition, conditionIndex) => {
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
          
          <>
          {formik.values.customFields.map((field, index) => (
            <div key={index} className="flex items-center">
              <FormInput
                placeholder={"Enter value"}
                value={field.answer_meta_data}
                change={(e) =>
                  formik.setFieldValue(
                    `customFields[${index}].answer_meta_data`,
                    e
                  )
                }
              />
              <div className="ml-2">
                <MdDelete
                  onClick={() => handleDeleteField(index)}
                  className="cursor-pointer text-red-500"
                />
              </div>
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={handleAddField}
              className="flex items-center mt-2"
            >
              <CgAdd className="mr-1" />
              Add Field
            </button>
          </div>
        </>
         
      
        
          
        );
        case 'MultipleChoice':
          return (
          
            <>
            {formik.values.customFields.map((field, index) => (
              <div key={index} className="flex items-center">
                <FormInput
                  placeholder={"Enter value"}
                  value={field.answer_meta_data}
                  change={(e) =>
                    formik.setFieldValue(
                      `customFields[${index}].answer_meta_data`,
                      e
                    )
                  }
                />
                <div className="ml-2">
                  <MdDelete
                    onClick={() => handleDeleteField(index)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={handleAddField}
                className="flex items-center mt-2"
              >
                <CgAdd className="mr-1" />
                Add Field
              </button>
            </div>
          </>
           
        
          
            
          );
          case 'Checkboxes':
            return (
          
              <>
              {formik.values.customFields.map((field, index) => (
                <div key={index} className="flex items-center">
                  <FormInput
                    placeholder={"Enter value"}
                    value={field.answer_meta_data}
                    change={(e) =>
                      formik.setFieldValue(
                        `customFields[${index}].answer_meta_data`,
                        e
                      )
                    }
                  />
                  <div className="ml-2">
                    <MdDelete
                      onClick={() => handleDeleteField(index)}
                      className="cursor-pointer text-red-500"
                    />
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={handleAddField}
                  className="flex items-center mt-2"
                >
                  <CgAdd className="mr-1" />
                  Add Field
                </button>
              </div>
            </>
             
          
            
              
            );
      default:
        // return <FormInput value={formik.value.Default} change={(newValue) => handleChange(newValue, index)} />;
    }
  };

  const handleClose = () => {
    close(false);
  };

  
  const [steps, setSteps] = useState([
    {
      id: 1,
      value: 0,
      title: t("Jobdetails"),
      data: "Jobdetails",
    },

    {
      id: 2,
      value: 1,
      title: t("Applicationform"),
      data: "ApplicationForm",
    },
    {
      id: 3,
      value: 2,
      title: t("Workflow"),
      data: "Workflow",
    },
    {
        id: 4,
        value: 3,
        title: t("TeamMembers"),
        data: "TeamMembers",
      },
      {
        id: 5,
        value: 4,
        title: t("Publish"),
        data: "Publish",
      },
  ]);

  const Radiobuttons = [
    {
      id: 1,
      label: t("Mandatory"),
      value: 1,
    },
    {
      id: 2,
      label: t("Optional"),
      value: 2,
    },
    {
      id: 3,
      label: t("Off"),
      value: 0,
    },
  ];
  const tabs =[
    {
      id: 1,
      title: t("Public"),
      value: "Public",
    },
    {
      id: 2,
      title: t("Internal"),
      value: "Internal",
    },
    {
      id: 3,
      title: t("Confidential"),
      value: "Confidential",
    },

  
  ];
  const data = [
    { title: "Naukarigulf", image: Naukrigulf },
    { title: "Bayt", image: bayt },
    { title: "Linked in", image: linkedin },
    { title: "Gulf Talent", image: gulftalent },
    { title: "Indeed", image: indeed },
    { title: "Loyaltri", image: loyaltri },
  ];
  const handleCheckboxChange = (index) => {
    if (selectedDivs.includes(index)) {
      setSelectedDivs(selectedDivs.filter((item) => item !== index));
    } else {
      setSelectedDivs([...selectedDivs, index]);
    }
  };
  const selectedCount = selectedDivs.length;

  useEffect(() => {
    console.log(nextStep, activeBtn);
    if (activeBtn < 4 && activeBtn !== nextStep) {
      /// && activeBtn !== nextStep
      setActiveBtn(1 + activeBtn);
      setNextStep(nextStep);
      console.log(1 + activeBtn);
      console.log(steps?.[activeBtn + 1].data, "data");
      setActiveBtnValue(steps?.[activeBtn + 1].data);
    }
  }, [nextStep]);

 const [company,setCompany] =useState([])
  const getCompany = async () => {
    try {
      const result = await axios.post(
        API.HOST + API.GET_COMPANY_RECORDS + "/" + organisationId
      );
      setCompany(
        result.data.tbl_company.map((each) => ({
          label: each.company,
          value: each.companyId,
        }))
      );
      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    console.log("company",company)
  };
  useEffect(() => {
    // switch (assignBtnName) {
    //   default:
    getCompany();
    console.log("value",company)
  
  }, []);
  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
    // Additional logic if needed
  };
  //Fetch work flow
  
  const [Stages,setStages] = useState([])
  // const fetchData = async () => {
  //   try {
  //     // Call the function and await the response
  //     const response = await getAllRecruitmentWorkFlows();
  
  //     // Handle the response
  //     console.log('Response:', response);
  //     const stageNamesByWorkflowId = {};
  //   response.result.forEach(workflow => {
  //     const { workFlowId, recruitmentWorkFlowStages } = workflow;
  //     if (!stageNamesByWorkflowId[workFlowId]) {
  //       stageNamesByWorkflowId[workFlowId] = [];
  //     }
  //     recruitmentWorkFlowStages.forEach(stage => {
  //       stageNamesByWorkflowId[workFlowId].push(stage.stageName);
  //     });
  //   });

  
  //     // Assuming the data is in response.data, you can further process it
  //     // setworkFlowId(response.result.map(item => item.stageName)) 
  //     // ... do something with the data
  //     setStages(stageNamesByWorkflowId)
  
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error:', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData()
    
  // }, []);
  // useEffect(() => {
  //   console.log('Updated Workflow:', Stages);
  // }, [Stages]);
  
  const fetchData = async () => {
   try{
    const response = await getAllRecruitmentWorkFlows();
    console.log('Response:', response);
    const stagesByWorkflowId = response.result.map((item) => ({
      workFlowId: item.workFlowId,
      stages: item.recruitmentWorkFlowStages.map((stage) => (
      
      {title:stage.stageName})),
    }));
    setStages(stagesByWorkflowId)
   }catch (error) {
        // Handle errors
        console.error('Error:', error);
      }

  }
  useEffect(() => {
      fetchData()
      
    }, []);
    useEffect(() => {
      console.log('Updated Workflow:', Stages);
    }, [Stages]);
  // const workflowDetails = workflow.map((stageName, index) => ({
  //   stageName,
  //   label: stageName,
  //   nummber: index + 1,
  //   // Add other properties as needed
  // }));

  // const workflowDetails = setworkFlowId.map((stageName, index) => ({
  //   stageName,
  //   label: stageName,
  //   nummber: index + 1,
  //   // Add other properties as needed
  // }));
  
  
  const handleRadioChange = async (e) => {
    const workFlowId = e.target.value;
    setSelectedWorkFlowId(workFlowId);
   
    // Assuming you have the jobId stored somewhere, replace 'yourJobId' with the actual jobId
    // const jobId = 24;
    const modifiedBy = userid
    // Update the database with the selected workflow ID for the specific job
    
     try {
      console.log(workFlowId)
      const response = await updateRecruitmentJob(
         jobId,
         workFlowId,
         modifiedBy,
        
      );
  
      console.log(response);
      if (response.status === 200) {
      
      
        openNotification(
          "success",
          "Successful",
          "createpoilicy update saved. Changes are now reflected."
        );
        setPresentage(2);
        
      } 
    } catch (error) {
      console.error('Error updating workflow ID:', error);
      
    }
  };
  const handleButtonClick = async (e) => {
    switch (activeBtnValue) {
      case "Jobdetails":
        // Handle submission for Configuration
        
        console.log("valuegtgggggggggggg")
        formik1.handleSubmit()

        break;

      case "ApplicationForm":
        // Handle submission for Applicability
        // Your logic for Applicability form submission...
        // Move to the next step if applicable
        formik.handleSubmit(e);
        
        break;

      // Add more cases for additional activeBtnValues...

      case "Workflow":
        // assignPolicy();
        // Handle submission for Applicability
        // Your logic for Applicability form submission...
        // Move to the next step if applicable
        // formik1.handleSubmit();
        fetchData()
        try {
          await fetchData(); // Assuming fetchData is an asynchronous function
          await handleRadioChange(e); // Assuming handleRadioChange is an asynchronous function
          
        } catch (error) {
          console.error('Error handling Workflow:', error);
        }
        setNextStep(nextStep + 1);
        
        break;
        case "TeamMembers":
           
            setNextStep(nextStep + 1);
            break;
            case "Publish":
                // assignPolicy();
                // Handle submission for Applicability
                // Your logic for Applicability form submission...
                // Move to the next step if applicable
                // formik1.handleSubmit();
                handleClose()
                break;
      default:
        // // Handle the case when no card is selected
        // console.log(
        //   "Please select a card before moving to the next step."
        // );
        // openNotification(
        //   "error",
        //   "Please choose a card..",
        //   "Please select a card before moving to the next step."
        // );
        break;
    }
  
  }

  //Teammebers
  const header =[
    {
    id:1,
    titile:"",
    value:"username",
    },
    {
      id:2,
      titile:"",
      value:"userId",
    },
    {id:3,
    titile:"",
    value:"userId",
    }
  ]

  const [employeeList,setemployeeList] =useState([])

  const AllRecruitmentJobTeamMembers = async()=> {
      // const jobId=1;
    try {
    const response = await getAllRecruitmentJobTeamMembers(
      jobId,

    );
    setemployeeList(response.result.map((item) => ({
      username: item.userName,
      userId: item.userId,
      userimage: item.userImage,
    })));
    
    console.log(response)
   }
   
   catch (error) {
    console.error('Error updating workflow ID:', error);
  }
  }
  useEffect(() => {
    AllRecruitmentJobTeamMembers();
    console.log(employeeList)
    
  }, []);
  
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
          ? t("Create a Job")
          : t("Create a Job Temaplate"),
        t("Lorem ipsum dummy text doret solo."),
      ]}
      
      headerRight={
        <div className="flex items-center gap-10">
          <p className="text-sm font-medium text-gray-400">
            Draft Saved 10 Seconds ago
          </p>
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
            <RxQuestionMarkCircled className="text-2xl font-medium text-gray-400 " />
          </div>
        </div>
      }
      footerBtn={[
        t("Cancel"),
        !isUpdate ? "Save and Continue" : t("Save and Continue"),
      ]}
      className="widthFull"
      buttonClick={(e) => {
        handleButtonClick(e)
      }}
      buttonClickCancel={(e) => {
        if (activeBtn > 0) {
          setActiveBtn(activeBtn - 1);
          setNextStep(nextStep - 1);
          setActiveBtnValue(steps?.[activeBtn - 1].data);
          console.log(activeBtn - 1);
        }
        setBtnName("");
      }}
      nextStep={nextStep}
      activeBtn={activeBtn}
      saveAndContinue={true}
      stepsData={steps}
    >  
    
    <div >
      
    
      <FlexCol>
      <div className="flex flex-col gap-6 max-w-[1070px] w-full mx-auto ">
            {steps && (
              <div className=" sticky -top-6 w-full z-50 px-5 bg-white dark:bg-[#1f1f1f] pb-10 ">
                <Stepper
                  currentStepNumber={activeBtn}
                  presentage={presentage}
                  // direction="left"
                  // labelPlacement="vertical"
                  steps={steps}
                // className=" text-sm font-medium"
                // style={{
                //   fontSize: isSmallScreen ? "8px" : "10px",
                //   fontWeight: 600,
                // }}
                // // className="text-[10px]"
                // size={isSmallScreen ? "default" : "large"}
                />
              </div>
            )}
          
          
          
          
          </div>
                  
          <div className="relative max-w-[1070px]  w-full mx-auto ">
        
                  {activeBtnValue === "Jobdetails" ? (
                    <>
                   
                        <FlexCol>
                        <Accordion
                                    title={"Job Details"}
                                    className="Text_area"
                                    padding={true}
                                    toggleBtn={false}
                                    click={() => {
                                        //   setPresentage(1.4);
                                    } }
                                    initialExpanded={true}
                                >
                                   {inputshow&&(
                                    <div className="grid grid-cols-3 gap-6 ">
                                   
                                    <Dropdown
                                            title={t("Choose Template")}
                                            placeholder={t("Select")}
                                            required={true} />

                                           
                                        




                                        <Dropdown
                                            title={t("Choose Company")}
                                            placeholder={t("Choose Company")}
                                            options={company}
                                            value={formik1.values.companyId}
                                            required={true} 
                                            change={(e)=>{
                                              formik1.setFieldValue('companyId',e)
                                            }}/>
                                    </div>
                                     )
                                    }
                                    <div className="grid grid-cols-3 gap-4">
                                        <FormInput
                                            title={t("Job Title")}
                                            placeholder={t("Example : Marketing Manager")}
                                            required={true}
                                            change={(e)=>{
                                            formik1.setFieldValue('jobTitle',e)


                                            }}
                                            value={formik1.values.jobTitle}
                                            />




                                        <Dropdown
                                            title={t("Department")}
                                            placeholder={t("Select...")}
                                            required={true} 
                                            options={departmentList}
                                            value={formik1.values.departmentId}
                                            change={(e)=>{
                                              formik1.setFieldValue('departmentId',e)
                                            }}
                                            />

                                        <FormInput
                                            title={t(" Job Code")}
                                            placeholder={t(" Job Code")}
                                            required={true} 
                                            change={(e)=>
                                            {
                                              formik1.setFieldValue('jobCode',e)
                                            }
                                            }
                                            value={formik1.values.jobCode}
                                            />
                                            
                                    </div>
                                    
                                </Accordion>
                                
                                
                                        <Accordion
                                            title={"Location "}
                                            className="Text_area"
                                            padding={true}
                                            toggleBtn={false}
                                            // click={() => {
                                            //     setPresentage(1.4);
                                            // } }
                                            initialExpanded={true}
                                        >
                        <div className="md:grid grid-cols-12 flex flex-col gap-6 dark:text-white">
                        {regularOvertime?.map((each, i) => (
                          <div
                            key={i}
                            className={`col-span-4 p-4 border rounded-2xl cursor-pointer showDelay dark:bg-dark  ${customRate === each.id && "border-primary "
                              } `}
                            onClick={() => {
                              setCustomRate(each.id);
                              formik1.setFieldValue("workLocationType", each.value);
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div className=" flex flex-col gap-2">
                                {/* <GiReceiveMoney
                                className={`${
                                  customRate === each.id && "text-primary"
                                } `}
                              /> */}
                                <div
                                  className={`${customRate === each.id && " text-primary  "
                                    } p-2 border rounded-mdx w-fit bg-[#F8FAFC]`}
                                >
                                  {each.image}
                                </div>
                                {/* <img
                                  src={customRate === each.id ? cash : cashGray}
                                  alt=""
                                  className=" w-6 h-6"
                                /> */}
                                <h3 className=" text-sm font-semibold">
                                  {each.title}
                                </h3>
                                <p className=" text-xs font-medium text-[#667085] ">
                                  {each.description}
                                </p>
                              </div>
                              <div
                                className={`${customRate === each.id && "border-primary"
                                  } border  rounded-full`}
                              >
                                <div
                                  className={`font-semibold text-base w-4 h-4 border-2 border-white   rounded-full ${customRate === each.id &&
                                    "text-primary bg-primary"
                                    } `}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <FormInput
                                                    title={"Location"}
                                                    placeholder={'Example : Dubai'}
                                                    change={(e)=>{
                                                     formik1.setFieldValue('location',e)

                                                    }}
                                                    value={formik1.values.location }
                                                    />
                                                    
                                                    <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} 
                                                    options={Requirment}
                                                    value={formik1.values.requirementType
                                                    }
                                                    change={(e)=>{
                                                      formik1.setFieldValue('requirementType',e)
                                                      console.log(e)
                                                    }}
                                                    
                                                    />
                                            </div>
                                        </Accordion>
                                        <div>
                                            <Accordion
                                             title={"Employment Details"}
                                             className="Text_area"
                                             padding={true}
                                             toggleBtn={false}
                                             click={() => {
                                            //    setPresentage(1.4);
                                             }}
                                             initialExpanded={true}
                                             >
                                            <div className='grid grid-cols-3 gap-4'>
                                            <Dropdown
                                                    title={'Job Type'}
                                                    placeholder={'Full-time'} 
                                                    options={JobType}
                                                    change={(e)=>{
                                                      formik1.setFieldValue('jobType',e)
                                                      console.log(e)
                                                    }}
                                                    value={formik1.values.jobType}
                                                    />
                                               <Dropdown
                                                    title={'Experience'}
                                                    placeholder={'Mid-Senior level'}
                                                    options={experiencelevel} 
                                                    value={formik1.values.experience}
                                                    change={(e)=>{
                                                      formik1.setFieldValue('experience',e)
                                                    }}
                                                    
                                                    />
                                                     <Dropdown
                                                    title={'Education'}
                                                    placeholder={'Bachelor’s Degree'} 
                                                    options={eductaion}
                                                    value={formik1.values.education}
                                                    change={(e)=>{
                                                      formik1.setFieldValue('education',e)
                                                    }}
                                                    />
                                           
                                            </div>
                                            <div className='grid grid-cols-3 gap-4'>
                                            <FormInput
                                                    title={'Keywords'}
                                                    placeholder={'Example : Dubai'}
                                                    change={(e)=>{
                                                      formik1.setFieldValue('searchKeywords',e)
                                                    }}
                                                    value={formik1.values.searchKeywords}
                                                    />
                                                {/* <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} />
                                                     <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} /> */}

                                            </div>
                                            <div className='grid grid-cols-4 gap-4'>
                                            <FormInput
                                                    title={'Salary Range From'}
                                                    placeholder={'Enter value'} 
                                                    change={(e)=>{
                                                      formik1.setFieldValue('salaryRangeFrom',e)
                                                    }}
                                                    value={formik1.values.salaryRangeFrom
                                                    }
                                                    />
                                                <FormInput
                                                    title={'Salary Range To'}
                                                    placeholder={'Enter value'}
                                                    change={(e)=>{
                                                      formik1.setFieldValue('salaryRangeTo',e)
                                                    }}
                                                    value={formik1.values.salaryRangeTo
                                                    }
                                                    />
                                                    <Dropdown
                                                    title={'Salary Currency'}
                                                    placeholder={'Urgent'} 
                                                    options={saleryCurrency}
                                                    value={formik1.values.salaryCurrency}
                                                    change={(e)=>{
                                                      formik1.setFieldValue('salaryCurrency',e)
                                                    }}
                                                    />
                                                     <CheckBoxInput
                                                      change={(e)=>{
                                                        formik1.setFieldValue('isSalaryPublic',e)
                                                        console.log(e)
                                                      }}
                                                      value={formik1.values.isSalaryPublic}
                                                      title={"View Public"}
                                                      description={"Given Salary will be visible for public"}
                                                      />
                                            </div>
                                            </Accordion>
                                        </div>
                                        
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
                                        <Button>
        <Space>
        Choose Job Description
          <DownOutlined />
        </Space>
      </Button>
      <Button type="primary" icon={<img src={image} alt="image" style={{ height: '20px', width: '20px' }} />} >
      Generate with AI
      
          </Button>
                                        </div>
                                        <Card>
                                            <TextArea
                                             title={t("Description")}
                                             placeholder={t("Enter the Job description here; include key reas of responsibility an what the candidate mi ht do on a typical day.")}
                                             required={true}
                                             hideBorder={true} 
                                             
                                             value={formik1.values.jobDescription}
                                             change={(e)=>{
                                               formik1.setFieldValue('jobDescription',e)
                                             }}
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
                                  
                                    </FlexCol>
                                    </>
                  
                ) : activeBtnValue === "ApplicationForm" ? (
                  <>
                  <FlexCol>
                  <Accordion
                      title={"ApplicationForm "}
                      className="Text_area"
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        // setPresentage(1.4);
                      } }
                      initialExpanded={true}
                    >


                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Name</div>

                        <Radiobuttonnew
                          options={Radiobuttons.filter(option => option.label === t("Mandatory"))}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("name",e)
                          } }
                         defaultValue={1}
                        >
                          <Radio.Button value={1}>Mandatory</Radio.Button>
                        </Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Email</div>

                        <Radiobuttonnew
                          options={Radiobuttons.filter(option => option.label === t("Mandatory"))}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("Email",e)
                          } }
                        >
                          <Radio.Button value={1}>Mandatory</Radio.Button>
                        </Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between w-full">
                        <p className="pblack text-black text-sm font-mediumleading-tight">Headline</p>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("headline",e)
                          } }
                        >

                          <Radio.Button value={1}>Mandatory</Radio.Button>
                          <Radio.Button value={2}>Optional</Radio.Button>
                          <Radio.Button value={0}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Phone</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("phone",e)
                          } }
                        >

                          <Radio.Button value={1}>Mandatory</Radio.Button>
                          <Radio.Button value={2}>Optional</Radio.Button>
                          <Radio.Button value={0}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Address</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("address",e)
                          } }
                        >

                          <Radio.Button value={1}>Mandatory</Radio.Button>
                          <Radio.Button value={2}>Optional</Radio.Button>
                          <Radio.Button value={0}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Country</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("country",e)
                          } }
                        >

                          <Radio.Button value={1}>Mandatory</Radio.Button>
                          <Radio.Button value={2}>Optional</Radio.Button>
                          <Radio.Button value={0}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>




                    </Accordion>
                    
                    
                    <Accordion
                    title={"Profile "}
                    className="Text_area"
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      // setPresentage(1.4);
                    } }
                    initialExpanded={true}
                    
                    >
                                           <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Education</div>

                        <Radiobuttonnew
  options={Radiobuttons.filter(option => option.label !== t("Mandatory"))}
  title={""}
  change={(e) => { 
    formik.setFieldValue("education",e)
  } }
>
  <Radio.Button value={2}>Optional</Radio.Button>
  <Radio.Button value={0}>Off</Radio.Button>
</Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Experience</div>

                        <Radiobuttonnew
  options={Radiobuttons.filter(option => option.label !== t("Mandatory"))}
  title={""}
  change={(e) => { 
    formik.setFieldValue("experience",e)
  } }
>
  <Radio.Button value={2}>Optional</Radio.Button>
  <Radio.Button value={0}>Off</Radio.Button>
</Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Summary</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("summary",e)
                          } }
                        >

                          <Radio.Button value={1}>Mandatory</Radio.Button>
                          <Radio.Button value={2}>Optional</Radio.Button>
                          <Radio.Button value={0}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Resume</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("resume",e)
                          } } 
                        >

                          <Radio.Button value={1}>Mandatory</Radio.Button>
                          <Radio.Button value={2}>Optional</Radio.Button>
                          <Radio.Button value={0}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>

                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Cover Letter</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { 
                            formik.setFieldValue("coverLetter",e)
                          } } 
                        >

                          <Radio.Button value={1}>Mandatory</Radio.Button>
                          <Radio.Button value={2}>Optional</Radio.Button>
                          <Radio.Button value={0}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>


                      
                      </Accordion>
                      <Accordion
                      title={"Custom Fields "}
                      className="Text_area"
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        // setPresentage(1.4);
                      } }
                      initialExpanded={true}
                      >
                       <div className='grid grid-rows-2 gap-8'>
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
    formik.setFieldValue(`customFields.default[${index}].answer_type`, e);
    handleDropdownChange(e,index)
    console.log("dropdown", e);
  }}
  value={formik.values.customFields.default?.[index]?.answer_type}
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
        </div>
                     
                 
                     
                      </Accordion>

                      </FlexCol></>
                ) : activeBtnValue === "Workflow" ? (
                  <FlexCol>
                  <Accordion
                    title={"Workflow"}
                    className="Text_area"
                    padding={false}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >
                  
                  {/* {Object.keys(Stages).map(workFlowId => (
        <Card key={workFlowId}>
          {/* <JobCard options={Stages[workFlowId]} /> *
          <JobCard/>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
          <Radio.Group >
              <Radio value={1}></Radio>
            </Radio.Group>
          </div>
        </Card>
      ))}
                */}
                    {Stages.map(each => (
        <Card key={each.workFlowId}>
          {/* <JobCard options={Stages[workFlowId]} /> */}
        <JobCard options={each.stages}/>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
          <Radio.Group onChange={handleRadioChange} value={selectedWorkFlowId}>
              <Radio value={each.workFlowId}></Radio>
            </Radio.Group>
          </div>
        </Card>
      ))}

                  </Accordion>
                  </FlexCol>
                ) : activeBtnValue === "TeamMembers" ? (
                  <FlexCol>
                  <Accordion
                    title={"TeamMembers"}
                    className="Text_area"
                    padding={false}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(1.4);
                    }}
                    tableshow={true}
                    initialExpanded={true}
                    data={employeeList}
                    
                  >
                 {/* <List>
                      <VirtualList
                        data={
                          employeeList
                        }
                        height={400}
                        itemHeight={47}
                        // itemKey="email"
                        // onScroll={onScroll}
                      >
  
  {(item) => (
    <List.Item 
    
    >
     <div className='grid grid-cols-3'>
  <p className='justify-self-start'>{item.userId}</p>
  <p className='justify-self-center'>{item.username}</p>
  <img
    src={item.userimage}
    alt={`User ${item.userId} Image`}
    style={{ maxWidth: '50px' }}
    className='justify-self-end'
  />
</div>
    </List.Item>
  )}</VirtualList>
</List> */}
<div className='grid grid-cols-2 mt-8 '>
<SearchBox
placeholder={"Search Employess"}/>
</div>
<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th> {/* Add an additional column for the checkbox */}
    </tr>
  </thead>
  <tbody>
    {Employees.map((employee) => (
      <React.Fragment key={employee.id}>
        <tr>
          <td>
            <CheckBoxInput change={()=>{
              setPresentage(3.4);
            }}/>
          </td>
          <td>
            <div className='flex items-center gap-4'>
              {/* Assuming you have an 'image' property in your employee object */}
              <img src={employee.img} alt={`${employee.name} Avatar`} style={{ width: '50px', height: '50px' }} />
              <div className="flex flex-col">
                <div class="text-gray-900 text-sm font-semibold font-['Inter'] leading-tight">{employee.name}</div>
                <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">{employee.employeeid}</div>
              </div>
            </div>
          </td>
          <td></td>
          <td><div class="text-gray-900 text-sm font-medium font-['Inter'] leading-tight">{employee.email}</div></td>
          <td><div  class="text-gray-900 text-sm font-medium font-['Inter'] leading-tight">{employee.designation}</div></td>
        </tr>
        <tr className="v-divider" key={`divider-${employee.id}`}>
          {/* Assuming you want a visual divider after each row */}
          <td colSpan="5"></td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
</table>

{/* <List
  data={employeeList}  
  renderItem={(item) => (
    <List.Item>
      {/* <div>
        <p>User ID: {item.userId}</p>
        <p>User Name: {item.userName}</p>
        <img src={item.userImage} alt={`User ${item.userId} Image`} style={{ maxWidth: '100px' }} />
      </div> */}
      {/* <div>{item}</div> *
    {console.log(item)}
    </List.Item>
  )}
/> */}
                   

                  </Accordion>
                  </FlexCol>
                ) : activeBtnValue === "Publish" ? (
                  <Accordion
                    title={"Publish"}
                    className="Text_area"
                    description={"lorem ipsum dummy text dolar sit."}
                    padding={false}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >
                    <div className='flex justify-between'>
                <TabsNew tabs={tabs}/>
                <div className="flex items-center">
            <input
              id={`selectAll`}
              name={`selectAll`}
              type="checkbox"
              className="h-4 w-4 rounded border text-indigo-600 focus:ring-indigo-600 mr-2"
              // onChange={() => handleSelectAll()}
            />
            {selectedCount > 0 && (
              <span className="mr-2 h6">{`Selected ${selectedCount} portal `}</span>
            )}
          </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-6 ">
  <div className="flex flex-col gap-6 lg:col-span-8">
    <div className="flex flex-wrap gap-6 ">
      {/* Small card-like div */}
      {data.map((item, index) => (
        <div
          key={index}
          className={`bg-white dark:bg-black rounded-lg border-[1px] p-4 w-[330px] ${
            selectedDivs.includes(index)
              ? "border-[#6A4BFC]"
              : "border-[#DADADA]"
          }`}
          style={{ position: "relative" }} // Added to set position for absolute checkbox
        >
          <div className="items-center flex flex-col lg:flex-row">
            <img
              src={item.image}
              alt="Logo"
              className="w-[58px] h-[58px] object-cover rounded-md borderb lg:border-b-0"
            />
            <div className="ml-2">
              <h3 className="h6">{item.title}</h3>
              <p className="para">abcd@gmail</p>
            </div>
          </div>
          <input
            id={`comments-${index}`}
            name={`comments-${index}`}
            type="checkbox"
            className="h-4 w-4 rounded border text-indigo-600 focus:ring-indigo-600 absolute top-4 right-4"
            onChange={() => handleCheckboxChange(index)}
            style={{ borderColor: "red" }}
          />
         
        </div>
        
      ))}
    </div>
    <FormInput type={'text'} websiteLink className='w-[320px]'title='Sharable Link'placeholder='loyaltri.com/jkjskl3lsjlfsdf' icon={<MdContentCopy/>} description={"Share this link to anywhere"}/>
  </div>
</div>

                {/* </div> */}
                {/* <div className="text-wrap">
                  <p className="para mt-4 ">
                    Indeed is a global job search engine for job listings with
                    over 200 million unique monthly visitors
                  </p>
                </div> */}
                {/* <div className="mt-4">
                  <ButtonClick
                    BtnType="text"
                    icon={<BiEditAlt />}
                    buttonName="Edit"
                    className={"bg-[#e8e4e4]"}
                  />
                </div> */}
       
                  </Accordion>
                ) : null
                   
                  }
                  {contextHolder}
                  </div>
                </FlexCol>
                </div>
                
    </DrawerPop>


    </div>
  )
}

export default Createjob