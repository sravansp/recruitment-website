import React, { useEffect, useState } from "react";

import BoardData from "../../data/board.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dropdown, Tooltip } from "antd";
import { GoClock } from "react-icons/go";
import {
  PiBookmarkSimpleFill,
  PiDotsThreeOutlineFill,
  PiDotsThreeOutlineVerticalFill,
  PiTrashBold,
} from "react-icons/pi";
import {
  FcEngineering,
  FcHighPriority,
  FcMms,
  FcProcess,
} from "react-icons/fc";

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

  const customColors = [
    "#00B23C",
    "#FE4949",
    "#4437CC",
    "#FF8A00",
    "#4976FE",
    "#E0115F",
    "#DFA510",
    "#E546D5",
    "#00E096",
    "#884DFF",
    "#FF4DB8",
  ];

  const colors = boardData.map(
    (_, index) => customColors[index % customColors.length]
  );

  const items = [
    {
      label: "Automate",
      key: "0",
      icon: <FcEngineering size={20} />,
    },
    {
      label: "Message",
      key: "1",
      icon: <FcMms size={20} />,
      children: [
        {
          key: "1-1",
          label: "SMS",
        },
        {
          key: "1-2",
          label: "Email",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col lg:h-[85vh] overflow-auto">
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex w-full h-full gap-3">
            {boardData.map((board, bIndex) => (
              <div key={board.name} className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-2 p-3 bg-white border rounded-md w-[303px] border-borderlight dark:border-borderdark dark:bg-secondaryDark dark:text-white">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div
                      className="w-4 h-4 overflow-hidden rounded-full vhcenter shrink-0"
                      style={{ backgroundColor: `${colors[bIndex]}30` }}
                    >
                      <span
                        className=" w-2.5 h-2.5 rounded-full "
                        style={{ backgroundColor: colors[bIndex] }}
                      ></span>
                    </div>
                    <p className="!font-semibold h6 !text-black dark:!text-white truncate">
                      {board.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-[26px] h-[26px] p-1 bg-violet-100 rounded-md flex-col justify-center items-center gap-2.5 inline-flex">
                      <p className=" text-gray-900 text-[13px] font-['SF Pro'] leading-[18.20px]">
                        {board.items.length}
                      </p>
                    </div>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottomRight"
                    >
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="p-1 border border-transparent rounded cursor-pointer text-primary hover:border-primary"
                      >
                        <PiDotsThreeOutlineFill className="text-xl" />
                      </a>
                    </Dropdown>
                  </div>
                </div>
                <Droppable droppableId={bIndex.toString()} key={bIndex}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`bg-[#F7FBFF] dark:bg-lightdark h-full flex flex-col relative overflow-hidden p-1.5 border border-solid border-borderlight dark:border-borderdark w-[303px] rounded-lg
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
                              color={colors[bIndex]}
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

const CardItem = ({ data, index, color }) => {
  const [bookmarkState, setBookmarkState] = useState({});

  const toggleBookmark = (cardId) => {
    setBookmarkState((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

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

  const firstLetter = data?.name ? data.name.charAt(0).toUpperCase() : "";
  return (
    <Draggable
      index={index}
      draggableId={data.id.toString()}
      isDragDisabled={bookmarkState[data.id]}
    >
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
            "shadow-dragShadow dark:shadow-dragShadowDark"
          } p-3 mb-1.5 bg-white border rounded-md ${
            bookmarkState[data.id] ? " cursor-default" : "cursor-grab"
          }  border-borderlight dark:border-borderdark dark:bg-secondaryDark dark:text-white`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`2xl:w-8 2xl:h-8 w-6 h-6 overflow-hidden rounded-full vhcenter`}
                style={{
                  backgroundColor: `${data?.image ? "" : color}`,
                }}
              >
                {data?.image ? (
                  <img
                    src={data?.image}
                    alt={data?.image}
                    className="object-cover object-center w-full h-full"
                  />
                ) : (
                  <span className="h6 !text-white !font-medium">
                    {firstLetter}
                  </span>
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
                <Tooltip
                  title={`${
                    bookmarkState[data.id]
                      ? "Remove from Shortlist"
                      : "Add to Shortlist"
                  }`}
                  color={color}
                  key={color}
                >
                  <span
                    className={` p-1 ${
                      bookmarkState[data.id]
                        ? "text-[#15A61B]"
                        : "text-[#DFDFDF]"
                    } cursor-pointer`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(data.id);
                    }}
                  >
                    <PiBookmarkSimpleFill className="text-xl" />
                  </span>
                </Tooltip>

                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                >
                  <a
                    onClick={(e) => e.preventDefault()}
                    className="p-1 border border-transparent rounded cursor-pointer text-primary hover:border-primary"
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
