import Image from "next/image";
import React from "react";
import logo from '@/public/brand/logo.png'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Switcher from "./Switcher";

const Navbar = () => {
  return (
    <div className="absolute top-0 z-[999] w-full bg-transparent">
      <header className="text-gray-600 body-font container-wrapper">
        <div className="flex flex-col flex-wrap items-center py-5 md:flex-row">
          <a className="flex items-center mb-4 font-medium text-gray-900 cursor-pointer title-font md:mb-0">
         <Image src={logo} alt="logo" width={80} height={80} />
          </a>
          <nav className="flex flex-wrap items-center justify-center text-base font-semibold transition-all duration-300 md:ml-auto">
            <a className="mr-5 cursor-pointer hover:text-gray-900">Home</a>
            <a className="mr-5 cursor-pointer hover:text-gray-900">Jobs worldwide</a>
            <a className="mr-5 cursor-pointer hover:text-gray-900">Menu</a>
          </nav>
          <Switcher />
          <div className="transition-all duration-300 cursor-pointer hover:text-black">
            <HiOutlineMenuAlt3 size={23} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
