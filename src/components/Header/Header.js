import React, { useRef, useState,useEffect } from "react";
import { useSelector } from "react-redux";
import DarkModeSwitch from "./DarkModeSwitch";
import { RiVoiceprintFill } from "react-icons/ri";
import { RiCommandFill } from "react-icons/ri";
import ProfileDropdown from "./ProfileDropdown";
import { CgMenuLeft } from "react-icons/cg";
import Notification from "./Notification";
import SelectCompany from "./SelectCompany";

export default function Header() {
  const hamburger = useSelector((state) => state.layout.hamburger);
// console.log(hamburger);
  const [theamMode, setTheamMode] = useState("1");


  const radios = [
    { name: "Active", value: "1" },
    { name: "Radio", value: "2" },
  ];
  const searchInputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    // Check if the pressed key is "Control" + "k"
    if (event.ctrlKey && event.key === "k") {
      // Prevent the default behavior (e.g., moving the cursor to the beginning of the input)
      event.preventDefault();

      // Focus the search input
      searchInputRef.current.focus();
    }
  };
  const [userInfo, setUserInfo] = useState({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    // Fetching user data from localStorage
    const loginData = JSON.parse(localStorage.getItem('LoginData'));
    
    // Extracting required information
    const { firstName, lastName, email: userEmail, profilePicture: userProfilePicture } = loginData.userData;
    const combinedName = `${firstName} ${lastName}`;

    // Storing information in state
    setFullName(combinedName);
    setEmail(userEmail);
    setProfilePicture(userProfilePicture);
    setUserInfo(loginData.userData); // If you need to store the entire user data
  }, []);
  return (
    // <!-- component -->
    <nav
      className={` bg-white w-full grid grid-cols-12 relative justify-end items-center mx-auto px-4 lg:px-8 2xl:h-[76px] dark:bg-lightdark border-b border-opacity-10 dark:border-none py-[14px] z-[999]`}
    >
      <div className={` ${hamburger == false ? "sm:col-span-2 hidden brand-name lg:block" : "sm:col-span-0 hidden"}`}>
      {hamburger == false &&  <h1 className="text-sm font-semibold 2xl:text-lg text-primary">
      <span className="font-bold uppercase">Loyaltri</span> <span className="uppercase text-[#707070] font-light">Recruitment</span>
        </h1> }  
      </div>
      {/* hamburger */}
      <div className="text-black sm:col-span-0 dark:text-white lg:hidden">
        <CgMenuLeft size={30} />
      </div>
      <div className={` ${hamburger == false ? "sm:col-span-2" : "sm:col-span-4"}`}>
      <SelectCompany />
      </div>
      {/* <!-- search bar --> */}
      <div className="justify-end hidden sm:col-span-5 lg:col-span-4 xl:col-span-3 sm:flex">
        <div className="sm:flex w-max flex-shrink flex-grow-0 items-center justify-start py-[10px] px-4 h-8 2xl:h-10 bg-secondaryWhite dark:bg-secondaryDark rounded-full gap-3">
          <RiVoiceprintFill className=" dark:text-white text-md 2xl:text-lg" />

         <input
          type="text"
          placeholder="Search or command"
          className="text-xs bg-transparent border-none outline-none 2xl:text-sm dark:text-white"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
        />
         <div className="flex gap-1">
          <div className="bg-[#E0E0E0] dark:bg-white rounded p-[2px] w-[18px] flex items-center justify-center text-black text-opacity-50 h-[18px]">
            <span className="text-xs 2xl:text-sm">K</span>
          </div>
          <div className="bg-[#E0E0E0] dark:bg-white rounded p-[2px] w-[18px] flex items-center justify-center text-black text-opacity-50 h-[18px]">
            <RiCommandFill className="text-base 2xl:text-md"/>
          </div>
        </div>
        </div>
      </div>
      {/* <div className="hidden sm:flex flex-shrink flex-grow-0 items-center justify-start py-[10px] px-4 h-8 2xl:h-10 bg-secondaryWhite dark:bg-secondaryDark rounded-full gap-3">
        <RiVoiceprintFill className=" dark:text-white text-md 2xl:text-lg" />

        <input
          type="text"
          placeholder="Search or command"
          className="text-xs bg-transparent border-none outline-none 2xl:text-sm dark:text-white"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
        />
        <div className="flex gap-1">
          <div className="bg-[#E0E0E0] dark:bg-white rounded p-[2px] w-[18px] flex items-center justify-center text-black text-opacity-50 h-[18px]">
            <span className="text-xs 2xl:text-sm">K</span>
          </div>
          <div className="bg-[#E0E0E0] dark:bg-white rounded p-[2px] w-[18px] flex items-center justify-center text-black text-opacity-50 h-[18px]">
            <RiCommandFill className="text-base 2xl:text-md"/>
          </div>
        </div>
      </div> */}
      {/* <!-- end search bar --> */}
      <div className="flex justify-end col-span-6 sm:col-span-2">
        <DarkModeSwitch />
      </div>
      {/* <!-- login --> */}
      <div className="flex justify-end col-span-5 sm:col-span-2 lg:col-span-2 xl:col-span-3">
        <div className="flex-initial">
          <div className="relative flex items-center justify-end">
            <Notification />

            <ProfileDropdown
            Name={fullName}
            Email={email}
            Profile={profilePicture}
            />
          </div>
        </div>
      </div>
      {/* <!-- end login --> */}
    </nav>
  );
}
