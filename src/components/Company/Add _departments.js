import { useState } from 'react';
import React from 'react'
import { notification } from 'antd';
import DrawerPop from '../common/DrawerPop'
import { useTranslation } from 'react-i18next';
import FormInput from '../common/FormInput';
import TextArea from '../common/TextArea';
import FlexCol from '../common/FlexCol';

const Departments = ({ open,
  close = () => { },
  updateId,
  refresh = () => { },
  companyDataId = "",
}) => {

  const [isUpdate, setIsUpdate] = useState();
  const [show, setShow] = useState(open);
  const { t } = useTranslation();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description, callback) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      onClose: callback,

      // stack: 2,
      style: {
        background: `${type === "success"
          ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
          : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
          }`,
        boxShadow: `${type === "success"
          ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
          : "0px 22px 60px rgba(134, 92, 144, 0.20)"
          }`,
      },
      // duration: null,
    });
  };

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
      <FlexCol className="relative w-full h-full ">
        <FormInput
          title={t("Department")}
          placeholder={t("Department")}
          //   value={formik.values.location}
          change={(e) => {
            // formik.setFieldValue("location", e);
          }}
        //   error={formik.errors.location}
        />

        <TextArea
          title={t("Description")}
          placeholder={t("Enter_Description")}
          className=""
          change={(e) => {
            // formik.setFieldValue("description", e);
          }}
        //   value={formik.values.description}
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
    </DrawerPop>
  )
}

export default Departments