import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import Accordion from "./Accordion";

const items = [
  {
    title: "Job Types",
    checkboxes: [
      { label: "Full-time", value: "Full Time" },
      { label: "Part-time", value: "parttime" },
      { label: "Temporary", value: "temporary" },
      { label: "Intern", value: "intern" }
    ],
  },
  {
    title: "Degree",
    checkboxes: [
      { label: "Associate", value: "Associate" },
      { label: "Bachelor’s", value: "Bachelor’s" },
      { label: "Master’s", value: "Master’s" },
      { label: "Ph.D", value: "Ph.D" },
      { label: "Pursuing Degree", value: "Pursuing Degree" }
    ],
  },
  
];

const CustomDropdown = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    // Pass selected filters to parent component whenever it changes
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const handleCheckboxChange = (sectionTitle, checkboxValue) => {
    setSelectedFilters((prevFilters) => {
      const updatedSectionFilters = {
        ...(prevFilters[sectionTitle] || {}),
        [checkboxValue]: !prevFilters[sectionTitle]?.[checkboxValue],
      };
      
      return {
        ...prevFilters,
        [sectionTitle]: updatedSectionFilters,
      };
    });
  };

  const menu = (
    <Menu className="p-4 min-w-[250px]">
      <Accordion
        items={items}
        selectedFilters={selectedFilters}
        onCheckboxChange={handleCheckboxChange}
      />
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className="ant-dropdown-link para text-[#656565] cursor-pointer">
        Filter Jobs <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default CustomDropdown;
