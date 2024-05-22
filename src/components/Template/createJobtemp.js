import React, { useState, useEffect, useRef } from "react";
import DrawerPop from "../common/DrawerPop";
import { useTranslation } from "react-i18next";
import { RxCross2, RxQuestionMarkCircled } from "react-icons/rx";
import AI_Text from "../../assets/images/AI_Text.jpg"
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
import * as yup from "yup";
import TextArea from "../common/TextArea";
import Radiobuttonnew from "../common/Radiobuttonnew";
import GoogleForm from "../common/GoogleForm";
import JobCard from "../common/JobCard";
// import DOMPurify from 'dompurify';
import {
  cardData,
  regularOvertime,
  Requirment,
  JobType,
  experiencelevel,
  eductaion,
  saleryCurrency,
} from "../data";
import {
  saveRecruitmentJobApplicationFormSetting,
  saveRecruitmentJobTemplate,
  getAllRecruitmentWorkFlows,
  updateRecruitmentJob,
  getAllRecruitmentJobTeamMembers,
  updateRecruitmentJobTemplate,
  getRecruitmentJobTemplateById,
  getAllRecruitmentJobDescriptionTemplates,
  getRecruitmentJobDescriptionTemplateById,
  getAllRecruitmentJobTemplates
} from "../Api1";
import { Formik, useFormik } from "formik";
import { CgAdd } from "react-icons/cg";
import { Form } from "../data";
import { MdContentCopy, MdOutlineFileCopy } from "react-icons/md";
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
import Jobcardcopy from "../common/Jobcardcopy";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAsterisk } from "react-icons/fa";
import TextEditorcopy from "../common/TextEditor/textEditorCopy";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
// import Editor from "../common/TextEditor/textEditorCopy";
// import Editor1 from "../common/TextEditor/textEditorCopy";
// import { convertToHTML } from 'draft-convert';
// import Editor from "../common/TextEditor/textEditorCopy";

const CreatejobTemp = ({
  open = "",
  close = () => { },
  inputshow = false,
  isUpdate = {},
  updateId,
  refresh
}) => {
  const [show, setShow] = useState(open);
  const { t } = useTranslation();

  // const [isUpdate, setIsUpdate] = useState();
  const [Jobcode, setJobcode] = useState("")
  const [errorMessages, setErrorMessages] = useState("");
  const [Education, seteducation] = useState(1)
  const [fieldValue, setFieldValue] = useState("")
  const [Experience, setExperience] = useState(1)
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
  const [selectedWorkFlowId, setSelectedWorkFlowId] = useState("");
  const [selectedDivs, setSelectedDivs] = useState([]);
  const [content, setContent] = useState("");
  const [JobDescriptionList, setJobDescriptionList] = useState([])
  const [decriptionId, setDecriptionId] = useState(null)
  const [Phone, setPhone] = useState(1)
  const [Headline, setHeadline] = useState(1)
  const [Address, setAddress] = useState(1)
  const [country, setCountry] = useState(1)
  const [summary, setSummary] = useState(1)
  const [resume, setResume] = useState(1)
  const [coverLetter, setCoverletter] = useState(1)
  const [errors, setErrors] = useState([]);
  const [jobTitle, setJobTitle] = useState("")
  const [html, setstateHTML] = useState("")
  const [Questionerror, setQuestionError] = useState('')
  const [answerError, setAnswerError] = useState('')
  const [OptionError, setoptionserror] = useState('')
  const[salaryRangeToError,setsalaryRangeToError] = useState("")
  const[salaryRangeFromError,setsalaryRangeFromError] = useState("")
  const[trigger,SetTrigger] = useState("")

  // console.log(updateId);
  useEffect(() => {
    // Retrieve the login data JSON string from local storage
    const loginDataString = localStorage.getItem("LoginData");

    if (loginDataString) {
      // Parse the JSON string to get the LoginData object
      const loginData = JSON.parse(loginDataString);

      // Extract the username from the userData object
      setuserid(loginData && loginData.userData && loginData.userData.id);

      // Now, 'username' variable contains the username
    } else {
      console.error("Login data not found in local storage.");
    }
  }, []); // Empty dependency array ensures the useEffect runs only once
  const [isChecked, setIsChecked] = useState(false);

  const getAllJobdescription = async () => {
    try {
      const data = await getAllRecruitmentJobDescriptionTemplates({})
      console.log(data)
      // 
      setJobDescriptionList(data.result.map((each) => ({
        label: each.descriptionTemplateName,
        value: each.descriptionTemplateId
      })))
    } catch (error) {
      console.log(error)
    }
  }

  const getDecriptionById = async () => {
    const id = decriptionId
    try {
      const response = await getRecruitmentJobDescriptionTemplateById({ id: id })
      console.log(response)

      setContent(response.result[0].descriptionTemplate);


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDecriptionById()
  }, [decriptionId])
  useEffect(() => {
    getAllJobdescription()
  }, [])

  // console.log("Username:", userid);
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
  const [loader, setloader] = useState(false)
  const handleGenerateWithAI = async () => {
    setloader(true)
    try {
      const requestBody = {
        val: jobTitle,
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
    }
    finally {
      setloader(false); // Hide loader after response is received
    }
  };
  const   handleEditorChange = (content) => {
        //             const contentState = content.getCurrentContent();
        //             const htmlContent = convertToHTML(contentState);
                    
        //  console.log(content)           
                  // setContent(htmlContent);
                  // const blocksFromHTML = convertFromHTML(content);
                  // const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
                           
                  // setContent(EditorState.createWithContent(contentState))
                  setContent(content)
                  // console.log(contentState);
  };
  const [evaluation, setEvaluation] = useState([
    {
      id: 1,
      answer_type: "",
      question: "",
      answerMetaData: "[]",
      is_required: 0,
    },
  ]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [jobId, setJobId] = useState("");

  // console.log(evaluation);
  //job applying

  const formik = useFormik({
    initialValues: {
      companyId: "",
      jobTitle: "",
      departmentId: "",
      jobCode: "",
      workLocationType:"",
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
      workFlowId: "",
      jobPublishType: "",
      jobPublishDetails: "",
      jobApplicationFormData: {
        name: 1,
        email: 1,
        headline: 1,
        phone: 1,
        address: 1,
        country: 1,
        education: 1,
        experience: 1,
        summary: 1,
        resume: 1,
        coverLetter: 1,

        customFields: [],
      },
      createdBy: "",
    },
    //  enableReinitialize: true,
    //   validateOnChange: false,
    //   validationSchema: yup.object().shape({
    //     companyId: yup.string().required("First Name is Required"),
    //     jobTitle: yup.string().required("Last Name is Required"),
    //     departmentId: yup.string().required("Email is Required"),
    //     jobCode: yup.string().min(10).max(10).required("Mobile is Required"),
    //     experience: yup.string().required("Gender is Required"),
    //     education: yup.string().required("Date of Birth Group is Required"),
    //     searchKeywords: yup.string().required("Gender is Required"),

    //     salaryRangeFrom: yup.string().required("Gender is Required"),
    //     salaryCurrency: yup.string().required("Date of Birth Group is Required"),

    //   }),

    onSubmit: async (e) => {
      try {
        const updatedCustomFields = evaluation.map((condition) => ({
          question: condition.question,
          answer_type: condition.answer_type,
          is_required: condition.is_required,
          answer_meta_data: condition.answerMetaData,
        }));



        if (updateId) {
          const response = await updateRecruitmentJobTemplate({
            id: updateId,
            companyId: companyId,
            jobTitle: e.jobTitle,
            departmentId: e.departmentId,
            jobCode: e.jobCode,
            workLocationType: e.workLocationType||"Onsite",
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
            workFlowId: selectedWorkFlowId,
            jobPublishType: null,
            jobPublishDetails: null,
            createdBy: 45,
            jobApplicationFormData: {
              name: 1,
              email: 1,
              headline: Headline,
              phone: Phone,
              address: Address,
              country: country,
              education: Education,
              experience: Experience,
              summary: summary,
              resume: resume,
              coverLetter: coverLetter,

              customFields: updatedCustomFields,
            },
          });
          console.log(response);
          if (response.status === 200) {
            openNotification(
              "success",
              "Successful",
              response.message.replace(/<br\/>/g, '\n')
            );
            setPresentage(2);
            setTimeout(() => {
              handleClose();
              refresh()
            }, 1500);
          } else if (response.status === 500) {
            openNotification("error", "Info", response.message.replace(/<br\/>/g, '\n'));

          }
        } else {
          console.log(e);

          const response = await saveRecruitmentJobTemplate({
            companyId: companyId,
            jobTitle: e.jobTitle,
            departmentId: e.departmentId,
            jobCode: e.jobCode,
            workLocationType: e.workLocationType||"Onsite",
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
            workFlowId: selectedWorkFlowId,
            jobPublishType: null,
            jobPublishDetails: null,
            createdBy: 45,
            jobApplicationFormData: {
              name: 1,
              email: 1,
              headline: Headline,
              phone: Phone,
              address: Address,
              country: country,
              education: Education,
              experience: Experience,
              summary: summary,
              resume: resume,
              coverLetter: coverLetter,

              customFields: updatedCustomFields,
            },
          });
          console.log(response);

          console.log(jobId);
          if (response.status === 200) {
            openNotification(
              "success",
              "Successful",
              response.message.replace(/<br\/>/g, '\n')
            );
            setPresentage(2);
            setTimeout(() => {
              handleClose();
              refresh()
            }, 1500);
          } else if (response.status === 500) {
            openNotification("error", "Info", response.message.replace(/<br\/>/g, '\n'));
          }


        }
      } catch (error) {
        // Handle the error here
        console.error("Error during form submission:", error);
        // openNotification(
        //   "error",
        //   "Error saving category",
        //   error
        // );
      }
    },
  });
  const [jobdata, setjobdata] = useState([]);

  const getJobtemById = async () => {
    try {
      const response = await getRecruitmentJobTemplateById(updateId);
      console.log(response);

      if (response.result.length > 0) {
        const firstJob = response.result[0];

        setjobdata(firstJob);

        formik.setFieldValue("companyId", firstJob.companyId);
        formik.setFieldValue("jobTitle", firstJob.jobTitle);
        formik.setFieldValue("departmentId", firstJob.departmentId);
        formik.setFieldValue("education", firstJob.education);
        formik.setFieldValue("workLocationType", firstJob.workLocationType);
        formik.setFieldValue("isActive", firstJob.isActive);
        formik.setFieldValue("isSalaryPublic", firstJob.isSalaryPublic);
        formik.setFieldValue("jobCode", firstJob.jobCode);
        setContent(firstJob.jobDescription)
          // const blocksFromHTML = convertFromHTML(firstJob.jobDescription);
          // const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
          // const newEditorState = EditorState.createWithContent(contentState);
          // setContent(newEditorState);
        formik.setFieldValue("jobType", firstJob.jobType);
        formik.setFieldValue("location", firstJob.location);
        formik.setFieldValue("requirementType", firstJob.requirementType);
        formik.setFieldValue("salaryCurrency", firstJob.salaryCurrency);
        formik.setFieldValue("salaryRangeFrom", firstJob.salaryRangeFrom);
        formik.setFieldValue("salaryRangeTo", firstJob.salaryRangeTo);
        formik.setFieldValue("searchKeywords", firstJob.searchKeywords);
        formik.setFieldValue("experience", firstJob.experience);
        setHeadline(firstJob.jobApplicationFormData.headline)
        setPhone(firstJob.jobApplicationFormData.phone)
        setAddress(firstJob.jobApplicationFormData.address)
        setCountry(firstJob.jobApplicationFormData.country)
        seteducation(firstJob.jobApplicationFormData.education)
        setExperience(firstJob.jobApplicationFormData.experience)
        setSummary(firstJob.jobApplicationFormData.summary)
        setResume(firstJob.jobApplicationFormData.resume)
        setCoverletter(firstJob.jobApplicationFormData.coverLetter)
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


        console.log(firstJob.companyId);
      } else {
        console.error("No data found in the response.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJobtemById();
    console.log(jobdata);
  }, []);
  const [departmentList, setDepartmentList] = useState([]);
  const [company, setCompany] = useState([]);
  const getDepartmentList = async () => {
    try {
      const result = await axios.post(
        API.HOST + API.GET_DEPARTMENT + "/" + companyId
      );
      // console.log(result,"result")
      setDepartmentList(
        result.data.tbl_department.map((each) => ({
          label: each.department,
          value: each.departmentId,
        }))
      );

      console.log("Department List:", departmentList);
      console.log("Is Update:", isUpdate);
    } catch (error) {
      console.error("Error fetching department list:", error);
    }
  };
  useEffect(() => {
    // switch (assignBtnName) {
    //   default:
    getDepartmentList();
  }, []);

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
    console.log("Deleting field", conditionIndex, fieldIndex);

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
    // Reset the form values to their initial state
    formik.resetForm();
    // Close the modal or perform other actions
    close(false);
  };

  const [steps, setSteps] = useState([
    {
      id: 1,
      value: 0,
      title: t("Job Details"),
      data: "Jobdetails",
    },

    {
      id: 2,
      value: 1,
      title: t("Application Form"),
      data: "ApplicationForm",
    },
    {
      id: 3,
      value: 2,
      title: t("Workflow"),
      data: "Workflow",
    },
    // {
    //     id: 4,
    //     value: 3,
    //     title: t("TeamMembers"),
    //     data: "TeamMembers",
    //   },
    //   {
    //     id: 5,
    //     value: 4,
    //     title: t("Publish"),w
    //     data: "Publish",
    //   },
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
    console.log(nextStep, activeBtn);
    if (activeBtn < 3 && activeBtn !== nextStep) {
      /// && activeBtn !== nextStep
      setActiveBtn(1 + activeBtn);
      setNextStep(nextStep);
      console.log(1 + activeBtn);
      console.log(steps?.[activeBtn + 1].data, "data");
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
      console.log(error);
    }
    console.log("company", company);
  };
  useEffect(() => {
    // switch (assignBtnName) {
    //   default:
    getCompany();
    console.log("value", company);
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
      const response = await getAllRecruitmentWorkFlows({
      companyId:companyId

      });
      console.log("Response:", response);

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
    console.log("Updated Workflow:", Stages);
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

  // const handleRadioChange = async (e) => {
  //   const workFlowId = e.target.value;
  //   setSelectedWorkFlowId(workFlowId);

  //   // Assuming you have the jobId stored somewhere, replace 'yourJobId' with the actual jobId
  //   // const jobId = 24;
  //   const modifiedBy = userid
  //   // Update the database with the selected workflow ID for the specific job

  //    try {
  //     console.log(workFlowId)
  //     const response = await updateRecruitmentJob(
  //        jobId,
  //        workFlowId,
  //        modifiedBy,

  //     );

  //     console.log(response);
  //     if (response.status === 200) {

  //       openNotification(
  //         "success",
  //         "Successful",
  //         response.message
  //       );
  //       setPresentage(2);

  //     }
  //   } catch (error) {
  //     console.error('Error updating workflow ID:', error);

  //   }
  // };
  const [jobcodelength, setJobcodelength] = useState("")
  const getJobsByJoBecode = async () => {
    try {
      const response = await getAllRecruitmentJobTemplates({
        jobCode: Jobcode
      })
      setJobcodelength(response.result.length)
      if (response.result.length > 0) {
        formik.setFieldError('jobCode', 'Job code already exists.');
      }

      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getJobsByJoBecode()
  }, [Jobcode])
  const handleButtonClick = async (e) => {
    switch (activeBtnValue) {
      case "Jobdetails":
        // Handle submission for Configuration

        if (formik.values.salaryRangeTo && formik.values.salaryRangeFrom && parseFloat(formik.values.salaryRangeTo) <= parseFloat(formik.values.salaryRangeFrom)) {
          formik.setFieldError('salaryRangeTo', '"Salary Range To" must be greater than "Salary Range From"');
          return;
        }
        if (formik.values.jobTitle && formik.values.jobTitle.length < 3) {
          formik.setFieldError('jobTitle', 'Job Title should have at least 3 letters.');
          return;
        }
        if (
          !formik.values.jobTitle || !formik.values.departmentId || !formik.values.jobCode ||
          !formik.values.location ||
          !formik.values.requirementType ||
          !formik.values.jobType ||
          !formik.values.experience ||
          !formik.values.education ||
          !formik.values.searchKeywords ||
          !formik.values.salaryRangeFrom ||
          !formik.values.salaryRangeTo ||
          !formik.values.salaryCurrency ||
          !content
        ) {
          formik.setFieldError('jobTitle', !formik.values.jobTitle ? 'Job Title is required' : '');
          formik.setFieldError('departmentId', !formik.values.departmentId ? 'Department is required' : '');
          formik.setFieldError('jobCode', !formik.values.jobCode ? 'Job Code is required' : '');
          formik.setFieldError('location', !formik.values.location ? 'Location is required' : '');
          formik.setFieldError('requirementType', !formik.values.requirementType ? 'Requirment Type is required' : '');
          formik.setFieldError('experience', !formik.values.experience ? 'Experience is required' : '');
          formik.setFieldError('searchKeywords', !formik.values.searchKeywords ? 'Search Key Words is required' : '');
          formik.setFieldError('salaryRangeFrom', !formik.values.salaryRangeFrom ? 'Salery Range From is required' : '');
          formik.setFieldError('salaryRangeTo', !formik.values.salaryRangeTo ? 'Salary Range To is required' : '');
          formik.setFieldError('salaryCurrency', !formik.values.salaryCurrency ? 'Salary Currency is required' : '');
          formik.setFieldError('jobType', !formik.values.jobType ? 'JobType is required' : '');
          formik.setFieldError('education', !formik.values.education ? 'Education is required' : '');
          formik.setFieldError(
            'jobDescription',
            !content ? 'Description is required' : ''
        );
       
          return; 

        }
        if(formik.values.location && formik.values.location.length <3){
          formik.setFieldError('location','Location field must contain atleast 3 Characters')
          return;
        }
   
        if(content && content.length < 3){
          formik.setFieldError('jobDescription','JobDescription should have at least 3 letters.');
          return; 
        }
        if (jobcodelength === 0) {

          setNextStep(nextStep + 1);
        } else (
          getJobsByJoBecode()
        )
        console.log(content)
        setPresentage(1)
        break;

      case "ApplicationForm":
        // Handle submission for Applicability
        // Your logic for Applicability form submission...
        // Move to the next step if applicable
        let hasError = false;
        const newErrorMessages = evaluation.map((condition) => {
          

          if (!condition.question) {
            setQuestionError('Please enter a question.');
            hasError=true
          } 
           if (!condition.answer_type) {
            setAnswerError('Please choose an answer type.');
            hasError=true
          } 
           if (
            ["Drop-down", "Multiple Choice", "Checkboxes"].includes(condition.answer_type) &&
            (condition.answerMetaData.some((field) => !field.value) ||
              (!condition.answerMetaData[0]?.value && condition.answerMetaData[0]?.key !== "ShortAnswer"))
          ) {
            setoptionserror('Option is required');
            hasError=true
          }

         
        });

        // Update errorMessages state with new error messages

        if (hasError) {
          // Don't proceed if there are errors
          return;
        }

        setNextStep(nextStep + 1);

        break;
        setPresentage(2)
      // Add more cases for additional activeBtnValues...

      case "Workflow":
        // fetchData();
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
        formik.handleSubmit();
        // }
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
          refresh()
        }}
        header={[
          !updateId ? t("Create a Job Template") : t("Update Job Template"),
          !updateId ? t("Create a Job Template") : t("Update Job Template"),
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
            console.log(activeBtn - 1);
          }
          setBtnName("");
        }}
        nextStep={nextStep}
        activeBtn={activeBtn}
        saveAndContinue={true}
        stepsData={steps}
      >
        <div>
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
                      }}
                      initialExpanded={true}
                    >
                      {inputshow && (
                        <div className="grid grid-cols-3 gap-6 ">
                          <Dropdown
                            title={t("Choose Template")}
                            placeholder={t("Choose Template")}
                          // required={true}
                          />

                          <Dropdown
                            title={t("Choose Company")}
                            placeholder={t("Choose Company")}
                            options={company}
                            value={formik.values.companyId}
                            required={true}
                            change={(selectedCompanyId) => {
                              formik.setFieldValue(
                                "companyId",
                                selectedCompanyId
                              );
                              getDepartmentList(selectedCompanyId);
                            }}
                          />
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-4">
                        <FormInput
                          title={t("Job Title")}
                          placeholder={t("Enter Job Title")}
                          required={true}
                          change={(e) => {
                            formik.setFieldValue("jobTitle", e);
                            setPresentage(.1)
                            setJobTitle(e)
                          }}
                          value={formik.values.jobTitle}
                          error={formik.errors.jobTitle}
                        />

                        <Dropdown
                          title={t("Department")}
                          placeholder={t("Choose Department")}
                          required={true}
                          options={departmentList}
                          value={formik.values.departmentId}
                          change={(e) => {
                            formik.setFieldValue("departmentId", e);
                            setPresentage(.2)
                          }}
                          error={formik.errors.departmentId}
                        />

                        <FormInput
                          title={t(" Job Code")}
                          placeholder={t("Enter Job Code")}
                          required={true}
                          change={(e) => {
                            formik.setFieldValue("jobCode", e);
                            setJobcode(e)
                            setPresentage(.3)
                          }}
                          value={formik.values.jobCode}
                          error={formik.errors.jobCode}
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
                        className={`col-span-4 p-1.5 border rounded-2xl  cursor-pointer showDelay dark:bg-dark  ${
                            (!formik.values.workLocationType && each.value === "Onsite") || 
                            (formik.values.workLocationType === each.value) ? "border-primary" : ""
                        }`}
                        onClick={() => {
                            setCustomRate(each.id);
                            if (!formik.values.workLocationType) {
                                formik.setFieldValue("workLocationType", "Onsite");
                            } else {
                                formik.setFieldValue("workLocationType", each.value);
                            }
                            setPresentage(.4);
                        }}
                    >
                            <div className="flex justify-between items-start">
                              <div className="flex gap-2">
                                <img
                                  className={`${(!formik.values.workLocationType && each.value === "Onsite") || (formik.values.workLocationType === each.value) ? "text-primary" : ""} p-2 border rounded-md w-[66px] bg-[#F8FAFC]`}
                                  src={each.image}
                                  alt=""
                                >
                                </img>
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
                                className={`${(!formik.values.workLocationType && each.value === "Onsite") || (formik.values.workLocationType === each.value) ? "border-primary" : ""} border  rounded-full`}
                              >
                                <div
                                  className={`font-semibold text-base w-4 h-4 border-2 border-white   rounded-full ${(!formik.values.workLocationType && each.value === "Onsite") || (formik.values.workLocationType === each.value) ? "text-primary bg-primary" : ""}`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormInput
                          title={"Location"}
                          placeholder={"Enter Location"}
                          change={(e) => {
                            formik.setFieldValue("location", e);
                            setPresentage(.5)
                          }}
                          value={formik.values.location}
                          required={true}
                          error={formik.errors.location}
                        />

                        <Dropdown
                          title={"Requirement"}
                          placeholder={"Choose Requirement"}
                          options={Requirment}
                          value={formik.values.requirementType}
                          change={(e) => {
                            formik.setFieldValue("requirementType", e);
                            console.log(e);
                            setPresentage(.6)
                          }}
                          required={true}
                          error={formik.errors.requirementType}
                        />
                      </div>
                    </Accordion>

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
                      <div className="grid grid-cols-3 gap-4">
                        <Dropdown
                          title={"Job Type"}
                          placeholder={"Choose Job Type"}
                          options={JobType}
                          change={(e) => {
                            formik.setFieldValue("jobType", e);
                            console.log(e);
                            setPresentage(.7)
                          }}
                          required={true}
                          value={formik.values.jobType}
                          error={formik.errors.jobType}
                        />
                        <Dropdown
                          title={"Experience"}
                          placeholder={"Choose Experience"}
                          options={experiencelevel}
                          value={formik.values.experience}
                          change={(e) => {
                            formik.setFieldValue("experience", e);
                            setPresentage(.8)
                          }}
                          required={true}
                          error={formik.errors.experience}
                        />
                        <Dropdown
                          title={"Education"}
                          placeholder={"Choose Education"}
                          options={eductaion}
                          value={formik.values.education}
                          change={(e) => {
                            formik.setFieldValue("education", e);
                            setPresentage(.9)
                          }}
                          required={true}
                          error={formik.errors.education}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <FormInput
                          title={"Keywords"}
                          placeholder={"Enter Keywords"}
                          change={(e) => {
                            formik.setFieldValue("searchKeywords", e);
                          }}
                          value={formik.values.searchKeywords}
                          required={true}
                          error={formik.errors.searchKeywords}

                        />
                        {/* <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} />
                                                     <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} /> */}
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        {/* <FormInput
  title={'Salary Range From'}
  placeholder={'Enter value'}
  change={(e) => {
    formik.setFieldValue('salaryRangeFrom', e);
    // Validate Salary Range To when Salary Range From changes
    console.log(e)
   
  }}
  value={formik.values.salaryRangeFrom}
  type={"number"}
  error={formik.errors.salaryRangeFrom}
  required={true}
/>

<FormInput
  title={'Salary Range To'}
  placeholder={'Enter value'}
  change={(e) => {
    formik.setFieldError('salaryRangeTo', e);
    // Validate Salary Range To
    const salaryRangeTo = parseInt(e); // Convert input to a number
    const salaryRangeFrom = parseInt(formik.values.salaryRangeFrom); // Convert Salary Range From to a number

    if (salaryRangeTo <= salaryRangeFrom) {
      formik.setFieldError('salaryRangeTo', 'Salary Range To cannot be less than or equal to Salary Range From');
     
    } else {
      // Clear the error message when the condition is met
      formik.setFieldError('salaryRangeTo', '');
      formik.setFieldValue('salaryRangeTo', e);
     
    }
  }}
  value={formik.values.salaryRangeTo}
  error={formik.errors.salaryRangeTo}
  required={true}
  type={"number"}
/>  */}

<FormInput
  title={'Salary Range From'}
  placeholder={'Enter Salary Range From'}
  description={'Minimum Annual Salary'}
  change={(e) => {
    const value = parseFloat(e);
    const salaryRangeTo = parseFloat(formik.values.salaryRangeTo); 
    const salaryRangeFrom = parseFloat(e);
    if (value <= 0) {
      formik.setFieldError('salaryRangeFrom', 'Salary Range From must be a positive number');
    } else {
      formik.setFieldValue('salaryRangeFrom', value);
      // Clear the error message only if the input is non-empty or greater than 0
      if (value > 0 ) {
        formik.setFieldError('salaryRangeFrom', '');
      }
      if(salaryRangeTo<=salaryRangeFrom){
        // formik1.setFieldError('salaryRangeFrom', 'Salary Range From should be less than Salary Range To ');
        setsalaryRangeFromError('Salary Range From should be less than Salary Range To ')
        formik.setFieldValue('salaryRangeFrom', value);
        console.log("ttt")
      }else{
        setsalaryRangeFromError("")
      }
     
    }
  }}
  value={isNaN(formik.values.salaryRangeFrom)? "" : formik.values.salaryRangeFrom}
  type={"text"}
  pattern="[0-9]*"
  inputmode="numeric"
  error={formik.errors.salaryRangeFrom||salaryRangeFromError}
  required={true}
  maxLength={15}
/>

<FormInput
  title={'Salary Range To'}
  placeholder={'Enter value'}
  description={'Maximum Annual Salary'}
  change={(e) => {
    // Validate Salary Range To
    const salaryRangeTo = parseFloat(e); // Convert input to a number
    const salaryRangeFrom = parseFloat(formik.values.salaryRangeFrom); // Convert Salary Range From to a number

    if (salaryRangeTo <= salaryRangeFrom) {
      setsalaryRangeToError("Salary Range To should be greater than the Salary Range from");
      formik.setFieldValue('salaryRangeTo', e);
    } else if (salaryRangeTo <= 0) {
      setsalaryRangeToError("Salary Range To must be a positive number");
      console.log("gg")
    } else {
      // Clear the error message when the conditions are met
      setsalaryRangeToError("");
      formik.setFieldValue('salaryRangeTo', e);
    }
  }}
  value={isNaN(formik.values.salaryRangeTo)? "" : formik.values.salaryRangeTo}
  error={formik.errors.salaryRangeTo || salaryRangeToError}
  required={true}
  type={"text"}
  pattern="[0-9]*"
  inputmode="numeric"/>
                        <Dropdown
                          title={"Salary Currency"}
                          placeholder={"Enter Salary Currency"}
                          options={saleryCurrency}
                          value={formik.values.salaryCurrency}
                          change={(e) => {
                            formik.setFieldValue("salaryCurrency", e);
                          }}
                          required={true}
                          error={formik.errors.salaryCurrency}
                        />
                        <div className="flex items-center gap-1">
                          <CheckBoxInput
                            change={(e) => {
                              formik.setFieldValue("isSalaryPublic", e);
                              console.log(e);
                            }}
                            value={formik.values.isSalaryPublic}
                            title={"View Public"}
                            titleRight={true}

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
                      className="Text_area"
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        //    setPresentage(1.4);
                      }}
                      initialExpanded={true}
                    >
                      <div class="flex flex-col gap-4 overflow-hidden">
                        <div className="border rounded-md bg-primaryalpha/5">
                          <div className="flex items-center px-1.5  ">
                            <img src={AI_Text} alt='' className="border rounded-md"></img>
                            <div className="flex flex-col gap-1 p-1.5">
                              <div className="flex items-center justify-between ">
                                <p className="font-bold">Generate personalized job descriptions based on pas account data.
                                </p>
                                {/* <p className="text-primary"><IoClose /></p> */}
                              </div>
                              <p className="text-gray-400">When you generate with Al, we look for similar jobs you've created in the past and use the data to create content that's
                                impactful, accurate and personalized to your company.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "16px",
                          }}
                        >
                          <Dropdown
                            title={''}
                            placeholder={'Choose Job Description'}
                            options={JobDescriptionList}
                            value={decriptionId}
                            className={'min-w-40'}
                            change={(e) => {
                              setDecriptionId(e)
                              SetTrigger(e)
                            }}
                          />
                          <ButtonClick handleSubmit={handleGenerateWithAI} BtnType="primary" icon={<img src={image} alt="image" style={{ height: '20px', width: '20px', alignItems: "center" }} />} buttonName={"Generate with AI"} />
                        </div>
                        <div className="flex gap-1.5">
                          <p className="pb-2">Description</p>
                          <FaAsterisk className="text-[6px] text-rose-600" />
                        </div>
                        <TextEditor
                          placeholder={t(
                            "Enter Description "
                          )}

                          hideBorder={true}
                          initialValue={content}
                          //  change={(e)=>{
                          //    formik.setFieldValue('jobDescription',e)
                          //  }}
                          onChange={handleEditorChange}
                          error={formik.errors.jobDescription}
                          // changetoHtml={(e)=>{
                          //   setstateHTML(e)
                          // }}
                          trigger={trigger}
                          loader={loader}
                        />
                        {/* <TextEditorcopy
                          Change={(e)=>{
                            handleEditorChange(e)
                            console.log(typeof e)
                          }}
                          initialValue={content}
                          error={formik.errors.jobDescription}
                          
                        /> */}
                        {/* <Editor1/> */}

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
                    <div className="rounded-md borderb">
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
                        <div className="flex items-center justify-between">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Name
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons.filter(
                              (option) => option.label === t("Mandatory")
                            )}
                            title={""}
                            change={(e) => {
                              // formik.setFieldValue("name", e);
                              // setBtnName(e)
                            }}
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
                            change={(e) => {
                              // formik.setFieldValue("Email", e);
                              // setEmail(e)
                            }}
                            defaultValue={1}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                        <div className="v-divider" />
                        <div className="flex items-center justify-between w-full">
                          <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">
                            Headline
                          </div>

                          <Radiobuttonnew
                            options={Radiobuttons}
                            title={""}
                            change={(e) => {
                              formik.setFieldValue("headline", e);
                              setHeadline(e)
                            }}
                            defaultValue={Headline}
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
                              setPhone(e)
                            }}
                            defaultValue={Phone}
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
                              setAddress(e)
                            }}
                            defaultValue={Address}
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
                              setCountry(e)
                            }}
                            defaultValue={country}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                      </Accordion>
                    </div>
                    <div className="rounded-md borderb">

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
                              seteducation(e);
                              setPresentage(1.1)
                            }}
                            defaultValue={Education}
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
                              setExperience(e)
                              setPresentage(1.2)
                            }}
                            defaultValue={Experience}
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
                              setSummary(e)
                              setPresentage(1.3)
                            }}
                            defaultValue={summary}
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
                              setResume(e)
                              setPresentage(1.4)
                            }}
                            defaultValue={resume}
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
                              setCoverletter(e)
                              setPresentage(1.5)
                            }}
                            defaultValue={coverLetter}
                          >
                            <Radio.Button value={1}>Mandatory</Radio.Button>
                            <Radio.Button value={2}>Optional</Radio.Button>
                            <Radio.Button value={0}>Off</Radio.Button>
                          </Radiobuttonnew>
                        </div>
                      </Accordion>
                    </div>

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
                            {/* {conditions.map((condition, index) => (
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
    ))} */}

                            <>
                              <div className="flex items-center justify-between">
                                <FormInput
                                  title={`Question ${index + 1}`}
                                  placeholder={`Enter Question ${index + 1}`}
                                  value={condition.question}
                                  change={(e) => {
                                    setPresentage(1.6)
                                    setEvaluation((prevEvaluation) =>
                                      prevEvaluation.map((prevCondition, i) =>
                                        i === index
                                          ? { ...prevCondition, question: e }
                                          : prevCondition
                                      )
                                    );
                                    console.log(e);
                                  }}
                                  error={condition.question ? '' : Questionerror || ''}
                                />
                                <div className="flex items-center gap-5 mt-4">
                                  <div className="flex-shrink-0">
                                    <Dropdown
                                      options={Form}
                                      dropdownWidth="200px"
                                      change={(e) => {
                                        setPresentage(1.7)
                                        setEvaluation((prevEvaluation) =>
                                          prevEvaluation.map((prevCondition, i) =>
                                            i === index
                                              ? {
                                                ...prevCondition,
                                                answer_type: e,
                                                answerMetaData: [
                                                  {
                                                    id: 1,
                                                    key: e,
                                                    value: "",
                                                  },
                                                ],
                                              }
                                              : prevCondition
                                          )
                                        );
                                        handleAddField(e)
                                      }}
                                      value={condition.answerMetaData[0]?.key}
                                      icondropDown={true}
                                      error={condition.answerMetaData[0]?.key ? '' : answerError || ''}
                                      placeholder={"Choose Options"}
                                    />
                                  </div>
                                  {/* Additional dynamic input fields based on the selected value in the dropdown */}
                                  {/* Add your logic here */}

                                  <div>
                                    <Tooltip placement="topRight" title={"Active / Inactive"} className="flex items-center gap-2">
                                      <p>Mandatory</p>
                                      <ToggleBtn />
                                    </Tooltip>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "15px",
                                    }}
                                  >
                                    {/* <MdOutlineFileCopy
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      cursor: "pointer",
                                    }}
                                  /> */}
                                    <Tooltip placement="top" title={"Delete"}>
                                      <RiDeleteBinLine className="text-gray-400"
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => handleDeleteCondition(index)}
                                      />
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                              {condition.answerMetaData[0]?.key && (
                                <>
                                  {/* Render existing FormInput components */}
                                  {condition.answerMetaData.map(
                                    (field, fieldIndex) => (
                                      <div
                                        key={fieldIndex}
                                        className="flex items-center"
                                      >
                                        {[
                                          "Drop-down",
                                          "Multiple Choice",
                                          "Checkboxes",
                                        ].includes(field.key) && (
                                            <FormInput
                                              title={`Options ${fieldIndex + 1}`}
                                              placeholder={"Enter value"}
                                              value={field.value}
                                              change={(e) => {
                                                setPresentage(1.8)
                                                setEvaluation((prevEvaluation) =>
                                                  prevEvaluation.map(
                                                    (prevCondition, i) =>
                                                      i === index
                                                        ? {
                                                          ...prevCondition,
                                                          answerMetaData:
                                                            prevCondition.answerMetaData.map(
                                                              (f, j) =>
                                                                j === fieldIndex
                                                                  ? {
                                                                    ...f,
                                                                    value:
                                                                      String(e),
                                                                  }
                                                                  : f
                                                            ),
                                                        }
                                                        : prevCondition
                                                  )
                                                )
                                              }}
                                              error={field.value ? '' : OptionError || ''}
                                            />
                                          )}

                                        {[
                                          "Drop-down",
                                          "Multiple Choice",
                                          "Checkboxes",
                                        ].includes(field.key) && (
                                            <Tooltip placement="top" title={"Delete"}>
                                              <div className="ml-2">
                                                <MdDelete
                                                  onClick={() =>
                                                    handleDeleteField(
                                                      index,
                                                      fieldIndex
                                                    )
                                                  }
                                                  className="cursor-pointer text-red-500"
                                                />
                                              </div>
                                            </Tooltip>
                                          )}
                                      </div>
                                    )
                                  )}


                                  {[
                                    "Drop-down",
                                    "Multiple Choice",
                                    "Checkboxes",
                                  ].includes(
                                    condition.answerMetaData[0]?.key
                                  ) && (
                                      <Tooltip placement="top" title={"Add new"}>
                                        <CgAdd
                                          onClick={() =>
                                            handleAddField(
                                              index,
                                              condition.answerMetaData[0]?.key
                                            )
                                          }
                                          style={{
                                            width: "18px",
                                            height: "18px",
                                            cursor: "pointer",
                                          }}
                                        />
                                      </Tooltip>
                                    )}

                                </>
                              )}
                            </>

                            <div className="flex items-center gap-2"></div>

                            <div className="v-divider"></div>
                          </>
                        ))}
                        <AddMore
                          name="Add Custom Field "
                          className="!text-black"
                          change={(e) => {
                            handleAddCondition();
                          }}
                        />
                      </div>
                    </Accordion>

                  </FlexCol>
                </>
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
                    <Radio.Group
                      onChange={(e) => {
                        setSelectedWorkFlowId(e.target.value);
                        setPresentage(2);
                      }}
                      value={selectedWorkFlowId}
                    >
                      {Stages.map((each) => (
                        <div key={each.workFlowId} className={`  relative p-2.5  mt-6 border rounded-md ${selectedWorkFlowId === each.workFlowId ? 'bg-[#F2F0FD]  border-[#690CE7]' : ''}`}  >
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
                            >
                            </Radio>
                          </div>
                        </div>
                      ))}
                    </Radio.Group>
                  </Accordion>
                </FlexCol>
              ) : null}
              {contextHolder}
            </div>

          </FlexCol>
        </div>
      </DrawerPop>

    </div>
  );
};

export default CreatejobTemp;