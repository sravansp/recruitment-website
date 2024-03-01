import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo_full.svg";
import { LuMail } from "react-icons/lu";
import { LuLock } from "react-icons/lu";
import { RiCheckFill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

import googleLogo from "../../assets/images/Social/Google.png";
import appleLogo from "../../assets/images/Social/apple-fill.png";
import metaLogo from "../../assets/images/Social/meta-fill.png";
import { Button, Checkbox } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import API from "../Api";
import logindash from "../../assets/images/logindash.png";
import ImageScroll from "../common/ImageScroll";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const [loginData, setLoginData] = useState();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      username: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (e) => {
      try {
        const result = await axios.post(
          API.HOST + API.LOGIN_USER,
          {
            username: e.username,
            password: e.password,
          }
          // {
          //   headers: {
          //     // "Access-Control-Allow-Origin":false,
          //     "API-Key": 525-777-777,
          //     // "API-Key": '525-777-777',
          //   },
          // }
        );
        console.log(result.data);

        // localStorage.setItem("organisationId", JSON.stringify(2));
        console.log(result.status);
        if (result.data.status === true) {
          localStorage.setItem("LoginData", JSON.stringify(result.data));
          window.location.reload();
          // navigate("/home");
        }
        // console.log("result");
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onChange = (e) => {
    // console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="flex w-full h-screen">
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col justify-between sm:w-2/3 lg:w-full mx-auto h-full p-10 py-4 md:px-20 2xl:py-20">
          {/* LOGO  */}
          <div className="flex justify-center logo lg:justify-start">
            <img src={logo} alt="logo" className="w-20 2xl:w-28" />
          </div>

          {/* FORM  */}
          <div className="flex items-center justify-center form-section">
            <div className="flex flex-col w-full !gap-5 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
              <div className="flex flex-col items-center !gap-5">
                {/* Header Form  */}
                <div className="text-center header">
                  <h1 className="text-xl font-semibold 2xl:text-3xl">
                    Welcome back
                  </h1>
                  <p className="mb-0 text-sm opacity-50 2xl:text-base">
                    Please enter your details to sign in.
                  </p>
                </div>

                {/* SOCIAL LOGINS  */}
                <div className="flex gap-8 social-login">
                  <div className="mneta_login bg-blue-600 2xl:h-[62px] 2xl:w-[62px] h-12 w-12 rounded-full flex justify-center items-center cursor-pointer">
                    <img src={metaLogo} alt="metaLogin" className="w-6 h-6" />
                  </div>
                  <div className="google_login 2xl:h-[62px] 2xl:w-[62px] h-12 w-12 rounded-full flex justify-center items-center bg-white border border-[#D9D9D9] cursor-pointer">
                    <img
                      src={googleLogo}
                      alt="googleLogin"
                      sizes={28}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="apple_login 2xl:h-[62px] 2xl:w-[62px] h-12 w-12 rounded-full flex justify-center items-center bg-black cursor-pointer">
                    <img src={appleLogo} alt="appleLogin" className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* OR  */}
              <div className="relative text-center">
                <p className="text-sm 2xl:text-base flex items-center !gap-3 opacity-50 before:h-[1px] before:w-full before:bg-black before:opacity-20 before:block whitespace-nowrap after:w-full after:h-[1px] after:bg-black after:opacity-20 after:block mb-0">
                  or continue with
                </p>
              </div>

              <div className="flex flex-col !gap-5">
                {/* Email Input Box */}
                <div className="input-section">
                  <div className="relative flex items-center w-full !border !border-black !border-opacity-20 rounded-lg transition-all duration-300 focus-within:!border-primary hover:!border-primary focus-within:shadow-ShadowInput">
                    <div className="flex items-center !px-4">
                      <LuMail size={20} />
                    </div>
                    <input
                      type="text"
                      id="floating_filled_email"
                      className="w-full h-12 text-sm bg-transparent border-none outline-none appearance-none 2xl:h-16 peer"
                      value={formik.values.username}
                      onChange={(e) =>
                        formik.setFieldValue("username", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    />

                    <div className="px-3">
                      {formik.touched.username &&
                      formik.values.username.length > 0 ? (
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            formik.errors.username
                              ? "bg-[#FF3E3E] invalid"
                              : "bg-[#2CB985] valid"
                          }`}
                        >
                          {formik.errors.username ? (
                            <RiCloseFill size={18} color="#fff" />
                          ) : (
                            <RiCheckFill size={18} color="#fff" />
                          )}
                        </div>
                      ) : null}
                    </div>

                    <label
                      htmlFor="floating_filled_email"
                      className={`-z-10 absolute transition-all leading-[1] duration-300 ${
                        formik.values.username.length === 0
                          ? "left-12 text-gray-400 peer-focus-within:left-12 peer-focus-within:-translate-y-4 peer-focus-within:text-gray-700 peer-focus-within:text-[10px] peer-focus-within:text-bold"
                          : "left-12 -translate-y-4 text-gray-700 text-[10px] text-bold"
                      }`}
                    >
                      Email Address
                    </label>
                  </div>
                  {formik.touched.username && formik.errors.username ? (
                    <p className="m-0 text-[#FF3E3E] text-xs">
                      {formik.errors.username}
                    </p>
                  ) : null}
                </div>

                {/* Password Input Box */}
                <div className="relative input-section">
                  <div className="flex items-center w-full !border !border-black !border-opacity-20 rounded-lg transition-all duration-300 focus-within:!border-primary hover:!border-primary focus-within:shadow-ShadowInput">
                    <div className="flex items-center !px-4">
                      <LuLock size={20} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="floating_filled_password"
                      className="w-full h-12 text-sm bg-transparent border-none outline-none appearance-none 2xl:h-16 peer"
                      value={formik.values.password}
                      onChange={(e) =>
                        formik.setFieldValue("password", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    />

                    <label
                      htmlFor="floating_filled_password"
                      className={`-z-10 absolute transition-all leading-[1] duration-300 ${
                        formik.values.password.length === 0
                          ? "left-12 text-gray-400 peer-focus-within:left-12 peer-focus-within:-translate-y-4 peer-focus-within:text-gray-700 peer-focus-within:text-[10px] peer-focus-within:text-bold"
                          : "left-12 -translate-y-4 text-gray-700 text-[10px] text-bold"
                      }`}
                    >
                      Password
                    </label>

                    {/* Eye Button to Toggle Password Visibility */}
                    <div
                      className="absolute cursor-pointer right-4"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} className="text-black opacity-50" />
                      ) : (
                        <FiEye size={18} className="text-black opacity-50" />
                      )}
                    </div>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <p className="m-0 text-[#FF3E3E] text-xs">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between">
                  <Checkbox onChange={onChange}>Remember Me</Checkbox>
                  <Link to={""} className="text-sm text-black underline">
                    Forgot password?
                  </Link>
                </div>

                {/* BUTTON  */}
                <Button
                  type="submit"
                  className="w-full h-12 text-sm text-white transition-all duration-300 rounded-lg outline-none appearance-none !border !border-primary !bg-primary 2xl:h-16 shadow-shadowXS hover:!bg-transparent hover:!text-primary 2xl:text-lg"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>

          {/* FOOTER TITLE  */}
          <div>
            <p className="text-sm text-center 2xl:text-base opacity-30">
              Loyaltri 
            </p>
          </div>
        </div>
      </div>

      <div className="items-center justify-center hidden text-white lg:w-1/2 lg:flex">
        <div className="h-[calc(100%_-5%)] w-[calc(100%_-5%)] bg_linear_colort rounded-3xl px-20 py-10 2xl:py-20 gap-4  flex flex-col justify-between">
          <div className="top h-[20%] 5xl:h-[5%] flex flex-col gap-1">
            <h1 className="text-2xl 2xl:text-4xl leading-none">
              The simplest way to manage your organisation
            </h1>
            <p className="para !text-white !font-normal">
              Enter your credintials to access your account
            </p>
          </div>

          {/* <div className="ml-0 middle h-[200px] lg:h-[250px] xl:h-[250px] 2xl:h-[400px]"> */}
          <div className="ml-0 h-[70%] 2xl:h-[60%]">
            <img
              src={logindash}
              alt="logindash"
              className="object-contain object-left w-full h-full ml-auto"
            />
          </div>

          <div className="w-full mx-auto h-[10%]">
            <div className="text-center">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
