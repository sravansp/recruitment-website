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
];
const Sorting = () => (
  <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ["3"],
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
      Selectable
      <DownOutlined />
    </a>
  </Dropdown>
);
export default Sorting;
