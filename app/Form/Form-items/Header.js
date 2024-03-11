import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function Header1() {
  return (
    <div>
    <div className="bg-white flex items-center     dark:bg-black dark:text-white h-[65px] w-full">
      <div className="float-end flex mt-3 ml-5 ">
        <button className="w-10     text-primary ">
          <span className=" inset-0 flex items-center justify-center rounded-md bg-white">
            <span className="flex items-center justify-center w-[35px] h-[36px]  rounded-full border-[1px]  bg-[#FAFAFA]">
              <FaArrowLeft
                style={{ width: "10.69px", height: "10px", color: "#8223FF" }}
              />
            </span>
          </span>
        </button>
        {/* <button className="w-16 border-2 border-#FDFDFD  rounded-md  text-primary mt-10 text-sm font-semibold ">
          <b>Edit</b>
        </button> */}
        <div className="h-divider" />
        <div className="min-w-0 flex-auto ml-5">
          <p className="text-sm font-semibold font-Inter] leading-6 text-gray-900">
            Head of Director{" "}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            at Dubai, United Arab Emirates
          </p>
        </div>
      </div>
      
    </div>
    <div className="divider-h mt-4"/>
    </div>
  );
}

export default Header1;
