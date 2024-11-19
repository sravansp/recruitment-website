import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropup } from "react-icons/io";

function JobListCopy({ data = [] }) {
  const { t } = useTranslation();

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
    const value =
      key === "sourceDiversity"
        ? data[key].prefix + "%"
        : String(data[key].prefix);
    acc[propertyName] = value;
    return acc;
  }, []);
  
  return (
    <div className="borderb rounded-[10px] h-full md:h-[88px] bg-white dark:bg-dark p-4 md:divide-x divide-y md:divide-y-0 flex flex-col justify-between md:flex-row divide-black/10 dark:divide-white/20">
      <div className="flex flex-col justify-center gap-1.5 pl-4 py-2 md:py-0 w-full md:w-[280px]">
        <p className="para !font-normal">{t("Total_No_of_Jobs_Posted")}</p>
        <div className="flex items-center gap-2">
          <h1 className="text-xl 2xl:text-[23px] dark:text-white 2xl:leading-[140%] font-semibold">
            {result.TotalJobsPosted}
          </h1>
          <div
            className={`vhcenter px-2.5 py-1 rounded-full h-6 text-[11px] font-semibold 2xl:leading-[140%] flex items-center gap-1 border 
              "bg-[#F2FBF8] dark:bg-[#07A86D]/20 text-[#07A86D] border-[#07A86D]/10 dark:border-[#07A86D]/20"`}
            // bg-[#FEF5F5] dark:bg-[#F23131]/20 text-[#F23131] border-[#F23131]/10 dark:border-[#F23131]/20   // if red
          >
            <IoMdArrowDropup size={16} />
            {/* <IoMdArrowDropdown size={16} /> */}
            <span>+12,4%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1.5 pl-4 py-2 md:py-0 w-full md:w-[280px]">
        <p className="para !font-normal">{t("Source_Diversity")}</p>
        <div className="flex items-center gap-2">
          <h1 className="text-xl 2xl:text-[23px] dark:text-white 2xl:leading-[140%] font-semibold">
            {result.SourceDiversity}
          </h1>
          <div
            className={`vhcenter px-2.5 py-1 rounded-full h-6 text-[11px] font-semibold 2xl:leading-[140%] flex items-center gap-1 border 
              "bg-[#F2FBF8] dark:bg-[#07A86D]/20 text-[#07A86D] border-[#07A86D]/10 dark:border-[#07A86D]/20"`}
            // bg-[#FEF5F5] dark:bg-[#F23131]/20 text-[#F23131] border-[#F23131]/10 dark:border-[#F23131]/20   // if red
          >
            <IoMdArrowDropup size={16} />
            {/* <IoMdArrowDropdown size={16} /> */}
            <span>+12,4%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1.5 pl-4 py-2 md:py-0 w-full md:w-[280px]">
        <p className="para !font-normal">{t("Open_Jobs")}</p>
        <div className="flex items-center gap-2">
          <h1 className="text-xl 2xl:text-[23px] dark:text-white 2xl:leading-[140%] font-semibold">
            {result.OpenJobs}
          </h1>
          <div
            className={`vhcenter px-2.5 py-1 rounded-full h-6 text-[11px] font-semibold 2xl:leading-[140%] flex items-center gap-1 border 
              "bg-[#F2FBF8] dark:bg-[#07A86D]/20 text-[#07A86D] border-[#07A86D]/10 dark:border-[#07A86D]/20"`}
            // bg-[#FEF5F5] dark:bg-[#F23131]/20 text-[#F23131] border-[#F23131]/10 dark:border-[#F23131]/20   // if red
          >
            <IoMdArrowDropup size={16} />
            {/* <IoMdArrowDropdown size={16} /> */}
            <span>+12,4%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1.5 pl-4 py-2 md:py-0 w-full md:w-[280px]">
        <p className="para !font-normal">{t("Rejection_Average")}</p>
        <div className="flex items-center gap-2">
          <h1 className="text-xl 2xl:text-[23px] dark:text-white 2xl:leading-[140%] font-semibold">
            {result.RejectionAverage}
          </h1>
          <div
            className={`vhcenter px-2.5 py-1 rounded-full h-6 text-[11px] font-semibold 2xl:leading-[140%] flex items-center gap-1 border 
              "bg-[#F2FBF8] dark:bg-[#07A86D]/20 text-[#07A86D] border-[#07A86D]/10 dark:border-[#07A86D]/20"`}
            // bg-[#FEF5F5] dark:bg-[#F23131]/20 text-[#F23131] border-[#F23131]/10 dark:border-[#F23131]/20   // if red
          >
            <IoMdArrowDropup size={16} />
            {/* <IoMdArrowDropdown size={16} /> */}
            <span>+12,4%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1.5 pl-4 py-2 md:py-0 w-full md:w-[280px]">
        <p className="para !font-normal">{t("Hired_Count")}</p>
        <div className="flex items-center gap-2">
          <h1 className="text-xl 2xl:text-[23px] dark:text-white 2xl:leading-[140%] font-semibold">
            {result.HiredCount}
          </h1>
          <div
            className={`vhcenter px-2.5 py-1 rounded-full h-6 text-[11px] font-semibold 2xl:leading-[140%] flex items-center gap-1 border 
              "bg-[#F2FBF8] dark:bg-[#07A86D]/20 text-[#07A86D] border-[#07A86D]/10 dark:border-[#07A86D]/20"`}
            // bg-[#F23131]/10 dark:bg-[#F23131]/20 text-[#F23131] border-[#F23131]/10 dark:border-[#F23131]/20   // if red
          >
            <IoMdArrowDropup size={16} />
            {/* <IoMdArrowDropdown size={16} /> */}
            <span>+12,4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListCopy;
