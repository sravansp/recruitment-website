import React, { useEffect, useState } from "react";
import TabsNew from "../common/TabsNew";
import TableAnt from "../common/TableAnt";
import axios from "axios";
import JobTabs from "../common/JobTabs";
import { Add } from "@mui/icons-material";
import API from "../Api";
import Table from "../common/Table";
import { getAllRecruitmentJobs } from "../Api1";
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
  const [navigationPath, setNavigationPath] = useState("MyOpenJobs");
  const handleshow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const[updateId,setUpdateId]=useState("")
  const record =""
 
  
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
        {
          id: 8,
          title: "",
          value: "action",
          dotsVertical: true,
        },
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
          value: "companyId",
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
      Open: [
        {
          id: 1,
          title: "NAME",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "APPLIED",
          value: "companyId",
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
      Draft: [
        {
          id: 1,
          title: "NAME",
          value: "jobTitle",
        },
        {
          id: 2,
          title: "APPLIED",
          value: "companyId",
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

  const [JobsList, setJobList] = useState([]);
  const actionData = [
    {
      // MyOpenJobs: { id: 1, data: companyList },
      AllJobs: { id: 2, response: JobsList },
      // open: { id: 3, data: departmentList },
      // Draft: { id: 4, data: categoryList },
      // subcategory: { id: 5, data: subCategoryList },
    },
  ];
 const actionID = [
  {
    id:JobsList.map((items)=>({
       actionID:items.jobId
      
    }))
  }
 ]


  useEffect(() => {
    const callapi = async () => {
      try {
        // const response = await axios.post(
        //  "http://192.168.0.55/loyaltri-recruitment-server/api/v1",
        //     {
        //       action: "getAllRecruitmentJobs",
        //       method: "POST",
        //       kwargs: {
        //         param1: "user2",
        //         param2: "testpass1",
        //         param3: 1,
        //       },
        //     }
        // );
        const response = await getAllRecruitmentJobs();
        
        setJobList(response.result);
        const newData = {};
        response.result.forEach((job) => {
          newData[job.jobId] = job; // Assuming jobId is the unique identifier
        });
       
        // setTableData(response.data);
        // console.log(response.data); // Access response data
        console.log(response);
      } catch (error) {
        console.error(error); // Handle errors
      }
    };
    {console.log(updateId)}
    callapi();
   
  }, []);
  useEffect(()=>{
      
    
    console.log(JobsList)
  
  },[])
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

                  handleClose();
                }}
                inputshow={true}
                // updateId={updateId}
                refresh={() => {
                  // getLocationList();
                }}
                // openPolicy={openPop}
                // updateId={updateId}
                isUpdate={false}
              />
            </motion.div>
          )}
        </div>
      </div>

      <JobListCopy />

      <div className="">
        {/* <TableAnt1 data={JobsList} header={header} path="AllJobs" /> */}
        <Tabs
        
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
        path="JobDetails"
        buttonClick={(e) => {
          setUpdateId(e);
        }}
        All={true}
        // recordId={record.jobId}
        
        />
      </div>
    </div>
  );
}

export default AllJobs;
