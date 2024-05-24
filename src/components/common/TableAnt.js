import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Dropdown,
  Space,
  Menu,
  notification,
  Radio,
  Switch,
  Popconfirm,
  Flex,
  Popover,
  Tooltip,
} from "antd";
import { RxDotFilled } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { LuListFilter } from "react-icons/lu";
import { BsListUl, BsThreeDotsVertical } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Logo1 from "../../assets/images/logos/logo1.png";
import axios from "axios";
// import API from "../Api";
import SearchBox from "./SearchBox";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
// import { useNavigate } from "react-router-dom";
import ButtonClick from "./Button";
import API, { action } from "../Api1";
import { useDispatch, useSelector } from 'react-redux';
import { setNavigationPath } from "../../Redux/action";
import { setSelectedDataId } from "../../Redux/action";
import { useNavigate } from 'react-router-dom';
import ModalPop from "./ModalPop";
import TabsNew from "./TabsNew";
import { PiEye } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";


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

const TableAnt = ({
  data = [],
  header = [],
  tab,
  drawerH = [],
  inputType,
  actionToggle = false,
  actionID = "",
  updateApi = "",
  deleteApi = "",
  path = "",
  tabValue = "",
  buttonClick = () => { },
  clickDrawer = () => { },
  handleTabChange = () => { },
  viewDetails = false,
  showButton = false,
  All = false,
  showsearch = false,
  viewOutside = false,
  refresh = () => { },
  recordId = "",
  jobId = "",
  handlesort = () => { },
  refreshJobCrad =()=>{}

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
  // const [searchFilter, setSearchFilter] = useState([...data]);
  const [searchFilter, setSearchFilter] = useState(
    data.map((each) => ({
      key: each[actionID],
      ...each,
    }))
  );
  const [tabClick, setTabClick] = useState(path);
  // const [navigationPath, setNavigationPath] = useState("");

  const dispatch = useDispatch();

  const [updateId, setUpdateId] = useState("");
  const [visibleColumns, setVisibleColumns] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [gridList, setGridList] = useState(1);
  const primaryColor = localStorage.getItem("mainColor");
  const [show, setShow] = useState(false);
  const [openPop, setOpenPop] = useState("");
  const handleShow = () => setShow(true);
  const [modalData, setModalData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalshow, setIsModalshow] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description, callback) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      onClose: callback,

      // stack: 2,
      style: {
        background: `${type === "success"
          ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
          : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
          }`,
        boxShadow: `${type === "success"
          ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
          : "0px 22px 60px rgba(134, 92, 144, 0.20)"
          }`,
      },
      // duration: null,
    });
  };
  useEffect(() => {
    // if (data) {
    setListData([...data]);
    // }
  }, [data[0]]);

  //Sort Function
  const handleSortFunction = (pagination, filters, sorter, extra)=>{
    
    console.log('params', pagination, filters, sorter, extra);
}
  React.useEffect(() => {
    dispatch(setNavigationPath(tabValue));
  }, [dispatch, tabValue]);
  // Action Toggle change

  const navigationPath = useSelector((state) => state.navigation.navigationPath);
  useEffect(() => {
    //console.log("Updated navigationPath:", navigationPath);
  }, [navigationPath]);


  const handleAddButtonClick = (path) => {
    // Use the path parameter as needed in your function
    //console.log(`Add button clicked for path: ${path}`);

    // The rest of your logic...
  };
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
    // refresh(true)
    


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
    try {
      // console.log(
      //   updateApi,
      //   {
      //     [actionID]: id, //Id
      //     isActive: checked === true ? 1 : 0,
      //   },
      //   "updateApi"
      // );
      // const result = await action(updateApi, {
      //   [actionID]: id, //Id
      //   isActive: checked === true ? 1 : 0,
      // });
      const response = await action(updateApi, {
        id: id, //Id
        // isActive: checked === true ? 1 : 0,
      });
      // console.log(id)
      // console.log(response);

      if (response.status === 200) {
        // handleClose();
        // setFunctionRender(!functionRender);
        // getRecords()
        // window.location.reload();
        openNotification("success", "Successful", response.message);
      } else if (response.result === 500) {
        openNotification("error", "Failed", "Unable to update status.");
      }
    } catch (error) {
      openNotification("error", "Failed", error.code);
    }
  };
  const [tableData, setTableData] = useState([]);

  // Delete Api Integration

  // const deleteRecord = async (e) => {
  //   console.log(e);
  //   const result = await action(deleteApi, { id: e });
  //   console.log(result);
  //   if (result.status === 200) {
  //     // window.location.reload();
  //     openNotification("success", "Success", result?.message);
  //     refresh(true);
  //   }
  // };


  // Function to delete a record

  const deleteRecord = async (id) => {

    const result = await action(deleteApi, { id: id }); // Ensure 'id' is passed correctly
    if (result.status === 200) {
      // Handle success response
      openNotification("success", "Successful", result?.message);
      refresh(true);
    } else if (result.status === 500) {
      openNotification("error", "Info", result?.message)
    }

  };



  const handleRowClick = (record) => {
    // setModalData({ text, title });
    // setIsModalOpen(true);
    // Check if the path is present and is not an empty array and if 'action' does not exist in the current column configuration
    // if (
    //   path &&
    //   path.length > 0 &&
    //   !header[0]?.[tabValue || path || '']?.some(
    //     column => column.value === 'action' // Check if 'action' exists in the column configuration
    //   )
    // ) {
      dispatch(setSelectedDataId(record[actionID]));
      navigate(`/${path}/${record[actionID]}`);
      // Store the clicked data ID in local storage only when the path is present and not an empty array
      localStorage.setItem('selectedDataId', record[actionID]);
      localStorage.setItem('jobid', record[jobId]);
    


  };
  const handleModalOpen = (text, title) => {
    setModalData({ text, title });
    setIsModalOpen(true);
  }
  // console.log(modalData, "hii");
  // console.log("modalData.title:", modalData.title);
  // console.log("tabTitle:", tabTitle);
  // console.log("path:", path);

  // useEffect(()=>{
  //   const record
  //   console.log(record.jobId)
  // })

  useEffect(() => {
    console.log(header, "header");
    
    setTableData(
      (header[0]?.[tabValue || path || ''] || []).map((each, i) => ({
        title: (
          <span
            key={i}
            
            className="text-[10px] 2xl:text-xs text-[#667085] dark:text-white font-medium capitalize"
          >
            {each.title}
          </span>
        ),
        dataIndex: each.value,
        sorter: each.sorter, 
        
        // dataIndex: "firstName",
        render: (record, text) => (
          <>
            <div
             className={`${each.width} cursor-pointer`}
              // onClick={() => {
              //   navigate(`/${path}/${text[actionID]}`);
              //   // Store the clicked data ID in local storage only when the path is present and not an empty array
              //   localStorage.setItem('selectedDataId', text[actionID]);
              //   localStorage.setItem('jobid', text[jobId]);
              // }}

              
            >
              {each.value === "isActive" ? (
                <div
                  key={text}
                  className={`${parseInt(record) === 1
                    ? " bg-emerald-100 text-emerald-600"
                    : " bg-rose-100 text-rose-600"
                    } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                  // onClick={() => {
                  //   !viewOutside &&
                  //     handleModalOpen(text, drawerH[0]?.[tabValue || path]);
                  //   // console.log(tabValue, path, "kiok");
                  // }}
                  
                >
                  <RxDotFilled
                    className={`${parseInt(record) === 1
                      ? "text-emerald-600"
                      : "text-rose-600"
                      } text-base 2xl:text-lg`}
                  />
                  {parseInt(record) === 1 ? "Active" : "Inactive"}
                </div>
              ) : each.value === "currentStatus" ? (
                <div
                  key={text}
                  onClick={() => {
                    if(  path &&
                      path.length > 0){
                      console.log(path)
                      navigate(`/${path}/${text[actionID]}`);
                    // Store the clicked data ID in local storage only when the path is present and not an empty array
                    localStorage.setItem('selectedDataId', text[actionID]);
                    localStorage.setItem('jobid', text[jobId]);
                    }
                  }
                }
                  className={`${parseInt(record) === 0 || record === null
                    ? "bg-yellow-100 text-yellow-600"
                    : parseInt(record) === 1
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-rose-100 text-rose-600"
                    } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                  // onClick={() => {
                  //   !viewOutside &&
                  //     handleModalOpen(text, header[0]?.[tabValue || path]);
                  //   // console.log(tabValue, path, "kiok");
                  // }}
                >
                  <RxDotFilled
                    className={`${parseInt(record) === 0
                      ? "text-yellow-600"
                      : parseInt(record) === 1
                        ? "text-emerald-600"
                        : "text-rose-600"
                      } text-base 2xl:text-lg`}
                  />
                  {parseInt(record) === 0 || record === null
                    ? "Under Process"
                    : parseInt(record) === 1
                      ? "Hired"
                      : "Disqualified"}
                </div>
              ) : each.flexColumn === true ? (
                <div className="flex items-center gap-4"
                  // onClick={() => {
                  //   !viewOutside &&
                  //     handleModalOpen(text, drawerH[0]?.[tabValue || path]);
                  // }}
                  >
                  <div className="w-8 h-8 overflow-hidden rounded-full 2xl:w-10 2xl:h-10">
                    <img
                      // src={record.logo}
                      src={Logo1}
                      className="object-cover object-center w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <p className="text-xs font-semibold text-black capitalize 2xl:text-sm dark:text-white" >
                      {text.company}
                    </p>
                    {/* <>{alert(JSON.stringify(text[each.]))}</> */}
                    <p className="!font-normal para">{text.url}</p>
                  </div>
                  <div className="pl-4">
                    <div
                      className={`${parseInt(text.isActive) === 1
                        ? " bg-emerald-100 text-emerald-600"
                        : " bg-rose-100 text-rose-600"
                        } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                    >
                      <RxDotFilled
                        className={`${parseInt(text.isActive) === 1
                          ? "text-emerald-600"
                          : "text-rose-600"
                          } text-base 2xl:text-lg`}
                      />
                      {parseInt(text.isActive) === 1 ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              ) : each.block ? (
                <div 
                // onClick={() => {
                //   !viewOutside &&
                //     handleModalOpen(text, drawerH[0]?.[tabValue || path]);
                // }}
                onClick={() => {
                  if( path &&
                    path.length > 0){
                  navigate(`/${path}/${text[actionID]}`);
                  // Store the clicked data ID in local storage only when the path is present and not an empty array
                  localStorage.setItem('selectedDataId', text[actionID]);
                  localStorage.setItem('jobid', text[jobId]);
                }}
              }
                
                >
                  <p className="text-xs font-medium text-black 2xl:text-sm dark:text-white">
                    {text[each.value]}
                  </p>
                  <p className="!font-normal para" >{text[each.value]}</p>
                </div>
              ) : each.actionToggle ? (
                <Tooltip
                  title={parseInt(text.isActive) ? "Active" : "Inactive"}
                >

                  <Switch
                    checked={parseInt(text.isActive)}
                    onChange={(checked) => {
                      handleToggleList(text?.[actionID], checked);
                      // buttonClick(each.companyId);
                      // activeOrNot(checked);
                      //console.log(checked);
                      //console.log(text?.[actionID]);
                      refreshJobCrad(true)
                      updateCompany(text?.[actionID], checked);
                    }}
                    className=" bg-[#c2c0c0aa]"
                    size={isSmallScreen ? "small" : "default"}
                  />
                </Tooltip>
              ) : each.action ? (
                <div className="flex items-center justify-start gap-4">
                  <Tooltip title="Edit" color={primaryColor}>
                    <button
                      className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                      onClick={() => {
                        buttonClick(text[actionID], "edit"); //"8"
                        clickDrawer(true);

                        // console.log(actionID);
                        // console.log(text[actionID], "ddddddddsfsd");
                      }}
                    >
                      <FaPencil className="text-xs 2xl:text-sm" />
                    </button>
                  </Tooltip>
                  {each.hideIcon !== "delete" && (
                    <Popconfirm
                      placement="top"
                      title={"Confirm To Delete"}
                      description={"Are you sure to delete this row?"}
                      okText="Confirm"
                      cancelText="No"
                      onConfirm={() => {
                        // console.log("hh");
                        deleteRecord(text[actionID]);
                      }}
                      // className="activeBtn"
                      style={{}}
                    >
                      <Tooltip title="Delete" placement="bottom" color="red">
                        <button
                          className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                        // onClick={() => {
                        //   // deleteRecord(text[actionID]);
                        //   // clickDrawer(true);
                        //   // console.log(text[actionID]);
                        // }}
                        >
                          <RiDeleteBin5Line className="text-xs 2xl:text-sm" />
                        </button>
                      </Tooltip>
                    </Popconfirm>
                  )}
                </div>

              ) : each.bold === true ? (
                <div
                  className={` ${each.bold === true
                    ? "font-semibold text-black"
                    : "text-[#667085]"
                    } text-xs 2xl:text-sm dark:text-white font-medium`}
                  // onClick={() => {
                  //   !viewOutside &&
                  //   handleModalOpen(text, drawerH[0]?.[tabValue || path]);
                  // }}
                  onClick={() => {
                    if( path &&
                      path.length > 0){
                    navigate(`/${path}/${text[actionID]}`);
                    // Store the clicked data ID in local storage only when the path is present and not an empty array
                    localStorage.setItem('selectedDataId', text[actionID]);
                    localStorage.setItem('jobid', text[jobId]);
                  }}
                }

                  style={{ width: each.width }}
                >
                  <p>
                    {typeof record === "string"
                      ? record.charAt(0).toUpperCase() +
                      record.slice(1).split("_").join(" ") || "--"
                      : Array.isArray(record)
                        ? record.map((approver, index) => {
                          // Construct the display name for each approver
                          const displayName =
                            `${approver.firstName} ${approver.lastName}`.trim();
                          return (
                            <span key={index}>
                              {displayName}
                              {index < record.length - 1 ? ", " : ""}
                            </span>
                          );
                        })
                        : !record
                          ? "--"
                          : record}
                  </p>
                </div>
              ) : each.titleCaseSensitive === true ? (
                <div
                  className={`text-[#667085] text-xs 2xl:text-sm dark:text-white font-medium`}
                  // onClick={() => {
                  //   !viewOutside &&
                  //   handleModalOpen(text, drawerH[0]?.[tabValue || path]);
                  // }}
                  style={{ width: each.width }}
                >
                  <p>
                    {typeof record === "string"
                      ? record.charAt(0).toUpperCase() +
                      record.slice(1).split("_").join(" ") || "--"
                      : Array.isArray(record)
                        ? record.map((approver, index) => {
                          // Construct the display name for each approver
                          const displayName =
                            `${approver.firstName} ${approver.lastName}`.trim();
                          return (
                            <span key={index}>
                              {displayName}
                              {index < record.length - 1 ? ", " : ""}
                            </span>
                          );
                        })
                        : !record
                          ? "--"
                          : record}
                  </p>
                </div>
              ) :
               each.value === "viewData" ? (
                <Tooltip title="View Details" placement="top" color={primaryColor}>
                <div onClick={() => {
                  !viewOutside &&
                  handleModalOpen(text, drawerH[0]?.[tabValue || path]);
                }} className="w-7 h-7 rounded-full text-center p-2 hover:text-primary hover:bg-primaryalpha/5">
                  <IoEyeOutline />
                </div>
              </Tooltip>
       ): 
       (
                // </Popover>
                <div 
                onClick={() => {
                  if( path &&
                    path.length > 0){
                  navigate(`/${path}/${text[actionID]}`);
                  // Store the clicked data ID in local storage only when the path is present and not an empty array
                  localStorage.setItem('selectedDataId', text[actionID]);
                  localStorage.setItem('jobid', text[jobId]);
                }}
              }
                className="text-[#667085] text-xs 2xl:text-sm dark:text-white font-medium">
<p>
  {record && typeof record === 'string' 
    ? record.charAt(0).toUpperCase() + record.slice(1) 
    : record}
</p>
                </div>
               ) 
    }
            
            {
              each.dotsVertical && (
                <Popover
                  content={
                    <div>
                      <p
                        onClick={() => {
                          buttonClick(text[actionID], "edit"); //"8"
                          clickDrawer(true);
                          // console.log(text[actionID]);

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
                          // console.log("hh");
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
                  <BsThreeDotsVertical className=" opacity-50 cursor-pointer" />
                </Popover>
              )
            }
         </div>
          </>
        ),
        // fixed: each.fixed,
        width: each.width,
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
    //console.log(newSelectedRowKeys, "eeddd");
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
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    onSelect: (record, selected, selectedRows) => {
      //console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //console.log(selected, selectedRows, changeRows);
    },
  };

  // FILTER DROPDOWN SEARCH
  const handleColumnSearch = (searchValue) => {
    // Convert searchValue to lowercase for case-insensitive search
    const lowerSearchValue = searchValue.toLowerCase();

    // Filter columns based on whether their titles contain the searchValue
    const filteredColumns = tableData.filter((column) => {
      //  console.log(column, "column");
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
      // label: (
      //   <Checkbox
      //     checked={visibleColumns?.length === tableData?.length}
      //     onChange={() => {
      //       setVisibleColumns(
      //         visibleColumns?.length === tableData?.length
      //           ? []
      //           : tableData.map((col) => col.dataIndex)
      //       );
      //     }}
      //   >
      //     Select All
      //   </Checkbox>
      // ),
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
      // label: (
      //   <Checkbox
      //     value={column.title}
      //     checked={visibleColumns?.includes(column.dataIndex)}
      //     onChange={handleColumnVisibilityChange(column.dataIndex)}
      //   >
      //     {column.title}
      //   </Checkbox>
      // ),
    })) || []),
  ];
  const columnMenuItems = [
    {
      key: "selectAll",
      // label: (
      //   <Checkbox
      //     checked={visibleColumns?.length === tableData?.length}
      //     onChange={() => {
      //       setVisibleColumns(
      //         visibleColumns?.length === tableData?.length
      //           ? []
      //           : tableData.map((col) => col.dataIndex)
      //       );
      //     }}
      //   >
      //     Select All
      //   </Checkbox>
      // ),
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
      // label: (
      //   <Checkbox
      //     value={column.title}
      //     checked={visibleColumns?.includes(column.dataIndex)}
      //     onChange={handleColumnVisibilityChange(column.dataIndex)}
      //   >
      //     {column.title}
      //   </Checkbox>
      // ),
    })) || []),
  ];

  // const columnMenu = <Menu mode="vertical" items={columnMenuItems} />;

  const onChangeGridlist = ({ target: { value } }) => {
    // console.log("radio1 checked", value);
    setGridList(value);
  };
  const splitTitle = tabTitle.split("_");
  const jsonResult = splitTitle
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");


  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 xl:items-center xl:flex-row">
        {!tab ? (
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-semibold dark:text-white ">
              {tabTitle
                ? tabTitle?.charAt(0).toUpperCase() +
                tabTitle.slice(1).split("_").join(" ")
                : path?.charAt(0).toUpperCase() +
                path.slice(1).split("_").join(" ")}
            </p>
            {/* <p className="text-lg font-semibold dark:text-white">
              {jsonResult ||  path?.charAt(0).toUpperCase() + path.slice(1).split("_")}
            </p> */}
            {inputType ? (
              <div className="">
                <div className="flex items-center justify-start gap-2 ">
                  {inputType?.map((each) => each.type)}
                </div>
              </div>
            ) : (
              <div
                style={{ marginLeft: 8 }}
                className={` bg-primaryalpha/10 dark:bg-primaryalpha/30 text-primary text-[10px] 2xl:text-xs rounded-full px-3 py-1 vhcenter`}
              >
                {hasSelected
                  ? `${selectedRowKeys?.length} ${jsonResult ? jsonResult : path.split("_").join(" ")
                  } Selected`
                  : `All ${jsonResult ? jsonResult : path.split("_").join(" ")
                  }`
                }
              </div>
            )}
          </div>
        ) : (
          <TabsNew
            tabs={tab}
            tabClick={(e) => {
              // console.log(e, "e");
              setTabClick(e);
              handleTabChange(e);
            }}
            gap={false}
          />
        )}
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold dark:text-white">
            {/* {tabTitle?.split("_") || path?.split("_")} */}
            {/* {jsonResult || path} */}
            {/* {jsonResult || path} */}
            {/* (0) */}
          </p>
          <div
            style={{ marginLeft: 8 }}
            className={`bg-[${primaryColor}] bg-opacity-10 text-primary text-[10px] 2xl:text-xs rounded-full px-3 py-1 vhcenter`}
          >
            {/* {console.log(...tabTitle.split("_"))} */}
            {All ? (
              <div>
                {/* {hasSelected
              ? `${selectedRowKeys?.length} ${
                  jsonResult ? jsonResult : path
                } Selected`
              : `All ${jsonResult ? jsonResult : path}`} */}

                <p className="text-lg font-semibold dark:text-white">
                  {/* {tabTitle?.split("_") || path?.split("_")} */}
                  {/* {jsonResult || path} */}

                  {/* (0) */}
                </p>
              </div>
            ) : (
              showsearch && (
                <div className="flex items-center gap-3">
                  
                  <SearchBox
                    data={data}
                    placeholder={t("Search_placeholder")}
                    value={searchValue}
                    icon={<CiSearch className=" dark:text-white" />}
                    className="mt-0 w-ful md:w-auto"
                    error=""
                    // change={(value) => {
                    //   setSearchValue(value);
                    // }}
                    // onSearch={(value) => {
                    //   setSearchFilter(value);
                    // }}
                    change={(value) => {
                      setSearchValue(value);
                    }}
                    onSearch={(value) => {
                      // console.log(value);
                      setSearchFilter(value);
                    }}
                  />
                </div>
              )

            )}

            {/*             
            {hasSelected
              ? `${selectedRowKeys?.length} ${
                  jsonResult ? jsonResult : path
                } Selected`
              : `All ${jsonResult ? jsonResult : path}`} */}
            {/* {console.log(jsonResult)} */}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">

          {
            showButton ? (
              <ButtonClick

                handleSubmit={() => clickDrawer(true)}
                buttonName={`Add ${navigationPath}`}
                className="your-custom-styles"
                BtnType="Add"
              >

              </ButtonClick>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {All && (
                  <SearchBox
                    // title="Search"
                    data={data}
                    placeholder={t("Search")}
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
                  />)}

                {/* <div>
                       <Dropdown
                   menu={{
                     items,
                   }}
                   placement="bottomRight"
                 >
                   <Button>bottomRight</Button>
                 </Dropdown>



                <Dropdown
                       menu={columnMenuItems.map((item, index) => ({
                         ...item,
                         key: index,
                       }))}
                    menu={{ items }}
                    placement="bottomRight"
                        trigger={["click"]}
                        open={dropdownVisible}
                        onOpenChange={(visible) => {
                          console.log(visible);
                          setDropdownVisible(visible);
                        }}
                  >
                        <Button>Filters</Button>
                 <Button
                      className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA]"
                      onClick={(e) => {
                        console.log(e);
                        e.stopPropagation(); // Prevent dropdown from closing
                        setDropdownVisible(!dropdownVisible);
                      }}
                      size={isSmallScreen ? "default" : "large"}
                    >
                      <span className="mr-2">{t("Filters")}</span>
                      <span className="ml-auto">
                        <LuListFilter className="text-base 2xl:text-lg" />
                      </span>
                    </Button>
                  </Dropdown>
                </div> */}


              </div>

            )
          }


        </div>

      </div>
      <div className="border rounded-lg border-[#E7E7E7] dark:border-secondary relative overflow-auto">
        {/* {console.log(data)} */}
        {console.log(tableData)}
        {data && (
          
          <Table
            //rowSelection={{ ...rowSelection }}
            columns={tableData}
            onChange={(pagination, filters, sorter) => handlesort(pagination, filters, sorter)}
             

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
            // onRow={(record) => ({
            //   onClick: () => handleRowClick(record),
            // })}
            dataSource={listData}
            size={isSmallScreen ? "small" : ""}
          />
        )}
      </div>

      {isModalOpen && (
        <ModalPop
          width={1000}
          open={isModalOpen}
          title={
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <h1 className="h1 border-b-2 border-primaryalpha pb-0.5">
                  {tabTitle
                    ? tabTitle?.charAt(0).toUpperCase() +
                    tabTitle.slice(1).split("_").join(" ")
                    : path?.charAt(0).toUpperCase() +
                    path.slice(1).split("_").join(" ")}
                </h1>
                {/* <p className="text-sm">Work In Progress...</p> */}
              </div>
            </div>
          }
          close={(e) => {
            setIsModalOpen(e);
          }}
        >
          {/* {console.log(modalData, "this is modaldata")} */}
          <div className="flex flex-col gap-2 dark:text-white">
            {/* Render all title-value pairs */}
            {modalData.title.map((titleItem, index) => (
              <div className="flex items-center gap-3" key={index}>
                <h4 className="font-bold">{titleItem.title}</h4>
                <h4 className="font-bold">{" :"}</h4>
                {/* Render corresponding value for the title */}
                {titleItem.value === "isActive" ? (
                  <div
                    className={`${parseInt(modalData.text[titleItem.value]) === 1
                      ? " bg-emerald-100 text-emerald-600"
                      : " bg-rose-100 text-rose-600"
                      } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                  >
                    <RxDotFilled
                      className={`${parseInt(modalData.text[titleItem.value]) === 1
                        ? "text-emerald-600"
                        : "text-rose-600"
                        } text-base 2xl:text-lg`}
                    />
                    {parseInt(modalData.text[titleItem.value]) === 1
                      ? "Active"
                      : "Inactive"}
                  </div>
                ) : (
                  <h1>{modalData.text[titleItem.value]}</h1>
                )}
              </div>
            ))}
          </div>
        </ModalPop>
      )}

      {contextHolder}
    </div>
  );
};

export default TableAnt;
