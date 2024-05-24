import React, { useEffect, useState } from "react";
import { Button, Dropdown, message, Space, Menu } from "antd";
import { RiDraggable } from "react-icons/ri";
import Clogo from "../../assets/images/clogo.jpeg";
import { MdKeyboardArrowRight } from "react-icons/md";
import API from "../Api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { companyIdSet } from "../../Redux/slice";

const SelectCompany = () => {
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState(
    localStorage.getItem("companyId")
  );
  const [companyData, setCompanyData] = useState();
  const [selectedLabel, setSelectedLabel] = useState();
  const [organisationId, setOrganisationId] = useState(
    localStorage.getItem("organisationId")
  );
  const selectedCompany = companyData?.find(
    (item) => parseInt(item.companyId) === parseInt(selectedItemId)
  );
  // console.log(selectedCompany)
  const handleItemClick = (itemId) => {
    dispatch(companyIdSet(itemId));
    setSelectedItemId(itemId);
    localStorage.setItem("companyId", itemId);
  };

  const onClick = ({ key }) => {
    const selected = companyData?.find((item) => item.companyId === key);
    setSelectedLabel(companyData?.company || "");
    message.success({
      content: (
        <span>
          <span className="capitalize ">{selected?.company}</span>
          {` Selected`}
        </span>
      ),
      duration: 2,
    });
  };

  const getCompanyList = async () => {
    const result = await axios.post(
      API.HOST + API.GET_COMPANY_RECORDS + "/" + organisationId
    );
    const companyId = localStorage.getItem("companyId");
    if (companyId === null || companyId === undefined) {
      setSelectedItemId(result.data.tbl_company[0].companyId);
      localStorage.setItem("companyId", result.data.tbl_company[0].companyId);
    }
    setCompanyData(result.data.tbl_company);
  };

  useEffect(() => {
    setOrganisationId(localStorage.getItem("organisationId"));
    getCompanyList();
  }, []);

  return (
    <Dropdown
      // trigger="click"
      overlayStyle={{ top: "20px" }}
      overlay={
        <Menu
          onClick={onClick}
          selectedKeys={[selectedItemId]}
          selectable
          defaultSelectedKeys={selectedItemId}
          className="!ml-5 max-h-96 overflow-auto dark:bg-secondaryDark"
        >
          {companyData?.map((item) => (
            // <Menu.Item key={item.key}>{item.label}</Menu.Item>
            <Menu.Item
              key={item.companyId}
              onClick={() => {
                handleItemClick(item.companyId);
                window.location.reload();
              }}
              className=" !m-[2px] 2xl:!m-1 "
            >
              <Space>
                <RiDraggable />
                <div className="overflow-hidden rounded-lg w-7 2xl:w-8 h-7 2xl:h-8">
                  {item?.logo ? (
                    <img src={item?.logo} alt="" />
                  ) : (
                    <img src={Clogo} alt="" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] font-semibold capitalize 2xl:text-sm dark:text-white">
                    {item.company}
                  </p>
                  {/* <p className="flex items-center gap-1 para !text-[9px] 2xl:!text-xs">
                    <span>Team Plan</span> <PiDotOutlineFill />{" "}
                    <span>2.5K</span> members{" "}
                  </p> */}
                </div>
              </Space>
            </Menu.Item>
          ))}
        </Menu>
      }
      placement="right" // Dropdown will appear on the right side
    >
      <Button
        value={selectedLabel}
        onClick={(e) => e.preventDefault()}
        className="bg-secondaryWhite h-fit dark:bg-secondaryDark rounded-[10px] py-1.5 px-1.5 2xl:px-2 2xl:py-2"
      >
        {selectedCompany && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 overflow-hidden rounded-full 2xl:w-9 2xl:h-9 shrink-0">
                {selectedCompany?.logo ? (
                  <img src={selectedCompany?.logo} alt="" />
                ) : (
                  <img src={Clogo} alt="" />
                )}
              </div>
              <h1
                className="text-[10px] font-semibold capitalize truncate  2xl:text-sm dark:text-white"
                title={selectedCompany.company}
              >
                {selectedCompany.company}
              </h1>
            </div>
            <MdKeyboardArrowRight size={18} className="opacity-50 " />
            {/* <MdUnfoldMore size={18} /> */}
          </div>
        )}
      </Button>
    </Dropdown>
  );
};

export default SelectCompany;
