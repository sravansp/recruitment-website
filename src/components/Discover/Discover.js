import React from "react";
import Card from "./Card";
import { PiChartBar } from "react-icons/pi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import PieChartWithLegends from "./PieChart";

const Discover = () => {
  const smallCard = [
    {
      title: "Total No of Jobs Posted",
      currentValue: "3612",
      isIncreasedOrDecreased: true,
      IODPercentage: "12.4%",
    },
    {
      title: "Source Diversity",
      currentValue: "35%",
      isIncreasedOrDecreased: true,
      IODPercentage: "5%",
    },
    {
      title: "Open Jobs",
      currentValue: "86",
      isIncreasedOrDecreased: false,
      IODPercentage: "9.4%",
    },
    {
      title: "Rejection Average",
      currentValue: "1932",
      isIncreasedOrDecreased: true,
      IODPercentage: "43%",
    },
  ];
  return (
    <div className="flex flex-col gap-4 discover">
      <div className="headerTitle">
        <h1 className="h1">
          Welcome back! <span className="text-primary">Khadija</span>{" "}
        </h1>
        <p className="p6">
          Coordinates the planning, execution, and completion of projects...
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT COLUMNV  */}
        <div className="flex flex-col col-span-12 gap-4 xl:col-span-8">
          {/* SMALL CARD  */}
          <div className="grid grid-cols-12 gap-3">
            {smallCard.map((card, i) => (
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Card className="2xl:h-[128px]">
                  <div className="flex flex-col gap-3">
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
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* TWO COLUMN CHART */}
          <div className="grid">
            
          </div>
        </div>
        {/* RIGHT COLUMN  */}
        <div className="flex flex-col col-span-12 gap-4 xl:col-span-4">
          <Card className="2xl:min-h-[250px]" cardName="Candidate Source">
            <PieChartWithLegends />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Discover;
