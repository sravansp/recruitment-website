import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import Accordion from "./Accordion";

const items = [
  {
    title: "Job Types",
    checkboxes: [
      { label: "Full-time", value: "fulltime" },
      { label: "Part-time", value: "parttime" },
      { label: "Temporary", value: "temporary" },
      { label: "Intern", value: "inter" }
    ],
  },
  // Add more sections as needed
];

const CustomDropdown = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    // Pass selected filters to parent component whenever it changes
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const handleCheckboxChange = (sectionTitle, checkboxValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [sectionTitle]: {
        ...(prevFilters[sectionTitle] || {}),
        [checkboxValue]: !prevFilters[sectionTitle]?.[checkboxValue],
      },
    }));
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
