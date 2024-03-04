"use client";
import React, { useState, useEffect } from "react";
import JobCard from "@/Components/JobCard";
import { motion, useAnimation } from "framer-motion";
import JobDetailsCard from "@/Components/JobDetailsCard";
// SAMPLE DATA
import { jobs } from "@/Components/Data";
import ButtonClick from "@/Components/Button";
import Filter from "@/Components/Filter";

const Home = () => {
  const [selectedJobId, setSelectedJobId] = useState(1); // Default to the first job ID
  const jobDetailsAnimation = useAnimation();

  const findJobById = (id) => {
    // Logic to find job details by ID from your data
    return jobs.find((job) => job.id === id);
  };

  const [selectedJob, setSelectedJob] = useState(findJobById(selectedJobId));

  const handleJobSelect = (id) => {
    setSelectedJobId(id);
    animateJobDetails();
  };

  const animateJobDetails = () => {
    jobDetailsAnimation.start({ opacity: 0, y: 20 }).then(() => {
      jobDetailsAnimation.start({ opacity: 1, y: 0 });
    });
  };

  useEffect(() => {
    // Initial animation when component mounts
    animateJobDetails();

    // Set the default selected job
    setSelectedJob(findJobById(selectedJobId));
  }, [selectedJobId]);
  return (
    <main className="flex flex-col justify-center gap-6 pb-10 bg-white dark:bg-black scroll-smooth">
      <div className="md:h-[374px] h-full w-full bg-TopSection py-5">
        <div className="flex flex-col gap-3 px-5 pt-36 container-wrapper">
          <div>
            <h6 className="h6 text-primary">Careers</h6>
            <h1 className=" text-3xl 2xl:text-5xl font-semibold leading-[140%] text-black dark:text-white">
              Jobs
            </h1>
            <p className="para text-[#656565]">
              lorem ipsum dolar sit dummy text dolar sit lerom.
            </p>
          </div>
          <div className="searchJob rounded-[10px] bg-white w-full lg:h-[74px] p-3 flex justify-between items-center">
            <div></div>
            <ButtonClick buttonName="Search" BtnType="primary" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 container-wrapper">
        <div className="col-span-3 filter">
          <p className="para text-[#656565]"> Fitler jobs</p>
          <Filter />
        </div>
        <div className="col-span-9 filter">
          <p className="para text-[#656565]"> Sort by Relevance</p>
        </div>
      </div>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-12 gap-6 container-wrapper"
      >
        <div className="flex flex-col w-full col-span-5 gap-2.5 pr-2.5 overflow-auto h-screen">
        {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id} // Assuming your job object has an 'id' property
                {...job}
                onSelect={() => handleJobSelect(job.id)}
                selected={selectedJob && selectedJob.id === job.id}
              />
            ))}
        </div>
        <div className="w-full h-screen col-span-7 overflow-auto">
          <JobDetailsCard
            selectedJob={selectedJob}
            jobDetailsAnimation={jobDetailsAnimation}
          />
        </div>
      </motion.main>
    </main>
  );
};

export default Home;
