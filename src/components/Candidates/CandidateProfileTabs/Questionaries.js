import React, { useState,useEffect } from "react";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import TabsNew from "../../common/TabsNew";
import { Editor } from "draft-js";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { RiHome6Line, RiStickyNoteLine } from "react-icons/ri";
import {Formik, useFormik } from "formik";
import { Link,useParams,useLocation } from "react-router-dom";
import {getRecruitmentQuestionnaireTemplateById,getRecruitmentJobById,getAllRecruitmentJobResumesNotes,insertOrUpdateRecruitmentJobResumesNoteWithResumeId } from "../../Api1";


const Questionaries = () => {
  const primaryColor = localStorage.getItem("mainColor");
  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  const {resumeId} =useParams()
  const[jobId,setJobId] = useState(null)
  const { state } = useLocation();
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

  const[notes,setnotes]= useState("")


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

  

    const[questionareId,setquestionareId] = useState("")
    const[questionnaireData,setquestionnaireData]=useState([])

    const getJodbyId = async ()=>{
     const response =   await getRecruitmentJobById({id:localStorage.getItem('jobid')})
     setquestionareId(response.result[0].questionnaireTemplateId)
     
     console.log(response)
     
    }
    useEffect(()=>{
      getJodbyId()
    },[])

    const getQuestionare = async ()=>{
      try{
        const response = await getRecruitmentQuestionnaireTemplateById({
          
          id:parseInt(questionareId)
         
        })
        setquestionnaireData(response.result)
         console.log(response)
      }catch(error){
       console.log(error)
      }
  
      }
      useEffect(()=>{
        getQuestionare()
      },[questionareId])


  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper">
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Questionair</h6>
              <div
                className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
                // style={{ backgroundColor: `${primaryColor}10` }}
              >
                {/* <ButtonClick
                  buttonName="Choose Questionair"
                  BtnType="primary"
                /> */}
              </div>
            </div>

            <div className=" ">
            {questionnaireData && questionnaireData.map((questionnaire, index) => (
  <div key={index} className="mt-5">
    <p className="text-gray-700 dark:text-white font-Inter font-weight:500">
      <strong>{`Q${index + 1}. ${questionnaire.questionnaireTemplateName}`}</strong>
    </p>
    {questionnaire.questionaireTemplateDetailData && questionnaire.questionaireTemplateDetailData.map((question, idx) => (
      <div key={idx} className="mt-3">
        <p className="text-gray-700 dark:text-white font-Inter font-weight:500">
          <strong>{`Q${question.questionnaireTemplateDetailsId}. ${question.question}`}</strong>
        </p>
        <p className="text-gray-700 dark:text-white font-Inter font-weight:500">
          <strong>Ans.</strong> {question.answerMetaData[0]?.value || ''}
        </p>
      </div>
    ))}
  </div>
))}
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
            <ButtonClick buttonName="Save" BtnType="primary" handleSubmit={formik.handleSubmit}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionaries;
