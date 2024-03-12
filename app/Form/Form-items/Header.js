import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function Header1() {
  return (
    <div>
    <div className="bg-white flex items-center     dark:bg-black dark:text-white h-[65px] w-full">
      <div className="flex mt-3 ml-5 float-end ">
        <Link href="/" className="rounded-full  size-9 borderb vhcenter text-primary">
          {/* <span className="inset-0 flex items-center justify-center bg-white rounded-md "> */}
            {/* <span className="flex items-center justify-center w-[35px] h-[36px]  rounded-full border-[1px]  bg-[#FAFAFA]"> */}
              <FaArrowLeft size={15}/>
            {/* </span> */}
          {/* </span> */}
        </Link>
        {/* <button className="w-16 border-2 border-#FDFDFD  rounded-md  text-primary mt-10 text-sm font-semibold ">
          <b>Edit</b>
        </button> */}
        <div className="h-divider" />
        <div className="flex-auto min-w-0 ml-5">
          <p className="text-sm font-semibold font-Inter] leading-6 text-gray-900 dark:text-white">
            Head of Director{" "}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500 truncate dark:text-gray-300">
            at Dubai, United Arab Emirates
          </p>
        </div>
      </div>
      
    </div>
    <div className="mt-4 divider-h"/>
    </div>
  );
}

export default Header1;
