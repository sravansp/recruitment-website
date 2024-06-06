import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Checkbox } from "antd"; // Import Checkbox from antd
import Accordion from "./Accordion";

const items = [
  {
    title: "jobType",
    checkboxes: [
      { label: "Full-time", value: "Full Time" },
      { label: "Part Time", value: "Part Time" },
      { label: "Temporary", value: "temporary" },
      { label: "Intern", value: "intern" }
    ],
  },
  {
    title: "education",
    checkboxes: [
      { label: "PostGraduate", value: "PostGraduate" },
      { label: "AbovePostGraduate", value: "AbovePostGraduate" },
      { label: "Graduate", value: "Graduate" },
      { label: "SchoolLevel", value: "SchoolLevel" },
      { label: "UnderGraduate", value: "UnderGraduate" }
    ],
  },
];

const CustomDropdown = ({ filteredJobs, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [jobs, setJobs] = useState({})

  const handleCheckboxChange = (sectionTitle, checkboxValue) => {
    setSelectedFilters((prevFilters) => {
      const updatedSectionFilters = {
        ...(prevFilters[sectionTitle] || {}),
        [checkboxValue]: !prevFilters[sectionTitle]?.[checkboxValue],
      };
  
      // Remove the filter if unchecked
      if (!updatedSectionFilters[checkboxValue]) {
        delete updatedSectionFilters[checkboxValue];
      }
  
      // If no options are selected in a section, remove the section
      if (Object.keys(updatedSectionFilters).length === 0) {
        const { [sectionTitle]: deletedFilter, ...rest } = prevFilters;
        console.log("Removed all options from section:", sectionTitle);
        console.log("Updated filters:", rest);
        return rest;
      }
  
      console.log("Updated filters:", {
        ...prevFilters,
        [sectionTitle]: updatedSectionFilters,
      });
  
      return {
        ...prevFilters,
        [sectionTitle]: updatedSectionFilters,
      };
    });
  };
  
  
  
  
  

  // useEffect(() => {
  //   const filterJobs = filteredJobs.filter((job) => {
  //     // Check if each job matches all selected filters
  //     return Object.keys(selectedFilters).every((filterKey) => {
  //       const selectedOptions = selectedFilters[filterKey];
  //       const jobValue = job[filterKey];
  //       return Object.keys(selectedOptions).some((option) => selectedOptions[option] && jobValue === option);
  //     });
  //   });
  //   setJobs(filterJobs);
  //   console.log(jobs,"jobs ....");
  // }, [selectedFilters, filteredJobs]);
  // useEffect(() => {
  //   const filterJobs = filteredJobs.filter((job) => {
  //     // Check if each job matches all selected filters
  //     return Object.keys(selectedFilters).every((filterKey) => {
  //       const selectedOptions = selectedFilters[filterKey];
  //       const jobValue = job[filterKey];

  //       // Custom filtering logic for specific criteria
  //       // Custom filtering logic for specific criteria
  //       if (filterKey === "jobType" || filterKey === "education") {
  //         // Check if any selected job type matches the job's type
  //         return Object.keys(selectedOptions).some(option => selectedOptions[option] && jobValue === option);
  //       } else {
  //         // For other filter keys (e.g., "Degree"), use the previous logic
  //         return Object.keys(selectedOptions).some(option => selectedOptions[option] && jobValue === option);
  //       }
  //     });
  //   });

  //   // Merge filtered full-time and part-time jobs into a single array
  //   const fullTimeJobs = filterJobs.filter(job => job['jobType'] === 'Full Time');
  //   const partTimeJobs = filterJobs.filter(job => job['jobType'] === 'Part Time');
  //   const TemporaryJobs = filterJobs.filter(job => job['jobType'] === 'Temporary');
  //   const InternJobs = filterJobs.filter(job => job['jobType'] === 'Intern');
  //   const postgraduateJobs = filterJobs.filter(job => job['education'] === 'PostGraduate');
  //   const abovepostgraduateJobs = filterJobs.filter(job => job['education'] === '"AbovePostGraduate"');
  //   const graduateJobs = filterJobs.filter(job => job['education'] === '"Graduate"');
  //   const schoollevelJobs = filterJobs.filter(job => job['education'] === 'SchoolLevel');
  //   const undergraduateJobs = filterJobs.filter(job => job['education'] === 'UnderGraduate');
  //   const mergedJobs = [...fullTimeJobs, ...partTimeJobs, ...TemporaryJobs, ...InternJobs, ...postgraduateJobs, ...abovepostgraduateJobs, ...graduateJobs, ...schoollevelJobs, ...undergraduateJobs];

  //   if (mergedJobs.length === 0) {
  //     console.log("gggggg")
  //     setJobs(filteredJobs);
  //   } else {
  //     setJobs(mergedJobs);
  //   }
  useEffect(() => {
    const filterJobs = filteredJobs.filter((job) => {
      // Check if each job matches all selected filters
      return Object.keys(selectedFilters).every((filterKey) => {
        const selectedOptions = selectedFilters[filterKey];
        const jobValue = job[filterKey];
  
        // Custom filtering logic for specific criteria
        if (filterKey === "jobType" || filterKey === "education") {
          // Check if any selected job type matches the job's type
          return Object.keys(selectedOptions).some(option => selectedOptions[option] && jobValue === option);
        } else {
          // For other filter keys (e.g., "Degree"), use the previous logic
          return Object.keys(selectedOptions).some(option => selectedOptions[option] && jobValue === option);
        }
      });
    });
  
    // Initialize variables to hold filtered jobs by job type and education
    const filteredByJobType = {
      'Full Time': [],
      'Part Time': [],
      'Temporary': [],
      'Intern': []
    };
  
    const filteredByEducation = {
      'PostGraduate': [],
      'Above PostGraduate': [],
      'Graduate': [],
      'School Level': [],
      'UnderGraduate': []
    };
  
    // Iterate over filtered jobs and categorize them based on job type and education
    filteredJobs.forEach(job => {
      // Check if the job type exists in filteredByJobType and initialize if not
      if (!filteredByJobType[job['jobType']]) {
        filteredByJobType[job['jobType']] = [];
      }
      // Check if the education level exists in filteredByEducation and initialize if not
      if (!filteredByEducation[job['education']]) {
        filteredByEducation[job['education']] = [];
      }
      // Push the job into the corresponding arrays
      filteredByJobType[job['jobType']].push(job);
      filteredByEducation[job['education']].push(job);
    });
  
    // Merge filtered jobs by job type and education into a single array
    const mergedJobs = Object.values(filteredByJobType)
      .concat(Object.values(filteredByEducation))
      .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
  
    // Update the state based on merged jobs
    if (mergedJobs.length === 0) {
      console.log("No matching jobs found.");
      setJobs(filteredJobs);
    } else {
      setJobs(mergedJobs);
      onFilterChange(filterJobs); // Call onFilterChange here
    }
  }, [ onFilterChange]);
  

  
  // useEffect(() => {
  //   console.log(jobs, "Updated jobs");
  // }, [jobs]);

  // useEffect(() => {
  //   console.log("Selected filters:", selectedFilters); // Log selected filters
  //   // Pass selected filters to parent component whenever it changes
  //   onFilterChange(selectedFilters);
  // }, [selectedFilters, onFilterChange]);

  const menu = (
    <Menu className="p-4 min-w-[250px]">
      <Accordion
        items={items}
        checkboxes={selectedFilters}
        onCheckboxChange={handleCheckboxChange}
      />
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}  jobs={jobs}>
      <a className="ant-dropdown-link para text-[#656565] cursor-pointer">
        Filter Jobs <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default CustomDropdown;
