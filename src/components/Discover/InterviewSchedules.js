import React, { useState, useMemo, useEffect } from "react";
import DashboardAccordian from "./DashboardAccordian";
import { useSelector } from "react-redux";
import { getDashboardUpcommingInterviewSchedules } from "../Api1";

// const getRandomColor = () => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };
// Define an array to keep track of used colors
let usedColors = [];

const getRandomColorWithOpacity = () => {
  const colorNames = [
    "#0095FF",
    "#4437CC",
    "#733710",
    "#FF8A00",
    "#305FBB",
    "#00D3E0",
    "#4BB79D",
    "#DFA510",
    "#E546D5",
    "#00E096",
    "#884DFF",
    "#FF4DB8",
  ];

  // If all colors have been used, reset the usedColors array
  if (usedColors.length === colorNames.length) {
    usedColors = [];
  }

  let randomColor;
  do {
    // Get a random color from colorNames array
    randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
  } while (usedColors.includes(randomColor)); // Repeat until a non-used color is found

  // Add the used color to the usedColors array
  usedColors.push(randomColor);

  // Generate colorWithOpacity1 and colorWithOpacity2
  const colorWithOpacity1 = `${randomColor}54`;
  const colorWithOpacity2 = `${randomColor}05`;

  const linearGradient = `linear-gradient(180deg, ${colorWithOpacity1} 0%, ${colorWithOpacity2} 100%)`;

  return {
    linearGradient,
    randomColor,
  };
};

export default function InterviewSchedules() {
  const themeMode = useSelector((state) => state.layout.mode);
  // Memoize the array of random colors to ensure they don't change on re-renders
  const randomColors = useMemo(
    () => Array.from({ length: 3 }, getRandomColorWithOpacity),
    []
  );
  const[accordianData,setaccordianData]= useState([])
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    
  }, []);
  const getInterviewShedules = async()=>{
    try{
     const response = await getDashboardUpcommingInterviewSchedules({companyId:companyId})
    console.log(response)
    const convertedEvents = response.result.map(event => ({
      title: event.eventName,
      date: event.eventDetails.eventDate,
      time: event.eventDetails.eventTime,
      meetingType: event.eventDetails.eventType === "offline" ? "Offline" : "Google Meet",
      assignees: event.attendees.map(attendee => `https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80`),
  }));
  
  // Function to calculate end time based on duration
  function calculateEndTime(startTime, duration) {
      const [hours, minutes] = startTime.split(":").map(Number);
      const [hoursPart, minutesPart] = duration.match(/\d+/g).map(Number);
      const totalMinutes = hours * 60 + minutes + hoursPart * 60 + minutesPart;
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
  }
  console.log(convertedEvents);
  setaccordianData(convertedEvents)
  
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getInterviewShedules()
  },[])
  // Create an array of objects with specific values for each DashboardAccordian
  // const accordianData = [
  //   {
  //     title: "Meeting with Sara",
  //     date: "12 Feb ,2024",
  //     time: "10:00 - 11:45 AM",
  //     meetingType: "Google Meet",
  //     assignees: [
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //     ],
  //   },
  //   {
  //     title: "Meeting with Arjun",
  //     date: "24 Sept ,2024",
  //     time: "11:00 - 12:45 AM",
  //     meetingType: "Google Meet",
  //     assignees: [
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //     ],
  //   },
  //   {
  //     title: "Meeting with Noel",
  //     date: "12 FEB ,2024",
  //     time: "11:00 - 12:45 AM",
  //     meetingType: "Google Meet",
  //     assignees: [
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  //     ],
  //   },
  // ];

  // Create an array of DashboardAccordian components based on accordianData
  const accordians = accordianData.map((data, index) => (
    <DashboardAccordian
      key={index}
      title={data.title}
      date={data.date}
      time={data.time}
      className={"rounded-xl"}
      initialExpanded={index === 0}
      color={themeMode == "dark" ? "#ffffff" : randomColors[index].randomColor}
      style={{
        background: themeMode == "dark" ? "linear-gradient(180deg, rgba(197, 216, 255, 0.20) 0%, rgba(214, 226, 255, 0.20) 100%)" : randomColors[index].linearGradient,
        border: themeMode == "dark" ? `1px solid #000000` : `1px solid ${randomColors[index].randomColor}60`,
      }}
    >
      <div className="flex items-center justify-between ">
        <div className="flex gap-2">
        <p className=" 2xl:text-xs text-[9px]" style={{color:  themeMode == "dark" ? "#ffffff" : randomColors[index].randomColor}}>{data.meetingType}</p>
        </div>

        <div className="bg-white rounded-full p-0.5">
          <div className="-space-x-1">
            {data?.assignees.map((el, index) => {
              return (
                <img
                  key={index}
                  className="relative z-30 inline object-cover w-[24px] h-[24px] border-2 border-white rounded-full"
                  src={el}
                  alt="Profileimage"
                />
              );
            })}
          </div>
        </div>
      </div>
    </DashboardAccordian>
  ));

  return (
    <div className="flex flex-col gap-2 overflow-auto 2xl:max-h-[322px] max-h-72">
      {accordians}
    </div>
  );
}
