// import React from "react";
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";

// export default function Table({header=[],data=[],action}) {
//   return (
//     <div className="relative overflow-x-auto border rounded-xl mx-4">
//       <table className="w-full  text-sm text-left rtl:text-right dark:text-gray-400">
//         <thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr className=" border-b">
//            {header?.map((each)=>(<th scope="col" className={`px-3 py-3`}>
//            {each.title}
//             </th>
//             )) }
//           {action&&  <th className="px-3 py-3 text-center">Action</th>}

//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((each)=>(<tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//             <th
//               scope="row"
//               className="p-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//             >
//               {each.designation}
//             </th>
//             <td className="p-3">{each.description}</td>
//             <td className="p-3 flex justify-center items-center gap-4">
//             <MdEdit className=" bg-slate-100 text-primary rounded-full p-1 text-2xl" />
//             <MdDelete className=" bg-slate-100 rounded-full p-1 text-2xl"/>
//             </td>
//           </tr>))}

//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Dropdown,
  Space,
  Menu,
  Checkbox,
  Radio,
  Switch,
  Popconfirm,
  Flex,
  Popover,
} from "antd";
import { RxDotFilled } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { LuListFilter } from "react-icons/lu";
import { BsListUl, BsThreeDotsVertical } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Logo1 from "../../assets/images/logos/logo1.png";
import axios from "axios";
import API from "../Api";
import SearchBox from "./SearchBox";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaLocationDot, FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";

import Tabs from "./Tabs";
import TabsNew from "./TabsNew";
import { HiUserGroup } from "react-icons/hi2";

// Filter Dropdown
const { SubMenu } = Menu;
// Table Header And Style
// push the array value in map

// Dropdown Items In each Rows

const gridListoptions = [
  {
    label: <BsListUl />,
    value: 1,
  },
  {
    label: <BsGrid />,
    value: 2,
  },
];

const TableAnt1 = ({
  data = [],
  header = [],

  actionID = "",
  updateApi = "",
  deleteApi = "",
  path = "",
  tabValue = "",
  buttonClick = () => {},
  clickDrawer = () => {},
  viewDetails = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [listData, setListData] = useState([]);
  const [tabTitle, setTabTitle] = useState(
    tabValue.charAt(0).toUpperCase() + tabValue.slice(1)
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState([...data]);

  const [visibleColumns, setVisibleColumns] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [gridList, setGridList] = useState(1);
  const primaryColor = localStorage.getItem("mainColor");
  useEffect(() => {
    // if (data) {
    setListData([...data]);
    // }
  }, [data[0]]);

  // Action Toggle change

  const handleToggleList = (id, checked) => {
    // console.log(checked);
    // console.log(switches);
    setListData(
      (prevSwitches) =>
        prevSwitches?.map((sw, i) =>
          // console.log(sw.companyId , id )
          sw?.[actionID] === id
            ? { ...sw, isActive: checked === true ? 1 : 0 }
            : sw
        )

      // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
    );
  };

  // const handleToggle = (id, checked) => {
  //   // console.log(checked);
  //   // console.log(switches);
  //   setSwitches(
  //     (prevSwitches) =>
  //       prevSwitches?.map((sw) =>
  //         // console.log(sw.companyId , id )
  //         sw?.companyId === id
  //           ? { ...sw, isActive: checked === true ? 1 : 0 }
  //           : sw
  //       )

  //     // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
  //   );
  // };

  // update Api integration
  const updateCompany = async (id, checked) => {
    console.log(id, checked, "checked");
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
    console.log(result);
  };
  const [tableData, setTableData] = useState([]);

  // Delete Api Integration

  const deleteRecord = async (e) => {
    // console.log(e);
    const result = await axios.post(API.HOST + deleteApi + "/" + e);
    // console.log(result);
    if (result.data.status === 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    console.log(header, "header");
    setTableData(
      header[0]?.[tabValue || path]?.map((each, i) => ({
        title: (
          <span
            key={i}
            className="text-[10px] 2xl:text-xs text-[#667085] dark:text-white font-medium capitalize "
          >
            {each.title}
          </span>
        ),
        dataIndex: each.value,
        // dataIndex: "firstName",
        render: (record, text) => (
          <>
            {each.value === "createdOn" && (
              <div className="flex items-center gap-2">
                {/* Display the logo */}
                <SlCalender className="w-6 h-6 text-gray-300" />
                {/* Display the date */}
                <span>{record}</span>
              </div>
            )}
            {each.value === "location" && (
              <div className="flex items-center gap-2">
                {/* Display the logo */}
                <FaLocationDot className="w-6 h-6 text-gray-300" />
                {/* Display the date */}
                <span>{record}</span>
              </div>
            )}
            {each.value === "companyId" && (
              <div className="flex items-center gap-2">
                {/* Display the logo */}
                <HiUserGroup className="w-6 h-6 text-gray-300" />
                {/* Display the date */}
                <span>{record}</span>
              </div>
            )}
            {each.value === "jobTitle" && (
              <div className="flex items-center gap-2">
                {/* Display the logo */}
                {/* <HiUserGroup className="w-6 h-6 text-gray-300" /> */}
                {/* Display the date */}
                <div
      className="w-5 h-5 rounded bg-gray-100 text-blue-600 text-center"
      style={{ minWidth: '8px', minHeight: '8px' }}
    > {record.charAt(0).toUpperCase()}</div>
                <span>{record}</span>
              </div>
            )}
            {each.value === "jobPublishType" && (
              <div className="flex items-center gap-2">
                {/* Display the logo */}
                {/* <HiUserGroup className="w-6 h-6 text-gray-300" /> */}
                {/* Display the date */}
                <span>{record}</span>
              </div>
            )}
            {each.value === "workLocationType" && (
              <div className="flex items-center gap-2">
                {/* Display the logo */}
                {/* <HiUserGroup className="w-6 h-6 text-gray-300" /> */}
                {/* Display the date */}
                <span>{record}</span>
              </div>
            )}

            <div
              className=" cursor-pointer"
              onClick={() => {
                if (viewDetails) navigate(`/employeeProfile/${text[actionID]}`);
              }}
            >
              {each.value === "isActive" ? (
                <div
                  key={text}
                  className={`${
                    parseInt(record) === 1
                      ? " bg-emerald-100 text-emerald-600"
                      : " bg-rose-100 text-rose-600"
                  } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                >
                  <RxDotFilled
                    className={`${
                      parseInt(record) === 1
                        ? "text-emerald-600"
                        : "text-rose-600"
                    } text-base 2xl:text-lg`}
                  />
                  {parseInt(record) === 1 ? "Active" : "Inactive"}
                </div>
              ) : each.flexColumn === true ? (
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 overflow-hidden rounded-full 2xl:w-10 2xl:h-10">
                    <img
                      // src={record.logo}
                      src={Logo1}
                      className="object-cover object-center w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <p className="text-xs font-semibold text-black capitalize 2xl:text-sm dark:text-white">
                      {text.company}
                    </p>
                    {/* <>{alert(JSON.stringify(text[each.]))}</> */}
                    <p className="!font-normal para">{text.url}</p>
                  </div>
                  <div className="pl-4">
                    <div
                      className={`${
                        parseInt(text.isActive) === 1
                          ? " bg-emerald-100 text-emerald-600"
                          : " bg-rose-100 text-rose-600"
                      } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                    >
                      <RxDotFilled
                        className={`${
                          parseInt(text.isActive) === 1
                            ? "text-emerald-600"
                            : "text-rose-600"
                        } text-base 2xl:text-lg`}
                      />
                      {parseInt(text.isActive) === 1 ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              ) : each.block ? (
                <div>
                  <p className="text-xs font-medium text-black 2xl:text-sm dark:text-white">
                    {text[each.value]}
                  </p>
                  <p className="!font-normal para">{text[each.value]}</p>
                </div>
              ) : each.actionToggle ? (
                <Switch
                  checked={parseInt(text.isActive)}
                  onChange={(checked) => {
                    handleToggleList(text?.[actionID], checked);
                    // buttonClick(each.companyId);
                    // activeOrNot(checked);
                    console.log(checked);
                    console.log(text?.[actionID]);
                    updateCompany(text?.[actionID], checked);
                  }}
                  className=" bg-[#c2c0c0aa]"
                  size={isSmallScreen ? "small" : "default"}
                />
              ) : each.action ? (
                <div className="flex items-center justify-start gap-4">
                  <button
                    className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter bg-[${primaryColor}] bg-opacity-10 hover:bg-opacity-100 text-accent hover:text-white transition-all duration-300`}
                    onClick={() => {
                      buttonClick(text[actionID], "edit"); //"8"
                      clickDrawer(true);

                      // console.log(actionID);
                      // console.log(text[actionID], "ddddddddsfsd");
                    }}
                  >
                    <FaPencil className="text-xs 2xl:text-sm" />
                  </button>
                  <Popconfirm
                    placement="top"
                    title={"Confirm To Delete"}
                    description={"Are you sure to delete this row?"}
                    okText="Confirm"
                    cancelText="No"
                    onConfirm={() => {
                      console.log("hh");
                      deleteRecord(text[actionID]);
                    }}
                    // className="activeBtn"
                    style={{}}
                  >
                    <button
                      className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter bg-[${primaryColor}] bg-opacity-10 hover:bg-opacity-100 text-accent hover:text-white transition-all duration-300`}
                      // onClick={() => {
                      //   // deleteRecord(text[actionID]);
                      //   // clickDrawer(true);
                      //   // console.log(text[actionID]);
                      // }}
                    >
                      <RiDeleteBin5Line className="text-xs 2xl:text-sm" />
                    </button>
                  </Popconfirm>
                </div>
              ) : (
                // </Popover>
                <div className="text-[#667085] text-xs 2xl:text-sm dark:text-white font-medium">
                  {/* <p>{record}</p> */}
                </div>
              )}
            </div>
            {each.dotsVertical && (
              <Popover
                content={
                  <div>
                    <p
                      onClick={() => {
                        buttonClick(text[actionID], "edit"); //"8"
                        clickDrawer(true);
                        console.log(text[actionID]);

                        // console.log(actionID);
                        // console.log(text[actionID], "ddddddddsfsd");
                      }}
                      className="text-md font-semibold p-2 cursor-pointer"
                    >
                      Update
                    </p>
                    <Popconfirm
                      placement="top"
                      title={"Confirm To Delete"}
                      description={"Are you sure to delete this row?"}
                      okText="Confirm"
                      cancelText="No"
                      onConfirm={() => {
                        console.log("hh");
                        deleteRecord(text[actionID]);
                      }}
                      // className="activeBtn"
                      style={{}}
                    >
                      <p className="text-md font-semibold p-2  cursor-pointer">
                        Delete
                      </p>
                    </Popconfirm>
                  </div>
                }
                // title="Start Action"
              >
                <BsThreeDotsVertical className=" opacity- cursor-pointer" />
              </Popover>
            )}
          </>
        ),
        // responsive: ["sm"],
      }))
    );
  }, []);
  useEffect(() => {
    setListData([...searchFilter]);

    // console.log(searchFilter);
    // setListData(listData?.filter((each)=>{
    // }))
    // console.log(Object.values(Object.keys({ ...listData })));
    // setListData(
    // listData?.filter((each) => {
    //   if (Object.values(Object.values(each)).includes(searchFilter)) {
    //     return each;
    //   }
    //   Object.values(Object.values(each)).filter((filterdata) => {
    //     if (filterdata !== null && filterdata !== " ") return filterdata;
    //     // console.log(filterdata.includes("d"));
    //   });
    // });
    // );
  }, [searchFilter]);

  useEffect(() => {
    setVisibleColumns(tableData?.map((col) => col.dataIndex));
  }, [tableData]);

  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log(newSelectedRowKeys, "eeddd");
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleColumnVisibilityChange = (column) => (e) => {
    e.stopPropagation();
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column]
    );
  };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  // useEffect(() => {
  //   console.log(rowSelection, "e");
  // }, [rowSelection]);

  const [checkStrictly, setCheckStrictly] = useState(false);

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  // FILTER DROPDOWN SEARCH
  const handleColumnSearch = (searchValue) => {
    // Convert searchValue to lowercase for case-insensitive search
    const lowerSearchValue = searchValue.toLowerCase();

    // Filter columns based on whether their titles contain the searchValue
    const filteredColumns = tableData.filter((column) => {
      console.log(column, "column");
      const titleText =
        typeof column.title === "string"
          ? column.title
          : column.title.props.children;

      return titleText.toLowerCase().includes(lowerSearchValue);
    });

    // Set the visible columns to the filtered columns
    setVisibleColumns(filteredColumns.map((col) => col.dataIndex));
  };

  const hasSelected = selectedRowKeys.length > 0;

  // Filter Dropdown Menus and Search Input
  // const columnMenu = (
  //   <Menu mode="vertical">
  //     <Menu.Item key="selectAll">
  //       <Checkbox
  //         checked={visibleColumns?.length === tableData?.length}
  //         onChange={() =>
  //           setVisibleColumns(
  //             visibleColumns?.length === tableData?.length
  //               ? []
  //               : tableData.map((col) => col.dataIndex)
  //           )
  //         }
  //       >
  //         Select All
  //       </Checkbox>
  //     </Menu.Item>
  //     {/* <Menu.Divider />
  //     <Menu.Item key="search">
  //       <Input
  //         placeholder="Search columns"
  //         onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
  //         onChange={(e) => handleColumnSearch(e.target.value)}
  //       />
  //     </Menu.Item>
  //     <Menu.Divider />
  //     {tableData?.map((column) => (
  //       <Menu.Item key={column.dataIndex}>
  //         <Checkbox
  //           value={column.title}
  //           checked={visibleColumns?.includes(column.dataIndex)}
  //           onChange={handleColumnVisibilityChange(column.dataIndex)}
  //         >
  //           {column.title}
  //         </Checkbox>
  //       </Menu.Item>
  //     ))} */}
  //   </Menu>
  // );
  const items = [
    {
      key: "selectAll",
      label: (
        <Checkbox
          checked={visibleColumns?.length === tableData?.length}
          onChange={() => {
            setVisibleColumns(
              visibleColumns?.length === tableData?.length
                ? []
                : tableData.map((col) => col.dataIndex)
            );
          }}
        >
          Select All
        </Checkbox>
      ),
    },
    {
      key: "search",
      label: (
        <Input
          placeholder="Search columns"
          onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
          onChange={(e) => handleColumnSearch(e.target.value)}
        />
      ),
    },
    ...(tableData?.map((column, i) => ({
      key: i,
      label: (
        <Checkbox
          value={column.title}
          checked={visibleColumns?.includes(column.dataIndex)}
          onChange={handleColumnVisibilityChange(column.dataIndex)}
        >
          {column.title}
        </Checkbox>
      ),
    })) || []),
  ];
  const columnMenuItems = [
    {
      key: "selectAll",
      label: (
        <Checkbox
          checked={visibleColumns?.length === tableData?.length}
          onChange={() => {
            setVisibleColumns(
              visibleColumns?.length === tableData?.length
                ? []
                : tableData.map((col) => col.dataIndex)
            );
          }}
        >
          Select All
        </Checkbox>
      ),
    },
    {
      key: "search",
      label: (
        <Input
          placeholder="Search columns"
          onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
          onChange={(e) => handleColumnSearch(e.target.value)}
        />
      ),
    },
    ...(tableData?.map((column, i) => ({
      key: i,
      label: (
        <Checkbox
          value={column.title}
          checked={visibleColumns?.includes(column.dataIndex)}
          onChange={handleColumnVisibilityChange(column.dataIndex)}
        >
          {column.title}
        </Checkbox>
      ),
    })) || []),
  ];

  // const columnMenu = <Menu mode="vertical" items={columnMenuItems} />;

  const onChangeGridlist = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setGridList(value);
  };
  const splitTitle = tabTitle.split("_");
  const jsonResult = splitTitle
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 xl:items-center xl:flex-row">
        <div className="flex items-center gap-3">
          {/* <p className="text-lg font-semibold dark:text-white"> */}
          {/* {tabTitle?.split("_") || path?.split("_")} */}
          {/* {jsonResult || path} */}
          {/* (0) */}
          {/* </p> */}

          {/* <div
            style={{ marginLeft: 8 }}
            className={`bg-[${primaryColor}] bg-opacity-10 text-primary text-[10px] 2xl:text-xs rounded-full px-3 py-1 vhcenter`}
          >
            {console.log(...tabTitle.split("_"))}
            {hasSelected
              ? `${selectedRowKeys?.length} ${
                  jsonResult ? jsonResult : path
                } Selected`
              : `All ${jsonResult ? jsonResult : path}`}
            {console.log(jsonResult)}
          </div> */}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SearchBox
            // title="Search"
            data={data}
            placeholder={t("Search_placeholder")}
            value={searchValue}
            icon={<CiSearch className=" dark:text-white" />}
            className="mt-0 w-ful md:w-auto"
            error=""
            change={(value) => {
              setSearchValue(value);
            }}
            onSearch={(value) => {
              // console.log(value);
              setSearchFilter(value);
            }}
          />
          <div>
            {/* <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <Button>bottomRight</Button>
            </Dropdown> */}
            <Dropdown
              // menu={columnMenuItems.map((item, index) => ({
              //   ...item,
              //   key: index,
              // }))}
              menu={{ items }}
              placement="bottomRight"
              // trigger={["click"]}
              // open={dropdownVisible}
              // onOpenChange={(visible) => {
              //   console.log(visible);
              //   setDropdownVisible(visible);
              // }}
            >
              {/* <Button>Filters</Button> */}
              <Button
                className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA]"
                onClick={(e) => {
                  // console.log(e);
                  // e.stopPropagation(); // Prevent dropdown from closing
                  // setDropdownVisible(!dropdownVisible);
                }}
                size={isSmallScreen ? "default" : "large"}
              >
                <span className="mr-2">{t("Filters")}</span>
                <span className="ml-auto">
                  <LuListFilter className="text-base 2xl:text-lg" />
                </span>
              </Button>
            </Dropdown>
          </div>
          <Radio.Group
            options={gridListoptions}
            onChange={onChangeGridlist}
            value={gridList}
            optionType="button"
            className="flex items-center py-1.5 h-full"
            size={isSmallScreen ? "" : "large"}
          />
          <Button
            className="flex items-center justify-center h-full py-1.5 font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
            size={isSmallScreen ? "default" : "large"}
          >
            <FiSettings className="text-base 2xl:text-lg" />
          </Button>
        </div>
      </div>
      <div className="border rounded-lg border-[#E7E7E7] dark:border-secondary relative overflow-auto ">
        {data && (
          <Table
            rowSelection={{ ...rowSelection }}
            columns={tableData}
            rowSelection={{ ...rowSelection }}
            columns={tableData}
            dataSource={listData}
            size={isSmallScreen ? "small" : ""}
            scroll={{ y: 600 }} // Adjust the height according to your requirement
            pagination={false} // Remove pagination
            // dataSource={data.filter(
            //   (item) =>
            //     item.location_name
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase()) ||
            //     item.description.eng
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase()) ||
            //     item.description.arab
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase()) ||
            //     item.status
            //       .toString()
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase())
            // )}
            dataSource={listData}
            size={isSmallScreen ? "small" : ""}
          />
        )}
      </div>
    </div>
  );
};

export default TableAnt1;
