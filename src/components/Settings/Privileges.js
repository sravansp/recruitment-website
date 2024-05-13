import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../common/BreadCrumbs';
import Accordion from '../common/Accordion';
import ToggleBtn from '../common/ToggleBtn';
import { useTranslation } from "react-i18next";
import ButtonClick from "../common/Button";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import TabsNew from "../common/TabsNew";
import TableAnt from "../common/TableAnt";
import Createprvilege from './Createprvilege';
import { getAllRecruitmentUserRoleMappings } from '../Api1';

export default function Privileges() {
    const { t } = useTranslation();
    const breadcrumbItems = [
      { label: t("Settings"), url: "" },
      { label: t("General"), url: "" },
      { label: t("Role_and_Privileges"), url: "/" },
      // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },
    ];
   
    const [updateId, setUpdateId] = useState("");
    const [allSelect, setAllSelect] = useState(false);
    const [assignBtnName, setAssignBtnName] = useState("employees");
    const [activerole, setActiverole] = useState("Roles");
    const [actibtn, setActivbtn] = useState();
    const [requestAssets, setrequestAssets] = useState();
    const [tabValue, setTabValue] = useState("RolesHistory");
    const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
    const [show, setShow] = useState(false);
    const [customRate, setCustomRate] = useState(1);
    const [privileges, setPrivileges] = useState([]);
    const [openPop, setOpenPop] = useState("");
    const [userList, setUserList] = useState([]);
    const [roles,setRoles] = useState([])
  
    const handleClose = () => {
      setShow(false);
      setOpenPop(""); // Clear the value in setOpenPop
    };
    const handleShow = () => {
      setShow(true);
      setOpenPop("createPolicy");
    };
  
    const [navigationValue, setNavigationValue] = useState(t("User Privileges"));
  
   
  
    // const tabs = [
    //   {
    //     id: 2,
    //     title: t("Location"),
    //     value: "location",
    //   },
    //   {
    //     id: 3,
    //     title: t("Departments"),
    //     value: "departments",
    //   },
    // ];
  
    const Formik3 = useFormik({
      initialValues: {
        overtimePolicyName: "",
        // isTrackOverTime: false,
        // isRequestOverTime: false,
        maximumOverTimePerMonth: "",
        hourlyRate: "",
        // offType: "",
        halfDay: "",
        fullDay: "",
      },
  
      enableReinitialize: true,
      validateOnChange: false,
      validationSchema: yup.object({
        overtimePolicyName: yup.string().required(" "),
      }),
      onSubmit: async (e) => {},
    });
    const navigateBtn = [
      { id: 1, value: "Roles", title: t("Roles_Management") },
      { id: 2, value: "Users", title: t("Attendance_Access") },
      { id: 3, value: "access", title: t("Access_Settings") },
    ];
    const header = [
      {
        Users: [
          {
            id: 1,
            title: t("Roles"),
            value: "roleName",
            bold: true,
          },
         
          {
            id: 2,
            title: t("User Name"),
            value: "userName",
          },
          {
            id: 3,
            title: t("Status"),
            value: "isActive",
          },
          // {
          //   id: 4,
          //   title: t("Action"),
          //   value: "",
          //   action: true,
          // },
        ],
      },
    ];
    // const tabss = [
    //   {
    //     id: 1,
    //     title: "Role List",
    //     value: "RolesHistory",
    //     //   content: <CardPersonal data={employeeInfo} />,
    //   },
    //   {
    //     id: 2,
    //     title: "Users List",
    //     value: "UsersHistory",
    //     // content: <CardPersonal data={employeeInfo} />,
    //   },
    // ];
    const Rolelistheader = [
      {
        RolesHistory: [
          {
            id: 1,
            title: t("Roles"),
            value: "roleName",
            bold: true,
          },
          {
            id: 2,
            title: t("Employees"),
            value: "employeeName",
          },
          {
            id: 3,
            title: t("Status"),
            value: "isActive",
            actionToggle: true,
          },
          {
            id: 4,
            title: t("Action"),
            value: "",
            action: true,
            hideIcon: "delete",
          },
        ],
      },
    ];
    // const Userlistheader = [
    //   {
    //     UsersHistory: [
    //       {
    //         id: 1,
    //         title: t("Employees"),
    //         value: "firstName",
    //       },
    //       {
    //         id: 2,
    //         title: t("Roles"),
    //         value: "roleName",
    //       },
    //       {
    //         id: 3,
    //         title: t("Status"),
    //         value: "isActive",
    //         actionToggle: true,
    //       },
    //       {
    //         id: 4,
    //         title: t("Action"),
    //         value: "",
    //         action: true,
    //         hideIcon: "delete"
    //       },
    //     ],
    //   },
    // ];
    const [activeTab, setActiveTab] = useState(navigateBtn[0].id);
    const array = [
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
    ];
  
   
  
   
  
    // useEffect(() => {
    //   getRoleList();
    //   getUserRoleList();
    // }, []);
   const getRoles = async()=>{
    try{
     const response = await getAllRecruitmentUserRoleMappings()
    console.log(response)
    setRoles(response.result)
    }catch(error){
      console.log(error)
    }

   }

   useEffect(()=>{
    getRoles()
   },[])

  return (
    <div>
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="gap-4 ">
          <ButtonClick
            buttonName={t("Create_Role")}
            handleSubmit={() => {
              setShow(true);
              console.log(true);
            }}
            BtnType="add"
          ></ButtonClick>
        </div>
      </div>
      <TableAnt
      header={header}
      path='Users'
      data={roles}
      
      
      />
     

     

      {show && (
        <motion.div initial="hidden" animate="visible">
          <Createprvilege
            open={show}
            close={(e) => {
              setShow(e);
              setUpdateId(null);
              handleClose();
            }}
            // refresh={() => {
            //   getRoleList();
            // }}
            openPolicy={openPop}
            updateId={updateId}
          />
        </motion.div>
      )}
    </div>
     
    </div>
  )
}

