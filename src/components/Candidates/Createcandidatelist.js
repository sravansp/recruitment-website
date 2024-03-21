import React, { useEffect, useRef, useState } from 'react'
import InProgress from '../common/InProgres'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import DrawerPop from '../common/DrawerPop';
import FlexCol from '../common/FlexCol';
import { Card, Flex, Space } from 'antd';
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


export default function Createcandidatelist({ open = "", close = () => { }, refresh, ConfigurationAction, }) {
  const [show, setShow] = useState(open);
  const [activeBtnValue, setActiveBtnValue] = useState("Review");
  const [nextStep, setNextStep] = useState(0);
  const [applicableData, setApplicableData] = useState([]);
  const [isUpdate, setIsUpdate] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);

  const { t } = useTranslation();

  const PersonelDetail = [{ id: 1, Image: Frame1, title: "Email Address", text: "grace.bennet@example.com" }, { id: 2, Image: Frame3, title: "Phone number", text: "+971 50671852" }, { id: 3, Image: Frame2, title: "DOB", text: "03 September 2000" }, { id: 4, Image: Frame4, title: "Location", text: "P156 Street, Al Qusais, UAE, 563211" }]

  const educationdetail = [{ id: 1, name: "Middle Earth Technic University", text: "Master degree in computer science and mathamatics", dateplace: "january,2012 Istanbul,Turkey" }, { id: 2, name: "Bogazici Technic University", text: "Master degree in computer science and mathamatics", dateplace: "january,2012 Istanbul,Turkey" }]


  const companydetail = [{ id: 1, name: "Trendyol.com", status: "Fulltime", domain: "Front-End-Developer", time: "1 year 2Months Oct 2021,Dec 2021" },
  { id: 1, name: "TiklaGelsin", status: "Contract", domain: "Front-End-Developer", time: "1 year 2Months Oct 2021,Dec 2021" },
  { id: 1, name: "Pazarama", status: "Internship", domain: "Front-End-Developer", time: "1 year 2Months Oct 2021,Dec 2021" }]


  const formik = useFormik({
    initialValues: {
      leaveType: "",
      categoryId: "",
      leaveName: "",
      description: "",
      leaveCount: "",
      isProrata: "",
      maxLeaveLimit: "",
      leaveLimitPer: "",
      isProrataProbationIncluded: "",
      leavePaytype: "",

      isProbationRestricted: "",
      unusedLeaveRule: "",
      maxlimit: "",


      leaveDaysType: "",
      isAnnualleave: "",
      leaveDays: "",
      isProbationRestricted: "",

      leavePaidRules: {
        between: [
          {
            fromDate: "",
            toDate: ""
          }
        ],
        greaterthanEqualto: [
          {
            fromDate: "",
            toDate: ""
          }
        ],

        lessThan: [
          {
            fromDate: "",
            toDate: ""
          }
        ],
        unpaidleave: [
          {

            Paycalculation: "",
            days: "",


          }
        ],

        partiallyPaid: [
          {

            percentagepaid: "",
            Paycalculation: "",
            days: "",


          }
        ]

      },
      isActive: "",
    },

    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      leaveType: yup.string().required("leaveType is Required"),

      leaveCount: yup.string().required("leaveCount is Required"),

    }),

  });



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


    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object({}),
    onSubmit: async (e) => {
      // console.log({ ...e });
      // console.log({
      //   applicableOn: [applicableData?.map((each) => e[each.inputTypeOne])],
      // });

      console.log({
        applicableOn:
          applicableData?.map((each) => e[each.inputTypeOne]) || null,
        employeeId: e.employee ? e.employee : null,
        departmentId: e.department ? e.department : null,
        designationId: e.designation ? e.designation : null,
        locationId: e.location ? e.location : null,
        entityId: e.entityId ? e.entityId : null,
        companyId: e.company ? e.company : null,
        branchId: e.branch ? e.branch : null,
        gradeId: e.grade ? e.grade : null,
      });
    }
  });

  const CreateDirectorSteps = [
    {
      id: 0,
      value: 0,
      title: "Personel Details",
      data: "Personel",
    },
    {
      id: 1,
      value: 1,
      title: "Educational Details",
      data: "Educational",
    },
    {
      id: 2,
      value: 2,
      title: "Work Experience",
      data: "Work",
    },
    {
      id: 3,
      value: 3,
      title: "Questions",
      data: "Questions",
    },
    {
      id: 4,
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
  const handleClose = () => {
    close(false);
  };

  useEffect(() => {
    if (activeBtn < 1 && activeBtn !== nextStep) {
      setActiveBtn(1 + activeBtn);
      setActiveBtnValue(CreateDirectorSteps?.[activeBtn + 1].data);
    }
  }, [nextStep]);

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
          header={[
            !isUpdate
              ? t("Head Of Director")
              : t("Update Head Of Director"),
            t("content"),
          ]}
          headerRight={
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2.5">
                <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
                <RxQuestionMarkCircled className="text-2xl font-medium text-gray-400 " />
              </div>
            </div>
          }

          footerBtn={[
            t("Cancel"),
            t("Save"),
          ]}
          className="widthFull"
          stepsData={CreateDirectorSteps}
          buttonClick={(e) => {
            console.log(activeBtnValue);

            //setNextStep(nextStep + 1);
            setActiveBtnValue(nextStep + 1)

          }}

          buttonClickCancel={(e) => {
            if (activeBtn > 0) {
              setActiveBtn(activeBtn - 1);
              setNextStep(nextStep - 1);
              setActiveBtnValue(CreateDirectorSteps?.[activeBtn - 1].data);
              console.log(activeBtn - 1);
            }
            //   setBtnName("");
          }}
          nextStep={nextStep}
          activeBtn={activeBtn}
          saveAndContinue={true}
        >
          <FlexCol >
            {CreateDirectorSteps && (
              <Flex justify="center">
                <div className=" sticky -top-6  z-50 px-5 bg-[#F8FAFC] dark:bg-[#1f1f1f] w-5/6 pb-6 ">
                  <Stepper
                    steps={CreateDirectorSteps}
                    currentStepNumber={activeBtn}
                    presentage={presentage}
                  />
                </div>
              </Flex>
            )}
            {activeBtnValue === "Personel" ? (
              <>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto">
                  <Accordion
                    title={"Personal Information"}
                    className="Text_area "
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
                      className='w-24' />

                    <div className="grid grid-cols-2 gap-4 w-4/5">
                      <FormInput
                        title={t("First Name")}
                        placeholder={t("First Name")}


                      />

                      <FormInput
                        title={t("Last Name")}
                        placeholder={t("Last Name")}

                      />
                      <FormInput
                        title={t("Email")}
                        placeholder={t("Email")}

                      />
                      <FormInput
                        title={t("Phone number")}
                        placeholder={t("Phone number")}

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


                      />

                      <FormInput
                        title={t("City Or Town")}
                        placeholder={t("City Or Town")}

                      />
                      <FormInput
                        title={t("Address Line")}
                        placeholder={t("Address Line")}

                      />
                      <FormInput
                        title={t("Postal Code")}
                        placeholder={t("Postal Code")}

                      />

                    </div>

                  </Accordion>




                </FlexCol>
              </>
            ) : activeBtnValue === "Educational" ? (
              <>
                <FlexCol justify="center" align="center" className="w-5/6 m-auto">
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
                <FlexCol justify="center" align="center" className="w-5/6 m-auto">
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
                <FlexCol justify="center" align="center" className="w-5/6 m-auto">
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
    </div>
  )
}
