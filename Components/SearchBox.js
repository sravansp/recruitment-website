// SearchBox.js
"use client";
import React, { useState } from "react";

const SearchBox = ({ items, onItemSelected, icon,  placeholder="", className=""}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasResults = searchTerm && filteredItems.length > 0;
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSearchTerm("");
    onItemSelected(item); // Call the provided callback with the selected item
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedItem(null); // Clear selected item when input value changes
    
    
  };
  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex items-center gap-2 text-black text-opacity-50 dark:text-white">
        {icon && icon}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 bg-transparent border-none rounded-md outline-none pblack"
        value={selectedItem ? selectedItem : searchTerm}
       
        onChange={handleInputChange}
      />
      </div>
      {hasResults && (
        <ul className="absolute left-0 z-50 w-full mt-2 overflow-hidden bg-white border border-gray-300 rounded-md top-10">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
