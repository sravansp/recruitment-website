// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { DownOutlined, RightOutlined } from "@ant-design/icons";
// import { Menu, Dropdown, Checkbox } from "antd";
// import Accordion from "./Accordion";

// const items = [
//   {
//     title: "Job Types",
//     checkboxes: [
//       { label: "Full-time", value: "fulltime" },
//       { label: "Part-time", value: "parttime" },
//       { label: "Temporary", value: "temporary" },
//       {label:"Intern",value:"inter"}
//       // Add more checkboxes as needed
//     ],
//     //   content: <p>This is the content for section 1...</p>,
//   },
//   {
//     title: "Degree",
//     checkboxes: [
//       { label: "Associate", value: "associate" },
//       { label: "Bachelor’s", value: "bachelors" },
//       { label: "Master’s", value: "masters" },
//       { label: "Ph.D", value: "phd" },
//       { label: "Pursuing Degree", value: "pursuing degree" },
//       // Add more checkboxes as needed
//     ],
//     //   content: <div>More content for section 2...</div>,
//   },
//   // ... other items
// ];

// const CustomDropdown = () => {
//   const [checkedItems, setCheckedItems] = useState({});
//   const [accordionStates, setAccordionStates] = useState(true);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  
//   const dropdownRef = useRef(null);

//   const handleCheckboxChange = (accordionKey, checkboxValue) => {
//     setCheckedItems((prevCheckedItems) => ({
//       ...prevCheckedItems,
//       [accordionKey]: {
//         ...(prevCheckedItems[accordionKey] || {}),
//         [checkboxValue]: !prevCheckedItems[accordionKey]?.[checkboxValue],
//       },
//     }));
//   };

//   const toggleAccordion = (accordionKey) => {
//     setAccordionStates((prevAccordionStates) => ({
//       ...prevAccordionStates,
//       [accordionKey]: !prevAccordionStates[accordionKey],
//     }));
//   };

//   const handleMenuClick = (e) => {
//     if (e && e.event && e.event.stopPropagation) {
//       e.event.stopPropagation();
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       // Clicked outside the dropdown, close it
//       setAccordionStates({});
//     }
//   };

//   useEffect(() => {
//     // Attach click event listener on the document to handle clicks outside the dropdown
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       // Remove the event listener on component unmount
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const menu = (
//     <Menu onClick={handleMenuClick} className="p-4 min-w-[250px]">
//       <Accordion items={items}/>
//     </Menu>
//   );

//   return (
//     <><Dropdown overlay={menu} trigger={["click"]} ref={dropdownRef} visible={isDropdownOpen}>
//     <a
//       className="ant-dropdown-link para text-[#656565] cursor-pointer"
//       onClick={(e) => {
//         e.preventDefault();
//         setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open state
//       }}
//       >
//       Filter Jobs <DownOutlined />
//     </a>
//   </Dropdown></>
//   );
// };

// export default CustomDropdown;






import React, { useState, useRef, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import Accordion from "./Accordion";
import dynamic from 'next/dynamic';

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
  {
    title: "Degree",
    checkboxes: [
      { label: "Associate", value: "associate" },
      { label: "Bachelor’s", value: "bachelors" },
      { label: "Master’s", value: "masters" },
      { label: "Ph.D", value: "phd" },
      { label: "Pursuing Degree", value: "pursuing degree" },
    ],
  },
];

const CustomDropdown = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [accordionStates, setAccordionStates] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Set to true initially
  
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
    <Dropdown overlay={menu} trigger={["click"]} ref={dropdownRef} visible={isDropdownOpen}>
      <a
        className="ant-dropdown-link para text-[#656565] cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open state
        }}
      >
        Filter Jobs <DownOutlined />
      </a>
    </Dropdown>
  );
};

// Wrap the entire CustomDropdown component with next/dynamic to disable server-side rendering
const DynamicCustomDropdown = dynamic(() => Promise.resolve(CustomDropdown), {
  ssr: false,
});

export default DynamicCustomDropdown;

