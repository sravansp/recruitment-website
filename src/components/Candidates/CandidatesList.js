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


const CandidatesList = () => {
  const [jobList,setJobList]=useState([])
  const [show, setShow] = useState(false);
  const [openPop, setOpenPop] = useState("");
  const [updateId, setUpdateId] = useState("");
  const[jobId,setJobId]=useState(null)
  const header = [
    {
      CandidateProfile: [
        {
          id: 1,
          title: "NAME",
          value: "candidateName",
        },
        {
          id: 2,
          title: "CONTACT",
          value: "candidateContact",
        },
        {
          id: 3,
          title: "JOB",
          value: "jobDetail",
        },

        {
          id: 4,
          title: "STAGE",
          value: "candidateStage",
         
        },
        {
          id: 5,

          title: "SOURCE",
          value: "candidateSource",
         
        },
        {
          id: 6,
          title: "APPLIED DATE",
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
  return (
    <div className="flex flex-col gap-[25px]">
      <div className='flex justify-between'>
        <Heading
          title="Candidates"
          description=" Lorem ipsum Lorem ipsum Lorem ipsum. "/>
           <div className="flex gap-4">
          {" "}
          <Link className="flex gap-2 mt-2">
            <span className="!text-primary para">View career page</span>{" "}
            <PiArrowSquareOut size={15} className="dark:text-white" />
          </Link>
          <ButtonClick buttonName={"Add Candidates"}
           handleSubmit={() => {
            setShow(true);
            console.log(true);
          }} BtnType='add' />
        </div>
      </div>
      <JobListCopy data={jobstatic}/>
      <div className=''>
        {/* <TableCopy data={jobList} header={header} path='CandidateProfile'/> */}
        <TableAnt data={jobList} header={header} path='CandidateProfile' actionID="resumeId" jobId="jobId"/>
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