/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getDashboardAgeOfJobs } from "../Api1";

const AgeOfJobs = () => {
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [liveJobsData, setLiveJobsData] = useState([]);

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  const getAgeofJobs = async () => {
    try {
      const response = await getDashboardAgeOfJobs({
        companyId: companyId,
        jobCreatedBy: null,
      });
      setLiveJobsData(response.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAgeofJobs();
  }, []);

  return (
    <div className="w-full overflow-y-auto h-72 joblistDash">
      <table className="w-full">
        <thead className="text-gray-500 sticky top-0">
          <tr className="mb-2 text-xs xl:text-[9px] 2xl:text-xs uppercase rounded-l-lg bg-white sm:dark:bg-slate-800">
            <th className="p-3 font-normal text-left">Title</th>
            <th className="p-3 font-normal text-left">Locations</th>
            <th className="p-3 font-normal text-left">Age Of Job Created</th>
            <th className="p-3 font-normal text-left">Hires Required</th>
            <th className="p-3 font-normal text-left">Created On</th>
          </tr>
        </thead>
        <tbody>
          {liveJobsData.map((item, i) => (
            <tr
              key={i}
              className="text-xs xl:text-[9px] 2xl:text-sm dark:text-white mb-2 flex-no wrap sm:table-row sm:mb-0 hover:bg-slate-600/5"
            >
              <td className="p-3">{item.jobTitle}</td>
              <td className="p-3 truncate">{item.location}</td>
              <td className="p-3 truncate">
                {item.ageOfOpenJobsSinceCreation}
              </td>
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
