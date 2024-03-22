"use client";
import Image from "next/image";
import React from "react";
import Google from "@/public/google.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const handleSignInWithGoogle = () => {
    router.push("/Form");
  };

  return (
    <div className="w-full h-screen vhcenter">
      <div className="flex flex-col w-full gap-5 px-10 sm:w-96 sm:px-0">
        <div className="inline-flex flex-col items-center justify-start h-20 gap-4 ">
          <div className="text-2xl font-semibold leading-10 text-black dark:text-white sm:text-3xl">
            Start your Application
          </div>
          <div className="text-base font-semibold text-black dark:text-white">
            UI UX Designer
          </div>
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-4 h-44">
          <Link
            href="/Form"
            className="px-4 py-2.5 cursor-pointer bg-white rounded-lg shadow border w-full border-gray-300 justify-center items-center gap-3 inline-flex"
          >
            <Image src={Google} />
            <div className="text-base font-semibold text-slate-700 ">
              Sign in with Google
            </div>
          </Link>
          <Link
            href="/Form"
            className="inline-flex items-center justify-center w-full gap-2 py-3 border rounded-lg shadow cursor-pointer px-7 border-violet-600"
          >
            <div className="text-base font-semibold text-indigo-600">
              Autofill with Resume
            </div>
          </Link>
          <Link
            href="/Form"
            className="inline-flex items-center justify-center w-full gap-2 py-3 border rounded-lg shadow cursor-pointer px-7 bg-violet-600 border-violet-600"
          >
            <div className="text-base font-semibold text-white">
              Apply with Linkedin
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
