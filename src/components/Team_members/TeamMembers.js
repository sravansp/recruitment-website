import React, { useEffect, useState } from "react";
import TableAnt from "../common/TableAnt";
import Breadcrumbs from "../common/BreadCrumbs";
import { useTranslation } from "react-i18next";

import ButtonClick from "../common/Button";
import Addmembers from "./Add-members";
import { getAllRecruitmentUsers } from "../Api1";

const TeamMembers = ({
  open = "",
  close = () => {},
  refresh,
  createPolicyAction,
  
  openPolicy,
}) => {
  const { t } = useTranslation();
  const[updateId,setUpdateId]=useState(null)
  const [showPop, setShowPop] = useState(false);
  const handleClose = () => setOpenPop(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(open);
  const [openPop, setOpenPop] = useState("");
  const [TeamMembers, setTeamMembers] = useState([]);
  const [navigationValue, setNavigationValue] = useState(t("Members"));
  const breadcrumbItems = [
    { label: t("Settings"), url: "" },
      { label: t("Other"), url: "" },
    { label: t("Team Members"), url: "/" },
    // { label: navigationPath.charAt(0).toUpperCase() + navigationPath.slice(1) },
  ];
  const Header = [
    {
      Employee: [
        {
          id: 1,
          title: "Name",
          value: "userName",
        },
        {
          id: 2,
          title: "Contact",
          value: "userEmail",
        },
        {
          id: 3,
          title: "Image",
          value: "userImage",
        },
        {
          id: 4,
          title: "",
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
  useEffect(() => {
    const callapi = async () => {
      try {
        const data = await getAllRecruitmentUsers();
        console.log(data.result);
        setTeamMembers(data?.result);
      } catch (error) {
        console.error(error); // Handle errors
      }
    };

    callapi();
  }, []);
  console.log("header", Header);
  return (
    <><div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-8 lg:items-center lg:flex-row">
        <div>
          <Breadcrumbs items={breadcrumbItems} />
          <p className="para">{t("Lorem ipsum dolart sit dummy text.")}</p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row">
          <ButtonClick
            handleSubmit={
              () => {
                console.log("show");

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
                //   console.log(company, "companyparentId");
                //   if (company === "edit") {
                //   setUpdateId(e);
                //   }
              }
              // buttonClick(btnName, companyData.companyId);
            }
            // updateFun=""
            // updateBtn={true} // Set to true if it's an update button
            buttonName={`Add Team Member`} // Set the button name
            className="your-custom-styles" // Add any additional class names for styling
            BtnType="Add"
            // Specify the button type (Add or Update)
          />
        </div>
      </div>
      <div>
        <TableAnt 
        header={Header}  
        data={TeamMembers}  
        actionID="userId" 
        path="Employee"
        clickDrawer={(e) => {
          handleShow();
        }}
        navigationValue={navigationValue}
        buttonClick={(e, company) => {
          console.log(e);
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
          }}
          updateId={updateId}
          // refresh={() => {
          //   getCompanyList();
          // }}
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
