"use client";
import React, { useEffect, useState } from "react";
import FlexCol from "@components/ui/FlexCol";
import FormInput from "@components/ui/FormInput";
import Dropdown from "@components/ui/Dropdown";
import AddMore from "@components/ui/AddMore";
import TextArea from "@components/ui/TextArea";
import { useFormik } from "formik";
import * as Yup from 'yup';



function WorkExperience() {
  
   
  const [primaryColor, setPrimaryColor] = useState('');
  useEffect(() => {
    
    const color = localStorage.getItem("mainColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);
  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Job Title is required'),
    employmentType: Yup.string().required('Employment Type is required'),
    companyName: Yup.string().required('Company Name is required'),
    location: Yup.string().required('Location is required'),
    fromDate: Yup.string().required('From Date is required'),
    toDate: Yup.string().required('To Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      employmentType: "",
      companyName: "",
      location: "",
      fromDate: "",
      toDate: "",
      coverLetter: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      setSubmitting(false);
    },
  });
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
                    <h1 className="acco-h1">Work Experience Details </h1>
                    <p className="para">lorem ipsum dummy text dolar sit.</p>
                  </div>
                </button>
              </h2>
              <div
                id={`acco-text-item`}
                role="region"
                aria-labelledby={`acco-title-item`}
                className="flex flex-col gap-6  justify-between w-full px-6 py-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"Job Title"}
                    placeholder={"Eg: Retail Sales Manager"}
                    className="text-[#344054]"
                    name="jobTitle"
                    value={formik.values.jobTitle}
                    change={(e)=>{
                      formik.setFieldValue('jobTitle',e)
                    }}
                    required={true}
                    error={formik.errors.jobTitle}
                  />

                  <Dropdown
                    title={"Employment Type"}
                    placeholder={"Eg: Fulltime"}
                    className="text-[#344054]"
                    name="employmentType"
                    value={formik.values.employmentType}
                    change={(e)=>{
                      formik.setFieldValue('employmentType',e)
                    }}
                    required={true}
                    error={formik.errors.employmentType}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"Company Name"}
                    placeholder={"Eg: Microsoft"}
                    className="text-[#344054]"
                    name="employmentType"
                    value={formik.values.employmentType}
                    change={(e)=>{
                      formik.setFieldValue('employmentType',e)
                    }}
                    required={true}
                    error={formik.errors.employmentType}
                  />

                  <FormInput
                    title={"Location"}
                    placeholder={"Eg: London, UK"}
                    className="text-[#344054]"
                    name="location"
                    value={formik.values.location}
                    change={(e)=>{
                      formik.setFieldValue('location',e)
                    }}
                    required={true}
                    error={formik.errors.location}
                  />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  <FormInput
                    title={"From"}
                    placeholder={"09/2023"}
                    className="text-[#344054]"
                    name="fromDate"
                    value={formik.values.fromDate}
                    change={(e)=>{
                      formik.setFieldValue('fromDate',e)
                    }}
                    required={true}
                    error={formik.errors.fromDate}
                  />
                  <FormInput
                    title={"To"}
                    placeholder={"09/2024"}
                    className="text-[#344054]"
                    name="toDate"
                    value={formik.values.toDate}
                    change={(e)=>{
                      formik.setFieldValue('toDate',e)
                    }}
                    required={true}
                    error={formik.errors.toDate}
                  />
                </div>
                <AddMore name="Add More Experience " className="text-black" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
        <FlexCol />
        <div className="relative   w-full mx-auto borderb rounded-md ">
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
                    <h1 className="acco-h1">Resume & Cover Letter </h1>
                    <p className="para">lorem ipsum dummy text dolar sit.</p>
                  </div>
                </button>
              </h2>
              <div
                id={`acco-text-item`}
                role="region"
                aria-labelledby={`acco-title-item`}
                className="flex flex-col gap-6  justify-between w-full px-6 py-4"
              >
               <div className="relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA] dark:bg-black">
                <div className="flex min-w-0 gap-x-4 pt-5 pl-5">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src=""
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                      Click to upload or drag and drop{" "}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      PDF, DOCX Format only (5 mb max)
                    </p>
                  </div>
                </div>
              </div>
              <TextArea
                title="Cover Letter"
                placeholder="Type here"
                className="!text-[#344054]"
                name="coverLetter"
                value={formik.values.coverLetter}
                change={(e)=>{
                  formik.setFieldValue('coverLetter',e)
                }}
                required={true}
                error={formik.errors.coverLetter}
              />
            </div>
          </div>
        </div>
        </div>
       </div>
      </div>
    
  );
}

export default  WorkExperience;
