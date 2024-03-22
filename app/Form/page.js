"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EducationalDetails from "./Form-items/EducationalDetails";
import PersonalDetails from "./Form-items/PersonalDetails";
import Questions from "./Form-items/Questions";
import ButtonClick from "@components/ui/Button";
import Stepper from "@components/ui/Stepper";

import { RxCross2 } from "react-icons/rx";
import WorkExperience from "./Form-items/WorkExperience";
import Header1 from "./Form-items/Header";
import FlexCol from "@components/ui/FlexCol";
import Review from "./Form-items/Review";
import { useMediaQuery } from "react-responsive";
import {
  getAllRecruitmentJobResumesCustomFields,
  getAllRecruitmentResumeEducationalDetails,
  getAllRecruitmentResumesExperienceDetails,
  getRecruitmentResumeById,
  saveRecruitmentJobApplicationFormSetting,
  saveRecruitmentJobResumesCustomField,
  saveRecruitmentResume,
  saveRecruitmentResumeEducationalDetail,
  saveRecruitmentResumesExperienceDetail,
} from "@/Components/Api";
import Dropdown from "@/Components/ui/Dropdown";
import FormInput from "@/Components/ui/FormInput";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { RiCake2Line, RiDeleteBin5Line, RiFileList3Line, RiMailSendLine, RiMapPin2Line, RiMouseLine, RiSmartphoneLine } from "react-icons/ri";
import AddMore from "@/Components/ui/AddMore";
import TextArea from "@/Components/ui/TextArea";
import Accordion from "@/Components/ui/Accordion";
import { AiTwotoneEdit } from "react-icons/ai";
import PDFViewer from "@/Components/ui/PDFViewer";
import candidate from "@/public/Frame 427319140.png";
import pdfFile from "@/public/sample.pdf";
import { useRouter } from "next/router";
import { DatePicker } from "antd";
import DateSelect from "@/Components/ui/DateSelect";

function Web({closeDrawer,selectedJobId}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState(0);
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [formData, setFormData] = useState({});
  const [insertedid1, setinsertedId1] = useState(4);
  const [data,setData]=useState(null)
  const [educationaldetails,setEducationaldetails]=useState([])
  const [experience,setExperience]=useState([])
  const [customfield,setCustomfield]=useState([])
  const [additionalExperienceCount, setAdditionalExperienceCount] = useState(1);
  const [additionalEducationalDetailsCount, setAdditionalEducationalDetailsCount] = useState(2);
  const [steps, setSteps] = useState([
    {
      id: 1,
      value: 0,
      title: "Personal Details",
      data: "personaldetails",
    },

    {
      id: 2,
      value: 1,
      title: "Educational Details",
      data: "educationaldetails",
    },
    {
      id: 3,
      value: 2,
      title: "Work Experience",
      data: "workexperience",
    },

    {
      id: 4,
      value: 3,
      title: "Questions",
      data: "questions",
    },
    {
      id: 5,
      value: 4,
      title: "Review",
      data: "review",
    },
  ]);
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
  useEffect(() => {
    if (closeDrawer) {
      setCurrentStep(0);
      setActiveBtn(0)
    }
  }, [closeDrawer]);
  const [primaryColor, setPrimaryColor] = useState("");

 
  useEffect(() => {
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);
  const handleSubmitAllForms = async () => {
    // Submit the first form
    await formik.handleSubmit();
    // Check if the first form is valid and the necessary data is available
    if (formik.isValid) {
      // Submit the second form only if the current step is "EducationalDetails"
      // if (currentStep === "EducationalDetails") {
        await formik1.handleSubmit();
      // }
    }
    if (formik1.isValid) {
      await formik2.handleSubmit();
    }
    if (formik2.isValid) {
      await formik3.handleSubmit();
    }
    if (currentStep === 4 && closeDrawer) {
      closeDrawer();
    }
  };
  // const router = useRouter();
  // const { jobId } = router.query; 

  useEffect(() => {
    console.log(nextStep, activeBtn);
    if (activeBtn < 4 && activeBtn !== nextStep) {
      /// && activeBtn !== nextStep
      setActiveBtn(1 + activeBtn);
      setNextStep(nextStep);
      console.log(1 + activeBtn);
      console.log(steps?.[activeBtn + 1].data, "data");
      setActiveBtnValue(steps?.[activeBtn + 1].data);
    }
  }, [nextStep]);
  const handleNextStep = () => {
    if (activeBtn < steps.length - 1) {
      setActiveBtn(activeBtn + 1);
    }
    switch (currentStep) {
      // case 1:
      // return <PersonalDetails handleSubmit={(e)=>{handleSubmit(e)}}  />;
      case personaldetails:
        break;
      // case 2:
      //   return <EducationalDetails/>;
      case EducationalDetails:
        break;
      // case 3:
      //   return <WorkExperience />;
      case WorkExperience:
        break;
      // case 4:
      //   return <Questions />;
      case Questions:
        break;
      // case 5:
      //   return <Review/>
      case Review:
        break;
      default:
        return null;
    }
  };
  // const handleSubmit = async () => {
  //   try {
  //     // Call the API function with the form data
  //     const response = await saveRecruitmentJobApplicationFormSetting(formData);
  //     console.log("API Response:", response);
  //     // Handle the API response as needed
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleSubmit = async (values, callback) => {
    console.log("form data", values);
    if (activeBtn < steps.length - 1) {
      setActiveBtn(activeBtn + 1); // Increment the active step
      setCurrentStep(currentStep + 1); // Increment the current step
    }

    // try {
    //   // Call the API function to save recruitment resume
    //   const response = await saveRecruitmentResume(values);
    //   console.log("API Response:", response);
    //   callback(values)
    //   // Update formData state if needed
    //   setFormData(values);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    console.log(setFormData);
  };

  const handlePersonalDetailsSubmit = (values) => {
    // Process the form data received from PersonalDetails component
    console.log("Received data from PersonalDetails:", values || "null");
    // You can set the form data to the state or perform any other action here
    setFormData(values); // Example of setting form data to state
  };

  // const  = () => {
  //   switch (activeBtnValue) {
  //     // case 1:
  //       // return <PersonalDetails handleSubmit={(e)=>{handleSubmit(e)}}  />;
  // case personaldetails:
  //   break;
  //     // case 2:
  //     //   return <EducationalDetails/>;
  //     case EducationalDetails:
  //       break;
  //     // case 3:
  //     //   return <WorkExperience />;
  //     case WorkExperience:
  //       break;
  //     // case 4:
  //     //   return <Questions />;
  //     case Questions:
  //     break;
  //       // case 5:
  //       //   return <Review/>
  //       case Review:
  //         break;
  //     default:
  //       return null;
  //   }
  // };
  console.log(currentStep);

  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   candidateEmail: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   candidateContact: Yup.string().required("Phone number is required"),
  //   candidateLocation: Yup.string().required("Location is required"),
  //   city: Yup.string().required("City is required"),
  //   address: Yup.string().required("Address is required"),
  //   postalCode: Yup.string().required("Postal code is required"),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     resumeCode: 21,
  //     candidateName: "sdhbhj",
  //     namePrefix: "Mr",
  //     firstName: "",
  //     lastName: "",
  //     dob: "1998-09-23",
  //     cityOrTown: "",
  //     postalCode: "",
  //     addressLine: "",
  //     candidateLocation: "",
  //     candidateContact: "",
  //     candidateSource: "source1",
  //     candidateEmail: "",
  //     jobId: selectedJobId,
  //     createdBy: "154", // You may need to replace this with the actual createdBy value
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (values, { setSubmitting }) => {
  //     try {
  //       // Make your API call here
        
  //       const response = await saveRecruitmentResume(values);
  //       console.log("API Response:", response);
  //       console.log(response.result.insertedId,"inserted id responsee")
        
  //       setinsertedId1(response.result.insertedId);
  //       console.log(insertedid1);
  //       setActiveBtn(activeBtn + 1);

  //       setCurrentStep(currentStep + 1);
       
  //       // You can handle the API response here
  //       // For example, update UI, show success message, etc.
  //     } catch (error) {
  //       console.error("API Error:", error);
  //       // Handle API errors here
  //       // For example, show error message, handle form submission failure, etc.
  //     } finally {
  //       // Reset form state after submission (whether successful or not)
  //       setSubmitting(false);
  //     }
  //   },
  // });


  
  const formik = useFormik({
    initialValues: {
      resumeCode: 21,
      candidateName: "sdhbhj",
      namePrefix: "Mr",
      firstName: "",
      lastName: "",
      dob: "1998-09-23",
      cityOrTown: "",
      postalCode: "",
      addressLine: "",
      candidateLocation: "",
      candidateContact: "",
      candidateSource: "source1",
      candidateEmail: "",
      jobId: selectedJobId,
      createdBy: "154",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      candidateEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      candidateContact: Yup.string().required("Phone number is required"),
      candidateLocation: Yup.string().required("Location is required"),
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
      postalCode: Yup.string().required("Postal code is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Make your API call here
        
        const response = await saveRecruitmentResume(values);
        console.log("API Response:", response);
        console.log(response.result.insertedId,"inserted id responsee")
        
        setinsertedId1(response.result.insertedId);
        console.log(insertedid1);
        setActiveBtn(activeBtn + 1);

        setCurrentStep(currentStep + 1);
       
        // You can handle the API response here
        // For example, update UI, show success message, etc.
      } catch (error) {
        console.error("API Error:", error);
        // Handle API errors here
        // For example, show error message, handle form submission failure, etc.
      } finally {
        // Reset form state after submission (whether successful or not)
        setSubmitting(false);
      }
    },
  });


  // const validationSchema1 = Yup.object().shape({
    
  //   institute: Yup.string().required("School or University is required"),
  //   courseType: Yup.string().required("Degree is required"),
  //   courseName: Yup.string().required("Field of Study is required"),
  //   yearOfStudy: Yup.number()
  //     .required("Year is required")
  //     .positive("Year must be a positive number"),
  // });

  const formik1 = useFormik({
    initialValues: {
      resumeId: 21,
      institute: "",
      courseType: "",
      courseName: "",
      location: "loc1",
      yearOfStudy: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema1: Yup.object().shape({
      institute: Yup.string().required("School or University is required"),
      courseType: Yup.string().required("Degree is required"),
      courseName: Yup.string().required("Field of Study is required"),
      yearOfStudy: Yup.number()
        .required("Year is required")
        .positive("Year must be a positive number"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Append the inserted ID to the values before submitting
        // values.resumeId = insertedid;
        // Make API call to save educational details
        const response = await saveRecruitmentResumeEducationalDetail(values);
        console.log("Educational Details API Response:", response);
        setActiveBtn(activeBtn + 1);

        setCurrentStep(currentStep + 1);
        // Handle success response if needed
      } catch (error) {
        console.error("Error saving educational details:", error);
        // Handle error if the API call fails
      } finally {
        // Reset form state after submission (whether successful or not)
        setSubmitting(false);
      }
    },
  });
  // const validationSchema2 = Yup.object().shape({
  //   jobTitle: Yup.string().required("Job Title is required"),
  //   employmentType: Yup.string().required("Employment Type is required"),
  //   companyName: Yup.string().required("Company Name is required"),
  //   location: Yup.string().required("Location is required"),
  //   fromDate: Yup.string().required("From Date is required"),
  //   toDate: Yup.string().required("To Date is required"),
  // });

  const formik2 = useFormik({
    initialValues: {
      resumeId: 21,
      jobTitle: "",
      employmentType: "",
      companyName: "",
      location: "",
      fromDate: "",
      toDate: "",
      // coverLetter: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema2: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
    employmentType: Yup.string().required("Employment Type is required"),
    companyName: Yup.string().required("Company Name is required"),
    location: Yup.string().required("Location is required"),
    fromDate: Yup.string().required("From Date is required"),
    toDate: Yup.string().required("To Date is required"),
  }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Append the inserted ID to the values before submitting
        // values.resumeId = insertedid;
        // Make API call to save educational details
        const response = await saveRecruitmentResumesExperienceDetail(values);
        console.log("work experience Details API Response:", response);
        // Handle success response if needed
      } catch (error) {
        console.error("Error saving work experience details:", error);
        // Handle error if the API call fails
      } finally {
        // Reset form state after submission (whether successful or not)
        setSubmitting(false);
      }
    },
  });
  // const validationSchema3 = Yup.object().shape({
  //   customQuestion: Yup.string().required("This field is required"),
  //   highestEducationLevel: Yup.string().required("This field is required"),
  // });
  const handleAddMoreExperience = () => {
    // Increase the count to display additional input fields
    setAdditionalExperienceCount(prevCount => prevCount + 1);
  };
  const handleAddMoreWorkDetails = () => {
    // Increase the count to display additional input fields
    setAdditionalEducationalDetailsCount(prevCount => prevCount + 1);
  };
  const handledelete =()=>{
    setAdditionalEducationalDetailsCount(prevCount=>prevCount-1)
  }
  

  const formik3 = useFormik({
    initialValues: {
      customQuestion: "",
      jobId: selectedJobId,
      resumeId: 21,
      // highestEducationLevel: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema3: Yup.object().shape({
      customQuestion: Yup.string().required("This field is required"),
      highestEducationLevel: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Append the inserted ID to the values before submitting
        // values.resumeId = insertedid;
        // Make API call to save educational details
        const response = await saveRecruitmentJobResumesCustomField(values);
        console.log("question Details API Response:", response);
        // Handle success response if needed
      } catch (error) {
        console.error("Error saving question details:", error);
        // Handle error if the API call fails
      } finally {
        // Reset form state after submission (whether successful or not)
        setSubmitting(false);
      }
    },
  });
  // Function to handle submission of personal details and progress to educational details
  // const handleSubmitPersonalDetails = async () => {
  //   await formikPersonalDetails.handleSubmit(); // Submit personal details form
  //   if (formikPersonalDetails.isValid && insertedId) {
  //     // If personal details form is valid and inserted ID is available
  //     formikEducationalDetails.handleSubmit(); // Submit educational details form
  //   }
  // };
  useEffect(() => {
    const fetchapi = async () => {
      try {
         // Check if the current step is the review page
          const response = await getRecruitmentResumeById(insertedid1);
          setData(response.result.data.data);
          // console.log(insertedid1, "dfrfgreg");
          console.log(response,"resume api res");
          console.log(data,"dhcdghcvhd");
        
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchapi();
  }, []);


  useEffect(() => {
    const callapi = async () => {
      try {
        if (currentStep === 4) { // Check if the current step is the review page
          const response = await getAllRecruitmentResumeEducationalDetails(insertedid1);
          setEducationaldetails(response);
          console.log(insertedid, "dfrfgreg");
          console.log(response);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    callapi();
  }, [currentStep]);

  useEffect(() => {
    const callapi = async () => {
      try {
        if (currentStep === 4) { // Check if the current step is the review page
          const response = await getAllRecruitmentResumesExperienceDetails(insertedid1);
          setExperience(response);
          console.log(insertedid, "dfrfgreg");
          console.log(response);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    callapi();
  }, [currentStep]);

  useEffect(() => {
    const callapi = async () => {
      try {
        if (currentStep === 4) { // Check if the current step is the review page
          const response = await getAllRecruitmentJobResumesCustomFields(insertedid1);
          setCustomfield(response);
          console.log(insertedid1, "dfrfgreg");
          console.log(response);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    callapi();
  }, [currentStep]);
  
  
  
  return (
    <div className="flex flex-col gap-6  container-wrapper ">
      <FlexCol />
      <Header1 closeDrawer={closeDrawer} />
      <div className="flex flex-col gap-6 max-w-[1070px] w-full mx-auto  ">
        {steps && (
          <div className=" sticky -top-6 w-full z-50 px-5  dark:bg-[#1f1f1f] pb-10 ">
            <Stepper
              currentStepNumber={activeBtn}
              presentage={presentage}
              // direction="left"
              // labelPlacement="vertical"
              steps={steps}
              // className=" text-sm font-medium"
              // style={{
              //   fontSize: isSmallScreen ? "8px" : "10px",
              //   fontWeight: 600,
              // }}
              // // className="text-[10px]"
              // size={isSmallScreen ? "default" : "large"}
            />
          </div>
        )}
      </div>
      {/* {renderStep()} */}
      <div className="flex flex-col gap-6">
        {currentStep === 0 ? (
          <>
            <FlexCol />
            <div className="relative  w-full mx-auto borderb rounded-md">
              <FlexCol />
              <div className="relative flex flex-col gap-12">
                <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">Personal Information </h1>
                        <p className="para">
                          lorem ipsum dummy text dolar sit.
                        </p>
                      </div>
                    </button>
                  </h2>
                  {/* <form onSubmit={formik.handleSubmit}> */}
                  <form>
                    <div
                      id={`acco-text-item`}
                      role="region"
                      aria-labelledby={`acco-title-item`}
                      className="flex flex-col gap-6  justify-between w-full px-6 py-4"
                    >
                      <div className="grid  grid-cols-2 sm:grid-cols-6 gap-4">
                        <Dropdown
                          title={"Prefix"}
                          placeholder={"Mr"}
                          options={[{ label: "Miss", value: "miss" }]}
                          // className="text-[#344054]"
                          // onChange={formik.handleChange}

                          name="namePrefix"
                          value={formik.values.namePrefix}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormInput
                          title={"First Name"}
                          placeholder={"First Name"}
                          // className="text-[#344054] "
                          name="firstName"
                          value={formik.values.firstName}
                          change={(e) => {
                            formik.setFieldValue("firstName", e);
                            console.log("First Name:", e);
                          }}
                          required={false}
                          error={ formik.errors.firstName}
                        />
                        <FormInput
                          title={"Last Name"}
                          placeholder={"Last Name"}
                          // className="text-[#344054]"
                          name="lastName"
                          value={formik.values.lastName}
                          change={(e) => {
                            formik.setFieldValue("lastName", e);
                          }}
                          required={true}
                          error={formik.errors.lastName}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormInput
                          title={"Email"}
                          placeholder={"Email Address"}
                          // className="text-[#344054]"
                          name="candidateEmail"
                          value={formik.values.candidateEmail}
                          change={(e) => {
                            formik.setFieldValue("candidateEmail", e);
                          }}
                          required={true}
                          error={formik.errors.candidateEmail}
                        />
                        <FormInput
                          title={"Phone Number"}
                          placeholder={"1234656987"}
                          // className="text-[#344054]"
                          value={formik.values.candidateContact}
                          change={(e) => {
                            formik.setFieldValue("candidateContact", e);
                          }}
                          required={true}
                          error={formik.errors.candidateContact}
                        />
                      </div>
                      <div className="relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black">
                        <div className="flex min-w-0 gap-x-4 pt-5 pl-5">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src=""
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <label
                              htmlFor="resumeUpload"
                              className="cursor-pointer"
                            >
                              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                Click to upload or drag and drop{" "}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-white dark:text-opacity-50">
                                PDF, DOCX Format only (5 mb max)
                              </p>
                            </label>
                            <input
                              id="resumeUpload"
                              type="file"
                              className="hidden"
                              // onChange={handleFileUpload}
                              accept=".pdf,.docx"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormInput
                          title={"Location"}
                          placeholder={"United Arab Emirates"}
                          // className="text-[#344054]"
                          value={formik.values.candidateLocation}
                          change={(e) => {
                            formik.setFieldValue("candidateLocation", e);
                          }}
                          required={true}
                          error={formik.errors.candidateLocation}
                        />
                        <FormInput
                          title={"City or Town"}
                          placeholder={"Type here..."}
                          // className="text-[#344054]"
                          value={formik.values.city}
                          change={(e) => {
                            formik.setFieldValue("city", e);
                          }}
                          required={true}
                          error={formik.errors.city}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormInput
                          title={"Address Line"}
                          placeholder={"Type here..."}
                          // className="text-[#344054]"
                          value={formik.values.address}
                          change={(e) => {
                            formik.setFieldValue("address", e);
                          }}
                          required={true}
                          error={formik.errors.address}
                        />
                        <FormInput
                          title={"Postal Code"}
                          placeholder={"Type here..."}
                          // className="text-[#344054]"
                          value={formik.values.postalCode}
                          change={(e) => {
                            formik.setFieldValue("postalCode", e);
                          }}
                          required={true}
                          error={formik.errors.postalCode}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : currentStep === 1 ? (
          <>
            <FlexCol />
            <div className="relative  w-full mx-auto borderb rounded-md">
              <FlexCol />
              <div className="relative flex flex-col gap-12">
                <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">Educational Details </h1>
                        <p className="para">
                          lorem ipsum dummy text dolar sit.
                        </p>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`acco-text-item`}
                    role="region"
                    aria-labelledby={`acco-title-item`}
                    className="flex flex-col gap-6  justify-between w-full px-6 py-4"
                  >
                     {[...Array(additionalEducationalDetailsCount)].map((_, index) => (
                      <>
                    <div className="grid grid-cols-1  sm:grid-cols-3 gap-4">
                      <FormInput
                        title={"School or University"}
                        placeholder={"Eg: Boston University"}
                        className="text-[#344054]"
                        name="institute"
                        value={formik1.values.institute}
                        change={(e) => {
                          formik1.setFieldValue("institute", e);
                        }}
                        required={true}
                        error={formik1.errors.institute}
                      />
                      <FormInput
                        title={"Degree"}
                        placeholder={"Eg: Bachelor’s"}
                        name="courseType"
                        className="text-[#344054]"
                        value={formik1.values.courseType}
                        change={(e) => {
                          formik1.setFieldValue("courseType", e);
                        }}
                        required={true}
                        error={formik1.errors.courseType}
                      />
                    </div>
                    <div className="grid  grid-cols-1  sm:grid-cols-3 gap-4">
                      <FormInput
                        title={"Field of Study"}
                        placeholder={"Eg: Business"}
                        className="text-[#344054]"
                        name="courseName"
                        value={formik1.values.courseName}
                        change={(e) => {
                          formik1.setFieldValue("courseName", e);
                        }}
                        required={true}
                        error={formik1.errors.courseName}
                      />
                      {/* <FormInput
                        title={"Year"}
                        placeholder={"Year"}
                        className="text-[#344054]"
                        name="yearOfStudy"
                        value={formik1.values.yearOfStudy}
                        change={(e) => {
                          formik1.setFieldValue("yearOfStudy", e);
                        }}
                        required={true}
                        error={formik1.errors.yearOfStudy}
                      /> */}
                      <DateSelect
                       title={"Year"}
                      //  placeholder={"Year"}
                       className="text-[#344054]"
                       name="yearOfStudy"
                       selectpicker="year"
                       value={formik1.values.yearOfStudy}
                       change={(e) => {
                         formik1.setFieldValue("yearOfStudy", e);
                       }}
                       required={true}
                       error={formik1.errors.yearOfStudy}/>
                       {/* <DatePicker
        onChange={(e) => {
          formik1.setFieldValue("yearOfStudy", e);
        }}
        picker="year"
        // Add your own styling here
      /> */}
      <div className="flex items-center justify-end">
        <button onClick={handledelete}>
                    <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px]" />
                    </button>
                </div>
                    </div>
                   
                   
                    <div className="divider-h" />
                    </>
                    ))}
                    {/* <div className="grid  grid-cols-1  sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"School or University"}
                    placeholder={"Eg: Boston University"}
                    className="text-[#344054]"
                    name="schoolOrUniversity"
                    value={formik1.values.schoolOrUniversity}
                    change={(e)=>{
                      formik1.setFieldValue('schoolOrUniversity',e)
                    }}
                    required={true}
                    error={formik1.errors.schoolOrUniversity}
                  />
                  <FormInput
                    title={"Degree"}
                    placeholder={"Eg: Bachelor’s"}
                    className="text-[#344054]"
                    name="degree"
                    
                    value={formik1.values.degree}
                    change={(e)=>{
                      formik1.setFieldValue('degree',e)
                    }}
                    required={true}
                    error={formik1.errors.degree}
                  />
                </div>
                <div className="grid  grid-cols-1  sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"Field of Study"}
                    placeholder={"Eg: Business"}
                    className="text-[#344054]"
                    name="fieldOfStudy"
                  
                    value={formik1.values.fieldOfStudy}
                    change={(e)=>{
                      formik1.setFieldValue('fieldOfStudy',e)
                    }}
                    required={true}
                    error={formik1.errors.fieldOfStudy}
                  />
                  <FormInput
                    title={"Year"}
                    placeholder={"Year"}
                    className="text-[#344054]"
                    name="year"
                  
                    value={formik1.values.year}
                    change={(e)=>{
                      formik1.setFieldValue('year',e)
                    }}
                    required={true}
                    error={formik1.errors.year}
                  />

                  <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px] justify-end " />
                </div> */}
                
                    <AddMore name="Add More Education "  
                    change={handleAddMoreWorkDetails}/>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentStep === 2 ? (
          <>
          
            <FlexCol />
            <div className="relative  w-full mx-auto borderb rounded-md">
              <FlexCol />
              <div className="relative flex flex-col gap-12">
                <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">Work Experience Details </h1>
                        <p className="para">
                          lorem ipsum dummy text dolar sit.
                        </p>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`acco-text-item`}
                    role="region"
                    aria-labelledby={`acco-title-item`}
                    className="flex flex-col gap-6  justify-between w-full px-6 py-4"
                  >
                     {[...Array(additionalExperienceCount)].map((_, index) => (
                      <>
                    <div  key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormInput
                        title={"Job Title"}
                        placeholder={"Eg: Retail Sales Manager"}
                        className="text-[#344054]"
                        name="jobTitle"
                        value={formik2.values.jobTitle}
                        change={(e) => {
                          formik2.setFieldValue("jobTitle", e);
                        }}
                        required={true}
                        error={formik2.errors.jobTitle}
                      />

                      <FormInput
                        title={"Employment Type"}
                        placeholder={"Eg: Fulltime"}
                        className="text-[#344054]"
                        name="employmentType"
                        value={formik2.values.employmentType}
                        change={(e) => {
                          formik2.setFieldValue("employmentType", e);
                        }}
                        required={true}
                        error={formik2.errors.employmentType}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormInput
                        title={"Company Name"}
                        placeholder={"Eg: Microsoft"}
                        className="text-[#344054]"
                        name="companyName"
                        value={formik2.values.companyName}
                        change={(e) => {
                          formik2.setFieldValue("companyName", e);
                        }}
                        required={true}
                        error={formik2.errors.companyName}
                      />

                      <FormInput
                        title={"Location"}
                        placeholder={"Eg: London, UK"}
                        className="text-[#344054]"
                        name="location"
                        value={formik2.values.location}
                        change={(e) => {
                          formik2.setFieldValue("location", e);
                        }}
                        required={true}
                        error={formik2.errors.location}
                      />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                      <DateSelect
                        title={"From"}
                        placeholder={"09/2023"}
                        className="text-[#344054]"
                        name="fromDate"
                        value={formik2.values.fromDate}
                        change={(e) => {
                          formik2.setFieldValue("fromDate", e);
                        }}
                        required={true}
                        error={formik2.errors.fromDate}
                      />
                      <DateSelect
                        title={"To"}
                        placeholder={"09/2024"}
                        selectpicker="dateandtime"
                        className="text-[#344054]"
                        name="toDate"
                        value={formik2.values.toDate}
                        change={(e) => {
                          formik2.setFieldValue("toDate", e);
                        }}
                        required={true}
                        error={formik2.errors.toDate}
                      />
                      
                    </div>
                    </>
                    ))}
                    <AddMore
                      name="Add More Experience "
                      className="text-black"
                      change={handleAddMoreExperience}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <FlexCol />
              <div className="relative   w-full mx-auto borderb rounded-md ">
                <FlexCol />
                <div className="relative flex flex-col gap-12">
                  <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                    <h2>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                        style={{ backgroundColor: `${primaryColor}10` }}
                      >
                        <div className="text-left rtl:text-right">
                          <h1 className="acco-h1">Resume & Cover Letter </h1>
                          <p className="para">
                            lorem ipsum dummy text dolar sit.
                          </p>
                        </div>
                      </button>
                    </h2>
                    <div
                      id={`acco-text-item`}
                      role="region"
                      aria-labelledby={`acco-title-item`}
                      className="flex flex-col gap-6  justify-between w-full px-6 py-4"
                    >
                      <div className="relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black">
                        <div className="flex min-w-0 gap-x-4 pt-5 pl-5">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src=""
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                              Click to upload or drag and drop{" "}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              PDF, DOCX Format only (5 mb max)
                            </p>
                          </div>
                        </div>
                      </div>
                      <TextArea
                        title="Cover Letter"
                        placeholder="Type here"
                        className="!text-[#344054]"
                        name="coverLetter"
                        value={formik.values.coverLetter}
                        change={(e) => {
                          formik.setFieldValue("coverLetter", e);
                        }}
                        required={true}
                        error={formik.errors.coverLetter}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentStep === 3 ? (
          <>
            <FlexCol />
            <div className="relative  w-full mx-auto borderb rounded-md">
              <FlexCol />
              <div className="relative flex flex-col gap-12">
                <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">Prerequisite </h1>
                        <p className="para">
                          lorem ipsum dummy text dolar sit.
                        </p>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`acco-text-item`}
                    role="region"
                    aria-labelledby={`acco-title-item`}
                    className="flex flex-col gap-6  justify-between w-full px-6 py-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                      <FormInput
                        title={
                          "Are you legally eligible to work in the country?"
                        }
                        placeholder={"Answer here.."}
                        className="text-[#344054]"
                        name="customQuestion"
                        value={formik3.values.customQuestion}
                        change={(e) => {
                          formik3.setFieldValue("customQuestion", e);
                        }}
                        required={true}
                        error={formik3.errors.customQuestion}
                      />
                    </div>
                    <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormInput
                        title={"Highest level of education completed"}
                        placeholder={"Answer here.."}
                        className="text-[#344054]"
                        name="highestEducationLevel"
                        value={formik3.values.highestEducationLevel}
                        change={(e) => {
                          formik3.setFieldValue("highestEducationLevel", e);
                        }}
                        required={true}
                        error={formik3.errors.highestEducationLevel}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormInput
                        title={"Highest level of education completed"}
                        placeholder={"Answer here.."}
                        className="text-[#344054]"
                        name="highestEducationLevel"
                        value={formik3.values.highestEducationLevel}
                        change={(e) => {
                          formik3.setFieldValue("highestEducationLevel", e);
                        }}
                        required={true}
                        error={formik3.errors.highestEducationLevel}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormInput
                        title={"Highest level of education completed"}
                        placeholder={"Answer here.."}
                        className="text-[#344054]"
                        name="highestEducationLevel"
                        value={formik3.values.highestEducationLevel}
                        change={(e) => {
                          formik3.setFieldValue("highestEducationLevel", e);
                        }}
                        required={true}
                        error={formik3.errors.highestEducationLevel}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentStep === 4 ? (
          <>
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
                    {/* <p className="acco-h1">{data.candidateName}</p> */}
                  </div>
                </div>
                 {/* <div>
                  {educationaldetails.map((user) => (
                    <UserInfoComponent
                      key={user.personal[0].id}
                      personalInfo={user.personal}
                    />
                  ))}
                </div> */}
                <div className="v-divider" />
               
                <div className="flex flex-col gap-4 box-wrapper">
                  <h6 className="h6">Education</h6>
                  <div className="flex flex-col divide-y">
                    {/* {educationaldetails.map((edu, index) => ( */}
                      <div
                        // key={index}
                        className="flex justify-start gap-5 py-3 2xl:py-6"
                      >
                        <img
                          className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 rounded-full shadow"
                          src="https://via.placeholder.com/60x60"
                        />
                        <div className="inline-flex flex-col items-start justify-start gap-1">
                          <div className="gap-2 vhcenter">
                            {/* <h6 className="h6">{edu.institute}</h6> */}
                            {/* <p className="para p-1.5 rounded-md bg-secondaryWhite !leading-none">
              {work.Shift}
            </p> */}
                          </div>

                          <div className="flex flex-col gap-4">
                            {/* <p className="h6 !font-medium">{edu.courseType}</p> */}
                            <div className="flex gap-3">
                              <p className="para !font-normal text-opacity-70">
                                {/* {edu.yearOfStudy} */}
                              </p>

                              <p className="para !font-normal text-opacity-70">
                                {/* {edu.location} */}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/* ))} */}
                  </div> 
                </div>
                <div className="flex flex-col gap-4 box-wrapper">
                  <h6 className="h6">All Experiences</h6>
                  <div className="flex flex-col divide-y">
                    {/* {experience.map((work, index) => ( */}
                      <div
                        // key={index}
                        className="flex items-center justify-start gap-5 py-3 2xl:py-6"
                      >
                        <img
                          className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 rounded-full shadow"
                          src="https://via.placeholder.com/60x60"
                        />
                        <div className="inline-flex flex-col items-start justify-start gap-1">
                          <div className="gap-2 vhcenter">
                            {/* <h6 className="h6">{work.companyName}</h6> */}
                            <p className="para p-1.5 rounded-md bg-secondaryWhite dark:bg-secondaryDark !leading-none">
                              {/* {work.employmentType} */}
                            </p>
                          </div>

                          <div className="inline-flex items-center justify-start gap-4">
                            {/* <p className="!text-opacity-50 h6">{work.jobTitle}</p> */}
                            <p className="para !font-normal text-opacity-70">
                              {/* {work.experienceDuration} */}
                            </p>

                            <p className="para !font-normal text-opacity-70">
                              {/* {work.fromDate}, {work.toDate} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    {/* ))} */}
                  </div>
                </div>
              </Accordion>

              <div className="box-wrapper">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h6 className="h6 !text-black dark:!text-white">
                      CV / Resume
                    </h6>
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
                  <PDFViewer pdfUrl={pdfFile} />
                </div>
                <div className="divider-h mt-9" />
                <div className="flex flex-col gap-8 mt-8">
                  <h2 className="h6">Prerequisite</h2>
                </div>
                <div className="inline-flex flex-col items-start justify-start pt-4 gap-7">
                  {/* {customfield?.map((quest) => ( */}
                    <div className="flex flex-col gap-3">
                    {/* key={quest.id} */}
                      <div className="flex">
                        <div className="w-12 ">
                          {/* <span className="pblack">Q{quest.id}.</span> */}
                        </div>
                        <div>
                          <span className="pblack !text-opacity-80">
                            {/* {quest.customQuestion} */}
                          </span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-12 ">
                          <p className="pblack">Ans.</p>
                        </div>
                        <p className="pblack !text-opacity-80">
                          {/* {quest.answer} */}
                        </p>
                      </div>
                    </div>
                  {/* // ))} */}
                </div>
              </div>
            </div>
          </>
          
        ) : null}
      </div>
  
      <div className="divider-h mt-10 bottom-0" />
      <div className="flex gap-2.5 p-1.5 justify-end ">
        <ButtonClick
          buttonName="Cancel"
          icon={<RxCross2 />}
          className={"dark:text-white"}
          handleSubmit={closeDrawer}
        />
        <ButtonClick
          buttonName="Save & Continue"
          BtnType="primary"
          handleSubmit={handleSubmitAllForms}
          disabled={formik.isSubmitting}
        />
      </div>
    </div>
  );
}

export default Web;
