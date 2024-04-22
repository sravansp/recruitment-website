import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space, theme, message } from "antd";

import { RiDraggable } from "react-icons/ri";
import Clogo from "../../assets/images/clogo.jpeg";
import { MdKeyboardArrowRight } from "react-icons/md";
import API from "../Api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { companyIdSet } from "../../Redux/slice";
import { json } from "d3";
import { PiCaretDown, PiCheck } from "react-icons/pi";

const { useToken } = theme;

const SelectCompany = () => {
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState(
    localStorage.getItem("companyId")
  ); // Initialize with null
  const [companyData, setCompanyData] = useState(null); // Initialize with null
  const [selectedLabel, setSelectedLabel] = useState();
  const [organisationId, setOrganisationId] = useState(
    localStorage.getItem("organisationId")
  );
  const selectedCompany = companyData?.find(
    (item) => parseInt(item.companyId) === parseInt(selectedItemId)
  );

  useEffect(() => {
    // Fetch data from localStorage
    const companyId = localStorage.getItem("companyId");
    const organisationId = localStorage.getItem("organisationId");

    // If companyId is available in localStorage, set it to state
    if (companyId) {
      setSelectedItemId(companyId);
    }

    // If organisationId is available in localStorage, fetch company data
    if (organisationId) {
      setOrganisationId(organisationId);
      getCompanyList(organisationId);
    }
  }, []); // Run this effect only once when the component mounts

  const handleItemClick = (itemId) => {
    dispatch(companyIdSet(itemId));
    setSelectedItemId(itemId);
    localStorage.setItem("companyId", itemId);
    // console.log(itemId);
    window.location.reload();
  };

  const onClick = ({ key }) => {
    const selected = companyData?.find((item) => item.companyId === key);
    console.log(selected);
    setSelectedLabel(selected?.company || "");
    handleItemClick(key);
    message.success({
      content: (
        <span>
          <span className="capitalize ">{selectedLabel}</span>
          {` Selected`}
        </span>
      ),
      duration: 2,
    });
  };

  // Function to fetch company data
  const getCompanyList = async (organisationId) => {
    try {
      const result = await axios.post(
        API.HOST + API.GET_COMPANY_RECORDS + "/" + organisationId
      );

      // // Set company data to state
      // setCompanyData(result.data.tbl_company);

      // // If companyId is not set in localStorage, set it to the first company
      if (!selectedItemId) {
        setSelectedItemId(result.data.tbl_company[0].companyId);
        localStorage.setItem("companyId", result.data.tbl_company[0].companyId);
      }

      const companyId = localStorage.getItem("companyId");
      if (companyId === null || companyId === undefined) {
        setSelectedItemId(result.data.tbl_company[0].companyId);
        localStorage.setItem("companyId", result.data.tbl_company[0].companyId);
      }
      setCompanyData(result.data.tbl_company);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };
  const { token } = useToken();
  const contentStyle = {
    // backgroundColor: token.colorBgElevated,
    // borderRadius: "6px",
    // boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    minWidth: "203px",
    borderRadius: "12.106px",
    boxShadow:
      "0px 29.49px 46.341px 0px rgba(6, 6, 6, 0.10), 0px 29.49px 46.341px 0px rgba(6, 6, 6, 0.10)",
  };

  const items = companyData?.map((company) => ({
    key: company.companyId.toString(),
    label: (
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="overflow-hidden rounded-full size-[28px] 2xl:size-[30px]">
            <img src={Clogo} alt="" />
          </div>
          <div className="flex flex-col">
            <p className="text-[11px] font-semibold truncate capitalize 2xl:text-xs dark:text-white">
              {company.company}
            </p>
            <p className="text-[7px] 2xl:text-[10px] text-grey">
              <span>{company.url}</span>
            </p>
          </div>
        </div>
        {selectedItemId && company.companyId.toString() === selectedItemId && (
          <div className="text-primary dark:text-white">
            <PiCheck size={16} />
          </div>
        )}
      </div>
    ),
  }));
  return (
    <Dropdown
      menu={{
        items,
        onClick: onClick,
        selectable: true,
        selectedKeys: [selectedItemId?.toString() || ""],
        defaultSelectedKeys: [selectedItemId?.toString() || ""],
      }}
      trigger={["click"]}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
        </div>
      )}
    >
      <button
        onClick={(e) => e.preventDefault()}
        title={selectedCompany?.company || ""}
        className="bg-secondaryWhite dark:bg-secondaryDark h-8 2xl:h-10 rounded-full vhcenter p-1 md:px-4 w-14 md:min-w-32 2xl:min-w-44 overflow-hidden"
      >
        {selectedCompany && (
          <div className="flex items-center justify-between overflow-hidden ">
            <div className="flex items-center gap-2 w-28 2xl:w-36">
              <div className="overflow-hidden rounded-full size-[28px] 2xl:size-[30px] md:hidden">
                <img src={Clogo} alt="" />
              </div>
              <h1
                className="text-[10px] font-semibold capitalize truncate 2xl:text-sm dark:text-white opacity-70 hidden md:block"
                title={selectedCompany?.company || ""}
              >
                {selectedCompany?.company || ""}
              </h1>
            </div>
            <div className="shrink-0">
            <PiCaretDown size={18} className="opacity-50  dark:text-white" />
            </div>
          </div>
        )}
      </button>
    </Dropdown>
  );
};
export default SelectCompany;
