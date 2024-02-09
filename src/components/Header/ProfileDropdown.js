import React, { useState } from "react";
import profile from "../../assets/images/user3.webp";
import { IoLogOut } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { Modal } from "antd";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
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
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block text-left dropdown">
        <button
          className="inline-flex justify-center w-full h-8 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-transparent focus:outline-none 2xl:h-10 "
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
          aria-controls="headlessui-menu-items-117"
        >
          <div className="flex items-center h-full  gap-2 2xl:p-1 px-1 py-0.5 text-black rounded-full justify-evenly bg-secondaryWhite dark:bg-secondaryDark dark:text-white ">
            <div className=" w-[24px] h-[24px] 2xl:w-[34px] 2xl:h-[34px] rounded-full overflow-hidden">
              <img className="object-cover w-full" src={profile} alt="" />
            </div>
            <div className="flex-col justify-start hidden leading-none xl:flex">
              <p className="text-xs font-medium 2xl:text-sm ">Khadija Ahmed</p>
              <p className="text-[8px] 2xl:text-[10px]">khadija@loyaltri.com</p>
            </div>
            <RiArrowDownSLine
              className="hidden text-xl ltr:pr-2 rtl:pl-2 xl:flex 2xl:text-2xl"
            />
          </div>
        </button>
        <div className="relative z-50 invisible transition-all duration-300 origin-top-right transform scale-95 -translate-y-2 opacity-0 dropdown-menu">
          <div
            className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 outline-none z-[999]"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            <div className="w-full max-w-sm p-2 border border-gray-200 divide-y rounded-lg shadow-lg divide-secondaryDark dark:divide-secondaryWhite divide-opacity-10 dark:divide-opacity-10 bg-secondaryWhite dark:border-none dark:bg-secondaryDark drop-shadow-xl">
              <div
                aria-label="header"
                className="flex items-center px-1 pb-2 space-x-2"
              >
                <div
                  aria-label="avatar"
                  className="flex items-center mr-auto space-x-2"
                >
                  <img
                    src={profile}
                    alt="avatar  Khadija Ahmed"
                    className="w-6 h-6 rounded-full 2xl:w-8 2xl:h-8 shrink-0"
                  />
                  <div className="flex flex-col flex-1 space-y-2">
                    <div className="relative text-xs font-medium leading-tight text-gray-900 2xl:text-sm dark:text-white">
                      <span className="flex">
                        <span className="relative pr-8 truncate">
                          Khadija Ahmed
                        </span>
                      </span>
                    </div>
                    <p className="text-[8px] 2xl:text-[10px] font-normal leading-tight text-gray-500 truncate !mt-0 dark:text-white">
                      khadija@loyaltri.com
                    </p>
                  </div>
                </div>
              </div>
              <div aria-label="navigation" className="py-1">
                <nav className="grid gap-1">
                  
                 
                  <Link
                    to="/employeeProfile"
                    className="flex items-center w-full px-4 py-1 space-x-3 text-xs leading-6 text-gray-600 transition-all duration-300 rounded-md 2xl:text-sm whitespace-nowrap dark:text-white focus:outline-none hover:bg-white dark:hover:bg-primary"
                  >
                    <RiAccountCircleFill />
                    <span className="text-[10px] 2xl:text-sm ">Account Settings</span>
                  </Link>
                </nav>
              </div>
              <div aria-label="footer" className="pt-2">
                <button
                  type="button"
                  className="flex items-center w-full px-4 py-1 space-x-3 text-xs leading-6 text-gray-600 transition-all duration-300 rounded-md 2xl:text-sm whitespace-nowrap dark:text-white focus:outline-none hover:bg-white dark:hover:bg-primary"
                  onClick={() => {
                    showModal();
                  }}
                >
                  <IoLogOut />
                  <span className="text-[10px] 2xl:text-sm ">Logout</span>
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
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
      </div>
    </div>
  );
};

export default ProfileDropdown;
