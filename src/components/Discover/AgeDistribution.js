import React, { useEffect,useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { getDashboardAgeDistribution } from "../Api1";

// const data = [
//   { noOfEmployees: 20, age: "20-25" },
//   { noOfEmployees: 10, age: "25-30" },
//   { noOfEmployees: 30, age: "30-35" },
//   { noOfEmployees: 8, age: "35-40" },
//   { noOfEmployees: 5, age: "40-45" },
//   { noOfEmployees: 0, age: "45-50" },
// ];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-1.5 p-2 text-white bg-black rounded-md">
        <div className="flex items-center gap-2 ">
          <SVG />
          <p className="text-xs xl:text-[9px] 4xl:text-xs"> Age Distribution</p>
        </div>

        <p className="text-white text-[10px] xl:text-[6px] 4xl:text-[10px] text-opacity-50">{`Range between: ${label}`}</p>

        <p className="text-white text-[10px] xl:text-[6px] 4xl:text-[10px] text-opacity-50">{`No:of Employees: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AgeDistribution = () => {
  const primaryColor = localStorage.getItem("mainColor");
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const[data,setData] =useState([])
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    
  }, []);
  const getAgedetails = async()=>{
    try{
     const response = await getDashboardAgeDistribution({companyId:companyId})
     console.log(response)
     const formattedResult = Object.entries(response.result).map(([age, noOfEmployees]) => ({
      noOfEmployees: noOfEmployees, // Convert month to uppercase
      age: age  // Calculate the frequency (multiplying by 1.8 as an example)
  }));
   setData(formattedResult)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getAgedetails()
  },[])

  return (
    <div className="h-[250px] xl:h-[254px] zoom-125">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          //   width={730}
          //   height={250}
          data={data}
          //   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="age"
            fontSize={10}
            allowDuplicatedCategory={false}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            dataKey="noOfEmployees"
            tickLine={false}
            fontSize={10}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            // type="monotone"
            fillOpacity={1}
            fill="url(#colorUv)"
            dataKey="noOfEmployees"
            strokeWidth={2}
            stroke={primaryColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// SVG ICON
const SVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M4 4C5.65685 2.34315 8.34315 2.34315 10 4C11.6569 5.65685 11.6569 8.34315 10 10C8.34315 11.6569 5.65685 11.6569 4 10C2.34315 8.34315 2.34315 5.65685 4 4Z"
        fill="#775AFF"
      />
      <path
        d="M10.7071 3.29289C8.65973 1.24552 5.34027 1.24552 3.29289 3.29289C1.24552 5.34027 1.24552 8.65973 3.29289 10.7071C5.34027 12.7545 8.65973 12.7545 10.7071 10.7071C12.7545 8.65973 12.7545 5.34027 10.7071 3.29289Z"
        stroke="#775AFF"
        stroke-opacity="0.4"
        stroke-width="2"
      />
    </svg>
  );
};

export default AgeDistribution;
