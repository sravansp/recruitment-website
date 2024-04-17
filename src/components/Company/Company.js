import { title } from 'process'
import Tabs from '../common/Tabs'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TabsNew from '../common/TabsNew'
import ButtonClick from '../common/Button'
import { useSelector, useDispatch } from 'react-redux'
import Departments from './Add _departments'
import Location from './Addlocation'
import API from '../Api'
import axios from 'axios'
import { setNavigationPath } from '../../Redux/action'
import ToggleBtn from '../common/ToggleBtn'
import Breadcrumbs from '../common/BreadCrumbs'


const Company = () => {
  const { t } = useTranslation();
  const [navigationPath, setNavigationPath] = useState("Departments");
  const companySliceId = useSelector((state) => state.layout.companyId);
  const [show, setShow] = useState(false);
  const [openPop, setOpenPop] = useState("");
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [statusToggle, setStatusToggle] = useState(true);
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


  ]
  const header = [
    {
      Departments: [
        {
          id: 1,
          title: "Name",
          value: "department",
        },
        {
          id: 2,
          title: "Description",
          value: "description",
        },
         {
          id:3,
          title:"status",
          value:"status",
          actionToggle:true,
         },
         {
          id:4,
          title:"actions",
          value:"actions",
          action:true,
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
          title: "Description",
          value: "description",
        },
         {
          id:3,
          title:"status",
          value:"status",
          actionToggle:true,
         },
         {
          id:4,
          title:"actions",
          value:"actions",
          action:true,
         },
      ]


    }

  ]






  const drawerheadre = [
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

      ]


    }

  ]
  const [locationList, setLocationList] = useState();
  const [departmentList, setDepartmentList] = useState();
  const actionData = [
    {

      Locations: { id: 1, data: locationList },
      Departments: { id: 2, data: departmentList },


    },
  ];
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [tabsData, setTabsData] = useState([]);


  const getLocationList = async () => {
    console.log(companyId);
    console.log(API.HOST + API.GET_LOCATION + "/" + companyId);
    console.log("navigationPath", navigationPath);
    const result = await axios.post(
      API.HOST + API.GET_LOCATION + "/" + companyId
    );
    setLocationList(result.data.tbl_location);
    console.log(result);
  };

  const getDepartmentList = async () => {
    console.log(API.HOST + API.GET_DEPARTMENT + "/" + companyId);
    const result = await axios.post(
      API.HOST + API.GET_DEPARTMENT + "/" + companyId
    );
    setDepartmentList(result.data.tbl_department);
    console.log(result);
  };
  const breadcrumbItems = [
    { label: t("Company"), url: "/" },
    { label: t("Other"), url: "" },
    { label: t("Company"), url: "" },
    { label: navigationPath, url: "" }
    // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },
  ];
  React.useEffect(() => {
    // Provide a default value if needed


    let newData = [];

    switch (navigationPath) {
      case "Locations":
        getLocationList();


        break;
      case "Departments":
        getDepartmentList();

        console.log(newData)
        break;
      // Add more cases as needed
      default:
        break;
    }

    console.log(companySliceId, navigationPath, "refresh");

    // Update the state variable or Redux store with the new data


  }, [navigationPath]);


  return (

    <div className='flex flex-col gap-6'>
      <div className="flex flex-col justify-between gap-6 lg:items-center lg:flex-row">
        <div className='flex flex-col'>
          <p className='font-bold text-lg'> Company</p>
          <p className='para font-medium'>{t("Main_Description")}</p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row">
          <ButtonClick
            handleSubmit={
              () => {
                // console.log("show");
                handleShow();
                // if (e === navigationPath) {
                // setShow(true);

                // setCompanyId(company);
                setOpenPop(navigationPath);
                // setUpdateId(false);
                // } else {
                // setOpenPop(navigationPath);

                setShow(true);
                // console.log(company, "companyparentId");
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
          />
        </div>
      </div>
      <Tabs
        tabs={tabs}
        header={header}
        drawerH={drawerheadre}
        All={true}
        clickDrawer={(e) => {
          handleShow();
          // console.log(e);
          // setShow(e);
        }}
        // data={tabsData}
        tabClick={(e) => {
          console.log(e, "e");
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
  )
}

export default Company