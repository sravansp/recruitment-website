// JobDetailsCard.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import ButtonClick from "./Button";
import TextReadMore from "./TextReadMore";
import Link from "next/link";

const JobDetailsCard = ({ selectedJob, jobDetailsAnimation }) => {
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
            <h1 className="h2">{selectedJob.jobName}</h1>
            <Link href="/login">
              <ButtonClick buttonName="Apply" BtnType="primary" />
            </Link>
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
                <p className="col-span-5 pblack">{selectedJob.role}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  location
                </p>
                <p className="col-span-4 pblack">{selectedJob.location}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  salary
                </p>
                <p className="col-span-4 pblack">{selectedJob.salary}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  experience
                </p>
                <p className="col-span-4 pblack">{selectedJob.experience}</p>
              </div>
              <div className="grid grid-cols-6">
                <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                  type
                </p>
                <p className="col-span-4 pblack">{selectedJob.type}</p>
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
            {selectedJob.otherDetails.map((others, i) => (
              <div className="p-2.5 flex flex-col gap-4" key={i}>
                <div className="grid grid-cols-6">
                  <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                    industry
                  </p>
                  <p className="col-span-5 pblack">{others.industry}</p>
                </div>
                <div className="grid grid-cols-6">
                  <p className="!font-normal !text-opacity-50 capitalize pblack col-span-1">
                    type
                  </p>
                  <p className="col-span-4 pblack">{others.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default JobDetailsCard;
