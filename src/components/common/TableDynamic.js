import React from "react";
import { Space, Dropdown, Menu } from "antd";
import { RxDotFilled } from "react-icons/rx";
import { TbDotsVertical } from "react-icons/tb";

const TableDynamic = ({ data, dynamicColumns }) => {
  return (
    <Space size="middle">
      {data.map((record) => (
        <div key={record.key} className=" flex">
          {dynamicColumns.map((column) => (
            <div key={column.title}>
              {column?.render ? (
                column.render(record)
              ) : (
                <span>{record[column.dataIndex]}</span>
              )}
            </div>
          ))}
          {columnActions(record)}
        </div>
      ))}
    </Space>
  );
};

const columnActions = (record) => (
  <Dropdown
    menu={getDropdownMenu(record)}
    placement="bottomRight"
    trigger={["click"]}
  >
    <a>
      <TbDotsVertical className="text-gray-400 " />
    </a>
  </Dropdown>
);

const getDropdownMenu = (record) => {
  // Customize your dropdown menu items based on the record or other criteria
  const items = [
    { key: "edit", label: "Edit" },
    { key: "delete", label: "Delete" },
  ];

  return (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
};

export default TableDynamic;
