import Image from "next/image";
import React from 'react'
import logo from '@/public/brand/logo.png'
import candidate from "@/public/Frame 427319140.png";

function Navbar1() {
  return (
    <nav className="bg-[#6A4BFC] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-[74px]">
        {/* First div with "Loyaltri" */}
        <div className="flex items-center">
          <div className="flex">
            {/* <Image src={logo} alt="logo" width={40} height={40} /> */}
            <span className="h1 !text-white ml-4">Loyaltri</span>
          </div>
        </div>

        {/* Second div with image and text */}
        <div className="flex items-center ml-auto">
          <Image className="h-20 w-20 flex-none rounded-full" src={candidate} alt="" />
          <div className="">
            <p className="h6 !text-white">Grace Bennet</p>
            <p className="para !text-gray-300">gracebennet@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
};

export default Navbar1