"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import JobCard from "@/Components/JobCard";
import JobDetailsCard from "@/Components/JobDetailsCard";
import ButtonClick from "@/Components/Button";
import Filter from "@/Components/Filter";
import Sorting from "@/Components/Sorting";
import SearchBox from "@/Components/SearchBox";
import { PiMagnifyingGlass, PiNavigationArrow } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jobs } from "@/Components/Data";
import { getAllRecruitmentJobs, getRecruitmentJobById } from "@/Components/Api";

const Home = () => {
  const [selectedJobId, setSelectedJobId] = useState(1);
  const [selectedJob, setSelectedJob] = useState(); // Change to null
  const [JobsList, setJobList] = useState([]);
  const [searchJobTitle, setSearchJobTitle] = useState();
  const [searchJobLocation, setSearchJobLocation] = useState();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const jobDetailsAnimation = useAnimation();
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const router = useRouter();
  console.log(setSearchJobTitle);
  // Function to find job by id
  useEffect(() => {
    const newSelectedJob = findJobById(selectedJobId);
    setSelectedJob(newSelectedJob);
  }, [selectedJobId, JobsList]);

  // Function to find job by id
  const findJobById = (jobId) => {
    return JobsList.find((job) => job.jobId === jobId); // Use jobId instead of id
  };

  const animateJobDetails = () => {
    jobDetailsAnimation.start({ opacity: 0, y: 20 }).then(() => {
      jobDetailsAnimation.start({ opacity: 1, y: 0 });
    });
  };

  useEffect(() => {
    const callapi = async () => {
      try {
        const response = await getAllRecruitmentJobs();
        setJobList(response.result);
        console.log(setJobList, "joblist dataa");
        setFilteredJobs(response.result);
      } catch (error) {
        console.error(error);
      }
    };
    callapi();
  }, []);

  const handleSearch = async () => {
    console.log("Searching...");
    try {
      const response = await getAllRecruitmentJobs();
      const allJobs = response.result;
      console.log(allJobs, "data of jobs");
      const filteredJobs = allJobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchJobTitle.toLowerCase()) &&
          job.location.toLowerCase().includes(searchJobLocation.toLowerCase())
      
        // JSON.parse(job.searchKeywords).some(keyword =>
        //   keyword.toLowerCase().includes(searchJobTitle.toLowerCase())
      );
      console.log("Search title:", searchJobTitle);
      console.log("Search location:", searchJobLocation);
      console.log("Filtered jobs:", filteredJobs);
      setFilteredJobs(filteredJobs); // Update the filtered jobs state
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Search title:", searchJobTitle);
  useEffect(() => {
    try {
      animateJobDetails();
    } catch (error) {
      console.error("Error in controls.start:", error);
    }
  }, [jobDetailsAnimation]);

  // Update selectedJob directly with the new selected job
  useEffect(() => {
    const newSelectedJob = findJobById(selectedJobId);
    setSelectedJob(newSelectedJob);
  }, [selectedJobId, JobsList]);

  const handleClear = () => {
    setSearchJobTitle("");
    setSearchJobLocation("");
    setFilteredJobs(JobsList);
  };

  return (
    <main className="flex flex-col justify-center gap-6 pb-10 scroll-smooth">
      <div className="md:h-[288px] xl:h-[300px] h-full w-full bg-TopSection py-5">
        <div className="flex flex-col gap-3 px-5 pt-16 md:pt-24 container-wrapper">
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
              items={JobsList.map((job) => job.jobTitle)}
              icon={<PiMagnifyingGlass className="text-2xl " />}
              onItemSelected={setSearchJobTitle}
            />
            <SearchBox
              placeholder="Location or Timezone"
              className="pt-3 md:pl-6 md:pt-0"
              items={JobsList.map((job) => job.location)}
              icon={<PiNavigationArrow className="text-2xl " />}
              onItemSelected={setSearchJobLocation}
            />
            <div className="flex items-center w-full gap-4 pt-3 md:w-auto md:pl-6 md:pt-0">
              <p
                className="para text-[#656565] hidden md:block cursor-pointer "
                onClick={() => handleClear()}
              >
                Clear
              </p>
              <ButtonClick
                buttonName="Search"
                BtnType="primary"
                className="w-full md:w-auto"
                handleSubmit={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid items-center w-full grid-cols-12 container-wrapper">
        <div className="col-span-6 md:col-span-3">
          <Filter />
        </div>
        <div className="col-span-6 md:col-span-9">
          <div className="flex gap-1">
            <p className="para text-[#656565]"> Sort by</p>
            <Sorting />
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid w-full grid-cols-12 gap-6 container-wrapper"
      >
        <div className="flex flex-col w-full col-span-12 md:col-span-5 gap-2.5 md:pr-2.5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.jobId}
                id={job.jobId}
                {...job}
                onSelect={() => setSelectedJobId(job.jobId)}
                selected={selectedJob && selectedJob.jobId === job.jobId}
              />
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
        <div className="sticky top-[1rem] hidden w-full h-[96vh] overflow-auto md:col-span-7 md:block p-3 rounded-lg borderb">
          <JobDetailsCard
            selectedJob={selectedJob}
            jobDetailsAnimation={jobDetailsAnimation}
          />
        </div>
      </motion.div>
    </main>
  );
};

export default Home;
