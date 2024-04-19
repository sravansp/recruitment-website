import React, { useState } from 'react'
import Heading from '../common/Heading'
import ButtonClick from '../common/Button'
import { FiSettings } from 'react-icons/fi';
import { Button, Radio } from 'antd';
import Dropdown from '../common/Dropdown';
import SearchBox from '../common/SearchBox';
import { t } from 'i18next';
import { CiSearch } from 'react-icons/ci';
import { useMediaQuery } from 'react-responsive';
import { LuArrowDownUp, LuListFilter } from 'react-icons/lu';
import { BsListUl } from 'react-icons/bs';
import Accordion from '../common/Accordion';
import FlexCol from '../common/FlexCol';
import FormInput from '../common/FormInput';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../common/BreadCrumbs';

function SystemSettings() {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [gridList, setGridList] = useState(1);
  const { t } = useTranslation()
  const breadcrumbItems = [


      { label: t("Settings"), url: "" },
      { label: t("Other"), url: "" },
      { label: t("System_Settings"), url: "" },
      
    ];

  const gridListoptions = [
    {
      label: <BsListUl />,
      value: 1,
    },
  ]

  const onChangeGridlist = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setGridList(value);
  };
  return (
    <div className="flex flex-col gap-[25px]">

      <div className='flex flex-col'>
        <p className='font-bold text-lg'>System Settings</p>
        <p className='para font-medium'>{t("Main_Description")}</p>
      </div>

      {/* <div className="flex justify-between">
        <Heading title="System Settings" description="Lorem ipsum " />
       
      </div> */}
      <div className="flex flex-col justify-between gap-3 xl:items-center xl:flex-row">
        <div className="flex items-center gap-3">
          {/* <p className="text-lg font-semibold dark:text-white"> */}
          {/* {tabTitle?.split("_") || path?.split("_")} */}
          {/* {jsonResult || path} */}
          {/* (0) */}
          {/* </p> */}
          {/* <div
            style={{ marginLeft: 8 }}
            className={`bg-[${primaryColor}] bg-opacity-10 text-primary text-[10px] 2xl:text-xs rounded-full px-3 py-1 vhcenter`}
          >
            {console.log(...tabTitle.split("_"))}
            {hasSelected
              ? `${selectedRowKeys?.length} ${
                  jsonResult ? jsonResult : path
                } Selected`
              : `All ${jsonResult ? jsonResult : path}`}
            {console.log(jsonResult)}
          </div> */}
          <SearchBox
            // title="Search"

            placeholder={t("Search_placeholder")}

            icon={<CiSearch className=" dark:text-white" />}
            className="mt-0 w-ful md:w-auto  "
            error=""
          // change={(value) => {
          //   setSearchValue(value);
          // }}
          // onSearch={(value) => {
          //   // console.log(value);
          //   setSearchFilter(value);
          // }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div>
            {/* <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <Button>bottomRight</Button>
            </Dropdown>
            <Dropdown
              menu={columnMenuItems.map((item, index) => ({
                ...item,
                key: index,
              }))}
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
              open={dropdownVisible}
              onOpenChange={(visible) => {
                console.log(visible);
                setDropdownVisible(visible);
              }}
            > */}
            {/* <Button>Filters</Button> */}
            <Button
              className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA]"
              onClick={(e) => {
                // console.log(e);
                // e.stopPropagation(); // Prevent dropdown from closing
                // setDropdownVisible(!dropdownVisible);
              }}
              size={isSmallScreen ? "default" : "large"}
            >
              <span className="mr-2">{t("Filters")}</span>
              <span className="ml-auto">
                <LuListFilter className="text-base 2xl:text-lg" />
              </span>
            </Button>

          </div>
          <Button
            className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA] gap-2"
            size={isSmallScreen ? "default" : "large"}
          >
            <span className="mr-2">{t("Sort_by")}</span>
            <span className="ml-auto">
              <LuArrowDownUp className="text-base 2xl:text-lg" />
            </span>
          </Button>
          <Radio.Group
            options={gridListoptions}
            onChange={onChangeGridlist}
            value={gridList}
            optionType="button"
            className="flex items-center py-1.5 h-full"
            size={isSmallScreen ? "" : "large"}
          />
          <Button
            className="flex items-center justify-center h-full py-1.5 font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
            size={isSmallScreen ? "default" : "large"}
          >
            <FiSettings className="text-base 2xl:text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <FlexCol />

        <Accordion
          title={t("Listing_all_system")}
          description={t("Listing_All_description")}
          padding={true}
          className={""}
          initialExpanded={true}
          >
         <div
              id={`acco-text-item`}
              role="region"
              aria-labelledby={`acco-title-item`}
              className="flex flex-col gap-6  justify-between w-full"
            >
             
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <FormInput
                  title={t("Job_Code_Format")}
                  placeholder={"LYT"}
                  className="!text-[#344054]"
                />
                <FormInput
                  title={t("Prefix")}
                  placeholder={"LL01"}
                  className="!text-[#344054]"
                />
              </div>
              </div>
              </Accordion>
      </div>
    </div>
  )
}

export default SystemSettings
