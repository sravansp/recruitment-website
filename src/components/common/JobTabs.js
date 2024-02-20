import React, { useState, useMemo, useEffect } from "react";

import { motion } from "framer-motion";
import TableAnt from "./TableAnt";
import SearchBox from "./SearchBox";
import ToggleBtn from "./ToggleBtn";
import { Button, Dropdown } from "antd";
import { LuListFilter } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
import { FiSettings } from "react-icons/fi";
import { LuArrowDownUp } from "react-icons/lu";
import axios from "axios";

function JobTabs({
  tabs = [1, 2, 3, 4],
  data = [],
  deleteApi = "",
  updateApi = "",
  header = [],
  navigateBtn = [],
  navigate = true,
  actionID = "",
  buttonClick = () => {},
  clickDrawer = () => {},
  path = [],
  companyList = true,
  navigationClick = () => {},
  tablechange = false,
  children,
  activeOrNot = () => {},
  actionToggle = false,
  // ListApi=""
  addButtonName = "",
  exportButton = false,
  title = "",
  arabic = true,
  checkBox = true,
  tabClick = () => {},
}) {
  // const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [activeTab, setActiveTab] = useState(true)
  const [changeData, setChangedata] = useState(false);
  const [tabeName, setTabName] = useState("company");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.post("");
        setActiveTab(response.data);
      } catch (error) {
        console.error(error, "error");
      }
    };
    fetchdata();
  }, []);

  useMemo(() => {
    setChangedata(true);
  }, [activeTab]);
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  return (
    <div className="flex  gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 p-[6px] bg-[#FAFAFA] dark:bg-secondaryDark border border-black border-opacity-10 rounded-xl flex-wrap">
          {tabs?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                tabClick(tab.value);
                setActiveTab(tab.id);
                setTabName(tab.value);
              }}
              className={`${
                activeTab === tab.id ? "" : ""
              } text-xs 2xl:text-sm font-medium whitespace-nowrap px-3 h-8 2xl:h-10 relative group`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 z-10 rounded-md bg-accent"
                  transition={{ type: "spring", duration: 0.6 }}
                ></motion.div>
              )}
              <span
                className={`${
                  activeTab === tab.id
                    ? "relative z-20 text-white"
                    : " text-black dark:text-white group-hover:text-primary"
                }`}
              >
                {/* {tab.title} */}
                {"sdjhvd"}
              </span>
            </button>
          ))}
        </div>
      </div>
      <SearchBox className="mt-1 h-12"placeholder="Search jobs" />

      <ToggleBtn className="mt-2 ml-80" />
      <p className="mt-2">Show Stages</p>

      <Dropdown
        // menu={columnMenuItems.map((item, index) => ({
        //   ...item,
        //   key: index,
        // }))}
        //   menu={{ items }}
        placement="bottomRight"
        // trigger={["click"]}
        // open={dropdownVisible}
        // onOpenChange={(visible) => {
        //   console.log(visible);
        //   setDropdownVisible(visible);
        // }}
      >
        <Button
          className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA] gap-2"
          onClick={(e) => {
            // console.log(e);
            // e.stopPropagation(); // Prevent dropdown from closing
            // setDropdownVisible(!dropdownVisible);
          }}
          size={isSmallScreen ? "default" : "large"}
        >
          <span className="mr-2">{"Filters"}</span>
          <span className="ml-auto">
            <LuListFilter className="text-base 2xl:text-lg" />
          </span>
        </Button>
      </Dropdown>
      <Button className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA] gap-2" size={isSmallScreen ? "default" : "large"}>
      <span className="mr-2">{"Sort by"}</span>
      <span className="ml-auto">
            <LuArrowDownUp className="text-base 2xl:text-lg" />
          </span>
      </Button>
      <Button
        className="flex items-center justify-center h-full  font-medium bg-white dark:bg-black dark:text-white flex-nowrap gap-2"
        size={isSmallScreen ? "default" : "large"}
      >
        <FiSettings className="text-base 2xl:text-lg" />
      </Button>
    </div>
  );
}
export default JobTabs;
