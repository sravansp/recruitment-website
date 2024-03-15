"use client";
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
import { saveRecruitmentJobApplicationFormSetting, saveRecruitmentResume } from "@/Components/Api";


function Web() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState(0);
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [formData, setFormData] = useState({});
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

  const handleSubmit =async (values,callback) => {
    if (activeBtn < steps.length - 1) {
      setActiveBtn(activeBtn + 1); // Increment the active step
      setCurrentStep(currentStep + 1); // Increment the current step
    }
  try {
    // Call the API function to save recruitment resume
    const response = await saveRecruitmentResume(values);
    console.log("API Response:", response);
    callback(values)
    // Update formData state if needed
    // setFormData(values);
  } catch (error) {
    console.error("Error:", error);
  }
  console.log(setFormData);
};
   
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetails handleSubmit={handleSubmit} />;

      case 2:
        return <EducationalDetails/>;
      case 3:
        return <WorkExperience />;
      case 4:
        return <Questions />;
        case 5:
          return <Review/>
      default:
        return null;
    }
  };
  console.log(currentStep);
  return (
    <div className="flex flex-col gap-6 py-10 container-wrapper mt-10">
        <FlexCol />
      <Header1 />
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
      {renderStep()}
      
      <div className="divider-h mt-10 bottom-0" />
      <div className=" flex gap-2.5 p-1.5 justify-end ">
        <ButtonClick buttonName="Cancel" icon={<RxCross2 />} className={"dark:text-white"} />
        <ButtonClick
          buttonName="Save & Continue"
          BtnType="primary"
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Web;
