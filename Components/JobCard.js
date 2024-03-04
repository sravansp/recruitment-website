// JobCard.js
import React from "react";
// import { Card } from "antd";
import { motion } from "framer-motion";
import { PiFoldersLight, PiClock, PiMapPin, PiMoney } from "react-icons/pi";

const JobCard = ({
  jobName,
  category,
  location,
  salary,
  timeShift,
  onSelect,
  selected,
  index, // Pass the index of the card as a prop
}) => {
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {  delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate" // Add some space between cards
    >
      <div
        className="w-full !border hover:border-primary cursor-pointer border-[#D9D9D9] dark:border-opacity-20 rounded-md p-2.5 2xl:p-4 transition-all duration-300 bg-white dark:bg-black flex-col flex gap-1.5 2xl:gap-3 text-black dark:text-white"
        
        style={{ border: selected && "1px solid var(--primary-color)" }}
        onClick={onSelect}
      >
        <h1 className="text-2xl font-semibold text-black h2">{jobName}</h1>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 truncate">
            <PiFoldersLight className="text-xl text-black dark:text-white text-opacity-20"/> <p className="pblack !font-normal">{category}</p>
          </div>
          <div className="flex items-center gap-2 truncate">
            <PiClock className="text-xl text-black dark:text-white text-opacity-20"/> <p className="pblack !font-normal">{timeShift}</p>
          </div>
          <div className="flex items-center gap-2 truncate">
            <PiMapPin className="text-xl text-black dark:text-white text-opacity-20"/> <p className="pblack !font-normal">{location}</p>
          </div>
          <div className="flex items-center gap-2 truncate">
            <PiMoney className="text-xl text-black dark:text-white text-opacity-20"/> <p className="pblack !font-normal">{salary}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
