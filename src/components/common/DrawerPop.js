import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "./Button";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { NestCamWiredStand } from "@mui/icons-material";

export default function DrawerPop({
  open,
  children,
  close = () => {},
  handleSubmit = () => {},
  updateFun = () => {},
  updateBtn = false,
  header = [],
  footerBtn = [],
  width = 830,
  className = "",
  headerRight,
  saveAndContinue = false,
  buttonClick = () => {},
  buttonClickCancel = () => {},
  items = [],
  menu = true,
  btnName = "",
  stepsData = [],
  nextStep = 0,
  activeBtn = 0,
  style = "",
  contentWrapperStyle = "",
  initialBtn = true,
}) {
  const { t } = useTranslation();

  const layout = useSelector((state) => state.layout.value);
  const [show, setShow] = useState(open);
  const [choosePolicies, setChoosePolicies] = useState(activeBtn);
  const [chooseNextStep, setChooseNextStep] = useState(nextStep);
  const drawerStyles = {
    mask: {
      // backdropFilter: "blur(1px)",
    },
  };

  const handleClose = () => {
    setShow(false);
    close(false);
  };

  return (
    <Drawer
      // width="100%"
      styles={drawerStyles}
      contentWrapperStyle={contentWrapperStyle}
      // destroyOnClose
      placement={layout === "ltr" ? "right" : "left"}
      title={
        <div className="flex justify-between gap-4 pl-4">
          <div className="relative flex flex-col">
            <h1 className="h1"> {header[0]}</h1>
            <p className="para">{header[1]}</p>
          </div>
          <div className="">{headerRight}</div>
        </div>
      }
      footer={
        <div className="flex justify-between gap-8 items-center py-[10px]">
          {saveAndContinue && nextStep !== 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => {
                buttonClickCancel();
              }}
              className="flex items-center gap-4 px-5 py-2 text-sm font-semibold border rounded-lg dark:text-white"
            >
              <IoIosArrowBack />
              <p> {t("Previous")}</p>
            </motion.button>
          ) : (
            <div className="">
              {nextStep !== 0 ? (
                <p className="para">{t("Reset_to_default")}</p>
              ) : (
                ""
              )}
            </div>
          )}
          <div className="flex items-center justify-start gap-2">
            {initialBtn && (
              <Button
                handleSubmit={() => close(false)}
                // updateFun={() => updateFun()}
                // updateBtn={updateBtn}
                buttonName={footerBtn[0]}
                BtnType="cancel"
                icon={<IoClose />}
                className="pr-8"
              />
            )}

            {saveAndContinue ? (
              initialBtn && (
                <Button
                  handleSubmit={() => {
                    buttonClick();
                  }}
                  buttonName={btnName ? btnName : t("Save And Continue button")}
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white rounded-md lg:text-sm"
                  BtnType="Add"
                />
              )
            ) : (
              //   {/* {btnName ? btnName : t("Save_And_Continue_button")} */}
              // {/* </Button> */}
              <Button
                handleSubmit={() => handleSubmit()}
                updateFun={() => updateFun()}
                updateBtn={updateBtn}
                buttonName={footerBtn[1]}
                BtnType="Add"
              />
            )}
          </div>
        </div>
      }
      // style={{
      //   width: "100vw",
      // }}
      // width={830}
      // size="100%"
      onClose={handleClose}
      open={show}
      //   style={{
      //     borderRadius: 12,
      //   }}
      className={` ${className !== "widthFull" && "md:rounded-l-lg"} `}
    >
      {children}
    </Drawer>
  );
}
