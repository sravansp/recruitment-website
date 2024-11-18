/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { PiChartBar } from "react-icons/pi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import PieChartWithLegends from "./PieChart";
import FrequencyBarChart from "./FrequencyBarChart";
import InterviewSchedules from "./InterviewSchedules";
import LiveJobs from "./LiveJobs";
import ActiveEmployees from "./ActiveEmployees";
import AgeOfJobs from "./AgeOfJobs";
import NewApplicants from "./NewApplicants";
import AgeDistribution from "./AgeDistribution";
import { getDashboardStaticDatas } from "../Api1";
import TinyLineChart from "./TinyLineChart";

const Discover = () => {
  const [Name, setName] = useState("");

  const [value, setValue] = useState(null);

  const [value1, setValue1] = useState(null);

  const [SmallCard, setsmallCard] = useState([]);

  useEffect(() => {
    const loginDataString = localStorage.getItem("LoginData");
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      const { firstName, lastName } = loginData.userData;
      const fullName = `${firstName} ${lastName}`;
      setName(fullName);
    }
  }, []);

  const dropdown1 = [
    {
      id: 1,
      label: "Any Time",
      value: "anytime",
    },
    {
      id: 2,
      label: "Yesterday",
      value: "yesterday",
    },
    {
      id: 3,
      label: "Last 7 Days",
      value: "last7days",
    },
    {
      id: 4,
      label: "Last 30 Days",
      value: "last30days",
    },
    {
      id: 5,
      label: "Last 90 Days",
      value: "last90days",
    },
  ];

  const dropdown2 = [
    {
      id: 1,
      label: "All Users",
      value: "allusers",
    },
    {
      id: 2,
      label: "Employees",
      value: "employees",
    },
    {
      id: 3,
      label: "Recruiters",
      value: "recruiters",
    },
  ];

  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  const getJobdetails = async () => {
    try {
      const response = await getDashboardStaticDatas({ companyId: companyId });
      const resultArray = Object.entries(response.result).map(
        ([key, value]) => {
          const currentValue = value.prefix;
          const isIncreasedOrDecreased = value.isPositive;
          const IODPercentage = (value.suffix * 100).toFixed(1) + "%";
          let title = key.replace(/([A-Z])/g, " $1").trim();
          title = title.charAt(0).toUpperCase() + title.slice(1);
          return {
            title,
            currentValue,
            isIncreasedOrDecreased,
            IODPercentage,
          };
        }
      );
      setsmallCard(resultArray);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getJobdetails();
  }, []);

  return (
    <div className="flex flex-col gap-4 discover">
      <div className="headerTitle">
        <h1 className="h1">
          Welcome back! <span className="text-primary">{Name}</span>{" "}
        </h1>
        <p className="p6">
          Coordinates the planning, execution, and completion of projects...
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT COLUMN  */}
        <div className="flex flex-col col-span-12 gap-4 xl:col-span-8 2xl:col-span-9 3xl:col-span-8 4xl:col-span-9">
          {/* SMALL CARD  */}
          <div className="grid grid-cols-12 gap-3">
            {SmallCard.map((card, index) => (
              <div
                key={index}
                className="col-span-12 sm:col-span-6 lg:col-span-3 2xl:col-span-3"
              >
                <Card className="2xl:h-[128px]">
                  <div className="flex flex-col gap-3 relative">
                    <div className="flex justify-between">
                      <div
                        className={`vhcenter size-[30px] rounded shrink-0 ${
                          card.isIncreasedOrDecreased
                            ? "bg-[#07A86D]/5 dark:bg-[#07A86D]/20 text-[#07A86D]"
                            : "bg-[#F23131]/5 dark:bg-[#F23131]/20 text-[#F23131]"
                        }`}
                      >
                        <PiChartBar size={16} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="para !font-normal">{card.title}</p>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl 2xl:text-[32px] dark:text-white 2xl:leading-[140%] font-semibold">
                          {card.currentValue}
                        </h1>
                        <div
                          className={`vhcenter px-2.5 py-1 rounded-full h-6 text-[11px] font-semibold 2xl:leading-[140%] flex items-center gap-1 border ${
                            card.isIncreasedOrDecreased
                              ? "bg-[#07A86D]/5 dark:bg-[#07A86D]/20 text-[#07A86D] border-[#07A86D]/10 dark:border-[#07A86D]/20"
                              : "bg-[#F23131]/5 dark:bg-[#F23131]/20 text-[#F23131] border-[#F23131]/10 dark:border-[#F23131]/20"
                          }`}
                        >
                          {card.isIncreasedOrDecreased ? (
                            <IoMdArrowDropup size={16} />
                          ) : (
                            <IoMdArrowDropdown size={16} />
                          )}
                          <span>
                            {card.isIncreasedOrDecreased ? "+" : "-"}
                            {card.IODPercentage}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 h-10 w-32">
                      <TinyLineChart
                        color={
                          card.isIncreasedOrDecreased ? "#07A86D" : "#F23131"
                        }
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* TWO COLUMN CHART */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8 xl:col-span-12 2xl:col-span-8">
              <Card cardName="Application Frequency Rate" className="h-[397px]">
                <FrequencyBarChart companyId={companyId} />
              </Card>
            </div>

            {/* Hidden in small Devices with resolution from 1024px to 1800px And this Card will Visible in Right Column */}
            <div className="col-span-12 lg:col-span-4 2xl:col-span-4 xl:hidden 2xl:block">
              <Card cardName="Upcoming Interview Schedules">
                <InterviewSchedules />
              </Card>
            </div>
          </div>
          <Card
            cardName="Live Jobs"
            className="h-96"
            filters={true}
            dropdown1={dropdown1}
            dropdown2={dropdown2}
            value={value}
            value1={value1}
            placeholder={"Select"}
            change={(e) => setValue(e)}
            dropdown2Change={(e) => setValue1(e)}
          >
            <LiveJobs />
          </Card>
          <Card
            cardName="Age of Jobs"
            className="h-96"
            filters={true}
            dropdown1={dropdown1}
            dropdown2={dropdown2}
            placeholder={"Select"}
          >
            <AgeOfJobs />
          </Card>
        </div>
        {/* RIGHT COLUMN  */}
        <div className="flex flex-col col-span-12 gap-4 xl:col-span-4 2xl:col-span-3 3xl:col-span-4 4xl:col-span-3">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:flex">
            <div className="flex flex-col gap-4 xl:flex-col">
              <Card
                className="2xl:min-h-[250px] h-full"
                cardName="Candidate Source"
              >
                <PieChartWithLegends />
              </Card>
              <div className="hidden xl:block 2xl:hidden">
                <Card cardName="Upcoming Interview Schedules">
                  <InterviewSchedules />
                </Card>
              </div>
            </div>
            <Card cardName="Active Employees" className="min-h-[150px]">
              <ActiveEmployees />
            </Card>
          </div>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:flex">
            <Card cardName="New Applicants" className="">
              <NewApplicants />
            </Card>
            <Card cardName="Age Distribution" className="">
              <AgeDistribution />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
