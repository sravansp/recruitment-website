import React, { useEffect,useState } from "react";
import {LiveJobsData} from "../common/DataArrays"  
import { getDashboardAgeOfJobs } from "../Api1";

const AgeOfJobs = () => {

  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId")); 
  const[LiveJobsData,setLiveJobsData]=useState([])
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    
  }, []);
 const getAgeofJobs = async()=>{
  try{
    const response = await getDashboardAgeOfJobs({
      companyId:companyId,
      jobCreatedBy:null
    })
    console.log(response)
    setLiveJobsData(response.result)


  }catch(error)
  {
    console.log(error)
  }
 }

 useEffect(()=>{
  getAgeofJobs()
 },[])
  return (
    <div className="w-full overflow-y-auto h-72 joblistDash">
      <table className="flex flex-row flex-no-wrap w-full">
        <thead className="text-gray-500">
        
            <tr
              className="flex flex-col mb-2 text-xs xl:text-[9px] 2xl:text-xs uppercase rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0 bg-primaryalpha/10 dark:bg-white/20 sm:bg-transparent dark:sm:bg-transparent sm:sticky sm:top-0 sm:bg-white sm:dark:bg-slate-800"
         
            >
              <th className="p-3 font-normal text-left">Title</th>
              <th className="p-3 font-normal text-left">Locations</th>
              <th className="p-3 font-normal text-left">Age Of Job Created</th>
              <th className="p-3 font-normal text-left">Hires Required</th>
              <th className="p-3 font-normal text-left">Created On</th>
              
            </tr>
     
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {LiveJobsData.map((item, index) => (
            <tr
              key={index}
              className="flex flex-col text-xs xl:text-[9px] 2xl:text-sm dark:text-white mb-2 flex-no wrap sm:table-row sm:mb-0 hover:bg-slate-600/5"
            >
              <td className="p-3">{item.jobTitle}</td>
              <td className="p-3 truncate">{item.location}</td>
              <td className="p-3 truncate">{item.ageOfOpenJobsSinceCreation}</td>
              <td className="p-3 truncate">{item.noOfVaccancies}</td>
              <td className="p-3 truncate">{item.createdOn}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgeOfJobs;
