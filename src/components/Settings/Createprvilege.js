import React, { useEffect, useState } from 'react'
import DrawerPop from '../common/DrawerPop';
import { useTranslation } from 'react-i18next';
import FlexCol from '../common/FlexCol';
import { Avatar, Flex, notification } from 'antd';
import Stepper from '../common/Stepper';
import Heading from '../common/Heading';
import FormInput from '../common/FormInput';
import CheckBoxInput from '../common/CheckBoxInput';
import { motion } from "framer-motion";
import SearchBox from '../common/SearchBox';
import { LuSearch } from 'react-icons/lu';
import VirtualList from "rc-virtual-list";
import List from '../common/List';
import * as yup from "yup";
import { useFormik } from 'formik';
import { RxCross2 ,RxQuestionMarkCircled} from 'react-icons/rx';
import Accordion from '../common/Accordion';



export default function Createprvilege( {open = "",
close = () => {},
refresh = () => {},updateId}) {


    const [show, setShow] = useState(open);
    const [isUpdate, setIsUpdate] = useState(updateId ? true : false);
    const [activeBtn, setActiveBtn] = useState(0);
    const [presentage, setPresentage] = useState(0);
    const [activeBtnValue, setActiveBtnValue] = useState("Roles");
    const [nextStep, setNextStep] = useState(0);
    const [applicableData, setApplicableData] = useState([]);
    const [allSelect, setAllSelect] = useState(false);
    const [assignBtnName, setAssignBtnName] = useState("employees");
    const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeSearchData, setEmployeeSearchData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchValue, setSarchValue] = useState();
    const [assignEmployee, setAssignEmployee] = useState([]);
    const [assignSelect, setAssignSelect] = useState(false);
    const [roleTypeId, setRoleTypeId] = useState(null);
    const [data, setdata] = useState([]);
    const [parent, setParent] = useState([]);
    const [subFunctionCheckboxes, setSubFunctionCheckboxes] = useState({});
    const [employeeId, setEmployeeId] = useState([]);
    const { t } = useTranslation();


    const handleClose = () => {
        close(false);
      };
      const [api, contextHolder] = notification.useNotification();
      const [functionRender, setFunctionRender] = useState(false);
    
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
    
      const formik = useFormik({
        initialValues: {
          roleName: "",
          isActive: "",
          createdBy: "chinju",
        },
        enableReinitialize: true,
        validateOnChange: false,
        validationSchema: yup.object().shape({
          roleName: yup.string().required("Role Name is Required"),
        }),
        onSubmit: async (values) => {
        }
      });
    
      const initialValues = {
        policyName: "",
      };
    
      const Formik2 = useFormik({
        initialValues,
    
        enableReinitialize: true,
        validateOnChange: false,
        validationSchema: yup.object({}),
        onSubmit: async (e) => {
          
        },
      });
    
      const CreateRoleteps = [
        {
          id: 0,
          value: 0,
          title: "Roles",
          data: "Roles",
        },
        {
          id: 1,
          value: 1,
          title: "Assign Roles",
          data: "assign",
        },
      ];
    
      useEffect(() => {
        if (activeBtn < 1 && activeBtn !== nextStep) {
          setActiveBtn(1 + activeBtn);
          setActiveBtnValue(CreateRoleteps?.[activeBtn + 1].data);
        }
      }, [nextStep]);
    
      const navigateBtn = [
        { id: 1, value: "employees", title: "Employees" },
        // { id: 2, value: "Groups", title: "Groups" },
      ];
      const [activeTab, setActiveTab] = useState(navigateBtn[0].id);
    
      const getEmployee = async () => {
       
        
      };
      
    
      useEffect(() => {
        switch (assignBtnName) {
          default:
            getEmployee();
            break;
        }
      }, [assignBtnName]);
    
      
    
     
    
      useEffect(() => {
        // getData();
       
      }, []);
    
      const handleSubFunctionCheckboxChange = (subFunctionId) => {
        setSubFunctionCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [subFunctionId]: !prevCheckboxes[subFunctionId],
        }));
      };
    
      const handleMainFunctionCheckboxChange = (mainFunction) => {
        const mainFunctionId = mainFunction.functionId;
        const areAllSubFunctionsChecked = mainFunction.subFunctions.every(
          (subItem) => subFunctionCheckboxes[subItem.functionId]
        );
    
        // If all subfunctions are checked, uncheck them; otherwise, check them
        const updatedSubFunctionCheckboxes = {};
        mainFunction.subFunctions.forEach((subItem) => {
          updatedSubFunctionCheckboxes[subItem.functionId] =
            !areAllSubFunctionsChecked;
        });
    
        // Update the state with the new checkbox values for subfunctions
        setSubFunctionCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          ...updatedSubFunctionCheckboxes,
        }));
      };
    
    
    
     
    
    //   useEffect(() => {
    //     console.log(updateId);
    //     if (updateId);
    //   }, [updateId]);
    
      const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === 400) {
          getEmployee();
        }
      };
      useEffect(() => {
        console.log(employeeList);
        setEmployeeList((prevSwitches) =>
          prevSwitches?.map((sw) =>
            employeeId.includes(sw?.id) ? { ...sw, assign: true } : sw
          )
        );
      }, [employeeSearchData]);
    
      
    
    
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
          // updateBtn={isUpdate}
          // updateFun={() => {
          //   getIdBasedRoleRecords();
          // }}
          close={(e) => {
            handleClose();
            setIsUpdate(!isUpdate);

            if (!e) {
              console.log(isUpdate, "not e");
              // setFunctionRender(!functionRender);
              formik.setFieldValue("roleName", "");
            }
            console.log(e);
            close(e);
          }}
          header={[
            !updateId ? t("Create New Role") : t("Update Role"),
            t("Manage your companies roles here"),
          ]}
          headerRight={
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2.5">
                <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
                <RxQuestionMarkCircled
                 className="text-2xl font-medium text-gray-400 " />
              </div>
            </div>
          }
          footerBtn={[
            t("Cancel"),
            !isUpdate ? t("Save&Continue") : t("Update  Company"),
          ]}
          className="widthFull"
          stepsData={CreateRoleteps}
          buttonClick={(e) => {
            console.log(activeBtnValue);
            if (activeBtnValue === "Roles") {
            //   if (!updateId) {
            //     formik.handleSubmit();
            //   } else {
            //     UpdateRoleById();
            //   }
            setNextStep(nextStep + 1);
              console.log("click 1");
            } else if (activeBtnValue === "assign") {
              console.log("click 2");
              // setNextStep(nextStep + 1);
            //   if (!updateId) {
            //     Formik2.handleSubmit();
            //   } else {
            //     updateUserRoleById();
            //   }
            setNextStep(nextStep + 1);
            }
          }}
          buttonClickCancel={(e) => {
            if (activeBtn > 0) {
              setActiveBtn(activeBtn - 1);
              setNextStep(nextStep - 1);
              setActiveBtnValue(CreateRoleteps?.[activeBtn - 1].data);
              console.log(activeBtn - 1);
            }
            //   setBtnName("");
          }}
          nextStep={nextStep}
          activeBtn={activeBtn}
          saveAndContinue={true}
        >
          <FlexCol>
            {CreateRoleteps && (
              <Flex justify="center">
                <div className=" sticky -top-6  z-50 px-5 dark:bg-[#1f1f1f] w-2/5 pb-6 ">
                  <Stepper
                    steps={CreateRoleteps}
                    currentStepNumber={activeBtn}
                    presentage={presentage}
                  />
                </div>
              </Flex>
            )}

            {activeBtnValue === "Roles" ? (
              <>
                <Flex justify="center" align="center" className="w-full">
                  <FlexCol
                    className={
                      "flex flex-col gap-2 w-3/5 p-4 border border-gray-200 rounded-2xl dark:border-opacity-10 "
                    }
                  >
                    <Heading
                      className={""}
                      title={t("Create New Role")}
                      description={t("Create_Leave_Type_Description")}
                    />
                    <div className="flex gap-4 items-center">
                      <FormInput
                        Id={"5"}
                        title={t("Role Name")}
                        placeholder={t("Enter Role Name")}
                        change={(e) => {
                          formik.setFieldValue("roleName", e);
                        }}
                        value={formik.values.roleName}
                        error={formik.errors.roleName}
                      />
                      {/* <RadioButton options={Status}></RadioButton> */}
                    </div>
                  </FlexCol>
                </Flex>
                <Flex justify="center" align="center" className="w-full">
                  <FlexCol
                    className={
                      "flex flex-col gap-2 w-3/5 p-4 rounded-2xl dark:border-opacity-10 "
                    }
                  >
                    <div className="">
                      <Heading
                        title="Privileges"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                      />
                    </div>

                    <FlexCol>
                      {parent.map((item) => (
                        <Accordion
                          title={
                            <div className="flex items-center gap-2">
                              <div>
                                <CheckBoxInput
                                  value={item.subFunctions.some(
                                    (subItem) =>
                                      subFunctionCheckboxes[subItem.functionId]
                                  )}
                                  change={() =>
                                    handleMainFunctionCheckboxChange(item)
                                  }
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    border: `1px solid ${
                                      item.subFunctions.some(
                                        (subItem) =>
                                          subFunctionCheckboxes[
                                            subItem.functionId
                                          ]
                                      )
                                        ? "#7F56D9"
                                        : "#999"
                                    }`,
                                    borderRadius: "3px",
                                    backgroundColor: "transparent",
                                  }}
                                />
                              </div>
                              {/* Title comes here */}
                              {item.functionName}
                            </div>
                          }
                          key={item.functionId}
                        >
                          <div className="flex gap-2 items-center dark:text-white">
                            {item.subFunctions.length > 0 && (
                              <CheckBoxInput
                                titleRight="Enable All"
                                value={item.subFunctions.every(
                                  (subItem) =>
                                    subFunctionCheckboxes[subItem.functionId]
                                )}
                                change={() =>
                                  handleMainFunctionCheckboxChange(item)
                                }
                                style={{ display: "none" }}
                              />
                            )}
                          </div>
                          <div className="flex flex-wrap">
                            {item.subFunctions.map((subItem, index) => (
                              <div
                                key={subItem.functionId}
                                className="flex gap-2 items-center dark:text-white"
                                style={{
                                  width: "50%",
                                  marginBottom: index % 2 === 0 ? "10px" : 0,
                                }}
                              >
                                <CheckBoxInput
                                  titleRight={subItem.functionName}
                                  value={
                                    subFunctionCheckboxes[subItem.functionId] ||
                                    (item.functionids &&
                                      item.functionids.includes(
                                        subItem.functionId
                                      ))
                                  }
                                  change={() =>
                                    handleSubFunctionCheckboxChange(
                                      subItem.functionId
                                    )
                                  }
                                  style={{ display: "none" }}
                                />
                              </div>
                            ))}
                          </div>
                        </Accordion>
                      ))}
                    </FlexCol>
                  </FlexCol>
                </Flex>
                ;
              </>
            ) : (
              <div className="flex justify-center w-full">
                <FlexCol>
                  <Heading
                    title={t("Assign")}
                    description={t("Assign")}
                    padding={false}
                    className="Text_area col-span-2"
                  />
                  <div className="flex flex-col gap-6 p-2">
                    <div className="!rounded-2xl flex flex-col gap-6 ">
                      {navigateBtn && (
                        <div className="flex gap-2 p-[6px] bg-[#FAFAFA] dark:bg-secondaryDark border border-black border-opacity-10 rounded-xl flex-wrap">
                          {navigateBtn?.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => {
                                setAllSelect(false);
                                console.log(tab.value);
                                //  tabClick(tab.value);
                                setAssignBtnName(tab.value);
                                setActiveTab(tab.id);
                                //  setTabName(tab.value);
                              }}
                              className={`${
                                activeTab === tab.id ? "" : ""
                              } text-sm font-medium whitespace-nowrap py-3 px-[18px] relative rounded-lg group`}
                            >
                              {activeTab === tab.id && (
                                <motion.div
                                  layoutId="bubble"
                                  className="absolute inset-0 z-10 rounded-lg bg-accent"
                                  transition={{
                                    type: "spring",
                                    duration: 0.6,
                                  }}
                                ></motion.div>
                              )}
                              <span
                                className={`${
                                  activeTab === tab.id
                                    ? "relative z-20 text-white"
                                    : " text-black dark:text-white group-hover:text-primary"
                                }`}
                              >
                                {tab.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                      <SearchBox
                        placeholder="Search Employess"
                        
                      />
                  
                      <div className=" flex flex-col gap-8">
                        <div className="md:grid md:items-center flex flex-col grid-cols-12 gap-3 py-2 ">
                          <div className="flex items-center justify-between col-span-5">
                            <div className="flex items-center justify-between">
                              <CheckBoxInput
                                change={(e) => {
                                  setAllSelect(e);
                                  console.log(e);
                                }}
                                value={allSelect}
                              >
                                Select All
                              </CheckBoxInput>
                            </div>
                            <p className="mb-0 text-sm font-semibold text-accent">
                              All Employees-
                              {assignBtnName === "employees" &&
                                employeeList.length}
                            </p>
                          </div>
                          <div className="flex items-center justify-end col-span-7 ">
                            {allSelect && (
                              <div className="flex justify-end items-center text-[12px] font-medium text-accent py-2 px-3 rounded-full bg-[#F9F5FF] dark:bg-dark">
                                <p className="mb-0 ">Remove All</p>
                                <RxCross2 className=" text-[18px] font-medium pl-1 text-[#9E77ED]" />
                              </div>
                            )}
                          </div>
                        </div>

                       
                      </div>
                    </div>
                  </div>
                </FlexCol>
              </div>
            )}
          </FlexCol>
          {contextHolder}
        </DrawerPop>
      )}
    </div>
  )
}
