"use client";
import React, { useEffect, useState } from "react";
import FlexCol from "@components/ui/FlexCol";
import Dropdown from "@components/ui/Dropdown";
import FormInput from "@components/ui/FormInput";
import AddMore from "@components/ui/AddMore";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from 'yup';

function EducationalDetails() {
  const [primaryColor, setPrimaryColor] = useState('');
  useEffect(() => {
    
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);
  const validationSchema = Yup.object().shape({
    schoolOrUniversity: Yup.string().required('School or University is required'),
    degree: Yup.string().required('Degree is required'),
    fieldOfStudy: Yup.string().required('Field of Study is required'),
    year: Yup.number().required('Year is required').positive('Year must be a positive number'),
  });

  const formik = useFormik({
    initialValues: {
      schoolOrUniversity: "",
      degree: "",
      fieldOfStudy: "",
      year: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      setSubmitting(false);
    },
  });
  return (
    <div>
      <div className="flex flex-col gap-6">
        <FlexCol/>
        <div className="relative  w-full mx-auto borderb rounded-md">
          <FlexCol/>
          <div className="relative flex flex-col gap-12">
            <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <div className="text-left rtl:text-right">
                    <h1 className="acco-h1">Educational Details </h1>
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
                <div className="grid grid-cols-1  sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"School or University"}
                    placeholder={"Eg: Boston University"}
                    className="text-[#344054]"
                    name="schoolOrUniversity"
                    value={formik.values.schoolOrUniversity}
                    change={(e)=>{
                      formik.setFieldValue('schoolOrUniversity',e)
                    }}
                    required={true}
                    error={formik.errors.schoolOrUniversity}
                  />
                  <Dropdown
                    title={"Degree"}
                    placeholder={"Eg: Bachelor’s"}
                    name="degree"
                    className="text-[#344054]"
                    value={formik.values.degree}
                    change={(e)=>{
                      formik.setFieldValue('degree',e)
                    }}
                    required={true}
                    error={formik.errors.degree}
                  />
                </div>
                <div className="grid  grid-cols-1  sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"Field of Study"}
                    placeholder={"Eg: Business"}
                    className="text-[#344054]"
                    name="fieldOfStudy"
                  
                    value={formik.values.fieldOfStudy}
                    change={(e)=>{
                      formik.setFieldValue('fieldOfStudy',e)
                    }}
                    required={true}
                    error={formik.errors.fieldOfStudy}
                    
                  />
                  <FormInput
                    title={"Year"}
                    placeholder={"Year"}
                    className="text-[#344054]"
                    name="year"
                  
                    value={formik.values.year}
                    change={(e)=>{
                      formik.setFieldValue('year',e)
                    }}
                    required={true}
                    error={formik.errors.year}
                  />
                </div>
                <div className="divider-h" />

                <div className="grid  grid-cols-1  sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"School or University"}
                    placeholder={"Eg: Boston University"}
                    className="text-[#344054]"
                    name="schoolOrUniversity"
                    value={formik.values.schoolOrUniversity}
                    change={(e)=>{
                      formik.setFieldValue('schoolOrUniversity',e)
                    }}
                    required={true}
                    error={formik.errors.schoolOrUniversity}
                  />
                  <Dropdown
                    title={"Degree"}
                    placeholder={"Eg: Bachelor’s"}
                    className="text-[#344054]"
                    name="degree"
                    
                    value={formik.values.degree}
                    change={(e)=>{
                      formik.setFieldValue('degree',e)
                    }}
                    required={true}
                    error={formik.errors.degree}
                  />
                </div>
                <div className="grid  grid-cols-1  sm:grid-cols-3 gap-4">
                  <FormInput
                    title={"Field of Study"}
                    placeholder={"Eg: Business"}
                    className="text-[#344054]"
                    name="fieldOfStudy"
                  
                    value={formik.values.fieldOfStudy}
                    change={(e)=>{
                      formik.setFieldValue('fieldOfStudy',e)
                    }}
                    required={true}
                    error={formik.errors.fieldOfStudy}
                  />
                  <FormInput
                    title={"Year"}
                    placeholder={"Year"}
                    className="text-[#344054]"
                    name="year"
                  
                    value={formik.values.year}
                    change={(e)=>{
                      formik.setFieldValue('year',e)
                    }}
                    required={true}
                    error={formik.errors.year}
                  />

                  <RiDeleteBin5Line className="text-gray-500 w-[17px] h-[17px] justify-end " />
                </div>
                <AddMore name="Add More Experience "  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationalDetails;
