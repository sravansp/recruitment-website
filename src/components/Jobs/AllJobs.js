/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import API, { getAllRecruitmentJobs, getJobStatics } from "../Api1";
import Heading from "../common/Heading";
import { Link } from "react-router-dom";
import { PiArrowSquareOut } from "react-icons/pi";
import ButtonClick from "../common/Button";
import Tabs from "../common/Tabs";
import { useTranslation } from "react-i18next";
import Createjob from "./Createjob";
import { motion } from "framer-motion";
import JobListCopy from "../common/JobListCopy";

function AllJobs() {
  const { t } = useTranslation();

  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  const [navigationPath, setNavigationPath] = useState("My_Open_Jobs");

  const handleshow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [show, setShow] = useState(false);

  const [userid, setuserid] = useState("");

  const [updateId, setUpdateId] = useState("");

  const [FilteredJobList, setFilteredJobList] = useState([]);

  const [OpenJObs, setOpenJObs] = useState([]);

  const [createdBy, setCreatedBy] = useState("");

  const [DraftJObs, setDraftJObs] = useState([]);

  const [sortedInfo, setSortedInfo] = useState({});

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
      setCreatedBy(
        loginData && loginData.userData && loginData.userData.employeeId
      );
      // Now, 'username' variable contains the username
    }
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter || {});
  };

  const tabs = [
    {
      id: 1,
      title: t("My_Open_Jobs"),
      value: "My_Open_Jobs",
    },
    {
      id: 2,
      title: t("All_Jobs"),
      value: "All_Jobs",
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
      All_Jobs: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
          bold: true,
          key: "jobTitle",
          sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
          sortOrder:
            sortedInfo?.columnKey === "jobTitle" ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key: "noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder:
            sortedInfo?.columnKey === "noOfApplicants"
              ? sortedInfo.order
              : null,
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
          sortOrder:
            sortedInfo?.columnKey === "workLocationType"
              ? sortedInfo.order
              : null,
        },

        {
          id: 4,
          title: t("Location"),
          value: "location",
          key: "location",
          sorter: (a, b) => a.location.localeCompare(b.location),
          sortOrder:
            sortedInfo?.columnKey === "location" ? sortedInfo.order : null,
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
          key: "jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.localeCompare(b.jobCreatedBy),
          sortOrder:
            sortedInfo?.columnKey === "jobCreatedBy" ? sortedInfo.order : null,
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
          sortOrder:
            sortedInfo?.columnKey === "createdOn" ? sortedInfo.order : null,
        },
        {
          id: 8,
          title: t("View"),
          value: "viewData",
          status: "viewData",
        },
      ],
      My_Open_Jobs: [
        {
          id: 1,
          title: t("Name"),
          value: "jobTitle",
          bold: true,
          key: "jobTitle",
          sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
          sortOrder:
            sortedInfo?.columnKey === "jobTitle" ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key: "noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder:
            sortedInfo?.columnKey === "noOfApplicants"
              ? sortedInfo.order
              : null,
        },
        {
          id: 3,
          title: t("Type"),
          value: "workLocationType",
          key: "workLocationType",
          sorter: (a, b) => {
            return a.workLocationType.localeCompare(b.workLocationType);
          },
          sortOrder:
            sortedInfo?.columnKey === "workLocationType"
              ? sortedInfo.order
              : null,
        },
        {
          id: 4,
          title: t("Location"),
          value: "location",
          key: "location",
          sorter: (a, b) => a.location.localeCompare(b.location),
          sortOrder:
            sortedInfo?.columnKey === "location" ? sortedInfo.order : null,
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
          key: "jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.localeCompare(b.jobCreatedBy),
          sortOrder:
            sortedInfo?.columnKey === "jobCreatedBy" ? sortedInfo.order : null,
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
          sortOrder:
            sortedInfo?.columnKey === "createdOn" ? sortedInfo.order : null,
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
          key: "jobTitle",
          sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
          sortOrder:
            sortedInfo?.columnKey === "jobTitle" ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key: "noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder:
            sortedInfo?.columnKey === "noOfApplicants"
              ? sortedInfo.order
              : null,
        },
        {
          id: 3,
          title: t("Type"),
          value: "workLocationType",
          key: "workLocationType",
          sorter: (a, b) => {
            return a.workLocationType.localeCompare(b.workLocationType);
          },
          sortOrder:
            sortedInfo?.columnKey === "workLocationType"
              ? sortedInfo.order
              : null,
        },
        {
          id: 4,
          title: t("Location"),
          value: "location",
          key: "location",
          sorter: (a, b) => a.location.localeCompare(b.location),
          sortOrder:
            sortedInfo?.columnKey === "location" ? sortedInfo.order : null,
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
          key: "jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.localeCompare(b.jobCreatedBy),
          sortOrder:
            sortedInfo?.columnKey === "jobCreatedBy" ? sortedInfo.order : null,
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
          sortOrder:
            sortedInfo?.columnKey === "createdOn" ? sortedInfo.order : null,
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
          key: "jobTitle",
          sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
          sortOrder:
            sortedInfo?.columnKey === "jobTitle" ? sortedInfo.order : null,
        },
        {
          id: 2,
          title: t("Applied"),
          value: "noOfApplicants",
          key: "noOfApplicants",
          sorter: (a, b) => a.noOfApplicants - b.noOfApplicants,
          sortOrder:
            sortedInfo?.columnKey === "noOfApplicants"
              ? sortedInfo.order
              : null,
        },
        {
          id: 3,
          title: t("Type"),
          value: "workLocationType",
          key: "workLocationType",
          sorter: (a, b) => {
            return a.workLocationType.localeCompare(b.workLocationType);
          },
          sortOrder:
            sortedInfo?.columnKey === "workLocationType"
              ? sortedInfo.order
              : null,
        },
        {
          id: 4,
          title: t("Location"),
          value: "location",
          key: "location",
          sorter: (a, b) => a.location.length - b.location.length,
          sortOrder: sortedInfo?.columnKey === "location",
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
          key: "jobCreatedBy",
          sorter: (a, b) => a.jobCreatedBy.length - b.jobCreatedBy.length,
          sortOrder: sortedInfo?.columnKey === "jobCreatedBy",
        },
        {
          id: 6,
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
          sortOrder:
            sortedInfo?.columnKey === "createdOn" ? sortedInfo.order : null,
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
      All_Jobs: { id: 1, api: API.UpDate_jobs },
      My_Open_Jobs: { id: 2, api: API.UpDate_jobs },
      Open: { id: 3, api: API.UpDate_jobs },
      Draft: { id: 3, api: API.UpDate_jobs },
    },
  ];
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  const [JobsList, setJobList] = useState([]);

  const actionData = [
    {
      My_Open_Jobs: { id: 1, response: FilteredJobList },
      All_Jobs: { id: 2, response: JobsList },
      Open: { id: 3, response: OpenJObs },
      Draft: { id: 4, response: DraftJObs },
    },
  ];

  const callapi = async () => {
    try {
      const response = await getAllRecruitmentJobs({ companyId });
      const filteredJobs = response.result.filter(
        (job) => job.jobStatus !== "Draft"
      );
      setJobList(filteredJobs);
    } catch (error) {
      return error;
    }
  };

  const getcreatedBy = async () => {
    const createdBy = userid;
    try {
      const response = await getAllRecruitmentJobs({
        companyId,
        createdBy,
        jobStatus: "Open",
      });
      setFilteredJobList(response.result);
    } catch (error) {
      return error;
    }
  };

  const getOpenjobs = async () => {
    try {
      const response = await getAllRecruitmentJobs({
        companyId,
        jobStatus: "Open",
      });
      setOpenJObs(response.result);
    } catch (error) {
      return error;
    }
  };

  const getDraftjobs = async () => {
    try {
      const response = await getAllRecruitmentJobs({
        companyId,
        jobStatus: "Draft",
      });
      setDraftJObs(response.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const loginDataString = localStorage.getItem("LoginData");
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      setuserid(
        loginData && loginData.userData && loginData.userData.employeeId
      );
      setCreatedBy(
        loginData && loginData.userData && loginData.userData.employeeId
      );
    }
  }, []);

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  useEffect(() => {
    switch (navigationPath) {
      case "All_Jobs":
        callapi();
        break;
      case "My_Open_Jobs":
        if (userid) {
          getcreatedBy();
        }
        break;
      case "Open":
        getOpenjobs();
        break;
      case "Draft":
        getDraftjobs();
        break;
      default:
        break;
    }
  }, [navigationPath]);

  useEffect(() => {
    getcreatedBy();
  }, [userid]);

  const [jobstatic, setjobstatic] = useState([]);
  //static

  const getJobstat = async () => {
    try {
      const response = await getJobStatics({ companyId });
      setjobstatic(response.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getJobstat();
  }, [companyId]);

  const Drawerheader = [
    {
      My_Open_Jobs: [
        {
          id: 1,
          title: "JobTitle",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Number of openings",
          value: "noOfVaccancies",
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
          title: "JobType",
          value: "jobType",
        },
        {
          id: 6,
          title: "Requirement Type",
          value: "requirementType",
        },
      ],
      Draft: [
        {
          id: 1,
          title: "JobTitle",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Number of openings",
          value: "noOfVaccancies",
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
          title: "JobType",
          value: "jobType",
        },
        {
          id: 6,
          title: "Requirement Type",
          value: "requirementType",
        },
      ],
      Open: [
        {
          id: 1,
          title: "JobTitle",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Number of openings",
          value: "noOfVaccancies",
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
          title: "JobType",
          value: "jobType",
        },
        {
          id: 6,
          title: "Requirement Type",
          value: "requirementType",
        },
      ],
      All_Jobs: [
        {
          id: 1,
          title: "JobTitle",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "Number of openings",
          value: "noOfVaccancies",
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
          title: "JobType",
          value: "jobType",
        },
        {
          id: 6,
          title: "Requirement Type",
          value: "requirementType",
        },
      ],
    },
  ];
  const handleNavigate = () => {
    window.open("https://careerui.vercel.app/", "_blank");
  };

  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex items-center justify-between">
        <Heading title={t("Jobs")} description={t("Main_Description")} />
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
            }}
          />
          {show && (
            <motion.div initial="hidden" animate="visible">
              <Createjob
                open={show}
                close={(e) => {
                  setShow(e);
                  setUpdateId(false);
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
          handlesort={(e) => handleChange(e)}
          tabs={tabs}
          header={header}
          drawerH={Drawerheader}
          data={
            Object.keys(actionData[0]).includes(navigationPath)
              ? actionData[0]?.[navigationPath].response
              : null
          }
          tabClick={(e) => {
            setNavigationPath(e);
          }}
          actionID="jobId"
          buttonClick={(e) => {
            setUpdateId(e);
            handleshow(true);
          }}
          All={true}
          // recordId={record.jobId}
          actionToggle={(e) => {
            setUpdateId(e);
          }}
          refreshJobCrad={() => {
            getJobstat();
          }}
          refresh={() => {
            switch (navigationPath) {
              default:
                getcreatedBy();
                break;
              case "AllJobs":
                callapi();
                break;
              case "Open":
                getOpenjobs();
                break;
              case "Draft":
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
