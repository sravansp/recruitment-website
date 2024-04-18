import { Input } from "antd";

export default function SearchBox({
  placeholder = "",
  value = "",
  icon = <LuSearch/>,
  onChange = () => {},
  className = "",
  error = "",
}) {
  return (
   

<div className={`relative w-full ${className}`}>
      <div className="flex items-center gap-2 text-black text-opacity-50 dark:text-white">
        {icon && icon}
      <input
         type="text"
         placeholder={placeholder}
         value={value}
         onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-transparent border-none rounded-md outline-none pblack"
        // value={selectedItem ? selectedItem : searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
        // onChange={handleInputChange}
      />
      </div>
      {/* {hasResults && (
        <ul className="absolute left-0 w-full mt-2 overflow-hidden bg-white border border-gray-300 rounded-md top-10">
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
      )} */}
    </div>
  );
};