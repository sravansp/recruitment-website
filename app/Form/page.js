"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
  getRecruitmentJobById,
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
import { Button, DatePicker, AntdModal, Modal, notification } from "antd";
import DateSelect from "@/Components/ui/DateSelect";
import Modal2 from "@/Components/ui/Modal";
import { IoIosArrowBack } from "react-icons/io";
import { fileAction } from "@/Components/Api1";
import FileUpload from "@/Components/ui/FileUpload";

function Web({ closeDrawer, selectedJobId, onClick }) {
  const questidRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState(0);
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
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
  const [filePdf, setfilepdf] = useState();
  const [filePdfresume, setfilepdfresume] = useState();

  const [questionAnswers, setQuestionAnswers] = useState([]);
  const[coverLetter,setCoverletter]= useState("")
  const [questionfield,setQuestionfield]=useState("")
  //
  const [dropdownvalue, Setdopdownvalue] = useState(null);
  const [textAreaValue, setTextAreavalue] = useState(null);
  const [forminputvalue, setForminputValue] = useState(null);
  const [jobResumeEvaluationId, setjobResumeEvaluationId] = useState([]);
  const [fetchedAnswers, setfetchedAnswers] = useState([]);
  const [quesData, setQuesData] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
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
        location: "jnvkjdn",
      },
    ]);

  const handleDeleteEducationalDetails = (index) => {
    const updatedDetails = [{ ...additionalEducationalDetails }];
    updatedDetails.splice(index, 1);
    setAdditionalEducationalDetails(updatedDetails);
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
        background: `${
          type === "success"
            ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
            : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
        }`,
        boxShadow: `${
          type === "success"
            ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
            : "0px 22px 60px rgba(134, 92, 144, 0.20)"
        }`,
      },
      // duration: null,
    });
  };

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

  //   useEffect(() => {
  //     const fetchdata = async () => {
  //       try {
  //         const response = await getRecruitmentJobById(jobid);
  //         console.log(response, "qestid");
  //         const questionnaireId = response.result[0].questionnaireTemplateId;
  // console.log(questionnaireId,"iddd data in questionrie")
  //         setQestid(questionnaireId);
  //         console.log(questid, "idddddddddddddd");
  //       } catch (error) {
  //         console.error("error", error);
  //       }
  //     };
  //     fetchdata();
  //   }, [questid]);

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
      namePrefix: "",
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
    onSubmit: async (values) => {
      try {
        console.log(values, "gggg");
       
        

        // Make your API call here
        values.candidateName =
          `${values.namePrefix} ${values.firstName} ${values.lastName}`.trim();
        if (insertedid1) {
          console.log(values, "gggg");
          const update = await updateRecruitmentResume({
            id: insertedid1,
            ...values,
          });
          console.log(update);
          if (update.status === 200) {
            openNotification("success", "Successful", "success");
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
          Fileuplaod(response.result.insertedId)

          setinsertedId1(response.result.insertedId);
          console.log(insertedid1, "insertede i");
          if (response.status === 200) {
            openNotification("success", "Successful", response.message);
            setActiveBtn(activeBtn + 1);

            setCurrentStep(currentStep + 1);
            setPresentage(presentage + 1);
          } else if (response.status === 500) {
            openNotification(
              "error",
              "input field is empty..",
              response.message
            );
          }
        }
        console.log(insertedid1)
       
      } catch (error) {
        console.error("Error during form submission:", error);
        openNotification(
          "error",
          "input field is empty..",
          "input field is empty.."
        );
      }
    },
  });
  const Fileuplaod = async(e)=>{
    console.log(e,"hhhhhhhhhhhhhh")
    try{
      if (e) {
        console.log("hhhhhh")
      const formData = new FormData();
  
      formData.append('file', filePdf);
  
      console.log("inside file upload api");
  
      formData.append('action', 'resumePhotoUpload');
      formData.append('resumeId', e);
  
      
  
      const FileUpload = await fileAction(formData);
      console.log(FileUpload, "fileUploadResult")
    }
  }catch(error){
    console.log(error)
  }
  
 }

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
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema1: Yup.object().shape({
      // ...existing validations
      additionalEducationalDetails: Yup.array().of(
        Yup.object().shape({
          institute: Yup.string().required("School or University is required"),
          courseType: Yup.string().required("Degree is required"),
          courseName: Yup.string().required("Field of Study is required"),
          yearOfStudy: Yup.string().required("Year is required"),
        })
      ),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      console.log(values, "submiteddd valuess");
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
          openNotification("success", "Successful", response.message);
          setActiveBtn(activeBtn + 1);
          setCurrentStep(currentStep + 1);
          setPresentage(presentage + 1);
        } else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setSubmitting(false);
        // setIsFormSubmitted(true);
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

    enableReinitialize: true,
    validateOnChange: false,
    validationSchema2: Yup.object().shape({
      // ...existing validations
      additionalExperiences: Yup.array().of(
        Yup.object().shape({
          jobTitle: Yup.string().required("Job Title is required"),
          employmentType: Yup.string().required("Employment Type is required"),
          companyName: Yup.string().required("Company Name is required"),
          location: Yup.string().required("Location is required"),
          fromDate: Yup.string().required("From Date is required"),
          toDate: Yup.string().required("To Date is required"),
        })
      ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
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
        Fileuplaodresume(insertedid1)
        console.log("work experience Details API Response:", response);
       
        console.log(response.result.insertedId1)
        if (response.status === 200) {
          openNotification("success", "Successful", response.message);
          setActiveBtn(activeBtn + 1);
          setCurrentStep(currentStep + 1);
          setPresentage(presentage + 1);
        } else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message);
        }
      } catch (error) {
        console.error("Error saving work experience details:", error);
      } finally {
        setSubmitting(false);
        // setIsFormSubmitted(true);
      }
    },
  });
  const Fileuplaodresume = async(e)=>{
    console.log(e,"hhhhhhhhhhhhhh")
    try{
      if (e) {
        console.log("hhhhhh")
      const formData = new FormData();
  
      formData.append('file', filePdfresume);
  
      console.log("inside file upload api");
  
      formData.append('action', 'resumeFileUpload');
      formData.append('resumeId', e);
  
      
  
      const FileUploadresume = await fileAction(formData);
      console.log(FileUploadresume, "fileUploadResult")
    }
  }catch(error){
    console.log(error)
  }
  
 }

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
      customQuestion:questionfield,
      jobId: selectedJobId,
      resumeId: insertedid1,
      // highestEducationLevel: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      customQuestion: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const newAnswers = questid.flatMap((condition, conditionIndex) => {
          const answers = {}; // Object to store answers for each evaluationTemplateDetailsId
          condition.answerMetaData.forEach((metadata) => {
            const detailsId = condition.questionTemplateDetailsId;
            const answer = questionAnswers.find(
              (a) => a.questionTemplateDetailsId === detailsId
            );
            let questioneir;
            switch (metadata.key) {
              case "Drop-down":
                questioneir = dropdownvalue;
                break;
              case "Paragraph":
                questioneir = textAreaValue;
                break;
              case "Checkboxes":
                const selectedCheckboxValues = selectedCheckboxes.filter(
                  (option) => metadata.value.split(",").includes(option.trim())
                );
                questioneir = selectedCheckboxValues.join(", ");
                break;
              case "ShortAnswer":
                questioneir = forminputvalue;
                break;
              case "MultipleChoice":
                questioneir = selectedValues[conditionIndex];
                break;
              default:
                questioneir = "";
            }
            // Store the answer based on evaluationTemplateDetailsId
            answers[detailsId] = {
              jobId: selectedJobId,
              resumeId: insertedid1,
              customQuestion:"",
             
              createdBy: null,
            };
          });
          // Convert the answers object to an array
          return Object.values(answers);
        });

        console.log("New Answers:", newAnswers);
       
        const response = await saveRecruitmentJobResumesCustomField(values);
        console.log("question Details API Response:", response);
        setActiveBtn(activeBtn + 1);
        setCurrentStep(currentStep + 1);
        setPresentage(presentage + 1);
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

  const id = 226;
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

  const getquestionnaire = async () => {
    try {
      console.log(questid, "iddd");
      const idnew = questid;
      console.log(idnew, "daataa of idd new");
      const response = await getRecruitmentQuestionnaireTemplateDetailsById(
        questid
      );

      const questionData = response.result.map((item) => ({
        questionTemplateDetailsId: item.questionnaireTemplateDetailsId, // Assuming this is the correct ID
        question: item.question,
        answerMetaData: item.answerMetaData.map((metadata) => ({
          key: metadata.key,
          value: metadata.value,
        })),
      }));

      setQuesttemp(questionData);
      console.log(questionData);
      console.log(response, "questionnaire");
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getquestionnaire();
  }, []);

  useEffect(() => {
    fetchedAnswers.forEach((answer) => {
      const { questionTemplateDetailsId, questionAnswer } = answer;
      const matchedCondition = questtemp.find(
        (condition) =>
          condition.questionTemplateDetailsId === questionTemplateDetailsId
      );

      if (matchedCondition) {
        const metaData = matchedCondition.answerMetaData.find(
          (meta) => meta.key
        );

        if (metaData) {
          const { key } = metaData;
          switch (key) {
            case "Drop-down":
              Setdopdownvalue(questionAnswer);
              break;
            case "Paragraph":
              setTextAreavalue(questionAnswer);
              break;
            case "Checkboxes":
              const selectedOptions = questionAnswer
                .split(",")
                .map((option) => option.trim());
              setSelectedCheckboxes(selectedOptions);
              break;
            case "ShortAnswer":
              setForminputValue(questionAnswer);
              break;
            case "MultipleChoice":
              setSelectedValues((prevState) => {
                const newState = [...prevState];
                const index = questtemp.findIndex(
                  (condition) =>
                    condition.questionTemplateDetailsId ===
                    questionTemplateDetailsId
                );
                newState[index] = questionAnswer;
                return newState;
              });
              break;
            default:
              break;
          }
        }
      }
    });
  }, [questtemp, questionAnswers]);

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
        // formik3.handleSubmit();
        // setCurrentStage(currentStage + 1);
        // formik.resetForm();
        // formik1.resetForm();
        // formik2.resetForm();
        // formik3.resetForm();
        break;
      case 4:
        closeDrawer();
        setShowModal(true);
        // window.location.reload();
        formik.resetForm();
        formik1.resetForm();
        formik2.resetForm();
        formik3.resetForm();

        // case 5:

        // closeDrawer()
        // setShowModal(true);

        break;
      default:
        break;
    }
    // closeDrawer()
    //      setShowModal(true);
  };
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

  return (
    <div className="flex flex-col gap-6 container-wrapper ">
      <FlexCol />
      <Header1 closeDrawer={closeDrawer} jobid={jobid} />
      <div className="flex flex-col gap-6 max-w-[1070px] w-full mx-auto  ">
        {steps && (
          <div className=" sticky -top-6 w-full z-50 px-5  dark:bg-[#1f1f1f] pb-10 ">
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
                    /* <button
                      type="button" */
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    /* > */>
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">Personal Information </h1>
                        <p className="para">
                          lorem ipsum dummy text dolar sit.
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
                      className="flex flex-col justify-between w-full gap-6 px-6 py-4"
                    >
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-6">
                        <Dropdown
                          title={"Prefix"}
                          placeholder="Mr/Miss"
                          options={[
                            { label: "Mr", value: "mr" },
                            { label: "Miss", value: "miss" },
                          ]}
                          // className="text-[#344054]"
                          // onChange={formik.handleChange}
                          change={(e) => {
                            formik.setFieldValue("namePrefix", e);
                            console.log("First Name:", e);
                          }}
                          name="namePrefix"
                          value={formik.values.namePrefix}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                          error={formik.errors.firstName}
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
                          required={false}
                          error={formik.errors.lastName}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormInput
                          title={"Email"}
                          placeholder={"Email Address"}
                          // className="text-[#344054]"
                          name="candidateEmail"
                          value={formik.values.candidateEmail}
                          change={(e) => {
                            formik.setFieldValue("candidateEmail", e);
                          }}
                          required={false}
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
                          required={false}
                          error={formik.errors.candidateContact}
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
                      <FileUpload
                        className={
                          "relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black"
                        }
                        change={(e)=>{
                          setfilepdf(e)
                        }}
                      />
                      {/* </div> */}
                      {/* </div> */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormInput
                          title={"Location"}
                          placeholder={"United Arab Emirates"}
                          // className="text-[#344054]"
                          value={formik.values.candidateLocation}
                          change={(e) => {
                            formik.setFieldValue("candidateLocation", e);
                          }}
                          required={false}
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
                          required={false}
                          error={formik.errors.city}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormInput
                          title={"Address Line"}
                          placeholder={"Type here..."}
                          // className="text-[#344054]"
                          value={formik.values.address}
                          change={(e) => {
                            formik.setFieldValue("address", e);
                          }}
                          required={false}
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
                          required={false}
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
                          lorem ipsum dummy text dolar sit.
                        </p>
                      </div>
                    
                  </h2>
                  <div
                    id={`acco-text-item`}
                    role="region"
                    aria-labelledby={`acco-title-item`}
                    className="flex flex-col justify-between w-full gap-6 px-6 py-4"
                  >
                    {additionalEducationalDetails.map((detail, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between w-full gap-6 px-6 py-4"
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <FormInput
                            title={"School or University"}
                            placeholder={"Eg: Boston University"}
                            className="text-[#344054]"
                            name={`additionalEducationalDetails[${index}].institute`}
                            value={detail.institute}
                            change={(e) => {
                              const updatedDetails = [
                                ...additionalEducationalDetails,
                              ];
                              updatedDetails[index].institute = e;
                              setAdditionalEducationalDetails(updatedDetails);
                            }}
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik1.errors.additionalExperiences?.[index]
                                    ?.institute
                                : ""
                            }
                          />
                          <FormInput
                            title={"Degree"}
                            placeholder={"Eg: Bachelor’s"}
                            name={`additionalEducationalDetails[${index}].courseType`}
                            className="text-[#344054]"
                            value={detail.courseType}
                            change={(e) => {
                              const updatedDetails = [
                                ...additionalEducationalDetails,
                              ];
                              updatedDetails[index].courseType = e;
                              setAdditionalEducationalDetails(updatedDetails);
                            }}
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik1.errors.additionalExperiences?.[index]
                                    ?.courseType
                                : ""
                            }
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <FormInput
                            title={"Field of Study"}
                            placeholder={"Eg: Business"}
                            className="text-[#344054]"
                            name={`additionalEducationalDetails[${index}].courseName`}
                            value={detail.courseName}
                            change={(e) => {
                              const updatedDetails = [
                                ...additionalEducationalDetails,
                              ];
                              updatedDetails[index].courseName = e;
                              setAdditionalEducationalDetails(updatedDetails);
                            }}
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik1.errors.additionalExperiences?.[index]
                                    ?.courseName
                                : ""
                            }
                          />
                          <DateSelect
                            title={"Year"}
                            className="text-[#344054]"
                            name={`additionalEducationalDetails[${index}].yearOfStudy`}
                            selectpicker="year"
                            value={detail.yearOfStudy}
                            change={(e) => {
                              const updatedDetails = [
                                ...additionalEducationalDetails,
                              ];
                              updatedDetails[index].yearOfStudy = e;
                              setAdditionalEducationalDetails(updatedDetails);
                            }}
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik1.errors.additionalExperiences?.[index]
                                    ?.yearOfStudy
                                : ""
                            }
                          />
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() =>
                                handleDeleteEducationalDetails(index)
                              }
                            >
                              <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px]" />
                            </button>
                          </div>
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
        ) : currentStep === 2 ? (
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
                          lorem ipsum dummy text dolar sit.
                        </p>
                      </div>
                    
                  </h2>
                  <div
                    id={`acco-text-item`}
                    role="region"
                    aria-labelledby={`acco-title-item`}
                    className="flex flex-col justify-between w-full gap-6 px-6 py-4"
                  >
                    {additionalExperiences.map((experience, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between w-full gap-6 px-6 py-4"
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
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik2.errors.additionalExperiences?.[index]
                                    ?.jobTitle
                                : ""
                            }
                          />
                          <Dropdown
                            title={"Employment Type"}
                            placeholder="Enter Employment Type"
                            options={[
                              { value: "Fulltime", label: "Full-time" },
                              { value: "Parttime", label: "Part-time" },
                            ]}
                            className="text-[#344054]"
                            name={`additionalExperiences[${index}].employmentType`}
                            value={experience.employmentType}
                            change={(e) => {
                              const updatedExperiences = [
                                ...additionalExperiences,
                              ];
                              updatedExperiences[index].employmentType = e;
                              setAdditionalExperiences(updatedExperiences);
                            }}
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik2.errors.additionalExperiences?.[index]
                                    ?.employmentType
                                : ""
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
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik2.errors.additionalExperiences?.[index]
                                    ?.companyName
                                : ""
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
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik2.errors.additionalExperiences?.[index]
                                    ?.location
                                : ""
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
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik2.errors.additionalExperiences?.[index]
                                    ?.fromDate
                                : ""
                            }
                          />
                          <DateSelect
                            title={"To"}
                            placeholder={"01/09/2024"}
                            selectpicker="dateandtime"
                            className="text-[#344054]"
                            name={`additionalExperiences[${index}].toDate`}
                            value={experience.toDate}
                            change={(e) => {
                              const formattedDate = e
                                .split("/")
                                .reverse()
                                .join("-");

                              const updatedExperiences = [
                                ...additionalExperiences,
                              ];
                              updatedExperiences[index].toDate = formattedDate;

                              setAdditionalExperiences(updatedExperiences);
                            }}
                            required={false}
                            error={
                              isFormSubmitted
                                ? formik2.errors.additionalExperiences?.[index]
                                    ?.toDate
                                : ""
                            }
                          />
                          <div className="flex items-center justify-end">
                            <button onClick={() => handleDelete1(index)}>
                              <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px]" />
                            </button>
                          </div>
                        </div>
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
                            lorem ipsum dummy text dolar sit.
                          </p>
                        </div>
                      
                    </h2>
                    <div
                      id={`acco-text-item`}
                      role="region"
                      aria-labelledby={`acco-title-item`}
                      className="flex flex-col justify-between w-full gap-6 px-6 py-4"
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
                       <FileUpload
                        className={
                          "relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black"
                        }
                        change={(e)=>{
                          setfilepdfresume(e)
                        }}
                      />
                      <TextArea
                        title="Cover Letter"
                        placeholder="Type here"
                        className="!text-[#344054]"
                        name="coverLetter"
                        value={formik.values.coverLetter}
                        change={(e) => {
                          setCoverletter(e)

                        }}
                        required={false}
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
                        <p className="para">
                          lorem ipsum dummy text dolar sit.
                        </p>
                      </div>
                    
                  </h2>
                  <div
                    id={`acco-text-item`}
                    role="region"
                    aria-labelledby={`acco-title-item`}
                    className="flex flex-col justify-between w-full gap-6 px-6 py-4"
                  >
                    <div>
                      {questtemp.length > 0 ? (
                        questtemp.map((condition, index) => (
                          <div key={index}>
                            <h4>{condition.question}</h4>
                            {condition.answerMetaData.map((metadata, idx) => (
                              <div key={idx}>
                                {metadata.key === "Drop-down" && idx === 0 && (
                                  <Dropdown
                                    options={condition.answerMetaData
                                      .filter(
                                        (meta) => meta.key === "Drop-down"
                                      )
                                      .flatMap((meta) => meta.value.split(","))
                                      .map((option) => ({
                                        label: option.trim(),
                                        value: option.trim(),
                                      }))}
                                    change={Setdopdownvalue}
                                    value={dropdownvalue}
                                  />
                                )}
                                {metadata.key === "Paragraph" && (
                                  <TextArea
                                    rows={4}
                                    change={setTextAreavalue}
                                    value={textAreaValue}
                                  />
                                )}
                                {metadata.key === "Checkboxes" && (
                                  <div>
                                    {metadata.value
                                      .split(",")
                                      .map((option, optIdx) => (
                                        <label key={optIdx}>
                                          <Checkbox
                                            value={option.trim()}
                                            checked={selectedCheckboxes.includes(
                                              option.trim()
                                            )}
                                            onChange={() =>
                                              handleCheckboxChange(
                                                option.trim()
                                              )
                                            }
                                          />
                                          {option.trim()}
                                        </label>
                                      ))}
                                  </div>
                                )}
                                {metadata.key === "ShortAnswer" && (
                                  <FormInput
                                    change={setForminputValue}
                                    value={forminputvalue}
                                  />
                                )}
                                {metadata.key === "MultipleChoice" && (
                                  <div>
                                    <Radio.Group
                                      onChange={(e) =>
                                        handleRadioChange(e, index)
                                      }
                                      value={selectedValues[index]}
                                    >
                                      {metadata.value
                                        .split(",")
                                        .map((option, optIdx) => (
                                          <Radio
                                            key={optIdx}
                                            value={option.trim()}
                                          >
                                            {option.trim()}
                                          </Radio>
                                        ))}
                                    </Radio.Group>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                          <FormInput
                            title={
                              "Are you legally eligible to work in the country?"
                            }
                            placeholder={"Answer here.."}
                            className="text-[#344054]"
                            name="customQuestion"
                            value={formik3.values.customQuestion}
                            // change={(e) => {
                            //   formik3.setFieldValue("customQuestion", e);
                            // }}
                            change={(e)=>{
                              setQuestionfield(e)
                            }}
                            required={false}
                            error={formik3.errors.customQuestion}
                          />
                          {/* Additional FormInput components can be added here */}
                        </div>
                      )}
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
                {data.map((item, index) => (
                <div className="flex min-w-0 pt-3  gap-x-4">
                  <Image
                    className="flex-none bg-cover rounded-full h-18 w-18 object-cover"
                    src={item.candidatePhoto}
                    width={64}
                    height={64}
                    alt=""
                    style={{
                      flex: 'none',
                      borderRadius: '50%',
                      height: '4.5rem',  // Corresponds to h-18
                      width: '4.5rem',   // Corresponds to w-18
                      objectFit: 'cover'
                    }}
                  />
                 
                    <div className="flex-auto min-w-0 mt-3">
                      <p className="acco-h1"> {item.candidateName}</p>
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

                <div className="flex flex-col gap-4 box-wrapper">
                  <h6 className="h6">Education</h6>
                  <div className="flex flex-col divide-y">
                    {educationaldetails.map((edu, index) => (
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
                    {experience.map((work, index) => (
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
                  {data.map((item, index) => (
                  <PDFViewer pdfUrl={item.resumeFile} />
                ))}
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

      <div className="bottom-0 mt-10 divider-h" />
      <div className="flex justify-between">
        <div>
          <ButtonClick
            buttonName="previous"
            BtnType="secondary"
            icon={<IoIosArrowBack />}
            handleSubmit={previous}
            disabled={currentStage === 0}
          />
        </div>
        <div className="flex gap-2.5 p-1.5 justify-end">
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
      </div>
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
          show={showModal}
          handleClose={handleCloseModal}
          countDown={handleCloseModal}
        />
      </di>
      {contextHolder}
    </div>
  );
}

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

export default Web;
