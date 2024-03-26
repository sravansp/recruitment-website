import Image from "next/image";
import React from "react";
import logo from '@/public/brand/logo.png'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import Switcher from "./Switcher";

const Navbar = () => {
  return (
    <div className="absolute top-0 z-[999] w-full bg-transparent">
      <header className="text-gray-600 body-font container-wrapper">
        <div className="flex flex-row items-center justify-between py-5">
          <a className="flex items-center font-medium text-gray-900 cursor-pointer title-font md:mb-0">
         {/* <Image src={logo} alt="logo" width={80} height={80} /> */}
         <p className= "h1  !text-[#6A4BFC] !font-[Red Hat Display] pr-2">Loyaltri</p>
<p className="h2">RECRUITMENT</p>
        
          </a>
          {/* <nav className="flex flex-wrap items-center justify-center text-base font-semibold transition-all duration-300 md:ml-auto">
            <a className="mr-5 cursor-pointer hover:text-gray-900">Home</a>
            <a className="mr-5 cursor-pointer hover:text-gray-900">Jobs worldwide</a>
            <a className="mr-5 cursor-pointer hover:text-gray-900">Menu</a>
          </nav> */}
          {/* <Switcher /> */}
          {/* <div className="transition-all duration-300 cursor-pointer hover:text-black">
            <HiOutlineMenuAlt3 size={23} />
          </div> */}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
