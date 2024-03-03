import React, { useEffect, useState } from 'react'
import { getAllRecruitmentJobs } from '../Api1';

function JobListCopy() {
  const [JobsList, setJobList] = useState([]);
  const [activeJobs, setActiveJobs] = useState(0);

    const data = [
        {
          Total_number_of_jobs_posted: "3612",
          Source_diversity: "35%",
          open_jobs: "80",
          rejection_average: "19320",
          hired_count: "152",
        },
      ];
      useEffect(() => {
        const callapi = async () => {
          try {
           
            const data1 = await getAllRecruitmentJobs();
            console.log(data1.result);
            setJobList(data1.result);
            const activeJobs = data1.result.filter(job => job.isActive === 1);
            setActiveJobs(activeJobs.length);
            
          } catch (error) {
            console.error(error); // Handle errors
          }
        }
    
        callapi();
      }, []);
      // const openJobs = () => {
      //   return JobsList.filter(job => job.isActive == 1).length;
      // };
  return (
    <div>
         <div className="w-full  rounded-sm h-24 sm:w-full ">
        {data.map((data) => (
          <div className="bg-white rounded-md borderb  p-4 flex dark:bg-black dark:text-white h-24">
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Total No of Jobs Posted</p>
                
                <h1 className="h1 mt-4">
                <b>{JobsList.length}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Source Diversity</p>
                <h1 className="h1 mt-4">
                  <b>{data.Source_diversity}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Open Jobs</p>
                <h1 className="h1 mt-4">
                  <b>{activeJobs}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Rejection Average</p>
                <h1 className="h1 mt-4">
                  <b>{data.rejection_average}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Hired Count</p>
                <h1 className="h1 mt-4">
                  <b>{data.hired_count}</b>
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobListCopy