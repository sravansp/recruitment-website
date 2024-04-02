import React, { useEffect, useState } from "react";
import ButtonClick from "../../common/Button";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { RiHome6Line, RiImage2Fill, RiStickyNoteLine } from "react-icons/ri";
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
import {updateRecruitmentJobResumesNote,getRecruitmentJobResumesNoteById,getAllRecruitmentJobResumesEvaluations,saveOrUpdateRecruitmentJobResumesEvaluationBatch,saveRecruitmentJobResumesNote,getAllRecruitmentJobResumesNotes,getRecruitmentEvaluationTemplateById,getRecruitmentJobById} from "../../Api1";
import { Formik, useFormik } from 'formik';
import TextArea from "../../common/TextArea";
import CheckBoxInput from "../../common/CheckBoxInput";
import FormInput from "../../common/FormInput";
import { FaRegEdit } from "react-icons/fa";




const Evaluations = () => {
  const primaryColor = localStorage.getItem("mainColor");
  const [evaluationList,setevaluationList] =useState([])
  const { state } = useLocation();
  const[jobId,setJobId]=useState(null)
  const{resumeId} = useParams()
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isPinned, setIsPinned] = useState(0);
  const handleEditClick = (jobResumeNoteId) => {
    setSelectedNoteId(jobResumeNoteId);
    getnotesbyId(jobResumeNoteId)
    // You can perform any additional actions here, such as opening a modal or navigating to another page.
  };
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
  const[fetchedAnswers,setfetchedAnswers]=useState([])

  const getresumeEvalutionId = async () => {
    try {
      const response = await getAllRecruitmentJobResumesEvaluations({ 
        jobId: jobId, 
        resumeId:resumeId
      });
      console.log(response);
      setfetchedAnswers(response.result);
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
                const selectedCheckboxValues = selectedCheckboxes.filter(option =>
                  metadata.value.split(',').includes(option.trim())
                );
                evaluationAnswer = selectedCheckboxValues.join(', ');
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
        if(!selectedNoteId){
        const response = await saveRecruitmentJobResumesNote({
         jobId:jobId,
         resumeId:resumeId,
         notes:e.notes,
         createdBy:null,
        })
        console.log(response)
        getnotes()
      }else{
        const response= await updateRecruitmentJobResumesNote({
          id:selectedNoteId,
          jobId:jobId,
          resumeId:resumeId,
          notes:e.notes,
          isPinned:isPinned,
          modifiedBy:null
        })
        console.log(response)
        getnotes()
      }
      }catch(error){
        console.log(error)
      }
    }
  })
  const getnotes = async()=>{
    try{
     const response = await getAllRecruitmentJobResumesNotes({resumeId:resumeId})
     console.log(response)
     setnotes(response.result)
    
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getnotes()
    console.log(notes)
    
  },[resumeId])

  const getnotesbyId = async(jobResumeNoteId)=>{
    try{
    const response = await getRecruitmentJobResumesNoteById({id:jobResumeNoteId})
    console.log(response);
    formik.setFieldValue('notes',response.result[0].notes)
    }catch(error){
      console.log(error)
    }

  }
  
 
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
    fetchedAnswers.forEach(answer => {
        const { evaluationTemplateDetailsId, evaluationAnswer } = answer;
        const matchedCondition = evaluationList.find(condition => condition.evaluationTemplateDetailsId === evaluationTemplateDetailsId);
        console.log(matchedCondition)
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
                        console.log(selectedOptions)
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
            {evaluationList.length > 0 ? (
evaluationList.map((condition, index) => (
  <><div key={index}>
    <h4>{condition.question}</h4>
    {condition.answerMetaData.map((metadata, idx) => (
      <div key={idx}>
        {metadata.key === 'Drop-down' && idx === 0 && (
          <Dropdown
            options={condition.answerMetaData
              .filter(meta => meta.key === 'Drop-down')
              .flatMap(meta => meta.value.split(','))
              .map(option => ({ label: option.trim(), value: option.trim() }))}
            change={Setdopdownvalue}
            value={dropdownvalue} />
        )}
        {metadata.key === 'Paragraph' && (
          <TextArea
            rows={4}
            change={setTextAreavalue}
            value={textAreaValue} />
        )}
        {metadata.key === 'Checkboxes' && (
          <div>
            {metadata.value.split(',').map((option, optIdx) => (
              <label key={optIdx}>
                <Checkbox
                  value={option.trim()}
                  checked={selectedCheckboxes.includes(option.trim())}
                  onChange={() => handleCheckboxChange(option.trim())} />
                {option.trim()}
              </label>
            ))}
          </div>
        )}
        {metadata.key === 'ShortAnswer' && (
          <FormInput
            change={setForminputValue}
            value={forminputvalue} />
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
  <div
    className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
  >
      <ButtonClick handleSubmit={handleSubmit} buttonName="save" BtnType="primary" />
    </div></>
))
            ):( 
            <div className="h-full gap-4 vhcenter box-wrapper borderb">
            <div className="flex flex-col items-center gap-4">
              <div className="size-11 bg-[#F9FAFB] dark:bg-secondaryDark rounded-full vhcenter">
                <RiImage2Fill className="text-black text-opacity-50 dark:text-white" />
              </div>
              <h6 className="h6">You don't have any evaluation now</h6>
              {/* <p className="para">
                You can schedule a meeting at any moment you want. Click "Create Event" to set one.
              </p>
              <ButtonClick
                buttonName="Create Event"
                BtnType="primary"
                handleSubmit={onCreateEventClick}
              /> */}
            </div>
          </div>
             )}
 
            
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
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
        {notes && notes.map((note, index) => (
  <div className="relative flex pb-6" key={index}>
    <div className="flex items-center justify-between w-full">
      <p className="pblack flex-grow pl-4 !font-normal">
        <strong>{note.notes}</strong>
      </p>
      <div className="flex items-center gap-6"> {/* Added gap between createdOn and icons */}
        <p className="para !font-normal">{note.createdOn}</p>
        <div className="flex items-center gap-3">
        {/* <TiPin
                  onClick={() => handlePinClick(note.jobResumeNoteId)}
                  style={{ color: selectedNoteId === note.jobResumeNoteId && isPinned === 1 ? 'blue' : 'gray' }}
                />  */}
          <FaRegEdit onClick={() => handleEditClick(note.jobResumeNoteId)} />
        </div>
      </div>
    </div>
  </div>
))}
</div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Evaluations;
