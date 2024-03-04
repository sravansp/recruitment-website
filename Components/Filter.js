import React, { useState, useRef, useEffect } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Checkbox } from "antd";
import Accordion from "./Accordion";

const items = [
  {
    title: "Section 1",
    checkboxes: [
      { label: "Option 1A", value: "A" },
      { label: "Option 1B", value: "B" },
      { label: "Option 1C", value: "C" },
      // Add more checkboxes as needed
    ],
    //   content: <p>This is the content for section 1...</p>,
  },
  {
    title: "Section 2",
    checkboxes: [
      { label: "Option 2A", value: "A" },
      { label: "Option 2B", value: "B" },
      { label: "Option 2C", value: "C" },
      { label: "Option 2D", value: "D" },
      // Add more checkboxes as needed
    ],
    //   content: <div>More content for section 2...</div>,
  },
  // ... other items
];

const CustomDropdown = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [accordionStates, setAccordionStates] = useState({});
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (accordionKey, checkboxValue) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [accordionKey]: {
        ...(prevCheckedItems[accordionKey] || {}),
        [checkboxValue]: !prevCheckedItems[accordionKey]?.[checkboxValue],
      },
    }));
  };

  const toggleAccordion = (accordionKey) => {
    setAccordionStates((prevAccordionStates) => ({
      ...prevAccordionStates,
      [accordionKey]: !prevAccordionStates[accordionKey],
    }));
  };

  const handleMenuClick = (e) => {
    if (e && e.event && e.event.stopPropagation) {
      e.event.stopPropagation();
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      // Clicked outside the dropdown, close it
      setAccordionStates({});
    }
  };

  useEffect(() => {
    // Attach click event listener on the document to handle clicks outside the dropdown
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Remove the event listener on component unmount
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const menu = (
    <Menu onClick={handleMenuClick} className="p-4 min-w-[250px]">
      <Accordion items={items}/>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} ref={dropdownRef}>
      <a
        className="ant-dropdown-link para text-[#656565] cursor-pointer"
        onClick={(e) => e.preventDefault()}
      >
        Filter Jobs <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default CustomDropdown;
