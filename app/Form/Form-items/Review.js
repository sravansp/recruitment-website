"use client";
import Image from "next/image";
import React, { useState } from "react";

// ICONS
import {
  RiArrowDownLine,
  RiCake2Line,
  RiFileList3Line,
  RiMailSendLine,
  RiMapPin2Line,
  RiMoneyDollarBoxLine,
  RiMouseLine,
  RiSmartphoneLine,
  RiStickyNoteLine,
} from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { Notes } from "@mui/icons-material";
import { BsFileEarmarkRichtext, BsJustify } from "react-icons/bs";
import Accordion from "@components/ui/Accordion";
import ButtonClick from "@components/ui/Button";
import PDFViewer from "@components/ui/PDFViewer";
import { educationExperiences, workExperiences } from "@components/ui/DataArrays";
import pdfFile from "@/public/sample.pdf";
import FlexCol from "@components/ui/FlexCol";
import candidate from "@/public/Frame 427319140.png";
import { AiTwotoneEdit } from "react-icons/ai";

const userInfo = [
  {
    personal: [
      {
        id: 1,
        label: "Email Address",
        value: "grace.bennet@example.com",
        icon: <RiMailSendLine />,
      },
      {
        id: 2,
        label: "Phone number",
        value: "+1234567890",
        icon: <RiSmartphoneLine />,
      },
      {
        id: 3,
        label: "Date of Birth",
        value: "03 September 2000",
        icon: <RiCake2Line />,
      },
      {
        id: 4,
        label: "Location",
        value: "Istanbul, Izmir, Ankara, Turkey, US, Europe",
        icon: <RiMapPin2Line />,
      },
    ],
    other: [
      {
        id: 5,
        label: "Location",
        value: "Istanbul, Izmir, Ankara, Turkey, US, Europe",
        icon: <RiMapPin2Line />,
      },
      {
        id: 6,
        label: "Work Type",
        value: "Remote. Fulltime. Part-Timet Internship, Freelance",
        icon: <RiMouseLine />,
      },
    ],
  },
];
const Questions = [
  {
    id: 1,
    question: "Are you legally eligible to work in the country?",
    answer: "Yes, I’ve resident visa",
  },
  {
    id: 2,
    question: "Are you legally eligible to work in the country?",
    answer: "Yes, I’ve resident visa",
  },
  {
    id: 3,
    question: "Are you legally eligible to work in the country?",
    answer: "Yes, I’ve resident visa",
  },
];
const Review = () => {
  const [content, setContent] = useState("");
  const primaryColor = localStorage.getItem("mainColor");

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

  return (
    <div className="flex flex-col gap-6">
      <FlexCol />

      <div className="relative  w-full mx-auto borderb rounded-md">
        <Accordion
          title="Review"
          description="lorem ipsum dummy text dolar sit."
          padding={true}
          className={""}
          initialExpanded={true}
        >
          <div className="flex justify-between ">
            <h1 className="acco-h1">Personal Details</h1>
            <ButtonClick
              buttonName="Edit Details"
              className="text-[#6044E5]"
              icon={<AiTwotoneEdit />}
            />
          </div>
          <div className="flex min-w-0 gap-x-4 pt-3 pl-5">
            <Image
              className="h-18 w-18 flex-none rounded-full bg-cover "
              src={candidate}
              alt=""
            />
            <div className="min-w-0 flex-auto mt-3">
              <p className="acco-h1">Grace Bennett Anderson</p>
            </div>
          </div>
          <div>
            {userInfo.map((user) => (
              <UserInfoComponent
                key={user.personal[0].id}
                personalInfo={user.personal}
              />
            ))}
          </div>
          <div className="v-divider" />
          {/* <div>
            {userInfo.map((user) => (
              <UserOtherComponent
                key={user.other[0].id}
                otherInfo={user.other}
              />
            ))}
          </div> */}
          <div className="flex flex-col gap-4 box-wrapper">
            <h6 className="h6">Education</h6>
            <div className="flex flex-col divide-y">
              {educationExperiences.map((edu, index) => (
                <div
                  key={index}
                  className="flex justify-start gap-5 py-3 2xl:py-6"
                >
                  <img
                    className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 rounded-full shadow"
                    src="https://via.placeholder.com/60x60"
                  />
                  <div className="inline-flex flex-col items-start justify-start gap-1">
                    <div className="gap-2 vhcenter">
                      <h6 className="h6">{edu.institution}</h6>
                      {/* <p className="para p-1.5 rounded-md bg-secondaryWhite !leading-none">
                    {work.Shift}
                  </p> */}
                    </div>

                    <div className="flex flex-col gap-4">
                      <p className="h6 !font-medium">{edu.degree}</p>
                      <div className="flex gap-3">
                        <p className="para !font-normal text-opacity-70">
                          {edu.graduationYear}
                        </p>

                        <p className="para !font-normal text-opacity-70">
                          {edu.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 box-wrapper">
            <h6 className="h6">All Experiences</h6>
            <div className="flex flex-col divide-y">
              {workExperiences.map((work, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-5 py-3 2xl:py-6"
                >
                  <img
                    className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 rounded-full shadow"
                    src="https://via.placeholder.com/60x60"
                  />
                  <div className="inline-flex flex-col items-start justify-start gap-1">
                    <div className="gap-2 vhcenter">
                      <h6 className="h6">{work.companyName}</h6>
                      <p className="para p-1.5 rounded-md bg-secondaryWhite dark:bg-secondaryDark !leading-none">
                        {work.Shift}
                      </p>
                    </div>

                    <div className="inline-flex items-center justify-start gap-4">
                      <p className="!text-opacity-50 h6">{work.role}</p>
                      <p className="para !font-normal text-opacity-70">
                        {work.experienceDuration}
                      </p>

                      <p className="para !font-normal text-opacity-70">
                        {work.startDate}, {work.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Accordion>

        <div className="box-wrapper">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h6 className="h6 !text-black dark:!text-white">CV / Resume</h6>
              {/* <ButtonClick buttonName="Add Cover Note" icon={<IoMdAdd />} /> */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
                  <div className="text-black opacity-50 ">
                    {<RiFileList3Line />}
                  </div>
                </div>
                <p className="text-xs font-semibold leading-tight text-black dark:text-white">
                  Pdfname.pdf
                </p>
              </div>
              <ButtonClick
                buttonName="Edit Details"
                className="text-[#6044E5]"
                icon={<AiTwotoneEdit />}
              />
            </div>
            <div className="divider-h" />
            <PDFViewer pdfUrl={pdfFile}  />
          </div>
          <div className="divider-h mt-9" />
          <div className="flex flex-col gap-8 mt-8">
            <h2 className="h6">Prerequisite</h2>
          </div>
          <div className="inline-flex flex-col items-start justify-start pt-4 gap-7">
            {Questions?.map((quest) => (
              <div className="flex flex-col gap-3" key={quest.id}>
                <div className="flex">
                  <div className="w-12 ">
                    <span className="pblack">Q{quest.id}.</span>
                  </div>
                  <div>
                    <span className="pblack !text-opacity-80">
                      {quest.question}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 ">
                    <p className="pblack">Ans.</p>
                  </div>
                  <p className="pblack !text-opacity-80">{quest.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Accordiyan Body Contents
const UserInfoComponent = ({ personalInfo }) => {
  return (
    <div className="grid md:grid-cols-2 gap-7">
      {personalInfo.map((info) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
            <div className="text-black opacity-50 ">{info.icon}</div>
          </div>
          <div className="inline-flex flex-col items-start justify-start ">
            <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
              {info.label}
            </p>
            <p className="text-xs font-semibold leading-tight text-black dark:text-white">
              {info.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
// Accordiyan Body Contents
// const UserOtherComponent = ({ otherInfo }) => {
//   console.log(otherInfo);
//   return (
//     <div className="grid gap-7">
//       {otherInfo.map((info) => (
//         <div className="flex items-center gap-2.5">
//           <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
//             <div className="text-black opacity-50 ">{info.icon}</div>
//           </div>
//           <div className="inline-flex flex-col items-start justify-start ">
//             <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
//               {info.label}
//             </p>
//             <p className="text-xs font-semibold leading-tight text-black dark:text-white">
//               {info.value}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

export default Review;
