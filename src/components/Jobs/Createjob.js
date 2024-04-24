import React, { useState, useEffect, useRef } from "react";
import DrawerPop from "../common/DrawerPop";
import AI_Text from "../../assets/images/AI_Text.jpg"
import { useTranslation } from "react-i18next";
import { RxCross2, RxQuestionMarkCircled } from "react-icons/rx";
import Stepper from "../common/Stepper";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  List,
  Radio,
  Space,
  Tooltip,
  notification,
} from "antd";
import Accordion from "../common/Accordion";
import FlexCol from "../common/FlexCol";
import Dropdown from "../common/Dropdown";
import FormInput from "../common/FormInput";
import VirtualList from "rc-virtual-list";
import CheckBoxInput from "../common/CheckBoxInput";
import { Employees } from "../data";
import * as Yup from "yup";

import TextArea from "../common/TextArea";
import Radiobuttonnew from "../common/Radiobuttonnew";
import GoogleForm from "../common/GoogleForm";
import JobCard from "../common/JobCard";
import {
  cardData,
  regularOvertime,
  Requirment,
  JobType,
  experiencelevel,
  eductaion,
  saleryCurrency,
  JobDesc,
} from "../data";
import {
  getAllRecruitmentQuestionnaireTemplates,
  getAllRecruitmentEvaluationTemplates,
  saveRecruitmentJob,
  getAllRecruitmentWorkFlows,
  updateRecruitmentJob,
  getAllRecruitmentUsers,
  getAllRecruitmentJobTemplates,
  getRecruitmentJobTemplateById,
  insertOrUpdateRecruitmentJobApplicationFormSettingWithJobId,
  getRecruitmentJobById,
  saveRecruitmentJobTeamMemberBatch,
  getAllRecruitmentJobDescriptionTemplates,
  getRecruitmentJobDescriptionTemplateById
} from "../Api1";
import { Formik, useFormik } from "formik";
import { CgAdd } from "react-icons/cg";
import { Form } from "../data";
import {
  MdContentCopy,
  MdOutlineFileCopy,
  MdOutlineShortText,
} from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ToggleBtn from "../common/ToggleBtn";
import { index } from "d3";
import axios from "axios";
import API from "../Api";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import image from "../../assets/images/generate-ai-img.png";
import Item from "antd/es/list/Item";
import TableAnt from "../common/TableAnt";
import SearchBox from "../common/SearchBox";
import TabsNew from "../common/TabsNew";
import Tabs from "../common/Tabs";
import indeed from "../../assets/images/indeed.png";
import bayt from "../../assets/images/Bayt.png";
import linkedin from "../../assets/images/Linked.png";
import gulftalent from "../../assets/images/gulftalent.png";
import Naukrigulf from "../../assets/images/Naukrigulf.png";
import loyaltri from "../../assets/images/logo.png";
import ButtonClick from "../common/Button";
import { Check } from "@mui/icons-material";
import AddMore from "../common/AddMore";
import TextEditor from "../common/TextEditor/TextEditor";
import RadioButton from "../common/RadioButton";
import { IoClose } from "react-icons/io5";
import Meta from "antd/es/card/Meta";

import noImg from "../../assets/images/noImg.webp"
import Jobcardcopy from "../common/Jobcardcopy";


const Createjob = ({
  open = "",
  close = () => { },
  inputshow = false,
  isUpdate = {},
  updateId,
  refresh = () => { },
}) => {
  const [show, setShow] = useState(open);
  const { t } = useTranslation();
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  // const [isUpdate, setIsUpdate] = useState();
  const [decriptionId, setDecriptionId] = useState("")
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState("Jobdetails"); //Publish//TeamMembers//LeaveType//ApplicationForm//Jobdetails////Workflow
  const [btnName, setBtnName] = useState();
  const [customRate, setCustomRate] = useState(1);
  const [savedContent, setSavedContent] = useState([]);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [selectedCompany, setSelectedCompany] = useState(null);
  const loginDataString = localStorage.getItem("LoginData");
  const [userid, setuserid] = useState("");
  const [workFlows, setWorkFlows] = useState([]);
  const [selectedWorkFlowId, setSelectedWorkFlowId] = useState(null);
  const [selectedDivs, setSelectedDivs] = useState([]);
  const [selectedemployee, setselectedemployee] = useState([])
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const [JobDescriptionList, setJobDescriptionList] = useState([])
  const [jobTitle, setJobTitle] = useState("")

  // console.log(updateId)
  const handleSelectCard = (selectedStageId) => {
    // Handle the selected stageId in your parent component
    console.log("Selected Stage ID:", selectedStageId);

  };

  const [loader, setloader] = useState(false)

  const handleGenerateWithAI = async () => {
    setloader(true); // Show loader when request is initiated
    // You may already have this state variable

    try {
      const requestBody = {
        val: jobTitle,
        radioval: "1",
        summarise: null,
      };

      const response = await fetch("https://chat.bmark.in/ai/api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response data as needed
        // console.log(data);
        setContent(data.receivedData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setloader(false); // Hide loader after response is received
    }
  };
  const getAllJobdescription = async () => {
    try {
      const data = await getAllRecruitmentJobDescriptionTemplates()
      // console.log(data)
      // 
      setJobDescriptionList(data.result.map((each) => ({
        label: each.descriptionTemplateName,
        value: each.descriptionTemplateId
      })))
    } catch (error) {
      // console.log(error)
    }
  }

  const getDecriptionById = async () => {
    const id = decriptionId
    try {
      const response = await getRecruitmentJobDescriptionTemplateById({ id: id })
      // console.log(response)

      setContent(response.result[0].descriptionTemplate);


    } catch (error) {
      // console.log(error)
    }
  }
  useEffect(() => {
    getDecriptionById()
  }, [decriptionId])
  useEffect(() => {
    getAllJobdescription()
  }, [])
  useEffect(() => {
    // Retrieve the login data JSON string from local storage
    const loginDataString = localStorage.getItem("LoginData");

    if (loginDataString) {
      // Parse the JSON string to get the LoginData object
      const loginData = JSON.parse(loginDataString);

      // Extract the username from the userData object
      setuserid(
        loginData && loginData.userData && loginData.userData.employeeId
      );

      // Now, 'username' variable contains the username
    } else {
      console.error("Login data not found in local storage.");
    }
  }, []); // Empty dependency array ensures the useEffect runs only once
  const [isChecked, setIsChecked] = useState(false);
  const handleEditorChange = (content) => {
    setContent(content);
  };
  // console.log('Username:', userid);
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
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);
  const [organisationId, setOrganisationId] = useState(
    localStorage.getItem("organisationId")
  );
  // const [isGoogleFormVisible, setIsGoogleFormVisible] = useState(false);
  const [evaluation, setEvaluation] = useState([
    {
      id: 1,
      answer_type: "",
      question: "",
      answerMetaData: "[]",
      is_required: 0,
    },
  ]);
  const [errorMessages, setErrorMessages] = useState("");  //useState("") //useState(Array(evaluation.length).fill(''))
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [UpdateId, setupdateId] = useState(null);
  useEffect(() => {
    setupdateId(updateId);
  }, []);

  //job applying

  // const updateErrorMessages = () => {
  //   const newErrorMessages = evaluation.map((condition) => {
  //     let errorMessage = '';

  //     if (!condition.question) {
  //       errorMessage = 'Please enter a question.';
  //     } else if (!condition.answer_type) {
  //       errorMessage = 'Please choose an answer type.';
  //     } else if (
  //       ["Drop-down", "MultipleChoice", "Checkboxes"].includes(condition.answer_type) &&
  //       (condition.answerMetaData.some((field) => !field.value) ||
  //         (!condition.answerMetaData[0]?.value && condition.answerMetaData[0]?.key !== "ShortAnswer"))
  //     ) {
  //       errorMessage = 'Please enter values for all options.';
  //     }

  //     return errorMessage;
  //   });

  //   // Update errorMessages state with new error messages
  //   setErrorMessages(newErrorMessages);
  // };

  // // Call the function to update error messages whenever evaluation changes
  // useEffect(() => {
  //   updateErrorMessages();
  // }, [evaluation]);

  const [DraftJobs, setDraftJobs] = useState([]);

  const getDraftjobs = async () => {
    // console.log(UpdateId);
    const id = UpdateId;
    try {
      const response = await getRecruitmentJobById({ id });

     
        const firstJob = response.result[0];

        setDraftJobs(firstJob);

        formik1.setFieldValue("companyId", firstJob.companyId);
        formik1.setFieldValue("jobTitle", firstJob.jobTitle);
        formik1.setFieldValue("departmentId", firstJob.departmentId);
        formik1.setFieldValue("education", firstJob.education);
        formik1.setFieldValue("isActive", firstJob.isActive);
        formik1.setFieldValue("isSalaryPublic", firstJob.isSalaryPublic);
        formik1.setFieldValue("jobCode", firstJob.jobCode);
        // formik1.setFieldValue("jobDescription", firstJob.jobDescription);
        setContent(firstJob.jobDescription)
        formik1.setFieldValue("jobType", firstJob.jobType);
        formik1.setFieldValue("location", firstJob.location);
        formik1.setFieldValue("requirementType", firstJob.requirementType);
        formik1.setFieldValue("salaryCurrency", firstJob.salaryCurrency);
        formik1.setFieldValue("salaryRangeFrom", firstJob.salaryRangeFrom);
        formik1.setFieldValue("salaryRangeTo", firstJob.salaryRangeTo);
        formik1.setFieldValue("searchKeywords", firstJob.searchKeywords);
        formik1.setFieldValue("experience", firstJob.experience);





        console.log(firstJob.companyId);
        console.log(response);
     
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getDraftjobs();
    console.log({"Value":UpdateId});
  }, [UpdateId]);
  const formik1 = useFormik({
    initialValues: {
      companyId: "",
      jobTitle: "",
      departmentId: "",
      jobCode: "",
      workLocationType: "Onsite",
      location: "",
      requirementType: "",
      jobType: "",
      experience: "",
      education: "",
      searchKeywords: "",
      salaryRangeFrom: "",
      salaryRangeTo: "",
      salaryCurrency: "",
      isSalaryPublic: "true",
      jobDescription: "",
      workFlowId: null,
      jobPublishType: "",
      jobPublishDetails: "",
      jobStatus: "Draft",
      createdBy: "",
      noOfVaccancies: "",
      evaluationTemplateId: "",
      questionnaireTemplateId: "",
    },

    // enableReinitialize: true,
    // validateOnChange: false,
    // validationSchema: Yup.object().shape({
    //   companyId: Yup.string().required('Company is required'),
    //   jobTitle: Yup.string().required('Job Title is required'),
    //   departmentId: Yup.string().required('Department ID is required'),
    //   jobCode: Yup.string().required('Job Code is required'),
    //   workLocationType: Yup.string().required('Work Location Type is required'),

    //   location: Yup.string().required('Location is required'),
    //   requirementType: Yup.string().required('Requirement Type is required'),
    //   jobType: Yup.string().required('Job Type is required'),
    //   experience: Yup.string().required('Experience is required'),
    //   education: Yup.string().required('Education is required'),
    //   searchKeywords: Yup.string().required('Search Keywords is required'),
    //   salaryRangeFrom: Yup.number()
    //     .typeError('Salary Range From must be a number')
    //     .required('Salary Range From is required'),
    //   salaryRangeTo: Yup.number()
    //     .typeError('Salary Range To must be a number')
    //     .required('Salary Range To is required'),
    //   salaryCurrency: Yup.string().required('Salary Currency is required'),
    //   noOfVaccancies: Yup.number()
    //     .typeError('Number Of Vaccancies must be a number')
    //     .required('Number Of Vaccancies is required'),

    // }),
    onSubmit: async (e) => {
      if (
        !formik1.values.jobTitle || !formik1.values.departmentId || !formik1.values.jobCode ||
        !formik1.values.companyId ||
        !formik1.values.location ||
        !formik1.values.requirementType ||
        !formik1.values.jobType ||
        !formik1.values.experience ||
        !formik1.values.education ||
        !formik1.values.searchKeywords ||
        !formik1.values.salaryRangeFrom ||
        !formik1.values.salaryRangeTo ||
        !formik1.values.salaryCurrency ||
        !formik1.values.jobType||
        !formik1.values.noOfVaccancies||
        !content
      ) {
        formik1.setFieldError('companyId', !formik1.values.companyId ? 'Company  is required' : '');
        formik1.setFieldError('jobTitle', !formik1.values.jobTitle ? 'Job Title is required' : '');
        formik1.setFieldError('departmentId', !formik1.values.departmentId ? 'Department is required' : '');
        formik1.setFieldError('jobCode', !formik1.values.jobCode ? 'Job Code is required' : '');
        formik1.setFieldError('location', !formik1.values.location ? 'Location is required' : '');
        formik1.setFieldError('requirementType', !formik1.values.requirementType ? 'Requirment Type is required' : '');
        formik1.setFieldError('experience', !formik1.values.experience ? 'Experience is required' : '');
        formik1.setFieldError('searchKeywords', !formik1.values.searchKeywords ? 'Search Key Words is required' : '');
        formik1.setFieldError('salaryRangeFrom', !formik1.values.salaryRangeFrom ? 'Salery Range From is required' : '');
        formik1.setFieldError('salaryRangeTo', !formik1.values.salaryRangeTo ? 'Salary Range To is required' : '');
        formik1.setFieldError('salaryCurrency', !formik1.values.salaryCurrency ? 'Salary Currency is required' : '');
        formik1.setFieldError('jobType', !formik1.values.jobType ? 'JobType is required' : '');
        formik1.setFieldError('education', !formik1.values.education ? 'Education is required' : '');
        formik1.setFieldError('jobDescription', !content ?'Job description is required' : '')
        formik1.setFieldError('noOfVaccancies', !formik1.values.noOfVaccancies ?'Number Of Vacancies is required' : '')
        return; // Exit early if any field is empty
      }
      try {
        // console.log(e);
        // console.log(jobId);

        // Check if jobId or UpdateId is present
        if ((!jobId || jobId.length === 0) && !UpdateId) {

          const response = await saveRecruitmentJob({
            companyId: companyId,
            jobTitle: e.jobTitle,
            departmentId: e.departmentId,
            jobCode: e.jobCode,
            workLocationType: e.workLocationType,
            location: e.location,
            requirementType: e.requirementType,
            jobType: e.jobType,
            experience: e.experience,
            education: e.education,
            searchKeywords: e.searchKeywords,
            salaryRangeFrom: e.salaryRangeFrom,
            salaryRangeTo: e.salaryRangeTo,
            salaryCurrency: e.salaryCurrency,
            isSalaryPublic: e.isSalaryPublic,
            jobDescription: content,
            workFlowId: null,
            jobPublishType: null,
            jobPublishDetails: null,
            jobStatus: "Draft",
            createdBy: userid,
            noOfVaccancies: e.noOfVaccancies,
            questionnaireTemplateId: e.questionnaireTemplateId || null,
            evaluationTemplateId: e.evaluationTemplateId || null,
          });
          setJobId(response.result.insertedId);

          // console.log(response);

          // console.log(jobId);

          if (response.status === 200) {
            openNotification("success", "Successful", response.message);

            setPresentage(2);
            setNextStep(nextStep + 1);
          } else if (response.status === 500) {
            openNotification(
              "error",
              "input field is empty..",
              response.message.replace(/<br\/>/g, '\n')
            );
          }
          // }
        } else {
          const idToUpdate = jobId || UpdateId;
          const response = await updateRecruitmentJob({
            id: idToUpdate,
            companyId: companyId,
            jobTitle: e.jobTitle,
            departmentId: e.departmentId,
            jobCode: e.jobCode,
            workLocationType: e.workLocationType,
            location: e.location,
            requirementType: e.requirementType,
            jobType: e.jobType,
            experience: e.experience,
            education: e.education,
            searchKeywords: e.searchKeywords,
            salaryRangeFrom: e.salaryRangeFrom,
            salaryRangeTo: e.salaryRangeTo,
            salaryCurrency: e.salaryCurrency,
            isSalaryPublic: e.isSalaryPublic,
            jobDescription: content,
            workFlowId: null,
            noOfVaccancies: e.noOfVaccancies,
            modifiedBy: userid,
            questionnaireTemplateId: e.questionnaireTemplateId || null,
            evaluationTemplateId: e.evaluationTemplateId || null,
          });

          // console.log(response);

          if (response.status === 200) {
            openNotification("success", "Successful", "success");
            setPresentage(2);
            setNextStep(nextStep + 1);
          } else if (response.status === 500) {
            openNotification(
              "error",
              "input field is empty..",
              "enter the field"
            );
          }
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        openNotification(
          "error",
          "input field is empty..",
          "input field is empty.."
        );
      }
    },
  });

  useEffect(() => {
    // console.log("Job ID:", jobId);
  }, [jobId]);
  const [departmentList, setDepartmentList] = useState();
  const [company, setCompany] = useState([]);
  const getDepartmentList = async (e) => {
    try {


      const result = await axios.post(API.HOST + API.GET_DEPARTMENT + "/" + e);

      setDepartmentList(
        result.data.tbl_department.map((each) => ({
          label: each.department,
          value: each.departmentId,
        }))
      );

      // console.log("Department List:", departmentList);
      // console.log("Is Update:", isUpdate);
    } catch (error) {
      // console.error("Error fetching department list:", error);
    }
  };
  useEffect(() => {
    // switch (assignBtnName) {
    //   default:
    getDepartmentList();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: 1,
      email: 1,
      headline: 1,
      phone: 1,
      address: 1,
      country: 1,
      education: 2,
      experience: 2,
      summary: 1,
      resume: 1,
      coverLetter: 1,
      customFields: [
        {
          question: "",
          answer_type: "",
          is_required: "",
          answer_meta_data: [],
        },
      ],
    },

    onSubmit: async (e) => {
      try {
        // console.log(e);
        const updatedCustomFields = evaluation.map((condition) => ({
          question: condition.question,
          answer_type: condition.answer_type,
          is_required: condition.is_required,
          answer_meta_data: condition.answerMetaData,
        }));
        // const isAnyEmpty = evaluation.some((condition) => {
        //   return (
        //     !condition.question ||
        //     !condition.answer_type ||
        //     (["Drop-down", "MultipleChoice", "Checkboxes"].includes(
        //       condition.answer_type
        //     ) &&
        //       (condition.answerMetaData.some((field) => !field.value) ||
        //         (!condition.answerMetaData[0]?.value &&
        //           condition.answerMetaData[0]?.key !== "ShortAnswer")))
        //   );
        // });

        // if (isAnyEmpty) {
        //   openNotification(
        //     "error",
        //     "CustomFields",
        //     "Please fill in all the required fields."
        //   );
        //   return;
        // }
        const newErrorMessages = evaluation.map((condition) => {
          let errorMessage = '';

          if (!condition.question) {
            errorMessage = 'Please enter a question.';
          } else if (!condition.answer_type) {
            errorMessage = 'Please choose an answer type.';
          } else if (
            ["Drop-down", "MultipleChoice", "Checkboxes"].includes(condition.answer_type) &&
            (condition.answerMetaData.some((field) => !field.value) ||
              (!condition.answerMetaData[0]?.value && condition.answerMetaData[0]?.key !== "ShortAnswer"))
          ) {
            errorMessage = 'Please enter values for all options.';
          }

          return errorMessage;
        });

        // Update errorMessages state with new error messages
        setErrorMessages(newErrorMessages);
        const hasErrors = newErrorMessages.some(errorMessage => errorMessage !== '');
        if (hasErrors) {
          // Don't proceed if there are errors
          return;
        }

        // console.log(UpdateId);
        // if (jobId){
        const response =
          await insertOrUpdateRecruitmentJobApplicationFormSettingWithJobId({
            jobId: UpdateId || jobId,
            name: 1,
            email: 1,
            headline: e.headline,
            phone: e.phone,
            address: e.address,
            country: e.country,
            education: e.education,
            experience: e.experience,
            summary: e.summary,
            resume: e.resume,
            coverLetter: e.coverLetter,

            customFields: updatedCustomFields,
          });
        // console.log(response);
        if (response && response.status === 200) {
          openNotification("success", "Successful", response.message);
          setPresentage(2);
          setNextStep(nextStep + 1);

        } else {
          // Handle other status codes or error messages here
          openNotification("error", "Error", "Failed to save data.");
        }
        //   }else{

        //  console.log(updatedCustomFields)
        //   // Merge the updated customFields into the form data

        //   const response = await saveRecruitmentJobApplicationFormSetting({
        //     jobId:jobId,
        //     name: e.name,
        //     email: e.email,
        //     headline: e.headline,
        //     phone: e.phone,
        //     address: e.address,
        //     country: e.country,
        //     education: e.education,
        //     experience: e.experience,
        //     summary: e.summary,
        //     resume: e.resume,
        //     coverLetter: e.coverLetter,

        //     customFields: updatedCustomFields

        //   });

        //   // Handle the response if needed
        //   console.log('Response:', response);
        //   if (response && response.status === 200) {
        //     openNotification('success', 'Successful', response.message);
        //     setPresentage(2);
        //     setNextStep(nextStep + 1);
        //   } else {
        //     // Handle other status codes or error messages here
        //     openNotification('error', 'Error', 'Failed to save data.');
        //   }
        // }
      } catch (error) {
        // Handle the error here
        // console.error("Error:", error);
        // openNotification("error", "Failed..");
      }
    },
  });

  const handleDivClick = (index) => {
    // Toggle the selection of the div
    // if (selectedDivs.includes(index)) {
    //   setSelectedDivs(selectedDivs.filter((i) => i !== index));
    //   setPercentage(percentage - 1); // Decrease percentage by 1
    // } else {
    //   setSelectedDivs([...selectedDivs, index]);
    //   setPercentage(percentage + 1); // Increase percentage by 1
    // }
    setPresentage(3.4);
  };

  const scrollRef = useRef();
  const handleAddCondition = () => {
    setEvaluation((prevEvaluation) => [
      ...prevEvaluation,
      {
        id: prevEvaluation.length + 1,
        // Replace insertedId with your actual value
        answer_type: "",
        question: "",
        answerMetaData: "[]",
        is_required: 0,
      },
    ]);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteCondition = (index) => {
    setEvaluation((prevEvaluation) => {
      // Check if there's more than one condition before deleting
      if (prevEvaluation.length > 1) {
        return prevEvaluation.filter((_, i) => i !== index);
      }
      // If there's only one condition, return the existing array without deleting
      return prevEvaluation;
    });
  };
  const handleDeleteField = (conditionIndex, fieldIndex) => {
    // console.log("Deleting field", conditionIndex, fieldIndex);

    setEvaluation((prevEvaluation) =>
      prevEvaluation.map((prevCondition, i) =>
        i === conditionIndex
          ? {
            ...prevCondition,
            answerMetaData: (prevCondition.answerMetaData || []).filter(
              (field, j) => j !== fieldIndex
            ),
          }
          : prevCondition
      )
    );
  };
  const handleAddField = (index, selectedvalue) => {
    setEvaluation((prevEvaluation) =>
      prevEvaluation.map((prevCondition, i) =>
        i === index
          ? {
            ...prevCondition,
            answerMetaData: [
              ...prevCondition.answerMetaData,
              {
                id: prevCondition.answerMetaData.length + 1,
                key: selectedvalue, // You can set the default key or customize as needed
                value: "",
              },
            ],
          }
          : prevCondition
      )
    );
  };

  const handleClose = () => {
    close(false);
  };

  const [steps, setSteps] = useState([
    {
      id: 1,
      value: 0,
      title: t("Job_Details"),
      data: "Jobdetails",
    },

    {
      id: 2,
      value: 1,
      title: t("Application_Form"),
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
      title: t("Team_Members"),
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
  const tabs = [
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
    // console.log(nextStep, activeBtn);
    if (activeBtn < 4 && activeBtn !== nextStep) {
      /// && activeBtn !== nextStep
      setActiveBtn(1 + activeBtn);
      setNextStep(nextStep);
      // console.log(1 + activeBtn);
      // console.log(steps?.[activeBtn + 1].data, "data");
      setActiveBtnValue(steps?.[activeBtn + 1].data);
    }
  }, [nextStep]);

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
      // console.log(error);
    }
    // console.log("company", company);
  };
  useEffect(() => {
    // switch (assignBtnName) {
    //   default:
    getCompany();
    // console.log("value", company);
  }, []);
  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
    // Additional logic if needed
  };
  //Fetch work flow

  const [Stages, setStages] = useState([]);
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
    try {
      const response = await getAllRecruitmentWorkFlows();
      // console.log("Response:", response);

      const stagesByWorkflowId = response.result.map((item) => ({
        workFlowId: item.workFlowId,
        workFlowName: item.workFlowName,
        stages: item.recruitmentWorkFlowStages.map((stage) => ({
          id: stage.stageId,
          title: stage.stageName,

        })),
      }));
      setStages(stagesByWorkflowId);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // console.log("Updated Workflow:", Stages);
  }, [Stages]);

  const formik2 = useFormik({
    initialValues: {
      id: "",
      modifiedBy: "",
      workFlowId: "",
    },
    onSubmit: async (e) => {
      const idToUpdate = jobId || UpdateId;
      const workFlowId = selectedWorkFlowId;
      const modifiedBy = userid;

      try {
        // console.log(e);
        const response = await updateRecruitmentJob({
          id: parseInt(idToUpdate),
          workFlowId: parseInt(workFlowId),
          modifiedBy: parseInt(modifiedBy),
        });

        // Handle the response if needed
        // console.log("Response:", response);
        if (response.status === 200) {
          openNotification("success", "Successful", response.message);
          setPresentage(3.4);
          setNextStep(nextStep + 1);
        } else if (response.status === 500) {
          openNotification("error", response.message);
        }
      } catch (error) {
        // Handle the error here
        console.error("Error:", error);
        // openNotification("error", "Failed..");
      }
    },
  });
  const formik3 = useFormik({
    initialValues: {
      id: "",
      modifiedBy: "",
      jobPublishDetails: "",
      jobPublishType: "",
      jobStatus: "",
    },
    onSubmit: async (e) => {
      const modifiedBy = userid;
      // console.log(modifiedBy);

      try {
        // console.log(e);
        const workFlowId = selectedWorkFlowId;
        const response = await updateRecruitmentJob({
          id: jobId || updateId,
          jobPublishDetails: "this is jobPublishDetails ",
          jobPublishType: "Confidential",
          modifiedBy: modifiedBy,
          jobStatus: "Open",
          workFlowId: workFlowId,
        });

        // Handle the response if needed
        // console.log("Response:", response);
        if (response.status === 200) {
          openNotification("success", "Successful", response.message);

          refresh();
          // Add a delay before closing the notification
          setTimeout(() => {
            handleClose();
          }, 2000); // Adjust the delay time as needed
        } else if (response.status === 500) {
          openNotification("error", response.message);
        }
      } catch (error) {
        // Handle the error here
        console.error("Error:", error);
        // openNotification("error", "Failed..");
      }
    },
  });
  const [jobtemplate, setjobtemplate] = useState("");
  const getJobtemp = async () => {
    try {
      const response = await getAllRecruitmentJobTemplates({
        isActive:1
      });

      // console.log(response);
      setjobtemplate(
        response.result.map((each) => ({
          label: each.jobTitle,
          value: each.jobTemplateId,
        }))
      );
    } catch (error) { }
  };
  useEffect(() => {
    getJobtemp();
    // console.log(jobtemplate);
  }, []);
  const [evalutaionTem, setEvalutaionTem] = useState([]);
  const getEvaluationtem = async () => {
    try {
      const response = await getAllRecruitmentEvaluationTemplates();
      // console.log(response);
      setEvalutaionTem(
        response.result.map((each) => ({
          label: each.evaluationTemplateName,
          value: each.evaluationTemplateId,
        }))
      );
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getEvaluationtem();
    // console.log(evalutaionTem);
  }, []);

  const [questionareTem, setQuestionare] = useState([]);
  const getQuestionare = async () => {
    try {
      const response = await getAllRecruitmentQuestionnaireTemplates();
      // console.log(response);
      setQuestionare(
        response.result.map((each) => ({
          label: each.questionnaireTemplateName,
          value: each.questionnaireTemplateId,
        }))
      );
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getQuestionare();
    // console.log(evalutaionTem);
  }, []);

  const handleButtonClick = async (e) => {
    switch (activeBtnValue) {
      case "Jobdetails":
        // Handle submission for Configuration

        // console.log("valuegtgggggggggggg");
        formik1.handleSubmit();

        break;

      case "ApplicationForm":
        // Handle submission for Applicability
        // Your logic for Applicability form submission...
        // Move to the next step if applicable
        formik.handleSubmit();

        break;

      // Add more cases for additional activeBtnValues...

      case "Workflow":
        fetchData();
        // try {
        //   await fetchData(); // Assuming fetchData is an asynchronous function

        //   // Check if the radio is selected
        //   if (selectedWorkFlowId !== undefined) {
        //     // Assuming handleRadioChange is an asynchronous function
        //     await handleRadioChange(e);
        //     setNextStep(nextStep + 1);
        //   } else {
        //     // Handle the case where the radio is not selected, maybe show a message
        //     console.log('Radio not selected');
        //   }
        // } catch (error) {
        //   console.error('Error handling Workflow:', error);
        formik2.handleSubmit();
        // }
        break;
      case "TeamMembers":
        AllRecruitmentJobTeamMembers();
        formik4.handleSubmit();

        break;
      case "Publish":
        // assignPolicy();
        // Handle submission for Applicability
        // Your logic for Applicability form submission...
        // Move to the next step if applicable
        // formik1.handleSubmit();
        formik3.handleSubmit();
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
  };

  //Teammebers

  const [employeeList, setemployeeList] = useState([]);

  const AllRecruitmentJobTeamMembers = async () => {
    // const jobId=1;
    try {
      const response = await getAllRecruitmentUsers();
      // console.log(response);
      setemployeeList(
        response.result.map((item) => ({
          username: item.userName,
          userId: item.userId,
          userimage: item.userImage,
          modifiedOn: item.modifiedOn,
          createdOn: item.createdOn,
          roleId: item.roleId,
        }))
      );
    } catch (error) {
      console.error("Error updating workflow ID:", error);
    }
  };
  useEffect(() => {
    AllRecruitmentJobTeamMembers();
    // console.log(employeeList);
  }, []);
  const formik4 = useFormik({
    initialValues: {
      jobId: "", // Assuming jobId is present in the employee object
      userId: "",
      roleId: "",
      createdBy: "",
    },
    onSubmit: async (e) => {
      const idToUpdate = jobId || UpdateId;
      const createdBy = userid;
      // console.log(createdBy);
      const dataToSave = selectedemployee.map((employee) => ({
        jobId: idToUpdate, // Assuming jobId is present in the employee object
        userId: employee.userId,
        roleId: employee.roleId,
        createdBy: createdBy,
      }));
      // console.log(dataToSave);
      try {
        // console.log(e);

        const response = await saveRecruitmentJobTeamMemberBatch(dataToSave);

        // Handle the response if needed
        // console.log("Response:", response);
        if (response.status === 200) {
          openNotification("success", "Successful", response.message);
          setPresentage(3.4);
          // Add a delay before closing the notification
          // Adjust the delay time as needed
          setNextStep(nextStep + 1)
        } else if (response.status === 500) {
          openNotification("error", response.message);
        }
      } catch (error) {
        // Handle the error here
        console.error("Error:", error);
        // openNotification("error", "Failed..");
      }
    },
  });
  const [selectedJobId, setSelectedJobId] = useState("");
  const handleValueChange = (e) => {
    setSelectedJobId(e);
    // No need to call getjobById here
  };
  const [jobdata, setJobdata] = useState([]);
  // job template by id
  const getjobById = async (id) => {
    try {
      const response = await getRecruitmentJobTemplateById(id);
      // console.log(response);

      // console.log(id);
      if (response.result.length > 0) {
        const firstJob = response.result[0];

        setJobdata(firstJob);

        formik1.setFieldValue("companyId", parseInt(firstJob.companyId));
        formik1.setFieldValue("jobTitle", firstJob.jobTitle);
        formik1.setFieldValue(
          "departmentId",
          parseInt(firstJob.departmentId)
        );
        formik1.setFieldValue(
          "education",
          firstJob.education
        );
        formik1.setFieldValue("isActive", firstJob.isActive);
        formik1.setFieldValue("isSalaryPublic", firstJob.isSalaryPublic);
        formik1.setFieldValue("jobCode", firstJob.jobCode);
        setContent(firstJob.jobDescription);
        formik1.setFieldValue("jobType", firstJob.jobType);
        formik1.setFieldValue("location", firstJob.location);
        formik1.setFieldValue("requirementType", firstJob.requirementType);
        formik1.setFieldValue("salaryCurrency", firstJob.salaryCurrency);
        formik1.setFieldValue("salaryRangeFrom", firstJob.salaryRangeFrom);
        formik1.setFieldValue("salaryRangeTo", firstJob.salaryRangeTo);
        formik1.setFieldValue("experience", firstJob.experience);
        formik1.setFieldValue("searchKeywords", firstJob.searchKeywords);
        const formattedCustomFields =
          firstJob.jobApplicationFormData.customFields.map((field) => ({
            id: firstJob.jobTemplateId,
            answer_type: field.answer_type || "", // Fill with appropriate value
            question: field.question || "",
            answerMetaData: field.answer_meta_data || "[]",
            is_required: field.is_required || 0,
          }));
        setEvaluation(formattedCustomFields);
        setSelectedWorkFlowId(firstJob.workFlowId);

        formik.setFieldValue("headline", firstJob.jobApplicationFormData.headline)
        formik.setFieldValue("phone", firstJob.jobApplicationFormData.phone)
        formik.setFieldValue("address", firstJob.jobApplicationFormData.address)
        formik.setFieldValue("country", firstJob.jobApplicationFormData.country)
        formik.setFieldValue("education", firstJob.jobApplicationFormData.education)
        formik.setFieldValue("experience", firstJob.jobApplicationFormData.experience)
        formik.setFieldValue("summary", firstJob.jobApplicationFormData.summary)
        formik.setFieldValue("resume", firstJob.jobApplicationFormData.resume)
        formik.setFieldValue("coverLetter", firstJob.jobApplicationFormData.coverLetter)
        // console.log(firstJob.companyId);
      } else {
        console.error("No data found in the response.");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (selectedJobId) {
      getjobById(selectedJobId);
      // console.log(selectedJobId);
    }
  }, [selectedJobId]);

  // const fillFormWithJobData = async (jobId) => {
  //   try {
  //     const jobData = await getjobById(jobId);
  //     formik1.setValues({
  //       ...formik1.values,
  //       companyId: jobData.companyId,
  //       jobTitle: jobData.jobTitle,
  //       departmentId: jobData.departmentId,
  //       jobCode: jobData.jobCode,

  //     });

  //     // Set custom rate (assuming workLocationType is related to setCustomRate)
  //     setCustomRate(jobData.workLocationType);

  //     // ... set other fields based on jobData
  //   } catch (error) {
  //     console.error('Error fetching job data:', error);
  //   }
  // };
  // useEffect(()=>{
  //   fillFormWithJobData()
  // },[])

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
        wrapperBodyStyle={{ backgroundColor: "#F8FAFC" }}
        close={(e) => {
          setShow(e);
          //    setUpdateId(null);
          handleClose();
        }}
        header={[
          !updateId ? t("Create a Job") : t("Update Job "),
          !updateId ? t("Create New Job") : t("Update Selected Job "),
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
          handleButtonClick(e);
        }}
        buttonClickCancel={(e) => {
          if (activeBtn > 0) {
            setActiveBtn(activeBtn - 1);
            setNextStep(nextStep - 1);
            setActiveBtnValue(steps?.[activeBtn - 1].data);
            // console.log(activeBtn - 1);
          }
          setBtnName("");
        }}
        nextStep={nextStep}
        activeBtn={activeBtn}
        saveAndContinue={true}
        stepsData={steps}
      >
        <div>
          {/* <div className="inset-0 absolute bg-[#F8FAFC]"></div> */}
          <FlexCol>
            <div className="flex flex-col gap-6 max-w-[1070px] w-full mx-auto  ">
              {steps && (
                <div className=" sticky -top-6 w-full z-50 px-5  dark:bg-[#1f1f1f] pb-10 ">
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
                      title={"Job title & Department details"}
                      description={"Job title & Department details"}
                      className="Text_area "
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        //   setPresentage(1.4);
                      }}
                      initialExpanded={true}
                    >
                      {inputshow && (
                        <div className="grid grid-cols-3 gap-6 ">
                          <Dropdown
                            title={t("Choose Template")}
                            placeholder={t("Select")}
                            options={jobtemplate}
                            // Replace with the actual value/ID
                            change={(e) => {
                              handleValueChange(e);
                            }}
                            value={selectedJobId}
                          // required={true}
                          />

                          <Dropdown
                            title={t("Choose Company")}
                            placeholder={t("Choose Company")}
                            options={company}
                            value={formik1.values.companyId}
                            error={formik1.errors.companyId}
                            required={true}
                            change={(e) => {
                              formik1.setFieldValue("companyId", e);
                              getDepartmentList(e);
                            }}
                          />
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-4">
                        <FormInput
                          title={t("Job Title")}
                          placeholder={t("Enter job title")}
                          required={true}
                          change={(e) => {
                            formik1.setFieldValue("jobTitle", e);
                            setJobTitle(e)
                          }}
                          value={formik1.values.jobTitle}
                          error={formik1.errors.jobTitle}
                        />

                        <Dropdown
                          title={t("Department")}
                          placeholder={t("Choose department")}
                          required={true}
                          options={departmentList}
                          value={formik1.values.departmentId}
                          error={formik1.errors.departmentId}
                          change={(e) => {
                            formik1.setFieldValue("departmentId", e);
                          }}
                        />

                        <FormInput
                          title={t(" Job Code")}
                          placeholder={t("Enter Job Code")}
                          required={true}
                          change={(e) => {
                            formik1.setFieldValue("jobCode", e);
                          }}
                          value={formik1.values.jobCode}
                          error={formik1.errors.jobCode}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <Dropdown
                          title={t("Choose Evaluation Template")}
                          placeholder={t("Select...")}
                          options={evalutaionTem}
                          value={formik1.values.evaluationTemplateId}
                          error={formik1.errors.evaluationTemplateId}
                          change={(e) => {
                            formik1.setFieldValue("evaluationTemplateId", e);
                          }}
                        />
                        <Dropdown
                          title={t("Choose Questionnaire Template")}
                          placeholder={t("Select...")}
                          options={questionareTem}
                          value={formik1.values.questionnaireTemplateId}
                          error={formik1.errors.questionnaireTemplateId}
                          change={(e) => {
                            formik1.setFieldValue(
                              "questionnaireTemplateId",
                              e
                            );
                          }}
                        />
                      </div>
                    </Accordion>

                    <Accordion
                      title={"Location"}
                      description={"Location "}
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
                            className={`col-span-4 p-1.5 border rounded-2xl  cursor-pointer showDelay dark:bg-dark  ${customRate === each.id && "border-primary "
                              } `}
                            onClick={() => {
                              setCustomRate(each.id);
                              formik1.setFieldValue("workLocationType", each.value);
                            }}

                          >
                            <div className="flex justify-between items-start">
                              <div className=" flex  gap-2">
                                {/* <GiReceiveMoney
                                className={`${
                                  customRate === each.id && "text-primary"
                                } `}
                              /> */}
                                <img
                                  className={`${customRate === each.id &&
                                    " text-primary  "
                                    } p-2 border rounded-md w-[66px] bg-[#F8FAFC]`}
                                  src={each.image}
                                  alt=""
                                >
                                </img>
                                {/* <img
                                  src={customRate === each.id ? cash : cashGray}
                                  alt=""
                                  className=" w-6 h-6"
                                /> */}
                                <div>
                                  <h3 className=" text-sm font-semibold mt-[10px]">
                                    {each.title}
                                  </h3>
                                  <p className=" text-xs font-medium text-[#667085] ">
                                    {each.description}
                                  </p>
                                </div>
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
                          placeholder={'Enter Location'}
                          change={(e) => {
                            formik1.setFieldValue('location', e)

                          }}
                          value={formik1.values.location}
                          error={formik1.errors.location}
                          required={true}
                        />

                        <Dropdown
                          title={'Requirement'}
                          placeholder={'Choose Requirement'}
                          options={Requirment}
                          value={formik1.values.requirementType
                          }
                          error={formik1.errors.requirementType}
                          change={(e) => {
                            formik1.setFieldValue('requirementType', e)
                            // console.log(e)
                          }}
                          required={true}
                        />
                      </div>
                    </Accordion>

                    <Accordion
                      title={"Employment Details"}
                      description={"Employment Details"}
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
                          placeholder={'Choose Job Type'}
                          options={JobType}
                          change={(e) => {
                            formik1.setFieldValue('jobType', e)
                            // console.log(e)
                          }}
                          value={formik1.values.jobType}
                          error={formik1.errors.jobType}
                          required={true}

                        />
                        <Dropdown
                          title={'Experience'}
                          placeholder={'Choose Experience'}
                          options={experiencelevel}
                          value={formik1.values.experience}
                          error={formik1.errors.experience}
                          change={(e) => {
                            formik1.setFieldValue('experience', e)
                          }}
                          required={true}
                        />
                        <Dropdown
                          title={'Education'}
                          placeholder={'Choose Education'}
                          options={eductaion}
                          value={formik1.values.education}
                          error={formik1.errors.education}
                          change={(e) => {
                            formik1.setFieldValue('education', e)
                          }}
                          required={true}
                        />

                      </div>
                      <div className='grid grid-cols-3 gap-4'>
                        <FormInput
                          title={'Keywords'}
                          placeholder={'Enter Keywords'}
                          change={(e) => {
                            formik1.setFieldValue('searchKeywords', e)
                          }}
                          value={formik1.values.searchKeywords}
                          error={formik1.errors.searchKeywords}
                          required={true}
                        />
                        <FormInput
                          title={'Number of Opennings'}
                          placeholder={'Enter Number of Opennings'}
                          change={(e) => {
                            formik1.setFieldValue('noOfVaccancies', e)
                          }}
                          value={formik1.values.noOfVaccancies}
                          error={formik1.errors.noOfVaccancies}
                          type={"number"}
                          required={true}
                        />

                      </div>
                      <div className='grid grid-cols-4 gap-4'>
                        <FormInput
                          title={'Salary Range From'}
                          placeholder={'Enter Salary Range From'}
                          description={'Minimum Annual Salary'}
                          change={(e) => {
                            formik1.setFieldValue('salaryRangeFrom', e);
                            // Validate Salary Range To when Salary Range From changes
                            // console.log(e)

                          }}
                          value={formik1.values.salaryRangeFrom}
                          type={"number"}
                          error={formik1.errors.salaryRangeFrom}
                          required={true}
                          maxLength={15}
                        />

                        <FormInput
                          title={'Salary Range To'}
                          placeholder={'Enter Salary Range To'}
                          description={'Maximum Annual Salary'}
                          change={(e) => {
                            formik1.setFieldValue('salaryRangeTo', e);
                            // Validate Salary Range To
                            const salaryRangeTo = parseFloat(e); // Convert input to a number
                            const salaryRangeFrom = parseFloat(formik1.values.salaryRangeFrom); // Convert Salary Range From to a number

                            if (salaryRangeTo <= salaryRangeFrom) {
                              formik1.setFieldError('salaryRangeTo', 'Salary Range To cannot be less than or equal to Salary Range From');
                            } else {
                              // Clear the error message when the condition is met
                              formik1.setFieldError('salaryRangeTo', '');

                            }
                          }}
                          value={formik1.values.salaryRangeTo}
                          error={formik1.errors.salaryRangeTo}
                          required={true}
                          type={"number"}
                          maxLength={15}
                        />
                        <Dropdown
                          title={'Salary Currency'}
                          placeholder={'Choose salary currency'}
                          options={saleryCurrency}
                          value={formik1.values.salaryCurrency}
                          error={formik1.errors.salaryCurrency}
                          change={(e) => {
                            formik1.setFieldValue('salaryCurrency', e)
                          }}
                          required={true}
                        />
                        <div className="flex items-center gap-2">
                          <CheckBoxInput
                            title={"View Public"}
                            // titleRight={true}
                            change={(e) => {
                              formik1.setFieldValue('isSalaryPublic', e)
                              // console.log(e)
                            }}
                            value={formik1.values.isSalaryPublic}
                          />
                          <div className="flex flex-col gap-1 pt-2">
                            <p className="text-sm dark:text-white">View Public</p>
                            <p className="text-xs text-gray-500">Given Salary will be visible for public</p>
                          </div>
                        </div>
                      </div>
                    </Accordion>

                    <Accordion
                      title={"Job Description"}
                      description={"Job Description"}
                      className="Text_area"
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        //    setPresentage(1.4);
                      }}
                      initialExpanded={true}
                    >
                      {/* <Card className="bg-primaryalpha/5"> */}
                      <div className="border rounded-md bg-primaryalpha/5">
                        <div className="flex items-center px-1.5  ">
                          <img src={AI_Text} alt='' className="border rounded-md"></img>
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
                      {/* </Card> */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>

                        <Dropdown
                          title={''}
                          placeholder={'Choose Job Description'}
                          options={JobDescriptionList}
                          change={(e) => {
                            setDecriptionId(e)
                          }}
                        />

                        <ButtonClick handleSubmit={handleGenerateWithAI} BtnType="primary"
                          icon={<img src={image} alt="image" style={{ height: '20px', width: '20px', alignItems: "center" }} />} buttonName={"Generate with AI"} />
                      </div>
                      {/* <div className="pt-4">
                                            <TextEditor
                                             
                                            
                                             
                                             initialValue={formik1.values.jobDescription}
                                            //  change={(e)=>{
                                            //    formik1.setFieldValue('jobDescription',e)
                                            //  }}
                                            onChange={(editorState)=>{ formik1.setFieldValue('jobDescription',editorState)}}
                                             />
                                             </div> */}
                      <div className="pt-4">

                        <TextEditor
                          placeholder={"Enter Description"}
                          initialValue={content}
                          onChange={handleEditorChange}
                          minheight="250px"
                          loader={loader}
                          error={formik1.errors.jobDescription}
                        />
                      </div>
                      {/* <TextArea
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
                                             /> */}


                    </Accordion>
                  </FlexCol>
                </>


              ) : activeBtnValue === "ApplicationForm" ? (
                <>
                  
                   <FlexCol>
                      <Accordion
                        title={"Application Form "}
                        className="Text_area"
                        padding={true}
                        toggleBtn={false}
                        click={() => {
                          // setPresentage(1.4);
                        }}
                        initialExpanded={true}
                      >
                        <div className="flex flex-col gap-4 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Name
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons.filter(
                              (option) => option.label === t("Mandatory")
                            )}
                            title={""}

                            defaultValue={1}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Email
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons.filter(
                              (option) => option.label === t("Mandatory")
                            )}
                            title={""}

                            defaultValue={1}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between w-full">
                          <p className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Headline
                          </p>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("headline", e);
                            }}
                            defaultValue={formik.values.headline}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Phone
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("phone", e);
                            }}
                            defaultValue={formik.values.phone}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Address
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("address", e);
                            }}
                            defaultValue={formik.values.address}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Country
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("country", e);
                            }}
                            defaultValue={formik.values.country}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        </div>
                      </Accordion>
                    
                    
                      <Accordion
                        title={"Profile "}
                        className="Text_area"
                        padding={true}
                        toggleBtn={false}
                        click={() => {
                          // setPresentage(1.4);
                        }}
                        initialExpanded={true}
                      >
                        <div className="flex flex-col gap-4 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Education
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons.filter(
                              (option) => option.label !== t("Mandatory")
                            )}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("education", e);
                            }}
                            defaultValue={formik.values.education}
                          >
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Experience
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons.filter(
                              (option) => option.label !== t("Mandatory")
                            )}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("experience", e);
                            }}
                            defaultValue={formik.values.experience}
                          >
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Summary
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("summary", e);
                            }}
                            defaultValue={formik.values.summary}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Resume
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("resume", e);
                            }}
                            defaultValue={formik.values.resume}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>

                        <div className="v-divider" />
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Cover Letter
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("coverLetter", e);
                            }}
                            defaultValue={formik.values.coverLetter}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        </div>
                      </Accordion>
                     
                   
                      <Accordion
                        title={"Custom Fields "}
                        className="Text_area"
                        padding={true}
                        toggleBtn={false}
                        click={() => {
                          // setPresentage(1.4);
                        }}
                        initialExpanded={true}
                      >
                        <div className="flex flex-col gap-4 overflow-hidden">

                      
                        {evaluation.map((condition, index) => (
                          <>
                            <div className="flex items-center justify-between ">
                              <FormInput
                                title={`Question ${index + 1}`}
                                placeholder={'Type question here'}
                                value={condition.question}
                                change={(e) => {
                                  setEvaluation((prevEvaluation) => prevEvaluation.map((prevCondition, i) => i === index
                                    ? { ...prevCondition, question: e }
                                    : prevCondition
                                  )
                                  );
                                  // console.log(e);
                                }}
                                error={condition.question ? '' : errorMessages[index] || ''}
                              />
                              <div className="flex items-center gap-5">

                                <Dropdown
                                  options={Form}
                                  dropdownWidth='200px'
                                  
                                  change={(e) => {
                                    setEvaluation((prevEvaluation) => prevEvaluation.map((prevCondition, i) => i === index
                                      ? {
                                        ...prevCondition,
                                        answer_type: e,
                                        answerMetaData: [
                                          {
                                            id: 1,
                                            key: e,
                                            value: '',
                                          },
                                        ],
                                      }
                                      : prevCondition
                                    )
                                    );
                                    handleAddField(e)
                                  }}
                                  value={condition.answerMetaData[0]?.key}
                                  icon={<MdOutlineShortText />}
                                  icondropDown={true}
                                  error={condition.answer_type ? '':errorMessages[index] || ''}
                                  placeholder={"Choose Options"}

                                />

                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                  <p>Mandatory</p>
                                    <ToggleBtn />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                  <Tooltip placement="top" title={"Copy"}>
                                    <MdOutlineFileCopy
                                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                  </Tooltip>
                                  <Tooltip placement="top" color={"red"} title={"Delete"}>
                                    <MdDelete
                                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                      onClick={() => handleDeleteCondition(index)}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                            {condition.answerMetaData[0]?.key && (
                              <>
                                {['Drop-down', 'MultipleChoice', 'Checkboxes'].includes(condition.answerMetaData[0]?.key) && (
                                  // Render existing FormInput components for these options
                                  condition.answerMetaData.map((field, fieldIndex) => (
                                    <div key={fieldIndex} className="flex items-center">
                                      <FormInput
                                        title={`Options ${fieldIndex + 1}`}
                                        placeholder={'Enter value'}
                                        value={field.value}
                                        change={(e) => setEvaluation((prevEvaluation) => prevEvaluation.map((prevCondition, i) => i === index
                                          ? {
                                            ...prevCondition,
                                            answerMetaData: prevCondition.answerMetaData.map(
                                              (f, j) => j === fieldIndex
                                                ? { ...f, value: String(e) }
                                                : f
                                            ),
                                          }
                                          : prevCondition
                                        )
                                        )}
                                        error={field.value ? '': errorMessages[index] || ''}
                                      />
                                      <div className="ml-2">
                                        <MdDelete
                                          onClick={() => handleDeleteField(index, fieldIndex)}
                                          className="cursor-pointer text-red-500"
                                        />
                                      </div>
                                    </div>
                                  ))
                                )}
                                <div>
                                  {['Drop-down', 'MultipleChoice', 'Checkboxes'].includes(
                                    condition.answerMetaData[0]?.key
                                  ) && (
                                    <Tooltip placement="top" title={"Add more"}>
                                      <CgAdd
                                        onClick={() => handleAddField(index, condition.answerMetaData[0]?.key)}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                      />
                                      </Tooltip>
                                    )}
                                </div>
                              </>
                            )}

                            <div className="v-divider"></div>
                          </>
                        ))}
                        <AddMore name="Add Custom Field " className="!text-black" change={(e) => { handleAddCondition(); }} />
                        </div>
                      </Accordion>
                      </FlexCol>
                  
                </>
              ) : activeBtnValue === "Workflow" ? (
                <FlexCol>
                    <Accordion
                      title={"Workflow"}
                      className="Text_area"
                      padding={true}
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
                      <Radio.Group
                        onChange={(e) => {
                          setSelectedWorkFlowId(e.target.value);
                          setPresentage(2.4);
                        }}
                        value={selectedWorkFlowId}
                      >
                        {Stages.map((each) => (
                          <div key={each.workFlowId} className={`  relative p-2.5  mt-6 border rounded-md ${selectedWorkFlowId === each.workFlowId ? 'bg-[#F2F0FD]  border-[#6A4BFC]' : ''}`}  >
                            {/* <title={<span className="no-underline">{each.workFlowName}</span>}> */}
                            {/* <h6 className="h6 mt">{each.workFlowName}</h6> */}
                            <h6 className="h6 mb-4"> {each.workFlowName}  </h6>

                            <div className="">
                              <Jobcardcopy options={each.stages} selectable={false} firstCardSelectable={false} />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                padding: "8px",
                              }}
                            >

                              <Radio
                                value={each.workFlowId || selectedWorkFlowId}
                              ></Radio>
                            </div>
                          </div>
                        ))}
                      </Radio.Group>
                    </Accordion>
                </FlexCol>
              ) : activeBtnValue === "TeamMembers" ? (
                <FlexCol>
                  <Accordion
                    title={"TeamMembers"}
                    className="Text_area"
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(4.1);
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
                    <div className="grid grid-cols-2 mt-8">
                      <SearchBox placeholder={"Search Employess"} />
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>{" "}
                          {/* Add an additional column for the checkbox */}
                        </tr>
                      </thead>
                      <tbody>
                        {employeeList.map((employee) => (
                          <React.Fragment key={employee.userId}>
                            <tr >
                              <td >
                                <CheckBoxInput
                                  change={(isChecked, userId, roleId) => {
                                    setPresentage(3.4);
                                    if (isChecked) {
                                      setSelectedUserIds((prevState) => [
                                        ...prevState,
                                        userId,
                                      ]);
                                      setselectedemployee((prevState) => [
                                        ...prevState,
                                        {
                                          id: prevState.length + 1, // Generate a unique ID for the selected entry
                                          jobId: "", // Set the job ID accordingly
                                          userId: userId, // Set the user ID to the employee's user ID
                                          roleId: roleId, // Set the role ID accordingly
                                          createdBy: "", // Set the createdBy field accordingly
                                        },
                                      ]);
                                    } else {
                                      setSelectedUserIds((prevState) =>
                                        prevState.filter((id) => id !== userId)
                                      );
                                      setselectedemployee((prevState) =>
                                        prevState.filter(
                                          (entry) => entry.userId !== userId
                                        )
                                      );
                                    }
                                  }}
                                  value={selectedUserIds.includes(
                                    employee.userId
                                  )}
                                  actionId={employee.userId}
                                  roleId={employee.roleId}
                                />
                              </td>
                              <td>
                                <div className="flex items-center gap-4 py-2">
                                  {/* Assuming you have an 'image' property in your employee object */}

                                  <div className="size-10 2xl:size-11 rounded-full overflow-hidden">
                                    {employee.userimage ? (
                                      <img
                                        src={employee.userimage}
                                        alt={`${employee.username} Avatar`}
                                        className="object-cover object-center w-full h-full"
                                      />
                                    ) : (
                                      <img
                                        src={noImg}  // replace with your default image path
                                        alt="Default Avatar"
                                        className="object-cover object-center w-full h-full"
                                      />
                                    )}
                                  </div>
                                  <div className="flex flex-col">
                                    <div class="text-gray-900 text-sm font-semibold font-['Inter'] leading-tight">
                                      {employee.username}
                                    </div>
                                    <div className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
                                      {employee.employeeid}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td></td>
                              <td>
                                <div class="text-gray-900 text-sm font-medium font-['Inter'] leading-tight">
                                  {employee.createdOn}
                                </div>
                              </td>
                              <td>
                                <div class="text-gray-900 text-sm font-medium font-['Inter'] leading-tight">
                                  {employee.modifiedOn}
                                </div>
                              </td>
                            </tr>
                            <tr
                              className="v-divider"
                              key={`divider-${employee.id}`}
                            >
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
                  padding={true}
                  toggleBtn={false}
                  click={() => {
                    // setPresentage(4.1);
                  }}
                  initialExpanded={true}

                >
                  <div className="flex justify-between">
                    <TabsNew tabs={tabs} />
                    <div className="flex items-center">
                      {/* <input
              id={`selectAll`}
              name={`selectAll`}
              type="checkbox"
              className="h-4 w-4 rounded border text-indigo-600 focus:ring-indigo-600 mr-2"
              onClick={() => {handleDivClick(index)
                setPresentage(5.5);
              }
              }
            /> */}
                      {/* {selectedCount > 0 && (
              <span className="mr-2 h6">{`Selected ${selectedCount} portal `}</span>
            )} */}
                    </div>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-6 ">
                    <div className="flex flex-col gap-6 lg:col-span-8">
                      <div className="flex flex-wrap gap-6 ">
                        {/* Small card-like div */}
                        {data.map((item, index) => (
                          <div
                            key={index}
                            className={`bg-white dark:bg-black rounded-md border-[1px]  p-2 w-[291px] h-[68px] ${selectedDivs.includes(index)
                              ? "border-[#6A4BFC]"
                              : "border-[#DADADA]"
                              }`}
                            style={{ position: "relative" }} // Added to set position for absolute checkbox
                          >
                            <div className="items-center flex  lg:flex-row">
                              <img
                                src={item.image}
                                alt="Logo"
                                className="w-[51px] h-[51px] object-cover border rounded-md  lg:border-b-0"
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
                              onChange={() => {
                                handleCheckboxChange(index);
                                setPresentage(3.5);
                              }}
                              style={{ borderColor: "red" }}
                            />
                          </div>
                        ))}
                      </div>
                      <FormInput
                        type={"text"}
                        websiteLink
                        className="w-[305px]"
                        title="Sharable Link"
                        placeholder="loyaltri.com/jkjskl3lsjlfsdf"
                        icon={<MdContentCopy />}
                        description={"Share this link to anywhere"}
                      />
                    </div>
                  </div>
                </Accordion>
              ) : null}
              {contextHolder}
            </div>
          </FlexCol>
        </div>
      </DrawerPop>
    </div>
  );
};

export default Createjob;