import React from "react";
import FlexCol from "@components/ui/FlexCol";
import Dropdown from "@components/ui/Dropdown";
import FormInput from "@components/ui/FormInput";

function PersonalDetails() {
  const primaryColor = localStorage.getItem("mainColor");

  return (
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
                  <h1 className="acco-h1">Personal Information </h1>
                  <p className="para">lorem ipsum dummy text dolar sit.</p>
                </div>
              </button>
            </h2>
            <div
              id={`acco-text-item`}
              role="region"
              aria-labelledby={`acco-title-item`}
              className="flex flex-col gap-6  justify-between w-full px-6 py-4"
            >
              <div className="grid  grid-cols-2 sm:grid-cols-6 gap-4">
                <Dropdown
                  title={"Prefix"}
                  placeholder={"Mr"}
                  className="!text-[#344054]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  title={"First Name"}
                  placeholder={"First Name"}
                  className="!text-[#344054]"
                />
                <FormInput
                  title={"Last Name"}
                  placeholder={"Last Name"}
                  className="!text-[#344054]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  title={"Email"}
                  placeholder={"Email Address"}
                  className="!text-[#344054]"
                />
                <Dropdown
                  title={"Phone Number"}
                  placeholder={"1234656987"}
                  className="!text-[#344054]"
                />
              </div>
              <div className="relative max-w-[1070px] sm:w-[492px] w-full borderb rounded-md h-24 bg-[#FAFAFA]">
                <div className="flex min-w-0 gap-x-4 pt-5 pl-5">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src=""
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      Click to upload or drag and drop{" "}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      PDF, DOCX Format only (5 mb max)
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Dropdown
                  title={"Location"}
                  placeholder={"United Arab Emirates"}
                  className="!text-[#344054]"
                />
                <FormInput
                  title={"City or Town"}
                  placeholder={"Type here..."}
                  className="!text-[#344054]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  title={"Address Line"}
                  placeholder={"Type here..."}
                  className="!text-[#344054]"
                />
                <Dropdown
                  title={"Postal Code"}
                  placeholder={"Type here..."}
                  className="!text-[#344054]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
