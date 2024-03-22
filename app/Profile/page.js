"use client";
import Image from "next/image";
import FlexCol from '@/Components/ui/FlexCol'
import React, { useEffect, useState } from 'react'
import candidate from "@/public/Frame 427319140.png";

function profile() {
    const [primaryColor, setPrimaryColor] = useState('');
  useEffect(() => {
    
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);
  return (
    <div className="flex flex-col gap-6 py-10 container-wrapper mt-10">
        <div className="flex min-w-0 gap-x-4 pt-3 pl-5">
            <Image
              className="h-18 w-18 flex-none rounded-full bg-cover "
              src={candidate}
              alt=""
            />
            <div className="min-w-0 flex-auto mt-3">
                <p>Welcome back !</p>
              <p className="acco-h1">Grace Bennett Anderson</p>
            </div>
          </div>
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
                    <h1 className="acco-h1">My Application </h1>
                   
                  </div>
                </button>
              </h2>
              <div
                id={`acco-text-item`}
                role="region"
                aria-labelledby={`acco-title-item`}
                className="flex flex-col gap-6  justify-between w-full px-6 py-4"
              >
                
                
                
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default profile