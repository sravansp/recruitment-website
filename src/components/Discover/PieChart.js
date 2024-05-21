import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { getDashboardCandidateSource } from "../Api1";
import { setDate } from "date-fns";

const data = [
  { name: "LinkedIn", value: 30 },
  { name: "Indeed", value: 25 },
  { name: "Naukri", value: 16 },
  { name: "Resume", value: 10 },
  { name: "Imported", value: 8 },
];

const COLORS = ["#0e2535", "#9da4fe", "#7942c5", "#ecc4f9", "#cfd6e6"];



const PieChartWithLegends = () => {
  const theme = useSelector((state) => state.layout.mode)
  const[data,SetData]=useState([])
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    
  }, []);

  const getCandidateSource= async ()=>{
    try{
      const response = await getDashboardCandidateSource({companyId:companyId})
      // console.log(response)
      const formattedResult = Object.entries(response.result).map(([name, value]) => ({
        name: name.toUpperCase(), // Convert month to uppercase
        value: value  // Calculate the frequency (multiplying by 1.8 as an example)
    }));
    // console.log(formattedResult, "formattedResult")
    SetData(formattedResult)
    }catch(error){
      // console.log(error)
    }
  }
  useEffect(()=>{
    getCandidateSource()
  },[])
  const getTotalSources = () => {
    let total = 0;
    data.forEach((item) => (total += item.value));
    return total;
  };
  const style = {
    top: "48%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };
  const labelText = (props) => {
    const totalSources = getTotalSources();
    const { viewBox } = props;
    const { cx, cy } = viewBox;
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
       <tspan fill={theme === "dark" ? "white" : "black"} fontSize="10" fontWeight="normal">Total Sources</tspan>
<tspan x={cx} dy="20" fill={theme === "dark" ? "white" : "black"} fontSize="18" fontWeight="bold">{totalSources}</tspan>
      </text>
    );
  };
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="30%"
          cy="48%"
          innerRadius={55}
          outerRadius={80}
          labelLine={false}
          //   label={renderCustomizedLabel}
          // fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              className="border-none outline-none"
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
            />
          ))}
        <Label content={labelText} position="center" />

        </Pie>
        <Tooltip />
        {/* <Legend layout="vertical" align="right" verticalAlign="middle" /> */}
        <Legend
          iconSize={15}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          content={(props) => {
            const { payload } = props;
            // console.log(payload,"payload");
            return (
              <div className="flex flex-col gap-2 dark:text-white">
                {/* <p className="font-medium text-opacity-50 2xl:text-xs text-[#667085]">Leave Summary</p> */}
                <ul className="w-28 xss:w-44 md:w-36 lg:w-40 2xl:w-36 3xl:w-44">
                  {payload.map((entry, index) => (
                    <li
                      key={`legend-${index}`}
                      className="flex items-center justify-between gap-2 pblack py-1 leading-[20px]"
                    >
                      <div className="flex items-center gap-2">
                        {" "}
                        <svg className="overflow-hidden rounded-full size-3">
                          <rect width={15} height={15} fill={entry.color} />
                        </svg>
                        <span className="text-xs font-normal text-grey">
                          {entry.value}
                        </span>
                      </div>
                      <p>
                        <span className="text-xs dark:text-white">
                          {entry.payload.value}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartWithLegends;
