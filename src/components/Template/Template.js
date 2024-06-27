import React, { useState, useEffect } from 'react'
import TableAnt from '../common/TableAnt'
import Breadcrumbs from '../common/BreadCrumbs';
import { useTranslation } from 'react-i18next';
import API, { action, getJobStatics } from "../Api1";
import ButtonClick from '../common/Button';
import { getAllRecruitmentJobDescriptionTemplates, getAllRecruitmentJobTemplates, getAllRecruitmentWorkFlows, getAllRecruitmentEmailTemplates, getAllRecruitmentQuestionnaireTemplates, getAllRecruitmentEvaluationTemplates, getAllRecruitmentLetterTemplates, } from '../Api1';
// import AddTemplate from './Addtemplate';
import Tabs from '../common/Tabs';
import Departments from '../Company/Add _departments';
import Location from '../Company/Addlocation';
import Createjob from '../Jobs/Createjob';
import TemplateDec from './templateDec';
import { Subject } from '@mui/icons-material';
import Emailtemplate from './AddEmailtemplate';
import TemEvaluation from './TemEvaluation';
import { Button } from 'antd';
import QuestionAire from './Addquestinaire';
import AddLetter from './AddLetter';
import Workflowstage from './Workflowstage';
import CreatejobTemp from './createJobtemp';
import { FaBullseye } from 'react-icons/fa';
import { evaluation } from '../data';

const Template = ({
  open = "",
  close = () => { },
  refresh,
  createPolicyAction,

  openPolicy,
}) => {
  const { t } = useTranslation();

  const [showPop, setShowPop] = useState(false);
  const handleClose = () => setOpenPop(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(open);
  const [openPop, setOpenPop] = useState("");
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  const [emailSubject, setEmailSubject] = useState("")
  const [navigationPath, setNavigationPath] = useState("Job_Template");
  const [sortedInfo, setSortedInfo] = useState({});
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);
  const breadcrumbItems = [
    //{ label: t("Templates"), url: "/" },
    // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },

    { label: t("Settings"), url: "" },
    { label: t("Other"), url: "" },
    { label: t("Templates"), url: "" },
    { label: navigationPath.replace(/_/g, ' '), url: "" },
  ];
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);

    setSortedInfo(sorter || {});
  };
  const tabs = [
    {
      id: 1,
      title: t("Job_Templates"),
      value: "Job_Template",
      tabheading: "Job Template List"
    },
    {
      id: 2,
      title: t("Job_Description"),
      value: "Job_Description_Template",
      tabheading: "Job Description Template List"
    },
    {
      id: 3,
      title: t("Workflow"),
      value: "Workflow_Template",
      tabheading: "Work Flow Template List"
    },
    {
      id: 4,
      title: t("Email"),
      value: "Email_Template",
      tabheading: "Email Templates"
    },
    {
      id: 5,
      title: t("Evaluation"),
      value: "Evaluation_Template",
      tabheading: "Evaluation Templates"
    },
    {
      id: 6,
      title: t("Questionnaire"),
      value: "Questionnaire_Template",
      tabheading: "Questionnaire Templates"
    },
    {
      id: 7,
      title: t("Letter"),
      value: "Letter_Template",
      tabheading: "Letter Templates"
    }

  ]
  //update
  const updateApi = [
    {
      Job_Template: { id: 1, api: API.UPDATE_Job_Templates },
      Job_Description_Template: { id: 2, api: API.UPDATE_Job_Description },
      Workflow_Template: { id: 3, api: API.UPDATE_Workflow },
      Email_Template: { id: 4, api: API.UPDATE_Email },
      Evaluation_Template: { id: 5, api: API.UPDATE_EvaluationS },
      Questionnaire_Template: { id: 5, api: API.UPDATE_Questionaire },
      Letter_Template: { id: 5, api: API.UPDATE_Letter },
    },
  ];
  const deleteApi = [
    {
      Job_Template: { id: 1, api: API.DELETE_Job_Templates },
      Job_Description_Template: { id: 2, api: API.DELETE_Job_Description },
      Workflow_Template: { id: 3, api: API.DELETE_Workflow },
      Email_Template: { id: 4, api: API.DELETE_Email },
      Evaluation_Template: { id: 5, api: API.DELETE_Evaluation },
      Questionnaire_Template: { id: 5, api: API.DELETE_Questionaire },
      Letter_Template: { id: 5, api: API.DELETE_Letter },

    },
  ];
  const Header = [
    {
      Job_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "jobTitle",
          bold: true,
          key: "jobTitle",
          sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
          sortOrder: sortedInfo?.columnKey === 'jobTitle' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Description"),
          value: "jobDescription",
          width:"600px",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Actions"),
          value: "action",
          action: true,
        },
        {
          id: 5,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Job_Description_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "descriptionTemplateName",
          bold: true,
          key: "descriptionTemplateName",
          sorter: (a, b) => a.descriptionTemplateName.localeCompare(b.descriptionTemplateName),
          sortOrder: sortedInfo?.columnKey === 'descriptionTemplateName' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Description"),
          value: "descriptionTemplate",
          width:"600px",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Actions"),
          value: "action",
          action: true,
        },
        {
          id: 5,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Workflow_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "workFlowName",
          bold: true,
          key: "workFlowName",
          sorter: (a, b) => a.workFlowName.localeCompare(b.workFlowName),
          sortOrder: sortedInfo?.columnKey === 'workFlowName' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
          width:"600px",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Actions"),
          value: "action",
          action: true,
        },
        {
          id: 5,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Email_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "title",
          bold: true,
          key: "title",
          sorter: (a, b) => a.title.localeCompare(b.title),
          sortOrder: sortedInfo?.columnKey === 'title' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Subject"),
          value: "value",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Actions"),
          value: "action",
          action: true,
        },
        {
          id: 5,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Evaluation_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "evaluationTemplateName",
          bold: true,
          key: "evaluationTemplateName",
          sorter: (a, b) => a.evaluationTemplateName.localeCompare(b.evaluationTemplateName),
          sortOrder: sortedInfo?.columnKey === 'evaluationTemplateName' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
          width:"600px",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Actions"),
          value: "Action",
          action: true,
        },
        {
          id: 5,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Questionnaire_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "questionnaireTemplateName",
          bold: true,
          key: "questionnaireTemplateName",
          sorter: (a, b) => a.questionnaireTemplateName.localeCompare(b.questionnaireTemplateName),
          sortOrder: sortedInfo?.columnKey === 'questionnaireTemplateName' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
          width:"600px",
        },
        {
          id: 3,
          title: t("Status"),
          value: "Status",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Actions"),
          value: "actions",
          action: true,
        },
        {
          id: 5,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Letter_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "title",
          bold: true,
          key: "title",
          sorter: (a, b) => a.title.localeCompare(b.title),
          sortOrder: sortedInfo?.columnKey === 'title' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: "Subject",
          value: "value",
          width:"600px",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Actions"),
          value: "actions",
          action: true,
        },
        {
          id: 5,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ]
    }
  ]

  const DraweHeader = [
    {
      Job_Template: [
        {
          id: 1,
          title: "Template Name",
          value: "jobTitle",
        },
        
        {
          id: 2,
          title: "Experience",
          value: "experience",
        },

        
        
        {
          id: 3,
          title: "JobType",
          value: "jobType",
        },
        {
          id: 4,
          title: "Requirement Type",
          value: "requirementType",
        },
      ],
      Job_Description_Template: [
        {
          id: 1,
          title: "Template Name",
          value: "descriptionTemplateName",
        },
        {
          id: 2,
          title: t("Description"),
          value: "descriptionTemplate",
        },
        {
          id: 3,
          title: "Status",
          value: "isActive",
        },
      ],
      Workflow_Template: [
        {
          id: 1,
          title: "Template Name",
          value: "workFlowName",
        },
        {
          id: 2,
          title: "Description",
          value: "description",
        },
        {
          id: 3,
          title: "Status",
          value: "isActive",
        },
        // {
        //   id: 4,
        //   title: "Stages",
        //   value: "recruitmentWorkFlowStages",
        //   render: (stages) => (
        //     <div className='flex flex-col gap-2'>
        //       {stages.map((stage, index) => (
        //         <div key={index}>
        //           {index + 1}. {stage.stageName}
        //         </div>
        //       ))}
        //     </div>
        //   ), // Display stages as a concatenated string
        // },
        // {
        //   id: 4,
        //   title: "Status",
        //   value: "Status",
        //   action: true,
        // },
      ],
      Email_Template: [
        {
          id: 1,
          title: "Template Name",
          value: "title",
        },
        {
          id: 2,
          title: "Description",
          value: "value",
        },
        {
          id: 3,
          title: "Status",
          value: "isActive",
        },
        // {
        //   id: 4,
        //   title: "Status",
        //   value: "Status",
        //   action: true,
        // },
      ],
      Evaluation_Template: [
        {
          id: 1,
          title: "Template Name",
          value: "evaluationTemplateName",
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
        },
        {
          id: 3,
          title: "Status",
          value: "isActive",
        },
      ],
      Questionnaire_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "questionnaireTemplateName",
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
        },
        {
          id: 3,
          title: t("Status"),
          value: "isActive",
        },
        // {
        //   id: 4,
        //   title: "",
        //   value: "actions",
        //   action: true,
        // },
      ],
      Letter_Template: [
        {
          id: 1,
          title: t("Template Name"),
          value: "title",
        },
        {
          id: 2,
          title: t("Subject"),
          value: "value",
        },
        {
          id: 3,
          title: t("Status"),
          value: "isActive",
        },
        // {
        //   id: 4,
        //   title: "",
        //   value: "actions",
        //   action: true,
        // },
      ]



    }

  ]

  const [JobList, steJobList] = useState([])
  const [JobDescriptionList, setJobDescriptionList] = useState([])
  const [WorkflowList, setWorkflow] = useState([])
  const [EmailList, setEmail] = useState([])
  const [EvaluationLIst, setEvaluation] = useState([])
  const [QuestionaireLIst, setQuestionaire] = useState([])
  const [LetterLIst, setLetter] = useState([])
  const [updateId, setUpdateId] = useState(null)
  const [update, setUpdate] = useState(false)


  //    const handleOpenModal = () => {
  //     // Set the state to trigger the rendering of AddLeaveType
  //     setOpenPop("Members");
  //     setShow(true);
  //     handleShow();
  //     // You might want to set updateId and companyId here if needed
  //   };
  //  console.log("header",Header)

  const [TemplateList, setTemplateList] = useState([])
  console.log(TemplateList, 'this is template');
  const stripHtmlTags = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }

  const gettemaplate = async () => {
    try {

      const response = await getAllRecruitmentJobTemplates({ companyId: companyId });

      setTemplateList(response.result.map((job) => ({
          jobTemplateId:job.jobTemplateId,
          jobTitle:job.jobTitle,
          jobDescription: stripHtmlTags(job.jobDescription),
          isActive: job.isActive,
          actionToggle:true,
          action:true,
          
          experience:job.experience,
          
          jobType:job.jobType,
          requirementType:job.requirementType




        })))
      // setTemplateList(response.result)
        console.log(response.result.map((job) => ({
           
          jobDescription: stripHtmlTags(job.jobDescription),
         
        })))
      // const newData = {};
      // response.result.forEach((job) => {
      //   newData[job.jobId] = job; // Assuming jobId is the unique identifier
      // });

      // setTableData(response.data);
      // console.log(response.data); // Access response data
      // console.log(response, "job template data");
    } catch (error) {
      console.error(error); // Handle errors
    }
  };
  //  {console.log(updateId)}

  // useEffect(()=>{
  //   gettemaplate();
  // })

  const getWorkflows = async () => {
    try {

      const response = await getAllRecruitmentWorkFlows({ companyId: companyId });
      // console.log(response," work flow list is here")
      // setWorkflow(response.result);
         setWorkflow(response.result.map((workflow)=>({
          workFlowId:workflow.workFlowId,   
          workFlowName:workflow.workFlowName,
          description:workflow.description,
          // recruitmentWorkFlowStages:workflow.recruitmentWorkFlowStages.map((stages)=>({
          //   stageName:stages.stageName,
          //   // stageRules:stages.stageRules

          // }))
          recruitmentWorkFlowStages: workflow.recruitmentWorkFlowStages.map((stage) => stage.stageName)
   

         })))
       


      // const newData = {};
      // response.result.forEach((job) => {
      //   newData[job.jobId] = job; // Assuming jobId is the unique identifier
      // });

      // setTableData(response.data);
      // console.log(response.data); // Access response data
      // console.log(response);
    } catch (error) {
      console.error(error); // Handle errors
    }
  };
  // {console.log(updateId)}

  //  useEffect(()=>{
  //   getWorkflows();
  //  })

  //  useEffect(()=>{
  //   gettemaplate();
  // })






  const getEmailLsit = async () => {
    try {

      const response = await getAllRecruitmentEmailTemplates({ companyId: companyId });

      // console.log(response,"Email list is here")
      setEmail(response.result)
      setEmailSubject(response.result.map((email) => ({
        emailTemplateId: email.emailTemplateId,
        title: email.emailTemplateName,
        value: email.emailTemplate.subject, // Use the subject as the description value
        isActive: email.isActive,
        actionToggle: true,
        action: true,
      }))
      );

      console.log(response.result.map((email) => ({
        emailTemplateId: email.emailTemplateId,
        title: email.emailTemplateName,
        value: email.emailTemplate.subject, // Use the subject as the description value
        isActive: email.isActive,
        actionToggle: true,
        action: true,
      })))
      // const newData = {};
      // response.result.forEach((job) => {
      //   newData[job.jobId] = job; // Assuming jobId is the unique identifier
      // });

      // setTableData(response.data);
      // console.log(response.data); // Access response data
      // console.log(emailSubject)
      // console.log(response);
      // console.log(EmailList);
    } catch (error) {
      console.error(error); // Handle errors
    }
  };
  const getallquestionaire = async () => {
    try {
      const data = await getAllRecruitmentQuestionnaireTemplates({ companyId: companyId })
      setQuestionaire(data.result)
      // console.log(data)
    } catch (error) {
      console.error(error); // Handle errors
    }

  }
  const getallevaluation = async () => {
    try {
      const data = await getAllRecruitmentEvaluationTemplates({ companyId: companyId })
      setEvaluation(data.result)
      // console.log(data,"Evaluation list is here")
    } catch (error) {
      console.error(error); // Handle errors
    }

  }
  const getallLetter = async () => {
    try {
      const data = await getAllRecruitmentLetterTemplates({ companyId: companyId })
      setLetter(data.result.map((Letter) => ({
        letterTemplateId: Letter.letterTemplateId,
        title: Letter.letterTemplateName,
        value: Letter.letterTemplate.subject, // Use the subject as the description value
        isActive: Letter.isActive,
        actionToggle: true,
        action: true,
      })))
      // console.log(data)
    } catch (error) {
      console.error(error); // Handle errors
    }

  }
  const getAllJobdescription = async () => {
    try {
      const data = await getAllRecruitmentJobDescriptionTemplates({ companyId: companyId })
      //  console.log(data)
      // 
      setJobDescriptionList(data.result.map((template)=>({
        descriptionTemplateName:template.descriptionTemplateName,
        descriptionTemplate:stripHtmlTags(template.descriptionTemplate),
        descriptionTemplateId:template.descriptionTemplateId,
        isActive:template.isActive,
        actionToggle:true,
        action:true

      })))
    } catch (error) {
      // console.log(error)
    }
  }


  //  useEffect(()=>{
  //   getEmailLsit();
  //   console.log(EmailList);
  //  })



  React.useEffect(() => {
    // Provide a default value if needed


    let newData = [];

    switch (navigationPath) {
      case "Job_Template":
        // getLocationList();
        gettemaplate();

        break;
      case "Job_Description_Template":
        // getDepartmentList();
        getAllJobdescription()
        // console.log(newData)
        break;
      // Add more cases as needed
      case "Workflow_Template":
        getWorkflows();

        // console.log(newData)
        break;
      case "Email_Template":
        getEmailLsit();

        // console.log(newData)
        break;
      case "Evaluation_Template":
        getallevaluation();

        // console.log(newData)
        break;
      case "Questionnaire_Template":
        // getDepartmentList();
        getallquestionaire();

        // console.log(newData)
        break;
      case "Letter_Template":
        getallLetter()

        // console.log(newData)
        break;
      default:
        break;
    }

    // console.log(companySliceId, navigationPath, "refresh");

    // Update the state variable or Redux store with the new data


  }, [navigationPath]);

  const actionData = [
    {

      Job_Template: { id: 1, data: TemplateList },
      Job_Description_Template: { id: 2, data: JobDescriptionList },
      Workflow_Template: { id: 3, data: WorkflowList },
      Email_Template: { id: 4, data: emailSubject },
      Evaluation_Template: { id: 5, data: EvaluationLIst },
      Questionnaire_Template: { id: 6, data: QuestionaireLIst },
      Letter_Template: { id: 7, data: LetterLIst }

    },
  ];
  const actionId = [
    {
      Job_Template: { id: "jobTemplateId" },
      Job_Description_Template: { id: "descriptionTemplateId" },
      Workflow_Template: { id: "workFlowId" },
      Email_Template: { id: "emailTemplateId" },
      Evaluation_Template: { id: "evaluationTemplateId" },
      Questionnaire_Template: { id: "questionnaireTemplateId" },
      Letter_Template: { id: "letterTemplateId" }
    }


  ]
  // const handleCreateJobClose = () => {
  //   // Perform navigation logic here
  //   // Example: navigate to the "Jobdetails" accordion
  //   setNavigationPath("JobDetails");
  //   // You can also set other necessary state or perform additional actions
  // };
  // const deleteAp = [
  //   {
  //     Job_Templates: { id: 1, api: API.DELETE_Job_Templates },
  //     Job_Description: { id: 2, api: API.DELETE_Job_Description },
  //     Workflow: { id: 3, api: API.DELETE_Workflow },
  //     Email: { id: 4, api: API.DELETE_Email },
  //     Evaluation: { id: 5, api: API.DELETE_Evaluation },
  //     Questionnaire: { id: 6, api: API.DELETE_Questionaire },
  //     Letter: { id: 7, api: API.DELETE_Letter }
  //   },
  // ];

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex flex-col justify-between gap-6 lg:items-center lg:flex-row">
        <div className='flex flex-col'>
          <p className='font-bold text-lg'> {("Templates")}</p>
          <p className='para font-medium'>{t("Main_Description")}</p>
        </div>
        {/* <div className="flex flex-col gap-6 sm:flex-row">
              
          </div> */}
        <div className="flex flex-col gap-6 sm:flex-row">
          <ButtonClick
            handleSubmit={
              () => {
                // console.log("show");
                handleShow();
                // if (e === navigationPath) {
                // setShow(true);

                // setCompanyId(company);
                setOpenPop(navigationPath);
                // setUpdateId(false);
                // } else {
                // setOpenPop(navigationPath);

                setShow(true);
                // console.log(company, "companyparentId");
                // if (company === "edit") {
                // setUpdateId(e);
                // }
              }
              // buttonClick(btnName, companyData.companyId);
            }
            // updateFun=""
            // updateBtn={true} // Set to true if it's an update button
            buttonName={`Create ${navigationPath.replace(/_/g, ' ')}`}// Set the button name
            className="your-custom-styles" // Add any additional class names for styling
            BtnType="Add" // Specify the button type (Add or Update)
          />
        </div>
      </div>

      <div>
        <Tabs
          header={Header}
          drawerH={DraweHeader}
          // path="employee"
          handlesort={(e) => handleChange(e)}
          tabs={tabs}
          All={true}
          clickDrawer={(e) => {
            handleShow();
            // console.log(e);
            // setShow(e);
          }}
          tabClick={(e) => {
            // console.log(e, "e");
            setNavigationPath(e);
          }}
          data={
            Object.keys(actionData[0]).includes(navigationPath)
              ? actionData[0]?.[navigationPath].data
              : null
          }
          actionID={
            Object.keys(actionId[0]).includes(navigationPath)
              ? actionId[0]?.[navigationPath].id
              : null
          }
          updateApi={
            Object.keys(updateApi[0]).includes(navigationPath)
              ? updateApi[0]?.[navigationPath].api
              : null
          }
          deleteApi={
            Object.keys(deleteApi[0]).includes(navigationPath)
              ? deleteApi[0]?.[navigationPath].api
              : null
          }
          buttonClick={(e) => {
            // console.log(company, "company", e);
            if (e === true) {
              // setShow(e);
            } else if (e === navigationPath) {
              // setShow(true);

              // setCompanyId(company);
              // console.log("HIIIIII")
              setOpenPop(e);

            } else {
              setUpdateId(e);
              setOpenPop(navigationPath);
              setUpdate(true)
              setShow(true);
              // console.log(company, "companyparentId");
              // if (company === "edit") {

              // }
            }
          }}

          refresh={() => {
            switch (navigationPath) {
              default:
                gettemaplate();
                break;
              case "Job_Description_Template":
                getAllJobdescription();
                break;
              case "Workflow_Template":
                getWorkflows();
                break;
              case "Email_Template":
                getEmailLsit();
                break;
              case "Evaluation_Template":
                getallevaluation();
                break;
              case "Questionnaire_Template":
                getallquestionaire();
                break;
              case "Letter_Template":
                getallLetter();
                break;
            }
          }}
        />
      </div>
      {show && (
        <CreatejobTemp
          open={show}
          close={(e) => {
            setUpdateId(null)
            setShow(e);

          }}
          updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {
            gettemaplate();
          }}
          inputshow={false}
          isUpdate={update}


        />
      )}

      {navigationPath === "Job_Description_Template" && show && (
        <TemplateDec
          open={show}
          close={(e) => {
            setUpdateId(null)
            setShow(e);
          }}
          updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {

            getAllJobdescription()
          }}
        // jobDescription={true}
        />
      )}
      {navigationPath === "Workflow_Template" && show && (
        <Workflowstage
          open={show}
          close={(e) => {
            setUpdateId(null)
            setShow(e);
          }}
          updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {
            getWorkflows();
          }}
        />
      )}
      {navigationPath === "Email_Template" && show && (
        <Emailtemplate
          open={show}
          close={(e) => {
            setUpdateId(null)
            setShow(e);
          }}
          updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {
            getEmailLsit();
          }}
        />
      )}
      {navigationPath === "Evaluation_Template" && show && (
        <TemEvaluation
          open={show}
          close={(e) => {
            setUpdateId(null)
            setShow(e);
          }}
          updateId={updateId}
          //   companyDataId={companyId}
          isUpdate={update}
          refresh={() => {
            getallevaluation();
          }}
        />
      )}
      {navigationPath === "Questionnaire_Template" && show && (
        <QuestionAire
          open={show}
          close={(e) => {
            setShow(e);
            setUpdateId(null)

          }}
          questionaireList={QuestionaireLIst}
          updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {
            getallquestionaire()
          }}
        />
      )}
      {navigationPath === "Letter_Template" && show && (
        <AddLetter
          open={show}
          close={(e) => {
            setUpdateId(null)
            setShow(e);
          }}
          letterList={LetterLIst}
          updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {
            getallLetter()
          }}
        />
      )}

    </div>

  )
}


export default Template