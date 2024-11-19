/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Dropdown,
  Menu,
  Checkbox,
  Radio,
  Switch,
  Popconfirm,
  Popover,
} from "antd";
import { RxCopy, RxDotFilled } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import copy from "clipboard-copy";
import { LuArrowDownUp, LuListFilter } from "react-icons/lu";
import { BsListUl, BsThreeDotsVertical } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Logo1 from "../../assets/images/logos/logo1.png";
import axios from "axios";
import API from "../Api";
import SearchBox from "./SearchBox";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";

const gridListoptions = [
  {
    label: <BsListUl />,
    value: 1,
  },
  //   {
  //     label: <BsGrid />,
  //     value: 2,
  //   },
];

const TableCopy = ({
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

  const [searchValue, setSearchValue] = useState("");

  const [searchFilter, setSearchFilter] = useState([...data]);

  const [visibleColumns, setVisibleColumns] = useState();

  const [gridList, setGridList] = useState(1);

  const primaryColor = localStorage.getItem("mainColor");

  useEffect(() => {
    setListData([...data]);
  }, [data[0]]);

  const handleToggleList = (id, checked) => {
    setListData(
      (prevSwitches) =>
        prevSwitches?.map((sw, i) =>
          sw?.[actionID] === id
            ? { ...sw, isActive: checked === true ? 1 : 0 }
            : sw
        )
      // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
    );
  };

  // const handleToggle = (id, checked) => {
  //   setSwitches(
  //     (prevSwitches) =>
  //       prevSwitches?.map((sw) =>
  //         sw?.companyId === id
  //           ? { ...sw, isActive: checked === true ? 1 : 0 }
  //           : sw
  //       )
  //     // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
  //   );
  // };

  // update Api integration
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

  const [tableData, setTableData] = useState([]);

  const deleteRecord = async (e) => {
    const result = await axios.post(API.HOST + deleteApi + "/" + e);
    if (result.data.status === 200) {
      window.location.reload();
    }
  };

  const handleCopyClick = (value) => {
    copy(value);
    // MessageApi.open({
    //   type: "success",
    //   content: `${value} is copied succesfully`,
    // });
  };

  useEffect(() => {
    setTableData(
      header[0]?.[tabValue || path]?.map((each, i) => ({
        title: (
          <span
            key={i}
            className="text-[10px] 2xl:text-xs text-[#667085] dark:text-white font-medium capitalize"
          >
            {each.title}
          </span>
        ),
        dataIndex: each.value,
        // dataIndex: "firstName",
        render: (record, text) => (
          <>
            {each.value === "candidateName" && (
              <div className="flex items-center gap-2">
                <div className="rounded-md border-gray-500 bg-gray-400 w-7 h-7"></div>
                <span>{record}</span>
              </div>
            )}
            {each.value === "candidateContact" && (
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="w-3 h-3 text-blue-600" />

                <span>{record}</span>
                <button>
                  <RxCopy
                    className="w-3 h-3 text-gray-400"
                    handleSubmit={() => handleCopyClick("record")}
                  />
                </button>
              </div>
            )}
            {each.value === "jobDetail.title" && <span>{record}</span>}
            {each.value === "candidateStage" && (
              <>
                {record === "New" ? (
                  <div className="rounded-full bg-blue-100 w-10 p-1 text-blue-600">
                    {record}
                  </div>
                ) : record === "Not Hired" ? (
                  <div className="rounded-full bg-red-200 w-10 p-1 text-red-600">
                    {record}
                  </div>
                ) : record === "Machine Test" ||
                  record === "CEO Interview" ||
                  record === "Technical Round" ? (
                  <div className="rounded-full bg-gray-200 w-10 p-1 text-gray-600">
                    {record}
                  </div>
                ) : record === "Hired" ? (
                  <div className="rounded-full bg-violet-200 w-10 p-1 text-blue-600">
                    {record}
                  </div>
                ) : (
                  <span>{record}</span>
                )}
              </>
            )}
            {each.value === "candidateSource" && <span>{record}</span>}
            {each.value === "createdOn" && <span>{record}</span>}
            {each.value === "action" && <span>{record}</span>}
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
                      buttonClick(text[actionID], "edit");
                      clickDrawer(true);
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
                        buttonClick(text[actionID], "edit");
                        clickDrawer(true);
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
                <BsThreeDotsVertical className=" opacity-50 cursor-pointer ml-24" />
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
    // setListData(listData?.filter((each)=>{
    // }))
    // setListData(
    // listData?.filter((each) => {
    //   if (Object.values(Object.values(each)).includes(searchFilter)) {
    //     return each;
    //   }
    //   Object.values(Object.values(each)).filter((filterdata) => {
    //     if (filterdata !== null && filterdata !== " ") return filterdata;
    //   });
    // });
    // );
  }, [searchFilter]);

  useEffect(() => {
    setVisibleColumns(tableData?.map((col) => col.dataIndex));
  }, [tableData]);

  const onSelectChange = (newSelectedRowKeys) => {
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

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  const handleColumnSearch = (searchValue) => {
    const lowerSearchValue = searchValue.toLowerCase();
    const filteredColumns = tableData.filter((column) => {
      const titleText =
        typeof column.title === "string"
          ? column.title
          : column.title.props.children;

      return titleText.toLowerCase().includes(lowerSearchValue);
    });
    setVisibleColumns(filteredColumns.map((col) => col.dataIndex));
  };

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
    setGridList(value);
  };

  const splitTitle = tabTitle.split("_");

  const jsonResult = splitTitle
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const handleRowClick = (record) => {
    // const candidateId = record.id;
    // Use the Link component to navigate to the candidate profile page
    // without directly manipulating history
    // You can define the route in your React Router setup
    // For example: <Route path="/candidate-profile/:id" component={CandidateProfile} />
    window.location.href = "/candidateprofile";
  };

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
            {hasSelected
              ? `${selectedRowKeys?.length} ${
                  jsonResult ? jsonResult : path
                } Selected`
              : `All ${jsonResult ? jsonResult : path}`}
          </div> */}
          <SearchBox
            // title="Search"
            data={data}
            placeholder={t("Search_placeholder")}
            value={searchValue}
            icon={<CiSearch className=" dark:text-white" />}
            className="mt-0 w-ful md:w-auto  "
            error=""
            change={(value) => {
              setSearchValue(value);
            }}
            onSearch={(value) => {
              setSearchFilter(value);
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
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
              //   setDropdownVisible(visible);
              // }}
            >
              {/* <Button>Filters</Button> */}
              <Button
                className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA]"
                onClick={(e) => {
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
          <Button
            className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA] gap-2"
            size={isSmallScreen ? "default" : "large"}
          >
            <span className="mr-2">{t("Sort by")}</span>
            <span className="ml-auto">
              <LuArrowDownUp className="text-base 2xl:text-lg" />
            </span>
          </Button>
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
      <div className="border rounded-lg border-[#E7E7E7] dark:border-secondary relative overflow-auto">
        {data && (
          <Table
            rowSelection={{ ...rowSelection }}
            columns={tableData}
            dataSource={listData}
            size={isSmallScreen ? "small" : ""}
            scroll={{ y: 600 }} // Adjust the height according to your requirement
            pagination={false} // Remove pagination
            columnMenuItems={true}
            className="custom-table"
            rowClassName={() => "table-row"}
            onRow={() => ({
              onClick: handleRowClick,
            })}

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
          />
        )}
      </div>
    </div>
  );
};

export default TableCopy;
