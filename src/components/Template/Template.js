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
  const [navigationPath, setNavigationPath] = useState("Job");
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
  const tabs = [
    {
      id: 1,
      title: t("Job_Templates"),
      value: "Job",
      tabheading: "Job Template List"
    },
    {
      id: 2,
      title: t("Job_Description"),
      value: "Job_Description",
      tabheading: "Job Description Template List"
    },
    {
      id: 3,
      title: t("Workflow"),
      value: "Workflow",
      tabheading: "Work Flow Template List"
    },
    {
      id: 4,
      title: t("Email"),
      value: "Email",
      tabheading: "Email Templates"
    },
    {
      id: 5,
      title: t("Evaluation"),
      value: "Evaluation",
      tabheading: "Evaluation Templates"
    },
    {
      id: 6,
      title: t("Questionnaire"),
      value: "Questionnaire",
      tabheading: "Questionnaire Templates"
    },
    {
      id: 7,
      title: t("Letter"),
      value: "Letter",
      tabheading: "Letter Templates"
    }

  ]
  //update
  const updateApi = [
    {
      Job: { id: 1, api: API.UPDATE_Job_Templates },
      Job_Description: { id: 2, api: API.UPDATE_Job_Description },
      Workflow: { id: 3, api: API.UPDATE_Workflow },
      Email: { id: 4, api: API.UPDATE_Email },
      Evaluation: { id: 5, api: API.UPDATE_EvaluationS },
      Questionnaire: { id: 5, api: API.UPDATE_Questionaire },
      Letter: { id: 5, api: API.UPDATE_Letter },
    },
  ];
  const deleteApi = [
    {
      Job: { id: 1, api: API.DELETE_Job_Templates },
      Job_Description: { id: 2, api: API.DELETE_Job_Description },
      Workflow: { id: 3, api: API.DELETE_Workflow },
      Email: { id: 4, api: API.DELETE_Email },
      Evaluation: { id: 5, api: API.DELETE_Evaluation },
      Questionnaire: { id: 5, api: API.DELETE_Questionaire },
      Letter: { id: 5, api: API.DELETE_Letter },

    },
  ];
  const Header = [
    {
      Job: [
        {
          id: 1,
          title: t("Template Name"),
          value: "jobTitle",
          bold: true,
        },
        {
          id: 2,
          title: t("Description"),
          value: "jobDescription",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Action"),
          value: "Action",
          action: true,
        },
      ],
      Job_Description: [
        {
          id: 1,
          title: t("Template Name"),
          value: "descriptionTemplateName",
          bold: true,
        },
        {
          id: 2,
          title: t("Description"),
          value: "descriptionTemplate",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Action"),
          value: "action",
          action: true,
        },
      ],
      Workflow: [
        {
          id: 1,
          title: t("Template Name"),
          value: "workFlowName",
          bold: true,
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
        },
         {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Action"),
          value: "action",
          action: true,
        },
      ],
      Email: [
        {
          id: 1,
          title: t("Template Name"),
          value: "title",
          bold: true,
        },
        {
          id: 2,
          title: t("Description"),
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
          title: t("Action"),
          value: "Action",
          action: true,
        },
      ],
      Evaluation: [
        {
          id: 1,
          title: t("Template Name"),
          value: "evaluationTemplateName",
          bold: true,
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
        },
        {
          id: 3,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Action"),
          value: "Action",
          action: true,
        },
      ],
      Questionnaire: [
        {
          id: 1,
          title: t("Template Name"),
          value: "questionnaireTemplateName",
          bold: true,
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
        },
        {
          id: 3,
          title: t("Status"),
          value: "Status",
          actionToggle: true,
        },
        {
          id: 4,
          title: t("Action"),
          value: "actions",
          action: true,
        },
      ],
      Letter: [
        {
          id: 1,
          title: t("Template Name"),
          value: "title",
          bold: true,
        },
        {
          id: 2,
          title: "Subject",
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
          title: t("Action"),
          value: "actions",
          action: true,
        },
      ]
    }
  ]

  const DraweHeader = [
    {
      Job: [
        {
          id: 1,
          title: "Template Name",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Location",
          value: "location",
        },
        {
          id: 3,
          title: "JobType",
          value: "jobType",

        },
        {
          id: 3,
          title: "Status",
          value: "isActive",
        },
      ],
      Job_Description: [
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
      Workflow: [
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
        //   title: "Status",
        //   value: "Status",
        //   action: true,
        // },
      ],
      Email: [
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
      Evaluation: [
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
      Questionnaire: [
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
      Letter: [
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
  console.log(TemplateList,'this is template');

  const gettemaplate = async () => {
    try {

      const response = await getAllRecruitmentJobTemplates({companyId:companyId});

      setTemplateList(response.result);
      // const newData = {};
      // response.result.forEach((job) => {
      //   newData[job.jobId] = job; // Assuming jobId is the unique identifier
      // });

      // setTableData(response.data);
      // console.log(response.data); // Access response data
      //  console.log(response);
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

      const response = await getAllRecruitmentWorkFlows({companyId:companyId});
      // console.log(response," work flow list is here")
      setWorkflow(response.result);
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

      const response = await getAllRecruitmentEmailTemplates({companyId:companyId});

      // console.log(response," Email list is here")
      setEmail(response.result)
      setEmailSubject(response.result.map((email) => ({
        emailTemplateId: email.emailTemplateId,
        title: email.emailTemplateName,
        value: email.emailTemplate.subject, // Use the subject as the description value
        isActive:email.isActive,
        actionToggle: true,
        action: true,
      }))
      );
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
      const data = await getAllRecruitmentQuestionnaireTemplates({companyId:companyId})
      setQuestionaire(data.result)
      // console.log(data)
    } catch (error) {
      console.error(error); // Handle errors
    }

  }
  const getallevaluation = async () => {
    try {
      const data = await getAllRecruitmentEvaluationTemplates({companyId:companyId})
      setEvaluation(data.result)
      // console.log(data)
    } catch (error) {
      console.error(error); // Handle errors
    }

  }
  const getallLetter = async () => {
    try {
      const data = await getAllRecruitmentLetterTemplates({companyId:companyId})
      setLetter(data.result.map((Letter) => ({
        letterTemplateId: Letter.letterTemplateId,
        title: Letter.letterTemplateName,
        value: Letter.letterTemplate.subject, // Use the subject as the description value
        isActive:Letter.isActive,
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
      const data = await getAllRecruitmentJobDescriptionTemplates({companyId:companyId})
      //  console.log(data)
      // 
      setJobDescriptionList(data.result)
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
      case "Job":
        // getLocationList();
        gettemaplate();

        break;
      case "Job_Description":
        // getDepartmentList();
        getAllJobdescription()
        // console.log(newData)
        break;
      // Add more cases as needed
      case "Workflow":
        getWorkflows();

        // console.log(newData)
        break;
      case "Email":
        getEmailLsit();

        // console.log(newData)
        break;
      case "Evaluation":
        getallevaluation();

        // console.log(newData)
        break;
      case "Questionnaire":
        // getDepartmentList();
        getallquestionaire();

        // console.log(newData)
        break;
      case "Letter":
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

      Job: { id: 1, data: TemplateList },
      Job_Description: { id: 2, data: JobDescriptionList },
      Workflow: { id: 3, data: WorkflowList },
      Email: { id: 4, data: emailSubject },
      Evaluation: { id: 5, data: EvaluationLIst },
      Questionnaire: { id: 6, data: QuestionaireLIst },
      Letter: { id: 7, data: LetterLIst }

    },
  ];
  const actionId = [
    {
      Job: { id: "jobTemplateId" },
      Job_Description: { id: "descriptionTemplateId" },
      Workflow: { id: "workFlowId" },
      Email: { id: "emailTemplateId" },
      Evaluation: { id: "evaluationTemplateId" },
      Questionnaire: { id: "questionnaireTemplateId" },
      Letter: { id: "letterTemplateId" }
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
            buttonName={`Create ${navigationPath.replace(/_/g, ' ')} Template`}// Set the button name
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
              case "Job_Description":
                getAllJobdescription();
                break;
              case "Workflow":
                getWorkflows();
                break;
              case "Email":
                getEmailLsit();
                break;
              case "Evaluation":
                getallevaluation();
                break;
              case "Questionnaire":
                getallquestionaire();
                break;
              case "Letter":
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

      {navigationPath === "Job_Description" && show && (
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
      {navigationPath === "Workflow" && show && (
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
      {navigationPath === "Email" && show && (
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
      {navigationPath === "Evaluation" && show && (
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
      {navigationPath === "Questionnaire" && show && (
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
      {navigationPath === "Letter" && show && (
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