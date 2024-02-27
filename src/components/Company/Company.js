import { title } from 'process'
import Tabs from '../common/Tabs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TabsNew from '../common/TabsNew'
import ButtonClick from '../common/Button'
import { useSelector } from 'react-redux'
import Departments from './Add _departments'


const Company = () => {
    const { t } = useTranslation();
    const navigationPath = useSelector((state) => state.navigation.navigationPath);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
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

          
            
    </div>
  )
}

export default Company