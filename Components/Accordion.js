"use clients";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "antd";

const AccordionItem = ({ title, checkboxes, isOpen, isActive, onCheckboxChange }) => {
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
            <div className="grid grid-cols-2 gap-4" style={{ width: "100%" }}>
              {checkboxes.map((checkbox) => (
                <Checkbox
                  key={checkbox.value}
                  value={checkbox.value}
                  onChange={(e) => onCheckboxChange(title, checkbox.value, e.target.checked)}
                >
                  {checkbox.label}
                </Checkbox>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Accordion = ({ items = [], onCheckboxChange }) => {
  const [activeIndices, setActiveIndices] = useState([]);
  useEffect(() => {
    setActiveIndices(items.map((_, index) => index)); // Set all indices as active initially
  }, [items]);
  const handleItemClick = (index) => {
    setActiveIndices((prevIndices) => {
      const isIndexOpen = prevIndices.includes(index);

      if (isIndexOpen) {
        return prevIndices.filter((i) => i !== index);
      } else {
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
            <p className="text-sm font-semibold">{item.title}</p>
          </div>
          <AnimatePresence>
            {activeIndices.includes(index) && (
              <AccordionItem
                title={item.title}
                checkboxes={item.checkboxes}
                isOpen={true}
                isActive={true}
                onCheckboxChange={onCheckboxChange}
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
