import React, { useEffect, useState } from "react";
import ButtonClick from "../../common/Button";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { RiHome6Line, RiStickyNoteLine } from "react-icons/ri";
import TextEditor from "../../common/TextEditor/TextEditor";
import TabsNew from "../../common/TabsNew";
import RadioButton from "../../common/RadioButton";
import Radiobuttonnew from "../../common/Radiobuttonnew";
import Dropdown from "../../common/Dropdown";
import { Checkbox, Flex, Radio,notification } from "antd";
import { FaCircleMinus, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { useParams,useLocation } from "react-router-dom";
import {getAllRecruitmentJobResumesEvaluations,saveOrUpdateRecruitmentJobResumesEvaluationBatch,insertOrUpdateRecruitmentJobResumesNoteWithResumeId,getAllRecruitmentJobResumesNotes,getRecruitmentEvaluationTemplateById,getRecruitmentJobById} from "../../Api1";
import { Formik, useFormik } from 'formik';
import TextArea from "../../common/TextArea";
import CheckBoxInput from "../../common/CheckBoxInput";
import FormInput from "../../common/FormInput";




const Evaluations = () => {
  const primaryColor = localStorage.getItem("mainColor");
  const [evaluationList,setevaluationList] =useState([])
  const { state } = useLocation();
  const[jobId,setJobId]=useState(null)
  const{resumeId} = useParams()
  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  const tabData = [
    {
      id: 9,
      title: "Notes",
      value: "notes",
      // content: <Overview />,
      icon: <RiHome6Line className="text-base" />,
    },
    {
      id: 10,
      title: "Tags",
      value: "tags",
      icon: <RiStickyNoteLine className="text-base" />,
    },
    {
      id: 11,
      title: "Documents",
      value: "documents",
      // content: <ActivityFeed />,
      icon: <BsFileEarmarkRichtext className="text-base" />,
    },
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      // stack: 2,
      style: {
        background: `${
          type === "success"
            ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
            : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
        }`,
        boxShadow: `${
          type === "success"
            ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
            : "0px 22px 60px rgba(134, 92, 144, 0.20)"
        }`,
      },
      // duration: null,
    });
  };
  
  const[evaluationAnswers,setEvaluationAnswers] = useState([])
  const[dropdownvalue,Setdopdownvalue]=useState(null)
  const[textAreaValue,setTextAreavalue]=useState(null)
  const[forminputvalue,setForminputValue]=useState(null)
  const[jobResumeEvaluationId,setjobResumeEvaluationId]=useState([])

  const getresumeEvalutionId = async () => {
    try {
      const response = await getAllRecruitmentJobResumesEvaluations({ 
        jobId: jobId, 
        resumeId:resumeId
      });
      console.log(response);
      setEvaluationAnswers(response.result);
       // Set the fetched evaluation answers to state
      
      
      console.log(evaluationList)// Iterate through the fetched evaluation answers and set the corresponding state variables
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getresumeEvalutionId()
  },[jobId])


  
  const handleSubmit = async () => {
    try {
      const newAnswers = evaluationList.flatMap((condition, conditionIndex) => {
        const answers = {}; // Object to store answers for each evaluationTemplateDetailsId
        condition.answerMetaData.forEach(metadata => {
          const detailsId = condition.evaluationTemplateDetailsId;
          const answer = evaluationAnswers.find(a => a.evaluationTemplateDetailsId === detailsId);
          let evaluationAnswer;
          switch (metadata.key) {
            case 'Drop-down':
              evaluationAnswer = dropdownvalue;
              break;
            case 'Paragraph':
              evaluationAnswer = textAreaValue;
              break;
            case 'Checkboxes':
              evaluationAnswer = selectedCheckboxes
                .filter(option => metadata.value.split(',').includes(option.trim()))
                .join(', ');
              break;
            case 'ShortAnswer':
              evaluationAnswer = forminputvalue;
              break;
            case 'MultipleChoice':
              evaluationAnswer = selectedValues[conditionIndex];
              break;
            default:
              evaluationAnswer = "";
          }
          // Store the answer based on evaluationTemplateDetailsId
          answers[detailsId] = {
            
            jobId: jobId,
            resumeId: resumeId,
            evaluationTemplateId: evalutaionId,
            evaluationTemplateDetailsId: detailsId,
            evaluationAnswer: answer ? answer.evaluationAnswer : evaluationAnswer,
            createdBy: null
          };
        });
        // Convert the answers object to an array
        return Object.values(answers);
      });
      
      console.log("New Answers:", newAnswers);
      
  
      // Save the new answers to the database
      const response = await saveOrUpdateRecruitmentJobResumesEvaluationBatch(newAnswers);
      console.log("Save Response:", response);
      if (response.status === 200) {
         
         
        openNotification(
          "success",
          "Successful",
          response.message
        );
        formik.resetForm();
       
      }else if(response.status === 500){
       openNotification(
         "success",
         "Successful",
         response.message
       );
      }
      
      // Optionally, handle the response from the database here
  
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Handle errors here
    }
  };
  useEffect(() => {
    if (state && state.jobID) {
        setJobId(state.jobID);
    } else {
        const storedJobId = localStorage.getItem('jobid');
        if (storedJobId) {
            setJobId(storedJobId);
        }
    }
}, [state]);

const [selectedValues, setSelectedValues] = useState([]);

// Function to handle changes in the selected radio button
const handleRadioChange = (e, index) => {
  const newSelectedValues = [...selectedValues];
  newSelectedValues[index] = e.target.value;
  setSelectedValues(newSelectedValues);
};
 const[evalutaionId,setEvaluationId] = useState("")

 const getEvtempId = async ()=>{
  const response =   await getRecruitmentJobById({id:localStorage.getItem('jobid')})
  setEvaluationId(response.result[0].evaluationTemplateId)
  
  console.log(response)
  
 }

 const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // Function to handle changes in the selected checkboxes
  const handleCheckboxChange = (value) => {
    const newSelectedCheckboxes = [...selectedCheckboxes];
    const index = newSelectedCheckboxes.indexOf(value);
    if (index === -1) {
      newSelectedCheckboxes.push(value);
    } else {
      newSelectedCheckboxes.splice(index, 1);
    }
    setSelectedCheckboxes(newSelectedCheckboxes);
  };
 useEffect(()=>{
  getEvtempId()
 },[evalutaionId])
  const [notes, setnotes] = useState("");
  const formik = useFormik ({
    initialValues :{
      jobId:"",
        resumeId:"",
        notes:"",
        createdBy: ""
    },
    onSubmit: async (e)=>{
      try {
        const response = await insertOrUpdateRecruitmentJobResumesNoteWithResumeId({
         jobId:jobId,
         resumeId:resumeId,
         notes:e.notes,
         createdBy:null,
        })
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }
  })
  
  const getnotes = async()=>{
    try{
     const response = await getAllRecruitmentJobResumesNotes({resumeId:resumeId})
     console.log(response)
     setnotes(response.result[0].notes)
     const data = response.result[0]
     formik.setFieldValue("notes",data.notes)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getnotes()
    console.log(notes)
    
  },[])

 
  const getevaluation = async ()=>{
    try {
      const response = await  getRecruitmentEvaluationTemplateById({id:parseInt(evalutaionId)})
      console.log(response)
      const evaluationData = response.result.flatMap(item => {
        return item.evaluationTemplateDetailData.map(detail => ({
          evaluationTemplateDetailsId:detail.evaluationTemplateDetailsId,
          question: detail.question,
          answerMetaData: detail.answerMetaData.map(metadata => ({ // Fix here
            key: metadata.key,
            value: metadata.value
          }))
        }));
      });
      setevaluationList(evaluationData)
     
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getevaluation();
    console.log(evaluationList)
   
  },[evalutaionId])
useEffect(() => {
    evaluationAnswers.forEach(answer => {
        const { evaluationTemplateDetailsId, evaluationAnswer } = answer;
        const matchedCondition = evaluationList.find(condition => condition.evaluationTemplateDetailsId === evaluationTemplateDetailsId);
        
        if (matchedCondition) {
            const metaData = matchedCondition.answerMetaData.find(meta => meta.key);
            if (metaData) {
                const { key } = metaData;
                switch (key) {
                    case 'Drop-down':
                        Setdopdownvalue(evaluationAnswer);
                        break;
                    case 'Paragraph':
                        setTextAreavalue(evaluationAnswer);
                        break;
                    case 'Checkboxes':
                        const selectedOptions = evaluationAnswer.split(',').map(option => option.trim());
                        setSelectedCheckboxes(selectedOptions);
                        break;
                    case 'ShortAnswer':
                        setForminputValue(evaluationAnswer);
                        break;
                    case 'MultipleChoice':
                        setSelectedValues(prevState => {
                            const newState = [...prevState];
                            const index = evaluationList.findIndex(condition => condition.evaluationTemplateDetailsId === evaluationTemplateDetailsId);
                            newState[index] = evaluationAnswer;
                            return newState;
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    });
}, [evaluationList, evaluationAnswers]);
 
  const onChange = (e) => {};

  //rendecomponent
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper">
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Evaluation Form</h6>
             
            </div>
            {/* <div className="v-divider  border-[1px] opacity-[10px]" /> */}

            {/* <div className="flex flex-col   gap-6 font-['SF Pro'] font-normal text-sm leading-5 text-black ">
              <RadioButton
                title="Does the candidate have the appropriate educational qualifications or training for this position?"
                // value={}n
                // change={}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "not sure", label: "Not Sure" },
                ]}
                gap={"125px"}
                
              />
              <RadioButton
                title="Did the candidate demonstrate, through their answers, a high degree of initiative?"
                // value={}
                // change={}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "not sure", label: "Not Sure" },
                ]}
              />
              <Dropdown
                title="Characteristics" // Example title passed as prop
                // value={}
                // change={}
                // options={}
                placeholder="Choose..."
                className="w-[196px]"
              />
              <Dropdown
                title="Appearance" // Example title passed as prop
                // value={}
                // change={}
                // options={}
                placeholder="Choose..."
                className="w-[196px]"
              />
              
              <div className="v-divider  border-[1px] opacity-[10px] " />
              <div className="flex  justify-between ">
                <h3 className="text-black font-semibold text-base font-['SF Pro']  !leading-6 ">
                  Overall Scrore
                </h3>
                <p className="leading-4 text-black font-['SF Pro'] font-normal  ">
                  *Overall score always required
                </p>
              </div>
              <p className="font-normal text-xs leading-5 font-['SF Pro'] ">
                Give the candidate a quick evaluation score
              </p>

              <Radio.Group
                onChange={onChange}
                defaultValue=""
                className="flex flex-grow w-[860px] h-[70px] mb-2 "
              >
                <Radio.Button
                  className="w-[172px] h-[70px]  bg-gray-200 text-gray-500 hover:bg-violet-100 hover:text-primary "
                  value="a"
                >
                  <RxCrossCircled className="bg-gray-200 text-gray-500 ml-5  hover:text-primary " />
                  Strong No
                </Radio.Button>
                <Radio.Button
                  className="w-[172px] h-[70px]  bg-gray-200 text-gray-500"
                  value="b"
                >
                  <FaThumbsDown className="bg-gray-200 text-gray-500 ml-1 " />
                  NO
                </Radio.Button>
                <Radio.Button
                  className="w-[172px] h-[70px]  bg-gray-200 text-gray-500"
                  value="c"
                >
                  <FaCircleMinus className="bg-gray-200 text-gray-500 ml-5 " />
                  Not Sure
                </Radio.Button>
                <Radio.Button
                  className="w-[172px] h-[70px]  bg-gray-200 text-gray-500"
                  value="d"
                >
                  {" "}
                  <FaThumbsUp className="bg-gray-200 text-gray-500 ml-1" />
                  Yes
                </Radio.Button>
                <Radio.Button
                  className="w-[172px] h-[70px]  bg-gray-200 text-gray-500"
                  value="e"
                >
                  <GoStarFill className="bg-gray-200 text-gray-500 ml-6 " />
                  Strong Yes
                </Radio.Button>
              </Radio.Group>
            </div> */}
{evaluationList.map((condition, index) => (
  <div key={index}>
    <h4>{condition.question}</h4>
    {condition.answerMetaData.map((metadata, idx) => (
      <div key={idx}>
        {metadata.key === 'Drop-down' && idx === 0 && (
          <Dropdown
            options={metadata.value.split(',').map(option => ({ label: option.trim(), value: option.trim() }))}
            change={Setdopdownvalue}
            value={dropdownvalue}
          />
        )}
        {metadata.key === 'Paragraph' && (
          <TextArea
            rows={4}
            change={setTextAreavalue}
            value={textAreaValue}
          />
        )}
        {metadata.key === 'Checkboxes' && (
          <div>
            {metadata.value.split(',').map((option, optIdx) => (
              <label key={optIdx}>
                <Checkbox
                  value={option.trim()}
                  checked={evaluationAnswers.some(answer => (
                    answer.evaluationTemplateDetailsId === condition.evaluationTemplateDetailsId &&
                    answer.jobId === jobId &&
                    answer.resumeId === resumeId &&
                    answer.evaluationAnswer === option.trim()
                  ))}
                  onChange={() => handleCheckboxChange(option.trim())}
                />
                {option.trim()}
              </label>
            ))}
          </div>
        )}
        {metadata.key === 'ShortAnswer' && (
          <FormInput
            change={setForminputValue}
            value={forminputvalue}
          />
        )}
        {metadata.key === 'MultipleChoice' && (
          <div>
            <Radio.Group
              onChange={e => handleRadioChange(e, index)}
              value={selectedValues[index]}
            >
              {metadata.value.split(',').map((option, optIdx) => (
                <Radio key={optIdx} value={option.trim()}>
                  {option.trim()}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}
      </div>
    ))}
  </div>
))}
  <div
                className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
                // style={{ backgroundColor: `${primaryColor}10` }}
              >
                <ButtonClick handleSubmit={handleSubmit} buttonName="save" BtnType="primary" />
              </div>
            
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor
            initialValue={formik.values.notes}
            onChange={(e)=>{
              formik.setFieldValue('notes',e)
            }}
            minheight="250px"
          />
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Save" BtnType="primary" handleSubmit={formik.handleSubmit} />
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Evaluations;
