"use client";
import React, { useState } from "react";
import Button from "@/Components/Button";
import JobCard from "@/Components/JobCard";
import { motion } from 'framer-motion';

const jobs = [
  {
    jobName: "Software Engineer",
    category: "IT",
    place: "City A",
    salary: "$80,000",
    timeShift: "Full-Time",
  },
  {
    jobName: "Marketing Specialist",
    category: "Marketing",
    place: "City B",
    salary: "$60,000",
    timeShift: "Part-Time",
  },
  // Add more job details as needed
];

const Home = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="md:h-[374px] h-full w-full bg-TopSection">
        <div className="flex flex-col gap-3 px-5 mx-auto pt-36 sm:container xl:max-w-screen-xl">
          <div>
            <h6 className="h6 text-primary">Careers</h6>
            <h1 className="text-5xl font-semibold leading-[140%] text-black">
              Jobs
            </h1>
            <p className="para !text-[#656565]">
              lorem ipsum dolar sit dummy text dolar sit lerom.
            </p>
          </div>
          <div className="searchJob rounded-[10px] bg-white w-full lg:h-[74px] p-3">
            <div></div>
            <Button size="large">Search</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 container-wrapper">
        <div className="w-full col-span-4">
          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => (
              <JobCard
                key={index}
                {...job}
                onSelect={() => handleJobSelect(job)}
                selected={selectedJob === job}
              />
            ))}
          </div>
        </div>
        <div className="w-full col-span-8">
          <motion.div
            className="col-span-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <div>
              {selectedJob && (
                <div>
                  <h2>Selected Job Details</h2>
                  <p>
                    <strong>Job Name:</strong> {selectedJob.jobName}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedJob.category}
                  </p>
                  <p>
                    <strong>Place:</strong> {selectedJob.place}
                  </p>
                  <p>
                    <strong>Salary:</strong> {selectedJob.salary}
                  </p>
                  <p>
                    <strong>Time Shift:</strong> {selectedJob.timeShift}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Home;
