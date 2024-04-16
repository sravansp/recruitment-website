import { useState } from 'react';
import React from 'react'
import DrawerPop from '../common/DrawerPop'
import { useTranslation } from 'react-i18next';

const Departments = ({ open,
  close = () => { },
  updateId,
  refresh = () => { },
  companyDataId = "",
}) => {

  const [isUpdate, setIsUpdate] = useState();
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
        !isUpdate ? t("Add_New_Department") : t("Update_Department"),
        !isUpdate
          ? t("Add_New_Department")
          : t("Update_Selected_Department"),
      ]}
      footerBtn={[
        t("Cancel"),
        t("Save"),
      ]}


    >

    </DrawerPop>
  )
}

export default Departments