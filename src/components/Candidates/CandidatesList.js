import React, { useEffect, useState } from 'react'
import Heading from '../common/Heading'
import { PiArrowSquareOut } from 'react-icons/pi'
import ButtonClick from '../common/Button'
import { Link } from 'react-router-dom'
import JobListCopy from '../common/JobListCopy'
import TableAnt from '../common/TableAnt'
import TableCopy from '../common/TableCopy'
import { getAllRecruitmentResumes,getJobStatics } from '../Api1'

import { motion } from "framer-motion";
import Createcandidatelist from './Createcandidatelist'
import { useTranslation } from 'react-i18next'


const CandidatesList = () => {
  const [jobList,setJobList]=useState([])
  const [show, setShow] = useState(false);
  const [openPop, setOpenPop] = useState("");
  const [updateId, setUpdateId] = useState("");
  const[jobId,setJobId]=useState(null)
  const [sortedInfo, setSortedInfo] = useState({});
  const { t } = useTranslation();
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
   
    setSortedInfo(sorter || {});
  };

  const header = [
    {
      Candidate_Profile: [
        {
          id: 1,
          title: t("NAME"),
          value: "candidateName",
          bold: true,
          key:"candidateName",
          sorter: (a, b) => a.candidateName.localeCompare(b.candidateName),
          sortOrder: sortedInfo?.columnKey === 'candidateName' ? sortedInfo.order : null,
         
         
        },
        {
          id: 2,
          title: t("CONTACT"),
          value: "candidateContact",
          key:"candidateContact",
          sorter: (a, b) => a.candidateContact - b.candidateContact,
          sortOrder: sortedInfo.columnKey === 'candidateContact' ? sortedInfo.order : null,
        },
        {
          id: 3,
          title: t("JOB"),
          value: "jobTitle",
          titleCaseSensitive: true,
          key: "jobTitle",
          sorter: (a, b) => {
            // Handle cases where jobTitle is null or undefined
            const titleA = a.jobTitle || '';
            const titleB = b.jobTitle || '';
            return titleA.localeCompare(titleB);
          },
          sortOrder: sortedInfo.columnKey === 'jobTitle' ? sortedInfo.order : null,
        },

      {
        id: 4,
        title: t("STAGE"),
        value: "stageName",
        key: "stageName",
        sorter: (a, b) => {
            // Handle cases where stageName is null or undefined
            const nameA = a.stageName || '';
            const nameB = b.stageName || '';
            return nameA.localeCompare(nameB);
        },
        sortOrder: sortedInfo.columnKey === 'stageName' ? sortedInfo.order : null,
    },
    {
      id: 5,
      title: t("SOURCE"),
      value: "candidateSource",
      key: "candidateSource",
      sorter: (a, b) => {
          // Handle cases where candidateSource is null or undefined
          const sourceA = a.candidateSource || '';
          const sourceB = b.candidateSource || '';
          return sourceA.localeCompare(sourceB);
      },
      sortOrder: sortedInfo.columnKey === 'candidateSource' ? sortedInfo.order : null,
  },
        {
          id: 6,
          title: t("STATUS"),
          value: "currentStatus",
          key: "currentStatus",
          sorter: (a, b) => {
              // Handle cases where currentStatus is null or undefined
              const statusA = a.currentStatus || '';
              const statusB = b.currentStatus || '';
              return statusA.localeCompare(statusB);
          },
          sortOrder: sortedInfo.columnKey === 'currentStatus' ? sortedInfo.order : null,
      },
        {
          id: 7,
          title: t("APPLIED DATE"),
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
        
        // {
        //   id: 7,
        //   title: "",
        //   value: "action",
        //   dotsVertical: true,
        // },
      ],
    },
  ];
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  useEffect(() => {
    const callapi = async () => {
      try {
        
        const response = await getAllRecruitmentResumes();
        console.log(response.result);
        setJobList(response.result);
        // const jobIds = response.result.map(resume => resume.jobId);
        // console.log("Job IDs:", jobIds);
        // setJobId(jobIds)

        // setTableData(response.data);
        // console.log(response.data); // Access response data
      } catch (error) {
        console.error(error); // Handle errors
      }
    };

   

    callapi();
  }, []);
  const handleClose = () => {
    setShow(false);
    setOpenPop(""); // Clear the value in setOpenPop
  };
  console.log(jobList)
  const[jobstatic,setjobstatic] = useState([])
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
  const handleNavigate = () => {
    window.open('https://careerui.vercel.app/', '_blank');
  };
  return (
    <div className="flex flex-col gap-[25px]">
      <div className='flex justify-between'>
        <Heading
          title={t("Candidates")}
          description="Coordinates the planning, execution, and completion of projects..."/>
           <div className="flex gap-4">
          {" "}
          <Link onClick={handleNavigate} className="flex gap-2 mt-2">
            <span className="!text-primary para">View Career Page</span>{" "}
            <PiArrowSquareOut size={15} className="dark:text-white" />
          </Link>
          <ButtonClick buttonName={t("Add_Candidate")}
           handleSubmit={() => {
            setShow(true);
            console.log(true);
          }} BtnType='add' />
        </div>
      </div>
      <JobListCopy data={jobstatic}/>
      <div className=''>
        {/* <TableCopy data={jobList} header={header} path='CandidateProfile'/> */}
        <TableAnt
        All={true} 
        data={jobList} 
        header={header} 
        path='Candidate_Profile' 
        actionID="resumeId" 
        jobId="jobId"
        handlesort={(e)=>{
          handleChange(e)

        }}
        />
      </div>
      {show && (
         <motion.div initial="hidden" animate="visible" >
        <Createcandidatelist
        open={show}
        close={(e) => {
          setShow(e);
          setUpdateId(null);
          handleClose();
        }}
       
          // updateId={updateId}
          refresh={() => {
            // getLocationList();
          }}
          openPolicy={openPop}
          updateId={updateId}
        />
        </motion.div>
      )}
    </div>
  )
}

export default CandidatesList