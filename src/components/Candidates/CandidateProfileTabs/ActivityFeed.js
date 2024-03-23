import React, { useEffect, useState } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { useParams } from "react-router-dom";
import {getAllRecruitmentJobResumeActivities} from "../../Api1" 
import {
  RiArticleLine,
  RiCalendarLine,
  RiFileTransferLine,
  RiStickyNoteLine,
} from "react-icons/ri";
import { BsFileEarmarkRichtext } from "react-icons/bs";

// const candidateStatus = [
//   {
//     name: "Grace Bennet Anderson",
//     currentStage: "Rejected",
//     previousStage: "Interview",
//     position: "Marketing Manager",
//     company: "Emirates",
//     scheduled: 0,
//     InterviewDate: "",
//     InterviewTime: "",
//     date: "24 May 2024",
//   },
//   {
//     name: "Grace Bennet Anderson",
//     currentStage: "Interview",
//     previousStage: "Second Round Interview",
//     position: "Marketing Manager",
//     company: "Emirates",
//     scheduled: 1,
//     InterviewDate: "19 May 2024",
//     InterviewTime: "14:30",
//     date: "17 May 2024",
//   },
//   {
//     name: "Grace Bennet Anderson",
//     currentStage: "Second Round Interview",
//     previousStage: "HR First Interview",
//     position: "Marketing Manager",
//     company: "Emirates",
//     scheduled: 0,
//     InterviewDate: "",
//     InterviewTime: "",
//     date: "16 May 2024",
//   },
//   {
//     name: "Grace Bennet Anderson",
//     currentStage: "Applied",
//     previousStage: "",
//     position: "Marketing Manager",
//     company: "Emirates",
//     scheduled: 0,
//     InterviewDate: "",
//     InterviewTime: "",
//     date: "14 May 2024",
//   },
// ];

const tabData = [
  {
    id: 9,
    title: "Notes",
    value: "notes",
    // content: <Overview />,
    icon: <RiStickyNoteLine className="text-base" />,
  },
  {
    id: 10,
    title: "Documents",
    value: "documents",
    // content: <ActivityFeed />,
    icon: <BsFileEarmarkRichtext className="text-base" />,
  },
];
const ActivityFeed = () => {
  const [content, setContent] = useState("");
  const primaryColor = localStorage.getItem("mainColor");
  const { resumeId } = useParams();
  const[candidateStatus,setcandidateStatus]=useState([])
  
  const getActivities = async()=>{
    try{
    const response = await getAllRecruitmentJobResumeActivities(resumeId)

    console.log(response)
    setcandidateStatus(response.result)


    }catch(error){

    }

  }
  useEffect(()=>{
    getActivities()
  },[])
  const handleEditorChange = (content) => {
    setContent(content);
  };

  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="box-wrapper">
          <div className="flex flex-col gap-6 ">
            <h6 className="h6">
              <span className="text-primary">Marketing Manager</span> at
              Emirates
            </h6>
            <div>
              {candidateStatus.map((status, i) => (
                <div className="relative flex pb-6" key={i}>
                  <div
                    className={`absolute inset-0  items-center justify-center h-full w-9 ${
                      i === candidateStatus.length - 1 ? `hidden` : `flex`
                    }`}
                  >
                    <div className="h-full w-px bg-[#F1F5F9] dark:bg-secondaryDark pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 size-8 2xl:size-9 rounded-full bg-[#F1F5F9] inline-flex items-center dark:bg-secondaryDark justify-center text-black dark:text-white text-opacity-50 relative z-10">
                    {status.scheduled === 1 ? (
                      <RiCalendarLine />
                    ) : status.previousStage === "" ? (
                      <RiArticleLine />
                    ) : (
                      <RiFileTransferLine />
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="pblack flex-grow pl-4 !font-normal">
                    <span className="font-semibold" dangerouslySetInnerHTML={{ __html: status.description }} />
                      {status.scheduled === 1 ? (
                        <>
                          {/* <span className="!font-semibold">
                            {status.currentStage}
                          </span>
                          {" scheduled with "}
                          <span className="!font-semibold">{status.description}</span>
                          {" for "}
                          <span className="!font-semibold">
                            {status.InterviewDate}
                          </span>
                          {" at "}
                          <span className="!font-semibold">
                            {status.InterviewTime}
                          </span> */}
                        </>
                      ) : status.previousStage === "" ? (
                        // `${status.name} applied to ${status.position} at ${status.company}`
                        <>
                          {/* <span className="!font-semibold">{status.name}</span> */}
                          {/* {" applied to "}
                          <span className="!font-semibold">
                            {status.position}
                          </span>
                          {" at "}
                          <span className="!font-semibold">
                            {status.company}
                          </span> */}
                        </>
                      ) : (
                        // `${status.name} was moved from ${status.previousStage} to ${status.currentStage}`
                        <>
                          {/* <span className="!font-semibold">{status.name}</span>
                          {" was moved from "}
                          <span className="!font-semibold">
                            {status.previousStage}
                          </span>
                          {" to "}
                          <span className="!font-semibold">
                            {status.currentStage}
                          </span> */}
                        </>
                      )}
                    </p>
                    <p className="para !font-normal">
                      {status.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN  */}
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor
            initialValue={content}
            onChange={handleEditorChange}
            minheight="250px"
          />
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Save" BtnType="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
