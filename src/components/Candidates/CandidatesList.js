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
  const { t } = useTranslation();

  const header = [
    {
      Candidate_Profile: [
        {
          id: 1,
          title: t("NAME"),
          value: "candidateName",
          bold: true,
        },
        {
          id: 2,
          title: t("CONTACT"),
          value: "candidateContact",
        },
        {
          id: 3,
          title: t("JOB"),
          value: "jobTitle",
          titleCaseSensitive: true,
        },

        {
          id: 4,
          title: t("STAGE"),
          value: "stageName",
         
        },
        {
          id: 5,

          title: t("SOURCE"),
          value: "candidateSource",
         
        },
        {
          id: 6,

          title: t("STATUS"),
          value: "currentStatus",
         
        },
        {
          id: 7,
          title: t("APPLIED DATE"),
          value: "createdOn",
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
          <ButtonClick buttonName={t("Add_Candidates")}
           handleSubmit={() => {
            setShow(true);
            console.log(true);
          }} BtnType='add' />
        </div>
      </div>
      <JobListCopy data={jobstatic}/>
      <div className=''>
        {/* <TableCopy data={jobList} header={header} path='CandidateProfile'/> */}
        <TableAnt All={true} data={jobList} header={header} path='Candidate_Profile' actionID="resumeId" jobId="jobId"/>
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