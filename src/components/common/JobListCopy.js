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
    return (
      <div>
      <div className="w-full  rounded-sm h-24 sm:w-full ">
        
          <div className="bg-white rounded-md borderb  p-4 flex dark:bg-black dark:text-white h-24" >
          {Object.keys(data).map((key, index) => (
              <React.Fragment key={key}>
                <div className="flex items-center w-1/5 sm:w-1/5">
                  <div className="ml-4">
                    <p className="para">{key}</p>
                    <h1 className="h1 mt-4">
                      
                        <React.Fragment >
                           <b>{data[key].prefix}</b>
                           {/* <b>{data[key].suffix}</b> */}
                           <b>{data[key].isPositive}</b>
                           <b>{data[key].message}</b>
                        </React.Fragment>
                   
                    </h1>
                  </div>
                </div>
                {index < Object.keys(data).length - 1 && <div className="h-divider !border-gray-300 ml-12"></div>}
              </React.Fragment>
            ))}
          </div>
     
      </div>
    </div>
    )
  }

  export default JobListCopy