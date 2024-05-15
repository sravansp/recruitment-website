import React, { useEffect, useState } from "react";
import TabsNew from "../common/TabsNew";
import TableAnt from "../common/TableAnt";
import axios from "axios";
import JobTabs from "../common/JobTabs";
import { Add } from "@mui/icons-material";
// import API from "../Api";
import Table from "../common/Table";
import API,{ getAllRecruitmentJobs, getJobStatics } from "../Api1";
import CustomTable from "../common/Table";
import App1 from "../common/Table";
import TableAnt1 from "../common/Table";
import Heading from "../common/Heading";
import { Link, Navigate } from "react-router-dom";
import { PiArrowSquareOut } from "react-icons/pi";
import ButtonClick from "../common/Button";
import Tabs from "../common/Tabs";
import { useTranslation } from "react-i18next";
import Createjob from "./Createjob";
import { motion } from "framer-motion";
import JobListCopy from "../common/JobListCopy";
import { RiRuler2Fill } from "react-icons/ri";
import JobDetails from "./JobDetails";
// import API, { action, getJobStatics } from "../Api1";

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
  const [updateId, setUpdateId] = useState("")
  const [FilteredJobList, setFilteredJobList] = useState([])
  const [OpenJObs, setOpenJObs] = useState([])
  const [createdBy, setCreatedBy] = useState("");
  const [DraftJObs, setDraftJObs] = useState([])
  const [openPop, setOpenPop] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  const record = ""


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
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
   
    setSortedInfo(sorter || {});
  };
  console.log(updateId)
  const tabs = [
    {
      id: 1,
      title: t("My_Open_Jobs"),
      value: "MyOpenJobs",
    },
    {
      id: 2,
      title: t("All_Jobs"),
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
          title: t("Name"),
          value: "jobTitle",
          bold: true,
          key:"jobTitle",
          sorter: (a, b) => a.jobTitle.length - b.jobTitle.length,
          sortOrder: sortedInfo?.columnKey === 'jobTitle' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key:"noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder: sortedInfo?.columnKey === 'noOfApplicants' ? sortedInfo.order : null,
        },
        {
          id: 3,
          title: t("Type"),
          value: "workLocationType",
          key: "workLocationType",
          sorter: (a, b) => {
            // Compare the workLocationType strings alphabetically
            return a.workLocationType.localeCompare(b.workLocationType);
          },
          sortOrder: sortedInfo?.columnKey === 'workLocationType' ? sortedInfo.order : null,
        },

        {
          id: 4,
          title: t("Location"),
          value: "location",
          key:"location",
          sorter: (a, b) => a.location.length - b.location.length,
          sortOrder: sortedInfo?.columnKey === 'location'

        },
        {
          id: 5,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 6,
          title: t("Posted_By"),
          value: "jobCreatedBy",
          key:"jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.length - b.jobCreatedBy.length,
          sortOrder: sortedInfo?.columnKey === 'jobCreatedBy'
        },
        {
          id: 7,
          title: t("Date"),
          value: "createdOn",
          key: "createdOn",
          sorter: (a, b) => {
            // Parse the dates
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
        
            // Compare the dates
            return dateA - dateB;
          },
          sortOrder: sortedInfo?.columnKey === 'createdOn' ? sortedInfo.order : null,
        },
        {
          id: 8,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      MyOpenJobs: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
          bold: true,
          key:"jobTitle",
          sorter: (a, b) => a.jobTitle.length - b.jobTitle.length,
          sortOrder: sortedInfo?.columnKey === 'jobTitle' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key:"noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder: sortedInfo?.columnKey === 'noOfApplicants' ? sortedInfo.order : null,
        },
        {
          id: 3,
          title: t("Type"),
          value: "workLocationType",
          key:"workLocationType",
          sorter: (a, b) => {
            
            return a.workLocationType.localeCompare(b.workLocationType);
          },
          sortOrder: sortedInfo?.columnKey === 'workLocationType' ? sortedInfo.order : null,
        },

        {
          id: 4,
          title: t("Location"),
          value: "location",
          key:"location",
          sorter: (a, b) => a.location.length - b.location.length,
          sortOrder: sortedInfo?.columnKey === 'location'

        },
        {
          id: 5,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 6,
          title: t("Posted_By"),
          value: "jobCreatedBy",
          key:"jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.length - b.jobCreatedBy.length,
          sortOrder: sortedInfo?.columnKey === 'jobCreatedBy'
        },
        {
          id: 7,
          title: t("Date"),
          value: "createdOn",
          key: "createdOn",
          sorter: (a, b) => {
            // Parse the dates
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
        
            // Compare the dates
            return dateA - dateB;
          },
          sortOrder: sortedInfo?.columnKey === 'createdOn' ? sortedInfo.order : null,
        },
        {
          id: 8,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Open: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
          bold: true,
          key:"jobTitle",
          sorter: (a, b) => a.jobTitle.length - b.jobTitle.length,
          sortOrder: sortedInfo?.columnKey === 'jobTitle' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key:"noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder: sortedInfo?.columnKey === 'noOfApplicants' ? sortedInfo.order : null,
        },
        {
          id: 3,
          title: t("Type"),
          value: "workLocationType",
          key:"workLocationType",
          sorter: (a, b) => {
            
            return a.workLocationType.localeCompare(b.workLocationType);
          },
          sortOrder: sortedInfo?.columnKey === 'workLocationType' ? sortedInfo.order : null,
        },

        {
          id: 4,
          title: t("Location"),
          value: "location",
          key:"location",
          sorter: (a, b) => a.location.length - b.location.length,
          sortOrder: sortedInfo?.columnKey === 'location'

        },
        {
          id: 5,
          title: t("Status"),
          value: "",
          actionToggle: true,
        },
        {
          id: 6,
          title: t("Posted_By"),
          value: "jobCreatedBy",
          key:"jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.length - b.jobCreatedBy.length,
          sortOrder: sortedInfo?.columnKey === 'jobCreatedBy'
        },
        {
          id: 7,
          title: t("Date"),
          value: "createdOn",
          key: "createdOn",
          sorter: (a, b) => {
            // Parse the dates
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
        
            // Compare the dates
            return dateA - dateB;
          },
          sortOrder: sortedInfo?.columnKey === 'createdOn' ? sortedInfo.order : null,
        },
        {
          id: 8,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      Draft: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
          bold: true,
          key:"jobTitle",
          sorter: (a, b) => a.jobTitle.length - b.jobTitle.length,
          sortOrder: sortedInfo?.columnKey === 'jobTitle' ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key:"noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder: sortedInfo?.columnKey === 'noOfApplicants' ? sortedInfo.order : null,
        },
        {
          id: 3,
          title: t("Type"),
          value: "workLocationType",
          key:"workLocationType",
          sorter: (a, b) => {
            
            return a.workLocationType.localeCompare(b.workLocationType);
          },
          sortOrder: sortedInfo?.columnKey === 'workLocationType' ? sortedInfo.order : null,
        },

        {
          id: 4,
          title: t("Location"),
          value: "location",
          key:"location",
          sorter: (a, b) => a.location.length - b.location.length,
          sortOrder: sortedInfo?.columnKey === 'location'
        },
        // {
        //   id: 5,

        //   title: t("Status"),
        //   value: "",
        //   actionToggle: true,
        // },
        {
          id: 5,
          title: t("Posted_By"),
          value: "jobCreatedBy",
          key:"jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.length - b.jobCreatedBy.length,
          sortOrder: sortedInfo?.columnKey === 'jobCreatedBy'
        },
        {
          id: 6,
          title: t("Date"),
          value: "createdOn",
          key:"createdOn",
          sorter: (a, b) => {
            // Parse the dates
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
        
            // Compare the dates
            return dateA - dateB;
          },
          sortOrder: sortedInfo?.columnKey === 'createdOn' ? sortedInfo.order : null,
        },
        {
          id: 7,
          title: "Action",
          value: "action",
          dotsVertical: true,
        },
        {
          id: 8,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
    },
  ];
  // useEffect(() => {
  //   setCreatedBy(1);

  // }, []);
  const updateApi = [
    {
      AllJobs:{id:1,api:API. UpDate_jobs},
      MyOpenJobs:{id:2,api:API. UpDate_jobs},
      Open:{id:3,api:API. UpDate_jobs},
      Draft:{id:3,api:API. UpDate_jobs},

    },
  ];
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));

  }, []);
  const [JobsList, setJobList] = useState([]);

  const actionData = [
    {
      MyOpenJobs: { id: 1, response: FilteredJobList },
      AllJobs: { id: 2, response: JobsList },
      Open: { id: 3, response: OpenJObs },
      Draft: { id: 4, response: DraftJObs },

    },
  ];



  const callapi = async () => {
    try {
      const response = await getAllRecruitmentJobs({ companyId });
      setJobList(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getcreatedBy = async () => {
    const createdBy = userid;
    try {
      const response = await getAllRecruitmentJobs({ companyId, createdBy, jobStatus: 'Open' });
      setFilteredJobList(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getOpenjobs = async () => {
    try {
      const response = await getAllRecruitmentJobs({ companyId, jobStatus: 'Open' });
      setOpenJObs(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getDraftjobs = async () => {
    try {
      const response = await getAllRecruitmentJobs({ companyId, jobStatus: 'Draft' });
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
    switch(navigationPath){
    case"AllJobs":
    
    callapi();
    break;
    case"MyOpenJobs":
    getcreatedBy();
    break;
    case"Open":
    getOpenjobs();
    break
    case"Draft":
    getDraftjobs();
    break
    default:
      break
   
  
  }
  }, [navigationPath]);
  useEffect(()=>{
    getcreatedBy();
    
  },[userid])



  const [jobstatic, setjobstatic] = useState([])
  //static

  const getJobstat = async () => {
    try {
      const response = await getJobStatics({ companyId });
      setjobstatic(response.result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getJobstat()
    console.log("value", jobstatic)
  }, [companyId])


  const Drawerheader = [
    {
      MyOpenJobs: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Created By",
          value: "createdBy",
        },
        {
          id: 3,
          title: "Experience",
          value: "experience",
        },

        {
          id: 4,
          title: "Job Created By",
          value: "jobCreatedBy",
        },
        {
          id: 5,

          title: "JobTitle",
          value: "jobTitle",

        },
        {
          id: 6,
          title: "JobType",
          value: "jobType",
        },
        {
          id: 7,
          title: "Requirement Type",
          value: "requirementType",
        },
      ],
      Draft: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Created By",
          value: "createdBy",
        },
        {
          id: 3,
          title: "Experience",
          value: "experience",
        },

        {
          id: 4,
          title: "Job Created By",
          value: "jobCreatedBy",
        },
        {
          id: 5,

          title: "JobTitle",
          value: "jobTitle",

        },
        {
          id: 6,
          title: "JobType",
          value: "jobType",
        },
        {
          id: 7,
          title: "Requirement Type",
          value: "requirementType",
        },

      ],
      Open: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Created By",
          value: "createdBy",
        },
        {
          id: 3,
          title: "Experience",
          value: "experience",
        },

        {
          id: 4,
          title: "Job Created By",
          value: "jobCreatedBy",
        },
        {
          id: 5,

          title: "JobTitle",
          value: "jobTitle",

        },
        {
          id: 6,
          title: "JobType",
          value: "jobType",
        },
        {
          id: 7,
          title: "Requirement Type",
          value: "requirementType",
        },

      ],
      AllJobs: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Created By",
          value: "createdBy",
        },
        {
          id: 3,
          title: "Experience",
          value: "experience",
        },

        {
          id: 4,
          title: "Job Created By",
          value: "jobCreatedBy",
        },
        {
          id: 5,

          title: "JobTitle",
          value: "jobTitle",

        },
        {
          id: 6,
          title: "JobType",
          value: "jobType",
        },
        {
          id: 7,
          title: "Requirement Type",
          value: "requirementType",
        },

      ],
    },
  ];
  const handleNavigate = () => {
    window.open('https://careerui.vercel.app/', '_blank');
  };

  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex items-center justify-between">
        <Heading
          title={t("Jobs")}
          description={t("Main_Description")}
        />
        <div className="flex items-center gap-4">
          {" "}
          <Link onClick={handleNavigate} className="flex items-center gap-2">
            <span className="!text-primary para">View Career Page</span>{" "}
            <PiArrowSquareOut size={20} className="dark:text-white" />
          </Link>
          <ButtonClick
            buttonName={t("Create_a_Job")}
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
          handlesort={(e)=>handleChange(e)}
          tabs={tabs}
          header={header}
          drawerH={Drawerheader}
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


          buttonClick={(e,) => {
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
          updateApi={
            Object.keys(updateApi[0]).includes(navigationPath)
              ? updateApi[0]?.[navigationPath].api
              : null
          }

        />
      </div>
    </div>
  );
}

export default AllJobs;
