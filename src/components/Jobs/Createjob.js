import React, { useState,useEffect } from 'react'
import DrawerPop from '../common/DrawerPop';
import { useTranslation } from "react-i18next"; 
import { RxCross2, RxQuestionMarkCircled } from "react-icons/rx";
import Stepper from '../common/Stepper';
import { Card, Flex, Radio } from 'antd';
import Accordion from '../common/Accordion';
import FlexCol from '../common/FlexCol';
import Dropdown from '../common/Dropdown';
import FormInput from '../common/FormInput';
import { regularOvertime } from '../data'; 
import TextArea from '../common/TextArea';
import Radiobuttonnew from '../common/Radiobuttonnew';
import GoogleForm from '../common/GoogleForm';
import JobCard from '../common/JobCard';
 

const Createjob = ( {open = "", close = () => { }}) => {
  
  const[show,setShow] =useState(open);
  const { t } = useTranslation();
  const [isUpdate, setIsUpdate] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState("Jobdetails"); //LeaveType
  const [btnName, setBtnName] = useState();
  const [customRate, setCustomRate] = useState(1);

  const handleClose = () => {
    close(false);
  };


  const [steps, setSteps] = useState([
    {
      id: 1,
      value: 0,
      title: t("Jobdetails"),
      data: "Jobdetails",
    },

    {
      id: 2,
      value: 1,
      title: t("Applicationform"),
      data: "ApplicationForm",
    },
    {
      id: 3,
      value: 2,
      title: t("Workflow"),
      data: "Workflow",
    },
    {
        id: 4,
        value: 3,
        title: t("TeamMembers"),
        data: "TeamMembers",
      },
      {
        id: 5,
        value: 4,
        title: t("Publish"),
        data: "Publish",
      },
  ]);

  const Radiobuttons = [
    {
      id: 1,
      label: t("Mandatory"),
      value: "Mandatory",
    },
    {
      id: 2,
      label: t("Optional"),
      value: "Optional",
    },
    {
      id: 3,
      label: t("Off"),
      value: "Off",
    },
  ];
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

    return (
    <div>
    <DrawerPop
     open={show}
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


     close={(e) => {
       setShow(e);
    //    setUpdateId(null);
       handleClose();
       
       
     }}
    
     header={[
        !isUpdate
          ? t("Create a Job")
          : t("Update_Employee_Onboarding"),
        t("Lorem ipsum dummy text doret solo."),
      ]}
      headerRight={
        <div className="flex items-center gap-10">
          <p className="text-sm font-medium text-gray-400">
            Draft Saved 10 Seconds ago
          </p>
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
            <RxQuestionMarkCircled className="text-2xl font-medium text-gray-400 " />
          </div>
        </div>
      }
      footerBtn={[
        t("Cancel"),
        !isUpdate ? t("Save_and_Continue") : t("Update_Company"),
      ]}
      className="widthFull"
      buttonClick={(e) => {
        switch (activeBtnValue) {
          case "Jobdetails":
            // Handle submission for Configuration
            setNextStep(nextStep + 1);
            break;

          case "ApplicationForm":
            // Handle submission for Applicability
            // Your logic for Applicability form submission...
            // Move to the next step if applicable
            // formik.handleSubmit();
            setNextStep(nextStep + 1);
            break;

          // Add more cases for additional activeBtnValues...

          case "Workflow":
            // assignPolicy();
            // Handle submission for Applicability
            // Your logic for Applicability form submission...
            // Move to the next step if applicable
            // formik1.handleSubmit();
            setNextStep(nextStep + 1);
            break;
            case "TeamMembers":
                // assignPolicy();
                // Handle submission for Applicability
                // Your logic for Applicability form submission...
                // Move to the next step if applicable
                // formik1.handleSubmit();
                setNextStep(nextStep + 1);
                break;
                case "Publish":
                    // assignPolicy();
                    // Handle submission for Applicability
                    // Your logic for Applicability form submission...
                    // Move to the next step if applicable
                    // formik1.handleSubmit();
                    setNextStep(nextStep + 1);
                    break;
          default:
            // // Handle the case when no card is selected
            // console.log(
            //   "Please select a card before moving to the next step."
            // );
            // openNotification(
            //   "error",
            //   "Please choose a card..",
            //   "Please select a card before moving to the next step."
            // );
            break;
        }
      }}
      buttonClickCancel={(e) => {
        if (activeBtn > 0) {
          setActiveBtn(activeBtn - 1);
          setNextStep(nextStep - 1);
          setActiveBtnValue(steps?.[activeBtn - 1].data);
          console.log(activeBtn - 1);
        }
        setBtnName("");
      }}
      nextStep={nextStep}
      activeBtn={activeBtn}
      saveAndContinue={true}
      stepsData={steps}
    >  
    
    <div >
      
      
      <FlexCol>
      <div className="flex flex-col gap-6 max-w-[1070px] w-full mx-auto ">
            {steps && (
              <div className=" sticky -top-6 w-full z-50 px-5 bg-white dark:bg-[#1f1f1f] pb-10 ">
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
                  
          <div className="relative max-w-[1070px]  w-full mx-auto ">
        
                  {activeBtnValue === "Jobdetails" ? (
                    <>
                   
                        <FlexCol>
                        <Accordion
                                    title={"Leave Allowance"}
                                    className="Text_area"
                                    padding={true}
                                    toggleBtn={false}
                                    click={() => {
                                        //   setPresentage(1.4);
                                    } }
                                    initiallyExpanded={true}
                                >
                                
                                    <div className="grid grid-cols-3 gap-6 ">
                                        <Dropdown
                                            title={t("Choose Template")}
                                            placeholder={t("Select")}
                                            required={true} />




                                        <FormInput
                                            title={t("Choose Company")}
                                            placeholder={t("Choose Company")}
                                            required={true} />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <Dropdown
                                            title={t("Job Title")}
                                            placeholder={t("Example : Marketing Manager")}
                                            required={true} />




                                        <Dropdown
                                            title={t("Department")}
                                            placeholder={t("Select...")}
                                            required={true} />
                                        <FormInput
                                            title={t("Choose Company")}
                                            placeholder={t("Choose Company")}
                                            required={true} />
                                    </div>
                                    
                                </Accordion>
                                
                                
                                        <Accordion
                                            title={"Location "}
                                            className="Text_area"
                                            padding={true}
                                            toggleBtn={false}
                                            // click={() => {
                                            //     setPresentage(1.4);
                                            // } }
                                            initiallyExpanded={true}
                                        >
                        <div className="md:grid grid-cols-12 flex flex-col gap-6 dark:text-white">
                        {regularOvertime?.map((each, i) => (
                          <div
                            key={i}
                            className={`col-span-4 p-4 border rounded-2xl cursor-pointer showDelay dark:bg-dark  ${customRate === each.id && "border-primary "
                              } `}
                            onClick={() => {
                              setCustomRate(each.id);
                            //   Formik3.setFieldValue("hourlyRate", each.value);
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div className=" flex flex-col gap-2">
                                {/* <GiReceiveMoney
                                className={`${
                                  customRate === each.id && "text-primary"
                                } `}
                              /> */}
                                <div
                                  className={`${customRate === each.id && " text-primary  "
                                    } p-2 border rounded-mdx w-fit bg-[#F8FAFC]`}
                                >
                                  {each.image}
                                </div>
                                {/* <img
                                  src={customRate === each.id ? cash : cashGray}
                                  alt=""
                                  className=" w-6 h-6"
                                /> */}
                                <h3 className=" text-sm font-semibold">
                                  {each.title}
                                </h3>
                                <p className=" text-xs font-medium text-[#667085] ">
                                  {each.description}
                                </p>
                              </div>
                              <div
                                className={`${customRate === each.id && "border-primary"
                                  } border  rounded-full`}
                              >
                                <div
                                  className={`font-semibold text-base w-4 h-4 border-2 border-white   rounded-full ${customRate === each.id &&
                                    "text-primary bg-primary"
                                    } `}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <FormInput
                                                    title={"Location"}
                                                    placeholder={'Example : Dubai'} />
                                                <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} />
                                            </div>
                                        </Accordion>
                                        <div>
                                            <Accordion
                                             title={"Employment Details"}
                                             className="Text_area"
                                             padding={true}
                                             toggleBtn={false}
                                             click={() => {
                                            //    setPresentage(1.4);
                                             }}
                                             >
                                            <div className='grid grid-cols-3 gap-4'>
                                            <Dropdown
                                                    title={'Job Type'}
                                                    placeholder={'Full-time'} />
                                                <Dropdown
                                                    title={'Experience'}
                                                    placeholder={'Mid-Senior level'} />
                                                     <Dropdown
                                                    title={'Education'}
                                                    placeholder={'Bachelor’s Degree'} />
                                            </div>
                                            <div className='grid grid-cols-3 gap-4'>
                                            <Dropdown
                                                    title={'Keywords'}
                                                    placeholder={'Example : Dubait'} />
                                                {/* <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} />
                                                     <Dropdown
                                                    title={'Requirement'}
                                                    placeholder={'Urgent'} /> */}
                                            </div>
                                            <div className='grid grid-cols-4 gap-4'>
                                            <FormInput
                                                    title={'Salary Range From'}
                                                    placeholder={'Urgent'} />
                                                <FormInput
                                                    title={'Salary Range To'}
                                                    placeholder={'Urgent'} />
                                                     <Dropdown
                                                    title={'Salary Currency'}
                                                    placeholder={'Urgent'} />
                                            </div>
                                            </Accordion>
                                        </div>
                                        <Accordion
                                               title={"Job Description"}
                                               className="Text_area"
                                               padding={true}
                                               toggleBtn={false}
                                               click={() => {
                                              //    setPresentage(1.4);
                                               }}
                                        
                                        > <Card>
                                            <TextArea
                                             title={t("Description")}
                                             placeholder={t("Enter the Job description here; include key reas of responsibility an what the candidate mi ht do on a typical day.")}
                                             required={true}
                                             hideBorder={true} 
                                             
                                            //  change={(e) => {
                                            //    formik.setFieldValue("description", e);
                                            //    if (presentage < 1.3)
                                            //          setPresentage(presentage + 0.1);
                                               
                                            //  }}
                                            //  value={formik.values.description || selectedAccordionItem?.description || fetchedData.description}
                                            //  error={formik.errors.description}
                                             />
                                                  <TextArea
                                             title={t("Requirement")}
                                             placeholder={t("Enter the job requirements here; from soft skills to the specific qualifications needed to perform the role.")}
                                             required={true}
                                             hideBorder={true} 
                                            //  change={(e) => {
                                            //    formik.setFieldValue("description", e);
                                            //    if (presentage < 1.3)
                                            //          setPresentage(presentage + 0.1);
                                               
                                            //  }}
                                            //  value={formik.values.description || selectedAccordionItem?.description || fetchedData.description}
                                            //  error={formik.errors.description}
                                             />
                                                  <TextArea
                                             title={t("Benefits")}
                                             placeholder={t("Enter the benefits here; Include nat just sa aty details but the perks that make your ca:npany unique.")}
                                             required={true}
                                             hideBorder={true} 
                                            //  change={(e) => {
                                            //    formik.setFieldValue("description", e);
                                            //    if (presentage < 1.3)
                                            //          setPresentage(presentage + 0.1);
                                               
                                            //  }}
                                            //  value={formik.values.description || selectedAccordionItem?.description || fetchedData.description}
                                            //  error={formik.errors.description}
                                             />
                                             </Card>

                                        </Accordion>
                                  
                                    </FlexCol>
                                    </>
                  
                ) : activeBtnValue === "ApplicationForm" ? (
                  <>
                  <FlexCol>
                  <Accordion
                      title={"ApplicationForm "}
                      className="Text_area"
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        // setPresentage(1.4);
                      } }
                      initiallyExpanded={true}
                    >


                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Name</div>

                        <Radiobuttonnew
                          options={Radiobuttons.filter(option => option.label === t("Mandatory"))}
                          title={""}
                          change={(e) => { } }
                        >
                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                        </Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Email</div>

                        <Radiobuttonnew
                          options={Radiobuttons.filter(option => option.label === t("Mandatory"))}
                          title={""}
                          change={(e) => { } }
                        >
                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                        </Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between w-full">
                        <p className="pblack text-black text-sm font-mediumleading-tight">Headline</p>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { } }
                        >

                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                          <Radio.Button value={t("Optional")}>Optional</Radio.Button>
                          <Radio.Button value={t("Off")}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Phone</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { } }
                        >

                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                          <Radio.Button value={t("Optional")}>Optional</Radio.Button>
                          <Radio.Button value={t("Off")}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Address</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { } }
                        >

                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                          <Radio.Button value={t("Optional")}>Optional</Radio.Button>
                          <Radio.Button value={t("Off")}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Country</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { } }
                        >

                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                          <Radio.Button value={t("Optional")}>Optional</Radio.Button>
                          <Radio.Button value={t("Off")}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>




                    </Accordion>
                    
                    
                    <Accordion
                    title={"Profile "}
                    className="Text_area"
                    padding={true}
                    toggleBtn={false}
                    click={() => {
                      // setPresentage(1.4);
                    } }
                    initiallyExpanded={true}
                    
                    >
                                           <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Education</div>

                        <Radiobuttonnew
  options={Radiobuttons.filter(option => option.label !== t("Mandatory"))}
  title={""}
  change={(e) => {}}
>
  <Radio.Button value={t("Optional")}>Optional</Radio.Button>
  <Radio.Button value={t("Off")}>Off</Radio.Button>
</Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Experience</div>

                        <Radiobuttonnew
  options={Radiobuttons.filter(option => option.label !== t("Mandatory"))}
  title={""}
  change={(e) => {}}
>
  <Radio.Button value={t("Optional")}>Optional</Radio.Button>
  <Radio.Button value={t("Off")}>Off</Radio.Button>
</Radiobuttonnew>


                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Summary</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { } }
                        >

                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                          <Radio.Button value={t("Optional")}>Optional</Radio.Button>
                          <Radio.Button value={t("Off")}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>
                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Resume</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { } }
                        >

                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                          <Radio.Button value={t("Optional")}>Optional</Radio.Button>
                          <Radio.Button value={t("Off")}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>

                      <div className="v-divider" />
                      <div className="flex items-center justify-between">
                        <div className="w-[53.92px] text-black text-sm font-medium font-['Inter'] leading-tight">Cover Letter</div>

                        <Radiobuttonnew
                          options={Radiobuttons}
                          title={""}
                          change={(e) => { } }
                        >

                          <Radio.Button value={t("Mandatory")}>Mandatory</Radio.Button>
                          <Radio.Button value={t("Optional")}>Optional</Radio.Button>
                          <Radio.Button value={t("Off")}>Off</Radio.Button>

                        </Radiobuttonnew>
                      </div>


                      
                      </Accordion>
                      <Accordion
                      title={"Custom Fields "}
                      className="Text_area"
                      padding={true}
                      toggleBtn={false}
                      click={() => {
                        // setPresentage(1.4);
                      } }
                      >
                      <GoogleForm/>


                      </Accordion>

                      </FlexCol></>
                ) : activeBtnValue === "Workflow" ? (
                  <Accordion
                    title={"Workflow"}
                    className="Text_area"
                    padding={false}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(1.4);
                    }}
                  >
                  <JobCard/>

                  </Accordion>
                ) : activeBtnValue === "TeamMembers" ? (
                  <Accordion
                    title={"TeamMembers"}
                    className="Text_area"
                    padding={false}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(1.4);
                    }}
                  ></Accordion>
                ) : activeBtnValue === "Publish" ? (
                  <Accordion
                    title={"Publish"}
                    className="Text_area"
                    padding={false}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(1.4);
                    }}
                  ></Accordion>
                ) : null
                   
                  }
                  
                  </div>
                </FlexCol>
                </div>
                
    </DrawerPop>


    </div>
  )
}

export default Createjob