import React,{useState} from 'react'
import Dropdown from './Dropdown'
import ToggleBtn from './ToggleBtn'
import { Form } from '../data'
import { MdOutlineFileCopy } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import FormInput from './FormInput';
import ButtonClick from './Button';
import { CgAdd } from "react-icons/cg";
import TextArea from './TextArea';
import { useFormik } from 'formik';




const GoogleForm = ( onSubmitCallback = ()=>{} ) => {
    const formik =useFormik
    const [conditions, setConditions] = useState([
        {
          id: 1,
          inputValue: '',
          selectedValue: '',
        },
    ]);
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const handleDropdownChange = (selectedValue, conditionIndex) => {
        const updatedConditions = [...conditions];
        updatedConditions[conditionIndex].selectedValue = selectedValue;
        setConditions(updatedConditions);
    };

    const handleAddCondition = () => {
        const newCondition = {
          id: conditions.length + 1,
          inputValue: '',
          selectedValue: '',
        };
        setConditions([...conditions, newCondition]);
    };
   

    const handleDeleteCondition = (conditionId) => {
        if (conditions.length > 1) {
          const updatedConditions = conditions.filter((condition) => condition.id !== conditionId);
          setConditions(updatedConditions);
        }
    };

    const handleChange = (newValue, index) => {
        const updatedConditions = [...conditions];
        const currentCondition = updatedConditions[index];

        if (currentCondition) {
            // Ensure the condition object is defined before updating its properties
            currentCondition.inputValue = newValue;
            setConditions(updatedConditions);
        }
    };
    const handleSaveInput = (index) => {
        const updatedDropdownOptions = [...dropdownOptions];
      
        if (index === 0) {
          // Handle the first condition differently
          const numberOfArraysToAdd = 1; // You can adjust this number as needed
          for (let i = 0; i < numberOfArraysToAdd; i++) {
            updatedDropdownOptions.push({
              id: conditions[0].id,
              label: conditions[0].inputValue , // Adjust label as needed
              value: conditions[index].selectedValue,
            });
          }
        } else {
          // For other conditions, update the existing array
          updatedDropdownOptions[index] = {
            id: conditions[index].id,
            label: conditions[index].inputValue,
            value: conditions[index].inputValue,
          };
        }
      
        setDropdownOptions(updatedDropdownOptions);
      };
       
      const generateInputField = (selectedValue, condition, index,newValue) => {
        switch (selectedValue) {
          case 'Paragraph':
            return <TextArea  />;
          case 'ShortAnswer':
            return <FormInput/>;
          case 'Drop-down':
            return (
              <Dropdown
                PopoverContent={<FormInput  />}
                rightIcon={true}
                change={(e) => handleSaveInput(index)}
                options={dropdownOptions}
                value={condition.selectedValue}
              />
            );
          default:
            // return <FormInput value={formik.value.Default} change={(newValue) => handleChange(newValue, index)} />;
        }
      };
    return (
        <div className='grid grid-rows-2 gap-8'>
            {conditions.map((condition, index) => (
                <div key={condition.id} className="grid grid-cols-4 gap-16  justify-between">
                      <FormInput
  placeholder={'Type question here'}
  value={formik.values.customFields[index].question}
  change={(e) => {
    formik.setFieldValue(`customFields[${index}].question`, e);
    console.log("question value", e);
  }}
/>

<Dropdown
  options={Form}
  change={(e) => {
    formik.setFieldValue(`customFields[${index}].answer_type`, e);
    console.log("dropdown", e);
  }}
  value={formik.values.customFields[index].answer_type}
  icondropDown={true}
/>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <p>Mandatory</p>
                        <ToggleBtn />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <MdOutlineFileCopy
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <MdDelete
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            onClick={() => handleDeleteCondition(condition.id)}
                        />
                    </div>
                    {generateInputField(
                        condition.selectedValue,
                        condition,
                        index,
                        
                        condition.inputValue
                        
                    )}
                </div>
            ))}
            <div className="flex items-center gap-2">
                <CgAdd style={{ width: '34px', height: '34px', cursor: 'pointer' }} onClick={handleAddCondition} />
                <p style={{ cursor: 'pointer' }}>  Add Custom Field</p>
            </div>
        </div>
    );
};

export default GoogleForm;