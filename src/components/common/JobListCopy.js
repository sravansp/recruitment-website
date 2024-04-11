import React, { useEffect, useState } from 'react'
import { getAllRecruitmentJobs } from '../Api1';

function  JobListCopy({data = [],}  ) {
  const [JobsList, setJobList] = useState([]);
  const [activeJobs, setActiveJobs] = useState(0);
  console.log(data)

    // const data = [
    //     {
    //       Total_number_of_jobs_posted: [
    //         {
    //           prefix:"",
    //           suffix:"",
    //           isPositive:"",
    //           message:"",
    //       }

    //       ],
    //       Source_diversity:  [
    //         {
    //           prefix:"",
    //           suffix:"",
    //           isPositive:"",
    //           message:"",
    //       }

    //       ],
    //       open_jobs:  [
    //         {
    //           prefix:"",
    //           suffix:"",
    //           isPositive:"",
    //           message:"",
    //       }

    //       ],
    //       rejection_average:  [
    //         {
    //           prefix:"",
    //           suffix:"",
    //           isPositive:"",
    //           message:"",
    //       }

    //       ],
    //       hired_count:  [
    //         {
    //           prefix:"",
    //           suffix:"",
    //           isPositive:"",
    //           message:"",
    //       }

    //       ],
    //     },
    //   ];

      // const openJobs = () => {
      //   return JobsList.filter(job => job.isActive == 1).length;
      // };
      const result = Object.keys(data).reduce((acc, key) => {
        const propertyName = key.charAt(0).toUpperCase() + key.slice(1);
        const value = key === "sourceDiversity" ? data[key].prefix + "%" : String(data[key].prefix);
        acc[propertyName] = value;
        return acc;
    }, []);
      console.log(result)
  return (
    <div>
    <div className="w-full  rounded-sm h-24 sm:w-full ">
    
     <div className="bg-white rounded-md borderb  p-4 flex dark:bg-black dark:text-white h-24">
       <div className="flex items-center w-1/5 sm:w-1/5">
         <div className="ml-4">
           <p className="para">Total No of Jobs Posted</p>
           <h1 className="h1 mt-4">
             <b>{result.TotalJobsPosted}</b>
           </h1>
         </div>
       </div>
       <div className="h-divider !border-gray-300 ml-12"></div>
       <div className="flex items-center w-1/5 sm:w-1/5">
         <div className="ml-4">
           <p className="para">Source Diversity</p>
           <h1 className="h1 mt-4">
             <b>{result.SourceDiversity}</b>
           </h1>
         </div>
       </div>
       <div className="h-divider !border-gray-300 ml-12"></div>
       <div className="flex items-center w-1/5 sm:w-1/5">
         <div className="ml-4">
           <p className="para">Open Jobs</p>
           <h1 className="h1 mt-4">
             <b>{result.OpenJobs}</b>
           </h1>
         </div>
       </div>
       <div className="h-divider !border-gray-300 ml-12"></div>
       <div className="flex items-center w-1/5 sm:w-1/5">
         <div className="ml-4">
           <p className="para">Rejection Average</p>
           <h1 className="h1 mt-4">
             <b>{result.RejectionAverage}</b>
           </h1>
         </div>
       </div>
       <div className="h-divider !border-gray-300 ml-12"></div>
       <div className="flex items-center w-1/5 sm:w-1/5">
         <div className="ml-4">
           <p className="para">Hired Count</p>
           <h1 className="h1 mt-4">
             <b>{result.HiredCount}</b>
           </h1>
         </div>
       </div>
     </div>
    
 </div>
</div>
  )
}

export default JobListCopy