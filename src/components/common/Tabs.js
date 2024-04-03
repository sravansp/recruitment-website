import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import TableAnt from "./TableAnt";
import InProgress from "./InProgres";
import TableAnt1 from "./Table";
import { useTranslation } from "react-i18next";
import SearchBox from "./SearchBox";
import { CiSearch } from "react-icons/ci";
import { Button, Dropdown, Input, Radio } from "antd";
import { LuListFilter } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
import { BsGrid, BsListUl } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

const Tabs = ({
  tabs = [],
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
  showButton=false,
  Showsearch=false,
  refresh = () => {},
  All=false,
  recordId="",
  drawerH=[],
 
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [changeData, setChangedata] = useState(false);
  const [tabeName, setTabName] = useState("company");
  const [tabeData, setTabData] = useState();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [gridList, setGridList] = useState(1);
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [tableData, setTableData] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState();

  // useEffect(() => {
  //   console.log(activeTab);
  //   console.log(changeData);
  //   console.log(tabs[0]);

  //   //   console.log(data, "data1");
  //   //   console.log(tabs, "tabs");
  //   //   // if (data) {
  //   //   //   setChangedata(true);
  //   //   // }
  //   //   // setTabData([...tabs]);
  // }, [tabs]);
  console.log("action",actionID)
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
  useMemo(() => {
    setChangedata(true);
  }, [activeTab]);
  
  const handleColumnVisibilityChange = (column) => (e) => {
    e.stopPropagation();
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column]
    );
  };
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
  const onChangeGridlist = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setGridList(value);
  };
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

  return (
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
              {tab.title}
            </span>
          </button>
        ))}
                     {/* <div className="flex flex-wrap items-center justify-end gap-3">
                
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
            {/* <Dropdown
              // menu={columnMenuItems.map((item, index) => ({
              //   ...item,
              //   key: index,
              // }))}
              menu={{ items }}
              placement="bottomRight" */}
              {/* // trigger={["click"]}
              // open={dropdownVisible}
              // onOpenChange={(visible) => { */}
              {/* //   console.log(visible);
              //   setDropdownVisible(visible);
              // }}
            > */}
              {/* <Button>Filters</Button> */}
              {/* <Button
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

    </div> */} 
      </div>
      <div className="tab-content">
        
        {tabs?.map((tab) => (
          <div
            key={tab.id}
            className={`tab-panel ${activeTab === tab.id ? "active" : ""}`}
          >

 
            
            {
              activeTab === tab.id &&
                changeData &&
                (data ? (
                  <TableAnt
                    data={data}
                    header={header}
                    tabValue={tab.value}
                    deleteApi={deleteApi}
                    updateApi={updateApi}
                    actionID={actionID}
                    buttonClick={buttonClick}
                    clickDrawer={clickDrawer}
                    path={path}
                    drawerH={drawerH}
                    // companyList = true,
                    // navigationClick = () => {},
                    // tablechange = false,
                    // children,
                    activeOrNot={activeOrNot}
                    actionToggle={actionToggle}
                    // ListApi=""
                    addButtonName={addButtonName}
                    exportButton={false}
                    title={title}
                    // showButton={showButton}
                    Showsearch={Showsearch }
                    // viewOutside={true}
                    refresh={() => {
                      refresh();
                    }}
                    All={All}
                    recordId={recordId}
                    // All={All}
                    
                    // arabic = true,
                    // checkBox = true
                  />
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold ">
                    <InProgress />
                  </div>
                ))
              // <div>
              //   {/* Render the specific content for each tab here */}
              //   {tab.value} Content
              // </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
