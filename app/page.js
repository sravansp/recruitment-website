"use client";
import React, { useState, useEffect } from "react";
import JobCard from "@/Components/JobCard";
import { motion, useAnimation } from "framer-motion";
import JobDetailsCard from "@/Components/JobDetailsCard";
// SAMPLE DATA
import { jobs } from "@/Components/Data";
import ButtonClick from "@/Components/Button";
import Filter from "@/Components/Filter";
import Sorting from "@/Components/Sorting";
import SearchBox from "@/Components/SearchBox";
import { PiMagnifyingGlass, PiNavigationArrow } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const [selectedJobId, setSelectedJobId] = useState(1); // Default to the first job ID
  const jobDetailsAnimation = useAnimation();
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

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
        <div className="flex flex-col gap-3 px-5 pt-16 md:pt-36 container-wrapper">
          <div>
            <h6 className="h6 text-primary">Careers</h6>
            <h1 className=" text-3xl 2xl:text-5xl font-semibold leading-[140%] text-black dark:text-white">
              Jobs
            </h1>
            <p className="para text-[#656565]">
              lorem ipsum dolar sit dummy text dolar sit lerom.
            </p>
          </div>
          <div className="searchJob rounded-[10px] bg-white dark:bg-secondaryDark w-full lg:h-full p-3 flex gap-3 justify-between items-center flex-col md:flex-row md:divide-x divide-y md:divide-y-0">
            <SearchBox
              placeholder="Job title or keyword"
              items={jobs.map((job) => job.jobName)}
              icon={<PiMagnifyingGlass className="text-2xl " />}
            />
            <SearchBox
              placeholder="Location or Timezone"
              className="pt-3 md:pl-6 md:pt-0"
              items={jobs.map((job) => job.location)}
              icon={<PiNavigationArrow className="text-2xl " />}
            />
            <div className="flex items-center w-full gap-4 pt-3 md:w-auto md:pl-6 md:pt-0">
              <p className="para text-[#656565] hidden md:block cursor-pointer">
                Clear
              </p>
              <ButtonClick
                buttonName="Search"
                BtnType="primary"
                className="w-full md:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid items-center w-full grid-cols-12 container-wrapper">
        <div className="col-span-6 md:col-span-3">
          {/* <p className="para text-[#656565]"> Fitler jobs</p> */}
          <Filter />
        </div>
        <div className="col-span-6 md:col-span-9">
          <div className="flex gap-1">
            <p className="para text-[#656565]"> Sort by</p>
            <Sorting />
          </div>
        </div>
      </div>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid w-full grid-cols-12 gap-6 container-wrapper"
      >
        <div className="flex flex-col w-full col-span-12 md:col-span-5 gap-2.5 md:pr-2.5 overflow-auto md:h-screen">
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
        <div className="hidden w-full h-screen overflow-auto md:col-span-7 md:block">
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
