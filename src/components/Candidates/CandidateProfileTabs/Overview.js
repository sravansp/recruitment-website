import Accordion from "../../common/Accordion";
import React, { useState,useEffect } from "react";
import TabsNew from "../../common/TabsNew";
import {getAllRecruitmentResumeEducationalDetails,getAllRecruitmentResumesExperienceDetails, getRecruitmentResumeById } from "../../Api1";
import { useDispatch, useSelector } from 'react-redux';

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
import { BsFileEarmarkRichtext } from "react-icons/bs";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import PDFViewer from "../../common/PDFViewer";
import pdfFile from "../../../assets/documents/sample.pdf";
// import {educationExperiences } from "../../common/DataArrays";
import { useParams } from "react-router-dom";

// const userInfo = [
//   {
//     personal: [
//       {
//         id: 1,
//         label: "Email Address",
//         value: "",
//         icon: <RiMailSendLine />,
//       },
//       {
//         id: 2,
//         label: "Phone number",
//         value: "",
//         icon: <RiSmartphoneLine />,
//       },
//       {
//         id: 3,
//         label: "Date of Birth",
//         value: "03 September 2000",
//         icon: <RiCake2Line />,
//       },
//       {
//         id: 4,
//         label: "Salary Expectation",
//         value: "AED 25000",
//         icon: <RiMoneyDollarBoxLine />,
//       },
//     ],
//     other: [
//       {
//         id: 5,
//         label: "Location",
//         value: "",
//         icon: <RiMapPin2Line />,
//       },
//       {
//         id: 6,
//         label: "Work Type",
//         value: "Work Type",
//         icon: <RiMouseLine />,
//       },
//     ],
//   },
// ];

const Overview = ({ onEmailSelect }) => {
  const [content, setContent] = useState("");
  const primaryColor = localStorage.getItem("mainColor");
  const[candidate,setcandidate] =useState([])
  const[userdata,setuserdata]=useState([])
  const selectedDataId = useSelector((state) => state.dataId.selectedDataId);
  const { resumeId } = useParams();
  const[PdFViewer,setPdFViewer] = useState("")
  const id = resumeId
  const [candidateEmail, setCandidateEmail] = useState(""); // State to store candidate email

  const handleViewResume = () => {
    window.open(PdFViewer, "_blank"); // Open PDF URL in a new tab
  };
  const getCandidatesById = async () => {
    try {
      const response = await getRecruitmentResumeById(id);
       
      setcandidate(response.result)
      setCandidateEmail(response.result[0].candidateEmail)
      setuserdata(response.result.map((items)=>({
       personal:[ 
        {id:1,
          label:"Email Address",
          value:items.candidateEmail,
          icon: <RiMailSendLine />,
        },
        {
          id:2,
          label:"Phone number",
          value:items.candidateContact,
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
      other:[
        {
          id: 5,
          label: "Location",
          value: items.candidateLocation,
          icon: <RiMapPin2Line />,
        },
        {
          id: 6,
          label: "Work Type",
          value: "Work Type",
          icon: <RiMouseLine />,
        },
      ]
      })))
      setPdFViewer(response.result[0].resumeFile)


      console.log(response.result)
      console.log(PdFViewer)
  
    } catch (error) {
      console.error('Error updating workflow ID:', error);
    }
  };
  
  useEffect(() => {
   
    getCandidatesById()
    console.log(id)
    console.log(userdata)
   
    
  
  
  }, []);

  useEffect(() => {
    if (candidateEmail) {
      onEmailSelect(candidateEmail); // Trigger the callback when the email is available
    }
  }, [candidateEmail, onEmailSelect]);
  const[workExperiences,setexperience] =useState([])

  const getEmployeExperiance = async()=>{
    try{
      const response = await getAllRecruitmentResumesExperienceDetails(id);
      console.log(response)
      setexperience(response.result.map((items)=>({
        companyName:items.companyName,
        Shift:items.employmentType,
        role:items.jobTitle,
        startDate:items.fromDate,
        endDate:items.toDate,
        experienceDuration:items.location
      })))
    }catch(error){
     console.log(error)
    }
  }
  const[educationExperiences,seteducationExperiences] = useState([])
  const getEducationList = async ()=>{
   try
      {
       const response = await getAllRecruitmentResumeEducationalDetails(id)
      console.log(response)
      seteducationExperiences(response.result.map((item)=>({
        institution:item.institute,
        degree:item.courseType,
        fieldOfStudy:item.courseName,
        location:item.location,
        graduationYear:item.yearOfStudy,
      })))
      }catch(error){
        console.log(error)
      }

  }



  useEffect(()=>{
    getEmployeExperiance()
    getEducationList()
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
  
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLOUMN  */}
      
      <div className="flex flex-col gap-6 lg:col-span-8">
        

        <Accordion
          title="All Personal Informations"
          padding={true}
          className={""}
          initialExpanded={true}
        >
          
          <div>
            {userdata.map((user) => (
              <UserInfoComponent
                key={user.personal[0].id}
                personalInfo={user.personal}
              />
            ))}
          </div>
          <div className="v-divider" />
          <div>
            {userdata.map((user) => (
              <UserOtherComponent
                key={user.other[0].id}
                otherInfo={user.other}
              />
            ))}
          </div>
        </Accordion>

        <div className="box-wrapper h-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h6 className="h6 !text-black dark:!text-white">CV / Resume</h6>
              <ButtonClick buttonName="Add Cover Note" icon={<IoMdAdd />} />
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
                buttonName="View Resume"
                BtnType="primary"
                icon={<RiArrowDownLine />}
                handleSubmit={handleViewResume}
                
              />
            </div>
            <div className="divider-h" />
            
          </div>
        </div>
        {/* WORK EXPERIENCE  */}
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

        {/* EDUCATION  */}
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
      </div>

      {/* RIGHT COLUMN  */}
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1}  />
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

// Accordiyan Body Contents
const UserInfoComponent = ({ personalInfo}) => {
  
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
const UserOtherComponent = ({ otherInfo }) => {
  console.log(otherInfo);
  return (
    <div className="grid gap-7">
      {otherInfo.map((info) => (
        <div   className="flex items-center gap-2.5">
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
