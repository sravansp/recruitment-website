import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonClick from "../common/Button";
import { Button, Divider, Dropdown, Rate, message } from "antd";
import { useMediaQuery } from "react-responsive";
import copy from "clipboard-copy";
import { Menu, Space } from "antd";
import { useTranslation } from "react-i18next";
import { getRecruitmentResumeById } from "../Api1";
// Icons
import {
  PiArrowLeftBold,
  PiBookmarkSimpleFill,
  PiDotsThreeOutlineFill,
} from "react-icons/pi";
import { FcCheckmark, FcHighPriority, FcShare } from "react-icons/fc";
import { MdContentCopy, MdPhone } from "react-icons/md";
import { DownOutlined } from "@ant-design/icons";
import {
  RiCake2Line,
  RiCouponLine,
  RiFile4Line,
  RiFileList3Line,
  RiHome6Line,
  RiImage2Fill,
  RiMailSendLine,
  RiMailUnreadLine,
  RiMapPin2Line,
  RiMoneyDollarBoxLine,
  RiMouseLine,
  RiQuestionnaireLine,
  RiSmartphoneLine,
  RiSurveyLine,
} from "react-icons/ri";

// Components
import TabsNew from "../common/TabsNew";
import Overview from "./CandidateProfileTabs/Overview";
import ActivityFeed from "./CandidateProfileTabs/ActivityFeed";
import CVResume from "./CandidateProfileTabs/CVResume";
import Emails from "./CandidateProfileTabs/Emails";
import Evaluations from "./CandidateProfileTabs/Evaluations";
import Questionaries from "./CandidateProfileTabs/Questionaries";
import Offers from "./CandidateProfileTabs/Offers";
import Events from "./CandidateProfileTabs/Events";
import { useDispatch, useSelector } from 'react-redux';

const items = [
  {
    label: "Others",
    key: "0",
    // icon: ,
  },
  {
    label: "Items 2",
    key: "1",
    // icon: ,
    children: [
      {
        key: "1-1",
        label: "Sub item 1",
      },
      {
        key: "1-2",
        label: "Sub Item 2",
      },
    ],
  },
];

const dropdown = [
  {
    label: "1st menu item",
    key: "0",
  },
  {
    label: "2nd menu item",
    key: "1",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const handleTabChange = (tabId) => {
  // Do something when the tab changes if needed
  console.log(`Tab changed to ${tabId}`);
  if (tabId === 1) {
  } else if (tabId === 2) {
  } else if (tabId === 3) {
  } else if (tabId === 4) {
  } else if (tabId === 5) {
  } else if (tabId === 6) {
  } else if (tabId === 7) {
  }
};

const CandidateProfile = () => {
  const { t } = useTranslation();
  const primaryColor = localStorage.getItem("mainColor");
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedItem, setSelectedItem] = useState("0");
  const [selectedItemLabel, setSelectedItemLabel] = useState("1st menu item");
  const[Candidate,setcandidate]=useState([])
  const[userdata,setuserdata]=useState([])
  const tabs = [
    {
      id: 1,
      title: t("Overview"),
      value: "overview",
      content: <Overview  data={userdata}/>,
      icon: <RiHome6Line className="text-base" />,
    },
    {
      id: 2,
      title: t("Activity Feed"),
      value: "activityfeed",
      content: <ActivityFeed />,
      icon: <RiFile4Line className="text-base" />,
    },
    {
      id: 3,
      title: t("CV/Resume"),
      value: "cvresume",
      content: <CVResume />,
      icon: <RiFileList3Line className="text-base" />,
    },
    {
      id: 4,
      title: t("Emails"),
      value: "emails",
      content: <Emails />,
      icon: <RiMailUnreadLine className="text-base" />,
    },

    {
      id: 5,
      title: t("Events"),
      value: "events",
      content: <Events />,
      icon: <RiImage2Fill className="text-base" />,
    },
    {
      id: 6,
      title: t("Evaluations"),
      value: "evaluations",
      content: <Evaluations />,
      icon: <RiSurveyLine className="text-base" />,
    },
    {
      id: 7,
      title: t("Questionaries"),
      value: "questionaries",
      content: <Questionaries />,
      icon: <RiQuestionnaireLine className="text-base" />,
    },
    {
      id: 8,
      title: t("Offers"),
      value: "offers",
      content: <Offers />,
      icon: <RiCouponLine className="text-base" />,
    },
  ];
  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
    const selectedItemLabel = dropdown.find((item) => item.key === e.key).label;
    setSelectedItemLabel(selectedItemLabel);
  };

  const handleCopyClick = (value) => {
    copy(value);

    messageApi.open({
      type: "success",
      content: `${value} is copied succesfully`,
    });
  };
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      {dropdown.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
  const selectedDataId = useSelector((state) => state.dataId.selectedDataId);
  const id=selectedDataId
  
//back end
const getCandidatesById = async () => {
  try {
    const response = await getRecruitmentResumeById(id);
     
    setcandidate(response.result)
    // setuserdata(response.result.map((items)=>({
    //  personal:[ 
    //   {id:1,
    //     label:"Email Address",
    //     value:items.candidateEmail,
    //     icon: <RiMailSendLine />,
    //   },
    //   {
    //     id:2,
    //     label:"Phone number",
    //     value:items.candidateContact,
    //     icon: <RiSmartphoneLine />,
    //   },
    //   {
    //     id: 3,
    //     label: "Date of Birth",
    //     value: "03 September 2000",
    //     icon: <RiCake2Line />,
    //   },
    //   {
    //     id: 4,
    //     label: "Salary Expectation",
    //     value: "AED 25000",
    //     icon: <RiMoneyDollarBoxLine />,
    //   },
    // ],
    // other:[
    //   {
    //     id: 5,
    //     label: "Location",
    //     value: items.candidateLocation,
    //     icon: <RiMapPin2Line />,
    //   },
    //   {
    //     id: 6,
    //     label: "Work Type",
    //     value: "Work Type",
    //     icon: <RiMouseLine />,
    //   },
    // ]
    // })))
    console.log(response.result)

  } catch (error) {
    console.error('Error updating workflow ID:', error);
  }
};

useEffect(() => {
 
  getCandidatesById()
  console.log(id)
  console.log(userdata)
 
  


}, []);

  return (
    <div className="flex flex-col gap-6">
      {contextHolder}
      <div className="flex flex-col justify-between lg:flex-row lg:items-center">
        <Link className="backBtn vhcenter gap-2.5" to="/CandidateList">
          <div className="bg-white border border-black rounded-full w-9 h-9 border-opacity-5 vhcenter">
            <PiArrowLeftBold className="text-xl text-primary" />
          </div>
          <p className="pblack">Back to All Candidates</p>
        </Link>
        <div className="gap-2 vhcenter">
          <ButtonClick buttonName="Disqualify" icon={<FcHighPriority />} />
          <ButtonClick buttonName="Hire" icon={<FcCheckmark />} />
          <ButtonClick buttonName="Share" icon={<FcShare />} />
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              size={isSmallScreen ? "default" : "large"}
              icon={<PiDotsThreeOutlineFill />}
            />
          </Dropdown>
        </div>
      </div>
      {Candidate.map((items) => (
  <div key={items.id}>
          <div
        className="flex flex-col gap-3.5 rounded-lg p-3.5 dark:!bg-secondaryDark"
        style={{ backgroundColor: `${primaryColor}10` }}
      >  
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex items-center justify-start gap-5">
            <img
              className="w-[60px] h-[60px] rounded-full shadow border-2 border-white"
              src="https://via.placeholder.com/60x60"
            />
            <div className="inline-flex flex-col items-start justify-start gap-1">
              <div className="gap-3 vhcenter">
                <h2 className="h2">{items.candidateName}</h2>
                <PiBookmarkSimpleFill className=" text-[#12B76A] text-base" />
              </div>

              <div className="inline-flex items-center justify-start gap-4">
                <p className="pblack !font-normal">
                  {items.candidateLocation}
                </p>
                <p className="gap-2 pblack vhcenter">
                  <MdPhone className="text-base text-primary" /> {items.candidateContact}
                </p>
               
                <div
                  className="text-black cursor-pointer text-opacity-30 dark:text-white dark:hover:text-primary hover:text-opacity-90"
                  onClick={() => handleCopyClick(items.candidateContact)}
                >
                  <MdContentCopy size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              <Dropdown overlay={menu} trigger={["click"]}>
                <a className="pblack" onClick={(e) => e.preventDefault()}>
                  <Space>
                    Stage
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <div className="bg-[#FFE8E8] rounded-full px-4 py-1">
                {selectedItemLabel && selectedItemLabel}
              </div>
            </div>
            
            <Divider type="vertical" className="hidden h-auto lg:block" />
            <div className="flex flex-col gap-3">
              <p className="pblack">Rating</p>
              <Rate allowHalf defaultValue={2.5} />
            </div>
          </div>
        </div>
      </div>
    
  </div>
))}

      <TabsNew tabs={tabs} onTabChange={handleTabChange} initialTab={1} />
    </div>
  );
};

export default CandidateProfile;
