import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

const JobsList = () => {
  const arr = [
    {
      job_name: "Marketing Executive",
      count: "250",
      way: "General",
      date: "Jan 12,2024",
      mode: "Remote",
      location: "Dubai",
      customer_name: "abc",
    },
    {
      job_name: "Marketing Executive",
      count: "250",
      way: "General",
      date: "Jan 12,2024",
      mode: "Remote",
      location: "Dubai",
      customer_name: "abc",
    },
    {
      job_name: "Marketing Executive",
      count: "250",
      way: "General",
      date: "Jan 12,2024",
      mode: "Remote",
      location: "Dubai",
      customer_name: "abc",
    },
    {
      job_name: "Marketing Executive",
      count: "250",
      way: "General",
      date: "Jan 12,2024",
      mode: "Remote",
      location: "Dubai",
      customer_name: "abc",
    },
    {
      job_name: "Marketing Executive",
      count: "250",
      way: "General",
      date: "Jan 12,2024",
      mode: "Remote",
      location: "Dubai",
      customer_name: "abc",
    },
    {
      job_name: "Marketing Executive",
      count: "250",
      way: "General",
      date: "Jan 12,2024",
      mode: "Remote",
      location: "Dubai",
      customer_name: "abc",
    },
  ];
  return (
    <div className="w-full mt-12 rounded-sm h-auto sm:w-full sm:h-auto ">
      {arr.map((data, index) => (
        <div className="bg-white rounded-md shadow-md m-4 p-4 flex dark:bg-black dark:text-white">
          <div key={index} className="flex items-center">
            <p className="h1 mt-2 mr-4 sm:mr-8 lg:mr-16 xl:mr-24">
              {data.job_name}
            </p>
            <div className="font-small mt-2 flex items-center mr-4 sm:mr-8 lg:mr-16 xl:mr-36">
              <GrGroup className="mr-2" />
              <p>{data.count}</p>
            </div>
            <p className="font-small mt-2 mr-4 sm:mr-8 lg:mr-16 xl:mr-24">
              {data.way}
            </p>
            <div className="font-small mt-2 flex items-center mr-4 sm:mr-8 lg:mr-16 xl:mr-32">
              <CiLocationOn className="mr-2" />
              <p>{data.date}</p>
            </div>
            <p className="font-small mt-2 mr-4 sm:mr-8 lg:mr-16 xl:mr-24">
              {data.mode}
            </p>
            <div className="font-small mt-2 flex items-center mr-4 sm:mr-8 lg:mr-16 xl:mr-32">
              <CiLocationOn className="mr-2" />
              <p>{data.location}</p>
            </div>
            <p class="para font-small mt-2 mr-32">{data.customer_name}</p>
          </div>
          <button className="relative inline-flex items-right px-4 py-2 border border-gray-300 shadow-sm bg-white text-lg font-medium text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none mr-4 sm:mr-8 lg:mr-16 xl:mr-24 dark:bg-black dark:text-white mt-5 ml-16 ">
            <span>
              <BsThreeDots />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
