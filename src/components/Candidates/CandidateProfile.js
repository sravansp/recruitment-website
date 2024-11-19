/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ButtonClick from "../common/Button";
import { Button, Divider, Dropdown, Rate, message } from "antd";
import { useMediaQuery } from "react-responsive";
import copy from "clipboard-copy";
import { Menu, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Formik, useFormik } from "formik";
import {
  addJobToResume,
  getAllRecruitmentJobs,
  getRecruitmentJobById,
  updateRecruitmentJobResumesMapping,
  getResumeJobDetails,
  getRecruitmentResumeById,
  getAllRecruitmentJobWorkFlowDetails,
  saveRecruitmentJobResumesStage,
  updateRecruitmentResume,
} from "../Api1";

import {
  PiArrowLeftBold,
  PiBookmarkSimpleFill,
  PiDotsThreeOutlineFill,
} from "react-icons/pi";
import {
  FcCheckmark,
  FcHighPriority,
  FcProcess,
  FcShare,
} from "react-icons/fc";
import { MdContentCopy, MdLocationOn, MdPhone } from "react-icons/md";
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
  RiStickyNoteLine,
  RiSurveyLine,
} from "react-icons/ri";

// Components
import TabsNew from "../common/TabsNew";
import _ from "lodash";
import Overview from "./CandidateProfileTabs/Overview";
import ActivityFeed from "./CandidateProfileTabs/ActivityFeed";
import CVResume from "./CandidateProfileTabs/CVResume";
import Emails from "./CandidateProfileTabs/Emails";
import Evaluations from "./CandidateProfileTabs/Evaluations";
import Questionaries from "./CandidateProfileTabs/Questionaries";
import Offers from "./CandidateProfileTabs/Offers";
import Events from "./CandidateProfileTabs/Events";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../common/TextEditor/TextEditor";
import { BsFileEarmarkRichtext } from "react-icons/bs";

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

// const dropdown = [
//   {
//     label: "1st menu item",
//     key: "0",
//   },
//   {
//     label: "2nd menu item",
//     key: "1",
//   },
//   {
//     label: "3rd menu item",
//     key: "2",
//   },
// ];

const handleTabChange = (tabId) => {
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

  const [selectedItemLabel, setSelectedItemLabel] = useState(null);

  const [Candidate, setcandidate] = useState([]);

  const [userdata, setuserdata] = useState([]);

  const [jobId, setJobId] = useState("");

  const [stageName, setstageName] = useState([]);

  const [stageId, setstageId] = useState("");

  const { resumeId } = useParams();

  const [jobName, setJobName] = useState("");

  const [jobResumeMapping, setjobResumeMapping] = useState("");

  const [currentStatus, setCurrentStatus] = useState(0);

  const [allJob, setAllJob] = useState([]);

  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  const [getstatus, setgetstatus] = useState("");

  const location = useLocation();

  const [userid, setuserid] = useState("");

  const [priority, setPriority] = useState("2");

  const [EvalutaionId, setEvaluationId] = useState("");

  const [QuestionareId, setQuestionareId] = useState("");

  const [jobstatus, setJobstatus] = useState("");

  useEffect(() => {
    const loginDataString = localStorage.getItem("LoginData");
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      setuserid(
        loginData && loginData.userData && loginData.userData.employeeId
      );
    }
  }, []);

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  useEffect(() => {
    // if (state && state.jobID) {
    //   setJobId(state.jobID);
    // } else {
    //   const storedJobId = localStorage.getItem("jobid");
    //   if (storedJobId) {
    //     setJobId(storedJobId);
    //   }
    // }
    setJobId(localStorage.getItem("jobid"));
  }, []);
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  const navigateBack = () => {
    window.history.back();
  };

  const tabs = [
    {
      id: 1,
      title: t("Overview"),
      value: "overview",
      content: <Overview onEmailSelect={handleEmailSelect} />,
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
      content: <CVResume showTextEditor={true} />,
      icon: <RiFileList3Line className="text-base" />,
    },
    {
      id: 4,
      title: t("Emails"),
      value: "emails",
      content: <Emails Email={selectedEmail} />,
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
      content: <Evaluations EvaluationID={EvalutaionId} stageId={stageId} />,
      icon: <RiSurveyLine className="text-base" />,
    },
    {
      id: 7,
      title: t("Questionaries"),
      value: "questionaries",
      content: (
        <Questionaries QuestionareId={QuestionareId} stageId={stageId} />
      ),
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
  const tabs2 = [
    {
      id: 1,
      title: t("Overview"),
      value: "overview",
      content: <Overview onEmailSelect={handleEmailSelect} />,
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
      content: <CVResume showTextEditor={true} />,
      icon: <RiFileList3Line className="text-base" />,
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
  ];

  const priorityItems = [
    {
      label: "Low",
      key: "1",
    },
    {
      label: "Medium",
      key: "2",
    },
    {
      label: "High",
      key: "3",
    },
  ];

  const onClickPriority = ({ key }) => {
    setPriority(key);
  };

  const getstagename = async () => {
    try {
      const response = await getAllRecruitmentJobWorkFlowDetails(jobId);
      const stages = response.result.map((stage) => ({
        label: stage.stageName,
        key: stage.stageId,
      }));
      setstageName(stages);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getstagename();
  }, [jobId]);

  const updatestage = async () => {
    try {
      const response = await saveRecruitmentJobResumesStage({
        jobId: parseInt(jobId),
        stageId: parseInt(stageId),
        resumeId: parseInt(resumeId),
      });
      if (response.status === 200) {
        getResumeJob();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (stageId) {
      updatestage();
    }
  }, [stageId]);

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
    const selectedItemLabel = stageName.find(
      (item) => item.key === e.key
    ).label;
    setSelectedItemLabel(selectedItemLabel);
    setstageId(e.key);
  };

  const handleMenuClick1 = async (e) => {
    try {
      const selectedJobLabel = allJob.find((item) => item.key === e.key).label;
      setJobName(selectedJobLabel);
      setJobId(e.key);
      localStorage.setItem("jobid", e.key);
      const response = await addJobToResume({
        jobId: e.key,
        resumeId: resumeId,
        createdBy: userid,
      });
    } catch (error) {
      return error;
    }
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
      {stageName.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const id = resumeId;

  //back end
  const getCandidatesById = async () => {
    try {
      const response = await getRecruitmentResumeById({ id });
      const updatedCandidates = response.result.map((candidate) => ({
        ...candidate,
      }));
      setcandidate(updatedCandidates);
      setPriority(response.result[0].priority);
      setRating(response.result[0].rating);
      // setuserdata(response.result.map((items)=>({
      //  personal:[
      //   {id:1,git
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
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getCandidatesById();
  }, []);

  const getResumeJob = async () => {
    try {
      const response = await getResumeJobDetails({
        jobId: localStorage.getItem("jobid"),
        resumeId: resumeId,
      });
      setSelectedItemLabel(response.result.stageName);
      setjobResumeMapping(response.result.jobResumeMappingId);
      setgetstatus(response.result.currentStatus);
      setstageId(response.result.stageId);
      const stageRules = JSON.parse(response.result.stageRules);
      const evaluation = stageRules.evaluation;
      const QuestionAire = stageRules.questionnaire;
      setEvaluationId(evaluation || "");
      setQuestionareId(QuestionAire || "");
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getResumeJob();
  }, []);

  const handleButtonClick = async (status) => {
    try {
      const response = await updateRecruitmentJobResumesMapping({
        id: jobResumeMapping,
        modifiedBy: userid,
        currentStatus: status,
      });
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: `${response.message} `,
        });
        getResumeJob();
      }
    } catch (error) {
      return error;
    }
  };

  const getJobName = async () => {
    try {
      if (jobId) {
        const response = await getRecruitmentJobById({ id: jobId });
        setJobName(response.result[0].jobTitle);
        setJobstatus(response.result[0].jobStatus);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getJobName();
  }, [jobId]);

  const getAlljobs = async () => {
    try {
      const response = await getAllRecruitmentJobs({
        companyId: companyId,
        jobStatus: "Open",
      });
      const jobs = response.result.map((jobs) => ({
        label: jobs.jobTitle,
        key: jobs.jobId,
      }));
      setAllJob(jobs);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAlljobs();
  }, []);

  const jobs = (
    <Menu onClick={handleMenuClick1} className="h-[300px] overflow-auto">
      {allJob.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const [rating, setRating] = useState("");
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const SaveData = async () => {
    try {
      const response = await updateRecruitmentResume({
        id: resumeId,
        rating: rating,
        modifiedBy: userid,
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    SaveData();
  }, [rating]);

  const SavePriority = async () => {
    try {
      const response = await updateRecruitmentResume({
        id: resumeId,
        priority: priority,
        modifiedBy: userid,
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    SavePriority();
  }, [priority]);

  return (
    <div className="flex flex-col gap-6">
      {contextHolder}
      <div className="flex flex-col justify-between lg:flex-row lg:items-center">
        <Link onClick={navigateBack} className="backBtn vhcenter gap-2.5">
          <div className="bg-white border border-black rounded-full w-9 h-9 border-opacity-5 vhcenter">
            <PiArrowLeftBold className="text-xl text-primary" />
          </div>
          <p className="pblack">Back to All Candidates</p>
        </Link>
        <div className="gap-2 vhcenter">
          {getstatus !== null && jobstatus === "Open" && (
            <>
              <ButtonClick
                buttonName="UnderProcess"
                icon={<FcProcess className="text-white" />}
                handleSubmit={() => handleButtonClick(0)}
                BtnType={getstatus === "0" ? "primary" : ""}
              />
              <ButtonClick
                buttonName="Disqualify"
                icon={<FcHighPriority />}
                handleSubmit={() => handleButtonClick(2)}
                BtnType={getstatus === "2" ? "primary" : ""}
              />
              <ButtonClick
                buttonName="Hire"
                icon={<FcCheckmark />}
                handleSubmit={() => handleButtonClick(1)}
                BtnType={getstatus === "1" ? "primary" : ""}
              />
            </>
          )}
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
                <div className="size-[60px] rounded-full shadow border-2 border-white overflow-hidden bg-primaryalpha vhcenter">
                  {items.candidatePhoto ? (
                    <img
                      alt=""
                      className="object-cover object-center w-full h-full "
                      src={items.candidatePhoto}
                    />
                  ) : (
                    <span className="h6 !text-white !font-medium leading-none">
                      {items.candidateName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="inline-flex flex-col items-start justify-start gap-1">
                  <div className="gap-3 vhcenter">
                    <h2 className="h2">
                      {" "}
                      {items.candidateName
                        .split(" ")
                        .map(
                          (name) =>
                            name.charAt(0).toUpperCase() +
                            name.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </h2>
                    <PiBookmarkSimpleFill className=" text-[#12B76A] text-base" />
                    {jobName && (
                      <div className="bg-[#6A4BFC]/10 rounded-full px-4 py-1 text-[#6A4BFC] text-xs 2xl:text-sm font-semibold border border-[#6A4BFC]/20">
                        {/* {jobName ? jobName : "Choose Job"} */}
                        {jobName}
                      </div>
                    )}
                  </div>
                  <div className="inline-flex items-center justify-start gap-3">
                    <p className="flex items-center gap-1">
                      <MdLocationOn className="text-base text-primary" />
                      <p className="pblack !font-normal">
                        {items.candidateLocation}
                      </p>
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="pblack vhcenter gap-1">
                        <MdPhone className="text-base text-primary" />
                        {items.candidateContact}
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
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                  {jobId === "null" ? (
                    <Dropdown overlay={jobs} trigger={["click"]}>
                      <a className="pblack" onClick={(e) => e.preventDefault()}>
                        <Space>
                          Choose Job
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  ) : null}
                  {!jobName && (
                    <div className="bg-[#6A4BFC]/10 rounded-full px-4 py-1 text-[#6A4BFC] text-xs 2xl:text-sm font-semibold border border-[#6A4BFC]/20">
                      {jobName ? jobName : "Choose Job"}
                    </div>
                  )}
                </div>
                {jobstatus === "Open" && (
                  <div className="flex flex-col gap-3">
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a className="pblack" onClick={(e) => e.preventDefault()}>
                        <Space>
                          Stage
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                    <div className="bg-[#A95959]/10 rounded-full px-4 py-1 text-[#A95959] text-xs 2xl:text-sm font-semibold border border-[#A95959]/20">
                      {selectedItemLabel ? selectedItemLabel : "Choose Stage"}
                    </div>
                  </div>
                )}
                <Divider type="vertical" className="hidden h-auto lg:block" />
                <div className="flex flex-col gap-3">
                  <Dropdown
                    menu={{
                      items: priorityItems,
                      onClick: onClickPriority,
                      selectable: true,
                      defaultSelectedKeys: [{ priority }],
                    }}
                    trigger={["click"]}
                  >
                    <a className="pblack" onClick={(e) => e.preventDefault()}>
                      <Space>
                        Priority
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  <div className="flex gap-2 items-center">
                    <div className="size-3 flex justify-between items-baseline">
                      <span
                        className={`${
                          priority === "1"
                            ? "bg-red-500 opacity-100"
                            : priority === "2"
                            ? " bg-amber-500 opacity-100"
                            : "bg-[#12B76A] opacity-100"
                        } w-0.5 rounded-sm h-1`}
                      ></span>
                      <span
                        className={`${
                          priority === "1"
                            ? "bg-red-500 opacity-20"
                            : priority === "2"
                            ? "bg-amber-500 opacity-100"
                            : "bg-[#12B76A] opacity-100"
                        } w-0.5 rounded-sm h-2`}
                      ></span>
                      <span
                        className={`${
                          priority === "1"
                            ? "bg-red-500 opacity-20"
                            : priority === "2"
                            ? "bg-amber-500 opacity-20"
                            : "bg-[#12B76A] opacity-100"
                        } w-0.5 rounded-sm h-3`}
                      ></span>
                    </div>
                    <p
                      className={`pblack ${
                        priority === "1"
                          ? "!text-red-500"
                          : priority === "2"
                          ? "!text-amber-500"
                          : "!text-[#12B76A]"
                      }`}
                    >
                      {priority === "1"
                        ? "Low"
                        : priority === "2"
                        ? "Medium"
                        : "High"}
                    </p>
                  </div>
                </div>
                <Divider type="vertical" className="hidden h-auto lg:block" />
                <div className="flex flex-col gap-3">
                  <p className="pblack">Rating</p>
                  <Rate
                    allowHalf
                    defaultValue={1}
                    onChange={handleRatingChange}
                    value={rating}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <TabsNew
        tabs={jobId === "null" ? tabs2 : tabs}
        onTabChange={handleTabChange}
        initialTab={1}
      />
    </div>
  );
};

export default CandidateProfile;
