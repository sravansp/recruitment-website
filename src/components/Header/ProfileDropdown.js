import React, { useState } from "react";
import noImg from "../../assets/images/noImg.webp";
import { RiArrowDownSLine } from "react-icons/ri";
import { Modal } from "antd";
import { Link } from "react-router-dom";

import { Divider, Dropdown, theme } from "antd";
import ButtonClick from "../common/Button";
import { PiPalette, PiQuestion, PiSignOut, PiUser } from "react-icons/pi";

const { useToken } = theme;
const items = [
  {
    key: "1",
    label: <Link to="/profile">View Profile</Link>,
    icon: <PiUser size={18} />,
  },
  {
    key: "2",
    label: <Link to="/Appearance">Appearance</Link>,
    icon: <PiPalette size={18} />,
  },
  {
    key: "3",
    label: <Link to="/help-support">Help & Support</Link>,
    icon: <PiQuestion size={18} />,
  },
];

const ProfileDropdown = ({ Email = "", Profile = "", Name = "" }) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    localStorage.removeItem("LoginData");
    localStorage.clear();
    window.location.reload();
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const { token } = useToken();
  const contentStyle = {
    width: "272px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow:
      "0px 25.6px 40.229px 0px rgba(6, 6, 6, 0.10), 0px 25.6px 40.229px 0px rgba(6, 6, 6, 0.10)",
  };
  const menuStyle = {
    boxShadow: "none",
  };
  return (
    <>
      <Dropdown
        placement="bottomLeft"
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            <div className="p-2">
              <div className="flex items-center h-full gap-2 dark:text-white ">
                <div className=" size-[33px] 2xl:size-[43px] rounded-full overflow-hidden">
                  <img
                    className="object-cover w-full"
                    src={Profile ? Profile : noImg}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-start leading-none">
                  <p className="text-sm font-semibold 2xl:text-base ">{Name}</p>
                  <p className="text-xs text-gray-500 2xl:text-sm">{Email}</p>
                </div>
              </div>
            </div>
            <Divider
              style={{
                margin: 0,
              }}
            />

            {React.cloneElement(menu, {
              style: menuStyle,
            })}

            <div className="p-2">
              <ButtonClick
                className="!bg-[#B00C01DE] w-full"
                BtnType="primary"
                icon={<PiSignOut size={20} />}
                handleSubmit={showModal}
                buttonName="Log Out"
              ></ButtonClick>
            </div>
          </div>
        )}
        menu={{
          items,
          selectable: true,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <div className="flex items-center h-full  gap-2 2xl:p-1 px-1 py-0.5 text-black rounded-full justify-evenly bg-secondaryWhite dark:bg-secondaryDark dark:text-white ">
            <div className=" w-[24px] h-[24px] 2xl:w-[34px] 2xl:h-[34px] rounded-full overflow-hidden">
              {}
              <img
                className="object-cover w-full"
                src={Profile ? Profile : noImg}
                alt=""
              />
            </div>
            <div className="flex-col justify-start hidden leading-none xl:flex">
              <p className="text-xs font-medium 2xl:text-sm ">{Name}</p>
              <p className="text-[8px] 2xl:text-[10px]">{Email}</p>
            </div>
            <RiArrowDownSLine className="hidden text-xl ltr:pr-2 rtl:pl-2 xl:flex 2xl:text-2xl" />
          </div>
        </a>
      </Dropdown>
      <Modal
        open={open}
        title="Logout"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default ProfileDropdown;
