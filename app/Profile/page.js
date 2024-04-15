"use client";
import Image from "next/image";
import FlexCol from "@/Components/ui/FlexCol";
import React, { useEffect, useState } from "react";
import candidate from "@/public/Frame 427319140.png";
import Tabs, { TabsCustomAnimation } from "@/Components/ui/Tabs";
import TabsNew from "@/Components/ui/Tabs";
import ButtonClick from "@/Components/ui/Button";
import Link from "next/link";
import Footer from "@/Components/ui/Footer";
import Navbar1 from "@/Components/ui/Navbar1";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegFileExcel } from "react-icons/fa";
import { Button, Dropdown } from "antd";
import { IoEyeOutline } from "react-icons/io5";

function profile() {
  const [primaryColor, setPrimaryColor] = useState("");
  const data = [
    { label: "Job Title", value: "Sr. Front-End Developer" },
    { label: "Job Req", value: "236879" },
    { label: "Status", value: "Received" },
    { label: "Submission Date", value: "Mar 15, 2024" },
    { label: "Action", value: "Action " },
  ];
  const items = [
    {
      key: "1",
      label: (
        <Link href="/Profile/Withdrawapplication">
          {" "}
          <p className="flex items-center ">
            <FaRegFileExcel className="mr-2" /> Withdraw Application
          </p>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <p className="flex items-center ">
          <IoEyeOutline className="mr-2" /> View Applicaton
        </p>
      ),
    },
  ];
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);

  const submit = () => {};
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div>
      <Navbar1 />
      <div className="flex flex-col gap-6 py-10 container-wrapper mt-10">
        <div className="flex min-w-0  pt-3 ">
          <Image
            className="h-18 w-18 flex-none rounded-full bg-cover "
            src={candidate}
            alt=""
          />
          <div className="min-w-0 flex-auto mt-3">
            <p>Welcome back !</p>
            <p className="acco-h1">Grace Bennett Anderson</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <FlexCol />
          <div className="relative  w-full mx-auto borderb rounded-md">
            <FlexCol />
            <div className="relative flex flex-col gap-12">
              <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                <h2>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <div className="text-left rtl:text-right">
                      <h1 className="acco-h1">My Application </h1>
                    </div>
                  </button>
                </h2>
                <div
                  id={`acco-text-item`}
                  role="region"
                  aria-labelledby={`acco-title-item`}
                  className="flex flex-col  gap-6  justify-between w-full px-6 py-4"
                >
                  <TabsCustomAnimation />
                  <div className="grid md:grid-cols-1 gap-7">
                    <div className="flex justify-between items-center">
                      {data.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-start justify-start "
                        >
                          <p className="para">{item.label}</p>
                          {item.label === "Action" ? (
                            <div className="relative">
                              {/* <BsThreeDotsVertical className="mt-4 cursor-pointer" onClick={toggleDropdown} />
        {showDropdown && (
         <div className="absolute top-full left-0 z-10 bg-white border rounded shadow-lg">
        
         <Link href="/Profile/Withdrawapplication" className="flex items-center">
           <FaRegFileExcel className="mr-2" />
           <p className="mt-2 inline-block w-64">Withdraw Application</p>
         </Link>
         <p className="mt-2 inline-block w-64">View Application</p>
        
       </div>
        )} */}
                              <Dropdown
                                menu={{
                                  items,
                                }}
                                placement="bottomRight"
                              >
                                <BsThreeDotsVertical className="mt-4" />
                              </Dropdown>
                            </div>
                          ) : (
                            <p className="pblack mt-4 ">{item.value}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="divider-h" />
                    <div className="flex flex-col items-start justify-start">
                      <p className="para">
                        As we are assessing your application, we may contact you
                        to provide additional information. In this case, you
                        will receive a notification with instructions. Thank you
                        for your interest in joining our team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <FlexCol />
            <div className="relative  w-full mx-auto borderb rounded-md">
              <FlexCol />
              <div className="relative flex flex-col gap-12">
                <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <div className="text-left rtl:text-right">
                        <h1 className="acco-h1">My Application </h1>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`acco-text-item`}
                    role="region"
                    aria-labelledby={`acco-title-item`}
                    className="flex flex-col  gap-6  justify-between w-full px-6 py-4"
                  >
                    <div className="grid md:grid-cols-1 gap-7">
                      <div className="flex flex-col items-start justify-start">
                        <p className="para">
                          "To update your personal information, click Update
                          Contact Information. To change the email address for
                          your account, click Edit Account Settings."
                        </p>
                      </div>
                      <Link href="/Profile/Edit">
                        <ButtonClick
                          buttonName={"Edit Account"}
                          BtnType={"primary"}
                          handleSubmit={submit}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default profile;
