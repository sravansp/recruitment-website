// JobDetailsCard.js
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ButtonClick from "./Button";
import TextReadMore from "./TextReadMore";
import Link from "next/link";
import { Drawer } from "antd";
import Web from "@/app/Form/page";

const JobDetailsCard = ({ selectedJob, jobDetailsAnimation }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedJobIdForApply, setSelectedJobIdForApply] = useState(null);

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  // Function to handle closing the drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
    window.location.reload();
  };
  const handleApply = (jobId) => {
    setSelectedJobIdForApply(jobId);
    console.log(selectedJobIdForApply, "hjvgvh");
    openDrawer();
  };
  // const handleApply = () => {

  //   if (selectedJob) {
  //     // Navigate to the apply page with the selected job ID
  //     window.location.href = `/Form?jobId=${selectedJob.jobId}`;
  //     // const result = selectedJob.jobId

  //   }
  // };
  console.log(selectedJob);
  return (

    <motion.div
      // initial={{ opacity: 0, y: 20 }}
      // animate={jobDetailsAnimation}
      // exit={{ opacity: 0, y: -20 }}
      // transition={{ duration: 0.4 }}
      // initial={{ opacity: 0, y: 20, duration: 0.2 }}
      animate={jobDetailsAnimation}
      transition={{ duration: 0.2 }}
    >
      {selectedJob && (
        <div className="flex flex-col gap-2.5 2xl:gap-4">
          <div className="flex items-center justify-between">
            <h1 className="h2">{selectedJob.jobTitle}</h1>
            {/* <Link href="/login"> */}
            <ButtonClick buttonName="Apply" BtnType="primary" handleSubmit={() => handleApply(selectedJob.jobId)} />
            {/* </Link> */}
          </div>
          <div className="flex flex-col gap-2.5 2xl:gap-4 Overview">
            <div className="bg-[#f2f0fd] dark:bg-[#4a4a4a] p-2.5 rounded-md">
              <h3 className="pblack">Overview</h3>
            </div>
            <div className="p-2.5 flex flex-col gap-2.5 2xl:gap-4">
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  Role
                </p>
                <p className="col-span-5 pblack">{selectedJob.jobTitle}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  location
                </p>
                <p className="col-span-4 pblack">{selectedJob.location}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  salary range
                </p>
                {selectedJob.isSalaryPublic=="t"? (
                <p className="col-span-4 pblack">{selectedJob.salaryCurrency + " "}{selectedJob.salaryRangeFrom}-{selectedJob.salaryRangeTo}</p>
                ):(
                  <p className="col-span-4 pblack">N/L</p>
                )}
                </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  experience
                </p>
                <p className="col-span-4 pblack"> {selectedJob.experience.replace(/([a-z])([A-Z])/g, '$1 $2')}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                 Job type
                </p>
                <p className="col-span-4 pblack">{selectedJob.jobType}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 2xl:gap-4 Overview">
            <div className="bg-[#f2f0fd] dark:bg-[#4a4a4a] p-2.5 rounded-md">
              <h3 className="pblack">Job Description</h3>
            </div>
            <div className="p-2.5 flex flex-col gap-2.5 2xl:gap-4">
              <TextReadMore text={selectedJob.jobDescription} length={1000} />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 2xl:gap-4 Overview">
            <div className="bg-[#f2f0fd] dark:bg-[#4a4a4a] p-2.5 rounded-md">
              <h3 className="pblack">Other Details</h3>
            </div>
            {/* {selectedJob ( */}
            <div className="p-2.5 flex flex-col gap-4" >
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  Education
                </p>
                <p className="col-span-4 pblack">{selectedJob.education.replace(/([a-z])([A-Z])/g, '$1 $2')}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  Status
                </p>
                <p className="col-span-5 pblack">{selectedJob.jobStatus}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  Requirement Type
                </p>
                <p className="col-span-4 pblack">{selectedJob.requirementType}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  Location type
                </p>
                <p className="col-span-4 pblack">{selectedJob.workLocationType}</p>
              </div>
            </div>
            {/* )} */}
          </div>
          <Drawer
            placement="right"
            closable={false}
            onClose={closeDrawer}
            visible={drawerVisible}
            width="100%" // Adjust the width as needed
            height="100%"
            
            wrapperBodyStyle={{ backgroundColor: "#F8FAFC" }}
            
            className="ant-drawer-body"
            


          >

            <Web closeDrawer={closeDrawer} selectedJobId={selectedJobIdForApply} selectedJob />
            
          </Drawer>
        </div>
      )}
    </motion.div>

  );
};

export default JobDetailsCard;
