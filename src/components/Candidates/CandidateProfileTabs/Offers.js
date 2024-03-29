import React, { useState,useEffect } from "react";
import ButtonClick from "../../common/Button";
import TextEditor from "../../common/TextEditor/TextEditor";
import TabsNew from "../../common/TabsNew";
import {getRecruitmentLetterTemplateById,saveRecruitmentJobResumesOfferLetter,getAllRecruitmentLetterTemplates,getAllRecruitmentJobResumesNotes,insertOrUpdateRecruitmentJobResumesNoteWithResumeId } from "../../Api1";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { format } from 'date-fns';
import {
  RiAttachment2,
  RiEmojiStickerFill,
  RiHome6Line,
  RiStickyNoteLine,
} from "react-icons/ri";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FcCheckmark } from "react-icons/fc";
import { ImAttachment } from "react-icons/im";
import { Link,useParams,useLocation } from "react-router-dom";
import {Formik, useFormik } from "formik";
import Dropdown from "../../common/Dropdown";
import { Button, Card, Space, notification } from "antd";


const Offers = () => {
  const [content, setContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const primaryColor = localStorage.getItem("mainColor");
  const {resumeId} =useParams()
  const[jobId,setJobId] = useState(null)
  const[LetterTemplate,setLetterTemplate] = useState([])
  const { state } = useLocation();
  const [LetterTemplateId,setLetterTemplateId] =useState("")
  const[Letterdata,setLetterdata] = useState([])
 
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

  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    setUploadedFiles([...uploadedFiles, ...files]);
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

      icon: <BsFileEarmarkRichtext className="text-base" />,
    },
  ];

  
 const[notes,setnotes]= useState("")
 

 const handlesubmit = async()=>{
  try {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  const response = await saveRecruitmentJobResumesOfferLetter(
    {
      jobId:jobId,
        resumeId:resumeId,
        offerLetterData:content,
        offerLetterTemplateId:LetterTemplateId||null,
        offerLetterStatusDate:formattedDate,
        createdBy: null
    }
  )
   console.log (response)
   if (response.status === 200) {
        
        
    openNotification(
      "success",
      "Successful",
      response.message
    );
   formik.resetForm()
  
  }else if (response.status === 500) {
    openNotification("error", "input field is empty..", response.message);
  }
  }catch(error){
    console.log(error)
  }

 }

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
   const getLetterTemplate = async ()=>{
    try {
       const response = await getAllRecruitmentLetterTemplates()
       console.log(response)
       setLetterTemplate(response.result.map((each) => ({
        label: each.letterTemplateName,
        value: each.letterTemplateId,
      })))
    }catch(error){
      console.log(error)
    }
   }
   useEffect(()=>{
    getLetterTemplate()
   },[])
   const getletteTemplateByid = async (id) => {
    try {
      const response = await getRecruitmentLetterTemplateById({ id });
      console.log(response);
      setContent(response.result[0].letterTemplate.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (LetterTemplateId !== null) {
      getletteTemplateByid(LetterTemplateId);
    }
  }, [LetterTemplateId]);
  
   const handleEditorChange = (content) => {
    setContent(content);
  };
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
  

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper">
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Offer Letter</h6>
              <div
                className="flex items-center justify-end gap-2.5 p-1.5  rounded-lg"
                // style={{ backgroundColor: `${primaryColor}10` }}
              >
                <ButtonClick buttonName="Reject" />
                <ButtonClick buttonName="Accept" icon={<FcCheckmark />} />
               <Dropdown
               placeholder={"Choose template"}
               options={LetterTemplate}
               change={(e)=>{
               
                setLetterTemplateId(e)
               }}
               value={LetterTemplateId}

               />
              </div>
            </div>

            <div>
              <div className="pt-4">
              <TextEditor
  initialValue={content}
  onChange={handleEditorChange}
  minheight="250px"
/>
              </div>
              <div
                className="flex justify-between items-center gap-2.5 p-1.5  rounded-lg "
                style={{
                  backgroundColor: `${primaryColor}10`,
                  color: `${primaryColor}10`,
                }}
              >
                <div className="flex justify-items-start !important  gap-2.5 p-1.5 ">
                  <label className="p-2 cursor-pointer">
                    <RiAttachment2 size={18} className="text-primary" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                      accept=".doc, .docx, .pdf, .jpg, .jpeg, .png" // Specify the allowed file types
                    />
                  </label>
                  <label className="p-2 cursor-pointer">
                    <RiEmojiStickerFill size={18} className="text-primary" />
                  </label>

                  <ButtonClick
                    buttonName="Add Signature"
                    BtnType="link"
                    className="text-primary"
                  />
                </div>
                <div className="flex gap-2.5 p-1.5">
                  <ButtonClick buttonName="Cancel" />
                  <ButtonClick buttonName="Send now" BtnType="primary"  handleSubmit={handlesubmit}  />
                </div>
              </div>
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
      {contextHolder}
    </div>
  );
};

export default Offers;
