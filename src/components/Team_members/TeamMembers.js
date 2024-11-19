import React, { useEffect, useState } from "react";
import TableAnt from "../common/TableAnt";
import { useTranslation } from "react-i18next";
import ButtonClick from "../common/Button";
import Addmembers from "./Add-members";
import { getAllRecruitmentUsers } from "../Api1";
import { Link } from "react-router-dom";
import { PiArrowSquareOut } from "react-icons/pi";

const TeamMembers = ({
  open = "",
  close = () => {},
  refresh,
  createPolicyAction,
  openPolicy,
}) => {
  const { t } = useTranslation();

  const [updateId, setUpdateId] = useState(null);

  const [showPop, setShowPop] = useState(false);

  const handleShow = () => setShow(true);

  const [show, setShow] = useState(open);

  const [openPop, setOpenPop] = useState("");

  const [teamMembers, setTeamMembers] = useState([]);

  const navigationValue = t("Members");

  const companyId = localStorage.getItem("companyId");

  const Header = [
    {
      Employee: [
        {
          id: 1,
          title: t("Name"),
          value: "userName",
          bold: true,
        },
        {
          id: 2,
          title: t("Contact"),
          value: "userEmail",
        },
        {
          id: 3,
          title: t("Image"),
          value: "userImage",
        },
        {
          id: 4,
          title: t("Status"),
          value: "action",
          action: true,
        },
      ],
    },
  ];

  //    const handleOpenModal = () => {
  //     // Set the state to trigger the rendering of AddLeaveType
  //     setOpenPop("Members");
  //     setShow(true);
  //     handleShow();
  //     // You might want to set updateId and companyId here if needed
  //   };

  const callapi = async () => {
    try {
      const data = await getAllRecruitmentUsers({ companyId: companyId });
      setTeamMembers(data?.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    callapi();
  }, []);

  const handleNavigate = () => {
    window.open("https://careerui.vercel.app/", "_blank");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-8 lg:items-center lg:flex-row">
          <div className="flex flex-col">
            <p className="font-bold text-lg"> {t("Team_Members")}</p>
            <p className="para font-medium">{t("Main_Description")}</p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
            <Link onClick={handleNavigate} className="flex gap-2 mt-2">
              <span className="!text-primary para">View Career Page</span>{" "}
              <PiArrowSquareOut size={15} className="dark:text-white" />
            </Link>
            <ButtonClick
              handleSubmit={
                () => {
                  // if (e === navigationPath) {
                  // setShow(true);
                  // setCompanyId(company);
                  //   setOpenPop("Members");
                  //   setUpdateId(false);
                  // } else {
                  // setOpenPop(navigationPath);
                  //   setShow(true);
                  setOpenPop("Members");
                  setShow(true);
                  handleShow();
                  setShowPop(true);
                  //   if (company === "edit") {
                  //   setUpdateId(e);
                  //   }
                }
                // buttonClick(btnName, companyData.companyId);
              }
              // updateFun=""
              // updateBtn={true} // Set to true if it's an update button
              buttonName={t(`Add_Team_Member`)} // Set the button name
              className="your-custom-styles" // Add any additional class names for styling
              BtnType="Add"
              // Specify the button type (Add or Update)
            />
          </div>
        </div>
        <div>
          <TableAnt
            header={Header}
            All={true}
            data={teamMembers}
            actionID="userId"
            path="Employee"
            deleteApi="deleteRecruitmentUserById"
            clickDrawer={(e) => {
              handleShow();
            }}
            refresh={callapi}
            navigationValue={navigationValue}
            buttonClick={(e, company) => {
              setUpdateId(e);
              setShow(true);
              setOpenPop("Members");
              setShowPop(true);
            }}
          />
        </div>
      </div>
      {openPop === "Members" && showPop && (
        <Addmembers
          open={showPop}
          // country={countryList}
          close={(e) => {
            setShowPop(e);
            setUpdateId(null);
          }}
          updateId={updateId}
          refresh={() => {
            callapi();
          }}
          //   onAction={handleLeaveTemplateAction}
          //   action={(e) => {
          //     handleLeaveTemplateAction();
          //   }}
        />
      )}
    </>
  );
};

export default TeamMembers;
