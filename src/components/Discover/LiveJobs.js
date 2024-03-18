import React from "react";
import { LiveJobsData } from "../common/DataArrays";

const LiveJobs = ({ dropdown1, dataClick = () => {} }) => {
  return (
    <div className="w-full h-72 overflow-y-auto joblistDash">
      <table className="flex flex-row flex-no-wrap w-full">
        <thead className="text-gray-500">
          {LiveJobsData.map((item, index) => (
            <tr
              className="flex flex-col mb-2 text-xs xl:text-[9px] 2xl:text-xs uppercase rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0 bg-primaryalpha/10 dark:bg-white/20 sm:bg-transparent dark:sm:bg-transparent"
              key={index}
            >
              <th className="p-3 font-normal text-left">Title</th>
              <th className="p-3 font-normal text-left">Locations</th>
              <th className="p-3 font-normal text-left">CVs IN PROCESS</th>
              <th className="p-3 font-normal text-left">Hires Required</th>
              <th className="p-3 font-normal text-left">JOB on Website</th>
              <th className="p-3 font-normal text-left">Salary</th>
            </tr>
          ))}
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {LiveJobsData.map((item, index) => (
            <tr
              key={index}
              className="flex flex-col text-xs xl:text-[9px] 2xl:text-sm dark:text-white mb-2 flex-no wrap sm:table-row sm:mb-0 hover:bg-slate-600/5"
            >
              <td className="p-3">{item.title}</td>
              <td className="p-3 truncate">{item.Locations}</td>
              <td className="p-3 truncate">{item.CVsINPROCESS}</td>
              <td className="p-3 truncate">{item.HiresRequired}</td>
              <td className="p-3 truncate">{item.JOBonWebsite}</td>
              <td className="p-3 truncate">{item.Salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveJobs;
