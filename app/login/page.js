import Image from "next/image";
import React from "react";
import Google from "@/public/google.svg";


const Login = () => {
  return (
    <div className="w-full h-screen vhcenter">
      <div className="flex flex-col w-full gap-5 px-10 sm:w-96 sm:px-0">
        <div className="inline-flex flex-col items-center justify-start h-20 gap-4 ">
          <div className="text-black dark:text-white text-2xl sm:text-3xl font-semibold font-['Inter'] leading-10">
            Start your Application
          </div>
          <div className="text-black text-base dark:text-white font-semibold font-['Inter'] leading-snug">
            UI UX Designer{" "}
          </div>
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-4 h-44">
          <div className="px-4 py-2.5 bg-white rounded-lg shadow border w-full border-gray-300 justify-center items-center gap-3 inline-flex">
          <Image src={Google} />
            <div className="text-slate-700 text-base font-semibold font-['Inter'] leading-normal">
              Sign in with Google
            </div>
          </div>
          <div className="inline-flex items-center justify-center w-full gap-2 py-3 border rounded-lg shadow px-7 border-violet-600">
            <div className="text-indigo-600 text-base font-semibold font-['Inter'] leading-snug">
              Autofill with Resume
            </div>
          </div>
          <div className="inline-flex items-center justify-center w-full gap-2 py-3 border rounded-lg shadow px-7 bg-violet-600 border-violet-600">
            <div className="text-white text-base font-semibold font-['Inter'] leading-snug">
              Apply with Linkedin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
