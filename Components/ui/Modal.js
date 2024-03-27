import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { Center } from 'devextreme-react/cjs/map';

const Modal2 = ({ show, handleClose, countDown }) => {
  const [modalInstance, setModalInstance] = React.useState(null);
  const modalStyle = {
    width: '100px',
    height: '248px',
    position: 'absolute',
    top: '30%',
    left: '30%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
    overflow: 'hidden',
    // background: 'linear-gradient(180deg, #EBEEFF 0%, #FFFFFF 82.01%, #EBEEFF 100%)',
  };
  const handleCountDown = () => {
    let secondsToGo = 5;
    const instance = Modal.info({
      title:(
        <div className='rounded-lg'>
        <div className='flex justify-center mb-2'>
          {/* <div className='w-16 h-16 rounded-full bg-blue-500'></div> */}
        </div>
        <div className="h1 text-center mt-7">
          Congratulations!
        </div>
      </div>
      ) ,
      content: (
        <>
        <div className='para text-center mt-5 rounded-lg'>
          Thank you for your application <br />
          This form has now been submitted
        </div>
        <div className='h6 text-center mt-10  rounded-lg'>
        We’ll be in touch soon
        </div>
        </>
      ),
      
      width: 500,  // Set modal width
    height: 248, // Set modal height
    centered: true,
    borderRadius:2,
      footer: null,
      icon: null,
      style: modalStyle,
      backgroundColor: 'none',
    });

    setModalInstance(instance);

    // const timer = setInterval(() => {
    //   secondsToGo -= 1;
    //   instance.update({
    //     content: `This modal will be destroyed after ${secondsToGo} second.`,
    //     footer: null,
    //   });
    // }, 1000);
    setTimeout(() => {
      // Remove translate transformation to stop movement
      modalStyle.transform = 'none';
      instance.update({ style: modalStyle });
    }, 100);

    setTimeout(() => {
      // clearInterval(timer);
      instance.destroy();
      handleClose();
    }, secondsToGo * 1000);
  };

  useEffect(() => {
    if (show) {
      handleCountDown();
    }
  }, [show]);

  return null;
};

export default Modal2;
