"use client";
import { getRecruitmentJobById } from "@/Components/Api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function Header1({closeDrawer,selectedJobId,jobid}) {
  const [job,setjob]=useState([])
// console.log(selectedJobId,"id")
useEffect(() => {
 const fetchdata=async()=>{
  try{
    const response= await getRecruitmentJobById(jobid)
    console.log(response.result,"response");
    const data = response.result
    setjob(data)
    console.log(data,"dataaaa")
    console.log(job,"resulttt");
    console.log(data[0].jobTitle,"jobtitlee");

   }
   catch(error){
    console.error(error,"error")
   }
  }
 
 fetchdata()
}, [jobid])


useEffect(() => {
  console.log(job, "Updated job state"); // Log the updated job state whenever it changes
  console.log(job.jobTitle,"job tiylee")
}, [job]);

  return (
    <div >
    <div className="bg-white flex items-center     dark:bg-black dark:text-white h-[65px] w-full">
      <div className="flex mt-3 ml-5 float-end ">
      <button onClick={closeDrawer} className="rounded-full  size-9 borderb vhcenter text-primary">
          {/* <span className="inset-0 flex items-center justify-center bg-white rounded-md "> */}
            {/* <span className="flex items-center justify-center w-[35px] h-[36px]  rounded-full border-[1px]  bg-[#FAFAFA]"> */}
              <FaArrowLeft size={15}/>
            {/* </span> */}
          {/* </span> */}
       </button>
        {/* <button className="w-16 border-2 border-#FDFDFD  rounded-md  text-primary mt-10 text-sm font-semibold ">
          <b>Edit</b>
        </button> */}

        <div className="h-divider" />
        {job.map((data,index)=>(

       
        <div className="flex-auto min-w-0 ml-5">
          <p className="text-sm font-semibold font-Inter] leading-6 text-gray-900 dark:text-white">
            {/* Head of Director{" "} */}
            {data.jobTitle}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500 truncate dark:text-gray-300">
            at {data.location}
          </p>
        </div>
         ))}
      </div>
      
    </div>
    <div className="mt-4 divider-h"/>
    </div>
  );
}

export default Header1;
