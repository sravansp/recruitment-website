import React, { useEffect, useRef, useState } from 'react'
import InProgress from '../common/InProgres'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import DrawerPop from '../common/DrawerPop';
import FlexCol from '../common/FlexCol';
import { Card, Flex, Space, Tooltip, notification } from 'antd';
import Stepper from '../common/Stepper';
import Accordion from '../common/Accordion';
import FormInput from '../common/FormInput';
import Dropdown from '../common/Dropdown';
import TextEditor from '../common/TextEditor/TextEditor';
import { Button } from 'react-bootstrap';
import CheckBoxInput from '../common/CheckBoxInput';
import ImageUpload from '../common/ImageUpload';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDelete } from 'react-icons/md';
import { CgAdd } from 'react-icons/cg';
import AddMore from '../common/AddMore';
import TextArea from '../common/TextArea';
import ButtonClick from '../common/Button';
import profile from "../../assets/images/Frame 427319140.png"
import Frame1 from "../../assets/images/FrameG 427319587.png";
import Frame2 from "../../assets/images/FrameG 427319587 (1).png";
import Frame3 from "../../assets/images/FrameG 427319587 (2).png";
import Frame4 from "../../assets/images/FrameG 427319587 (3).png";
import LOGO from "../../assets/images/Bayt.png";
import resume from "../../assets/images/resumep.png";
import { GrEdit } from "react-icons/gr";
import Header from '../Header/Header';
import CVResume from './CandidateProfileTabs/CVResume';
import API, { action, fileAction } from '../Api1';
import { getAllRecruitmentResumesExperienceDetails, getAllRecruitmentResumeEducationalDetails, getRecruitmentResumeById, saveRecruitmentResume, saveRecruitmentResumeEducationalDetailBatch, saveRecruitmentResumesExperienceDetailBatch, resumeFileUpload } from '../Api1'
import RangeDatePicker from '../common/RangeDatePicker';
import DateSelect from '../common/DateSelect';
import FileUpload from '../common/FileUpload';
import { useNavigate } from 'react-router-dom';

export default function Createcandidatelist({ open = "", close = () => { }, fileUpdateId, refresh, ConfigurationAction, updateId = null, }) {
  const [show, setShow] = useState(open);
  const [activeBtnValue, setActiveBtnValue] = useState("Personel");//Review//Questions//Work//Personel//Educational
  const [nextStep, setNextStep] = useState(0);
  const [applicableData, setApplicableData] = useState([]);
  const [isUpdate, setIsUpdate] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [Gendervalue, setgender] = useState("Male");
  const [data, setData] = useState([])
  const [resumeId, setResumeId] = useState()
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
  const [file, setFile] = useState("");
  const [filePdf, setFilepdf] = useState("")
  const [Candidate, setcandidate] = useState([])
  const [Image, setImage] = useState("")
  const [candiateName, setcandidateName] = useState("")
  const [educationExperiences, seteducationExperiences] = useState([])
  const navigate = useNavigate();
  const [PdFViewer, setPdFViewer] = useState("")
  const [candidateImage, setcandidateImage] = useState("")
  const [workexp, setWorkexp] = useState([
    {
      id: 1,
      row: "one",
      field: [
        {
          title: "Job Title",
          inputFeild: "jobTitle",
          type: "input"
        },
        {
          title: "Employment Type",
          inputFeild: "employmentType",
          type: "dropdown"

        },
        {
          title: "Company Name",
          inputFeild: "companyName",
          type: "input"
        }, {
          title: "Location  ",
          inputFeild: "location",
          type: "input"
        }, {
          title: " from Date",
          inputFeild: "fromDate",
          type: "date"



        },],

    }

  ])

  const [education, setEducation] = useState([
    {
      id: 1,
      row: "one",
      field: [
        {
          title: "School Or University",
          inputName: "institute",
          type: "input"
        },
        {
          title: "Degree",
          inputName: "courseType",
          type: "dropdown"

        },
        {
          title: "Field of Study",
          inputName: "courseName",
          type: "input"
        }, {
          title: "Year",
          inputName: "yearOfStudy",
          type: "input"
        }, {
          title: "Location",
          inputName: "location",
          type: "input"
        },]
    }
  ])


  const openNotification = (type, message, description, callback) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      onClose: callback,

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
  const PersonelDetail = [{ id: 1, Image: Frame1, title: "Email Address", text: "grace.bennet@example.com" }, { id: 2, Image: Frame3, title: "Phone number", text: "+971 50671852" }, { id: 3, Image: Frame2, title: "DOB", text: "03 September 2000" }, { id: 4, Image: Frame4, title: "Location", text: "P156 Street, Al Qusais, UAE, 563211" }]

  const educationdetail = [{ id: 1, name: "Middle Earth Technic University", text: "Master degree in computer science and mathamatics", dateplace: "january,2012 Istanbul,Turkey" }, { id: 2, name: "Bogazici Technic University", text: "Master degree in computer science and mathamatics", dateplace: "january,2012 Istanbul,Turkey" }]


  const companydetail = [{ id: 1, name: "Trendyol.com", status: "Fulltime", domain: "Front-End-Developer", time: "1 year 2Months Oct 2021,Dec 2021" },
  { id: 1, name: "TiklaGelsin", status: "Contract", domain: "Front-End-Developer", time: "1 year 2Months Oct 2021,Dec 2021" },
  { id: 1, name: "Pazarama", status: "Internship", domain: "Front-End-Developer", time: "1 year 2Months Oct 2021,Dec 2021" }]


  const handleClose = () => {
    close(false);
  };

  const handleAddCondition = (e, i) => {
    setEducation((prevEvaluation) => [
      ...prevEvaluation,
      {
        id: 2,
        row: "two" + i,
        field: [
          {
            title: "School Or University",
            inputName: "institute" + i,
            type: "input"
          },
          {
            title: "Degree",
            inputName: "courseType" + i,
            type: "dropdown"

          },
          {
            title: "Field of Study",
            inputName: "courseName" + i,
            type: "input"
          }, {
            title: "Year",
            inputName: "yearOfStudy" + i,
            type: "input"
          }, {
            title: "Location",
            inputName: "location" + i,
            type: "input"
          }]
      }
    ]);
  };
  const handleAddWrok = (e, i) => {
    setWorkexp((prevWorkexp) => [
      ...prevWorkexp,
      {
        id: 2,
        row: "two" + i,
        field: [
          {
            title: "Job Title",
            inputFeild: "jobTitle" + i,
            type: "input"
          },
          {
            title: "Employment Type",
            inputFeild: "employmentType" + i,
            type: "dropdown"

          },
          {
            title: "Company Name",
            inputFeild: "companyName" + i,
            type: "input"
          }, {
            title: "Location  ",
            inputFeild: "location" + i,
            type: "input"
          }, {
            title: "Date",
            inputFeild: "fromDate" + i,
            type: "date"


          },],
      }
    ]);
  };
  const handleEditDetails = (section) => {
    setActiveBtnValue(section);
  };

  const personalInfo = education.reduce((ac, each) => {
    each.field.reduce((acc, value) => {
      acc[each.inputName] = "";
      console.log(each.inputName);
      return acc;
    });
  }, {});

  const personWorkExp = workexp.reduce((ac, each) => {
    each.field.reduce((acc, value) => {
      acc[each.inputFeild] = "";
      console.log(each.inputFeild);
      return acc;
    });
  }, {});


  useEffect(() => {
    console.log(FormData, "form data")
  }, [])
  const safeWorkMap = (list) =>
    (list ?? []).flatMap((each) =>
      (each.field ?? []).map((field) => [
        field.inputFeild,
        yup.string().required(`${field.title} is required`),
      ])
    );
  const formik3 = useFormik({
    initialValues: {
      ...personWorkExp,
      createdBy: localStorage.getItem('employeeId'),
      file: "",
      coverLetter: ""
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object({
      // jobTitle: yup.string().required("Job Title is required"),
      // location: yup.string().required("Location is required"),
      // companyName: yup.string().required("Company Name is required"),      
      // fromDate: yup.string().required("Date is required"),
      // employmentType: yup.string().required("Employment Type is required"),
      ...Object.fromEntries(
        safeWorkMap(workexp))

    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await saveRecruitmentResumesExperienceDetailBatch(
          workexp.map((each) => {
            const fromDate = values[each.field[4].inputFeild][0]; // Extracting start date from range picker
            const toDate = values[each.field[4].inputFeild][1]; // Extracting end date from range picker

            return {
              resumeId: resumeId,
              jobTitle: values[each.field[0].inputFeild],
              employmentType: values[each.field[1].inputFeild],
              companyName: values[each.field[2].inputFeild],
              location: values[each.field[3].inputFeild],
              fromDate: fromDate,
              toDate: toDate,
              createdBy: localStorage.getItem('employeeId')
            };
          })
        );
        if (response.status === 200) {
          if (resumeId) {
            const formData = new FormData();

            formData.append('file', filePdf);

            console.log("inside file upload api");

            formData.append('action', 'resumeFileUpload');
            formData.append('resumeId', resumeId);

            formData.append('coverLetter', values.coverLetter);

            const FileUpload = await fileAction(formData);
            console.log(FileUpload, "fileUploadResult")
          }
          setNextStep(nextStep + 1);
          setPresentage(1);
          openNotification("success", "Success...", response.message);

        } else {
          console.log("file upload failed")
          openNotification("error", "Failed..", response.message);
        }

        // File upload

        // if (result.status === 200) {
        //   setNextStep(nextStep + 1);
        //   setPresentage(1);


        // } else if (result.status === 500) {
        //   openNotification("error", "Failed..", result.message);
        // }
        // console.log(result);
        // console.log(result.errors);
      } catch (error) {
        openNotification("error", "Failed..", error.message);
      }
      // finally {
      //   setSubmitting(false);
      // }
    }
  });


  // const validationSchema = yup.object().shape({
  //   institute: yup.string().required('School or University is required'),
  //   courseType: yup.string().required('Degree is required'),
  //   courseName: yup.string().required('Field of Study is required'),
  // });
  const safeFlatMap = (list) =>
    (list ?? []).flatMap((each) =>
      (each.field ?? []).map((field) => [
        field.inputName,
        yup.string().required(`${field.title} is required`),
      ])
    );
  const formik = useFormik({
    initialValues: {
      ...personalInfo,
      createdBy: localStorage.getItem('employeeId'),

    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      // institute: yup.string().required('School or University is required'),
      // courseType: yup.string().required('Degree is required'),
      // courseName: yup.string().required('Field of Study is required'),     
      // yearOfStudy: yup.string().required('Year is required'),
      // location: yup.string().required('Location is required'),

      ...Object.fromEntries(
        safeFlatMap(education))
    }),


    onSubmit: async (values) => {
      try {
        const result = await saveRecruitmentResumeEducationalDetailBatch(

          education.map((each) => ({
            resumeId: resumeId,
            institute: values[each.field[0].inputName],
            courseType: values[each.field[1].inputName],
            courseName: values[each.field[2].inputName],

            yearOfStudy: values[each.field[3].inputName],
            location: values[each.field[4].inputName],
            createdBy: localStorage.getItem('employeeId')
          })),

        );
        if (result.status === 200) {
          setNextStep(nextStep + 1);
          setPresentage(1);
          openNotification("success", "Success...", result.message);

        } else if (result.status === 500) {
          openNotification("error", "Failed..", result.message);
        }
        console.log(result);
        console.log(result.errors);

      }
      catch (error) {
        openNotification("error", "Failed..", error.message);
        console.log(error);
      }
    }
  });


  const Degree = [{ id: 1, title: "Bachelors", value: "Bachelors" }, { id: 2, title: "other", value: "other" }
  ];
  const scrollRef = useRef();

  const Formik2 = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      candidateEmail: "",
      candidateContact: "",
      namePrefix: null,
      cityOrTown: "",
      candidateLocation: "",
      addressLine: "",
      postalCode: "",
      createdBy: "",
      candidateName: "",
      dob: "",
      file: null // Assuming file is part of your form values
    },

    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object({
      namePrefix: yup.string().required("Prefix is required"),
      firstName: yup.string().required("First Name is required"),
      candidateEmail: yup.string().required("Email is required"),
      candidateLocation: yup.string().required("Location is required"),
      candidateContact: yup.string().required("Phone Number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const candidateName = `${values.namePrefix} ${values.firstName} ${values.lastName}`;
        const result = await saveRecruitmentResume({
          candidateName: candidateName,
          firstName: values.firstName,
          lastName: values.lastName,
          namePrefix: values.namePrefix,
          candidateEmail: values.candidateEmail,
          candidateContact: values.candidateContact,
          cityOrTown: values.cityOrTown,
          candidateLocation: values.candidateLocation,
          addressLine: values.addressLine,
          postalCode: values.postalCode,
          candidateSource: "source1",
          resumeCode: null,
          createdBy: localStorage.getItem('employeeId'),
          jobId: null, // Assuming jobId is fixed for this form
          // createdBy: createdBy // Assuming createdBy is defined elsewhere
        });

        if (result.status === 200) {
          setNextStep(nextStep + 1);
          setPresentage(1);
          setResumeId(result.result.insertedId);
        } else if (result.status === 500) {
          openNotification("error", "Failed..", result.message);
        }
        console.log(result);
        console.log(result.errors);

        // Check if resumeId is available
        // if (resumeId && values.file) {
        //   console.log("inside file upload api");
        //   const formData = new FormData();
        //   formData.append('action', 'resumePhotoUpload');
        //   formData.append('resumeId', resumeId);
        //   formData.append('file', values.file);

        //   const response = await fileAction(formData);
        //   console.log(response, "fileUploadResult")
        //   if (response.status === 200) {
        //     setNextStep(nextStep + 1);
        //     setPresentage(1);
        //     openNotification("success", "Success...", result.message);
        //   } else {
        //     openNotification("error", "Failed..", response.message);
        //   }
        // }
      } catch (error) {
        openNotification("error", "Failed..", error.message);
        console.log(error);
      }
    }
  });
  useEffect(() => {
    const uploadFile = async () => {
      if (resumeId) {
        try {
          console.log("inside file upload api");
          const formData = new FormData();
          formData.append('action', 'resumePhotoUpload');
          formData.append('resumeId', resumeId);
          formData.append('file', file);

          const response = await fileAction(formData);
          console.log(response, "fileUploadResult");
          if (response.status === 200) {

            openNotification("success", "Success...", response.message);
          } else {
            openNotification("error", "Failed..", response.message);
          }
        } catch (error) {
          openNotification("error", "Failed..", error.message);
          console.log(error);
        }
      }
    };

    uploadFile();
  }, [resumeId]);
  const CreateDirectorSteps = [
    {
      id: 1,
      value: 0,
      title: t("Personal Details"),
      data: "Personel",
    },
    {
      id: 2,
      value: 1,
      title: t("Educational Details"),
      data: "Educational",
    },
    {
      id: 3,
      value: 2,
      title: t("Work Experience"),
      data: "Work",
    },
    // {
    //   id: 4,
    //   value: 3,
    //   title: "Questions",
    //   data: "Questions",
    // },
    {
      id: 4,
      value: 3,
      title: t("Review"),
      data: "Review",
    },

  ];

  const handleDeleteCondition = (index) => {
    setEducation((prevEvaluation) =>
      prevEvaluation.filter((_, i) => i !== index)
    );
  };
  const handleDeleteWork = (index) => {
    setWorkexp((prevWorkexp) =>
      prevWorkexp.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    // console.log(nextStep, activeBtn);
    if (activeBtn < 4 && activeBtn !== nextStep) {
      /// && activeBtn !== nextStep
      setActiveBtn(1 + activeBtn);
      // setNextStep(nextStep);
      // console.log(1 + activeBtn);
      // console.log(steps?.[activeBtn + 1].data, "data");
      setActiveBtnValue(CreateDirectorSteps?.[activeBtn + 1].data);
    }
  }, [nextStep]);

  const genderoption = [{ id: 1, title: "Mr", value: "Mr" }, { id: 2, title: "Mrs", value: "Mrs" }];
  const Jobtype = [{ id: 1, title: "Full Time", value: "fulltime" }, { id: 2, title: "Part Time", value: "parttime" }]

  console.log(resumeId, "resumeid");

  const getCandidatesById = async () => {
    try {
      const response = await getRecruitmentResumeById(resumeId);
      console.log(response);

      const personelDetails = [

        { id: 1, Image: Frame1, title: "Email Address", text: response.result[0].candidateEmail },
        { id: 2, Image: Frame3, title: "Phone number", text: response.result[0].candidateContact },
        { id: 3, Image: Frame2, title: "DOB", text: response.result[0].dob || "Not Available" },
        { id: 4, Image: Frame4, title: "Location", text: `${response.result[0].addressLine}, ${response.result[0].cityOrTown}, ${response.result[0].postalCode}` }
      ];
      console.log(personelDetails)
      setcandidate(personelDetails);
      setImage(response.result[0].candidatePhoto)
      setcandidateName(response.result[0].candidateName)
      setcandidateImage(response.result[0].candidatePhoto)
      setPdFViewer(response.result[0].resumeFile)

      console.log(personelDetails);
    } catch (error) {
      console.error('Error updating workflow ID:', error);
    }
  };

  useEffect(() => {

    getCandidatesById()
  }, [resumeId, PdFViewer]);

  const getEducationDetails = async () => {
    try {
      const response = await getAllRecruitmentResumeEducationalDetails(resumeId)
      console.log(response)
      seteducationExperiences(response.result.map((item) => ({
        institution: item.institute,
        degree: item.courseType,
        fieldOfStudy: item.courseName,
        location: item.location,
        graduationYear: item.yearOfStudy,
      })))
    } catch (error) {
      console.log(error)
    }
  }
  const [workExperiences, setexperience] = useState([])
  const getEmployeExperiance = async () => {
    try {
      const response = await getAllRecruitmentResumesExperienceDetails(resumeId);
      console.log(response)
      setexperience(response.result.map((items) => ({
        companyName: items.companyName,
        Shift: items.employmentType,
        role: items.jobTitle,
        startDate: items.fromDate,
        endDate: items.toDate,
        experienceDuration: items.location
      })))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEducationDetails()
    getEmployeExperiance()
  }, [resumeId])
  return (
    <div>
      {show && (
        <DrawerPop
          contentWrapperStyle={{
            position: "absolute",
            height: "100%",
            top: 0,
            // left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            borderRadius: 0,
            borderTopLeftRadius: "0px !important",
            borderBottomLeftRadius: 0,
          }}
          open={show}
          close={(e) => {
            // console.log(e);

            handleClose();
          }}
          // className={classNames}
          handleSubmit={(e) => {
            // console.log(e);
            Formik2.handleSubmit();
          }}

          updateFun={() => {
            // updateCompany();
          }}
          header={[
            !isUpdate
              ? t("Add Candidate")
              : t("Update Candidate"),
            !isUpdate
              ? t("Add Candidate")
              : t("Update Candidate"),
          ]}
          headerRight={
            <div className="flex md:gap-10 items-center">
              <p className="xl:text-sm text-[10px] font-medium text-gray-400">
                Draft Saved 10 Seconds ago
              </p>
              <div className="flex items-center gap-2.5">
                <p className="xl:text-sm text-xs font-medium text-gray-400">
                  {t("help")}
                </p>
                <RxQuestionMarkCircled className=" xl:text-2xl text-sm font-medium text-gray-400" />
              </div>
            </div>
          }
          footerBtn={[
            t("Cancel"),
            !isUpdate ? t("Save&Continue") : t("Update  Company"),
          ]}
          className="widthFull"
          stepsData={CreateDirectorSteps}
          buttonClick={(e) => {
            if (activeBtnValue === "Personel") {

              if (!updateId) {
                Formik2.handleSubmit();
              } else {
                setNextStep(nextStep + 1);
                // updateemployeeBasic();
              }
              //  setNextStep(nextStep + 1);
              // console.log("click 1");
            } else if (activeBtnValue === "Educational") {
              // console.log("click 2");
              if (!updateId) {
                formik.handleSubmit();
              } else {
                setNextStep(nextStep + 1);
                // updateemployeeBasic();
              }
              // setBtnName("Add Employee");

              // setNextStep(nextStep + 1);
              // updateemployeeAddress();

            } else if (activeBtnValue === "Work") {
              console.log("click 3");
              if (!updateId) {
                formik3.handleSubmit();
              } else {
                setNextStep(nextStep + 1);
                // updateemployeeBasic();
              }
              // setBtnName("Add Employee");

              // setNextStep(nextStep + 1);

            } else if (activeBtnValue === "Questions") {


              setNextStep(nextStep + 1);

            } else if (activeBtnValue === "Review") {
              // setBtnName("Add Employee");

              handleClose()
            }


          }}
          buttonClickCancel={(e) => {
            if (activeBtn > 0) {
              setActiveBtn(activeBtn - 1);
              setNextStep(nextStep - 1);
              setActiveBtnValue(CreateDirectorSteps?.[activeBtn - 1].data);
              console.log(activeBtn - 1);
            }

          }}
          nextStep={nextStep}
          activeBtn={activeBtn}
          saveAndContinue={true}


        >
          <FlexCol justify="center" align="center" >
            <div className='mt-5 m-auto w-5/6'>
              {CreateDirectorSteps && (
                <Stepper
                  currentStepNumber={activeBtn}
                  presentage={presentage}
                  // direction="left"
                  // labelPlacement="vertical"
                  steps={CreateDirectorSteps}

                  data={{
                    id: 2,
                    value: 1,
                    title: "Address Details ",
                    data: "addressDetails",
                  }}

                />
              )}
            </div>
            {activeBtnValue === "Personel" ? (
              <>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto mt-10">
                  <Accordion
                    title={t("Personal_Information")}
                    className="Text_area"
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      //   setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >

                    <Dropdown
                      title={t('Prefix')}
                      placeholder={`Mr`}
                      options={genderoption}
                      className='w-24'
                      change={(e) => {
                        Formik2.setFieldValue("namePrefix", e);
                      }}

                      value={Formik2.values.namePrefix}
                      error={Formik2.values.namePrefix ? "" : Formik2.errors.namePrefix}
                    />
                    <div className="grid grid-cols-2 gap-4 w-4/5">
                      <FormInput
                        title={t("First_Name")}
                        placeholder={t("Enter First Name")}
                        change={(e) => {
                          Formik2.setFieldValue("firstName", e);
                        }}

                        value={Formik2.values.firstName}

                        error={Formik2.values.firstName ? "" : Formik2.errors.firstName}
                        required={true}

                      />

                      <FormInput
                        title={t("Last_Name")}
                        placeholder={t("Enter Last Name")}
                        change={(e) => {
                          Formik2.setFieldValue("lastName", e);
                        }}

                        value={Formik2.values.lastName}

                      />
                      <FormInput
                        title={t("Email")}
                        placeholder={t("Enter Email")}
                        change={(e) => {
                          Formik2.setFieldValue("candidateEmail", e);
                        }}

                        value={Formik2.values.candidateEmail
                        }
                        error={Formik2.values.candidateEmail ? "" : Formik2.errors.candidateEmail}
                        required={true}


                      />
                      <FormInput
                        title={t("Phone_number")}
                        placeholder={t("Enter Phone number")}
                        change={(e) => {
                          Formik2.setFieldValue("candidateContact", e);
                        }}
                        value={Formik2.values.candidateContact}
                        error={Formik2.values.candidateContact ? "" : Formik2.errors.candidateContact}
                        required={true}
                      />

                    </div>

                    <div className='w-4/5'>
                      <p>Photo (Optional)</p>
                      <FileUpload change={(e) => {
                        if (e) {

                          setFile(e)

                        }
                        console.log(e)
                      }} />
                    </div>


                    <div className="grid grid-cols-2 gap-4 w-4/5">
                      <FormInput
                        title={t("Location")}
                        placeholder={t("Enter Location")}
                        change={(e) => {
                          Formik2.setFieldValue("candidateLocation", e);
                        }}
                        value={Formik2.values.candidateLocation}
                        error={Formik2.values.candidateLocation ? "" : Formik2.errors.candidateLocation}
                        required={true}
                      />

                      <FormInput
                        title={t("City_Or_Town")}
                        placeholder={t("Enter City Or Town")}
                        change={(e) => {
                          Formik2.setFieldValue("cityOrTown", e);
                        }}
                        value={Formik2.values.cityOrTown}
                      />
                      <FormInput
                        title={t("Address_Line")}
                        placeholder={t("Enter Address Line")}
                        change={(e) => {
                          Formik2.setFieldValue("addressLine", e);
                        }}
                        value={Formik2.values.addressLine}
                      />
                      <FormInput
                        title={t("Postal_Code")}
                        placeholder={t("Enter Postal Code")}
                        change={(e) => {
                          Formik2.setFieldValue("postalCode", e);
                        }}
                        value={Formik2.values.postalCode}
                      />

                    </div>

                  </Accordion>

                </FlexCol>
              </>
            ) : activeBtnValue === "Educational" ? (
              <>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto mt-10">
                  <Accordion
                    title={"Educational Details"}
                    className="Text_area "
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      //   setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >
                    {education.map((condition, index) => (
                      <div className='flex items-end'>
                        <div className="grid grid-cols-2 gap-4 w-4/5">
                          {condition.field.map((each) =>
                            each.type === "input" ? <FormInput
                              key={each.id}
                              title={each.title}
                              placeholder={`Enter ${each.title}`}
                              change={(e) => {
                                formik.setFieldValue(each.inputName, e);
                              }}
                              required={true}
                              value={formik.values[each.inputName]}
                              error={formik.errors[each.inputName]}
                            // error={formik.values[each.field[0].inputName] ? "" : formik.errors.institute}
                            // required={true}

                            />
                              :
                              <Dropdown
                                title={each.title}
                                placeholder="Enter Degree"
                                options={Degree}
                                required={true}
                                change={(e) => {
                                  formik.setFieldValue(each.inputName, e);
                                }}
                                value={formik.values[each.inputName]}
                                error={formik.values[each.inputName] ? "" : formik.errors[each.inputName]}
                              />)}



                        </div>
                        <div className='ml-auto '>
                          {index !== 0 && (
                            <RiDeleteBin6Line className='h-6 w-6' onClick={() => handleDeleteCondition(index)} />
                          )}
                        </div>
                      </div>
                    ))}
                    <AddMore
                      name="Add Custom Field "
                      className="!text-black"
                      change={(e) => {
                        handleAddCondition();
                      }}
                    />

                  </Accordion>

                </FlexCol>
              </>
            ) : activeBtnValue === "Work" ? (
              <>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto mt-10">
                  <Accordion
                    title={"Work Experience Details"}
                    className="Text_area "
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      //   setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >

                    {workexp.map((condition, index) => (
                      <div className='flex flex-col gap-3 '>
                        <div className="grid grid-cols-2 gap-4 w-4/5">
                          {condition.field.map((each) => each.type === "input" ?
                            <FormInput
                              key={each.id}
                              title={each.title}

                              placeholder={t("Enter " + each.title)}
                              change={(e) => {
                                formik3.setFieldValue(each.inputFeild, e);
                              }}
                              required={true}
                              value={formik3.values[each.inputFeild]}
                              error={formik3.errors[each.inputFeild]}


                            /> : each.type === "dropdown" ?

                              <Dropdown
                                title={each.title}
                                options={Jobtype}
                                placeholder={t("Enter " + each.title)}
                                change={(e) => {
                                  formik3.setFieldValue(each.inputFeild, e);
                                }}
                                required={true}
                                value={formik3.values[each.inputFeild]}
                                error={formik3.errors[each.inputFeild]}


                              /> :
                              <RangeDatePicker dateFormat="YYYY-MM-DD" title={each.title}
                                change={(e) => {
                                  formik3.setFieldValue(each.inputFeild, e);
                                }}
                                required={true}
                                value={formik3.values[each.inputFeild]}
                                error={formik3.errors[each.inputFeild]}
                              />
                          )}
                          {/* <FormInput
                            title={t("Company Name")}
                            placeholder={t("Eg: Microsoft")}

                          />
                          <FormInput
                            title={t("Location")}
                            placeholder={t("Eg: London, UK")}

                          /> */}

                        </div>



                        <div className='ml-auto '>
                          <Tooltip placement="top" title={"Delete"}>
                            {index !== 0 && (
                              <RiDeleteBin6Line className='size-4 text-slate-500 hover:text-red-500' onClick={() => handleDeleteWork(index)} />
                            )}
                          </Tooltip>
                        </div>

                      </div>
                    ))}
                    <AddMore
                      name="Add More Experience "
                      className="!text-black"
                      change={(e) => {
                        handleAddWrok();
                      }}
                    />

                  </Accordion>


                </FlexCol>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto">
                  <Accordion
                    title={"Resume & Cover Letter"}
                    className="Text_area "
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      //   setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >
                    <div className='flex flex-col gap-3 w-5/12'>
                      <div >

                        {/* <ImageUpload  change={(e) => {
                            Formik2.setFieldValue("file", e);
                          }}
  
                          value={Formik2.values.file}
  
                          /> */}
                        <FileUpload change={(e) => {
                          if (e) {

                            setFilepdf(e)
                          }
                        }} />
                      </div>
                      <div>
                        <TextArea
                          title={'Cover Letter'}
                          placeholder={"Enter Cover Letter"}
                          change={(e) => {
                            Formik2.setFieldValue("coverLetter", e);
                          }}

                          value={Formik2.values.coverLetter}

                        />
                      </div>
                    </div>
                  </Accordion>
                </FlexCol>
              </>)
              // ) : activeBtnValue === "Questions" ? (
              //   <>
              //     <FlexCol justify="center" align="center" className="w-5/6 m-auto  mt-10">
              //       <Accordion
              //         title={"Prerequisite"}
              //         className="Text_area "
              //         padding={true}
              //         toggleBtn={false}
              //         click={() => {
              //           //   setPresentage(1.4);
              //         }}
              //         initialExpanded={true}
              //       >

              //         <div className='flex items-end'>
              //           <div className="grid grid-cols-1 gap-4 w-4/5">
              //             <FormInput

              //               title={t("Are you legally eligible to work in the country?")}
              //               placeholder={t("Answer here..")}


              //             />
              //             <FormInput
              //               title={t("Highest level of education completed")}
              //               placeholder={t("Answer here..")}

              //             />
              //             <FormInput
              //               title={t("Highest level of education completed")}
              //               placeholder={t("Answer here..")}

              //             />
              //             <FormInput
              //               title={t("Highest level of education completed")}
              //               placeholder={t("Answer here..")}

              //             />
              //           </div>

              //         </div>

              //       </Accordion>
              //     </FlexCol>
              //   </>
              // ) 
              : (activeBtnValue === "Review" && (
                <>
                  <FlexCol justify="center" align="center" className="w-5/6 m-auto  mt-10">
                    <Accordion
                      title={"Review"}
                      className="Text_area "
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        //   setPresentage(1.4);
                      }}
                      initialExpanded={true}
                    >
                      <div className='divide-y flex flex-col gap-8'>
                        <div className='flex flex-col gap-4'>
                          <div className='flex justify-between'>
                            <h1 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>Personel Details</h1>
                            <ButtonClick
                              buttonName='Edit Details'
                              icon={<GrEdit />}
                              handleSubmit={() => handleEditDetails("Personel")}
                            />
                          </div>

                          <div className='flex gap-2 items-center'>
                            <img src={candidateImage} className='rounded-full' />
                            <h3 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>{candiateName}</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4 w-4/5">
                            {Candidate.map((item) => (
                              <div className='flex gap-2'>
                                <img src={item.Image} className='rounded-lg h-11 w-11' />
                                <div>
                                  <p className='text-sm font-normal text-gray-500 2xl:text-base dark:text-white'>{item.title}</p>
                                  <h3 className='text-sm font-semibold text-black 2xl:text-base dark:text-white'>{item.text}</h3>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>

                        <div className="flex flex-col gap-4 box-wrapper">
                          <div className='flex justify-between'>
                            <h1 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>Educational Details</h1>
                            <ButtonClick
                              buttonName='Edit Details'
                              icon={<GrEdit />}
                              handleSubmit={() => handleEditDetails("Educational")}
                            />
                          </div>
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
                          <div className='flex justify-between'>
                            <h1 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>Work Experience</h1>
                            <ButtonClick
                              buttonName='Edit Details'
                              icon={<GrEdit />}
                              handleSubmit={() => handleEditDetails("Work")}
                            />
                          </div>
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

                        <div className='flex flex-col gap-3'>

                          <div>
                            <CVResume
                              showTextEditor={false}
                              pdfUrl={PdFViewer}

                            />
                          </div>

                        </div>
                      </div>

                    </Accordion>
                  </FlexCol>
                </>
              )
              )}
          </FlexCol>
        </DrawerPop>
      )}
      {contextHolder}
    </div>
  )
}
