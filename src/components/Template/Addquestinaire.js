import React,{useState} from 'react'
import DrawerPop from '../common/DrawerPop'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next'
import { Button, Card, Space } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from '../common/TextArea'
import image from '../../assets/images/generate-ai-img.png'
import TextEditor from '../common/TextEditor/TextEditor'
import FormInput from '../common/FormInput'
import ToggleBtn from '../common/ToggleBtn'
import Dropdown from '../common/Dropdown'
import { MdDelete, MdOutlineFileCopy } from 'react-icons/md'
import { Form } from '../data'
import { CgAdd } from 'react-icons/cg'

const QuestionAire = ({open = "", close = () => { },inputshow= false,isUpdate={}}) => {
    

    const [savedContent, setSavedContent] = useState([]);
    const[show,setShow] =useState(open);
    const { t } = useTranslation();
    const handleClose = () => {
        close(false);
      };
      const [content, setContent] = useState("")
      const handleEditorChange = (content) => {
        setContent(content);
      };
      const [conditions, setConditions] = useState([
        {
          id: 1,
          inputValue: '',
          selectedValue: '',
        },
    ]);
    const handleAddCondition = () => {
      const newCondition = {
        id: conditions.length + 1,
        inputValue: '',
      selectedValue: '',
       
      };
      // formik.setFieldValue(`customFields[${conditions.length}].question`, '');
      // formik.setFieldValue(`customFields[${conditions.length}].answer_type`, '');
      // formik.setFieldValue(`customFields[${conditions.length}].answer_meta_data`, '');
      setConditions([...conditions, newCondition]);
  };
  
  
  const handleDeleteCondition = (conditionId) => {
      if (conditions.length > 1) {
        const updatedConditions = conditions.filter((condition) => condition.id !== conditionId);
        setConditions(updatedConditions);
      }
  };
  const generateInputField = (e, condition, index) => {
    console.log("value",e)
    
   
    console.log('Saved content:', savedContent);
    switch (e) {
      
//       case 'Paragraph':
//         return (
//           <TextArea
//   value={formik.values.customFields[index].answer_meta_data}
//   change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
// />
//         );
//       case 'ShortAnswer':
//         return (
//           <FormInput
//   value={formik.values.customFields[index].answer_meta_data}
//   change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
// />
//         );
      case 'Drop-down':
        return (
          
          <FormInput
            // value={formik.values.customFields[index].answer_meta_data}
            // change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
          />
        
      
        
          
        );
      default:
        // return <FormInput value={formik.value.Default} change={(newValue) => handleChange(newValue, index)} />;
    }
  };

  const handleDropdownChange = (e, conditionIndex) => {
    const updatedConditions = [...conditions];
    updatedConditions[conditionIndex].e = e;
    setConditions(updatedConditions); 
  };
    return (
      <div>
    
    
    <DrawerPop
    
    open={show}
    contentWrapperStyle={{
       position: "absolute",
       height: "100%",
       top: 0,
       // left: 0,
       bottom: 0,
       right: 0,
       width: "100%",
       borderRadius: 0,
       borderTopLeftRadius: "0px !important",
       borderBottomLeftRadius: 0,
     }}


    close={(e) => {
      setShow(e);
   //    setUpdateId(null);
      handleClose();
      
      
    }}
   
    header={[
       !isUpdate
         ? t("Create Questionnaire Template")
         : t("Create Questionnaire Template"),
       t("Lorem ipsum dummy text doret solo."),
     ]}
     
    //  headerRight={
    //    <div className="flex items-center gap-10">
    //      <p className="text-sm font-medium text-gray-400">
    //        Draft Saved 10 Seconds ago
    //      </p>
    //      <div className="flex items-center gap-2.5">
    //        <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
    //        <RxQuestionMarkCircled className="text-2xl font-medium text-gray-400 " />
    //      </div>
    //    </div>
    //  }
     footerBtn={[
       t("Cancel"),
       !isUpdate ? t("Save Template") : t("Save Template"),
     ]}
     className="widthFull"
     
    //  buttonClickCancel={(e) => {
    //    if (activeBtn > 0) {
    //      setActiveBtn(activeBtn - 1);
    //      setNextStep(nextStep - 1);
    //      setActiveBtnValue(steps?.[activeBtn - 1].data);
    //      console.log(activeBtn - 1);
    //    }
    //    setBtnName("");
    //  }}
    //  nextStep={nextStep}
    //  activeBtn={activeBtn}
    //  saveAndContinue={true}
    //  stepsData={steps}
    
    
    > <div  className="relative max-w-[1070px]  w-full mx-auto">
          <Accordion
                                               title={"New Questionnaire Templates"}
                                               className="Text_area"
                                               padding={true}
                                               toggleBtn={false}
                                               click={() => {
                                              //    setPresentage(1.4);
                                               }}
                                               initialExpanded={true}
                                        > 
                                       <div className='grid grid-cols-2'>
                                       <FormInput
                                       title={"Template Name"}
                                       placeholder={"Type here..."}
                                       
                                       />
                                       </div>
                                    
                                       {conditions.map((condition, index) => (
                <div key={index} className="grid grid-cols-4 gap-16  justify-between">
       <FormInput
  placeholder={'Type question here'}
  // value={formik.values.customFields.default?.[index]?.question}

  // change={(e) => {
  //   formik.setFieldValue(`customFields.default[${index}].question`, e);
  //   console.log("question value", e);
  // }}
/>

<Dropdown
  options={Form}
  // change={(e) => {
  //   formik.setFieldValue(`customFields.default[${index}].answer_type`, e);
  //   handleDropdownChange(e,index)
  //   console.log("dropdown", e);
  // }}
  // value={formik.values.customFields.default?.[index]?.answer_type}
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
                        condition.e,
                        condition,
                        index,
                        'Drop-down',
                        null,
                        condition.inputValue
                        
                    )}
                </div>
            ))}
             <div className="flex items-center gap-2">
                <CgAdd style={{ width: '34px', height: '34px', cursor: 'pointer' }} onClick={handleAddCondition} />
                <p style={{ cursor: 'pointer' }}>  Add Custom Field</p>
            </div>
                                        </Accordion>
                                        </div>  
    </DrawerPop>
   
    </div>
  )
}

export default QuestionAire