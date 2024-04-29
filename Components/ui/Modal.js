// import React, { useEffect, useState } from 'react';
// import { Modal } from 'antd';
// import { Center } from 'devextreme-react/cjs/map';
// import { MdCheck } from 'react-icons/md';

// const Modal2 = ({ show, handleClose, countDown }) => {
//   const [modalInstance, setModalInstance] = React.useState(null);
//   const [primaryColor, setPrimaryColor] = useState("");
//   useEffect(() => {
//     const color = localStorage.getItem("themeColor");
//     if (color) {
//       setPrimaryColor(color);
//     }
//   }, []);
//   const modalStyle = {
//     width: '100px',
//     height: '248px',
//     position: 'absolute',
//     top: '30%',
//     left: '30%',
//     transform: 'translate(-50%, -50%)',
//     borderRadius: '30px',
//     overflow: 'hidden',
//     backgroundColor: '#F3F4F6'
//   };
//   const handleCountDown = () => {

//     let secondsToGo = 5;
//     const instance = Modal.info({
//       title:(
//        <div className='rounded-lg items-center'>
//   <div style={{marginLeft:"184px",marginTop:"20px"}} className={`flex items-center justify-center rounded-full 2xl:h-11 2xl:w-11 h-10 w-10 shadow-stepShadowInset place-items-center bg-[#E3DFFB] border-[0.5px] border-[${primaryColor}] border-opacity-10`}>
//     <div
//       style={{
//         boxShadow: `0px 3.882px 6.211px 0px ${primaryColor}66, 0px 0.776px 1.553px 0px #ffffff66 inset`,
      
//       }}
//       className="flex items-center justify-center text-xs 2xl:text-base font-medium rounded-full transition duration-500 ease-in-out h-7 w-7 2xl:h-8 2xl:w-8 bg-accent text-white"
//     >
//       <span className="font-bold text-white">{<MdCheck />}</span>
//     </div>
  

//       </div>
//         <div className='flex justify-center mb-2'>
//           {/* <div className='w-16 h-16 rounded-full bg-blue-500'></div> */}
//         </div>
//         <div className="h1 text-center mt-5">
//           Congratulations!
//         </div>
//       </div>
//       ) ,
//       content: (
//         <>
//         <div className='para text-center mt-2 rounded-lg'>
//           Thank you for your application <br />
//           This form has now been submitted
//         </div>
//         <div className='h6 text-center mt-5  rounded-lg'>
//         We’ll be in touch soon
//         </div>
//         </>
//       ),
      
//       width: 500,  // Set modal width
//     height: 248, // Set modal height
//     centered: true,
//     borderRadius:2,
//       footer: null,
//       icon: null,
//       style: modalStyle,
//       // backgroundColor: none,
//     });

//     setModalInstance(instance);

//     // const timer = setInterval(() => {
//     //   secondsToGo -= 1;
//     //   instance.update({
//     //     content: `This modal will be destroyed after ${secondsToGo} second.`,
//     //     footer: null,
//     //   });
//     // }, 1000);
//     // setTimeout(() => {
//     //   // Remove translate transformation to stop movement
//     //   modalStyle.transform = 'none';
//     //   instance.update({ style: modalStyle });
//     // }, 100);

//     setTimeout(() => {
//       // clearInterval(timer);
//       instance.destroy();
//       handleClose();
//     }, secondsToGo * 1000);
//   };

//   useEffect(() => {
//     if (show) {
//       handleCountDown();
//     }
//   }, [show]);

//   return null;
// };

// export default Modal2;





import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonClick from "./Button";
import { lightenColor } from "./Lightercolor";
import { useDispatch, useSelector } from "react-redux";
import { MdCheck } from "react-icons/md";
 
const Modal2 = ({
  isOpen,
  onClose,
  children,
  footer = true,
  title = "",
  buttonClose = "Cancel",
  buttonSubmit = "Submit",
  className = "",
  handleSubmit = () => {},
}) => {
  const primaryColor = localStorage.getItem("mainColor");
  const mode = localStorage.getItem("theme");
  const [timer, setTimer] = useState(null); 

  useEffect(() => {
    // const handleOutsideClick = (e) => {
    //   if (e.target.classList.contains("modal-overlay")) {
    //     onClose();
    //   }
    // };

    const startTimer = () => {
      const newTimer = setTimeout(() => {
        onClose();
      }, 5000); // Close the modal after 5 seconds
      setTimer(newTimer); // Set the new timer in state
    };

    if (isOpen) {
      // document.addEventListener("click", handleOutsideClick);
      startTimer(); // Start the timer when modal opens
    } else {
      clearTimeout(timer); // Clear the timer when modal closes
      setTimer(null); // Clear the timer from state
    }

    return () => {
      // document.removeEventListener("click", handleOutsideClick);
      clearTimeout(timer); // Clear the timer on component unmount
    };
  }, [isOpen, onClose]);
 
  const lighterColor = lightenColor(primaryColor, 0.9);
 
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-[9999] modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background:
              "linear-gradient(180deg, rgba(14, 5, 34, 0.30) 0%, rgba(13, 6, 30, 0.60) 100%)",
          }}
        >
          <motion.div
            className={`min-w-[50px] w-[92%] max-w-[500px] p-1 bg-white dark:bg-[#3c3c3c] rounded-2xl shadow-md  overflow-hidden ${className}`}
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-50%" }}
          >
            <div
              className="flex flex-col w-full h-full gap-4 p-4 overflow-hidden rounded-xl borderb"
              style={{
                background: `${
                  mode === "dark"
                    ? "linear-gradient(rgb(29 27 36) 0%, rgb(48 45 54) 30.42%, rgba(255, 255, 255, 0) 99.67%)"
                    : `linear-gradient(180deg, ${lighterColor} 0%, rgba(255, 255, 255, 0.82) 30.42%, rgba(255, 255, 255, 0.00) 99.67%)`
                } `,
              }}
            >
              <div className="justify-center">
 <div style={{alignItems:"center",marginLeft:"209px",marginTop:"20px"}} className={`flex items-center justify-center rounded-full 2xl:h-11 2xl:w-11 h-10 w-10 shadow-stepShadowInset place-items-center bg-[#E3DFFB] border-[0.5px] border-[${primaryColor}] border-opacity-10`}>
<div
      style={{
        boxShadow: `0px 3.882px 6.211px 0px ${primaryColor}66, 0px 0.776px 1.553px 0px #ffffff66 inset`,
      
      }}
      className="flex items-center justify-center text-xs 2xl:text-base font-medium rounded-full transition duration-500 ease-in-out h-7 w-7 2xl:h-8 2xl:w-8 bg-accent text-white"
    >
      <span className="font-bold text-white">{<MdCheck />}</span>
    </div>
    </div>  
    </div>
              <h1 className="h1 text-center">Congratulations!</h1>
              <h6 className="h6 text-center">Thank you for your application <br />
          This form has now been submitted</h6>
          <h6 className="h6 text-center"> We’ll be in touch soon</h6>
              {/* {footer && (
                <div className="flex items-center justify-end gap-4">
                  {buttonClose && (
                    <ButtonClick
                      handleSubmit={onClose}
                      buttonName={buttonClose}
                    />
                  )}
                  {buttonSubmit && (
                    <ButtonClick
                      BtnType="primary"
                      buttonName={buttonSubmit}
                      handleSubmit={onClose}
                    />
                  )}
                </div>
              )} */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
 
export default Modal2;
 
