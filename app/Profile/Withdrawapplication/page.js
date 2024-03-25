"use client";
import Image from "next/image";
import Navbar1 from '@/Components/ui/Navbar1'
import React, { useEffect, useState } from 'react'
import FlexCol from "@/Components/ui/FlexCol";
import ButtonClick from "@/Components/Button";
import Footer from "@/Components/ui/Footer";

function page() {
    const [primaryColor, setPrimaryColor] = useState('');
    useEffect(() => {
    
        const color = localStorage.getItem("themeColor");
        if (color) {
          setPrimaryColor(color);
        }
      }, []);
  return (
    <div>
         <div>
      <Navbar1/>
         <div className="flex flex-col gap-6 py-10 container-wrapper mt-10">
        
       <div className="flex flex-col gap-6">
        <FlexCol />
        <div className="relative  w-full mx-auto borderb rounded-md">
          <FlexCol />
          <div className="relative flex flex-col gap-12">
            <div className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <div className="text-left rtl:text-right">
                    <h1 className="acco-h1">Withdraw Application for Senior Front-End Developer? </h1>
                   
                  </div>
                </button>
              </h2>
              <div
                id={`acco-text-item`}
                role="region"
                aria-labelledby={`acco-title-item`}
                className="flex flex-col  gap-6  justify-between w-full px-6 py-4"
              >

<div className="flex flex-col items-start justify-start">
          <p className="para">
          Thanks again for your interest in Loyaltri Group. We are disappointed you have decided not to progress your journey to joining us. Please visit our careers site in the future for roles that may be suitable and of interest
          </p>
         
        </div>
        <div
            className="flex items-center  gap-2.5 p-1.5 mt-4 rounded-lg"
           
          >
            <ButtonClick buttonName="Withdraw" BtnType="primary" />
            <ButtonClick buttonName="Cancel" className={"!text-red-600"} />
            
          </div>
              </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default page