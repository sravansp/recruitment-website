import React, { useEffect, useRef, useState } from 'react'
import InProgress from '../common/InProgres'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import DrawerPop from '../common/DrawerPop';
import FlexCol from '../common/FlexCol';
import { Card, Flex, Space, notification } from 'antd';
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
import API, { action } from '../Api1';
import {saveRecruitmentResume} from '../Api1'

export default function Createcandidatelist({ open = "", close = () => { }, refresh, ConfigurationAction,updateId = null, }) {
  const [show, setShow] = useState(open);
  const [activeBtnValue, setActiveBtnValue] = useState("Personel");//Review
  const [nextStep, setNextStep] = useState(0);
  const [applicableData, setApplicableData] = useState([]);
  const [isUpdate, setIsUpdate] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [Gendervalue, setgender] = useState("Male");
  const [data,setData] = useState ([])
  const [jobId,setJobId] =useState()
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
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

  // const formik = useFormik({
  //   initialValues: {
  //     leaveType: "",
  //     categoryId: "",
  //     leaveName: "",
  //     description: "",
  //     leaveCount: "",
  //     isProrata: "",
  //     maxLeaveLimit: "",
  //     leaveLimitPer: "",
  //     isProrataProbationIncluded: "",
  //     leavePaytype: "",

  //     isProbationRestricted: "",
  //     unusedLeaveRule: "",
  //     maxlimit: "",


  //     leaveDaysType: "",
  //     isAnnualleave: "",
  //     leaveDays: "",
  //     isProbationRestricted: "",

  //     leavePaidRules: {
  //       between: [
  //         {
  //           fromDate: "",
  //           toDate: ""
  //         }
  //       ],
  //       greaterthanEqualto: [
  //         {
  //           fromDate: "",
  //           toDate: ""
  //         }
  //       ],

  //       lessThan: [
  //         {
  //           fromDate: "",
  //           toDate: ""
  //         }
  //       ],
  //       unpaidleave: [
  //         {

  //           Paycalculation: "",
  //           days: "",


  //         }
  //       ],

  //       partiallyPaid: [
  //         {

  //           percentagepaid: "",
  //           Paycalculation: "",
  //           days: "",


  //         }
  //       ]

  //     },
  //     isActive: "",
  //   },

  //   enableReinitialize: true,
  //   validateOnChange: false,
  //   validationSchema: yup.object().shape({
  //     leaveType: yup.string().required("leaveType is Required"),

  //     leaveCount: yup.string().required("leaveCount is Required"),

  //   }),

  // });



  const scrollRef = useRef();
  const handleAddCondition = () => {
    setEvaluation((prevEvaluation) => [
      ...prevEvaluation,
      {
        id: prevEvaluation.length + 1,
        city: "",

      },
    ]);
  };
  
  const Formik2 = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      candidateEmail: "",
      candidateContact: "",
      namePrefix:"",
      cityOrTown:"",
      candidateLocation:"",
        addressLine:"",
        postalCode:"",
        createdBy:"",
        candidateName:""
    },

    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
    }),
    onSubmit: async (values) => {
      
      try {
        const candidateName = `${values.namePrefix} ${values.firstName} ${values.lastName}`;
        const result = await saveRecruitmentResume( {
          candidateName:candidateName,
          firstName: values.firstName,
          lastName: values.lastName,
          namePrefix: values.namePrefix,
          candidateEmail: values.candidateEmail,
          candidateContact: values.candidateContact,
          cityOrTown: values.cityOrTown,
          candidateLocation: values.candidateLocation,
          addressLine: values.addressLine,
          postalCode: values.postalCode,
          jobId: 1, // Assuming jobId is fixed for this form
          // createdBy: createdBy // Assuming createdBy is defined elsewhere
        });
        
        if (result.status === 200) {
          setNextStep(nextStep + 1);
          setPresentage(1);
          openNotification("success", "Success...", result.message);
          setJobId(result.result.insertedId);
        } else if (result.status === 500) {
          openNotification("error", "Failed..", result.message);
        }
        console.log(result);
        console.log(result.errors);
      } catch (error) {
        openNotification("error", "Failed..", error.message);
        console.log(error);
      }
    }
    
  });
  console.log(data,"hi this is result");
  const CreateDirectorSteps = [
    {
      id: 1,
      value: 0,
      title: "Personel Details",
      data: "Personel",
    },
    {
      id: 2,
      value: 1,
      title: "Educational Details",
      data: "Educational",
    },
    {
      id: 3,
      value: 2,
      title: "Work Experience",
      data: "Work",
    },
    {
      id: 4,
      value: 3,
      title: "Questions",
      data: "Questions",
    },
    {
      id: 5,
      value: 4,
      title: "Review",
      data: "Review",
    },

  ];

  const [evaluation, setEvaluation] = useState([{
    id: 1,
    city: "",
  },])

  const handleDeleteCondition = (index) => {
    setEvaluation((prevEvaluation) =>
      prevEvaluation.filter((_, i) => i !== index)
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
  
  const genderoption = [{id:1,title:"Male",value:"Male"},{id:2,title:"Female",value:"Female"}
];
  


 

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
              ? t("Head Of Director")
              : t("Update_Employee_Onboarding"),
            t("at Dubai, United Arab Emirates"),
          ]}
          headerRight={
            <div className="flex md:gap-10 items-center">
              <p className="xl:text-sm text-[10px] font-medium text-gray-400">
                Draft Saved 10 Seconds ago
              </p>
              <div className="flex items-center gap-2.5">
                <p className="xl:text-sm text-xs font-medium text-gray-400">
                  help
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
              // console.log("click 1");
            } else if (activeBtnValue === "Educational") {
              // console.log("click 2");

              // setBtnName("Add Employee");
             
                setNextStep(nextStep + 1);
                // updateemployeeAddress();
             
            } else if (activeBtnValue === "Work") {
              console.log("click 3");

              // setBtnName("Add Employee");
              
                setNextStep(nextStep + 1);
              
            } else if (activeBtnValue === "Questions") {
             
              
                setNextStep(nextStep + 1);
              
            } else if (activeBtnValue === "Review") {
              // setBtnName("Add Employee");
             
              setNextStep(nextStep + 1);
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

                  // className=" text-sm font-medium"
                  // style={{
                  //   fontSize: isSmallScreen ? "8px" : "10px",
                  //   fontWeight: 600,
                  // }}
                  // // className="text-[10px]"
                  // size={isSmallScreen ? "default" : "large"}
                />
              )}
              </div>
            {activeBtnValue === "Personel" ? (
              <>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto mt-10">
                  <Accordion
                    title={"Personal Information"}
                    className="Text_area"
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      //   setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >

                    <Dropdown
                      title='Prefix'
                      placeholder="Mr"
                      options={genderoption}
                      className='w-24'
                      change={(e) => {
                        Formik2.setFieldValue("namePrefix", e);
                      }}
                    
                      value={Formik2.values.namePrefix} />

                    <div className="grid grid-cols-2 gap-4 w-4/5">
                      <FormInput
                        title={t("First Name")}
                        placeholder={t("First Name")}
                        change={(e) => {
                          Formik2.setFieldValue("firstName", e);
                        }}
                      
                        value={Formik2.values.firstName}
                       
                        error={Formik2.errors.firstName}
                        required={true}

                      />

                      <FormInput
                        title={t("Last Name")}
                        placeholder={t("Last Name")}
                        change={(e) => {
                          Formik2.setFieldValue("lastName", e);
                        }}
                      
                        value={Formik2.values.lastName}

                      />
                      <FormInput
                        title={t("Email")}
                        placeholder={t("Email")}
                        change={(e) => {
                          Formik2.setFieldValue("candidateEmail", e);
                        }}
                      
                        value={Formik2.values.candidateEmail
                        }

                      />
                      <FormInput
                        title={t("Phone number")}
                        placeholder={t("Phone number")}
                        change={(e) => {
                          Formik2.setFieldValue("candidateContact", e);
                        }}
                         value={Formik2.values.candidateContact }
                      />

                    </div>
                   
      

                    <div className='w-4/5'>
                      <p>Photo (Optional)</p>
                      <ImageUpload />
                    </div>


                    <div className="grid grid-cols-2 gap-4 w-4/5">
                      <FormInput
                        title={t("Location")}
                        placeholder={t("Location")}
                        change={(e) => {
                          Formik2.setFieldValue("candidateLocation", e);
                        }}
                         value={Formik2.values.candidateLocation }

                      />

                      <FormInput
                        title={t("City Or Town")}
                        placeholder={t("City Or Town")}
                        change={(e) => {
                          Formik2.setFieldValue("cityOrTown", e);
                        }}
                         value={Formik2.values.cityOrTown }
                      />
                      <FormInput
                        title={t("Address Line")}
                        placeholder={t("Address Line")}
                        change={(e) => {
                          Formik2.setFieldValue("addressLine", e);
                        }}
                         value={Formik2.values.addressLine }
                      />
                      <FormInput
                        title={t("Postal Code")}
                        placeholder={t("Postal Code")}
                        change={(e) => {
                          Formik2.setFieldValue("postalCode", e);
                        }}
                         value={Formik2.values.postalCode }
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
                    {evaluation.map((condition, index) => (
                      <div className='flex items-end'>
                        <div className="grid grid-cols-2 gap-4 w-4/5">
                          <FormInput
                            key={condition.id}
                            title={t("School or University")}
                            placeholder={t("School or University")}


                          />


                          <Dropdown
                            title='Degree'
                            placeholder="Mr"
                          />
                          <FormInput
                            title={t("Field of Study")}
                            placeholder={t("Email")}

                          />
                          <FormInput
                            title={t("Year")}
                            placeholder={t("Phone number")}

                          />



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

                    {evaluation.map((condition, index) => (
                      <div className='flex flex-col gap-3 '>
                        <div className="grid grid-cols-2 gap-4 w-4/5">
                          <FormInput
                            key={condition.id}
                            title={t("Job Title")}
                            placeholder={t("Eg: Retail Sales Manager")}


                          />

                          <Dropdown
                            title='Employment Type'
                            placeholder="Eg: Fulltime"
                           
                            
                          />
                          <FormInput
                            title={t("Company Name")}
                            placeholder={t("Eg: Microsoft")}

                          />
                          <FormInput
                            title={t("Location")}
                            placeholder={t("Eg: London, UK")}

                          />

                        </div>


                        <div className='flex gap-4 w-96'>
                          <FormInput
                            title={t("From")}
                            type='date'
                            placeholder={t("Eg: London, UK")}

                          />
                          <FormInput
                            title={t("To")}
                            type='date'
                            placeholder={t("Eg: London, UK")}

                          />
                        </div>


                        <div className='ml-auto '>
                          {index !== 0 && (
                            <RiDeleteBin6Line className='h-6 w-6' onClick={() => handleDeleteCondition(index)} />
                          )}
                        </div>

                      </div>
                    ))}
                    <AddMore
                      name="Add More Experience "
                      className="!text-black"
                      change={(e) => {
                        handleAddCondition();
                      }}
                    />

                  </Accordion>




                </FlexCol>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto">
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
                    <div className='flex flex-col gap-3 w-5/12'>
                      <div >

                        <ImageUpload />
                      </div>
                      <div>
                        <TextArea
                          title='Cover Letter'
                          placeholder='Type here' />
                      </div>
                    </div>
                  </Accordion>




                </FlexCol>
              </>
            ) : activeBtnValue === "Questions" ? (
              <>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto  mt-10">
                  <Accordion
                    title={"Prerequisite"}
                    className="Text_area "
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      //   setPresentage(1.4);
                    }}
                    initialExpanded={true}
                  >

                    <div className='flex items-end'>
                      <div className="grid grid-cols-1 gap-4 w-4/5">
                        <FormInput

                          title={t("Are you legally eligible to work in the country?")}
                          placeholder={t("Answer here..")}


                        />

                        <FormInput
                          title={t("Highest level of education completed")}
                          placeholder={t("Answer here..")}

                        />
                        <FormInput
                          title={t("Highest level of education completed")}
                          placeholder={t("Answer here..")}

                        />
                        <FormInput
                          title={t("Highest level of education completed")}
                          placeholder={t("Answer here..")}

                        />



                      </div>

                    </div>

                  </Accordion>




                </FlexCol>
              </>
            ) : (activeBtnValue === "Review" && (
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
                          />
                        </div>

                        <div className='flex gap-2 items-center'>
                          <img src={profile} className='rounded-full' />
                          <h3 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>Grace Bennett Anderson</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-4/5">
                          {PersonelDetail.map((item) => (
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

                      <div className='flex flex-col gap-4 '>
                        <h1 className='mt-10 text-base font-semibold text-black 2xl:text-2xl dark:text-white'>Education</h1>
                        {educationdetail.map((each) => (
                          <div className='flex flex-col gap-2 divide-y '>
                            <div className='flex gap-3 '>
                              <img src={LOGO} className='rounded-full h-12 w-12' />
                              <div>
                                <h2 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>{each.name}</h2>
                                <h3>{each.text}</h3>
                                <p className='text-sm font-normal text-gray-500 2xl:text-base dark:text-white'>{each.dateplace}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>


                      <div className='flex flex-col gap-4 '>
                        <h1 className='mt-10 text-base font-semibold text-black 2xl:text-2xl dark:text-white'>All Experiences</h1>
                        {companydetail.map((each) => (
                          <div className='flex flex-col gap-2 divide-y '>
                            <div className='flex gap-3 '>
                              <img src={LOGO} className='rounded-full h-12 w-12' />
                              <div>
                                <span className='flex gap-2 items-center'>
                                  <h2 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>{each.name}</h2>
                                  <h3 className='bg-slate-200 rounded-md'>{each.status}</h3>
                                </span>
                                <span className='flex gap-2 items-center'>
                                  <p className='text-sm font-normal text-gray-500 2xl:text-base dark:text-white'>{each.domain}</p>
                                  <p className='text-sm font-normal text-gray-500 2xl:text-base dark:text-white'>{each.time}</p>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className='flex flex-col gap-3'>
                      {/* <h1 className="h1 !mt-10">{t("Resume/Cv")}</h1> */}
                        {/* <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                          <img src={resume} className='rounded-lg' />
                          <h3 className='text-sm font-semibold text-black lg:text-xs 2xl:text-base dark:text-white'>Grace Bennett Anderson</h3>
                        </div>
                        <ButtonClick
                            buttonName='Edit Details'
                            icon={<GrEdit />}
                          />
                          
                        </div> */}
                        <div>
                          <CVResume />
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
