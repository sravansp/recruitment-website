import { useEffect, useState } from 'react';
import React from 'react'
import DrawerPop from '../common/DrawerPop'
import { useTranslation } from 'react-i18next';
import FormInput from '../common/FormInput';
import TextArea from '../common/TextArea';
import FlexCol from '../common/FlexCol';
import { notification } from 'antd';
import Dropdown from '../common/Dropdown';
import {updateRecruitmentUserRoleMapping,getRecruitmentUserById, addRecruitmentUserWithRoleMapping,getAllEmployee,getAllRecruitmentRoles } from '../Api1';
import { Value } from 'devextreme-react/range-selector';
import { Formik, useFormik } from 'formik';

const Addmembers = ({
    open,
    close = () => {},
    updateId,
    refresh = () => {},
    companyDataId = "",} ) => {
 
        const[employeeList,setEmployeeList] = useState([])
        const [jobRole,setJobRole]=useState([])
        const [show, setShow] = useState(open);
        const { t } = useTranslation();
        const [isUpdate, setIsUpdate] = useState();
        const [api, contextHolder] = notification.useNotification();
        const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
        const[role,setRole]=useState([])
        const[EmployeeName,setEmployeeName] = useState("")
        const[EmployeeEmail,setEmployeeEmail] =useState("")
        const[roleMapping,setRoleMapping] =useState("")
        const[userId,setUserId] = useState("")
        const[employeeId,setEemployeeId]=useState("")
        console.log(updateId);
        useEffect(() => {
          setCompanyId(localStorage.getItem("companyId"));
          
        }, []);
        const handleClose = () => {
     
          close(false)
     
           
           };
        const openNotification = (type, message, description, callback) => {
          api[type]({
            message: message,
            description: description,
            placement: "top",
            onClose: callback,
      
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
       useEffect(()=>{
        const loginDataString = localStorage.getItem('LoginData');

let employeeId = null;

if (loginDataString) {
  const loginData = JSON.parse(loginDataString);
  employeeId = loginData.userData.employeeId;
  setEemployeeId(employeeId)
} else {
  console.error('Login data not found in local storage');
}

console.log(employeeId);
       },[])
        
       
       const getUserByid= async()=>{
          try{
           const response = await getRecruitmentUserById({id:updateId})
          console.log(response)
          formik.setFieldValue("employeeId", response.result[0].employeeId);
          formik.setFieldValue("roleId", parseInt(response.result[0].roleId));         
          setRoleMapping(response.result[0].userRoleMapId)  
          setUserId(response.result[0].userId)
        }catch(error){
            console.log(error)
          }
          
        }
        useEffect(()=>{
          getUserByid()
        },[])
       const getTeamMembers = async ()=>{
        try {
          const response = await getAllEmployee({companyId:companyId})
          console.log(response)
          const formattedEmployeeList = response.result.map((employee) => ({
            label: `${employee.firstName} ${employee.middleName ? employee.middleName + ' ' : ''}${employee.lastName}`,
            value: employee.employeeId,
            email: employee.email,

          }));
          setEmployeeList(formattedEmployeeList);
          // setEmployeeName()
        }catch(error){
          console.log(error)
        }
       }
       useEffect(()=>{
        getTeamMembers()
       },[])
       const getRoles= async ()=>{
        try {
          const response = await getAllRecruitmentRoles()
          console.log(response)
          setRole(response.result.map((each)=>({
            label:each.roleName,
            value:each.roleId
          }))
          )
         
        }catch(error){
          console.log(error)
        }
       }
      useEffect(()=>{
        getRoles()
      },[])
const formik = useFormik({
        initialValues:{
          userName: "", 
        userEmail: "", 
        employeeId: "", 
        userImage: null, 

        roleId:"",
        createdBy: null
        },
        onSubmit : async(e)=>{
          try{
           if(!updateId){
            const response = await addRecruitmentUserWithRoleMapping({
              userName: EmployeeName, 
              userEmail: EmployeeEmail, 
              employeeId: e.employeeId, 
              userImage: null, 
      
              roleId:e.roleId,
              createdBy: null      
  
             })
             console.log(response)
             if (response.status === 200) {
              openNotification(
                "success",
                "Successful",
                response.message
              );
              formik.resetForm()
              setTimeout(() => {
                handleClose();
                refresh()
              }, 2000)
  
            } else if (response.status === 500) {
              openNotification("error", "input field is empty..", response.message);
            }
           }else{
            const response = await updateRecruitmentUserRoleMapping({
              id:roleMapping,
              userId:userId,
              roleId:e.roleId,
              modifiedBy:employeeId

            })
            console.log(response)
            if (response.status === 200) {
              openNotification(
                "success",
                "Successful",
                response.message
              );
              formik.resetForm()
              setTimeout(() => {
                handleClose();
              }, 2000)
  
            } else if (response.status === 500) {
              openNotification("error", "input field is empty..", response.message);
            }

           }
           

          }catch(error){
            console.log(error)
          }
        }
      })

     
    
      
  return (
    <DrawerPop
    open={show}
    close={(e) => {
      // console.log(e);
      close(e);
      handleClose();

    }}
    contentWrapperStyle={{
      maxWidth: "540px",
    }}
    handleSubmit={(e) => {
      // console.log(e);
      formik.handleSubmit();
    }}
    updateBtn={isUpdate}
    updateFun={() => {
    //   updateIdBasedLocation();
    }}
    header={[
      !updateId ? t("Add Team Members") : t("Update Team Members"),
      !updateId
        ? t("lorem ipusm")
        : t("Update_Team Members"),
    
    ]}
    footerBtn={[
      t("Cancel"),
      t("Save"),
    ]}
    
    
    >  
          <FlexCol className="relative w-full h-full ">
          <Dropdown
  title={t("Name")}
  placeholder={t("Location")}
  value={formik.values.employeeId}
  options={employeeList}
  change={(e) => {
   
    const selectedEmployee = employeeList.find(employee => employee.value === e);
    console.log(selectedEmployee)
    if (selectedEmployee) {
      // Set the values to the other Formik form
     setEmployeeName(selectedEmployee.label)
     setEmployeeEmail(selectedEmployee.email)
    }
    // Set the value for the current Formik form
    formik.setFieldValue("employeeId", e);
  }}
/>

        <Dropdown
          title={t("Role")}
          placeholder={t("Marketing Manager")}
          options={role}
          
          className=""
          change={(e) => {
            formik.setFieldValue("roleId", e);
          }}
          value={formik.values.roleId}
        //   error={formik.errors.description}
        />
        {/* <ToggleBtn
          title="Status"
          titleRight="In Active"
          change={(e) => {
            formik.setFieldValue("isActive", e);
          }}
          value={formik.values.isActive}
        /> */}
        {contextHolder}
      </FlexCol>
      {contextHolder}
    </DrawerPop>
    
  )
}

export default Addmembers