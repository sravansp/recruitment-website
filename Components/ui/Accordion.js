"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ToggleBtn from "@components/ui/ToggleBtn";
import { Table } from "antd";

export default function Accordion({
  children,
  data = [],
  padding = true,
  toggleBtn = false,
  title,
  description,
  click = () => {},
  initialExpanded = false,
  tableshow=false,
  
}) {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [primaryColor, setPrimaryColor] = useState('');
  useEffect(() => {
    
    const color = localStorage.getItem("mainColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);
  // const toggleAccordion = (id) => {
  //   setExpanded((prevExpanded) => ({
  //     ...prevExpanded,
  //     [id]: !prevExpanded[id],
  //   }));
  // };

  useEffect(() => {
    console.log(expanded[1]);
    console.log(data)
  }, [expanded]);

  return (
    <div className="relative flex flex-col gap-6" onClick={() => click()}>
      {/*  Accordian item 1 */}
      {/* {data.map((item) => ( */}
      <div
        // key={item.id}
        className="p-1 bg-white rounded-[10px] dark:bg-transparent dark:border dark:border-secondaryWhite border-opacity-20 dark:border-opacity-10"
      >
        <h2>
          <button
            type="button"
            className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left rounded-md"
            style={{backgroundColor: `${primaryColor}10`}}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={`acco-text-item`}
          >
            <div className="text-left rtl:text-right">
              <h1 className="acco-h1">{title}</h1>
              <p className="para">{description}</p>
            </div>
            <div
              className={`rounded-[4px] ${
                !toggleBtn && "bg-secondaryWhite dark:bg-secondaryDark"
              }  p-[5px]`}
            >
              {toggleBtn ? (
                <ToggleBtn value={expanded ? 1 : 0} />
              ) : (
                <IoIosArrowForward
                  size={18}
                  className={`transition duration-300 ease-out origin-center transform text-black text-opacity-20 dark:text-white dark:text-opacity-20 ${
                    expanded ? "!rotate-90" : ""
                  }`}
                />
              )}
            </div>
          </button>
        </h2>
        <div
          id={`acco-text-item`}
          role="region"
          aria-labelledby={`acco-title-item`}
          className={`grid overflow-hidden text-sm transition-all duration-300 ease-in-out ${
            expanded
              ? `grid-rows-[1fr] opacity-100 ${
                  padding ? "p-6" : ""
                } `
              : "grid-rows-[0fr] opacity-0 "
          }`}
        >
          <div className="flex flex-col gap-8 overflow-hidden">{children}</div>
          {/* Content */}
          {/* {tableshow && (
  <div>
    <Table>
      {/* <thead>
        <tr>
          <th>User ID</th>
          <th>User Image</th>
          <th>Username</th>
        
        </tr>
      </thead> *
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            
            <td>{item.userId}</td>
            <td>
              {item.userimage && (
                <img src={item.userimage} alt={`User ${item.userId} Image`} style={{ maxWidth: '100px' }} />
              )}
            </td>
            <td>{item.username}</td>
           
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)} */}
          
        </div>
      </div>

      {/* ))} */}
    </div>
  );
}
