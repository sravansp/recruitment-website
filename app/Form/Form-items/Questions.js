"use client";
import React, { useEffect, useState } from "react";
import FlexCol from "@components/ui/FlexCol";
import Dropdown from "@components/ui/Dropdown";
import FormInput from "@components/ui/FormInput";
import * as Yup from 'yup';
import { useFormik } from "formik";

function Questions() {
  const [primaryColor, setPrimaryColor] = useState('');
  useEffect(() => {
    
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    legalEligibility: Yup.string().required('This field is required'),
    highestEducationLevel: Yup.string().required('This field is required'),
  });

  const formik = useFormik({
    initialValues: {
      legalEligibility: "",
      highestEducationLevel: "",
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
                    <h1 className="acco-h1">Prerequisite </h1>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  <FormInput
                    title={"Are you legally eligible to work in the country?"}
                    placeholder={"Answer here.."}
                    className="text-[#344054]"
                    name="legalEligibility"
                    value={formik.values.legalEligibility}
                    change={(e)=>{
                      formik.setFieldValue('legalEligibility',e)
                    }}
                    required={true}
                    error={formik.errors.legalEligibility}
                  />
                </div>
                <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    title={"Highest level of education completed"}
                    placeholder={"Answer here.."}
                    className="text-[#344054]"
                    name="highestEducationLevel"
                    value={formik.values.highestEducationLevel}
                    change={(e)=>{
                      formik.setFieldValue('highestEducationLevel',e)
                    }}
                    required={true}
                    error={formik.errors.highestEducationLevel}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    title={"Highest level of education completed"}
                    placeholder={"Answer here.."}
                    className="text-[#344054]"
                    name="highestEducationLevel"
                    value={formik.values.highestEducationLevel}
                    change={(e)=>{
                      formik.setFieldValue('highestEducationLevel',e)
                    }}
                    required={true}
                    error={formik.errors.highestEducationLevel}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    title={"Highest level of education completed"}
                    placeholder={"Answer here.."}
                    className="text-[#344054]"
                    name="highestEducationLevel"
                    value={formik.values.highestEducationLevel}
                    change={(e)=>{
                      formik.setFieldValue('highestEducationLevel',e)
                    }}
                    required={true}
                    error={formik.errors.highestEducationLevel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
