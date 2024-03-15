import React from "react";

const LiveJobs = () => {

    const data = [
        { title: 'All Jobs', Locations: 'Dubai' , CVsINPROCESS: '10', HiresRequired: '10', JOBonWebsite: '10', Salary: '10' },
      ];
  return (
    <div className="w-full">
       <table className="flex flex-row flex-no-wrap w-full sm:bg-white">
      <thead className="text-gray-500">
      {data.map((item, index) => (
        <tr className="flex flex-col mb-2 text-xs uppercase rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0">
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
        {data.map((item, index) => (
          <tr key={index} className="flex flex-col mb-2 flex-no wrap sm:table-row sm:mb-0">
            <td className="p-3 hover:bg-gray-100">{item.title}</td>
            <td className="p-3 truncate hover:bg-gray-100">{item.Locations}</td>
            <td className="p-3 truncate hover:bg-gray-100">{item.CVsINPROCESS}</td>
            <td className="p-3 truncate hover:bg-gray-100">{item.HiresRequired}</td>
            <td className="p-3 truncate hover:bg-gray-100">{item.JOBonWebsite}</td>
            <td className="p-3 truncate hover:bg-gray-100">{item.Salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default LiveJobs;
