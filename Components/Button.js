import React from 'react';
import { Button } from 'antd';

const ButtonClick = ({type = 'primary', onClick, children, size}) => (
  <div className="Button">
    <Button type={type} onClick={onClick} size={size}>
      {children}
    </Button>
  </div>
);

export default ButtonClick;