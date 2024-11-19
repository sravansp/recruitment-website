import React, { useEffect, useState } from "react";
import {
  ButtonClick,
  Table,
  Input,
  Dropdown,
  Space,
  Menu,
  Checkbox,
  Radio,
} from "antd";
import { RxDotFilled } from "react-icons/rx";
import FormInput from "./FormInput";
import { CiSearch } from "react-icons/ci";
import { TbDotsVertical } from "react-icons/tb";
import { LuListFilter } from "react-icons/lu";
import CheckBoxInput from "./CheckBoxInput";
import { BsListUl } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

// Filter Dropdown
const { SubMenu } = Menu;
// Table Header And Style
// push the array value in map

const columns = [
  {
    title: (
      <span className="text-xs text-[#667085] dark:text-white font-medium">
        Location & Description
      </span>
    ),
    render: (record) => (
      <div>
        <span className="font-medium">{record.location_name}</span>
        <br />
        <div className="text-[#667085] dark:text-white font-medium">
          <p>{record.description.eng}</p>
          <p>{record.description.arab}</p>
        </div>
      </div>
    ),
    responsive: ["xs"],
  },
  {
    title: (
      <span className="text-xs text-[#667085] dark:text-white font-medium">
        Location Name
      </span>
    ),
    dataIndex: "location_name",
    render: (text) => <span className="font-medium">{text}</span>,
    responsive: ["sm"],
  },
  {
    title: (
      <span className="text-xs text-[#667085] dark:text-white font-medium">
        Description
      </span>
    ),
    dataIndex: "description",
    render: (text, record) => (
      <div className="text-[#667085] dark:text-white font-medium">
        <p>{record.description.eng}</p>
        <p>{record.description.arab}</p>
      </div>
    ),
    responsive: ["sm"],
  },
  {
    title: (
      <span className="text-xs text-[#667085] dark:text-white font-medium">
        Status
      </span>
    ),
    dataIndex: "status",
    render: (status) => (
      <div
        className={`${
          status === 1
            ? " bg-emerald-100 text-emerald-600"
            : " bg-rose-100 text-rose-600"
        } rounded-full px-3 py-1 w-fit font-medium text-sm vhcenter flex-nowrap`}
      >
        <RxDotFilled
          className={`${
            status === 1 ? "text-emerald-600" : "text-rose-600"
          } text-lg`}
        />{" "}
        {status === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    title: "",
    dataIndex: "",
    render: () => (
      <Space size="middle">
        <Dropdown
          menu={{
            items,
          }}
        >
          <a>
            <TbDotsVertical className="text-gray-400 " />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

// Table Rows Data
const data = [
  {
    key: 1,
    location_name: "Dubai",
    description: {
      eng: "Coordinates the planning, execution, and completion of projects...",
      arab: "ينسق التخطيط والتنفيذ والانتهاء من المشاريع...",
    },
    status: 1,
  },
  {
    key: 2,
    location_name: "New York",
    description: {
      eng: "Manages financial operations and provides strategic financial advice...",
      arab: "يدير العمليات المالية ويقدم نصائح مالية استراتيجية...",
    },
    status: 2,
  },
  {
    key: 3,
    location_name: "Tokyo",
    description: {
      eng: "Develops innovative solutions and oversees the implementation of new technologies...",
      arab: "يطور حلاً مبتكرًا ويراقب تنفيذ التقنيات الجديدة...",
    },
    status: 3,
  },
  {
    key: 4,
    location_name: "London",
    description: {
      eng: "Leads marketing campaigns and analyzes market trends for effective strategies...",
      arab: "يقود حملات التسويق ويحلل اتجاهات السوق لاستراتيجيات فعالة...",
    },
    status: 1,
  },
  {
    key: 5,
    location_name: "Sydney",
    description: {
      eng: "Manages human resources and implements employee development programs...",
      arab: "يدير الموارد البشرية وينفذ برامج تطوير الموظفين...",
    },
    status: 2,
  },
  {
    key: 6,
    location_name: "Paris",
    description: {
      eng: "Designs and develops user-friendly software applications...",
      arab: "يصمم ويطور تطبيقات البرمجيات سهلة الاستخدام...",
    },
    status: 3,
  },
  {
    key: 7,
    location_name: "Berlin",
    description: {
      eng: "Manages supply chain logistics and optimizes distribution processes...",
      arab: "يدير لوجستيات سلسلة التوريد ويحسن عمليات التوزيع...",
    },
    status: 1,
  },
  {
    key: 8,
    location_name: "Seoul",
    description: {
      eng: "Coordinates international business partnerships and negotiates agreements...",
      arab: "ينسق شراكات الأعمال الدولية ويتفاوض على الاتفاقيات...",
    },
    status: 2,
  },
  {
    key: 9,
    location_name: "Mumbai",
    description: {
      eng: "Researches market trends and provides insights for product development...",
      arab: "يبحث في اتجاهات السوق ويقدم رؤى لتطوير المنتجات...",
    },
    status: 3,
  },
  {
    key: 10,
    location_name: "Toronto",
    description: {
      eng: "Manages customer relations and ensures satisfaction through quality service...",
      arab: "يدير علاقات العملاء ويضمن الرضا من خلال خدمة عالية الجودة...",
    },
    status: 1,
  },
  // Additional demo contents
  {
    key: 11,
    location_name: "Hong Kong",
    description: {
      eng: "Leads research and development initiatives for cutting-edge technologies...",
      arab: "يقود مبادرات البحث والتطوير لتقنيات متقدمة...",
    },
    status: 2,
  },
  {
    key: 12,
    location_name: "Singapore",
    description: {
      eng: "Manages corporate communications and public relations for brand reputation...",
      arab: "يدير الاتصالات الشركية والعلاقات العامة لسمعة العلامة التجارية...",
    },
    status: 3,
  },
  {
    key: 13,
    location_name: "Cape Town",
    description: {
      eng: "Oversees environmental sustainability initiatives and promotes eco-friendly practices...",
      arab: "يشرف على مبادرات الاستدامة البيئية ويعزز الممارسات الصديقة للبيئة...",
    },
    status: 1,
  },
  {
    key: 14,
    location_name: "Rio de Janeiro",
    description: {
      eng: "Coordinates cultural events and community outreach programs for social impact...",
      arab: "ينسق الفعاليات الثقافية وبرامج التواصل مع المجتمع لتحقيق تأثير اجتماعي...",
    },
    status: 2,
  },
  {
    key: 15,
    location_name: "Moscow",
    description: {
      eng: "Manages legal affairs and ensures compliance with international regulations...",
      arab: "يدير الشؤون القانونية ويضمن الامتثال للتشريعات الدولية...",
    },
    status: 3,
  },
  // Add more as needed
];

// Dropdown Items In each Rows
const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];

const gridListoptions = [
  {
    label: <BsListUl size={20} />,
    value: 1,
  },
  {
    label: <BsGrid size={20} />,
    value: 2,
  },
];

const TableAnt = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    columns?.map((col) => col.dataIndex)
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [gridList, setGridList] = useState(1);

  useEffect(() => {});

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleColumnVisibilityChange = (column) => (e) => {
    e.stopPropagation();
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column]
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // FILTER DROPDOWN SEARCH
  const handleColumnSearch = (searchValue) => {
    // Convert searchValue to lowercase for case-insensitive search
    const lowerSearchValue = searchValue.toLowerCase();

    // Filter columns based on whether their titles contain the searchValue
    const filteredColumns = columns.filter((column) => {
      const titleText =
        typeof column.title === "string"
          ? column.title
          : column.title.props.children;

      return titleText.toLowerCase().includes(lowerSearchValue);
    });

    // Set the visible columns to the filtered columns
    setVisibleColumns(filteredColumns?.map((col) => col.dataIndex));
  };

  const hasSelected = selectedRowKeys.length > 0;

  // Filter Dropdown Menus and Search Input
  const columnMenu = (
    <Menu>
      <Menu.Item key="selectAll">
        <Checkbox
          checked={visibleColumns.length === columns.length}
          onChange={() =>
            setVisibleColumns(
              visibleColumns.length === columns.length
                ? []
                : columns?.map((col) => col.dataIndex)
            )
          }
        >
          Select All
        </Checkbox>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="search">
        <Input
          placeholder="Search columns"
          onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
          onChange={(e) => handleColumnSearch(e.target.value)}
        />
      </Menu.Item>
      <Menu.Divider />
      {columns?.map((column) => (
        <Menu.Item key={column.dataIndex}>
          <Checkbox
            value={column.title}
            checked={visibleColumns.includes(column.dataIndex)}
            onChange={handleColumnVisibilityChange(column.dataIndex)}
          >
            {column.title}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const onChangeGridlist = ({ target: { value } }) => {
    setGridList(value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 xl:items-center xl:flex-row">
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold">Location</p>
          <div style={{ marginLeft: 8 }} className="">
            {hasSelected
              ? `${selectedRowKeys.length} Locations Selected`
              : "All Locations"}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FormInput
            // title="Search"
            placeholder="Search"
            value=""
            icon={<CiSearch />}
            className="w-full mt-0 md:w-auto"
            error=""
            onSearch={(value) => {
              setSearchValue(value);
            }}
          />
          <div>
            <Dropdown
              menu={columnMenu}
              placement="bottomRight"
              trigger={["click"]}
              open={dropdownVisible}
              onOpenChange={(visible) => setDropdownVisible(visible)}
            >
              <ButtonClick
                className="flex items-center justify-center h-full px-4 py-2 font-medium flex-nowrap rounded-lg bg-[#FAFAFA] text-sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown from closing
                  setDropdownVisible(!dropdownVisible);
                }}
              >
                <span className="mr-2">Filters</span>
                <span className="ml-auto">
                  <LuListFilter size={20} />
                </span>
              </ButtonClick>
            </Dropdown>
          </div>
          <Radio.Group
            options={gridListoptions}
            onChange={onChangeGridlist}
            value={gridList}
            optionType="button"
            className="flex items-center h-full"
          />
          <ButtonClick className="flex items-center justify-center h-full px-4 py-2 text-sm font-medium bg-white rounded-lg flex-nowrap">
            <FiSettings size={20} />
          </ButtonClick>
        </div>
      </div>
      <div className="border rounded-lg border-[#E7E7E7] dark:border-secondary relative overflow-auto">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.filter(
            (item) =>
              item.location_name
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.description.eng
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.description.arab
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.status
                .toString()
                .toLowerCase()
                .includes(searchValue.toLowerCase())
          )}
        />
      </div>
    </div>
  );
};

export default TableAnt;
