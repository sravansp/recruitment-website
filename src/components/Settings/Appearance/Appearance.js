import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import CustomAccordion from "./CustomAccordion";
import ThemeSwitch from "./ThemeSwitch";
// import SampleAcco from "./SampleAcco";
import { useMediaQuery } from 'react-responsive';

const Appearance = () => {
  const { t, i18n } = useTranslation();
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const recentAppOptions = [
    {
      value: "1",
      label: "Recent used apps",
    },
    {
      value: "2",
      label: "Recent used Pages",
    },
    {
      value: "3",
      label: "Top Pages",
    },
    {
      value: "4",
      label: "Identified Pages",
    },
    {
      value: "5",
      label: "Resolved Pages",
    },
    {
      value: "6",
      label: "Cancelled Pages",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="h1">{t("Appearance")}</h1>
        <p className="para">
          {t("Appearance_Description")}{" "}
          <span className="text-primary">{t("Custom_theme")}</span>
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-6 md:gap-3 box-wrapper md:flex-row">
          <div>
            <p className="subhead">{t("Inter_face_theme")}</p>
            <p className="para">{t("Inter_face_theme_Description")}</p>
          </div>
          <ThemeSwitch />
        </div>

        <div className="flex flex-col justify-between gap-6 md:items-center md:gap-0 box-wrapper md:flex-row">
          <div>
            <p className="subhead">{t("Sidebar_feature")}</p>
            <p className="para">{t("Sidebar_feature_Description")}</p>
          </div>
          <div className="w-full form-select md:w-80">
            <Select
              showSearch
              className="text-white "
              style={{
                width: "100%",
              }}
              size={isSmallScreen ? "default" : "large"}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={recentAppOptions}
            />
          </div>
        </div>

        <div>
          <CustomAccordion />
          {/* <SampleAcco /> */}
        </div>
      </div>
    </div>
  );
};

export default Appearance;
