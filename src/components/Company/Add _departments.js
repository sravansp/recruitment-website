import { useState } from 'react';
import React from 'react'
import DrawerPop from '../common/DrawerPop'
import { useTranslation } from 'react-i18next';

const Departments = ({open,
    close = () => {},
    updateId,
    refresh = () => {},
    companyDataId = "",} ) => {



        const [show, setShow] = useState(open);
        const { t } = useTranslation();
  return (
    <DrawerPop
    open={show}
    close={(e) => {
      // console.log(e);
      close(e);
    }}
    contentWrapperStyle={{
      maxWidth: "540px",
    }}
    handleSubmit={(e) => {
      // console.log(e);
    //   formik.handleSubmit();
    }}
    // updateBtn={isUpdate}
    updateFun={() => {
    //   updateIdBasedLocation();
    }}
    header={[
    //   !isUpdate ? t("Add_a_New_Location") : t("Update_Location"),
    //   !isUpdate
    //     ? t("Add_a_New_Location_Description")
    //     : t("Update_Selected_Location"),
    ]}
    footerBtn={[
    //   t("Cancel"),
    //   !isUpdate ? t("Add_Location") : t("Update_Location"),
    ]}
    
    
    >  
        
    </DrawerPop>
  )
}

export default Departments