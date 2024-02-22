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




const GoogleForm = () => {
    const [conditions, setConditions] = useState([
        {
          id: 1,
          inputValue: '',
          selectedValue: '',
        },
    ]);

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

    const generateInputField = (type, condition, index) => {
        switch (type) {
            case 'Paragraph':
                return <TextArea value={condition.inputValue} change={(newValue) => handleChange(newValue, index)} />;
            case 'ShortAnswer':
                return <FormInput value={condition.inputValue} change={(newValue) => handleChange(newValue, index)} />;
            case 'Drop-down':
                return (
                    <Dropdown
                        forminput={<FormInput value={condition.inputValue} change={(newValue) => handleChange(newValue, index)} />}
                        input={true}
                    />
                );
            default:
                return <FormInput value={condition.inputValue} change={(newValue) => handleChange(newValue, index)} />;
        }
    };

    return (
        <div className='grid grid-rows-2 gap-8'>
            {conditions.map((condition, index) => (
                <div key={condition.id} className="grid grid-cols-4 gap-16  justify-between">
                    <FormInput
                        placeholder={'Type question here'}
                        value={condition.inputValue}
                        change={(newValue) => handleChange(newValue, index)}
                    />

                    <Dropdown
                        options={Form}
                        change={(selectedValue) => handleDropdownChange(selectedValue, index)}
                        value={condition.selectedValue}
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