import React, { useState, useRef, useEffect } from 'react';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Checkbox } from 'antd';

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
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Remove the event listener on component unmount
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" onClick={(e) => e.stopPropagation()}>
        <Accordion
          title="Accordion 1"
          accordionKey="accordion1"
          isOpen={accordionStates.accordion1}
          toggleAccordion={toggleAccordion}
        >
          <Checkbox
            onChange={() => handleCheckboxChange('accordion1', 'checkbox1')}
            checked={checkedItems.accordion1?.checkbox1}
          >
            Checkbox 1
          </Checkbox>
          <Checkbox
            onChange={() => handleCheckboxChange('accordion1', 'checkbox2')}
            checked={checkedItems.accordion1?.checkbox2}
          >
            Checkbox 2
          </Checkbox>
          {/* Add more checkboxes as needed */}
        </Accordion>
      </Menu.Item>
      <Menu.Item key="2" onClick={(e) => e.stopPropagation()}>
        <Accordion
          title="Accordion 2"
          accordionKey="accordion2"
          isOpen={accordionStates.accordion2}
          toggleAccordion={toggleAccordion}
        >
          {/* Add checkboxes for Accordion 2 */}
        </Accordion>
      </Menu.Item>
      {/* Add more accordions as needed */}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} ref={dropdownRef}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Filter Jobs <DownOutlined />
      </a>
    </Dropdown>
  );
};

const Accordion = ({ title, accordionKey, isOpen, toggleAccordion, children }) => {
  return (
    <div onClick={() => toggleAccordion(accordionKey)}>
      <div>
        {isOpen ? <DownOutlined /> : <RightOutlined />}
        {title}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default CustomDropdown;
