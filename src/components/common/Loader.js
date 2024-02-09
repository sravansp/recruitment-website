import React from "react";
import logo from "../../assets/images/logo.png"

export default function Loader() {
  return (
    <div className=" loder_center block justify-center items-center w-full " >
      <div className="pl w-full relative">
      <img src={logo} alt="" className=" absolute  w-56 z-50 p-5 top-6 left-3"/>

        <div className="pl__outer-ring"></div>
        <div className="pl__inner-ring"></div>
        <div className="pl__track-cover"></div>
        <div className="pl__ball">
          <div className="pl__ball-texture"></div>
          <div className="pl__ball-outer-shadow"></div>
          <div className="pl__ball-inner-shadow"></div>
          <div className="pl__ball-side-shadows"></div>
          {/* <div className=" logo_center"></div> */}
        </div>
      </div>
    </div>
  );
}
