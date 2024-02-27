import { title } from 'process'
import Tabs from '../common/Tabs'
import React, { useState,useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TabsNew from '../common/TabsNew'
import ButtonClick from '../common/Button'
import { useSelector,useDispatch } from 'react-redux'
import Departments from './Add _departments'
import Location from './Addlocation'
import API from '../Api'
import axios from 'axios'
import { setNavigationPath } from '../../Redux/action'


const Company = () => {
    const { t } = useTranslation();
    const navigationPath = useSelector((state) => state.navigation.navigationPath);
    const companySliceId = useSelector((state) => state.layout.companyId);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
  const tabs= [
    {
        id:1,
        title: t("Departments"),
        value: "Departments",
      },
      {
        id:2,
        title: t("Locations"),
        value: "Locations",
      },
   

  ]
  const header = [
    {    
        Departments:[
        {
         id:1,
         title:"Name",
         value:"Name",
        },
        {
            id:2,
            title:"Description",
            value:"Description",
           },
           {
            id:3,
            title:"status",
            value:"status",
           },
           {
            id:4,
            title:"actions",
            value:"actions",
           },

    ],
    Locations:[
        {
         id:1,
         title:"Name",
         value:"Name",
        },
        {
            id:2,
            title:"Description",
            value:"Description",
           },
           {
            id:3,
            title:"status",
            value:"status",
           },
           {
            id:4,
            title:"actions",
            value:"actions",
           },

    ]


}

  ]
  const [locationList, setLocationList] = useState();
  const [departmentList, setDepartmentList] = useState();
  const actionData = [
    {
    //   company: { id: 1, data: companyList },
    Locations: { id: 1, data: locationList },
      Departments: { id: 2, data: departmentList },
    //   category: { id: 4, data: categoryList },
    //   subcategory: { id: 5, data: subCategoryList },
    },
  ];
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  
  
  const getLocationList = async () => {
    console.log(companyId);
    console.log(API.HOST + API.GET_LOCATION + "/" + companyId);
    console.log("navigationPath");
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
 
  React.useEffect(() => {
    // Provide a default value if needed
    setCompanyId(companySliceId || localStorage.getItem("companyId"));
    


    switch (navigationPath) {
      case "Locations":
        getLocationList();
        break;
      case "Departments":
        getDepartmentList();
        break;
      // Add more cases as needed
      default:
        break;
    }

    console.log(companySliceId, navigationPath, "refresh");
  }, [companySliceId, dispatch, navigationPath]);

  const tabClickHandler = (e) => {
    console.log(e, "e");
    // You can access navigationPath here and use it as needed
    console.log("Navigation Path:", navigationPath);
  };
    return (
    <div>
        <Tabs
       tabs={tabs}
       header={header}
       showButton={true}
       clickDrawer={(e) => {
        handleShow();
        // console.log(e);
        // setShow(e);
      }}
      tabClick={tabClickHandler}
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