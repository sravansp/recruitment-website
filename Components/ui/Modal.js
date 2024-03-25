import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';

const CountdownModal = ({ title, duration, modal, contextHolder, openModal }) => {
  useEffect(() => {
    if (openModal) {
      countDown();
    }
  }, [openModal]);

  const countDown = () => {
    let secondsToGo = duration || 5; // Default duration is 5 seconds
    const instance = modal.success({
      title: title || 'Notification',
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
    }, secondsToGo * 1000);
  };

  return (
    <>
      {contextHolder}
    </>
  );
};

export default CountdownModal;
