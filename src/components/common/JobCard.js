import { Card } from "antd";
import React, { useRef, useState } from "react";
import { BsFillLightningFill, BsThreeDotsVertical } from "react-icons/bs";

import { MdArrowBackIos, MdArrowForwardIos, MdMessage } from "react-icons/md";

function JobCard({
  card = false,
  selectcard =()=>{},
  options=[],
  renderContent ,


}) {

  const itemsPerPage = 6;
  const containerRef = useRef(0);
  const scrollAmount = 253;

  const slidemover = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };
  console.log(options)
  return (
    
    
    <div className="flex ">
      <div className="flex mt-10 ml-5 overflow-x-auto " ref={containerRef}>
        {options.map((each, index) => (
          <div key={index} className="flex items-center ">
             
            {index === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="253"
                height="74"
                viewBox="0 0 253 74"
                fill="none"
                className="hover:fill-violet-100 "
              >
                <path
                  d="M0.700684 6.05713C0.700684 2.74342 3.38698 0.0571289 6.70068 0.0571289H240.239L252.522 36.8679L240.239 73.6787H6.70068C3.38697 73.6787 0.700684 70.9924 0.700684 67.6787V6.05713Z"
                  fill="#FCFCFC"
                />
                <path
                  d="M1.20068 6.05713C1.20068 3.01956 3.66312 0.557129 6.70068 0.557129H239.879L251.995 36.8679L239.879 73.1787H6.70068C3.66311 73.1787 1.20068 70.7163 1.20068 67.6787V6.05713Z"
                  stroke="black"
                  strokeOpacity="0.1"
                />
                <text
                  x="30"
                  y="25"
                  fill="black"
                  className="font-semibold text-sm"
                >
                  {each.title}
                </text>
                <foreignObject x="30" y="40" width="34" height="26">
                  <p className="flex items-center justify-center rounded-md bg-violet-100 font-semibold text-sm px-1 py-1">
                    {/* {each.nummber} */}
                  </p>
                </foreignObject>
                <foreignObject x="210" y="50" width="100" height="40">
                  <button
                    style={{ color: "#6A4BFC", width: "2px", height: "13px" }}
                  >
                    <BsThreeDotsVertical />
                  </button>
                </foreignObject>
              </svg>
            )}
            {index > 0 && index < options.length - 1 && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="253"
                  height="74"
                  viewBox="0 0 253 74"
                  fill="none"
                  className="hover:fill-violet-100"
                >
                  <path
                    d="M0.521973 0.0571289H240.632L252.344 36.8679L240.632 73.6787H0.521973L12.2337 36.8679L0.521973 0.0571289Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M240.266 73.1787H1.20575L12.7102 37.0195L12.7584 36.8679L12.7102 36.7163L1.20575 0.557129H240.266L251.819 36.8679L240.266 73.1787Z"
                    stroke="black"
                    strokeOpacity="0.1"
                  />
                  <text
                    x="30"
                    y="25"
                    fill="black"
                    className="font-semibold text-sm"
                  >
                    {/* {each.label} */}{each.title}
                  </text>
                  <foreignObject x="30" y="40" width="34" height="26">
                    <p className="flex items-center justify-center rounded-md bg-violet-100 font-semibold text-sm px-1 py-1">
                      {/* {each.nummber} */}
                    </p>
                  </foreignObject>
                  <foreignObject x="75" y="43" width="34" height="26" style={{ color: "gray" }} size={18}>
                    {/* {each.icons1} */}
                  </foreignObject>
                  <foreignObject x="100" y="43" width="34" height="26"  style={{ color: "#FF9900" }}
                      size={18}>
                    {/* {each.icons2} */}
                  </foreignObject>
                  <foreignObject x="210" y="50" width="100" height="40">
                    <button
                      style={{ color: "#6A4BFC", width: "2px", height: "13px" }}
                    >
                      <BsThreeDotsVertical />
                    </button>
                  </foreignObject>
                </svg>
              </div>
            )}
            {index === options.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="211"
                height="74"
                viewBox="0 0 211 74"
                fill="none"
                className="hover:fill-violet-100"
              >
                <path
                  d="M0.34375 0.0571289H210.344V73.6787H0.34375L10.0698 36.8679L0.34375 0.0571289Z"
                  fill="url(#paint0_linear_367_20776)"
                />
                <path
                  d="M0.993017 0.557129H209.844V73.1787H0.993016L10.5532 36.9956L10.5869 36.8679L10.5532 36.7402L0.993017 0.557129Z"
                  stroke="black"
                  strokeOpacity="0.1"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_367_20776"
                    x1="168.974"
                    y1="0.0571289"
                    x2="168.974"
                    y2="73.6787"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#FDFDFD" />
                  </linearGradient>
                </defs>
                <text
                  x="30"
                  y="25"
                  fill="black"
                  className="font-semibold text-sm"
                >
                  {each.title}
                </text>

                <foreignObject x="30" y="40" width="34" height="26">
                  <p className="flex items-center justify-center rounded-md bg-violet-100 font-semibold text-sm px-1 py-1">
                    {/* {each.nummber} */}
                  </p>
                </foreignObject>
                <foreignObject x="75" y="43" width="34" height="26"style={{ color: "gray" }} size={18} >
                  {/* {each.icons2} */}
                </foreignObject>
                <foreignObject x="100" y="43" width="34" height="26"style={{ color: "#FF9900" }} size={19}>
                  {/* {each.icons2} */}
                </foreignObject>

                <foreignObject x="190" y="50" width="100" height="40">
                  <button
                    style={{ color: "#6A4BFC", width: "2px", height: "13px" }}
                  >
                    
                    <BsThreeDotsVertical />
                  </button>
                </foreignObject>
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="float-end flex ">
        <button
          className="w-10  border-2 border-#FDFDFD    text-primary mt-10"
          onClick={slidemover}
        >
          <span className=" inset-0 flex items-center justify-center rounded-md bg-white">
            <span className="flex items-center justify-center w-6 h-6  rounded-full border-2 border-blue-700  bg-violet-100">
              <MdArrowForwardIos
                style={{ width: "10.69px", height: "17.37", color: "black" }}
              />
            </span>
          </span>
        </button>
        {/* <button className="w-16 border-2 border-#FDFDFD  rounded-md  text-primary mt-10 text-sm font-semibold ">
          <b>Edit</b>
        </button> */}
      </div>
    </div>
  
  );
}

export default JobCard;
