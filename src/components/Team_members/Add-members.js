/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import DrawerPop from "../common/DrawerPop";
import { useTranslation } from "react-i18next";
import FlexCol from "../common/FlexCol";
import { notification } from "antd";
import * as yup from "yup";
import Dropdown from "../common/Dropdown";
import { useFormik } from "formik";
import {
  updateRecruitmentUserRoleMapping,
  getRecruitmentUserById,
  addRecruitmentUserWithRoleMapping,
  getAllEmployee,
  getAllRecruitmentRoles,
} from "../Api1";

const Addmembers = ({
  open,
  close = () => {},
  updateId,
  refresh = () => {},
  companyDataId = "",
}) => {
  const [employeeList, setEmployeeList] = useState([]);

  const [show, setShow] = useState(open);

  const { t } = useTranslation();

  const [isUpdate, setIsUpdate] = useState();

  const [api, contextHolder] = notification.useNotification();

  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  const [role, setRole] = useState([]);

  const [EmployeeName, setEmployeeName] = useState("");

  const [EmployeeEmail, setEmployeeEmail] = useState("");

  const [employeeId, setEemployeeId] = useState("");

  const [userById, setUserById] = useState();

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  const handleClose = () => {
    close(false);
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

  useEffect(() => {
    const loginDataString = localStorage.getItem("LoginData");
    let employeeId = null;
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      employeeId = loginData.userData.employeeId;
      setEemployeeId(employeeId);
    }
  }, []);

  const getUserByid = async () => {
    try {
      const response = await getRecruitmentUserById({ id: updateId });
      setUserById(response?.result[0]);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (updateId) {
      getUserByid();
    }
  }, []);

  const getTeamMembers = async () => {
    try {
      const response = await getAllEmployee({ companyId: companyId });
      const formattedEmployeeList = response.result.map((employee) => ({
        label: employee.fullName,
        value: employee.employeeId,
        email: employee.email,
      }));
      setEmployeeList(formattedEmployeeList);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  const getRoles = async () => {
    try {
      const response = await getAllRecruitmentRoles();
      setRole(
        response.result.map((each) => ({
          label: each.roleName,
          value: each.roleId,
        }))
      );
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userById?.userRoleMapId || "",
      userName: "",
      userEmail: "",
      employeeId: userById?.employeeId || null,
      userId: userById?.userId || null,
      userImage: null,
      roleId: parseInt(userById?.roleId) || null,
      createdBy: null,
    },
    validationSchema: yup.object().shape({
      employeeId: yup.string().required("Name is required"),
      roleId: yup.string().required("Role is required"),
    }),
    onSubmit: async (e) => {
      try {
        if (!updateId) {
          const response = await addRecruitmentUserWithRoleMapping({
            userName: EmployeeName,
            userEmail: EmployeeEmail,
            employeeId: e.employeeId,
            userImage: null,
            roleId: e.roleId,
            createdBy: null,
            companyId: localStorage.getItem("companyId"),
          });
          if (response.status === 200) {
            openNotification("success", "Successful", response.message);
            formik.resetForm();
            setTimeout(() => {
              handleClose();
              refresh();
            }, 2000);
          } else if (response.status === 500) {
            openNotification("error", "Info", "This member already added.");
          }
        } else {
          const response = await updateRecruitmentUserRoleMapping({
            id: e.id,
            userId: e.userId,
            roleId: e.roleId,
            modifiedBy: localStorage.getItem("employeeId"),
          });
          if (response.status === 200) {
            openNotification("success", "Successful", response.message);
            formik.resetForm();
            setTimeout(() => {
              handleClose();
            }, 2000);
          } else if (response.status === 500) {
            openNotification("error", "Info", "This member already added.");
          }
        }
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <DrawerPop
      open={show}
      close={(e) => {
        close(e);
        handleClose();
      }}
      contentWrapperStyle={{
        width: "590px",
      }}
      handleSubmit={(e) => {
        formik.handleSubmit();
      }}
      updateBtn={isUpdate}
      updateFun={() => {
        //   updateIdBasedLocation();
      }}
      header={[
        !updateId ? t("Add Team Members") : t("Update Team Members"),
        !updateId ? t("Add Team Members") : t("Update Team Members"),
      ]}
      footerBtn={[t("Cancel"), t("Save")]}
    >
      <FlexCol className="relative w-full h-full ">
        <Dropdown
          title={t("Name")}
          placeholder={t("Choose Name")}
          value={formik.values.employeeId}
          error={formik.values.employeeId ? "" : formik.errors.employeeId}
          required={true}
          options={employeeList}
          change={(e) => {
            const selectedEmployee = employeeList.find(
              (employee) => employee.value === e
            );
            if (selectedEmployee) {
              // Set the values to the other Formik form
              setEmployeeName(selectedEmployee.label);
              setEmployeeEmail(selectedEmployee.email);
            }
            // Set the value for the current Formik form
            formik.setFieldValue("employeeId", e);
          }}
        />

        <Dropdown
          title={t("Role")}
          placeholder={t("Choose Role")}
          options={role}
          required={true}
          className=""
          change={(e) => {
            formik.setFieldValue("roleId", e);
          }}
          value={formik.values.roleId}
          error={formik.values.roleId ? "" : formik.errors.roleId}
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
  );
};

export default Addmembers;
