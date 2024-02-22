import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import TableAnt from "./TableAnt";
import InProgress from "./InProgres";
import TableAnt1 from "./Table";

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
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [changeData, setChangedata] = useState(false);
  const [tabeName, setTabName] = useState("company");
  const [tabeData, setTabData] = useState();

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
  useMemo(() => {
    setChangedata(true);
  }, [activeTab]);

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
                    // companyList = true,
                    // navigationClick = () => {},
                    // tablechange = false,
                    // children,
                    activeOrNot={activeOrNot}
                    actionToggle={false}
                    // ListApi=""
                    addButtonName={addButtonName}
                    exportButton={false}
                    title={title}
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
