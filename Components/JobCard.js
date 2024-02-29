// JobCard.js
import React from "react";
import { Card } from "antd";
import { motion } from 'framer-motion';

const JobCard = ({
  jobName,
  category,
  place,
  salary,
  timeShift,
  onSelect,
  selected,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="w-full hover:border-primary"
        title={jobName}
        style={{ border: selected ? "2px solid #1890ff" : "1px solid #d9d9d9" }}
        onClick={onSelect}
      >
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Place:</strong> {place}
        </p>
        <p>
          <strong>Salary:</strong> {salary}
        </p>
        <p>
          <strong>Time Shift:</strong> {timeShift}
        </p>
      </Card>
    </motion.div>
  );
};

export default JobCard;
