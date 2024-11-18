/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getDashboardLiveJobs } from "../Api1";

const LiveJobs = ({ dropdown1, dataClick = () => {} }) => {
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  const [LiveJobsData, setLiveJobsData] = useState([]);
  
  const getLiveJobs = async () => {
    try {
      const response = await getDashboardLiveJobs({
        companyId: companyId,
        jobCreatedBy: null,
      });
      setLiveJobsData(response.result);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    getLiveJobs();
  }, []);

  return (
    <div className="w-full overflow-y-auto h-72 joblistDash">
      <table className="w-full">
        <thead className="text-gray-500 sticky top-0">
          <tr className="mb-2 text-xs xl:text-[9px] 2xl:text-xs uppercase rounded-l-lg bg-white sm:dark:bg-slate-800">
            <th className="p-3 font-normal text-left">Title</th>
            <th className="p-3 font-normal text-left">Locations</th>
            <th className="p-3 font-normal text-left">CVs IN PROCESS</th>
            <th className="p-3 font-normal text-left">Hires Required</th>
            <th className="p-3 font-normal text-left">Salary Range From</th>
            <th className="p-3 font-normal text-left">Salary Range To</th>
            <th className="p-3 font-normal text-left">Currency</th>
          </tr>
        </thead>
        <tbody>
          {LiveJobsData.map((item, i) => (
            <tr
              key={i}
              className="text-xs xl:text-[9px] 2xl:text-sm dark:text-white mb-2 flex-no-wrap sm:table-row sm:mb-0 hover:bg-slate-600/5"
            >
              <td className="p-3">{item.jobTitle}</td>
              <td className="p-3 truncate">{item.location}</td>
              <td className="p-3 truncate">{item.cvInProcess}</td>
              <td className="p-3 truncate">{item.noOfVaccancies}</td>
              <td className="p-3 truncate">{item.salaryRangeFrom}</td>
              <td className="p-3 truncate">{item.salaryRangeTo}</td>
              <td className="p-3 truncate">{item.salaryCurrency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveJobs;
