import React, { useEffect, useState } from "react";
import TabsNew from "../common/TabsNew";
import TableAnt from "../common/TableAnt";
import axios from "axios";
import JobTabs from "../common/JobTabs";
import { Add } from "@mui/icons-material";
import API from "../Api";
import Table from "../common/Table";
import { getAllRecruitmentJobs,getJobStatics } from "../Api1";
import CustomTable from "../common/Table";
import App1 from "../common/Table";
import TableAnt1 from "../common/Table";
import Heading from "../common/Heading";
import { Link } from "react-router-dom";
import { PiArrowSquareOut } from "react-icons/pi";
import ButtonClick from "../common/Button";
import Tabs from "../common/Tabs";
import { useTranslation } from "react-i18next";
import Createjob from "./Createjob";
import { motion } from "framer-motion";
import JobListCopy from "../common/JobListCopy";
import { RiRuler2Fill } from "react-icons/ri";
import JobDetails from "./JobDetails";

function AllJobs() {
  const { t } = useTranslation();

  const data = [
    {
      Total_number_of_jobs_posted: "3612",
      Source_diversity: "35%",
      open_jobs: "80",
      rejection_average: "19320",
      hired_count: "152",
    },
  ];
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [navigationPath, setNavigationPath] = useState("MyOpenJobs");
  const handleshow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [userid, setuserid] = useState("");
  const[updateId,setUpdateId]=useState("")
  const[FilteredJobList,setFilteredJobList] =useState([])
  const[OpenJObs,setOpenJObs] = useState([])
  const [createdBy, setCreatedBy] = useState("");
  const[DraftJObs,setDraftJObs] =useState([])
  const [openPop, setOpenPop] = useState("");
  const record =""
 

  useEffect(() => {
    // Retrieve the login data JSON string from local storage
    const loginDataString = localStorage.getItem('LoginData');

    if (loginDataString) {
      // Parse the JSON string to get the LoginData object
      const loginData = JSON.parse(loginDataString);

      // Extract the username from the userData object
      setuserid(loginData && loginData.userData && loginData.userData.employeeId);
      setCreatedBy(loginData && loginData.userData && loginData.userData.employeeId)
      // Now, 'username' variable contains the username
      
    } else {
      console.error('Login data not found in local storage.');
    }
  }, []);
  console.log(updateId)
  const tabs =[
    {
      id: 1,
      title: t("My Open Jobs"),
      value: "MyOpenJobs",
    },
    {
      id: 2,
      title: t("All Jobs"),
      value: "AllJobs",
    },
    {
      id: 3,
      title: t("Open"),
      value: "Open",
    },

    {
      id: 4,
      title: t("Draft"),
      value: "Draft",
    },
  ];

  const header = [
    {
      AllJobs: [
        {
          id: 1,
          title: "NAME",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "APPLIED",
          value: "noOfApplicants",
        },
        {
          id: 3,
          title: "TYPE",
          value: "workLocationType",
        },

        {
          id: 4,
          title: "LOCATION",
          value: "location",
        },
        {
          id: 5,

          title: "Status",
          value: "isActive",
          actionToggle: true,
        },
        {
          id: 6,
          title: "POSTED BY",
          value: "jobCreatedBy",
        },
        {
          id: 7,
          title: "DATE",
          value: "createdOn",
        },
        // {
        //   id: 8,
        //   title: "",
        //   value: "action",
        //   dotsVertical: true,
        // },
      ],
      MyOpenJobs: [
        {
          id: 1,
          title: "NAME",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "APPLIED",
          value: "noOfApplicants",
        },
        {
          id: 3,
          title: "TYPE",
          value: "workLocationType",
        },

        {
          id: 4,
          title: "LOCATION",
          value: "location",
        },
        {
          id: 5,

          title: "Status",
          value: "isActive",
          actionToggle: true,
        },
        {
          id: 6,
          title: "POSTED BY",
          value: "jobCreatedBy",
        },
        {
          id: 7,
          title: "DATE",
          value: "createdOn",
        },
        // {
        //   id: 8,
        //   title: "",
        //   value: "action",
        //   dotsVertical: true,
        // },
      ],
      Open: [
        {
          id: 1,
          title: "NAME",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "APPLIED",
          value: "noOfApplicants",
        },
        {
          id: 3,
          title: "TYPE",
          value: "workLocationType",
        },

        {
          id: 4,
          title: "LOCATION",
          value: "location",
        },
        {
          id: 5,

          title: "Status",
          value: "isActive",
          actionToggle: true,
        },
        {
          id: 6,
          title: "POSTED BY",
          value: "jobCreatedBy",
        },
        {
          id: 7,
          title: "DATE",
          value: "createdOn",
        },
        // {
        //   id: 8,
        //   title: "",
        //   value: "action",
        //   dotsVertical: true,
        // },
      ],
      Draft: [
        {
          id: 1,
          title: "NAME",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "APPLIED",
          value: "noOfApplicants",
        },
        {
          id: 3,
          title: "TYPE",
          value: "workLocationType",
        },

        {
          id: 4,
          title: "LOCATION",
          value: "location",
        },
        {
          id: 5,

          title: "Status",
          value: "isActive",
          actionToggle: true,
        },
        {
          id: 6,
          title: "POSTED BY",
          value: "jobCreatedBy",
        },
        {
          id: 7,
          title: "DATE",
          value: "createdOn",
        },
        {
          id: 8,
          title: "",
          value: "action",
          dotsVertical: true,
        },
      ],
    },
  ];
  // useEffect(() => {
  //   setCreatedBy(1);
    
  // }, []);
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    
  }, []);
  const [JobsList, setJobList] = useState([]);
  
  const actionData = [
    {
      MyOpenJobs: { id: 1, response:FilteredJobList},
      AllJobs: { id: 2, response: JobsList},
      Open: { id: 3, response: OpenJObs},
      Draft: { id: 4, response: DraftJObs},
      
    },
  ];


 
  const callapi = async () => {
    try {
      const response = await getAllRecruitmentJobs({companyId});
      setJobList(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getcreatedBy = async () => {
    const createdBy = userid;
    try {
      const response = await getAllRecruitmentJobs({companyId, createdBy});
      setFilteredJobList(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getOpenjobs = async () => {
    try {
      const response = await getAllRecruitmentJobs({companyId, jobStatus: 'Open'});
      setOpenJObs(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getDraftjobs = async () => {
    try {
      const response = await getAllRecruitmentJobs({companyId, jobStatus: 'Draft'});
      setDraftJObs(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Retrieve the login data JSON string from local storage
    const loginDataString = localStorage.getItem('LoginData');

    if (loginDataString) {
      // Parse the JSON string to get the LoginData object
      const loginData = JSON.parse(loginDataString);

      // Extract the username from the userData object
      setuserid(loginData && loginData.userData && loginData.userData.employeeId);
      setCreatedBy(loginData && loginData.userData && loginData.userData.employeeId)
      // Now, 'username' variable contains the username
    } else {
      console.error('Login data not found in local storage.');
    }
  }, []);

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  useEffect(() => {
    callapi();
    getcreatedBy();
    getOpenjobs();
    getDraftjobs();
  }, [companyId, userid]);


  
  const[jobstatic,setjobstatic] =useState([])
  //static
  
  const getJobstat = async () => {
    try {
      const response = await getJobStatics({companyId});
      setjobstatic(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    getJobstat()
    console.log("value",jobstatic)
  },[companyId])
  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex justify-between">
        <Heading
          title="Jobs"
          description="Coordinates the planning,execution,and completion of projects... "
        />
        <div className="flex gap-4">
          {" "}
          <Link className="flex gap-2 mt-2">
            <span className="!text-primary para">View career page</span>{" "}
            <PiArrowSquareOut size={15} className="dark:text-white" />
          </Link>
          <ButtonClick
            buttonName={"Create a Job"}
            BtnType="primary"
            handleSubmit={() => {
              setShow(true);
              console.log("set", show);
            }}
          />
          {show && (
            <motion.div initial="hidden" animate="visible">
              <Createjob
                open={show}
                close={(e) => {
                  setShow(e);
                  setUpdateId(false)
                  handleClose();
                }}
                inputshow={true}
                updateId={updateId}
                refresh={() => {
                  callapi();
                  getcreatedBy();
                  getOpenjobs();
                  getDraftjobs();

                }}
                // openPolicy={openPop}
                // updateId={updateId}
                isUpdate={false}
               
                
              />
            </motion.div>
          )}
        </div>
      </div>

      <JobListCopy data={jobstatic} />

      <div className="">
        {/* <TableAnt1 data={JobsList} header={header} path="AllJobs" /> */}
        <Tabs
        path="JobDetails"
        tabs={tabs}
        header={header}
        data={
          Object.keys(actionData[0]).includes(navigationPath)
            ? actionData[0]?.[navigationPath].response
            : null
        }
        tabClick={(e) => {
          console.log(e, "e");
          setNavigationPath(e);
        }}
        actionID="jobId"
        
        
        buttonClick={(e, ) => {
          // console.log(company, "company", e);
          setUpdateId(e);
        handleshow(true)
        console.log(e)
        }}
        All={true}
        // recordId={record.jobId}
        actionToggle={(e) => {
          setUpdateId(e);
        }}
        refresh={() => {
          switch (navigationPath) {
            default:
              callapi();
              break;
            case "location":
              getcreatedBy();
              break;
            case "department":
              getOpenjobs();
              break;
            case "category":
              getDraftjobs();
              break;
           
          }
        }}
        
       
        />
      </div>
    </div>
  );
}

export default AllJobs;
