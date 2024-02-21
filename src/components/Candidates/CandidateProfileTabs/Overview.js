import Accordion from "../../common/Accordion";
import React, { useState } from "react";
import TabsNew from "../../common/TabsNew";

// ICONS
import {
  RiCake2Line,
  RiMailSendLine,
  RiMapPin2Line,
  RiMoneyDollarBoxLine,
  RiMouseLine,
  RiSmartphoneLine,
  RiStickyNoteLine,
} from "react-icons/ri";
import { Notes } from "@mui/icons-material";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import TextEditor from "../../common/TextEditor";

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
        label: "Salary Expectation",
        value: "AED 25000",
        icon: <RiMoneyDollarBoxLine />,
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

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    // ['blockquote', 'code-block'],

    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction

    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    [{ 'align': [] }],

    // ['clean'],                                         // remove formatting button
  ],
};


const Overview = () => {
  const [content, setContent] = useState('');

  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1  ) {
    } else if (tabId === 2) {
    }
  };
  const tabData = [
    {
      id:9,
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
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Accordion
          title="All Personal Informations"
          // description={t(
          //   "Automate_late_fine_for_employees_who_are_coming_late_to_work"
          // )}
          padding={true}
          className={" bg-white"}
          initialExpanded={true}
        >
          <div>
            {userInfo.map((user) => (
              <UserInfoComponent
                key={user.personal[0].id}
                personalInfo={user.personal}
              />
            ))}
          </div>
          <div className="v-divider" />
          <div>
            {userInfo.map((user) => (
              <UserOtherComponent
                key={user.other[0].id}
                otherInfo={user.other}
              />
            ))}
          </div>
        </Accordion>
      </div>
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
        <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1}/>
        <div className="">
        <TextEditor value={content} onChange={setContent} modules={quillModules} />
        </div>
        </div>
      </div>
    </div>
  );
};

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

const UserOtherComponent = ({ otherInfo }) => {
  console.log(otherInfo);
  return (
    <div className="grid gap-7">
      {otherInfo.map((info) => (
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

export default Overview;
