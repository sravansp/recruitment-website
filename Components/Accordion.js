"use clients";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "antd";

const AccordionItem = ({ title, checkboxes, isOpen, children, isActive, onClick }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="accordion-item"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="py-2">
            {/* Map over checkboxes array */}
            <div defaultValue={[]} className="grid grid-cols-2 gap-4" style={{ width: "100%" }}>
              {checkboxes.map((checkbox) => (
                <Checkbox key={checkbox.value} value={checkbox.value}>
                  {checkbox.label}
                </Checkbox>
              ))}
            </div>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Accordion = ({ items = [] }) => {
  const [activeIndices, setActiveIndices] = useState([]);
console.log(activeIndices);
  const handleItemClick = (index) => {
    setActiveIndices((prevIndices) => {
      const isIndexOpen = prevIndices.includes(index);

      if (isIndexOpen) {
        // If index is already open, close it
        return prevIndices.filter((i) => i !== index);
      } else {
        // If index is not open, open it
        return [...prevIndices, index];
      }
    });
  };

  return (
    <div className="px-4 py-2 space-y-2 divide-y">
      {items.map((item, index) => (
        <div key={index} className="overflow-hidden">
          <div
            className="flex justify-between py-2 cursor-pointer"
            onClick={() => handleItemClick(index)}
          >
            <p className="text-sm font-semibold dark:text-white">{item.title}</p>
            {/* {isOpen ? <DownOutlined /> : <RightOutlined />} {title} */}
          </div>
          <AnimatePresence>
            {activeIndices.includes(index) && (
              <AccordionItem
                title={item.title}
                checkboxes={item.checkboxes}
                children={item.content}
                isActive={true}
                onClick={() => handleItemClick(index)}
                key={index}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
