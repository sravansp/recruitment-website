import React, { useEffect, useState } from "react";

import BoardData from "../../data/board.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dropdown, Space, Menu } from "antd";
import { GoClock } from "react-icons/go";
import {
  PiBookmarkSimpleFill,
  PiDotsThreeOutlineVerticalFill,
  PiTrash,
  PiTrashBold,
} from "react-icons/pi";
import { FcHighPriority, FcProcess } from "react-icons/fc";

const JobDetails = () => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [draggingPosition, setDraggingPosition] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    setBoardData((prevData) => {
      const newBoardData = [...prevData];
      const dragItem =
        newBoardData[re.source.droppableId].items[re.source.index];

      newBoardData[re.source.droppableId].items.splice(re.source.index, 1);
      newBoardData[re.destination.droppableId].items.splice(
        re.destination.index,
        0,
        dragItem
      );

      return newBoardData;
    });

    // Reset dragging position after drop
    setDraggingPosition(null);
  };

  const onDragOver = (snapshot) => {
    if (snapshot.isDraggingOver) {
      // Set the top position of the dropping div based on clientY
      const topPosition = snapshot.clientOffset ? snapshot.clientOffset.y : 0;
      setDraggingPosition(topPosition);
    }
  };

  return (
    <div className="flex flex-col lg:h-[100vh]">
      
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex w-full h-full gap-3 py-10">
            {boardData.map((board, bIndex) => (
              <div key={board.name} className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-2 p-3 border rounded-md g-white cursor-grab border-borderlight dark:border-borderdark dark:bg-secondaryDark dark:text-white">
                  <p className="!font-semibold h6 !text-black dark:!text-white">
                    {board.name}
                  </p>
                  <div className="w-[26px] h-[26px] p-1 bg-violet-100 rounded-md flex-col justify-center items-center gap-2.5 inline-flex">
                    <p className=" text-gray-900 text-[13px] font-['SF Pro'] leading-[18.20px]">
                      {board.items.length}
                    </p>
                  </div>
                </div>
                <Droppable droppableId={bIndex.toString()} key={bIndex}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`bg-[#F7FBFF] dark:bg-lightdark h-[80vh] flex flex-col relative overflow-hidden p-1.5 border border-solid border-borderlight dark:border-borderdark w-72 rounded-lg
                      ${
                        snapshot.isDraggingOver &&
                        "bg-[#FBF7F1] dark:bg-[#1B1B1B]"
                      }`}
                      onDragOver={() => onDragOver(snapshot)}
                    >
                      <div
                        className="flex flex-col h-auto overflow-x-hidden overflow-y-auto"
                        style={{ maxHeight: "calc(100vh - 50px)" }}
                      >
                        {board.items.length > 0 &&
                          board.items.map((item, iIndex) => (
                            <CardItem
                              key={item.id}
                              data={item}
                              index={iIndex}
                              className="m-3"
                            />
                          ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
      {/* Dropping div outside the DragDropContext */}
      {draggingPosition !== null && (
        <div className="dropping-div" style={{ top: `${draggingPosition}px` }}>
          Drop here to place the item
        </div>
      )}
    </div>
  );
};

const CardItem = ({ data, index }) => {
  const items = [
    {
      label: "Disqualify",
      key: "0",
      icon: <FcHighPriority size={20} />,
    },
    {
      label: "Change Stage",
      key: "1",
      icon: <FcProcess size={20} />,
      // children: data.map((child) => (
      //   <Menu.Item key={child.id}>{child.name}</Menu.Item>
      // )),
      children: [
        {
          key: "1-1",
          label: "Sourced",
        },
        {
          key: "1-2",
          label: "Applied",
        },
        {
          key: "1-3",
          label: "Personal Interviews",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      label: "Delete this Applicant",
      key: "3",
      icon: <PiTrashBold size={20} className="text-red-600 " />,
    },
  ];
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={{
          //   ...provided.draggableProps.style,
          //   transform: snapshot.isDragging
          //     ? `${provided.draggableProps.style.transform} rotate(-5.827deg)`
          //     : provided.draggableProps.style.transform,
          // }}
          className={`${
            snapshot.isDragging &&
            " shadow-dragShadow dark:shadow-dragShadowDark"
          } p-3 mb-1.5 bg-white border rounded-md cursor-grab border-borderlight dark:border-borderdark dark:bg-secondaryDark dark:text-white`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`2xl:w-8 2xl:h-8 w-6 h-6 overflow-hidden rounded-full ${
                  data?.image ? "" : "bg-primary"
                } `}
              >
                {data?.image && (
                  <img
                    src={data?.image}
                    alt={data?.image}
                    className="object-cover object-center w-full h-full"
                  />
                )}
              </div>
              <p className="!font-semibold h6 !text-black dark:!text-white">
                {" "}
                {data?.name && data?.name}
              </p>
            </div>
            <div className="flex justify-between gap-3">
              <div className="flex items-center gap-2">
                <GoClock className="text-lg 2xl:text-2xl opacity-30" />
                <p className="para !text-black !font-normal dark:!text-white">
                  4d ago
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a href="" className=" text-[#15A61B]">
                  <PiBookmarkSimpleFill className="text-xl" />
                </a>

                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <a
                    onClick={(e) => e.preventDefault()}
                    className="cursor-pointer text-primary"
                  >
                    <PiDotsThreeOutlineVerticalFill className="text-xl" />
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default JobDetails;
