import Tabs from "../common/Tabs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Departments from "./Add _departments";
import Location from "./Addlocation";
import API from "../Api";
import axios from "axios";

const Company = () => {
  const { t } = useTranslation();

  const [navigationPath, setNavigationPath] = useState("Departments");

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const tabs = [
    {
      id: 1,
      title: t("Departments"),
      value: "Departments",
    },
    {
      id: 2,
      title: t("Locations"),
      value: "Locations",
    },
  ];

  const header = [
    {
      Departments: [
        {
          id: 1,
          title: t("Name"),
          value: "department",
          bold: true,
        },
        {
          id: 2,
          title: t("Description"),
          value: "description",
        },
      ],
      Locations: [
        {
          id: 1,
          title: t("Name"),
          value: "location",
          bold: true,
        },
        {
          id: 2,
          title: "Description",
          value: "description",
        },
        //  {
        //   id:3,
        //   title:"status",
        //   value:"status",
        //   actionToggle:true,
        //  },
        //  {
        //   id:4,
        //   title:"actions",
        //   value:"actions",
        //   action:true,
        //  },
      ],
    },
  ];

  const drawerheader = [
    {
      Departments: [
        {
          id: 1,
          title: "Name",
          value: "department",
        },
        {
          id: 2,
          title: "Created By",
          value: "createdBy",
        },
      ],
      Locations: [
        {
          id: 1,
          title: "Name",
          value: "location",
        },
        {
          id: 2,
          title: "Created By",
          value: "createdBy",
        },
        //  {
        //   id:3,
        //   title:"status",
        //   value:"status",
        //   actionToggle:true,
        //  },
        //  {
        //   id:4,
        //   title:"actions",
        //   value:"actions",
        //   action:true,
        //  },
      ],
    },
  ];
  const [locationList, setLocationList] = useState();

  const [departmentList, setDepartmentList] = useState();

  const actionData = [
    {
      Locations: { id: 1, data: locationList },
      Departments: { id: 2, data: departmentList },
    },
  ];
  const companyId = localStorage.getItem("companyId");

  const getLocationList = async () => {
    const result = await axios.post(
      API.HOST + API.GET_LOCATION + "/" + companyId
    );
    setLocationList(result.data.tbl_location);
  };

  const getDepartmentList = async () => {
    const result = await axios.post(
      API.HOST + API.GET_DEPARTMENT + "/" + companyId
    );
    setDepartmentList(result.data.tbl_department);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-6 lg:items-center lg:flex-row">
        <div className="flex flex-col">
          <p className="font-bold text-lg"> {t("Company")}</p>
          <p className="para font-medium">{t("Main_Description")}</p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* <ButtonClick
            handleSubmit={
              () => {
                handleShow();
                // if (e === navigationPath) {
                // setShow(true);

                // setCompanyId(company);
                setOpenPop(navigationPath);
                // setUpdateId(false);
                // } else {
                // setOpenPop(navigationPath);

                setShow(true);
                // if (company === "edit") {
                // setUpdateId(e);
                // }
              }
              // buttonClick(btnName, companyData.companyId);
            }
            // updateFun=""
            // updateBtn={true} // Set to true if it's an update button
            buttonName={`Create ${navigationPath.replace(/_/g, ' ')}`}// Set the button name
            className="your-custom-styles" // Add any additional class names for styling
            BtnType="Add" // Specify the button type (Add or Update)
          /> */}
        </div>
      </div>
      <Tabs
        tabs={tabs}
        header={header}
        drawerH={drawerheader}
        All={true}
        clickDrawer={(e) => {
          handleShow();
          // setShow(e);
        }}
        // data={tabsData}
        tabClick={(e) => {
          setNavigationPath(e);
        }}
        data={
          Object.keys(actionData[0]).includes(navigationPath)
            ? actionData[0]?.[navigationPath].data
            : null
        }
      />
      {navigationPath === "Departments" && show && (
        <Departments
          open={show}
          close={(e) => {
            setShow(e);
          }}
          //   updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
        />
      )}
      {navigationPath === "Locations" && show && (
        <Location
          open={show}
          close={(e) => {
            setShow(e);
          }}
          //   updateId={updateId}
          //   companyDataId={companyId}
          refresh={() => {
            // getLocationList();
          }}
        />
      )}
    </div>
  );
};

export default Company;
