import React from 'react'
import { PiChatCenteredDotsFill, PiPhoneCallFill } from 'react-icons/pi';



const newApplicants = [
    {
      name: "Noel Mariano",
      img: "https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg",
      designation: "jr.UI/UX Designer",
      Type: "Sick Leave",
      Action: "Request",
      Date1: "Feb 20",
      Date2: "2024(1,Day)",
      Status: "Pending",
    },
    {
      name: "Loki Bright",
      img: "https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg",
      designation: "jr.UI/UX Designer",
      Type: "Late Entry",
      Action: "Action",
      Date1: "Feb 20",
      Date2: "2024-30 mins Late",
      Status: "Pending",
    },
    {
      name: "Joshua Wilson",
      img: "https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg",
      designation: "jr.UI/UX Designer",
      Type: "Vacation Leave",
      Action: "Request",
      Date1: "Feb 21",
      Date2: "2024 to Feb-27 2024(4-days)",
      Status: "Pending",
    },
    {
      name: "Loki Bright",
      img: "https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg",
      designation: "jr.UI/UX Designer",
      Type: "Late Entry",
      Action: "Action",
      Date1: "Feb 20",
      Date2: "2024-30 mins Late",
      Status: "Pending",
    },
    {
      name: "Joshua Wilson",
      img: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yX3Bob3RvX29mX2FfYmxhY2tfYnVzaW5lc3NtYW5faXNvbGF0ZWRfb25fb2ZmX19lZmMxZDllNC1iNzQ5LTQ2NzMtYjRmMS1lYjI0NTBiYzNiOGRfMS5qcGc.jpg",
      designation: "jr.UI/UX Designer",
      Type: "Vacation Leave",
      Action: "Request",
      Date1: "Feb 21",
      Date2: "2024 to Feb-27 2024(4-days)",
      Status: "Pending",
    },
    {
      name: "Joshua Wilson",
      img: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yX3Bob3RvX29mX2FfYmxhY2tfYnVzaW5lc3NtYW5faXNvbGF0ZWRfb25fb2ZmX19lZmMxZDllNC1iNzQ5LTQ2NzMtYjRmMS1lYjI0NTBiYzNiOGRfMS5qcGc.jpg",
      designation: "jr.UI/UX Designer",
      Type: "Vacation Leave",
      Action: "Request",
      Date1: "Feb 21",
      Date2: "2024 to Feb-27 2024(4-days)",
      Status: "Pending",
    },
    {
      name: "Joshua Wilson",
      img: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yX3Bob3RvX29mX2FfYmxhY2tfYnVzaW5lc3NtYW5faXNvbGF0ZWRfb25fb2ZmX19lZmMxZDllNC1iNzQ5LTQ2NzMtYjRmMS1lYjI0NTBiYzNiOGRfMS5qcGc.jpg",
      designation: "jr.UI/UX Designer",
      Type: "Vacation Leave",
      Action: "Request",
      Date1: "Feb 21",
      Date2: "2024 to Feb-27 2024(4-days)",
      Status: "Pending",
    },
  ];
const NewApplicants = () => {
  return (
    <div className="flex flex-col gap-5 overflow-auto h-[250px] xl:h-[285px]">
        {newApplicants.map((data, i) => (
          <div className="flex flex-col gap-2" key={i}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="overflow-hidden border-2 border-white rounded-full shadow-md 2xl:size-10 size-8 shrink-0">
                  <img
                    src={data.img}
                    alt="image"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="pblack">
                    {data.name}
                  </p>
                  <p className=" 2xl:text-xs text-[9px]">
                  <span className='font-medium text-grey'>Applied for </span> <span className='font-semibold text-primary'>{data.designation}
                  </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs actions 2xl:text-sm dark:text-white">
                <a href="" className="overflow-hidden text-black text-opacity-50 rounded-full dark:text-white size-7 vhcenter bg-primaryalpha/5">
                  {" "}
                  <PiPhoneCallFill />
                </a>
                <a href="" className="overflow-hidden text-black text-opacity-50 rounded-full dark:text-white size-7 vhcenter bg-primaryalpha/5">
                  {" "}
                  <PiChatCenteredDotsFill />
                </a>
              </div>
              {/* Add a horizontal line after each item except for the last one */}
            </div>
          </div>
        ))}
      </div>
  )
}

export default NewApplicants