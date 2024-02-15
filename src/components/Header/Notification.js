import React, { useState } from "react";
import { Modal } from "antd";
import { PiBellFill } from "react-icons/pi";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";

const notificationMenu = [
  { id: 1, name: "View all", itemNumber: 12, active: "true", path: "/" },
  { id: 2, name: "Mentions", itemNumber: 6, active: "false", path: "/" },
  { id: 3, name: "Followers", itemNumber: 9, active: "false", path: "/" },
  { id: 4, name: "Invites", itemNumber: 2, active: "false", path: "/" },
];

const notifications = [
  {
    id: 1,
    avatar:
      "https://i.pinimg.com/originals/76/46/a9/7646a94792eeb2b072335e16dd7c9f11.png",
    name: "Anu",
    text: "Followed you",
    personName: "",
    date: "Thursday 4:20pm",
    time: "2 hours ago",
  },
  {
    id: 2,
    avatar:
      "https://cdn.pixabay.com/photo/2023/09/02/18/26/ai-generated-8229399_640.png",
    name: "Sonu",
    text: "Commented on your post",
    personName: "",
    date: "wednesday 3:30pm",
    time: "3 hours ago",
  },
  {
    id: 3,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg",
    name: "Bheem",
    text: "Liked your post",
    personName: "",
    date: "Thursday 2:40pm",
    time: "5 hours ago",
  },
  {
    id: 4,
    avatar:
      "https://in.bmscdn.com/iedb/artist/images/website/poster/large/amitabh-bachchan-138-12-09-2017-02-34-37.jpg",
    name: "Abhi",
    text: "Invited you to",
    personName: "Thoufeek's dashboard",
    date: "Monday 1:55pm",
    time: "9 hours ago",
  },
];

const Notification = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div
        className="relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer 2xl:w-10 2xl:h-10 ltr:mr-4 rtl:ml-4 bg-secondaryWhite dark:bg-secondaryDark"
        onClick={showModal}
      >
        <PiBellFill className="w-4 h-4 text-xs text-black 2xl:text-sm opacity-20 dark:text-white dark:opacity-100" />
        <div className="absolute top-0 right-0 w-3 h-3 text-white rounded-full 2xl:w-4 2xl:h-4 bg-primary vhcenter">
          <p className="text-[8px] 2xl:text-xs">3</p>
        </div>
      </div>
      <Modal
        open={visible}
        closeIcon={false}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="mr-2 top-20"
      >
        <div className="flex justify-between ">
          <b style={{ fontSize: 17 }}>Your notifications</b>
          <div className="flex text-blue-700">
            <LiaCheckDoubleSolid style={{ transform: "translateY(2px)" }} />
            <span className="ml-2 cursor-pointer">Mark all as read</span>
          </div>
        </div>

        {/* code for the buttons  */}
        <div className="flex justify-between mt-3">
          {notificationMenu.map((item) => (
            <button
              className={`flex items-center justify-between ${
                item.active === "true" ? "shadow-xl" : ""
              } ${item.active === "true" ? "text-blue-700" : "text-gray-500"}`}
              key={item.id}
            >
              <div className="flex">
                {item.name}
                <div
                  className={`${
                    item.active === "true"
                      ? "ml-1"
                      : "ml-1 bg-gray-200 rounded-half px-1 rounded-sm"
                  }`}
                >
                  {item.itemNumber}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* code for the notifications */}
        {notifications.map((data, i) => (
          <div className={`notification-item ${data.status}`} key={i}>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full bg-gray-400"
                        src={data.avatar}
                        alt="Profile image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="flex justify-end text-sm font-medium text-gray-900 truncate dark:text-white">
                        @{data.name} 
                        <span className="text-gray-600">{data.text}</span>
                        {data.personName && <> {data.personName}</>}
                        <span className="ml-auto">
                          <GoDotFill className="text-blue-500" />
                        </span>
                      </p>

                      <p className="flex justify-between text-xs text-gray-500 truncate dark:text-gray-400">
                        {data.date}
                        <span>{data.time}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ))}

        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-black rounded-md hover:bg-blue-500 transition duration-300">
            Decline
          </button>
          <button className="px-4 py-2 border border-black rounded-md hover:bg-blue-500 transition duration-300">
            Accept
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Notification;
