import React, { useEffect, useState } from "react";
import logo from "../../assets/images/login/brandlogo.png";
import { LuMail } from "react-icons/lu";
import { LuLock } from "react-icons/lu";
import { FiEye, FiEyeOff } from "react-icons/fi";
import googleLogo from "../../assets/images/Social/Google.png";
import appleLogo from "../../assets/images/Social/apple-fill.png";
import metaLogo from "../../assets/images/Social/meta-fill.png";
import widget1 from "../../assets/images/login/widget1.png";
import widget2 from "../../assets/images/login/widget2.png";
import widget3 from "../../assets/images/login/widget3.png";
import { Button, Checkbox, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import API from "../Api";
import FormInput from "../common/FormInput";
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState(null);

  const [user, setUser] = useState([]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => {},
  });

  useEffect(() => {
    if (user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          return err;
        });
    }
  }, [user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (profile) {
        // try {
        //   const result = await axios.post(API.HOST + API.LOGIN_USER, {
        //     username: profile.email,
        //     thirdPartyLogin: 1,
        //   });
        //   if (result.data.status == false) {
        //     openNotification("error", "Failure", result.data.message);
        //   }
        //   if (result.data.status == true) {
        //     localStorage.setItem("LoginData", JSON.stringify(result.data));
        //     localStorage.setItem(
        //       "employeeId",
        //       JSON.stringify(parseInt(result?.data?.userData?.employeeId))
        //     );
        //     window.location.reload();
        //   }
        // } catch (err) {
        // }
      }
    };

    fetchUserProfile();
  }, [profile]);

  const [visible, setVisible] = useState(false);

  const handleForgotPasswordClick = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    formik2.resetForm();
    setVisible(false);
  };

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description, callback) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      onClose: callback,
      // stack: 2,
      style: {
        background: `${
          type === "success"
            ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
            : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
        }`,
        boxShadow: `${
          type === "success"
            ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
            : "0px 22px 60px rgba(134, 92, 144, 0.20)"
        }`,
      },
      // duration: null,
    });
  };

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
    onSubmit: async (values) => {
      try {
        const response = await axios.post(API.HOST + API.LOGIN_USER, {
          username: values.username,
          password: values.password,
          thirdPartyLogin: 0,
        });
        if (response.data.status === true) {
          const userData = response.data.userData;
          const employeeId = userData.employeeId;
          const companyId = userData.companyId[0];
          const organisationId = userData.organisationId;
          localStorage.setItem("LoginData", JSON.stringify(response.data));
          localStorage.setItem("employeeId", employeeId);
          localStorage.setItem("companyId", companyId);
          localStorage.setItem("organisationId", organisationId);
          localStorage.setItem("token", userData.token);
          navigate("/");
          window.location.reload();
        } else {
          openNotification("error", "Failure", response.data.message);
        }
      } catch (error) {
        openNotification("error", "Failed", error.message);
      }
    },
  });

  const formik2 = useFormik({
    initialValues: {
      email: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required"),
    }),
    onSubmit: async (e) => {
      // try {
      //   const result = await action(API.FORGOT_PASSWORD, {
      //     emailId: e.email,
      //   });
      //   if (result.result.status === false) {
      //     openNotification(
      //       "error",
      //       "Something went wrong",
      //       result.result.message
      //     );
      //   }
      //   if (result.result.status === true) {
      //     openNotification("success", "Successful", result.result.message);
      //   }
      //   formik2.resetForm();
      //   setVisible(false);
      // } catch (error) {
      // }
    },
  });

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue) {
      setRememberMe(JSON.parse(rememberMeValue));
    }
  }, []);

  const onChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    localStorage.setItem("rememberMe", isChecked);
  };

  return (
    <div className="absolute top-0 bottom-0 flex w-full">
      {contextHolder}
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col justify-between h-full p-10 py-4 mx-auto sm:w-2/3 lg:w-full md:px-12 2xl:py-12">
          {/* LOGO  */}
          <div className="flex justify-center logo lg:justify-start">
            <img src={logo} alt="logo" className="w-40 2xl:w-60" />
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
                  <div
                    className="google_login 2xl:h-[62px] 2xl:w-[62px] h-12 w-12 rounded-full flex justify-center items-center bg-white border border-[#D9D9D9] cursor-pointer"
                    onClick={googleLogin}
                  >
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
                <div
                  className="input-section"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      formik.handleSubmit();
                    }
                  }}
                >
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

                    {/* <div className="px-3">
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
                    </div> */}

                    <label
                      htmlFor="floating_filled_email"
                      className={`-z-10 absolute transition-all leading-[1] duration-300 ${
                        formik.values.username?.length === 0
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
                <div
                  className="relative input-section"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      formik.handleSubmit();
                    }
                  }}
                >
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
                        formik.values.password?.length === 0
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
                        <FiEyeOff
                          size={18}
                          className="text-black opacity-50 hover:text-primary hover:opacity-100"
                        />
                      ) : (
                        <FiEye
                          size={18}
                          className="text-black opacity-50 hover:text-primary hover:opacity-100"
                        />
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
                  <Checkbox onChange={onChange} checked={rememberMe}>
                    <span className="hover:text-primary">Remember Me</span>
                  </Checkbox>
                  <div
                    className="text-sm text-black underline cursor-pointer hover:text-primary hover:no-underline"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot password?
                  </div>
                  <Modal
                    title="Forgot Password"
                    visible={visible}
                    centered
                    onCancel={handleCancel}
                    footer={[
                      <Button key="cancel" onClick={handleCancel}>
                        Cancel
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        onClick={formik2.handleSubmit}
                      >
                        Submit
                      </Button>,
                    ]}
                  >
                    <div
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          formik2.handleSubmit();
                        }
                      }}
                    >
                      <FormInput
                        title={"Email"}
                        placeholder={"Email"}
                        change={(e) => {
                          formik2.setFieldValue("email", e);
                        }}
                        value={formik2.values.email}
                        error={formik2.errors.email}
                        required={true}
                      />
                    </div>
                  </Modal>
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
          {/* <div className="top h-[20%] 5xl:h-[5%] flex flex-col gap-1">
            <h1 className="text-2xl leading-none 2xl:text-4xl">
              The simplest way to manage your organisation
            </h1>
            <p className="para !text-white !font-normal">
              Enter your credintials to access your account
            </p>
          </div> */}
          {/* <div className="ml-0 h-[70%] 2xl:h-[60%]">
            <img
              src={logindash}
              alt="logindash"
              className="object-contain object-left w-full h-full ml-auto"
            />
          </div> */}
          {/* <div className="w-full mx-auto h-[10%]">
            <div className="text-center">
              <ImageScroll />
            </div>
          </div> */}
          <div className="h-full w-full flex flex-col justify-between">
            {/* <div className="ml-0 middle h-[200px] lg:h-[250px] xl:h-[250px] 2xl:h-[400px]"> */}
            {/* <div className="h-ful mb-6"> */}
            {/* <img
              src={logindash}
              alt="logindash"
              className="object-contain object-left w-full h-full ml-auto"
            /> */}
            <div className="w-full h-full vhcenter">
              <div className="2xl:w-[500px] w-[270px] 5 relative">
                <motion.div
                  initial={{ opacity: 0, translateX: 30 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: "",
                    yoyo: Infinity,
                    delay: 0.5,
                    duration: 0.6,
                  }}
                  className="drop-shadow-2xl relative"
                >
                  <img src={widget1} alt="" className="w-full" />
                  {/* GLASSMORPHISAMS  */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      yoyo: Infinity,
                      delay: 1.2,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="isolate absolute w-[14%] h-[24%] -right-[7%] top-1/2 bg-white/10 shadow-lg ring-1 ring-white/80 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      yoyo: Infinity,
                      delay: 1.4,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="isolate absolute w-[10%] h-[13%] -right-[6%] -bottom-[8%] bg-white/10 shadow-lg ring-1 ring-white/80 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      yoyo: Infinity,
                      delay: 1.6,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="isolate absolute w-[24%] h-[28%] -left-[20%] -top-[10%] bg-white/10 shadow-lg ring-1 ring-white/60  backdrop-blur-[6px]"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      yoyo: Infinity,
                      delay: 1.8,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="isolate absolute w-[8%] h-[10%] -left-[24%] -top-[15%] bg-white/10 shadow-lg ring-1 ring-white/60  backdrop-blur-[6px]"
                  />
                </motion.div>
                <motion.div
                  className="w-[70%] -left-[16%] -bottom-[9%] absolute shadow-widget drop-shadow-2xl"
                  initial={{ opacity: 0, translateX: -30 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: "",
                    yoyo: Infinity,
                    delay: 0.9,
                    duration: 0.6,
                  }}
                >
                  <div className="relative w-full h-full">
                    <img src={widget2} alt="" className="w-full object-cover" />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        yoyo: Infinity,
                        delay: 2,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                      className="isolate absolute w-[20%] h-[32%] -left-[13%] top-[14%] bg-white/10 shadow-lg ring-1 ring-white/60  backdrop-blur-[6px]"
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="w-[55%] -top-[11%] -right-[16%] absolute shadow-widget  overflow-hidden drop-shadow-2xl"
                  initial={{ opacity: 0, translateY: 30 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: "",
                    yoyo: Infinity,
                    delay: 1,
                    duration: 0.6,
                  }}
                >
                  <img src={widget3} alt="" className="w-full object-cover" />
                </motion.div>
              </div>
            </div>
            {/* </div> */}
            <div className="top flex flex-col gap-3">
              <h1 className="text-2xl 2xl:text-5xl font-semibold">
                The simplest way to manage your organisation
              </h1>
              <p className="text-sm 2xl:text-xl !text-white !font-normal">
                Enter your credintials to access your account
              </p>
            </div>
            {/* <div className="w-full mx-auto">
              <div className="text-center">
                <ImageScroll />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
