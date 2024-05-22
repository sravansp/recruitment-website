// import { notification } from "antd";

// const [api, contextHolder] = notification.useNotification();
// export const openNotification = (type, message, description) => {
//   api[type]({
//     message: message,
//     description: description,
//     placement: "top",
//     // stack: 2,
//     style: {
//       background: `${
//         type === "success"
//           ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
//           : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
//       }`,
//       boxShadow: `${
//         type === "success"
//           ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
//           : "0px 22px 60px rgba(134, 92, 144, 0.20)"
//       }`,
//     },
//     // duration: null,
//   });
// };

import React from 'react';
import { notification } from 'antd';
import 'antd/dist/antd.css';

const NotificationAlert = ({ type, message, description }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api[type]({
            message: message,
            description: description,
            placement: "top",
            style: {
                background: `${type === "success"
                    ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
                    : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
                    }`,
                boxShadow: `${type === "success"
                    ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
                    : "0px 22px 60px rgba(134, 92, 144, 0.20)"
                    }`,
            },
        });
    };

    React.useEffect(() => {
        openNotification();
    }, []);

    return contextHolder;
};

export default NotificationAlert;


