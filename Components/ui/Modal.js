"use client";
import React from 'react';
import { Modal } from 'antd';

const Modal2 = ({ countDown }) => {
  const [modal, contextHolder] = Modal.useModal();

  const handleCountDown = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      if (typeof countDown === 'function') {
        countDown();
      }
    }, secondsToGo * 1000);
  };

  return(
    <>
    {/* {contextHolder} */}
    </>
    ); 
};

export default Modal2;
