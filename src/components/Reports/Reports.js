import { Flex, notification, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FlexCol from "../common/FlexCol";
import SearchBox from "../common/SearchBox";
import Accordion from "../common/Accordion";
import Heading from "../common/Heading";
import Doc from "../../assets/images/uploader/doc.png";
import Pdf from "../../assets/images/uploader/pdf.png";

export default function Reports() {
  const { t } = useTranslation();
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
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

  const reportsAccordion = [
    {
      id: 1,
      title: t("Payroll Reports"),
      description: "Payroll reports",
      document: Doc,
    },
    {
      id: 2,
      title: t("Hiring Reports"),
      description: "Hiring reports",
      document: Pdf,
    },
    {
      id: 3,
      title: t("Employee Perfomance Reports"),
      description: "Employee perfomance reports",
      document: Doc,
    },
    {
      id: 4,
      title: t("Monthly Attendance Reports"),
      description: "Monthly attendance reports",
      document: Pdf,
    },
  ];

  const report = [
    {
      id: 1,
      title: t("Report 1"),
      description: "Report 1",
      document: Doc,
    },
    {
      id: 2,
      title: t("Report 2"),
      description: "Report 2",
      document: Pdf,
    },
    {
      id: 3,
      title: t("Report 3"),
      description: "Report 3",
      document: Doc,
    },
    {
      id: 4,
      title: t("Report 4"),
      description: "Report 4",
      document: Pdf,
    },
  ];

  return (
    <FlexCol>
      <div className="flex flex-col">
        <div className="text-lg font-bold dark:text-white">{t("Reports")}</div>
        <div className="para">
          {t(
            "Coordinates the planning, execution, and completion of projects..."
          )}
        </div>
      </div>
      <Flex justify="space-between">
        <div className="flex items-center gap-[7px]">
          <h1 className="h1 ">{t("Total Reports")}</h1>
          <p className="px-[9px] py-[3px] bg-primaryLight rounded-lg text-primary  font-medium">
            {reportsAccordion.length}
          </p>
        </div>
        <SearchBox placeholder="Search reports" />
      </Flex>
      {reportsAccordion?.map((item, i) => (
        <Accordion
          key={i}
          title={item.title}
          initialExpanded={item.id === 1 && true}
          childrenGap={"gap-0"}
        >
          {report?.map((each, i) => (
            <div key={i}>
              <Flex justify="space-between">
                <Heading title={each.title} description={each.description} />
                <div className="flex items-center gap-5">
                  <Tooltip placement="top" title={"Generate Pdf"}>
                    <img src={Pdf} alt="PDF" className="h-8 w-7 2xl:w-10" />
                  </Tooltip>
                  <Tooltip placement="top" title={"Generate Excel"}>
                    {/* <img src={Excel} alt="EXCEL" className="h-8 w-7 2xl:w-10" /> */}
                  </Tooltip>
                </div>
              </Flex>
              {/* Add a horizontal line after each item except for the last one */}
              {i !== report.length - 1 && (
                <hr className="my-4 border-t border-gray-200" />
              )}
            </div>
          ))}
        </Accordion>
      ))}
    </FlexCol>
  );
}
