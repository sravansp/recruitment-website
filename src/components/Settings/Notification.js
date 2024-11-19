import React, { useState } from "react";
import ToggleBtn from "../common/ToggleBtn";
import { useTranslation } from "react-i18next";
import Accordion from "../common/Accordion";
import Breadcrumbs from "../common/BreadCrumbs";

export default function Notification() {

  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t("Settings"), url: "" },
    { label: t("General"), url: "" },
    { label: t("Notification"), url: "/" },
    // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },
  ];

  const [notificationData, setNotificationData] = useState([
    {
      id: 1,
      title: t("Email_notification"),
      description: t("Email_Notification_description"),
      contents: [
        {
          id: 1,
          subTitle: t("Salary_Slip"),
          subTitleDescription: t("Subtitle_Notfication"),
          value: "generalUpdates",
          isActive: false,
        },
        {
          id: 2,
          subTitle: t("Salary_Certificate"),
          subTitleDescription: t("Subtitle_Notfication"),
          value: "taskReminders",
          isActive: false,
        },
        {
          id: 3,
          subTitle: t("Gratuity_Approval"),
          subTitleDescription: t("Subtitle_Notfication"),
          value: "meetingInvitations",
          isActive: false,
        },
        {
          id: 4,
          subTitle: t("Loan_approvals"),
          subTitleDescription: t("Subtitle_Notfication"),
          value: "emailemployeeRequests",
          isActive: false,
        },
        // {
        //   id: 5,
        //   subTitle: t("System_Status_alerts"),
        //   subTitleDescription: t("System_Status_alerts_description"),
        //   value: "systemStatus",
        //   isActive: false,
        // },
      ],
    },
    // {
    //   id: 2,
    //   title: t("Push_Notification"),
    //   description: t("Push_Notification_description"),
    //   contents: [
    //     {
    //       id: 1,
    //       subTitle: t("Instant_Messages"),
    //       subTitleDescription: t("Instant_Messages_description"),
    //       value: "instantMessages",
    //       isActive: false,
    //     },
    //     {
    //       id: 2,
    //       subTitle: t("Task_Updates"),
    //       subTitleDescription: t("Task_Updates_description"),
    //       value: "taskUpdates",
    //       isActive: false,
    //     },
    //     {
    //       id: 3,
    //       subTitle: t("Meeting_Reminders"),
    //       subTitleDescription: t("Meeting_Reminders_description"),
    //       value: "meetingReminders",
    //       isActive: false,
    //     },
    //     {
    //       id: 4,
    //       subTitle: t("Employee_Requests"),
    //       subTitleDescription: t("Employee_Requests_description"),
    //       value: "pushemployeeRequests",
    //       isActive: false,
    //     },
    //     {
    //       id: 5,
    //       subTitle: t("Attendance_Updates"),
    //       subTitleDescription: t("Attendance_Updates_description"),
    //       value: "attendanceUpdates",
    //       isActive: false,
    //     },
    //   ],
    // },
  ]);

  // const setNotificationsToDB = async (subTitle, value) => {
  //   try {
  //     const result = await axios.post(API.HOST + API.NOTIFICATION_SETTINGS, {
  //       employeeId: loginData.userData.id,
  //       [subTitle]: value,
  //       // generalUpdates: "Testing2",
  //       // taskReminders: "trrr",
  //       // meetingInvitations: "gff",
  //       // emailemployeeRequests: "ffff",
  //       // systemStatus: "reee",
  //       // instantMessages: "dffddf",
  //       // taskUpdates: "fddd",
  //       // meetingReminders: "test21",
  //       // pushemployeeRequests: "test22",
  //       // attendanceUpdates: "test33",

  //       isActive: "1",
  //       createdBy: "as"
  //     });
  //   } catch (error) {
  //   }
  // }

  // const formik = useFormik({
  //   initialValues: {
  //     generalUpdates: "",
  //     taskReminders: "",
  //     meetingInvitations: "",
  //     emailemployeeRequests: "",
  //     systemStatus: "",
  //     taskUpdates: "",
  //     meetingReminders: "",
  //     instantMessages: "",
  //     pushemployeeRequests: "",
  //     attendanceUpdates: "",
  //   },
  //   enableReinitialize: true,
  //   validateOnChange: false,
  //   validationSchema: yup.object().shape({
  //     // firstName: yup.string().required("First Name is Required"),
  //     // lastName: yup.string().required("Last Name is Required"),
  //     // email: yup.string().required("Email is Required"),
  //     // mobile: yup.string().min(10).max(10).required("Mobile is Required"),
  //     // // gender: yup.string().required("Gender is Required"),
  //     // // dateOfBirth: yup.string().required("Date of Birth Group is Required"),
  //   }),
  //   onSubmit: async (e) => {
  //     try {
  //       const result = await axios.post(API.HOST + API.NOTIFICATION_SETTINGS, {
  //         employeeId: loginData.userData.id,
  //         generalUpdates: e.generalUpdates,
  //         taskReminders: e.taskReminders,
  //         meetingInvitations: e.meetingInvitations,
  //         emailemployeeRequests: e.emailemployeeRequests,
  //         systemStatus: e.systemStatus,
  //         taskUpdates: e.taskUpdates,
  //         meetingReminders: e.meetingReminders,
  //         instantMessages: e.instantMessages,
  //         pushemployeeRequests: e.pushemployeeRequests,
  //         attendanceUpdates: e.attendanceUpdates,
  //       });
  //     } catch (error) {}
  //   },
  // });
  // const handleToggleList = (id, checked) => {
  //   setNotificationData(
  //     (prevSwitches) =>
  //       prevSwitches?.map((sw, i) =>
  //         sw?.id === id ? { ...sw, isActive: checked === true ? 1 : 0 } : sw
  //       )
  //     // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
  //   );
  // };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Breadcrumbs
          items={breadcrumbItems}
          description={t("notification_dsc")}
        />
      </div>
      {/* <div>
        <h1 className="h1">{t("Notification_settings")}</h1>
        <p className="para">{t("Notification_settings_description")} </p>
      </div>
           */}
      <div className="relative flex flex-col gap-6">
        {/*  Accordian item 1 */}
        {notificationData.map((item) => (
          <Accordion
            title={item.title}
            description={item.description}
            initialExpanded={true}
          >
            {" "}
            <div key={item.id}>
              <div className="flex flex-col gap-8 overflow-hidden">
                {item.contents.map((subitems) => (
                  <div
                    key={subitems.id}
                    className="flex flex-row-reverse justify-between md:flex-row "
                  >
                    <div>
                      <p class="acco-subhead">{subitems.subTitle}</p>
                      <p class="para">{subitems.subTitleDescription}</p>
                    </div>
                    <div className="pr-3 form-select md:w-80">
                      {/* <Switch
                        defaultChecked
                        className="md:float-right rtl:md:float-left"
                        size={isSmallScreen ? "small" : ""}
                      /> */}
                      <ToggleBtn
                        className="md:float-right rtl:md:float-left"
                        value={subitems.isActive}
                        change={
                          (e) => {
                            // handleToggleList(subitems.id, e);
                            // formik.setFieldValue(subitems.value, e);
                            // formik.handleSubmit();
                          }
                          // saved_theme(subitems.value, e);
                          // setNotificationsToDB(subitems.subTitle, checked)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
