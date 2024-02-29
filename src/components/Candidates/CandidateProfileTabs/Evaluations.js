import React from "react";
import ButtonClick from "../../common/Button";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { RiHome6Line, RiStickyNoteLine } from "react-icons/ri";
import TextEditor from "../../common/TextEditor/TextEditor";
import TabsNew from "../../common/TabsNew";
import RadioButton from "../../common/RadioButton";
import Radiobuttonnew from "../../common/Radiobuttonnew";
import Dropdown from "../../common/Dropdown";
import { Flex, Radio } from "antd";
import { FaCircleMinus, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";

const Evaluations = () => {
  const primaryColor = localStorage.getItem("mainColor");
  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  const tabData = [
    {
      id: 9,
      title: "Notes",
      value: "notes",
      // content: <Overview />,
      icon: <RiHome6Line className="text-base" />,
    },
    {
      id: 10,
      title: "Tags",
      value: "tags",
      icon: <RiStickyNoteLine className="text-base" />,
    },
    {
      id: 11,
      title: "Documents",
      value: "documents",
      // content: <ActivityFeed />,
      icon: <BsFileEarmarkRichtext className="text-base" />,
    },
  ];
  const onChange = (e) => {
    
  };
  return (
    <div className="flex flex-row gap-6 lg:col-span-8">
      <div className="rounded-md h-full sm:w-full w-full bg-white border ">
        <div className="flex justify-between items-center">
          <h3 className="w-[150px] h-[22px] mt-[18.88px] ml-[13.61px] font-[sf pro] size-[16px] text-black font-semibold ">
            Evaluation Form
          </h3>
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
            // style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Create New Form" BtnType="primary" />
          </div>
        </div>
        {/* <div className="v-divider  border-[1px] opacity-[10px]" /> */}
        <div className="divider-h" />
        <div className="flex flex-col mt-[20px] ml-[14px] gap-[15px] font-[SF Pro] font-normal text-sm leading-5 text-black ">
          <RadioButton
            title="Does the candidate have the appropriate educational qualifications or training for this position?"
            // value={}
            // change={}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "not sure", label: "Not Sure" },
            ]}
            gap={"125px"}
          />
          <RadioButton
            title="Did the candidate demonstrate, through their answers, a high degree of initiative?"
            // value={}
            // change={}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "not sure", label: "Not Sure" },
            ]}
            
          />
          <Dropdown
            title="Characteristics" // Example title passed as prop
            // value={}
            // change={}
            // options={}
            placeholder="Choose..."
            className="w-[196px]"
          />
          <Dropdown
            title="Appearance" // Example title passed as prop
            // value={}
            // change={}
            // options={}
            placeholder="Choose..."
            className="w-[196px]"
          />
          <div className="v-divider  border-[1px] opacity-[10px] " />
          <div className="flex  justify-between ">
            <h3 className="text-black font-semibold text-base font-['SF Pro']  !leading-6 ">Overall Scrore</h3>
            <p className="leading-4 text-black font-['SF Pro'] font-normal mr-4 ">*Overall score always required</p>
          </div>
          <p className="font-normal text-xs leading-5 font-['SF Pro'] ">Give the candidate a quick evaluation score</p>
       
        
        
    <Radio.Group onChange={onChange} defaultValue="" className="flex flex-grow w-[860px] h-[70px] mb-2">
      <Radio.Button className="w-[172px] h-[70px]  bg-gray-200 text-gray-500 " value="a"><RxCrossCircled className="bg-gray-200 text-gray-500 ml-5 " />Strong No</Radio.Button>
      <Radio.Button className="w-[172px] h-[70px]  bg-gray-200 text-gray-500" value="b"><FaThumbsDown className="bg-gray-200 text-gray-500 ml-1 " />NO</Radio.Button>
      <Radio.Button className="w-[172px] h-[70px]  bg-gray-200 text-gray-500" value="c" ><FaCircleMinus className="bg-gray-200 text-gray-500 ml-5 " />Not Sure</Radio.Button>
      <Radio.Button className="w-[172px] h-[70px]  bg-gray-200 text-gray-500" value="d"> <FaThumbsUp className="bg-gray-200 text-gray-500 ml-1" />Yes</Radio.Button>
      <Radio.Button className="w-[172px] h-[70px]  bg-gray-200 text-gray-500" value="e"><GoStarFill className="bg-gray-200 text-gray-500 ml-6 " />Strong Yes</Radio.Button>
    </Radio.Group>
    
    </div>
      </div>

      <div className="">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 w-full ">
          <div className="flex flex-grow justify-between items-center">
            <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
            <ButtonClick buttonName="Unpin" BtnType="link" />
          </div>

          <TextEditor
            // initialValue={content}
            // onChange={handleEditorChange}
            className="h-[250px] w-[580px]"
          />
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Save" BtnType="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
