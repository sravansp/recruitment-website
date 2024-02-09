import React from "react";
import {
  BiCommand,
  BiDotsVerticalRounded,
  BiFilterAlt,
  BiSearchAlt,
} from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

import { FiMenu } from "react-icons/fi";
import { PiDotOutlineFill } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

import profile from "../../assets/images/Ellipse 71.svg";

export default function List() {
  return (
    <div className="z-0">
      <div className="flex justify-between p-4">
        <div>
          <h1 className="text-xl">Employee</h1>
          <p className="mb-0 text-xs opacity-50">
            Manage your team members and add new employee
          </p>
        </div>
        <div className=" gap-4">
          <button className="p-2 border text-xs  rounded-lg mx-1">
            Export
          </button>
          <button className="p-2 bg-primary text-xs text-white rounded-lg mx-1">
            <span>+</span>
            Add Employee
          </button>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div className="flex gap-2 items-center">
          <div className="relative border rounded-lg w-56">
            <input
              type="text"
              placeholder="Search"
              className="p-1  ml-5 w-48 focus:border-none"
            />
            <BiSearchAlt className=" absolute top-2.5 left-2 opacity-60" />
          </div>
          <div className="relative">
            <span className="p-1.5 text-sm pl-6 border rounded-lg text-[#9c9b9b]">
              Filter
            </span>
            <BiFilterAlt className="absolute top-1 left-1 opacity-60  " />
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <FiMenu className=" hover:bg-slate-200 rounded-sm p-1 text-2xl" />
          <BiCommand className=" hover:bg-slate-200 rounded-sm p-1 text-2xl" />
          <FaUsers className=" hover:bg-slate-200 rounded-sm p-1 text-2xl" />
          <BiDotsVerticalRounded className=" hover:bg-slate-200 rounded-sm p-1 text-2xl" />
        </div>
      </div>
      <div className="flex  pl-5">
        <div className="flex items-center bg-green-100 rounded-full p-0.5">
          <PiDotOutlineFill className="mb-0  text-green-700" />

          <span className="text-xs text-green-700">Active 38</span>
          <IoMdClose className="px-1 text-green-700 text-lg" />
        </div>
        <div className=" flex items-center pl-2">
          <p className="flex text-xs opacity-90 mb-0">Clear Filter</p>
        </div>
      </div>
      <div className=" p-4">
        <table className="w-full ">
          <thead className="border m-2" style={{ borderRadius: 20 }}>
            <tr className=" text-[#646262] text-start text-sm my-2 ">
              <th className=" text-start p-2">Name</th>
              <th className=" text-start"> Status</th>
              <th className=" text-start">Job Title</th>
              <th className=" text-start"> Department</th>
              <th className=" text-start"> Join Date</th>
              <th className=" text-start"> Team</th>
              <th className=" text-start"> Action</th>
            </tr>
          </thead>
          <tbody className="m-2">
            <tr className=" text-xs my-2 ">
              <td className="flex gap-2 items-center p-1">
                <img src={profile} alt="" className=" w-8 my-2" />
                Mark
              </td>
              <td className="  ">
                <div className="flex item-center">
                  <PiDotOutlineFill className="mb-0 text-lg text-green-600" />
                  <span className="text-green-600 ">Active</span>
                </div>
              </td>
              <td>product Design</td>
              <td>finance</td>
              <td>16/2/2024</td>
              <td>
                <div className=" flex gap-2 ">
                  <span className="p-1 bg-slate-200 rounded-xl">
                    Engineering
                  </span>
                  <span className="p-1 bg-red-100 rounded-xl">Engineering</span>
                  <span className="p-1 bg-slate-200 rounded-xl">+4</span>
                </div>
              </td>
              <td>
                <BiDotsVerticalRounded className="p-1 text-2xl" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
