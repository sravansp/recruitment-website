import React, { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardApplicationFrequencyRate } from "../Api1";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function FrequencyBarChart() {
  // const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  // const theme = useSelector((state) => state.layout.themeColor);
  const theme = useSelector((state) => state.layout.mode);

  const { t } = useTranslation();
  // const data = [
  //   { month: "JAN", Frequency: 1.8 },
  //   { month: "FEB", Frequency: 4.6 },
  //   { month: "MAR", Frequency: 1.9 },
  //   { month: "APR", Frequency: 6.2 },
  //   { month: "MAY", Frequency: 4.7 },
  //   { month: "JUN", Frequency: 8.8 },
  //   { month: "JUL", Frequency: 12 },
  //   { month: "AUG", Frequency: 1.7 },
  //   { month: "SEP", Frequency: 1.9 },
  //   { month: "OCT", Frequency: 7.3 },
  //   { month: "NOV", Frequency: 4.6 },
  //   { month: "DEC", Frequency: 6 },
  // ];
  const[data,SetData]=useState([])
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  console.log(companyId,"companyId")
  // useEffect(() => {
  //   setCompanyId(localStorage.getItem("companyId"));
    
  // }, []);
  const getFrequencyRate = async ()=>{
    try {
      
      const response = await getDashboardApplicationFrequencyRate({companyId:companyId})
      console.log(response);
      const formattedResult = Object.entries(response.result).map(([month, frequency]) => ({
        month: month.toUpperCase(), 
        Frequency: frequency  
    }));
    console.log(formattedResult)
    SetData(formattedResult)
    }catch(error)
    {
      console.log(error)
    }
  }
  useEffect(()=>{
    getFrequencyRate()
  },[])
  const labelFormatter = (value) => `${value}`;
  const yAxisTickFormatter = (value) => `${value}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 text-white bg-gray-800 rounded">
          <p className="text-xs">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs">
              {`${entry.dataKey}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-[330px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={500}
          height={300}
          // data={dataWithTotal}
          data={data}
          margin={{
            top: 0,
            // right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          {/* <Legend
            verticalAlign="bottom"
            align="center"
            iconType=" circle"
            className=" dark:text-white"
          /> */}
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

          <CartesianGrid
            strokeDasharray="5 8"
            horizontal={true}
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            // ticks={yTicks}
            // domain={yDomain}
            tickCount={6}
            tickFormatter={yAxisTickFormatter}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10 }}
          />
          {/* <Tooltip content={<CustomTooltip />} /> */}

          {/* First Bar with Gradient Fill */}
          <Bar
            dataKey="Frequency"
            name="Frequency"
            stackId="a"
            fill={`url(#gradient1)`}
            barSize={32}
            radius={[6, 6, 6, 6]} // Border radius: top-left, top-right, bottom-right, bottom-left
            background={{ fill: theme === "dark" ? "#171C28" : "#FBF9FF" }} // Background color for the bar{ fill: "#FBF9FF" }}
          >
            {/* Display total at the top of the bar */}
            <LabelList
              dataKey="Frequency"
              position="top"
              formatter={labelFormatter}
              fontSize={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
