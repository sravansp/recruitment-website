"use client";
import Image from "next/image";
import FlexCol from "@/Components/ui/FlexCol";
import React, { useEffect, useState } from "react";
import candidate from "@/public/Frame 427319140.png";
import Tabs from "@/Components/ui/Tabs";
import TabsNew from "@/Components/ui/Tabs";
import ButtonClick from "@/Components/ui/Button";
import Dropdown from "@/Components/ui/Dropdown";
import FormInput from "@/Components/ui/FormInput";
import Footer from "@/Components/ui/Footer";
import Navbar1 from "@/Components/ui/Navbar1";

function EditContactinformation() {
  const [primaryColor, setPrimaryColor] = useState("");
  useEffect(() => {
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);
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
                      <h1 className="acco-h1">Edit Contact Information </h1>
                    </div>
                  </button>
                </h2>
                <div
                  id={`acco-text-item`}
                  role="region"
                  aria-labelledby={`acco-title-item`}
                  className="flex flex-col  gap-6  justify-between w-full px-6 py-4"
                >
                  <div className="flex flex-col items-start justify-start">
                    <p className="h6">Name & Contact Details</p>
                  </div>
                  <div className="grid  grid-cols-2 sm:grid-cols-8 gap-4">
                    <Dropdown
                      title={"Prefix"}
                      placeholder={"Mr"}
                      // className="text-[#344054]"
                      // onChange={formik.handleChange}

                      // name="namePrefix"
                      // value={formik.values.namePrefix}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput
                      title={"First Name"}
                      placeholder={"First Name"}
                      // className="text-[#344054] "
                      // name="firstName"
                      // value={formik.values.firstName}
                      // change={(e)=>{
                      //   formik.setFieldValue('firstName',e)
                      //   console.log("First Name:", e);
                      // }}

                      // required={true}
                      // error={formik.errors.firstName}
                    />
                    <FormInput
                      title={"Last Name"}
                      placeholder={"Last Name"}
                      // className="text-[#344054]"
                      // name="lastName"
                      //   value={formik.values.lastName}
                      //   change={(e)=>{
                      //     formik.setFieldValue('lastName',e)
                      //   }}
                      //   required={true}
                      //   error={formik.errors.lastName}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput
                      title={"Email"}
                      placeholder={"Email Address"}
                      // className="text-[#344054]"
                      // name="candidateEmail"
                      //   value={formik.values.candidateEmail}
                      //   change={(e)=>{
                      //     formik.setFieldValue('candidateEmail',e)
                      //   }}
                      //   required={true}
                      //   error={formik.errors.candidateEmail}
                    />
                    <FormInput
                      title={"Phone Number"}
                      placeholder={"1234656987"}
                      // className="text-[#344054]"
                      // value={formik.values.candidateContact}
                      // change={(e)=>{
                      //   formik.setFieldValue('candidateContact',e)
                      // }}
                      // required={true}
                      // error={formik.errors.candidateContact}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <p className="h6">Address Details</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput
                      title={"Location"}
                      placeholder={"United Arab Emirates"}
                      // className="text-[#344054] "
                      // name="firstName"
                      // value={formik.values.firstName}
                      // change={(e)=>{
                      //   formik.setFieldValue('firstName',e)
                      //   console.log("First Name:", e);
                      // }}

                      // required={true}
                      // error={formik.errors.firstName}
                    />
                    <FormInput
                      title={"City or Town"}
                      placeholder={"Oasisville"}
                      // className="text-[#344054]"
                      // name="lastName"
                      //   value={formik.values.lastName}
                      //   change={(e)=>{
                      //     formik.setFieldValue('lastName',e)
                      //   }}
                      //   required={true}
                      //   error={formik.errors.lastName}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput
                      title={"Address Line"}
                      placeholder={"Al Sama Street"}
                      // className="text-[#344054]"
                      // name="candidateEmail"
                      //   value={formik.values.candidateEmail}
                      //   change={(e)=>{
                      //     formik.setFieldValue('candidateEmail',e)
                      //   }}
                      //   required={true}
                      //   error={formik.errors.candidateEmail}
                    />
                    <FormInput
                      title={"Postal Code"}
                      placeholder={"1234"}
                      // className="text-[#344054]"
                      // value={formik.values.candidateContact}
                      // change={(e)=>{
                      //   formik.setFieldValue('candidateContact',e)
                      // }}
                      // required={true}
                      // error={formik.errors.candidateContact}
                    />
                  </div>
                  <div className="flex items-center  gap-2.5 p-1.5 mt-4 rounded-lg">
                    <ButtonClick buttonName="Save" BtnType="primary" />
                    <ButtonClick
                      buttonName="Cancel"
                      className={"!text-red-600"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditContactinformation;
