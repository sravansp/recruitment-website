import React from 'react'
import { Flex, Radio } from 'antd';
import { useMediaQuery } from "react-responsive";

const Radiobuttonnew = ({
    change = () => {},
    value = "",
    title = "",
    error = "",
    options = [],
    required = false,
    children,
    defaultValue= ""

}) => {

    const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
    return (
        <div className={`flex flex-col ${title ? "gap-2" : "gap-0 items-center"} `}>
          <div className="flex dark:text-white">
            <p className="text-xs font-medium 2xl:text-sm dark:text-white">{title}</p>
            
          </div>
        
         
          <Radio.Group
            
            defaultValue={defaultValue}
            size={isSmallScreen ? "default" : "large"}
            onChange={(e) => {
              change(e.target.value);
            }}
            buttonStyle="solid"
          >
            <div className='radioButtons'>
            {options?.map((radio) => (
                
              <Radio.Button  value={radio.value}><span className="text-xs 2xl:text-sm dark:text-white" title={radio.label}>{radio.label}</span></Radio.Button >
              
            ))}
            </div>
            {/* <Radio value={"male"}>Male</Radio>
            <Radio value={"female"}>Female</Radio> */}
          </Radio.Group>
        
          {/* <Radio.Group
            onChange={(e) => {
              change(e.target.value);
            }}
            value={value}
            name="radiogroup"
          >
            {children}
            {/* {options?.map((radio) => (
              <Radio value={radio.value}>{radio.label}</Radio>
            ))} 
          
          </Radio.Group> */}
          {error && (
            <p className=" flex justify-start items-center my-1 mb-0 text-[10px] text-red-600">
              <span className="text-[10px] pl-1">{error}</span>
            </p>
          )}
        </div>
      );
}

export default Radiobuttonnew