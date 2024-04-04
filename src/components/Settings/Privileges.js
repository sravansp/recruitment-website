import React, { useState } from 'react'
import Breadcrumbs from '../common/BreadCrumbs';
import { useTranslation } from 'react-i18next';
import Accordion from '../common/Accordion';
import ToggleBtn from '../common/ToggleBtn';

export default function Privileges() {
    const { t } = useTranslation();
    const breadcrumbItems = [
      { label: t("Settings"), url: "" },
      { label: t("General"), url: "" },
      { label: t("Role and Privileges"), url: "/" },
      // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },
    ];


    const [notificationData, setNotificationData] = useState([
        {
          id: 1,
          title: t("Email_Notification"),
          description: t("Email_Notification_description"),
          contents: [
            {
              id: 1,
              subTitle: t("Salary Slip"),
              subTitleDescription: t("This will show Arabic in table fields when creating and editing items."),
              value: "generalUpdates",
              isActive: false,
            },
            {
              id: 2,
              subTitle: t("Salary Certificate"),
              subTitleDescription: t("This will show Arabic in table fields when creating and editing items.n"),
              value: "taskReminders",
              isActive: false,
            },
            {
              id: 3,
              subTitle: t("Gratuity Approval"),
              subTitleDescription: t("This will show Arabic in table fields when creating and editing items."),
              value: "meetingInvitations",
              isActive: false,
            },
            {
              id: 4,
              subTitle: t("Loan approvals"),
              subTitleDescription: t("This will show Arabic in table fields when creating and editing items."),
              value: "emailemployeeRequests",
              isActive: false,
            },
           
          ],
        },
        
      ]);
  return (
    <div>
    <div>
        <Breadcrumbs items={breadcrumbItems} />
        <p className="para">{t("Lorem ipsum dolart sit dummy text.")}</p>
   </div>
   <div className="relative flex flex-col gap-6">
        {/*  Accordian item 1 */}
        {notificationData.map((item) => (

          <Accordion
            title={item.title}
            description={item.description}
            initialExpanded={true}
          > <div
            key={item.id}

          >
              <h2>




              </h2>

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
  )
}

