import React, { useState, useEffect } from "react";
import ButtonClick from "../../common/Button";
import TextEditor from "../../common/TextEditor/TextEditor";
import {stateToHTML} from 'draft-js-export-html';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import TabsNew from "../../common/TabsNew";
import {getAllRecruitmentJobResumesOfferLetters,getRecruitmentJobResumesNoteById,updateRecruitmentJobResumesNote,getRecruitmentLetterTemplateById,saveRecruitmentJobResumesOfferLetter,getAllRecruitmentLetterTemplates,getAllRecruitmentJobResumesNotes,saveRecruitmentJobResumesNote } from "../../Api1";

import { format } from 'date-fns';
import {
  RiAttachment2,
  RiDeleteBin6Line,
  RiEmojiStickerFill,
  RiHome6Line,
  RiStickyNoteLine,
} from "react-icons/ri";
import { BsFileEarmarkRichtext, BsFileImage, BsFileWord, BsFiletypePdf } from "react-icons/bs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FcCheckmark } from "react-icons/fc";
import { ImAttachment } from "react-icons/im";
import { Link, useParams, useLocation } from "react-router-dom";
import { Formik, useFormik } from "formik";
import { Button, Card, Dropdown, Menu, Space, notification } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { CommonAxisSettingsConstantLineStyle } from "devextreme-react/chart";
import Pdf from "../../../assets/images/uploader/pdf.png"
import { FiAlertOctagon } from "react-icons/fi";
import { PiChecks, PiPushPinSlashBold } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

const Offers = () => {
  const [content, setContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const primaryColor = localStorage.getItem("mainColor");
  const { resumeId } = useParams()
  const [jobId, setJobId] = useState(null)
  const [LetterTemplate, setLetterTemplate] = useState([])
  const { state } = useLocation();
  const [LetterTemplateId, setLetterTemplateId] = useState("")
  const [Letterdata, setLetterdata] = useState([])
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isPinned, setIsPinned] = useState(0);
  const [offerLetters,setOfferLetters] = useState([])
  const [userid, setuserid] = useState("");


  const handleEditClick = (jobResumeNoteId) => {
    setSelectedNoteId(jobResumeNoteId);
    getnotesbyId(jobResumeNoteId)
    // You can perform any additional actions here, such as opening a modal or navigating to another page.
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

const handleViewResume= (PdFViewer)=>{
  window.open(PdFViewer, '_blank');
}
const getFileIcon = (fileType) => {
  switch (fileType) {
    case "application/pdf":
      return <BsFiletypePdf className="mr-2 text-red-500" size={20} />;
    case "image/jpeg":
    case "image/png":
      return <BsFileImage className="mr-2 text-blue-500" size={20} />;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <BsFileWord className="mr-2 text-blue-700" size={20} />;
    default:
      return null;
  }
};
const formatSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
const removeFile = (index) => {
  const updatedFiles = [...uploadedFiles];
  updatedFiles.splice(index, 1);
  setUploadedFiles(updatedFiles);
};

useEffect(() => {
  // Retrieve the login data JSON string from local storage
  const loginDataString = localStorage.getItem("LoginData");

  if (loginDataString) {
    // Parse the JSON string to get the LoginData object
    const loginData = JSON.parse(loginDataString);

    // Extract the username from the userData object
    setuserid(
      loginData && loginData.userData && loginData.userData.employeeId
    );

    // Now, 'username' variable contains the username
  } else {
    console.error("Login data not found in local storage.");
  }
}, []);
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
        boxShadow: `${type === "success"
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

    // {
    //   id: 10,
    //   title: "Tags",
    //   value: "tags",

    //   icon: <RiStickyNoteLine className="text-base" />,
    // },
    // {
    //   id: 11,
    //   title: "Documents",
    //   value: "documents",

    //   icon: <BsFileEarmarkRichtext className="text-base" />,
    // },
  ];
  const handleEditorChange = (state) => {
   
  
    setContent(state)
  };


  const [notes, setnotes] = useState("")
  const[html,setstateHTML] =useState("")


  const handlesubmit = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
      const response = await saveRecruitmentJobResumesOfferLetter(
        {
          jobId: jobId,
          resumeId: resumeId,
          offerLetterData: html,
          offerLetterTemplateId: LetterTemplateId || null,
          offerLetterStatusDate: formattedDate,
          seal:null,
          signature:null,
          attachments:null,
          createdBy: userid
        }
      )
      console.log(response)
      getOfferLetters()
      if (response.status === 200) {


        openNotification(
          "success",
          "Successful",
          response.message
        );
        formik.resetForm()

      } else if (response.status === 500) {
        openNotification("error", "input field is empty..", response.message);
      }
    } catch (error) {
      console.log(error)
    }

  }

  const formik = useFormik({
    initialValues: {
      jobId: "",
      resumeId: "",
      notes: "",
      createdBy: ""
    },
    onSubmit: async (e) => {
      try {
        if (!selectedNoteId) {
          const response = await saveRecruitmentJobResumesNote({
            jobId: jobId,
            resumeId: resumeId,
            notes: e.notes,
            createdBy: userid,
          })
          console.log(response)
          getnotes()
        } else {
          const response = await updateRecruitmentJobResumesNote({
            id: selectedNoteId,
            jobId: jobId,
            resumeId: resumeId,
            notes: e.notes,
            isPinned: isPinned,
            modifiedBy: userid
          })
          console.log(response)
          getnotes()
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  const getnotes = async () => {
    try {
      const response = await getAllRecruitmentJobResumesNotes({ resumeId: resumeId })
      console.log(response)
      setnotes(response.result)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getnotes()
    console.log(notes)

  }, [resumeId])

  const getnotesbyId = async (jobResumeNoteId) => {
    try {
      const response = await getRecruitmentJobResumesNoteById({ id: jobResumeNoteId })
      console.log(response);
      formik.setFieldValue('notes', response.result[0].notes)
    } catch (error) {
      console.log(error)
    }

  }
  const getLetterTemplate = async () => {
    try {
      const response = await getAllRecruitmentLetterTemplates()
      console.log(response)
      setLetterTemplate(response.result.map((each) => ({
        label: each.letterTemplateName,
        value: each.letterTemplateId,
      })))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getLetterTemplate()
  }, [])
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
   
      getletteTemplateByid(LetterTemplateId);
      console.log(content);
    
  }, [LetterTemplateId]);

  const getOfferLetters = async()=>{
    try{
      const response = await getAllRecruitmentJobResumesOfferLetters({
        jobId:jobId,
        resumeId:resumeId

      })
      console.log(response)
      setOfferLetters(response.result)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getOfferLetters()
  },[jobId])


  const options = [
    {
      id: 1,
      label: 'opt 1',
      value: '',
    },
    {
      id: 2,
      label: 'opt2',
      value: '',
    },
    {
      id: 3,
      label: 'opt3',
      value: '',
    },
  ];

  const menu = (
    <Menu >
      {LetterTemplate.map(option => (
        <Menu.Item key={option.value} onClick={({ key }) => setLetterTemplateId(key)}>
          {option.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper border !p-4">
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Offer Letter</h6>
              <div
                className="flex items-center justify-end gap-2.5 p-1.5  rounded-lg"
              // style={{ backgroundColor: `${primaryColor}10` }}
              >
                {/* <ButtonClick buttonName="Reject" icon={<FiAlertOctagon size={16} className="text-white bg-red-700 rounded-full" />} />
                <ButtonClick buttonName="Accept" icon={<PiChecks size={16} className="text-green " />} /> */}
                <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                  <Button className="flex items-center gap-2 ml-auto">
                    <div className="text-primary text-xs font-bold">Choose Template</div>
                    <IoIosArrowDown className="text-primary transition-all bg-transparent border-none outline-none 2xl:text-2xl" />
                  </Button>
                </Dropdown>
              </div>
            </div>

            <div>
              <div className="pt-4">
              <TextEditor
  initialValue={content}
  onChange={handleEditorChange}
  changetoHtml={(e)=>{
    setstateHTML(e)
  }}
  minheight="250px"
/>
              </div>
              {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {/* <p className="font-bold">Uploaded Files:</p> */}
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center p-4 text-black border border-black rounded-lg border-opacity-20 dark:border-white dark:text-white">
                  {getFileIcon(file.type)}
                  <p><span>{file.name}</span>   <span className="text-black text-opacity-50">{formatSize(file.size)}</span></p>
                  <button
                    className="ml-2 text-black text-opacity-40 hover:text-red-500"
                    onClick={() => removeFile(index)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ))}
            </div>
          )}
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
                  <ButtonClick buttonName="Send now" BtnType="primary" handleSubmit={handlesubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
        {offerLetters && offerLetters.map((Letter, index) => (
  <div className="relative flex pb-6" key={index}>
    <div className="flex items-center justify-between w-full">
      <p className="pblack flex-grow pl-4 !font-normal">
      <img src={Pdf} alt="PDF" />
      </p>
      <div className="flex items-center gap-6"> {/* Added gap between createdOn and icons */}
        <p className="para !font-normal">{Letter.createdOn}</p>
        <div className="flex items-center gap-3">
        {/* <TiPin
                  onClick={() => handlePinClick(note.jobResumeNoteId)}
                  style={{ color: selectedNoteId === note.jobResumeNoteId && isPinned === 1 ? 'blue' : 'gray' }}
                />  */}
          <Button onClick={() => handleViewResume(Letter.offerLetterPdf)}  > View Offer Letter</Button>
        </div>
      </div>
    </div>
  </div>
))}
</div>
      </div>

      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <div className="flex justify-between items-center">
            <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={9} />
            <div className="flex text-xs gap-1 font-bold text-primary translate-y-[-8px]">
              <PiPushPinSlashBold />
              Unpin
            </div>
          </div>
          <TextEditor
            initialValue={formik.values.notes}
            placeholder={"Type here....."}
            onChange={(e) => {
              formik.setFieldValue('notes', e)
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

export default Offers;
