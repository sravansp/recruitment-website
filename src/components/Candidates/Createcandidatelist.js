import React, { useEffect, useState } from 'react'
import InProgress from '../common/InProgres'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import DrawerPop from '../common/DrawerPop';
import FlexCol from '../common/FlexCol';
import { Flex } from 'antd';
import Stepper from '../common/Stepper';


export default function Createcandidatelist({ open = "", close = () => { }, refresh, ConfigurationAction, }) {
  const [show, setShow] = useState(open);
  const [activeBtnValue, setActiveBtnValue] = useState("Personel");
  const [nextStep, setNextStep] = useState(0);
  const [applicableData, setApplicableData] = useState([]);
  const [isUpdate, setIsUpdate] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [presentage, setPresentage] = useState(0);

  const { t } = useTranslation();


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

  const handleClose = () => {
    close(false);
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
            t("Create_Social_Security_Contributions_By_Simple_Steps"),
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
            setNextStep(nextStep + 1);
            if (activeBtnValue === "Personel") {
              formik.handleSubmit();
              // Update activeBtnValue and nextStep to navigate to the next step
              setActiveBtnValue("assign");
              setNextStep(nextStep + 1);
              console.log("click 1");
            } else if (activeBtnValue === "Educational") {
              console.log("click 2");
              Formik2.handleSubmit();
              
            
            }
            else if (activeBtnValue === "Work") {
              console.log("click 3");
              Formik2.handleSubmit();
             
            }
            else if (activeBtnValue === "Questions") {
              console.log("click 4");
              Formik2.handleSubmit();
           
            }
            else if (activeBtnValue === "Review") {
              console.log("click 5");
              Formik2.handleSubmit();
              // You may also want to update activeBtnValue and nextStep here
              // depending on your navigation flow
            }
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
              <h1>first page</h1>
              </>
              ) : activeBtnValue === "Educational" ? (
                <>
                  <h1>2 page</h1>
                </>
                ) : activeBtnValue === "Work" ? (
                  <>
                    <h1>3 page</h1>
                  </>
            ) : activeBtnValue === "Questions" ? (
              <>
                <h1>4 page</h1>
              </>
              ) : (activeBtnValue === "Review" && (
                  <>
                    <h1>5 page</h1>
                  </>
                     )
                     )}
            </FlexCol>
          

        </DrawerPop>
)}
    </div>
  )
}
