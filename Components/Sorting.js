import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
const items = [
  {
    key: "1",
    label: "Relevance",
  },
  {
    key: "2",
    label: "Recently added",
  },
  {
    key: "3",
    label: "Oldest",
  },
  {
    key: "4",
    label: "10days Ago",
  },
  {
    key: "3",
    label: "20days Ago",
  },
];
const Sorting = ({onSortChange}) => (
  <Dropdown
    menu={{
      items,
      selectable: true,
      // defaultSelectedKeys: ["2"],
      onClick: ({ key }) => onSortChange(key)
    }}
  >
    {/* <Typography.Link>
      <Space>
        Selectable
        <DownOutlined />
      </Space>
    </Typography.Link> */}
    <a
      className="ant-dropdown-link para text-[#656565] cursor-pointer"
    //   onClick={(e) => e.preventDefault()}
    >
   Sort by Selectable
      <DownOutlined />
    </a>
  </Dropdown>
);
export default Sorting;
