"use client";
import React, { useEffect, useState } from "react";
import FlexCol from "@components/ui/FlexCol";
import Dropdown from "@components/ui/Dropdown";
import FormInput from "@components/ui/FormInput";
import * as Yup from 'yup';
import { Formik, useFormik } from "formik";
import { saveRecruitmentResume } from "@/Components/Api";

function PersonalDetails({ handleSubmit=()=>{} }) {
  const [primaryColor, setPrimaryColor] = useState('');
  useEffect(() => {
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    candidateEmail: Yup.string().email("Invalid email address").required("Email is required"),
    candidateContact: Yup.string().required("Phone number is required"),
    candidateLocation: Yup.string().required("Location is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    postalCode: Yup.string().required("Postal code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resumeCode: 21,
      candidateName:"sdhbhj",
      namePrefix: "Mr",
      firstName: "",
      lastName: "",
      dob: "1998-09-23",
      cityOrTown: "",
      postalCode: "",
      addressLine: "",
      candidateLocation: "",
      candidateContact: "",
      candidateSource: "source1",
      candidateEmail: "",
      jobId: 5,
      createdBy: "ajay", // You may need to replace this with the actual createdBy value
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Call the handleSubmit function passed from Web component
      handleSubmit(values);
      console.log(values,"dataaaa")

    },
  })
  return (
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
                  <h1 className="acco-h1">Personal Information </h1>
                  <p className="para">lorem ipsum dummy text dolar sit.</p>
                </div>
              </button>
            </h2>
            <form onSubmit={formik.handleSubmit}>
            <div
              id={`acco-text-item`}
              role="region"
              aria-labelledby={`acco-title-item`}
              className="flex flex-col gap-6  justify-between w-full px-6 py-4"
            >
             
              <div className="grid  grid-cols-2 sm:grid-cols-6 gap-4">
                <Dropdown
                  title={"Prefix"}
                  placeholder={"Mr"}
                  // className="text-[#344054]"
                  // onChange={formik.handleChange}
                  
                    name="namePrefix"
                    value={formik.values.namePrefix}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  title={"First Name"}
                  placeholder={"First Name"}
                  // className="text-[#344054] "
                  name="firstName"
                  value={formik.values.firstName}
                  change={(e)=>{
                    formik.setFieldValue('firstName',e)
                    console.log("First Name:", e);
                  }}
                 
                  required={true}
                  error={formik.errors.firstName}
                />
                <FormInput
                  title={"Last Name"}
                  placeholder={"Last Name"}
                  // className="text-[#344054]"
                  name="lastName"
                    value={formik.values.lastName}
                    change={(e)=>{
                      formik.setFieldValue('lastName',e)
                    }}
                    required={true}
                    error={formik.errors.lastName}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  title={"Email"}
                  placeholder={"Email Address"}
                  // className="text-[#344054]"
                  name="candidateEmail"
                    value={formik.values.candidateEmail}
                    change={(e)=>{
                      formik.setFieldValue('candidateEmail',e)
                    }}
                    required={true}
                    error={formik.errors.candidateEmail}
                />
                <FormInput
                  title={"Phone Number"}
                  placeholder={"1234656987"}
                  // className="text-[#344054]"
                  value={formik.values.candidateContact}
                  change={(e)=>{
                    formik.setFieldValue('candidateContact',e)
                  }}
                  required={true}
                  error={formik.errors.candidateContact}
                />
              </div>
              <div className="relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black">
                <div className="flex min-w-0 gap-x-4 pt-5 pl-5">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src=""
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                  <label htmlFor="resumeUpload" className="cursor-pointer">
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Click to upload or drag and drop{" "}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-white dark:text-opacity-50">
                  PDF, DOCX Format only (5 mb max)
                </p>
              </label>
              <input
                id="resumeUpload"
                type="file"
                className="hidden"
                // onChange={handleFileUpload}
                accept=".pdf,.docx"
              />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  title={"Location"}
                  placeholder={"United Arab Emirates"}
                  // className="text-[#344054]"
                  value={formik.values.candidateLocation}
                  change={(e)=>{
                    formik.setFieldValue('candidateLocation',e)
                  }}
                  required={true}
                  error={formik.errors.candidateLocation}
                />
                <FormInput
                  title={"City or Town"}
                  placeholder={"Type here..."}
                  // className="text-[#344054]"
                  value={formik.values.city}
                  change={(e)=>{
                    formik.setFieldValue('city',e)
                  }}
                  required={true}
                  error={formik.errors.city}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  title={"Address Line"}
                  placeholder={"Type here..."}
                  // className="text-[#344054]"
                  value={formik.values.address}
                  change={(e)=>{
                    formik.setFieldValue('address',e)
                  }}
                  required={true}
                  error={formik.errors.address}
                />
                <FormInput
                  title={"Postal Code"}
                  placeholder={"Type here..."}
                  // className="text-[#344054]"
                  value={formik.values.postalCode}
                  change={(e)=>{
                    formik.setFieldValue('postalCode',e)
                  }}
                  required={true}
                  error={formik.errors.postalCode}
                />
              </div>
              
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
