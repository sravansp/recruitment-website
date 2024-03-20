"use client";
import { useRouter } from "next/navigation";
import { jobs } from "@/Components/Data";
import JobDetailsCard from "@/Components/JobDetailsCard";
import { useParams } from "next/navigation";
const JobDetailsPage = () => {
  const router = useRouter();
    
  const params = useParams();
  console.log(params.id); // Correctly accessing the ID from URL parameters
  const selectedJob = jobs.find((job) => job.id === parseInt(params.id));
  if (!selectedJob) {
    // Handle case where job ID is not found
    return <div>Job not found</div>;
  }
  //

  return (
    <div className="flex flex-col gap-4 dark:bg-black">
      <div className="md:h-[288px] h-full w-full bg-TopSection py-5">
        <div className="flex flex-col gap-3 px-5 pt-16 md:pt-24 container-wrapper">
          <div>
            <h6 className="h6 text-primary">Careers</h6>
            <h1 className=" text-3xl 2xl:text-5xl font-semibold leading-[140%] text-black dark:text-white">
              Job Details
            </h1>
            <p className="para text-[#656565]">
              lorem ipsum dolar sit dummy text dolar sit lerom.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full container-wrapper">
        <h1>{params}</h1>
        <JobDetailsCard selectedJob={selectedJob} />
      </div>
    </div>
  );
};

export default JobDetailsPage;
