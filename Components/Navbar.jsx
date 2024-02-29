import Image from "next/image";
import React from "react";
import logo from '@/public/brand/logo.png'
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-transparent">
      <header class="text-gray-600 body-font container-wrapper">
        <div class="flex flex-wrap py-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
         <Image src={logo} alt="logo" width={80} height={80} />
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center text-base font-semibold justify-center transition-all duration-300">
            <a class="mr-5 hover:text-gray-900 cursor-pointer">Home</a>
            <a class="mr-5 hover:text-gray-900 cursor-pointer">Jobs worldwide</a>
            <a class="mr-5 hover:text-gray-900 cursor-pointer">Menu</a>
          </nav>
          <div class=" cursor-pointer hover:text-black transition-all duration-300">
            <HiOutlineMenuAlt3 size={23} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
