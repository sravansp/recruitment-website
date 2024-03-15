import React,{useState,useEffect} from 'react'
import TableAnt from '../common/TableAnt'
import Breadcrumbs from '../common/BreadCrumbs';
import { useTranslation } from 'react-i18next';

import ButtonClick from '../common/Button';
import { getAllRecruitmentJobTemplates,getAllRecruitmentWorkFlows,getAllRecruitmentEmailTemplates,getAllRecruitmentQuestionnaireTemplateDetails,getAllRecruitmentEvaluationTemplates,getAllRecruitmentLetterTemplates } from '../Api1';
import AddTemplate from './Addtemplate';
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

const Template = ({
    open = "",
    close = () => {},
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

  
      const [navigationPath, setNavigationPath] = useState("Job_Templates");
      const breadcrumbItems = [
        //{ label: t("Templates"), url: "/" },
        // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },

        { label: t("Settings"), url: "" },
        { label: t("Other"), url: "" },
        { label: t("Templates"), url: "" },
        { label: navigationPath.replace(/_/g, ' '), url: "" },
      ];
     const tabs =[
         {
            id:1,
            title:"Job Templates",
            value:"Job_Templates",
            tabheading:"Job Template List"
         },
         {
            id:2,
            title:"Job Description",
            value:"Job_Description",
            tabheading:"Job Description Template List"
         },
         {
            id:3,
            title:"Workflow",
            value:"Workflow",
            tabheading:"Work Flow Template List"
         },
         {
            id:4,
            title:"Email",
            value:"Email",
            tabheading:"Email Templates"
         },
         {
            id:5,
            title:"Evaluation",
            value:"Evaluation",
            tabheading:"Evaluation Templates"
         },
         {
            id:6,
            title:"Questionaire",
            value:"Questionaire",
            tabheading:"Questionnaire Templates"
         },
         {
            id:7,
            title:"Letter",
            value:"Letter",
            tabheading:"Letter Templates"
         }

     ]
   
   
      const Header =[
    {
      Job_Templates : [ 
          {
            id:1,
            title:"Name",
            value:"jobTitle",
         },
         {
            id:2,
            title:"Description",
            value:"Job_Description",
         },
         {
            id:3,
            title:"Status",
            value:"",
            actionToggle: true,
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ],
        Job_Description : [ 
          {
            id:1,
            title:"Name",
            value:"Name",
         },
         {
            id:2,
            title:"Description",
            value:"Description",
         },
         {
          id:3,
          title:"Status",
          value:"",
          actionToggle: true,
       },
         {
            id:4,
            title:"Status",
            value:"Status",
            action:true,
         },
        ],
        Workflow : [ 
          {
            id:1,
            title:"Name",
            value:"workFlowName",
         },
         {
            id:2,
            title:"Description",
            value:"description",
         },
         {
          id:3,
          title:"Status",
          value:"",
          actionToggle: true,
       },
         {
            id:4,
            title:"Status",
            value:"Status",
            action:true,
         },
        ],
        Email : [ 
          {
            id:1,
            title:"Name",
            value:"emailTemplateName",
         },
         {
            id:2,
            title:"Description",
            value:"subject",
         },
         {
          id:3,
          title:"Status",
          value:"",
          actionToggle: true,
       },
         {
            id:4,
            title:"Status",
            value:"Status",
            action:true,
         },
        ],
        Evaluation : [ 
          {
            id:1,
            title:"Name",
            value:"evaluationTemplateName",
         },
         {
            id:2,
            title:"Description",
            value:"Description",
         },
         {
            id:3,
            title:"Status",
            value:"",
            actionToggle:true,
         },
        ],
        Questionaire : [ 
          {
            id:1,
            title:"Name",
            value:"question",
         },
         {
            id:2,
            title:"Description",
            value:"description",
         },
         {
            id:3,
            title:"Status",
            value:"Status",
            actionToggle:true,
         },
         {
          id:4,
          title:"",
          value:"actions",
          action:true,
       },
        ],
        Letter : [ 
          {
            id:1,
            title:"Name",
            value:"letterTemplateName",
         },
         {
            id:2,
            title:"Description",
            value:"Description",
         },
         {
            id:3,
            title:"Status",
            value:"",
            actionToggle: true,
         },
        ]

    } 
   
   
     


     

   ]

   const [JobList,steJobList]= useState([])
   const [JobDescriptionList,setJobDescriptionList]=useState([])
   const [WorkflowList,setWorkflow]=useState([])
   const [EmailList,setEmail] = useState([])
   const [EvaluationLIst,setEvaluation]=useState([])
   const[QuestionaireLIst,setQuestionaire]=useState([])
   const[LetterLIst,setLetter]=useState([])
   const[updateId,setUpdateId]=useState(null)
   const[update,setUpdate]=useState(false)

 
//    const handleOpenModal = () => {
//     // Set the state to trigger the rendering of AddLeaveType
//     setOpenPop("Members");
//     setShow(true);
//     handleShow();
//     // You might want to set updateId and companyId here if needed
//   };
   console.log("header",Header)
   
   const[TemplateList,setTemplateList]=useState([])
   
     const gettemaplate = async () => {
       try {
        
         const response = await getAllRecruitmentJobTemplates();
         
         setTemplateList(response.result);
         // const newData = {};
         // response.result.forEach((job) => {
         //   newData[job.jobId] = job; // Assuming jobId is the unique identifier
         // });
        
         // setTableData(response.data);
         // console.log(response.data); // Access response data
         console.log(response);
       } catch (error) {
         console.error(error); // Handle errors
       }
     };
     {console.log(updateId)}
    
    // useEffect(()=>{
    //   gettemaplate();
    // })
    
    const getWorkflows = async () => {
      try {
       
        const response = await getAllRecruitmentWorkFlows();
        
        setWorkflow(response.result);
        // const newData = {};
        // response.result.forEach((job) => {
        //   newData[job.jobId] = job; // Assuming jobId is the unique identifier
        // });
       
        // setTableData(response.data);
        // console.log(response.data); // Access response data
        console.log(response);
      } catch (error) {
        console.error(error); // Handle errors
      }
    };
    {console.log(updateId)}
   
  //  useEffect(()=>{
  //   getWorkflows();
  //  })
 
  //  useEffect(()=>{
  //   gettemaplate();
  // })


  


  
  const getEmailLsit = async () => {
    try {
     
      const response = await getAllRecruitmentEmailTemplates();
      
    
      setEmail(response.result)
      // const newData = {};
      // response.result.forEach((job) => {
      //   newData[job.jobId] = job; // Assuming jobId is the unique identifier
      // });
     
      // setTableData(response.data);
      // console.log(response.data); // Access response data
      console.log(response);
      console.log(EmailList);
    } catch (error) {
      console.error(error); // Handle errors
    }
  };
  const getallquestionaire = async ()=>{
    try{
      const data = await getAllRecruitmentQuestionnaireTemplateDetails()
      setQuestionaire(data.result)
      console.log(data)
    }catch (error) {
      console.error(error); // Handle errors
    }

  }
  const getallevaluation = async ()=>{
    try{
      const data = await getAllRecruitmentEvaluationTemplates()
      setEvaluation(data.result)
      console.log(data)
    }catch (error) {
      console.error(error); // Handle errors
    }

  }
  const getallLetter = async ()=>{
    try{
      const data = await getAllRecruitmentLetterTemplates()
      setLetter(data.result)
      console.log(data)
    }catch (error) {
      console.error(error); // Handle errors
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
      case "Job_Templates":
        // getLocationList();
        gettemaplate();
        
        break;
      case "Job_Description":
        // getDepartmentList();
        
        console.log(newData)
        break;
      // Add more cases as needed
      case "Workflow":
        getWorkflows();
        
        console.log(newData)
        break;
        case "Email":
          getEmailLsit();
          
          console.log(newData)
          break;
          case "Evaluation":
            getallevaluation();
            
            console.log(newData)
            break;
            case "Questionaire":
              // getDepartmentList();
              getallquestionaire();
              
              console.log(newData)
              break;
              case "Letter":
                getallLetter()
                
                console.log(newData)
                break;
      default:
        break;
    }
  
    // console.log(companySliceId, navigationPath, "refresh");
  
    // Update the state variable or Redux store with the new data
   
  
  }, [navigationPath]);

  const actionData = [
    {
    
      Job_Templates: { id: 1, data:TemplateList },
      Job_Description: { id: 2, data:JobDescriptionList },
        Workflow: {id:3,data:WorkflowList},
        Email:{id:4,data:EmailList},
        Evaluation:{id:5,data:EvaluationLIst},
        Questionaire:{id:6,data:QuestionaireLIst},
        Letter:{id:7,data:LetterLIst}
    
    },
  ];
  const actionId= [
    {
      Job_Templates:{id:"jobTemplateId"},
      Job_Description:{id:"JobDescriptionTemplateId"},
      Workflow: {id:"workFlowId"},
      Email:{id:"emailTemplateId"},
      Evaluation:{id:"evaluationTemplateId"},
      Questionaire:{id:"questionnaireTemplateId"},
      Letter:{id:"letterTemplateId"}
    }
    

  ]
  // const handleCreateJobClose = () => {
  //   // Perform navigation logic here
  //   // Example: navigate to the "Jobdetails" accordion
  //   setNavigationPath("JobDetails");
  //   // You can also set other necessary state or perform additional actions
  // };
  
    return (
   <div className='flex flex-col gap-6'>
    <div className="flex flex-col justify-between gap-6 lg:items-center lg:flex-row">
          <div>
              <Breadcrumbs items={breadcrumbItems} />
              <p className="para">{t("Lorem ipsum dolart sit dummy text.")}</p>
          </div>
          {/* <div className="flex flex-col gap-6 sm:flex-row">
              
          </div> */}
          <div className="flex flex-col gap-6 sm:flex-row">
          <ButtonClick
            handleSubmit={
              () => {
                console.log("show");
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
      </div><div>
        
              <Tabs 
              header={Header}
              // path="employee"
              tabs={tabs}
              All={true}
              clickDrawer={(e) => {
                handleShow();
                // console.log(e);
                // setShow(e);
              }}
              tabClick={(e) => {
                console.log(e, "e");
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
                buttonClick={(e) => {
                  // console.log(company, "company", e);
                  if (e === true) {
                    // setShow(e);
                  } else if (e === navigationPath) {
                    // setShow(true);
        
                    // setCompanyId(company);
                    setOpenPop(e);
                    // setUpdateId(false);
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
              
              
              />
          </div>
          { show && (
        <CreatejobTemp
          open={show}
          close={(e) => {
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

{navigationPath === "JobDescription" && show && (
        <TemplateDec
          open={show}
          close={(e) => {
            setShow(e);
          }}
        //   updateId={updateId}
        //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
          // jobDescription={true}
        />
      )}
      {navigationPath === "Workflow" && show && (
        <Workflowstage
          open={show}
          close={(e) => {
            setShow(e);
          }}
        //   updateId={updateId}
        //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
        />
      )}
      {navigationPath === "Email" && show && (
        <Emailtemplate
          open={show}
          close={(e) => {
            setShow(e);
          }}
        //   updateId={updateId}
        //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
        />
      )}
       {navigationPath === "Evaluation" && show && (
        <TemEvaluation
          open={show}
          close={(e) => {
            setShow(e);
          }}
        //   updateId={updateId}
        //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
        />
      )}
       {navigationPath === "Questionaire" && show && (
        <QuestionAire
          open={show}
          close={(e) => {
            setShow(e);
            
          }}
          questionaireList={QuestionaireLIst}
        //   updateId={updateId}
        //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
        />
      )}
             {navigationPath === "Letter" && show && (
        <AddLetter
          open={show}
          close={(e) => {
            setShow(e);
          }}
          letterList={LetterLIst}
        //   updateId={updateId}
        //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
        />
      )}
      
      </div>
   
  )
}


export default Template