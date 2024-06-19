import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, theme } from 'antd';
import AddMore from './common/AddMore';

const { useToken } = theme;

const MenuItems = ({ Items,handleItemClick=()=>{} }) => {
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menu = (
    <Menu>
      {Items.map(item => (
        <Menu.Item key={item.key}  onClick={() => handleItemClick(item.key)}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <a onClick={e => e.preventDefault()}>
        <div className="justify-start">
            <AddMore
              name="Add stage rule"
              className="text-black"
            //   change={() => setMenuVisible(true)}
            />
          </div>
      </a>
    </Dropdown>
  );
};

export default MenuItems;
