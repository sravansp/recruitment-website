import React,{useState} from 'react'
import TableAnt from '../common/TableAnt'
import Breadcrumbs from '../common/BreadCrumbs';
import { useTranslation } from 'react-i18next';

import ButtonClick from '../common/Button';

import AddTemplate from './Addtemplate';
import Tabs from '../common/Tabs';
import Departments from '../Company/Add _departments';
import Location from '../Company/Addlocation';
import Createjob from '../Jobs/Createjob';

const Template = ({
    open = "",
    close = () => {},
    refresh,
    createPolicyAction,
    updateId,
    openPolicy,
}) => {
    const { t } = useTranslation();

    const [showPop, setShowPop] = useState(false);
    const handleClose = () => setOpenPop(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(open);
    const [openPop, setOpenPop] = useState("");
    const breadcrumbItems = [
        { label: t("Team Members"), url: "/" },
        // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },
      ];
      const [navigationPath, setNavigationPath] = useState("Job");
     const tabs =[
         {
            id:1,
            title:"Job",
            value:"Job",
            tabheading:"Job Template List"
         },
         {
            id:2,
            title:"Job Description",
            value:"JobDescription",
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
        Job : [ {
            id:1,
            title:"Name",
            value:"Name",
         },
         {
            id:2,
            title:"Contact",
            value:"Contact",
         },
         {
            id:3,
            title:"Designation",
            value:"Designation",
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ],
        JobDescription : [ 
            {
            id:1,
            title:"Name",
            value:"Name",
         },
         {
            id:2,
            title:"Contact",
            value:"Contact",
         },
         {
            id:3,
            title:"Designation",
            value:"Designation",
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ],
        Workflow : [ 
            {
            id:1,
            title:"Name",
            value:"Name",
         },
         {
            id:2,
            title:"Contact",
            value:"Contact",
         },
         {
            id:3,
            title:"Designation",
            value:"Designation",
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ],
        Email : [ 
            {
            id:1,
            title:"Name",
            
            value:"Name",
         },
         {
            id:2,
            title:"Contact",
            value:"Contact",
         },
         {
            id:3,
            title:"Designation",
            value:"Designation",
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ],
        Evaluation : [ 
            {
            id:1,
            title:"Name",
            value:"Name",
         },
         {
            id:2,
            title:"Contact",
            value:"Contact",
         },
         {
            id:3,
            title:"Designation",
            value:"Designation",
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ],
        Questionaire : [ 
            {
            id:1,
            title:"Name",
            value:"Name",
         },
         {
            id:2,
            title:"Contact",
            value:"Contact",
         },
         {
            id:3,
            title:"Designation",
            value:"Designation",
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ],
        Letter : [ 
            {
            id:1,
            title:"Name",
            value:"Name",
         },
         {
            id:2,
            title:"Contact",
            value:"Contact",
         },
         {
            id:3,
            title:"Designation",
            value:"Designation",
         },
         {
            id:4,
            title:"Action",
            value:"Action",
            action:true,
         },
        ]

    } 
   
   
     


     

   ]

   const [JobList,steJobList]= useState()
   const [JobDescriptionList,setJobDescriptionList]=useState()
   const [WorkflowList,setWorkflow]=useState()
   const [EmailList,setEmail] = useState()
   const [EvaluationLIst,setEvaluation]=useState()
   const[QuestionaireLIst,setQuestionaire]=useState()
   const[LetterLIst,setLetter]=useState()

   const actionData = [
    {
    
        Job: { id: 1, data: JobList },
        JobDescription: { id: 2, data: JobDescriptionList },
        Workflow: {id:3,data:WorkflowList},
        Email:{id:4,data:EmailList},
        Evaluation:{id:5,data:EvaluationLIst},
        Questionaire:{id:6,data:QuestionaireLIst},
        Letter:{id:7,data:LetterLIst}
    
    },
  ];
//    const handleOpenModal = () => {
//     // Set the state to trigger the rendering of AddLeaveType
//     setOpenPop("Members");
//     setShow(true);
//     handleShow();
//     // You might want to set updateId and companyId here if needed
//   };
   console.log("header",Header)
   
  React.useEffect(() => {
    // Provide a default value if needed
   
  
    let newData = [];
  
    switch (navigationPath) {
      case "Job":
        // getLocationList();
      
        
        break;
      case "Departments":
        // getDepartmentList();
        
        console.log(newData)
        break;
      // Add more cases as needed
      default:
        break;
    }
  
    // console.log(companySliceId, navigationPath, "refresh");
  
    // Update the state variable or Redux store with the new data
   
  
  }, [navigationPath]);
    return (
   
    <><div className="flex flex-col justify-between gap-6 lg:items-center lg:flex-row">
          <div>
              <Breadcrumbs items={breadcrumbItems} />
              <p className="para">{t("Lorem ipsum dolart sit dummy text.")}</p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
              
          </div>
      </div><div>
        
              <Tabs 
              header={Header}
              path="employee"
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
                showButton={true}
              
              
              />
          </div>
          {navigationPath === "Job" && show && (
        <Createjob
          open={show}
          close={(e) => {
            setShow(e);
          }}
        //   updateId={updateId}
        //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
          inputshow={false}
        />
      )}

{navigationPath === "JobDescription" && show && (
        <Createjob
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
      {navigationPath === "Workflow" && show && (
        <Createjob
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
        <Createjob
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
        <Createjob
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
        <Createjob
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
             {navigationPath === "Letter" && show && (
        <Createjob
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
      
          </>
   
  )
}


export default Template