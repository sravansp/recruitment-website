/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Dropdown, message } from "antd";
import Clogo from "../../assets/images/clogo.jpeg";
import API from "../Api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { companyIdSet } from "../../Redux/slice";
import { PiCaretDown, PiCheck } from "react-icons/pi";

const SelectCompany = () => {
  const dispatch = useDispatch();

  const [selectedItemId, setSelectedItemId] = useState(
    localStorage.getItem("companyId")
  );

  const [companyData, setCompanyData] = useState(null);

  const [selectedLabel, setSelectedLabel] = useState();

  const [organisationId, setOrganisationId] = useState(
    localStorage.getItem("organisationId")
  );

  const selectedCompany = companyData?.find(
    (item) => parseInt(item.companyId) === parseInt(selectedItemId)
  );

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const organisationId = localStorage.getItem("organisationId");
    if (companyId) {
      setSelectedItemId(companyId);
    }
    if (organisationId) {
      setOrganisationId(organisationId);
      getCompanyList(organisationId);
    }
  }, []);

  const handleItemClick = (itemId) => {
    dispatch(companyIdSet(itemId));
    setSelectedItemId(itemId);
    localStorage.setItem("companyId", itemId);
    window.location.reload();
  };

  const onClick = ({ key }) => {
    const selected = companyData?.find((item) => item.companyId === key);
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
      return error;
    }
  };

  const contentStyle = {
    // backgroundColor: token.colorBgElevated,
    // borderRadius: "6px",
    // boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    minWidth: "203px",
    maxHeight: "400px",
    overflow: "auto",
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
            {company?.logo ? (
              <img src={company?.logo} alt="" />
            ) : (
              <img src={Clogo} alt="" />
            )}
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
              {/* <div className="overflow-hidden border border-white rounded-full shadow-md 2xl:size-8 size-6 shrink-0">
                {selectedCompany?.logo ? (
                  <img src={selectedCompany?.logo} alt="" />
                ) : (
                  <img src={Clogo} alt="" />
                )}
              </div> */}
              <h1
                className="text-[10px] font-semibold capitalize truncate 2xl:text-sm dark:text-white opacity-70 hidden md:block"
                title={selectedCompany?.company || ""}
              >
                {selectedCompany?.company && selectedCompany.company.length > 7
                  ? `${selectedCompany.company.substring(0, 7)}...`
                  : selectedCompany?.company || ""}
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
