import React, { useState,useEffect } from 'react'
import DrawerPop from '../common/DrawerPop';
import { useTranslation } from "react-i18next"; 
import { RxCross2, RxQuestionMarkCircled } from "react-icons/rx";
import Stepper from '../common/Stepper';
import { Steps } from 'antd';


const Createjob = ( {open = "", close = () => { }}) => {
  
  const[show,setShow] =useState(open);
  const { t } = useTranslation();
  const [isUpdate, setIsUpdate] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [activeBtnValue, setActiveBtnValue] = useState("CreateJob"); //LeaveType

  const handleClose = () => {
    close(false);
  };


  const [steps, setSteps] = useState([
    {
      id: 1,
      value: 0,
      title: t("Leave_Type"),
      data: "LeaveType",
    },

    {
      id: 2,
      value: 1,
      title: t("Configuration"),
      data: "Configuration",
    },
    {
      id: 3,
      value: 2,
      title: t("Applicability"),
      data: "Applicability",
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
    
    >   
      <Stepper
                  currentStepNumber={activeBtn}
                  presentage={presentage}
                  // direction="left"
                  // labelPlacement="vertical"
                //   steps={steps}
                // className=" text-sm font-medium"
                // style={{
                //   fontSize: isSmallScreen ? "8px" : "10px",
                //   fontWeight: 600,
                // }}
                // // className="text-[10px]"
                // size={isSmallScreen ? "default" : "large"}
                />
    
    </DrawerPop>


    </div>
  )
}

export default Createjob