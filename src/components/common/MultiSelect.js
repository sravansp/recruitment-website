import React, { useState } from "react";
import { Select, Space } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import ButtonClick from "./Button";

export default function MultiSelect({
  title = "",
  value = null,
  options = [],
  placeholder = "",
  change = () => {},
  error = "",
}) {
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [showAttendees, setShowAttendees] = useState(false); // State variable to track if attendees should be displayed

  const handleMultiSelectChange = (selectedOptions) => {
    const selectedAttendeesInfo = selectedOptions.map(option => {
      const { value: id, label: name, userimage: image } = option;
      return { id, name, image };
    });
    setSelectedAttendees(selectedAttendeesInfo);
  };

  const handleAddClick = () => {
    setShowAttendees(true);
    // Pass selected attendee IDs to the parent component
    const selectedIds = selectedAttendees.map(attendee => attendee.id);
    change(selectedIds);
  };

  const handleRemoveAttendee = (id) => {
    const updatedAttendees = selectedAttendees.filter(attendee => attendee.id !== id);
    setSelectedAttendees(updatedAttendees);
    // Pass updated attendee IDs to the parent component
    const updatedIds = updatedAttendees.map(attendee => attendee.id);
    change(updatedIds);
  };

  return (
    <div className="relative block dark:text-white ">
      {title && (
        <label className="text-xs font-medium 2xl:text-sm dark:text-white">
          {title}
        </label>
      )}
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        className="mt-[6px]"
        status={`  ${error && "error"}`}
      >
      <Select
  mode="multiple"
  showSearch
  style={{
    width: "100%",
    border: error ? "0.5px solid #f76002" : "none",
    borderRadius: "7px",
  }}
  value={value}
  options={options}
  onChange={handleMultiSelectChange}
  placeholder={placeholder}
  maxTagCount="responsive"
  // Custom rendering for selected options
 
/>
        <ButtonClick buttonName="Add" handleSubmit={handleAddClick} />
        {showAttendees && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              {selectedAttendees.map(attendee => (
                <div key={attendee.id} className="relative">
                  <img
                    src={attendee.image} // Assuming image is provided in the options
                    alt={attendee.name}
                    className="rounded-full size-12"
                  />
                  <div
                    className="absolute top-0 right-0 text-white rounded-full cursor-pointer deleteImg size-4 vhcenter bg-slate-500 ring-2 ring-white"
                    onClick={() => handleRemoveAttendee(attendee.id)}
                  >
                    <RiCloseLine />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {error && (
          <FiAlertCircle className="absolute top-3.5 right-4 mr-5 mt-5 transform -translate-y-3/5 text-red-400" />
        )}
      </Space>
      {error && (
        <p className=" flex justify-start items-center mb-0 text-[10px] text-red-600 ">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
