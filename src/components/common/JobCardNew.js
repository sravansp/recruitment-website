import { Card } from "antd";
import { Options } from "devextreme-react/autocomplete";
import React, { useRef, useState, useEffect } from "react";
import { BsFillLightningFill, BsThreeDotsVertical } from "react-icons/bs";

import { MdArrowBackIos, MdArrowForwardIos, MdMessage } from "react-icons/md";

function JobCard({
  card = false,
  selectcard = () => {},
  options = [],
  renderContent,
  selectable = true, // New prop to control whether cards can be selected
  firstCardSelectable = true,
}) {
  const itemsPerPage = 6;
  const containerRef = useRef(0);
  const scrollAmount = 253;
  const [selectedId, setSelectedId] = useState(null);
  const [Count, setCount] = useState("");
  const primaryColor = localStorage.getItem("mainColor");

  const slidemover = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };
  const handleSvgClick = (id, index) => {
    // Check if selectable prop is false or it's the first card and firstCardSelectable prop is false
    if (!selectable || (index === 0 && !firstCardSelectable)) return;

    // Toggle the selected state
    setSelectedId((prevId) => (prevId === id ? null : id));
    // Call the selectcard function
    selectcard(id);
    console.log(options);
    console.log(selectedId);
  };

  // Save the selectedId to localStorage whenever it changes

  useEffect(() => {
    if (options.length > 0 && selectable && firstCardSelectable) {
      const firstItemId = options[0].id;
      setSelectedId(firstItemId);
      selectcard(firstItemId);
      console.log(selectedId);
    }
  }, [options]);
  console.table(options);
  return (
    <div className="flex ">
      <div className="flex    overflow-x-auto w-full" ref={containerRef}>
        <div className="flowBoxes w-full block">
          {options.map((each, index) => (
            // <div className="li first-of-type:border-l first-of-type:before:border-t-0 first-of-type:after:border-b-0 before:border-t first-of-type:border-y after:border-b before:border-x after:border-x border-black/10 dark:border-white/10 first-of-type:rounded-l-lg vhcenter last-of-type:before:border-t-0 last-of-type:after:border-b-0 last-of-type:border-r last-of-type:border-y first-of-type:hover:bg-primaryalpha/10 last-of-type:hover:bg-primaryalpha/10 hover:border-b-primary">
            <div className="li first-of-type:border-l first-of-type:before:border-t-0 first-of-type:after:border-b-0 before:border-t first-of-type:border-y after:border-b before:border-x after:border-x border-black/10 dark:border-white/10 first-of-type:rounded-l-lg vhcenter last-of-type:before:border-t-0 last-of-type:after:border-b-0 last-of-type:border-r last-of-type:border-y"
            onClick={(e) => {selectcard(each.id)
              handleSvgClick(each.id)
            }}>
              <div className="vhcenter h-full">
              <div className="flex flex-col gap-2 w-44 z-10 overflow-hidden relative">
                <p className="2xl:text-sm text-xs font-semibold dark:text-white">
                  {each.title}
                </p>
                <div className="flex gap-2 items-center">
                  <p className="2xl:text-sm text-xs font-semibold dark:text-white p-1 text-gray-900 bg-primaryalpha/20 rounded-md">
                   {each.items.length}
                  </p>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="float-end flex ">
        <button
          className="w-10  border-2 border-#FDFDFD bg-white    text-primary "
          onClick={slidemover}
        >
          <span className=" inset-0 flex items-center justify-center rounded-md bg-white">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-[${primaryColor}] bg-[${primaryColor}10]`}
            >
              <MdArrowForwardIos
                style={{ width: "10.69px", height: "17.37", color: "black" }}
              />
            </span>
          </span>
        </button>
        {/* <button className="w-16 border-2 border-#FDFDFD  rounded-md  text-primary mt-10 text-sm font-semibold ">
          <b>Edit</b>
        </button> */}
      </div>
    </div>
  );
}

export default JobCard;
