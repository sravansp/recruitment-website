import React,{useState} from 'react'
import Dropdown from './Dropdown'
import ToggleBtn from './ToggleBtn'
import { Form } from '../data'
import { MdOutlineFileCopy } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import FormInput from './FormInput';


const GoogleForm = () => {
    const[selectedValue,setselectedValue] =useState("")
    const handleDropdownChange = (selectedValue) => {
        // Your logic to handle the selected value
        console.log("Selected Value:", selectedValue);
        setselectedValue(selectedValue);

      
        // Perform any other actions based on the selected value
        // For example, update state or trigger an API call
      };
      const [inputValue, setInputValue] = useState("");

const handleChange = (newValue) => {
  setInputValue(newValue);
};
  
  
    return (
    <div className="grid grid-cols-4 gap-16  justify-between">
    <FormInput
    placeholder={"Type question here"}
    value={inputValue}
    change={handleChange}
    />
     
    <Dropdown
    
  options={Form}
  change={(selectedValue) => {
    handleDropdownChange(selectedValue);
  }}
  value={selectedValue}
  icondropDown={true}
//   placeholder={'selectvalue'}
// placeholder='values'

/>

<div style={{ display: 'flex', alignItems: 'center',gap: '15px' }}>
<p>Mandatory</p>
<ToggleBtn/>
</div>
<div style={{ display: 'flex', alignItems: 'center',gap: '15px' }}>
<MdOutlineFileCopy />
<MdDelete />
</div>
     

  </div>
  )
}

export default GoogleForm