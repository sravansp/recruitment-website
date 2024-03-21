import React from "react";
import { useTranslation } from "react-i18next";
import { PiCaretDoubleRightLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from "recharts";

export default function ActiveEmployees() {
  const theme = useSelector((state) => state.layout.mode)

  const { t } = useTranslation();
  const data = [
    { name: "GCC Nations", count: 35 },
    { name: "EXPATS", count: 5 },
  ];
  const totalCount = data.reduce((total, item) => total + item.count, 0);
  return (
    <div className="flex flex-col gap-4 h-[220px] xl:h-[200px]">
        <div className="flex items-center justify-between px-4 dark:text-white">
            <p className=""><span className="text-3xl font-semibold ">{totalCount}</span> <span className="text-2xl text-grey">employees</span></p>
            <Link to className="pblack !font-normal text-primary flex items-center gap-2">View all employees <PiCaretDoubleRightLight /></Link>
        </div>
      <ResponsiveContainer width="45%" height="100%">
        <BarChart
          // width={500}
          height={200}
          data={data}
          margin={{
            top: 0,
            // right: 30,
            left: 0,
            bottom: 5,
          }}
        >
     
          <defs>
            {/* Define the first gradient for the first bar */}
            <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={`${theme == "pink" ? "#FC4B80" : "#6A4BFC"}`}
              />
              <stop
                offset="100%"
                stopColor={`${theme == "pink" ? "#FF709B" : "#9287FF"}`}
              />
            </linearGradient>
            {/* Define the second gradient for the second bar */}
            <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={`${theme == "pink" ? "#FFC7DB" : "#D0C7FF"}`}
              />
              <stop
                offset="100%"
                stopColor={`${theme == "pink" ? "#FF9ACA" : "#AB9AFF"}`}
              />
            </linearGradient>
          </defs>

   

          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }}  />
        

          {/* First Bar with Gradient Fill */}
          <Bar
            dataKey="count"
            stackId="a"
            fill={`url(#gradient1)`}
            barSize={62}
            radius={[6, 6, 0, 0]} // Border radius: top-left, top-right, bottom-right, bottom-left
            // background={{ fill: theme === "dark" ? "#171C28" : "#FBF9FF" }} // Background color for the bar{ fill: "#FBF9FF" }}
          >
          
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
