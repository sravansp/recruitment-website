import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// ... (imports and component definition)

const TabsNew = ({ tabs, onTabChange, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].id);
  const [changeData, setChangedata] = useState(false);
  const [tabeName, setTabName] = useState("company");
  const [tabeData, setTabData] = useState();

  useMemo(() => {
    setChangedata(true);
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 p-[6px] bg-[#FAFAFA] dark:bg-secondaryDark border border-black border-opacity-10 rounded-xl flex-wrap">
        {tabs?.map((tab) => (
          <button
            // key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setTabName(tab.value);
              onTabChange && onTabChange(tab.id); // Notify parent about tab change
            }}
            className={`${
              activeTab === tab.id ? "" : ""
            } text-[9px] 2xl:text-sm font-medium whitespace-nowrap px-2.5 h-8 2xl:h-10 relative group`}
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
          <AnimatePresence key={tab.id}>
            {activeTab === tab.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`tab-panel flex flex-col gap-4 2xl:gap-6 ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.content}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default TabsNew;
