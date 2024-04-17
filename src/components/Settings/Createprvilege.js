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
import { saveRecruitmentRole,getAllRecruitmentFunctions } from '../Api1';



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
    const [userid, setuserid] = useState("");
     

    useEffect(() => {
      // Retrieve the login data JSON string from local storage
      const loginDataString = localStorage.getItem("LoginData");
  
      if (loginDataString) {
        // Parse the JSON string to get the LoginData object
        const loginData = JSON.parse(loginDataString);
  
        // Extract the username from the userData object
        setuserid(
          loginData && loginData.userData && loginData.userData.employeeId
        );
  
        // Now, 'username' variable contains the username
      } else {
        console.error("Login data not found in local storage.");
      }
    }, []);

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
          
          createdBy: "",
        },
        // enableReinitialize: true,
        // validateOnChange: false,
        // validationSchema: yup.object().shape({
        //   roleName: yup.string().required("Role Name is Required"),
        // }),
        onSubmit: async (e) => {
          try{
            const response = await saveRecruitmentRole(
              {
              roleName:e.roleName,
              createdBy:userid
              }

         

            )
            console.log(response)
          
            }catch(error){
            console.log(error)
          }
        }
      });
    
      const getRoles = async()=>{
        try{
        const response = await getAllRecruitmentFunctions({})
        console.log(response)

        setParent(response.result)
        }catch(error){
          console.log(error)
        }
      
      }
      useEffect(()=>{
        getRoles()
      },[])
    
     
    
    
    
 
    
     
    
      
    
     

    
      
    
    
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
            !isUpdate ? t("Save and continue") : t("Update Roles "),
          ]}
         className="widthFull"
        saveAndContinue={true}
        initialBtn={true}
         buttonClick={formik.handleSubmit}
         
        
          
         
         
        >
          <FlexCol>
            
              <Flex justify="center">
                <div className=" sticky -top-6  z-50 px-5 dark:bg-[#1f1f1f] w-2/5 pb-6 ">
                
                </div>
              </Flex>
            

            
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
                                  // change={() =>
                                  //   handleMainFunctionCheckboxChange(item)
                                  // }
                                  
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
                          // key={item.functionId}
                        >
                          <div className="flex gap-2 items-center dark:text-white">
                            {item.subFunctions.length > 0 && (
                              <CheckBoxInput
                                titleRight="Enable All"
                                value={item.subFunctions.every(
                                  (subItem) =>
                                    subFunctionCheckboxes[subItem.functionId]
                                )}
                                // change={() =>
                                //   handleMainFunctionCheckboxChange(item)
                                // }
                                style={{ display: "none" }}
                              />
                              
                             )} 
                          </div>
                          <div className="flex flex-wrap">
                            {item.subFunctions.map((subItem, index) => ([
                              
                              <div
                                key={subItem.functionId}
                                className="flex gap-2 items-center dark:text-white"
                                style={{
                                  width: "50%",
                                  marginBottom: index % 2 === 0 ? "10px" : 0,
                                }}
                              >
                                 {console.log(subItem.functionName)}
                                <CheckBoxInput
                                  titleRight= {subItem.functionName}
                                  // value={
                                  //   subFunctionCheckboxes[subItem.functionId] ||
                                  //   (item.functionids &&
                                  //     item.functionids.includes(
                                  //       subItem.functionId
                                  //     ))
                                  // }
                                  // change={() =>
                                  //   handleSubFunctionCheckboxChange(
                                  //     subItem.functionId
                                  //   )
                                  // }
                                  // style={{ display: "none" }}
                                  
                                />
                               
                              </div>
]))}
                          </div>
                        </Accordion>
                      ))}
                    </FlexCol>
                  </FlexCol>
                </Flex>
                ;
              </>
           
         
            
          </FlexCol>
          {contextHolder}
        </DrawerPop>
      )}
    </div>
  )
}
