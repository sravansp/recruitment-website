import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";



export default function Table({header=[],data=[],action}) {
  return (
    <div className="relative overflow-x-auto border rounded-xl mx-4">
      <table className="w-full  text-sm text-left rtl:text-right dark:text-gray-400">
        <thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className=" border-b">
           {header?.map((each)=>(<th scope="col" className={`px-3 py-3`}>
           {each.title}
            </th>
            )) }
          {action&&  <th className="px-3 py-3 text-center">Action</th>}

            
          </tr>
        </thead>
        <tbody>
          {data?.map((each)=>(<tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="p-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {each.designation}
            </th>
            <td className="p-3">{each.description}</td>
            <td className="p-3 flex justify-center items-center gap-4">
            <MdEdit className=" bg-slate-100 text-primary rounded-full p-1 text-2xl" />
            <MdDelete className=" bg-slate-100 rounded-full p-1 text-2xl"/>
            </td>
          </tr>))}
         
        </tbody>
      </table>
    </div>
  );
}
