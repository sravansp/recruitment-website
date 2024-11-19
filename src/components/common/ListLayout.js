/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Arrow_Top from "../../assets/images/Vector.svg";
import Arrow_Bottom from "../../assets/images/Vector_bottom.svg";
import img from "../../assets/images/Rectangle 363.png";
import axios from "axios";
import API from "../Api";
import { MdContentCopy, MdDelete, MdEdit } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { HiOutlineDotsVertical, HiOutlineMail } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../../assets/images/image 380.png";
import { Popover, Switch } from "antd";
import { AiOutlineCloudDownload } from "react-icons/ai";
import ButtonClick from "./Button";

export default function ListLayout({
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
}) {
  const [checked, setChecked] = useState();

  const [btnBackgroundColor, setBtnBackgroundColor] = useState(0);

  const [btnName, setBtnName] = useState(navigateBtn[0]?.value);

  const [company, setCompany] = useState([]);

  const [companyData, setCompanyData] = useState([]);

  const [switches, setSwitches] = useState([]);

  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (data) {
      setSwitches([...data]);
      setListData([...data]);
      // togglefun();
      // data?.map(async(each)=>{
      // //  await setActiveId([each.companyId]);
      //  activeId.push(each.companyId)
      //  setToggleBtn()
      // })
    }
  }, [btnBackgroundColor, data]);

  const deleteRecord = async (e) => {
    const result = await axios.post(API.HOST + deleteApi + "/" + e);
    if (result.data.status === 200) {
      window.location.reload();
    }
  };

  const getCompany = async () => {
    const result = await axios.get(API.HOST + API.GET_COMPANY_RECORDS);
    if (result.status === 200) {
      // setCompanyList()
      setCompanyData({
        company: result.data?.tbl_company[0]?.company,
        companyId: result.data?.tbl_company[0]?.companyId,
        url: result.data?.tbl_company[0]?.url,
        logo: result.data?.tbl_company[0]?.logo,
      });
      result.data?.tbl_company?.map((each, i) => {
        if (parseInt(each.isActive) === 1) {
          company.push({
            id: i + 1,
            company: each.company,
            companyId: each.companyId,
            url: each.url,
            logo: each.logo,
          });
        }
      });
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const handleToggleList = (id, checked) => {
    setListData(
      (prevSwitches) =>
        prevSwitches?.map((sw) =>
          sw?.[actionID] === id
            ? { ...sw, isActive: checked === true ? 1 : 0 }
            : sw
        )
      // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
    );
  };

  const handleToggle = (id, checked) => {
    setSwitches(
      (prevSwitches) =>
        prevSwitches?.map((sw) =>
          sw?.companyId === id
            ? { ...sw, isActive: checked === true ? 1 : 0 }
            : sw
        )
      // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
    );
  };

  const updateCompany = async (id, checked) => {
    const result = await axios.post(API.HOST + updateApi, {
      [actionID]: id, //Id
      isActive: checked === true ? 1 : 0,
    });
    if (result.data.status === 200) {
      // handleClose();
      // setFunctionRender(!functionRender);
      // getRecords()
      // window.location.reload();
    }
  };

  return (
    <div className="">
      {children}
      <div className="grid grid-cols-10 gap-5  justify-between items-center md:px-4 pt-5 pb-4">
        <div className=" col-span-6 block ">
          <div className="flex items-center pb-1">
            {path[0] && (
              <h3 className="md:text-lg text-[12px] mb-0  dark:text-white">
                {path[0]}
              </h3>
            )}
            {path[1] && (
              <>
                <IoIosArrowForward className="opacity-70 text-sm  mx-2 dark:text-white" />
                <h3 className="md:text-[28px] text-[18px] font-semibold mb-0  dark:text-white">
                  {path[1]}
                </h3>
              </>
            )}
            {title && (
              <h3 className="text-[24px] mb-0 font-semibold  dark:text-white">
                {title}
              </h3>
            )}
          </div>
          <p className="mb-0 md:text-[14px] text-[10px]  font-normal opacity-50  dark:text-white">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
            saepe.
          </p>
        </div>
        <div className="flex col-span-4 justify-end">
          {companyList && (
            <Popover
              content={company?.map((each, i) => (
                <div
                  key={i}
                  className="flex gap-2 text-sm font-semibold cursor-pointer  p-2 my-1"
                  onClick={() => {
                    setCompanyData({
                      company: each.company,
                      companyId: each.companyId,
                      url: each.url,
                      logo: each.logo,
                    });
                  }}
                >
                  <div className="flex items-center justify-between dark:bg-ash ">
                    <div className="flex items-center justify-evenly">
                      <img src={img} alt="" className=" w-10 p-1" />
                    </div>
                    <div className=" pl-2">
                      <div className="block ">
                        <p className="mb-0 text-sm text-center p-0  dark:text-white">
                          {each.company}
                        </p>
                        <p className="text-[10px] font-semibold">{each.url}</p>
                      </div>
                      {/* <img src={Arrow_Top} alt="" className="pb-1 px-2" />
                      <img src={Arrow_Bottom} alt="" className="px-2" /> */}
                    </div>
                  </div>
                </div>
              ))}
              // title="Title"
              trigger="click"
              placement="bottom"
            >
              <button className=" p-2 md:px-4">
                <div className="company_list flex items-center justify-between dark:bg-ash ">
                  <div className="flex items-center justify-evenly">
                    <img src={img} alt="" className=" w-10 p-1" />
                    <div className="block ">
                      <p className="mb-0 text-xs text-center p-0  dark:text-white">
                        {companyData.company}
                      </p>
                    </div>
                  </div>
                  <div className=" pr-2">
                    <img src={Arrow_Top} alt="" className="pb-1 px-2" />
                    <img src={Arrow_Bottom} alt="" className="px-2" />
                  </div>
                </div>
              </button>
            </Popover>
          )}
          {exportButton && (
            <div className="">
              <button className="  pb-[7px] pt-[9px] px-[12px] border text-sm  rounded-lg mx-1">
                <div className="flex justify-center items-center ">
                  <AiOutlineCloudDownload className="text-xl mr-2" />
                  <span>Export</span>
                </div>
              </button>
            </div>
          )}
          <div className=" flex items-center">
            {/* <button
              type="submit"
              className="border rounded-md  py-[10px] bg-accent text-white text-xs"
              onClick={() => {
                buttonClick(true);
              }}
            > */}
            <ButtonClick
              buttonName={
                btnName
                  ? "Add" +
                    " " +
                    btnName.charAt(0).toUpperCase() +
                    btnName.slice(1)
                  : "Add" + " " + path[1] || addButtonName
              }
              BtnType="Add"
              type="submit"
              handleSubmit={() => {
                clickDrawer(true);
                buttonClick(btnName, companyData.companyId);
              }}
              className=" flex items-center cursor-pointer  rounded-md font-semibold  bg-accent text-white text-sm md:py-3.5 px-2 md:px-[18px] py-2  "
            >
              {/* <span className="  text-sm pr-[8px]">+</span>
                <p className="mb-0 flex items-end ">{t("Add Shift")}</p>
              </div> */}
              {/* <span className="pr-1 text-sm  dark:text-white">+ Add</span> */}
            </ButtonClick>
            {/* </button> */}
          </div>
        </div>
      </div>
      {navigateBtn.length !== 0 && navigate ? (
        <div className="md:flex justify-start items-center md:px-4 py-2 gap-1   ">
          <div className="border rounded-lg p-2 w-full md:flex justify-start items-center grid grid-cols-12 gap-2 ">
            {navigateBtn?.map((each, i) => (
              <button
                key={i}
                className={` ${
                  i === btnBackgroundColor ? " bg-accent text-white" : ""
                } text-sm font-medium   rounded-lg    md:px-[18px] px-2 md:py-3 py-2  col-span-4 dark:text-white`}
                onClick={() => {
                  setBtnBackgroundColor(i);
                  setBtnName(each.value);
                  navigationClick(each.value);
                }}
              >
                {each.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {tablechange ? (
        <div>
          {switches?.map((each, i) => (
            <div
              key={i}
              className=" dark:bg-ash grid grid-cols-12 gap-2 mx-4 my-1 border rounded-lg p-[18px] items-center justify-center  "
            >
              <div className="flex justify-center">
                <img src={logo} alt="" className=" col-span-1  w-8" />
              </div>
              <div className="block col-span-2 px-2">
                <h2 className="mb-1 text-[12px]  dark:text-white">
                  {each?.company}
                </h2>
                <p className="mb-0 text-[10px]  dark:text-white">{each?.url}</p>
              </div>
              <div className="col-span-1">
                <p className={`text-start mb-0 `}>
                  <span
                    className={`${
                      parseInt(each?.isActive) === 1
                        ? "text-[green] bg-greenLight"
                        : "text-red-600 bg-redlight"
                    }  p-2  rounded-xl text-[10px]  dark:text-white`}
                  >
                    {parseInt(each?.isActive) === 1 ? "Active" : "InActive"}
                  </span>
                </p>
              </div>
              <p className="text-[10px]   col-span-2 mb-0  dark:text-white">
                Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit..
              </p>
              <div className=" col-span-3 text-center pl-2 ">
                <p className="flex items-center justify-start text-[11px] mb-1.5  dark:text-white">
                  <HiOutlineMail className="ltr:mr-2 rtl:ml-2  dark:text-white" />
                  {each?.email}
                  <MdContentCopy className="ltr:ml-2 rtl:mr-2  dark:text-white" />
                </p>
                <p className="flex items-center justify-start text-[11px] mb-1.5  dark:text-white">
                  <HiOutlineMail className="ltr:mr-2 rtl:ml-2  dark:text-white" />
                  {each?.phone}
                  <MdContentCopy className="ltr:ml-2 rtl:mr-2  dark:text-white" />
                </p>
              </div>
              <div className="flex items-center justify-start   col-span-2">
                <FaLocationDot className="ltr:pr-1 rtl:pl-1 text-md  dark:text-white" />
                <p className=" text-[11px] mb-0  dark:text-white">
                  {each?.address}
                </p>
              </div>
              <div className="col-span-1 flex justify-end items-center">
                <Switch
                  checked={parseInt(each.isActive)}
                  onChange={(checked) => {
                    handleToggle(each?.companyId, checked);
                    // buttonClick(each.companyId);
                    // activeOrNot(checked);
                    updateCompany(each?.companyId, checked);
                  }}
                  className=" bg-[#c2c0c0aa]"
                />

                {/* {setToggleBtn(each.isActive)} */}
                {/* <ToggleBtn
                  // value={
                  //   toggleBtn !== ""
                  //     ? i === activeId&&toggleBtn
                  //     : each.isActive
                  // } //toggleBtn
                  // value={each.companyId===CompanyId ? toggleBtn : each.isActive} //toggleBtn
                  // value={each.companyId===CompanyId && toggleBtn } //toggleBtn
                  value={each.isActive} //toggleBtn
                  // value={toggleBtn } //toggleBtn
                  change={(e) => {
                    // setcompanyId(activeId.at(i));
                    // // if (i === activeId) {
                    // //   togglefun(i, e);
                    // // }
                    // if (activeId.includes(each.companyId)) {
                    //   setToggleBtn(e);
                    // }
                    // setToggleBtn(i === activeId ? e : 0);
                    // if (i === activeId) {
                    //  await setToggleBtn(e);
                    // }
                    buttonClick(each.companyId);
                    activeOrNot(e);
                  }}
                /> */}
                <Popover
                  content={
                    <div className="flex gap-2 text-sm font-semibold">
                      <p
                        className=" cursor-pointer"
                        onClick={() => {
                          buttonClick(each[actionID]);
                          clickDrawer(true);
                        }}
                      >
                        Update
                      </p>
                      <p
                        className=" cursor-pointer"
                        onClick={() => {
                          deleteRecord(each[actionID]);
                          // clickDrawer(true);
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  }
                  // title="Title"
                  trigger="hover"
                >
                  <HiOutlineDotsVertical className=" cursor-pointer opacity-60  dark:text-white" />
                </Popover>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          {listData[0] ? (
            <div className="relative overflow-x-auto border rounded-xl md:mx-4">
              <table className="w-full  text-sm text-left rtl:text-right dark:text-gray-400">
                <thead className="text-sm  dark:bg-gray-700 dark:text-gray-400">
                  <tr className=" border-b ">
                    {checkBox ? (
                      <th className="w-10 col-span-1 ltr:text-center rtl:text-center dark:bg-ash">
                        <input
                          type="checkbox"
                          className="w-3 ltr:text-end rtl:text-start opacity-60"
                          defaultChecked={checked}
                          onChange={(e) => {
                            setChecked(e.target.checked);
                          }}
                        />
                      </th>
                    ) : null}
                    {navigateBtn?.map((nav, index) =>
                      header[0]?.[
                        nav.value === btnName ? nav.value : null
                      ]?.map((each, i) => (
                        <th
                          scope="col"
                          key={i}
                          className={` ${
                            checkBox ? "pl-2 " : "pl-[30px]"
                          } py-3 pr-3   dark:text-white dark:bg-ash col-span-2`}
                        >
                          {each.title}
                        </th>
                      ))
                    )}
                    <th className=" col-span-2px-3 py-3 text-center text-sm  dark:text-white dark:bg-ash">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listData?.map((each, index) => (
                    <tr
                      key={index}
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      {checkBox ? (
                        <th className="w-10 ltr:text-center rtl:text-center  dark:text-white dark:bg-ash">
                          <input
                            type="checkbox"
                            className="w-3 ltr:text-end rtl:text-start opacity-60"
                            defaultChecked={checked}
                            onChange={(e) => {}}
                          />
                        </th>
                      ) : null}
                      {navigateBtn?.map((nav) =>
                        header[0]?.[
                          nav.value === btnName ? nav.value : null
                        ]?.map((data, i) => (
                          <>
                            <td
                              key={i}
                              // scope="row"
                              className={` ${
                                checkBox ? "pl-2 " : "pl-[30px]"
                              } dark:bg-ash text-xs py-3 pr-3 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                            >
                              <div className="flex items-center">
                                {data?.icon && (
                                  <div className="">
                                    {/* {data?.icon?.map((icon) => ( */}
                                    <img
                                      src={
                                        data?.icon[index]
                                          ? data?.icon[index]
                                          : data?.icon[index]
                                        // ===
                                        //   data.icon[i + 1] &&
                                        // data.icon[data.id + (i + 1)]
                                      }
                                      alt=""
                                      className=" w-7"
                                    />
                                    {/* ))} */}
                                  </div>
                                )}
                                <div
                                  className={`${data?.icon ? "pl-[28px]" : ""}`}
                                >
                                  <div
                                    className={`${
                                      !data.subValue ? "pb-2" : ""
                                    }`}
                                  >
                                    {data.value === "RequestAllowance" ||
                                    data.value === "documentTyp" ? (
                                      <div
                                        className={`flex justify-start  items-center`}
                                      >
                                        <div
                                          className={` flex  justify-start items-center ${
                                            parseInt(each.isActive) === 1
                                              ? "bg-[#ECFDF3]"
                                              : "bg-[#FEF3F2]"
                                          } pr-2  py-1 rounded-full `}
                                        >
                                          <BsDot
                                            className={`${
                                              parseInt(each.isActive) === 1
                                                ? "text-[#12B76A]"
                                                : "text-[#F04438]"
                                            } text-lg  tsxt-start `}
                                          />
                                          <span
                                            className={`${
                                              parseInt(each.isActive) === 1
                                                ? "text-[#027A48]"
                                                : "text-[#B42318]"
                                            }`}
                                          >
                                            {each[data.value]}
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      each[data.value]
                                    )}
                                  </div>
                                  {data.subValue && (
                                    <div className="text-[12px] flex font-normal opacity-50 items-start">
                                      {each[data.subValue[0]] && (
                                        <p className=" mb-0">
                                          {each[data.subValue[0]]}
                                        </p>
                                      )}
                                      {each[data.subValue[1]] && (
                                        <>
                                          <span className=" px-1">-</span>
                                          <p className=" mb-0">
                                            {each[data.subValue[1]]}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {arabic && <span className="">نمتغشتنتل</span>}
                              {/* <p>{each[data.value]}</p> */}
                              {/* <p>{each.description}</p> */}
                            </td>
                          </>
                        ))
                      )}
                      <td className=" dark:bg-ash p-3 flex justify-center items-center gap-4  dark:text-white">
                        {actionToggle ? (
                          <Switch
                            checked={parseInt(each.isActive)}
                            onChange={(checked) => {
                              handleToggleList(each?.[actionID], checked);
                              // buttonClick(each.companyId);
                              // activeOrNot(checked);
                              updateCompany(each?.companyId, checked);
                            }}
                            className=" bg-[#c2c0c0aa]"
                          />
                        ) : (
                          // <ToggleBtn change={(e) => {}} />
                          <>
                            <MdEdit
                              onClick={() => {
                                buttonClick(each[actionID], "edit");
                                clickDrawer(true);
                              }}
                              className="  dark:text-white cursor-pointer bg-slate-100 text-primary rounded-full p-1 text-2xl"
                            />
                            <MdDelete
                              className=" dark:text-white bg-slate-100 rounded-full p-1 text-2xl cursor-pointer"
                              onClick={() => {
                                deleteRecord(each[actionID]);
                                // clickDrawer(true);
                              }}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="">In Progress ....</div>
          )}
          {/* <Table action header={header} data={data} /> */}
        </div>
      )}
    </div>
  );
}
