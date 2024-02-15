import React, { useEffect, useState } from "react";

import BoardData from "../../data/board.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GoClock } from "react-icons/go";
import {
  PiBookmarkSimpleFill,
  PiDotsThreeOutlineVerticalFill,
} from "react-icons/pi";

const JobDetails = () => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  return (
    <div className="flex flex-col lg:h-[100vh]">
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex w-full h-full gap-3 py-10">
            {boardData.map((board, bIndex) => (
              <div key={board.name} className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-2 px-3 mt-5 ">
                  <span className="flex items-center gap-2">
                    {/* <p
                      className={`${ board.name === "To Do" ? "bg-[#5030E5]" : board.name === "On Progress"
                          ? "bg-[#FFA500]"
                          : "bg-[#76A5EA]"
                      } rounded-full w-[8px] h-[8px]`}
                    ></p> */}
                    <span className="text-base font-medium leading-5 text-indigo-900">
                      {board.name}
                    </span>
                    <span className="bg-[#E0E0E0] text-center text-[#625F6D] rounded-full h-[20px] w-[20px] font-medium	text-[12px]">
                      {board.items.length}
                    </span>
                  </span>
                  {board.name === "To Do" ? <img src="" alt="attach" /> : null}
                </div>
                <Droppable droppableId={bIndex.toString()}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <div
                        className={`bg-[#F7FBFF] dark:bg-lightdark h-[80vh] flex flex-col relative overflow-hidden p-1.5 border border-solid border-borderlight dark:border-borderdark w-72 rounded-lg
                    ${snapshot.isDraggingOver && "bg-[#FBF7F1] dark:bg-[#1B1B1B]"}`}
                      >
                        {snapshot.isDraggingOver &&
                          board.items.length === 0 && (
                            <p className="text-center text-gray-400">
                              Drop here
                            </p>
                          )}
                        <div
                          className="flex flex-col h-auto gap-1.5 overflow-x-hidden overflow-y-auto"
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
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

const CardItem = ({ data, index }) => {
  console.log(data);
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-3 bg-white border rounded-md cursor-grab border-borderlight dark:border-borderdark dark:bg-secondaryDark dark:text-white"
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
                <p className="para !text-black !font-normal dark:!text-white">4d ago</p>
              </div>
              <div className="flex items-center gap-2">
                <a href="" className=" text-[#15A61B]">
                  <PiBookmarkSimpleFill className="text-xl" />
                </a>

                <a href="" className="text-primary">
                  {" "}
                  <PiDotsThreeOutlineVerticalFill className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default JobDetails;
