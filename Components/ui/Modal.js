import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Center } from 'devextreme-react/cjs/map';
import { MdCheck } from 'react-icons/md';

const Modal2 = ({ show, handleClose, countDown }) => {
  const [modalInstance, setModalInstance] = React.useState(null);
  const [primaryColor, setPrimaryColor] = useState("");
  useEffect(() => {
    const color = localStorage.getItem("themeColor");
    if (color) {
      setPrimaryColor(color);
    }
  }, []);
  const modalStyle = {
    width: '100px',
    height: '248px',
    position: 'absolute',
    top: '30%',
    left: '30%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #EBEEFF 0%, #FFFFFF 82.01%, #EBEEFF 100%)',
  };
  const handleCountDown = () => {

    let secondsToGo = 100000;
    const instance = Modal.info({
      title:(
       <div className='rounded-lg items-center'>
  <div style={{marginLeft:"184px",marginTop:"20px"}} className={`flex items-center justify-center rounded-full 2xl:h-11 2xl:w-11 h-10 w-10 shadow-stepShadowInset place-items-center bg-[#E3DFFB] border-[0.5px] border-[${primaryColor}] border-opacity-10`}>
    <div
      style={{
        boxShadow: `0px 3.882px 6.211px 0px ${primaryColor}66, 0px 0.776px 1.553px 0px #ffffff66 inset`,
      
      }}
      className="flex items-center justify-center text-xs 2xl:text-base font-medium rounded-full transition duration-500 ease-in-out h-7 w-7 2xl:h-8 2xl:w-8 bg-accent text-white"
    >
      <span className="font-bold text-white">{<MdCheck />}</span>
    </div>
  

      </div>
        <div className='flex justify-center mb-2'>
          {/* <div className='w-16 h-16 rounded-full bg-blue-500'></div> */}
        </div>
        <div className="h1 text-center mt-5">
          Congratulations!
        </div>
      </div>
      ) ,
      content: (
        <>
        <div className='para text-center mt-2 rounded-lg'>
          Thank you for your application <br />
          This form has now been submitted
        </div>
        <div className='h6 text-center mt-5  rounded-lg'>
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
