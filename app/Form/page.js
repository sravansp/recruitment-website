"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import EducationalDetails from "./Form-items/EducationalDetails";
import PersonalDetails from "./Form-items/PersonalDetails";
import { TfiLocationPin } from "react-icons/tfi";
import { LiaAddressCard } from "react-icons/lia";
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
  getAllRecruitmentJobApplicationFormSettings,
  getAllRecruitmentJobResumesCustomFields,
  getAllRecruitmentResumeEducationalDetails,
  getAllRecruitmentResumesExperienceDetails,
  getRecruitmentJobApplicationFormSettingById,
  getRecruitmentJobById,
  getRecruitmentJobResumesCustomFieldById,
  getRecruitmentQuestionnaireTemplateDetailsById,
  getRecruitmentResumeById,
  imageupload,
  saveRecruitmentJobApplicationFormSetting,
  saveRecruitmentJobResumesCustomField,
  saveRecruitmentResume,
  saveRecruitmentResumeEducationalDetail,
  saveRecruitmentResumeEducationalDetailBatch,
  saveRecruitmentResumesExperienceDetail,
  saveRecruitmentResumesExperienceDetailBatch,
  saveorUpdateRecruitmentJobResumesCustomFieldBatch,
  updateRecruitmentResume,
  updateRecruitmentResumeEducationalDetail,
} from "@/Components/Api";
import Dropdown from "@/Components/ui/Dropdown";
import FormInput from "@/Components/ui/FormInput";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  RiCake2Line,
  RiDeleteBin5Line,
  RiFileList3Line,
  RiMailSendLine,
  RiMapPin2Line,
  RiMoneyDollarBoxLine,
  RiMouseLine,
  RiSmartphoneLine,
} from "react-icons/ri";
import AddMore from "@/Components/ui/AddMore";
import TextArea from "@/Components/ui/TextArea";
import Accordion from "@/Components/ui/Accordion";
import { AiTwotoneEdit } from "react-icons/ai";
import PDFViewer from "@/Components/ui/PDFViewer";
import candidate from "@/public/Frame 427319140.png";
import uploader from "@/public/image 339.png";
import pdfFile from "@/public/sample.pdf";
import { useRouter } from "next/router";
import { Button, DatePicker, AntdModal, Modal, notification, Tooltip, Checkbox, Radio } from "antd";
import DateSelect from "@/Components/ui/DateSelect";
import Modal2 from "@/Components/ui/Modal";
import { IoIosArrowBack } from "react-icons/io";
import { fileAction } from "@/Components/Api1";
import FileUpload from "@/Components/ui/FileUpload";
import noImg from "@/public/noImg.webp";

function Web({ closeDrawer, selectedJobId, onClick }) {
  const questidRef = useRef(null);

  const [currentStep, setCurrentStep] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState(0);
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [formData, setFormData] = useState({});
  const [insertedid1, setinsertedId1] = useState();
  const [data, setData] = useState([{}]);
  const [educationaldetails, setEducationaldetails] = useState([]);
  const [experience, setExperience] = useState([]);
  const [customfield, setCustomfield] = useState([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [eduinsertedid, seteduinsertedid] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [questid, setQestid] = useState(null);
  const [questtemp, setQuesttemp] = useState([]);
  const [filePdf, setfilepdf] = useState("");
  const [filePdfresume, setfilepdfresume] = useState("");

  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [coverLetter, setCoverletter] = useState("");
  const [questionfield, setQuestionfield] = useState("");

  //
  const [instituteerror, setInstituteerror] = useState("");
  const [coursetype, setCoursetype] = useState("");
  const [coursename, setCoursename] = useState("");
  const [yearofstudy, setYearofstudy] = useState("");

  const [jobtitle, setjobtitle] = useState("");
  const [employmenttype, setemploymenttype] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [location, setlocation] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");

  const [exp, setExp] = useState("");
  const [selectedValues, setSelectedValues] = useState(null);
  const [dropdownvalue, Setdopdownvalue] = useState(null);
  const [textAreaValue, setTextAreavalue] = useState(null);
  const [forminputvalue, setForminputValue] = useState(null);
  const [jobResumeEvaluationId, setjobResumeEvaluationId] = useState([]);
  const [fetchedAnswers, setfetchedAnswers] = useState([]);
  const [quesData, setQuesData] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [formvalidation, setFormvalidation] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [additionalExperienceCount, setAdditionalExperienceCount] = useState(1);
  const [
    additionalEducationalDetailsCount,
    setAdditionalEducationalDetailsCount,
  ] = useState([1]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // const [additionalEducationalDetails, setAdditionalEducationalDetails] =
  //   useState(
  //     Array.from({ length: additionalEducationalDetailsCount }, () => ({
  //       institute: "",
  //       courseType: "",
  //       courseName: "",
  //       yearOfStudy: "",
  //     }))
  //   );
  const [additionalExperiences, setAdditionalExperiences] = useState([
    {
      id: 1,
      resumeId: insertedid1,
      jobTitle: "",
      employmentType: "",
      companyName: "",
      location: "",
      fromDate: "",
      toDate: "",
    },
  ]);
  const handleAddMoreExperience = () => {
    setAdditionalExperiences((prevadditionalExperiences) => [
      ...prevadditionalExperiences,
      {
        id: prevadditionalExperiences.length + 1,
        jobTitle: "",
        employmentType: "",
        companyName: "",
        location: "",
        fromDate: "",
        toDate: "",
      },
    ]);
  };

  const handleAddMoreEducationalDetails = () => {
    setAdditionalEducationalDetails((prevadditionalEducationalDetails) => [
      ...prevadditionalEducationalDetails,
      {
        id: prevadditionalEducationalDetails.length + 1,
        resumeId: insertedid1,
        institute: "",
        courseType: "",
        courseName: "",
        yearOfStudy: "",
        location: "",
      },
    ]);
  };

  const [additionalEducationalDetails, setAdditionalEducationalDetails] =
    useState([
      {
        id: 1,
        resumeId: insertedid1,
        institute: "",
        courseType: "",
        courseName: "",
        yearOfStudy: "",
        // location: "jnvkjdn",
      },
    ]);

  const handleDeleteEducationalDetails = (indexToRemove) => {
    // const updatedDetails = [{ ...additionalEducationalDetails }];
    // updatedDetails.splice(index, 1);
    // setAdditionalEducationalDetails(updatedDetails);
    setAdditionalEducationalDetails((additionalEducationalDetails) =>
      additionalEducationalDetails.filter((_, index) => index !== indexToRemove)
    );
  };
  const updateFileInfo = (file) => {
    if (file) {
      setFileInfo({
        file: file,
        fileName: file.name
      });
    }
  };

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

  // const [steps, setSteps] = useState(() => {
  //   const baseSteps = [
  //     {
  //       id: 1,
  //       value: 0,
  //       title: "Personal Details",
  //       data: "personaldetails",
  //     },
  //     {
  //       id: 2,
  //       value: 1,
  //       title: "Educational Details",
  //       data: "educationaldetails",
  //     },
  //     {
  //       id: 3,
  //       value: 2,
  //       title: "Work Experience",
  //       data: "workexperience",
  //     },
  //     {
  //       id: 4,
  //       value: 3,
  //       title: "Questions",
  //       data: "questions",
  //     },
  //     {
  //       id: 5,
  //       value: 4,
  //       title: "Review",
  //       data: "review",
  //     },
  //   ];

  //   // Check if formvalidation and its first item exist and if experience is 0
  //   if (exp == 0) {
  //     // Filter out the "Work Experience" step from baseSteps
  //     const newSteps = baseSteps.filter(step => step.id !== 3);
  //     return newSteps;
  //   }

  //   return baseSteps;
  // });

  // const userInfo = [
  //   {
  //     personal: [
  //       {
  //         id: 1,
  //         label: "Email Address",
  //         value: "grace.bennet@example.com",
  //         icon: <RiMailSendLine />,
  //       },
  //       {
  //         id: 2,
  //         label: "Phone number",
  //         value: "+1234567890",
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
  //         label: "Location",
  //         value: "Istanbul, Izmir, Ankara, Turkey, US, Europe",
  //         icon: <RiMapPin2Line />,
  //       },
  //     ],
  //     other: [
  //       {
  //         id: 5,
  //         label: "Location",
  //         value: "Istanbul, Izmir, Ankara, Turkey, US, Europe",
  //         icon: <RiMapPin2Line />,
  //       },
  //       {
  //         id: 6,
  //         label: "Work Type",
  //         value: "Remote. Fulltime. Part-Timet Internship, Freelance",
  //         icon: <RiMouseLine />,
  //       },
  //     ],
  //   },
  // ];
  const jobid = selectedJobId;
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
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      // stack: 2,
      style: {
        background: `${type === "success"
          ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
          : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
          }`,
        boxShadow: `${type === "success"
          ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
          : "0px 22px 60px rgba(134, 92, 144, 0.20)"
          }`,
      },
      // duration: null,
    });
  };
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  useEffect(() => {
    if (closeDrawer) {
      setCurrentStep(0);
      setActiveBtn(0);
      setPresentage(0);
    }
  }, [closeDrawer]);
  const [primaryColor, setPrimaryColor] = useState("");

  useEffect(() => {
    const color = localStorage.getItem("mainColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const handleSubmitAllForms = async (event) => {
  //   console.log("handleSubmitAllForms called");
  //   if (event) {
  //     event.preventDefault();
  //   }

  //   await formik.handleSubmit();
  //   console.log("formik.handleSubmit called");
  //   if (formik.isValid) {
  //     await formik1.handleSubmit();
  //     console.log("formik1.handleSubmit called");
  //   }
  //   if (formik1.isValid) {
  //     await formik2.handleSubmit();
  //     console.log("formik2.handleSubmit called");
  //   }
  //   if (formik2.isValid) {
  //     await formik3.handleSubmit();
  //     console.log("formik3.handleSubmit called");
  //   }
  //   if (currentStep === 4 && closeDrawer) {
  //     closeDrawer();
  //     setShowModal(true);
  //   }
  // };

  // const handleSubmitAllForms = (event) => {
  //   console.log("handleSubmitAllForms called");

  //   if (event) {
  //     event.preventDefault();
  //   }

  //   formik.handleSubmit(() => {
  //     console.log("formik.handleSubmit called");

  //     // Call the API after the first form (formik) is submitted
  //     saveRecruitmentResume(formik.values, () => {
  //       console.log("saveRecruitmentResume API called");

  //       if (formik1.isValid) {
  //         formik1.handleSubmit(() => {
  //           console.log("formik1.handleSubmit called");

  //           // Call the API after the second form (formik1) is submitted
  //           saveRecruitmentResumesExperienceDetail(formik1.values, () => {
  //             console.log("saveRecruitmentResumesExperienceDetail API called");

  //             if (formik2.isValid) {
  //               formik2.handleSubmit(() => {
  //                 console.log("formik2.handleSubmit called");

  //                 // Call the API after the third form (formik2) is submitted
  //                 saveRecruitmentJobResumesCustomField(formik2.values, () => {
  //                   console.log("saveRecruitmentJobResumesCustomField API called");

  //                   if (currentStep === 4 && closeDrawer) {
  //                     closeDrawer();
  //                     setShowModal(true);
  //                   }
  //                 });
  //               });
  //             }
  //           });
  //         });
  //       }
  //     });
  //   });
  // };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getRecruitmentJobById(jobid);
        console.log(response, "qestid");
        const questionnaireId = response.result.questionnaireTemplateId;
        console.log(questionnaireId, "iddd data in questionrie")
        setQestid(questionnaireId);
        console.log(questid, "idddddddddddddd");
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchdata();
  }, []);

  const fetchdata1 = async () => {
    try {
      const response = await getAllRecruitmentJobApplicationFormSettings(jobid);
      console.log(response.result, "validation api response");
      setFormvalidation(response.result);
      setExp(response.result[0].experience, "expppppp");

      console.log(formvalidation, "validation");
    } catch (error) {
      console.error(error, "api error");
    }
  };
  useEffect(() => {
    fetchdata1();
  }, []);

  useEffect(() => {
    console.log(formvalidation, "validation api");
  }, [formvalidation]);

  useEffect(() => {
    console.log(exp, "expppppp");
  }, [exp]);

  const fetchdata = async () => {
    try {
      const response = await getRecruitmentJobById(jobid);
      if (response && response.result && response.result.length > 0) {
        const questionnaireId = response.result[0].questionnaireTemplateId;
        console.log(questionnaireId, "iddd data in questionrie");
        setQestid(questionnaireId);

      } else {
        console.error("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [questid]);

  useEffect(() => {
    console.log("Updated questid:", questid);
  }, [questid]);

  const handleCloseModal = () => {
    setShowModal(false);
    closeDrawer()
  };

  // const handleCloseModal = () => {
  //   setIsModalVisible(false);

  // };
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

  const handleImageChange = (file) => {
    setSelectedImage(file);
  };

  const formik = useFormik({
    initialValues: {
      resumeCode: null,
      candidateName: "",
      namePrefix: null,
      firstName: "",
      lastName: "",
      dob: "",
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
    // enableReinitialize: false,
    // validateOnChange: true,
    // validationSchema: Yup.object().shape({
    //   firstName: Yup.string().required("First name is required"),
    //   lastName: Yup.string().required("Last name is required"),
    //   candidateEmail: Yup.string()
    //     .email("Invalid email address")
    //     .required("Email is required"),
    //   candidateContact: Yup.number().required("Phone number is required"),
    //   candidateLocation: Yup.string().required("Location is required"),
    //   city: Yup.string().required("City is required"),
    //   address: Yup.string().required("Address is required"),
    //   postalCode: Yup.number().required("Postal code is required"),
    // }),
    onSubmit: async (values) => {
      let isValid = true;

      if (formvalidation[0].name == 1) {
        formik.setFieldError(
          "firstName",
          !formik.values.firstName ? "First Name  is required" : ""
        );
        if (!formik.values.firstName) isValid = false;
      }
      // if (formvalidation[0].email == 1) {
      //   formik.setFieldError(
      //     "candidateEmail",
      //     !formik.values.candidateEmail ? "email  is required" : ""
      //   );
      //   if (!formik.values.candidateEmail) isValid = false;
      // }
      if (formvalidation[0].email == 1) {
        if (!formik.values.candidateEmail) {
          formik.setFieldError("candidateEmail", "Email is required");
          isValid = false;
        } else if (!formik.values.candidateEmail.endsWith("@gmail.com")) {
          formik.setFieldError("candidateEmail", "Enter valid Email ");
          isValid = false;
        }
      }
      // if (formvalidation[0].phone == 1) {
      //   formik.setFieldError(
      //     "candidateContact",
      //     !formik.values.candidateContact ? "Phone number  is required" : ""
      //   );
      //   if (!formik.values.candidateContact) isValid = false;
      // }
      if (formvalidation[0].phone == 1) {

        const candidateContact = formik.values.candidateContact;
        const numberPattern = /^\d+$/;
        if (!numberPattern.test(candidateContact)) {
          formik.setFieldError("candidateContact", "Enter valid Phone number");
          isValid = false;
        } else if (!candidateContact) {
          formik.setFieldError("candidateContact", "Phone number is required");
          isValid = false;
        }
      }
      if (formvalidation[0].address == 1) {
        formik.setFieldError(
          "address",
          !formik.values.address ? "Address is Required" : ""
        );
        if (!formik.values.address) isValid = false;
      }
      if (formvalidation[0].country == 1) {
        formik.setFieldError(
          "candidateLocation",
          !formik.values.candidateLocation ? "Location  is required" : ""
        );
        if (!formik.values.candidateLocation) isValid = false;
      }

      if (formvalidation[0].lastname == 1) {
        formik.setFieldError(
          "lastName",
          !formik.values.lastName ? "Last Name  is required" : ""
        );
      }
      if (formvalidation[0].address == 1) {
        formik.setFieldError(
          "postalCode",
          !formik.values.postalCode ? "Postal Code  is required" : ""
        );
      }

      if (formvalidation[0].dob == 1) {
        formik.setFieldError(
          "candidateContact",
          !formik.values.dob ? "Date of Birth  is required" : ""
        );
        if (!formik.values.dob) isValid = false;
      }
      // if (!formik.values.candidateLocation) {
      //   formik.setFieldError(
      //     "candidateLocation", "Location  is required"
      //   );
      //   isValid = false;
      // }
      if (formvalidation[0].address == 1) {
        formik.setFieldError(
          "cityOrTown",
          !formik.values.cityOrTown ? "City or Town  is required" : ""
        );

      }

      // if (!formik.values.namePrefix) {
      //   formik.setFieldError(
      //     "namePrefix", "Prefix  is required"
      //   );
      //   isValid = false;
      // }
      if (formvalidation[0].headline == 1) {
        formik.setFieldError(
          "namePrefix", !formik.values.namePrefix ? "Prefix is required" : "");
      }



      if (isValid) {
        try {
          console.log(values, "gggg");


          if (values.namePrefix) {
            values.candidateName = `${values.namePrefix}. ${values.firstName} ${values.lastName}`.trim();
          } else {
            values.candidateName = `${values.firstName} ${values.lastName}`.trim();
          }

          if (insertedid1) {
            console.log(values, "gggg");
            const update = await updateRecruitmentResume({
              id: insertedid1,
              ...values,
            });
            console.log(update);
            if (update.status === 200) {
              openNotification("success", "Successful", "Personal Details has been updated");
              setActiveBtn(activeBtn + 1);

              setCurrentStep(currentStep + 1);
              setPresentage(presentage + 1);
            } else if (response.status === 500) {
              openNotification(
                "error",
                "input field is empty..",
                "enter the field"
              );
            }
          } else {
            const response = await saveRecruitmentResume(values);
            console.log("API Response:", response);
            console.log(response.result.insertedId, "inserted id responsee");
            Fileuplaod(response.result.insertedId);

            setinsertedId1(response.result.insertedId);
            console.log(insertedid1, "insertede i");
            if (response.status === 200) {
              openNotification("success", "Successful", "Personal Details has been saved");
              setActiveBtn(activeBtn + 1);

              setCurrentStep(currentStep + 1);
              setPresentage(presentage + 1);
            } else if (response.status === 500) {
              openNotification(
                "error",
                "input field is empty..",
                response.message.replace(/<br\/>/g, '\n')
              );
            }
          }
          console.log(insertedid1);
        } catch (error) {
          console.error("Error during form submission:", error);
          openNotification(
            "error",
            "input field is empty..",
            "input field is empty.."
          );
        }
      }
    },
  });

  const Fileuplaod = async (e) => {
    console.log(e, "hhhhhhhhhhhhhh");
    try {
      if (e) {
        console.log(e, "hhhhhh");
        const formData = new FormData();

        formData.append("file", filePdf);

        console.log("inside file upload api");

        formData.append("action", "resumePhotoUpload");
        formData.append("resumeId", e);

        const FileUpload = await fileAction(formData);
        console.log(FileUpload, "fileUploadResult");
      }
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(() => {
  //   const Fileuplaod = async () => {
  //     //  console.log(, "hhhhhhhhhhhhhh");
  //  if (insertedid1) {
  //      try {

  //          console.log(e,"hhhhhh");
  //          const formData = new FormData();

  //          formData.append("file", filePdf);

  //          console.log("inside file upload api");

  //          formData.append("action", "resumePhotoUpload");
  //          formData.append("resumeId", e);

  //          const FileUpload = await fileAction(formData);
  //          console.log(FileUpload, "fileUploadResult");
  //        }
  //       catch (error) {
  //        console.log(error);
  //      }}
  //    };
  //   Fileuplaod ();
  //    }, [insertedid1]);



  // You can handle the API response here
  // For example, update UI, show success message, etc.

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
      // ...existing fields

      resumeId: insertedid1,
      institute: "",
      courseType: "",
      courseName: "",
      yearOfStudy: "",
      location: "jnvkjdn",
      additionalEducationalDetails: [
        { institute: "", courseType: "", courseName: "", yearOfStudy: "" },
      ],

    },
    
    // enableReinitialize: true,
    // validateOnChange: false,
    // validationSchema: Yup.object().shape({
    //   // ...existing validations
    //   additionalEducationalDetails: Yup.array().of(
    //     Yup.object().shape({
    //       institute: Yup.string().required("School or University is required"),
    //       courseType: Yup.string().required("Degree is required"),
    //       courseName: Yup.string().required("Field of Study is required"),
    //       yearOfStudy: Yup.string().required("Year is required"),
    //     })
    //   ),
    // }),

    onSubmit: async (values, { setSubmitting }) => {
      console.log(values, "submiteddd valuess");
      setInstituteerror("");
      setCoursetype("");
      setCoursename("");
      setYearofstudy("");

      const additionalDetailsErrors = values.additionalEducationalDetails.map(
        (detail, index) => {
          let errors = {};

          if (!detail.institute) {
            setInstituteerror("School or University is required");
            errors.institute = "School or University is required";
          }

          if (!detail.courseType) {
            setCoursetype("Degree is required");
            errors.courseType = "Degree is required";
          }

          if (!detail.courseName) {
            setCoursename("Field of Study is required");
            errors.courseName = "Field of Study is required";
          }

          if (!detail.yearOfStudy) {
            setYearofstudy("Year is required");
            errors.yearOfStudy = "Year is required";
          }

          return errors;
        }
      );

      // Check if any error exists
      const hasErrors = additionalDetailsErrors.some(
        (error) => Object.keys(error).length > 0
      );

      if (hasErrors) {
        formik1.setErrors({
          additionalEducationalDetails: additionalDetailsErrors,
        });
      } else {
        try {
          // const transformedData = Object.values(additionalEducationalDetails);

          // const response = await saveRecruitmentResumeEducationalDetailBatch(Object.entries(additionalEducationalDetails).map(([_, value]) => value));
          const formattedData = additionalEducationalDetails.map((item) => ({
            resumeId: insertedid1,
            institute: item.institute,
            courseType: item.courseType,
            courseName: item.courseName,
            yearOfStudy: item.yearOfStudy,
            location: "jnvkjdn",
          }));
          // if (eduinsertedid) {
          //   console.log(values,"gggg");
          //   const update = await updateRecruitmentResumeEducationalDetail({id:eduinsertedid, ...values});
          //   console.log(update);
          //   setActiveBtn(activeBtn + 1);

          //   setCurrentStep(currentStep + 1);
          //   setPresentage(presentage + 1);
          // } else {
          const response = await saveRecruitmentResumeEducationalDetailBatch(
            formattedData
          );
          console.log("API Response:", response);
          console.log(response.result, "result edu");
          seteduinsertedid(response.result.resumeEducationalDetailsId);
          console.log(eduinsertedid);
          // setinsertedId1(response.result.insertedId);
          if (response.status === 200) {
            openNotification("success", "Successful", "Educational Details has been saved");
            setActiveBtn(activeBtn + 1);
            setCurrentStep(currentStep + 1);
            setPresentage(presentage + 1);
          } else if (response.status === 500) {
            openNotification(
              "error",
              "input field is empty..",
              response.message.replace(/<br\/>/g, '\n')
            );
          }
        } catch (error) {
          console.error("API Error:", error);
        } finally {
          setSubmitting(false);
          // setIsFormSubmitted(true);
        }
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
      // ...existing fields
      resumeId: insertedid1,
      jobTitle: "",
      employmentType: "",
      companyName: "",
      location: "",
      fromDate: "",
      toDate: "",
    },

    // enableReinitialize: true,
    // validateOnChange: false,
    // validationSchema2: Yup.object().shape({
    //   // ...existing validations
    //   additionalExperiences: Yup.array().of(
    //     Yup.object().shape({
    //       jobTitle: Yup.string().required("Job Title is required"),
    //       employmentType: Yup.string().required("Employment Type is required"),
    //       companyName: Yup.string().required("Company Name is required"),
    //       location: Yup.string().required("Location is required"),
    //       fromDate: Yup.string().required("From Date is required"),
    //       toDate: Yup.string().required("To Date is required"),
    //     })
    //   ),
    // }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Check validation
        const errors = {};

        if (values.additionalExperiences) {
          values.additionalExperiences.map((experience, index) => {
            if (!experience.jobTitle) {
              setjobtitle("Job Title is required");
            }
            if (!experience.employmentType) {
              setemploymenttype("Employment Type is required");
            }
            if (!experience.companyName) {
              setcompanyname("Company Name is required");
            }
            if (!experience.location) {
              setlocation("Location is required");
            }
            if (!experience.fromDate) {
              setfromdate("From Date is required");
            }
            if (!experience.toDate) {
              settodate("To Date is required");
            }
          });
        }

        if (Object.keys(errors).length > 0) {
          throw errors;
        }
        const formattedData1 = additionalExperiences.map((item) => ({
          resumeId: insertedid1,
          jobTitle: item.jobTitle,
          employmentType: item.employmentType,
          companyName: item.companyName,
          location: item.location,
          fromDate: item.fromDate,
          toDate: item.toDate,
        }));
        const response = await saveRecruitmentResumesExperienceDetailBatch(
          formattedData1
        );
        Fileuplaodresume(insertedid1);
        console.log("work experience Details API Response:", response);

        console.log(response.result.insertedId1);
        if (response.status === 200) {
          openNotification("success", "Successful", "Work Experience has been saved");
          setActiveBtn(activeBtn + 1);
          setCurrentStep(currentStep + 1);
          setPresentage(presentage + 1);
        } else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message.replace(/<br\/>/g, '\n'));
        }
      } catch (error) {
        console.error("Error saving work experience details:", error);
      } finally {
        setSubmitting(false);
        // setIsFormSubmitted(true);
      }
    },
  });
  const Fileuplaodresume = async (e) => {
    console.log(e, "hhhhhhhhhhhhhh");
    try {
      if (e) {
        console.log("hhhhhh");
        const formData = new FormData();

        formData.append("file", filePdfresume);
        formData.append("coverLetter", coverLetter);

        console.log("inside file upload api");

        formData.append("action", "resumeFileUpload");
        formData.append("resumeId", e);

        const FileUploadresume = await fileAction(formData);
        console.log(FileUploadresume, "fileUploadResult");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const validationSchema3 = Yup.object().shape({
  //   customQuestion: Yup.string().required("This field is required"),
  //   highestEducationLevel: Yup.string().required("This field is required"),
  // });
  // const handleAddMoreExperience = () => {
  //   // Increase the count to display additional input fields
  //   setAdditionalExperienceCount((prevCount) => prevCount + 1);
  // };
  // const handleAddMoreWorkDetails = () => {
  //   // Increase the count to display additional input fields
  //   setAdditionalEducationalDetailsCount((prevCount) => prevCount + 1);
  // };
  // const handledelete = () => {
  //   setAdditionalEducationalDetailsCount((prevCount) => prevCount - 1);
  // };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // Function to handle changes in the selected checkboxes
  const handleCheckboxChange = (value) => {
    const newSelectedCheckboxes = [...selectedCheckboxes];
    const index = newSelectedCheckboxes.indexOf(value);
    if (index === -1) {
      newSelectedCheckboxes.push(value);
    } else {
      newSelectedCheckboxes.splice(index, 1);
    }
    setSelectedCheckboxes(newSelectedCheckboxes);
  };

  const formik3 = useFormik({
    initialValues: {
      customQuestion: "Are you legally eligible to work in the country?",
      answer: "",
      // customQuestion:Questions ? Questions.questtemp : questtemp,
      // answer: answerMetaData ? answerMetaData.questionAnswer : questionAnswers,
      jobId: selectedJobId,
      resumeId: insertedid1,

      // highestEducationLevel: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema3: Yup.object().shape({
      answer: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // *******************************************
        // const newAnswers = questtemp.flatMap((condition, conditionIndex) => {
        //   const answers = {};
        //   condition.answerMetaData.forEach((metadata) => {
        //     const detailsId = condition.customFields;

        //     let questioneir;
        //     switch (metadata.key) {
        //       case "Drop-down":
        //         questioneir = dropdownvalue;
        //         break;
        //       case "Paragraph":
        //         questioneir = textAreaValue;
        //         break;
        //       case "Checkboxes":
        //         const selectedCheckboxValues = selectedCheckboxes.filter(
        //           (option) => metadata.value.split(",").includes(option.trim())
        //         );
        //         questioneir = selectedCheckboxValues.join(", ");
        //         break;
        //       case "ShortAnswer":
        //         questioneir = forminputvalue;
        //         break;
        //       case "MultipleChoice":
        //         questioneir = selectedValues[conditionIndex];
        //         break;
        //       default:
        //         questioneir = "";
        //     }
        //     answers[detailsId] = {
        //       jobId: selectedJobId,
        //       resumeId: insertedid1,
        //       customQuestion: questioneir,
        //       createdBy: null, // Replace with actual createdBy value
        //     };
        //   });
        //   return Object.values(answers);
        // });

        // console.log("New Answers:", newAnswers);
        // console.log(detailsId)
        const response = await saveRecruitmentJobResumesCustomField(values);
        console.log("question Details API Response:", response);
        if (response.status === 200) {
          openNotification("success", "Successful", "Questions has been saved");
          setActiveBtn(activeBtn + 1);
          setCurrentStep(currentStep + 1);
          setPresentage(presentage + 1);
        } else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message.replace(/<br\/>/g, '\n'));
        }
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

  // useEffect(() => {
  //   const fetchapi = async () => {

  //     try {
  //       if (currentStep === 4) {
  //       // Check if the current step is the review page
  //       const response = await getRecruitmentResumeById(id);
  //       // if (response.result.length > 0) {
  //       //   const resume = response.result[0];

  //       //   setData(resume);
  //       // }
  //       setData(response.result)

  //       // console.log(insertedid1, "dfrfgreg");
  //       console.log(response, "resume api res");
  //       console.log(data, "dhcdghcvhd");
  //    } } catch (error) {
  //       console.error("error", error);
  //     }
  //   };
  //   fetchapi();
  //   console.log(data, "dhcdghcvhd");
  // }, [currentStep]);



  // ***************************************
  // const getquestionnaire = async () => {
  //   try {
  //     // console.log(questid, "iddd");
  //     // const idnew = questid;
  //     // console.log(idnew, "daataa of idd new");
  //     const response = await getRecruitmentQuestionnaireTemplateDetailsById(
  //       questid
  //     );
  //     // if (response && response.result && response.result.length > 0) {
  //     //   const questionnaireId = response.result[0].questionnaireTemplateId;
  //     console.log(response,"questionnaire response");
  //     console.log(response.result[0].question,"qqqqqqqqqq");
  //     console.log(response.result[0],"result");
  //     const questionData = response.result[0].questionaireTemplateDetailData.
  //     map(item => ({

  //     //   item.questionTemplateDetailData.map(detail =>({

  //     //   questionTemplateDetailsId: detail.formSettingsId,
  //     //   question: detail.question,
  //     //   answerMetaData: detail.answerMetaData.map(metadata =>({
  //     //     key: metadata.key,
  //     //     value: metadata.value
  //     //   }))
  //     // }));
  //     question: item.question,
  //     answerMetaData: item.answerMetaData.map(metadata=>({
  //       key: metadata.key,
  //       value: metadata.value
  //     }))
  //   }));
  //   // const questionData = response.result[0].answerMetaData.map((items)=>({
  //   //         key: items.key,
  //   //         value: items.value
  //   // }))
  //   console.log(questionData,"questionsssss");
  //     // return questionData;

  //     setQuesttemp(questionData);

  //     console.log(response.result, "questionnaire");
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };

  // useEffect(() => {
  //   getquestionnaire();
  // }, [questid]);

  // useEffect(() => {
  //   fetchedAnswers.forEach((answer) => {
  //     const { questionTemplateDetailsId, questionAnswer } = answer;
  //     const matchedCondition = questtemp.find
  //       (condition =>
  //         condition.questionTemplateDetailsId === questionTemplateDetailsId
  //     );

  //     if (matchedCondition) {
  //       const metaData = matchedCondition.answerMetaData.find
  //         (meta => meta.key
  //       );

  //       if (metaData) {
  //         const { key } = metaData;
  //         switch (key) {
  //           case "Drop-down":
  //             Setdopdownvalue(questionAnswer);
  //             break;
  //           case "Paragraph":
  //             setTextAreavalue(questionAnswer);
  //             break;
  //           case "Checkboxes":
  //             const selectedOptions = questionAnswer
  //               .split(",")
  //               .map((option) => option.trim());
  //             setSelectedCheckboxes(selectedOptions);
  //             break;
  //           case "ShortAnswer":
  //             setForminputValue(questionAnswer);
  //             break;
  //           case "MultipleChoice":
  //             setSelectedValues(prevState => {
  //               const newState = [...prevState];
  //               const index = questtemp.findIndex
  //                 (condition =>
  //                   condition.questionTemplateDetailsId ===
  //                   questionTemplateDetailsId
  //               );
  //               newState[index] = questionAnswer;
  //               return newState;
  //             });
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     }
  //   });
  // }, [questtemp, questionAnswers]);


  // console.log(questtemp,"questionssssss");

  // useEffect(() => {
  //   fetchedAnswers.forEach((answer) => {
  //     const { questionTemplateDetailsId, questionAnswer } = answer;
  //     const matchedCondition = questtemp.find(
  //       (condition) =>
  //         condition.questionTemplateDetailsId === questionTemplateDetailsId
  //     );

  //     if (matchedCondition) {
  //       const metaData = matchedCondition.answerMetaData.find(
  //         (meta) => meta.key
  //       );

  //       if (metaData) {
  //         const { key } = metaData;
  //         switch (key) {
  //           case "Drop-down":
  //             setDropdownValue(questionAnswer);
  //             break;
  //           case "Paragraph":
  //             setTextAreaValue(questionAnswer);
  //             break;
  //           case "Checkboxes":
  //             const selectedOptions = questionAnswer
  //               .split(",")
  //               .map((option) => option.trim());
  //             setSelectedCheckboxes(selectedOptions);
  //             break;
  //           case "ShortAnswer":
  //             setForminputValue(questionAnswer);
  //             break;
  //           case "MultipleChoice":
  //             setSelectedValues((prevState) => {
  //               const newState = [...prevState];
  //               const index = questtemp.findIndex(
  //                 (condition) =>
  //                   condition.questionTemplateDetailsId ===
  //                   questionTemplateDetailsId
  //               );
  //               newState[index] = questionAnswer;
  //               return newState;
  //             });
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     }
  //   });
  // }, [questtemp, fetchedAnswers]);


  useEffect(() => {
    const fetchapi = async () => {
      try {
        if (currentStep === 4) {
          const response = await getRecruitmentResumeById(insertedid1);
          setData(response.result);
          setCandidateEmail(response.result[0].candidateEmail);
          setuserdata(
            response.result.map((items) => ({
              personal: [
                {
                  id: 1,
                  label: "Email Address",
                  value: items.candidateEmail,
                  icon: <RiMailSendLine />,
                },
                {
                  id: 2,
                  label: "Phone number",
                  value: items.candidateContact,
                  icon: <RiSmartphoneLine />,
                },
                {
                  id: 3,
                  label: "Location",
                  value: items.candidateLocation,
                  icon: <TfiLocationPin />,
                },
                {
                  id: 4,
                  label: "Address",
                  value: items.addressLine,
                  icon: <LiaAddressCard />,
                },
                {
                  id: 5,
                  label: "Date of Birth",
                  value: items.dob,
                  icon: <RiCake2Line />,
                },
              ],
              other: [
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
              ],
            }))
          );
          console.log(userdata);
          console.log(response, "resume api res");
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    console.log(setuserdata);

    fetchapi();
  }, [currentStep]);

  useEffect(() => {
    console.log(data, "dhcdghcvhd");
  }, [data]);

  useEffect(() => {
    const callapi = async () => {
      try {
        if (currentStep === 4) {
          // Check if the current step is the review page
          const response = await getAllRecruitmentResumeEducationalDetails(
            insertedid1
          );
          setEducationaldetails(
            response.result.map((item) => ({
              institution: item.institute,
              degree: item.courseType,
              fieldOfStudy: item.courseName,
              location: item.location,
              graduationYear: item.yearOfStudy,
            }))
          );
          console.log(insertedid1, "dfrfgreg");
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
        if (currentStep === 4) {
          // Check if the current step is the review page
          const response = await getAllRecruitmentResumesExperienceDetails(
            insertedid1
          );
          setExperience(
            response.result.map((items) => ({
              companyName: items.companyName,
              Shift: items.employmentType,
              role: items.jobTitle,
              startDate: items.fromDate,
              endDate: items.toDate,
              experienceDuration: items.location,
            }))
          );
          console.log(insertedid1, "dfrfgreg");
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
        if (currentStep === 4) {
          // Check if the current step is the review page
          const response = await getAllRecruitmentJobResumesCustomFields(
            insertedid1
          );
          setCustomfield(
            response.result.map((items) => ({
              customQuestion: items.customQuestion,
              answer: items.answer,
            }))
          );
          console.log(insertedid1, "dfrfgreg");
          console.log(response);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    callapi();
  }, [currentStep]);

  // useEffect(() => {
  //   const callapi = async () => {
  //     try {
  //       if (currentStep === 4) {
  //         // Check if the current step is the review page
  //         const response = await getAllRecruitmentJobResumesCustomFields(
  //           insertedid1
  //         );
  //         setCustomfield(response);
  //         console.log(insertedid1, "dfrfgreg");
  //         console.log(response);
  //       }
  //     } catch (error) {
  //       console.error("error", error);
  //     }
  //   };
  //   callapi();
  // }, [currentStep]);

  const handleAddMoreWorkDetailss = () => {
    setAdditionalEducationalDetails((prevDetails) => [
      ...prevDetails,
      {
        institute: "",
        courseType: "",
        courseName: "",
        yearOfStudy: "",
      },
    ]);
    setAdditionalEducationalDetailsCount((prevCount) => prevCount + 1);
  };
  const handleDelete = (indexToRemove) => {
    setAdditionalEducationalDetails((prevDetails) =>
      prevDetails.filter((_, index) => index !== indexToRemove)
    );
    setAdditionalEducationalDetailsCount((prevCount) => prevCount - 1);
  };
  // const handleDelete1 = (indexToRemove) => {
  //   setAdditionalExperiences((prevDetails) =>
  //     prevDetails.filter((_, index) => index !== indexToRemove)
  //   );
  //   setAdditionalEducationalDetailsCount((prevCount) => prevCount - 1);
  // };
  // const handleAddMoreExperience = () => {
  //   setAdditionalExperiences((prevExperiences) => [
  //     ...prevExperiences,
  //     {
  //       jobTitle: "",
  //       employmentType: "",
  //       companyName: "",
  //       location: "",
  //       fromDate: "",
  //       toDate: "",
  //     },
  //   ]);
  //   setAdditionalExperienceCount((prevCount) => prevCount + 1);
  // };
  const updateExperience = (index, field, value) => {
    setAdditionalExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index][field] = value;
      return updatedExperiences;
    });
  };

  const handleDelete1 = (indexToRemove) => {
    setAdditionalExperiences((prevDetails) =>
      prevDetails.filter((_, index) => index !== indexToRemove)
    );
    setAdditionalEducationalDetailsCount((prevCount) => prevCount - 1);
  };

  const handleDeletee = (index) => {
    const updatedDetails = [...additionalEducationalDetails];
    updatedDetails.splice(index, 1);
    setAdditionalEducationalDetails(updatedDetails);
  };

  const handleSubmitAllForms = () => {
    switch (currentStep) {
      case 0:
        formik.handleSubmit();
        // setCurrentStage(currentStage + 1);
        // Move to next stage after successful submission

        break;
      case 1:
        formik1.handleSubmit();
        // setCurrentStage(currentStage + 1);

        break;
      case 2:
        formik2.handleSubmit();
        // setCurrentStage(currentStage + 1);

        break;
      case 3:
        formik3.handleSubmit();
        // setCurrentStage(currentStage + 1);
        // formik.resetForm();
        // formik1.resetForm();
        // formik2.resetForm();
        // formik3.resetForm();
        break;
      case 4:

        // closeDrawer();

        formik.resetForm();
        formik1.resetForm();
        formik2.resetForm();
        formik3.resetForm();
        setShowModal(true);
        // window.location.reload();

        // Close the drawer only when the modal is closed

        //   // window.location.reload();
        //   formik.resetForm();
        //   formik1.resetForm();
        //   formik2.resetForm();
        //   formik3.resetForm();
        // }
        // if(modalIsClosed)
        //   closeDrawer()
        // }

        // if (handleCloseModal) {
        //   modalClosed();
        // }
        // case 5:

        // closeDrawer()
        // setShowModal(true);

        break;
      default:
        break;
    }
  };
  // useEffect(() => {
  //   if (!showModal) {
  //     closeDrawer();
  //     formik.resetForm();
  //     formik1.resetForm();
  //     formik2.resetForm();
  //     formik3.resetForm();
  //     window.location.reload();
  //   }
  // }, [showModal]);
  // closeDrawer()
  //      setShowModal(true);

  const previous = () => {
    // Exit early if currentStage is 0
    if (currentStep === 0) {
      return;
    }

    setActiveBtn(activeBtn - 1);
    setCurrentStage(currentStage - 1);
    setCurrentStep(currentStep - 1);
    setPresentage(presentage - 1);
  };

  const handleTextChange = (value) => {
    // Validate the input if necessary

    setCoverletter(value);
  };


  const editdetails = () => {
    if (currentStep !== 0) {
      setCurrentStep(0);
    }
    if (activeBtn !== 0) {
      setActiveBtn(0)
    }
    if (presentage !== 0) {
      setPresentage(0)
    }
  }

  const editcv = () => {
    if (currentStep !== 2) {
      setCurrentStep(2);
    }
    if (activeBtn !== 2) {
      setActiveBtn(2)
    }
    if (presentage !== 2) {
      setPresentage(2)
    }
  }




  return (
    <div className="bg-[#F8FAFC] ">
      <FlexCol />

      <Header1 closeDrawer={closeDrawer} jobid={jobid} />

      <div className="flex flex-col gap-6 container-wrapper  mb-[65px]   ">
        <FlexCol />

        <div className="flex flex-col gap-6 max-w-[1070px] w-full mx-auto mt-4   ">

          {steps && (
            <div className=" sticky -top-6 w-full z-50 px-5  dark:bg-[#1f1f1f] pb-10  ">
              {!IsSmallScreen && (
                <Stepper
                  currentStepNumber={activeBtn}
                  presentage={presentage}
                  // direction="left"
                  // labelPlacement="vertical"
                  steps={steps}
                // className="text-sm font-medium "
                // style={{
                //   fontSize: isSmallScreen ? "8px" : "10px",
                //   fontWeight: 600,
                // }}
                // // className="text-[10px]"
                // size={isSmallScreen ? "default" : "large"}
                />
              )}
            </div>
          )}

        </div>

        {/* {renderStep()} */}
        <div className="flex flex-col gap-6">
          {currentStep === 0 ? (
            <>
              <FlexCol />
              <div className="relative w-full mx-auto rounded-md borderb">
                <FlexCol />
                <div className="relative flex flex-col gap-12">
                  <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                    <h2
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">Personal Details </h1>
                        <p className="para">
                          Fill your personal Details.
                        </p>
                      </div>
                      {/* </button> */}
                    </h2>
                    {/* <form onSubmit={formik.handleSubmit}> */}
                    <form>
                      <div
                        id={`acco-text-item`}
                        role="region"
                        aria-labelledby={`acco-title-item`}
                        className="flex flex-col justify-between w-full gap-6 p-5"
                      >

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-6">
                          {formvalidation.length > 0 && formvalidation[0].headline === 0 ? null : (
                            <Dropdown
                              title={"Prefix"}
                              placeholder={"Choose Prefix"}
                              options={[
                                { label: "Mr", value: "mr" },
                                { label: "Miss", value: "miss" },
                              ]}
                              change={(e) => {
                                formik.setFieldValue("namePrefix", e);
                                console.log("First Name:", e);
                              }}
                              name="namePrefix"
                              value={formik.values.namePrefix}
                              error={formik.errors.namePrefix}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].headline === 1}
                            />
                          )}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {formvalidation.length > 0 && formvalidation[0].name === 0 ? null : (
                            <FormInput
                              title={"First Name"}
                              placeholder={"Enter First Name"}
                              // className="text-[#344054] "
                              name="firstName"
                              maxLength={"25"}
                              value={formik.values.firstName}
                              change={(e) => {
                                formik.setFieldValue("firstName", e);
                                console.log("First Name:", e);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].name === 1}
                              error={formik.errors.firstName}
                            />
                          )}
                          {formvalidation.length > 0 && formvalidation[0].name === 0 ? null : (
                            <FormInput
                              title={"Last Name"}
                              placeholder={"Enter Last Name"}
                              // className="text-[#344054]"
                              name="lastName"
                              maxLength={"25"}
                              value={formik.values.lastName}
                              change={(e) => {
                                formik.setFieldValue("lastName", e);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].lastname === 1}
                              error={formik.errors.lastName}
                            />
                          )}
                          {/* </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"> */}
                          {formvalidation.length > 0 && formvalidation[0].email === 0 ? null : (
                            <FormInput
                              title={"Email"}
                              placeholder={"Enter Email"}
                              // className="text-[#344054]"
                              name="candidateEmail"
                              maxLength={"25"}
                              value={formik.values.candidateEmail}
                              change={(e) => {
                                formik.setFieldValue("candidateEmail", e);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].email === 1}
                              error={formik.errors.candidateEmail}
                            />
                          )}
                          {formvalidation.length > 0 && formvalidation[0].phone === 0 ? null : (
                            <FormInput
                              title={"Phone Number"}
                              placeholder={"Enter Phone Number"}

                              maxLength={"12"}
                              // className="text-[#344054]"
                              value={formik.values.candidateContact}
                              change={(e) => {
                                const input = e.replace(/\D/g, '');
                                formik.setFieldValue("candidateContact", input);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].phone === 1}
                              error={formik.errors.candidateContact}
                            />
                          )}
                          {/* </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"> */}

                          <DateSelect
                            title={"DOB"}
                            placeholder={"Enter Date of birth"}
                            // className="text-[#344054]"
                            name="dob"
                            value={formik.values.dob}
                            change={(e) => {
                              formik.setFieldValue("dob", e);
                            }}
                            required={formvalidation && formvalidation.length > 0 && formvalidation[0].dob === 1}
                            error={formik.errors.dob}
                          />

                        </div>
                        {/* <div className="relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black"> */}
                        {/* <div className="flex min-w-0 pt-5 pl-5 gap-x-4">
                          <Image
                            className="flex-none w-12 h-12 rounded-full bg-gray-50"
                            src={uploader}
                            alt=""
                          /> */}
                        {/* <div className="flex-auto min-w-0">
                            <label
                              htmlFor="profileImage"
                              className="cursor-pointer"
                            >
                              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                Click to upload or drag and drop{" "}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-gray-500 truncate dark:text-white dark:text-opacity-50">
                                PDF, DOCX Format only (5 mb max)
                              </p>
                            </label>
                            <input
                              id="profileImage"
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                handleImageChange(e.target.files[0])
                              }
                              accept="image/*"
                            />
                          </div> */}
                        {/* <div className="w-4/5">
                          <p>
                            Photo{" "}
                            <span className="text-[#C1C1C1]">(Optional)</span>
                          </p>
                          <FileUpload
                            className={
                              "relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black mt-2 mb-2"
                            }
                            change={(e) => {
                              setfilepdf(e);
                            }}
                          />
                        </div> */}
                        <div className='w-3/5'>
                          <p>Photo (Optional)</p>

                          <FileUpload change={(e) => {
                            if (e) {

                              setfilepdf(e)

                            }
                            console.log(e)
                          }} />

                        </div>
                        {/* </div> */}
                        {/* </div> */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {formvalidation.length > 0 && formvalidation[0].country === 0 ? null : (
                            <FormInput
                              title={"Location"}
                              placeholder={"Enter Location"}
                              maxLength={"25"}
                              // className="text-[#344054]"
                              value={formik.values.candidateLocation}
                              change={(e) => {
                                formik.setFieldValue("candidateLocation", e);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].country === 1}
                              error={formik.errors.candidateLocation}
                            />
                          )}
                          {formvalidation.length > 0 && formvalidation[0].address === 0 ? null : (
                            <FormInput
                              title={"City or Town"}
                              placeholder={"Enter City or Town"}
                              maxLength={"25"}
                              // className="text-[#344054]"
                              value={formik.values.cityOrTown}
                              change={(e) => {
                                formik.setFieldValue("cityOrTown", e);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].address === 1}
                              error={formik.errors.cityOrTown}
                            />
                          )}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {formvalidation.length > 0 && formvalidation[0].address === 0 ? null : (
                            <FormInput
                              title={"Address"}
                              placeholder={"Enter Address"}
                              maxLength={"25"}
                              // className="text-[#344054]"
                              value={formik.values.address}
                              change={(e) => {
                                formik.setFieldValue("address", e);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].address === 1}
                              error={formik.errors.address}
                            />
                          )}
                          {formvalidation.length > 0 && formvalidation[0].address === 0 ? null : (
                            <FormInput
                              title={"Postal Code"}
                              placeholder={"Enter Postal Code"}
                              maxLength={"25"}
                              // className="text-[#344054]"
                              value={formik.values.postalCode}
                              change={(e) => {
                                const input = e.replace(/\D/g, '');
                                formik.setFieldValue("postalCode", input);
                              }}
                              required={formvalidation && formvalidation.length > 0 && formvalidation[0].address === 1}
                              error={formik.errors.postalCode}
                            />
                          )}
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
              <div className="relative w-full mx-auto rounded-md borderb">
                <FlexCol />
                <div className="relative flex flex-col gap-12">
                  <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                    <h2
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">Educational Details </h1>
                        <p className="para">
                          Fill your Educational Details.
                        </p>
                      </div>
                    </h2>
                    <div
                      id={`acco-text-item`}
                      role="region"
                      aria-labelledby={`acco-title-item`}
                      className="flex flex-col justify-between w-full gap-6 p-5 "
                    >
                      {additionalEducationalDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-between w-full gap-6 "
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <FormInput
                              title={"School or University"}
                              placeholder={"Enter School or University"}
                              className="text-[#344054]"
                              name={`additionalEducationalDetails[${index}].institute`}
                              value={detail.institute}
                              // change={(e) => {
                              //   const updatedDetails = [
                              //     ...additionalEducationalDetails,
                              //   ];
                              //   updatedDetails[index].institute = e;
                              //   setAdditionalEducationalDetails(updatedDetails);
                              // }}
                              change={(e) => {
                                const updatedDetails = [
                                  ...additionalEducationalDetails,
                                ];
                                updatedDetails[index].institute = e;
                                setAdditionalEducationalDetails(updatedDetails);
                                formik1.setFieldValue(
                                  `additionalEducationalDetails[${index}].institute`,
                                  e
                                );
                              }}
                              required={true}
                              // error={
                              //   isFormSubmitted
                              //     ? formik1.errors.additionalEducationalDetails?.[
                              //         index
                              //       ]?.institute
                              //     : ""
                              // }
                              // error={instituteerror}
                              error={
                                formik1.errors.additionalEducationalDetails?.[
                                  index
                                ]?.institute || ""
                              }
                            />
                            <FormInput
                              title={"Degree"}
                              placeholder={"Enter Degree"}
                              name={`additionalEducationalDetails[${index}].courseType`}
                              className="text-[#344054]"
                              value={detail.courseType}
                              // change={(e) => {
                              //   const updatedDetails = [
                              //     ...additionalEducationalDetails,
                              //   ];
                              //   updatedDetails[index].courseType = e;
                              //   setAdditionalEducationalDetails(updatedDetails);
                              // }}
                              change={(e) => {
                                const updatedDetails = [
                                  ...additionalEducationalDetails,
                                ];
                                updatedDetails[index].courseType = e;
                                setAdditionalEducationalDetails(updatedDetails);
                                formik1.setFieldValue(
                                  `additionalEducationalDetails[${index}].courseType`,
                                  e
                                );
                              }}
                              required={true}
                              // error={
                              //   isFormSubmitted
                              //     ? formik1.errors.additionalEducationalDetails?.[
                              //         index
                              //       ]?.courseType
                              //     : ""
                              // }
                              // error={coursetype}
                              error={
                                formik1.errors.additionalEducationalDetails?.[
                                  index
                                ]?.courseType || ""
                              }
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <FormInput
                              title={"Field of Study"}
                              placeholder={"Enter Field of Study"}
                              className="text-[#344054]"
                              name={`additionalEducationalDetails[${index}].courseName`}
                              value={detail.courseName}
                              change={(e) => {
                                const updatedDetails = [
                                  ...additionalEducationalDetails,
                                ];
                                updatedDetails[index].courseName = e;
                                setAdditionalEducationalDetails(updatedDetails);
                                formik1.setFieldValue(
                                  `additionalEducationalDetails[${index}].courseName`,
                                  e
                                );
                              }}
                              required={true}
                              // error={
                              //   isFormSubmitted
                              //     ? formik1.errors.additionalEducationalDetails?.[
                              //         index
                              //       ]?.courseName
                              //     : ""
                              // }
                              // error={coursename}
                              error={
                                formik1.errors.additionalEducationalDetails?.[
                                  index
                                ]?.courseName || ""
                              }
                            />
                            <DateSelect
                              title={"Passout Year"}
                              className="text-[#344054]"
                              name={`additionalEducationalDetails[${index}].yearOfStudy`}
                              // picker={"YYYY"}

                              placeholder="Enter Passout Year"
                              value={detail.yearOfStudy}
                              change={(e) => {
                                const updatedDetails = [
                                  ...additionalEducationalDetails,
                                ];
                                updatedDetails[index].yearOfStudy = e;
                                setAdditionalEducationalDetails(updatedDetails);
                                formik1.setFieldValue(
                                  `additionalEducationalDetails[${index}].yearOfStudy`,
                                  e
                                );
                              }}
                              required={true}

                              error={
                                formik1.errors.additionalEducationalDetails?.[
                                  index
                                ]?.yearOfStudy || ""
                              }


                            />
                            {index !== 0 &&
                              <div className="flex items-center justify-end">
                                <Tooltip placement="top" title={"Delete"}>
                                  <button
                                    onClick={() =>
                                      handleDeleteEducationalDetails(index)
                                    }
                                  >
                                    <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px] hover:text-red-600" />
                                  </button>
                                </Tooltip>
                              </div>
                            }
                          </div>
                          <div className="divider-h" />
                        </div>
                      ))}

                      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

                      <AddMore
                        name="Add More Education "
                        change={handleAddMoreEducationalDetails}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
            : currentStep === 2 ? (
              <>
                <FlexCol />
                <div className="relative w-full mx-auto rounded-md borderb">
                  <FlexCol />
                  <div className="relative flex flex-col gap-12">
                    <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                      <h2
                        className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                        style={{ backgroundColor: `${primaryColor}10` }}
                      >
                        <div className="text-left rtl:text-right">
                          <h1 className="acco-h1">Work Experience Details </h1>
                          <p className="para">
                            Fill your work experience details.
                          </p>
                        </div>
                      </h2>
                      <div
                        id={`acco-text-item`}
                        role="region"
                        aria-labelledby={`acco-title-item`}
                        className="flex flex-col justify-between w-full gap-6 p-5"
                      >
                        {additionalExperiences.map((experience, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-between w-full gap-6 "
                          >

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              <FormInput
                                title={"Job Title"}
                                placeholder={"Enter Job Title"}
                                className="text-[#344054]"
                                name={`additionalExperiences[${index}].jobTitle`}
                                value={experience.jobTitle}
                                change={(e) => {
                                  const updatedExperiences = [
                                    ...additionalExperiences,
                                  ];
                                  updatedExperiences[index].jobTitle = e;
                                  setAdditionalExperiences(updatedExperiences);
                                }}
                                required={true}
                                // error={
                                //   isFormSubmitted
                                //     ? formik2.errors.additionalExperiences?.[index]
                                //         ?.jobTitle
                                //     : ""
                                // }
                                error={
                                  formik2.errors.additionalExperiences?.[index]
                                    ?.jobTitle || ""
                                }
                              />
                              <Dropdown
                                title={"Employment Type"}
                                placeholder={"Choose Employment Type"}

                                options={[
                                  { value: "Fulltime", label: "Full-time" },
                                  { value: "Parttime", label: "Part-time" },
                                ]}
                                className="text-[#344054]"
                                name={`additionalExperiences[${index}].employmentType`}
                                value={experience.employmentType ? experience.employmentType : undefined}
                                change={(e) => {
                                  const updatedExperiences = [
                                    ...additionalExperiences,
                                  ];
                                  updatedExperiences[index].employmentType = e;
                                  setAdditionalExperiences(updatedExperiences);
                                }}
                                required={true}
                                // error={
                                //   isFormSubmitted
                                //     ? formik2.errors.additionalExperiences?.[index]
                                //         ?.employmentType
                                //     : ""
                                // }
                                error={
                                  formik2.errors.additionalExperiences?.[index]
                                    ?.employmentType || ""
                                }
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ">
                              <FormInput
                                title={"Company Name"}
                                placeholder={"Enter Company Name"}
                                className="text-[#344054]"
                                name={`additionalExperiences[${index}].companyName`}
                                value={experience.companyName}
                                change={(e) => {
                                  const updatedExperiences = [
                                    ...additionalExperiences,
                                  ];
                                  updatedExperiences[index].companyName = e;
                                  setAdditionalExperiences(updatedExperiences);
                                }}
                                required={true}
                                // error={
                                //   isFormSubmitted
                                //     ? formik2.errors.additionalExperiences?.[index]
                                //         ?.companyName
                                //     : ""
                                // }
                                error={
                                  formik2.errors.additionalExperiences?.[index]
                                    ?.companyName || ""
                                }
                              />
                              <FormInput
                                title={"Location"}
                                placeholder={"Enter Location"}
                                className="text-[#344054]"
                                name={`additionalExperiences[${index}].location`}
                                value={experience.location}
                                change={(e) => {
                                  const updatedExperiences = [
                                    ...additionalExperiences,
                                  ];
                                  updatedExperiences[index].location = e;
                                  setAdditionalExperiences(updatedExperiences);
                                }}
                                required={true}
                                // error={
                                //   isFormSubmitted
                                //     ? formik2.errors.additionalExperiences?.[index]
                                //         ?.location
                                //     : ""
                                // }
                                error={
                                  formik2.errors.additionalExperiences?.[index]
                                    ?.location || ""
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                              <DateSelect
                                title={"From"}
                                placeholder={"01/09/2023"}
                                className="text-[#344054]"
                                name={`additionalExperiences[${index}].fromDate`}
                                value={experience.fromDate}
                                change={(e) => {
                                  const formattedDate = e
                                    .split("/")
                                    .reverse()
                                    .join("-");

                                  const updatedExperiences = [
                                    ...additionalExperiences,
                                  ];
                                  updatedExperiences[index].fromDate =
                                    formattedDate;

                                  setAdditionalExperiences(updatedExperiences);
                                }}
                                required={true}
                                // error={
                                //   isFormSubmitted
                                //     ? formik2.errors.additionalExperiences?.[index]
                                //         ?.fromDate
                                //     : ""
                                // }
                                error={
                                  formik2.errors.additionalExperiences?.[index]
                                    ?.fromDate || ""
                                }
                              />
                              <DateSelect
                                title={"To"}
                                placeholder={"01/09/2024"}
                                selectpicker="dateandtime"
                                className="text-[#344054]"
                                name={`additionalExperiences[${index}].toDate`}
                                value={experience.toDate}
                                minDate={experience.fromDate}
                                change={(e) => {
                                  const formattedDate = e
                                    .split("/")
                                    .reverse()
                                    .join("-");

                                  const updatedExperiences = [
                                    ...additionalExperiences,
                                  ];
                                  updatedExperiences[index].toDate =
                                    formattedDate;

                                  setAdditionalExperiences(updatedExperiences);
                                }}
                                required={true}
                                // error={
                                //   isFormSubmitted
                                //     ? formik2.errors.additionalExperiences?.[index]
                                //         ?.toDate
                                //     : ""
                                // }
                                error={
                                  formik2.errors.additionalExperiences?.[index]
                                    ?.toDate || ""
                                }
                              />
                              {/* <div className="flex items-center justify-end">
                              <Tooltip placement="top" title={"Delete"}>
                                <button onClick={() => handleDelete1(index)}>
                                  <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px]" />
                                </button>
                              </Tooltip>
                            </div> */}
                            </div>
                            {index !== 0 &&
                              <div className="flex items-center justify-end">
                                <Tooltip placement="top" title={"Delete"}>
                                  <button onClick={() => handleDelete1(index)}>
                                    <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px] hover:text-red-600" />
                                  </button>
                                </Tooltip>
                              </div>
                            }
                            <div className="divider-h" />
                          </div>
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
                  <div className="relative w-full mx-auto rounded-md borderb ">
                    <FlexCol />
                    <div className="relative flex flex-col gap-12">
                      <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                        <h2
                          className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                          style={{ backgroundColor: `${primaryColor}10` }}
                        >
                          <div className="text-left rtl:text-right">
                            <h1 className="acco-h1">Resume & Cover Letter </h1>
                            <p className="para">
                              Add your resume and cover letter.
                            </p>
                          </div>
                        </h2>
                        <div
                          id={`acco-text-item`}
                          role="region"
                          aria-labelledby={`acco-title-item`}
                          className="flex flex-col justify-between w-full gap-6 p-5"
                        >
                          {/* <div className="relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black">
                        <div className="flex min-w-0 pt-5 pl-5 gap-x-4">
                          <Image
                            className="flex-none w-12 h-12 rounded-full bg-gray-50"
                            src={uploader}
                            alt=""
                          />
                          <div className="flex-auto min-w-0">
                            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                              Click to upload or drag and drop{" "}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                              PDF, DOCX Format only (5 mb max)
                            </p>
                          </div>
                        </div>
                      </div> */}
                          {formvalidation.length > 0 && formvalidation[0].resume === 0 ? null : (
                            <FileUpload
                              className={
                                "relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black"
                              }
                              change={(e) => {
                                setfilepdfresume(e);
                              }}
                            />
                          )}
                          {formvalidation.length > 0 && formvalidation[0].coverLetter === 0 ? null : (
                            <TextArea
                              title="Cover Letter"
                              placeholder="Type here"
                              className="!text-[#344054]"
                              name="coverLetter"
                              // value={formik2.values.coverLetter}
                              value={coverLetter}
                              // change={(e) => {
                              //   setCoverletter(e);
                              // }}
                              change={handleTextChange}
                              required={false}
                            // error={formik2.errors.coverLetter}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : currentStep === 3 ? (
              <>
                <FlexCol />
                <div className="relative w-full mx-auto rounded-md borderb">
                  <FlexCol />
                  <div className="relative flex flex-col gap-12">
                    <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                      <h2
                        className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                        style={{ backgroundColor: `${primaryColor}10` }}
                      >
                        <div className="text-left rtl:text-right">
                          <h1 className="acco-h1">Questions </h1>
                          <p className="para">Questions for you.</p>
                        </div>
                      </h2>
                      <div
                        id={`acco-text-item`}
                        role="region"
                        aria-labelledby={`acco-title-item`}
                        className="flex flex-col justify-between w-full gap-6 p-5"
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 ">
                          {/* {questtemp.length > 0 ? (
              questtemp.map((condition, index) => (
                <><div key={index}>
                  <h4>{condition.question}</h4>
                  {condition.answerMetaData.map((metadata, idx) => (
                    <div key={idx}>
                      {metadata.key === 'Drop-down' && idx === 0 && (
                        <Dropdown
                          options={condition.answerMetaData
                            .filter(meta => meta.key === 'Drop-down')
                            .flatMap(meta => meta.value.split(','))
                            .map(option => ({ label: option.trim(), value: option.trim() }))}
                          change={Setdopdownvalue}
                          value={dropdownvalue} />
                      )}
                      {metadata.key === 'Paragraph' && (
                        <TextArea
                          rows={4}
                          change={setTextAreavalue}
                          value={textAreaValue} />
                      )}
                      {metadata.key === 'Checkboxes' && (
                        <div>
                          {metadata.value.split(',').map((option, optIdx) => (
                            <label key={optIdx}>
                              <Checkbox
                                value={option.trim()}
                                checked={selectedCheckboxes.includes(option.trim())}
                                onChange={() => handleCheckboxChange(option.trim())} />
                              {option.trim()}
                            </label>
                          ))}
                        </div>
                      )}
                      {metadata.key === 'Short Answer' && (
                        <FormInput
                          change={setForminputValue}
                          value={forminputvalue} />
                      )}
                      {metadata.key === 'Multiple Choice' && (
                        <div>
                          <Radio.Group
                            onChange={e => handleRadioChange(e, index)}
                            // value={selectedValues[index]}
                          >
                            {metadata.value.split(',').map((option, optIdx) => (
                              <Radio key={optIdx} value={option.trim()}>
                                {option.trim()}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
               
                </>
              ))         ) : ( */}
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                            <FormInput
                              title={
                                "Are you legally eligible to work in the country?"
                              }
                              placeholder={"Answer here.."}
                              className="text-[#344054]"
                              // name="customQuestion"
                              // value={questionfield}
                              // change={(e) => {
                              //   formik3.setFieldValue("customQuestion", e);
                              // }}
                              // change={(e) => {
                              //   setQuestionfield(e);
                              // }}
                              name="answer"
                              value={formik3.values.answer}
                              // change={formik3.handleChange}
                              change={(e) => {
                                formik3.setFieldValue("answer", e);
                              }}
                              // onBlur={formik3.handleBlur}
                              required={true}
                              error={formik3.errors.answer}
                            // required={false}
                            // error={formik3.errors.customQuestion}
                            />
                            {/* Additional FormInput components can be added here */}
                          </div>
                          {/* )}  */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>

            ) : currentStep === 4 ? (
              <>
                <FlexCol />

                <div className="relative w-full mx-auto rounded-md borderb">
                  <Accordion
                    title="Review"
                    description="Review your details."
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
                        handleSubmit={editdetails}
                      />
                    </div>
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mt-3"
                      >
                        <div className="flex-none">
                          {item.candidatePhoto ? (
                            <Image
                              className="bg-cover rounded-full h-18 w-18 object-cover"
                              src={item.candidatePhoto}
                              width={64}
                              height={64}
                              alt="profilepic"
                              style={{
                                borderRadius: "50%",
                                height: "4.5rem",
                                width: "4.5rem",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Image
                              className="bg-cover rounded-full h-18 w-18 object-cover"
                              src={noImg}
                              width={64}
                              height={64}
                              alt="Default Profile"
                              style={{
                                borderRadius: "50%",
                                height: "4.5rem",
                                width: "4.5rem",
                                objectFit: "cover",
                              }}
                            />
                          )}

                        </div>
                        <div className="flex-auto min-w-0 ml-4">
                          {item && item.candidateName && (
                            <p className="acco-h1">
                              {item.candidateName
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    <div>
                      {userdata.map((user) => (
                        <UserInfoComponent
                          key={user.personal[0].id}
                          personalInfo={user.personal}
                        />
                      ))}
                      {/* <div className="grid md:grid-cols-2 gap-7">
             { data.map((item, index) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
            <div className="text-black opacity-50 "><RiMailSendLine /></div>
          </div>
          <div className="inline-flex flex-col items-start justify-start ">
            <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
            Email Address
            </p>
            <p className="text-xs font-semibold leading-tight text-black dark:text-white">
              {item.candidateEmail}
            </p>
          </div>
          <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ml-12 ">
            <div className="text-black opacity-50 "><RiMailSendLine /></div>
          </div>
          <div className="inline-flex flex-col items-start justify-start ">
            <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
            Email Address
            </p>
            <p className="text-xs font-semibold leading-tight text-black dark:text-white">
              {item.candidateEmail}
            </p>
          </div>
        </div>
     ))} */}
                    </div>

                    {/* </div> */}
                    {/* <div>
                  {educationaldetails.map((user) => (
                    <UserInfoComponent
                      key={user.personal[0].id}
                      personalInfo={user.personal}
                    />
                  ))}
                </div> */}
                    <div className="v-divider" />

                    <div className="flex flex-col gap-4 ">
                      <h6 className="h6">Education</h6>
                      <div className="flex flex-col divide-y">
                        {educationaldetails.map((edu, index) => (
                          <div
                            key={index}
                            className="flex justify-start gap-5 py-3 2xl:py-6"
                          >
                            {/* <img
                            className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 rounded-full shadow"
                            src="https://via.placeholder.com/60x60"
                          /> */}
                            <div className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 text-center  rounded-full shadow bg-gray-200" >
                              {edu.institution && <p className="text-xl mt-2  ">{edu.institution.charAt(0).toUpperCase()}</p>}
                            </div>
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
                    <div className="flex flex-col gap-4 ">
                      <h6 className="h6">All Experiences</h6>
                      <div className="flex flex-col divide-y">
                        {experience.map((work, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-start gap-5 py-3 2xl:py-6"
                          >
                            {/* <img
                            className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 rounded-full shadow"
                            src="https://via.placeholder.com/60x60"
                          /> */}
                            <div className="2xl:w-[60px] 2xl:h-[60px] w-11 h-11 text-center  rounded-full shadow bg-gray-200" >
                              {work.companyName && <p className="text-xl mt-2  ">{work.companyName.charAt(0).toUpperCase()}</p>}
                            </div>
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
                        <h6 className="h6 !text-black dark:!text-white">
                          CV / Resume
                        </h6>
                        {/* <ButtonClick buttonName="Add Cover Note" icon={<IoMdAdd />} /> */}
                      </div>
                      <div className="flex items-center justify-between">
                        {filePdfresume ? (
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
                              <div className="text-black opacity-50 ">
                                {<RiFileList3Line />}
                              </div>
                            </div>
                            <p className="text-xs font-semibold leading-tight text-black dark:text-white">
                              Resume.pdf
                            </p>
                          </div>
                        ) : "Resume not uploaded"
                        }
                        <ButtonClick
                          buttonName="Edit Details"
                          className="text-[#6044E5]"
                          icon={<AiTwotoneEdit />}
                          handleSubmit={editcv}
                        />
                      </div>
                      {filePdfresume && (
                        <div className="divider-h" />
                      )}
                      {/* {data.map((item, index) => (
                    <PDFViewer pdfUrl={item.resumeFile} />
                    ))} */}
                      {data.map((item, index) => (
                        <>
                          {filePdfresume ? (
                            <iframe
                              key={index}
                              src={item.resumeFile}
                              width="100%"
                              height="500px"
                              title={`Resume-${index}`}
                            />
                          ) : ""}
                        </>
                      ))}
                    </div>
                    <div className="divider-h mt-9" />
                    <div className="flex flex-col gap-8 mt-8">
                      <h2 className="h6">Cover Letter</h2>
                    </div>
                    {data.map((data, index) => (
                      <div className="inline-flex flex-col items-start justify-start pt-4 gap-7">
                        {data.resumeCoverLetter}
                      </div>
                    ))}



                    <div className="divider-h mt-9" />
                    <div className="flex flex-col gap-8 mt-8">
                      <h2 className="h6">Prerequisite</h2>
                    </div>
                    <div className="inline-flex flex-col items-start justify-start pt-4 gap-7">
                      {customfield?.map((quest) => (
                        <div className="flex flex-col gap-3">
                          {/* key={quest.id} */}
                          <div className="flex">
                            <div className="w-12 ">
                              <span className="pblack">Q.</span>
                            </div>
                            <div>
                              <span className="pblack !text-opacity-80">
                                {quest.customQuestion}
                              </span>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-12 ">
                              <p className="pblack">Ans.</p>
                            </div>
                            <p className="pblack !text-opacity-80">
                              {quest.answer}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
        </div>

        {/* <>
        {isModalVisible && (
        <AntdModal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        > */}

        {/* </AntdModal>
      )}
      </> */}

        {/* <CountdownModal 
        title="Closing Drawer in 5 seconds..." 
        duration={5} 
        modal={modal}
        openModal={openModal} 
        contextHolder={contextHolder} 
      /> */}
        {/* {currentStep === 4 && isModalOpen && (
        // <Modal handleOpen={openModal} DialogBody={() => <div>Modal Content</div>} />
        <Modal1 handleOpen={() => setIsModalOpen(true)} DialogBody={() => <div>Modal Content</div>}/>
      )} */}
        {/* <Modal1
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          // Handle confirm action
          handleCloseModal(); // Close the modal after confirming
        }}
        onCancel={() => {
          // Handle cancel action
          handleCloseModal(); // Close the modal after canceling
        }}
        // buttonLabel="Open Custom Dialog"
        dialogHeader="Custom Dialog Header"
        dialogBody="Custom Dialog Body"
      /> */}
        <di>
          <Modal2
            isOpen={showModal}
            onClose={handleCloseModal}
            countDown={handleCloseModal}
          />
        </di>
        {contextHolder}
      </div>


      {/* <div className=" mt-10 divider-h  bottom-0" /> */}
      <div className="flex justify-between mt-4  rounded shadow-sm bg-white h-[65px] w-full fixed bottom-0 overflow-hidden">
        <div className="mt-4">
          {activeBtn !== 0 &&
            <ButtonClick
              buttonName="previous"
              BtnType="secondary"
              icon={<IoIosArrowBack />}
              handleSubmit={previous}
              disabled={currentStage === 0}
            />
          }
        </div>
        <div className="flex gap-2.5 p-1.5 justify-end items-center">
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
            disabled={
              (currentStage === 1 && formik.isSubmitting) ||
              (currentStage === 2 && formik1.isSubmitting) ||
              (currentStage === 3 && formik2.isSubmitting) ||
              (currentStage === 4 && formik3.isSubmitting)
            }
          />
        </div>
      </div>
    </div>
  );
}

const UserInfoComponent = ({ personalInfo }) => {
  return (
    <div className="grid md:grid-cols-2 gap-7">
      {personalInfo.map((info) => (
        <>
          {info.value && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
                <div className="text-black opacity-50">{info.icon}</div>
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
          )}
        </>
      ))}
    </div>
  );
};

export default Web;
