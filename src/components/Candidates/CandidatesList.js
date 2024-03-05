import React, { useEffect, useState } from 'react'
import Heading from '../common/Heading'
import { PiArrowSquareOut } from 'react-icons/pi'
import ButtonClick from '../common/Button'
import { Link } from 'react-router-dom'
import JobListCopy from '../common/JobListCopy'
import TableAnt from '../common/TableAnt'
import TableCopy from '../common/TableCopy'
import { getAllRecruitmentResumes } from '../Api1'

const CandidatesList = () => {
  const [jobList,setJobList]=useState([])
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
        
        {
          id: 7,
          title: "",
          value: "action",
          dotsVertical: true,
        },
      ],
    },
  ];
  useEffect(() => {
    const callapi = async () => {
      try {
        
        const response = await getAllRecruitmentResumes();
        console.log(response.result);
        setJobList(response.result);

        // setTableData(response.data);
        // console.log(response.data); // Access response data
      } catch (error) {
        console.error(error); // Handle errors
      }
    };

    callapi();
  }, []);
  console.log(jobList)
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
          <ButtonClick buttonName={"Add Candidates"} BtnType='add' />
        </div>
      </div>
      <JobListCopy/>
      <div className=''>
        {/* <TableCopy data={jobList} header={header} path='CandidateProfile'/> */}
        <TableAnt data={jobList} header={header} path='CandidateProfile' actionID="resumeId"/>
      </div>
    </div>
  )
}

export default CandidatesList