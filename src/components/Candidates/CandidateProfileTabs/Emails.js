import React, { useState, useEffect } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { Link, useParams, useLocation } from "react-router-dom";
import { RiAttachment2, RiDeleteBin6Line, RiStickyNoteLine } from "react-icons/ri";
import {
  BsFileEarmarkRichtext,
  BsFileImage,
  BsFileWord,
  BsFiletypePdf,
} from "react-icons/bs";
import { Formik, useFormik } from "formik";
import { saveRecruitmentJobResumesEmailCommunication, getAllRecruitmentJobResumesEmailCommunications } from "../../Api1";
import { notification } from 'antd';
import { getRecruitmentJobResumesNoteById, updateRecruitmentJobResumesNote, getAllRecruitmentJobResumesNotes, saveRecruitmentJobResumesNote } from "../../Api1";
import { FaRegEdit } from "react-icons/fa";
import { PiBracketsCurly, PiPushPinSlashBold } from "react-icons/pi";
import Dropdown from "../../common/Dropdown";


const tabData = [
  {
    id: 9,
    title: "Notes",
    value: "notes",
    // content: <Overview />,
    icon: <RiStickyNoteLine className="text-base" />,
  },
  // {
  //   id: 10,
  //   title: "Documents",
  //   value: "documents",
  //   // content: <ActivityFeed />,
  //   icon: <BsFileEarmarkRichtext className="text-base" />,
  // },
];
const Emails = ({ Email }) => {
  const [content, setContent] = useState("");
  const { state } = useLocation();
  const [emailContent, setEmailContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const primaryColor = localStorage.getItem("mainColor");
  const [jobId, setJobId] = useState(null)
  const { resumeId } = useParams()
  const [emailSentDate, setEmailSentDate] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isPinned, setIsPinned] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      // stack: 2,
      style: {
        background: `${type === "success"
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
  const handleEditClick = (jobResumeNoteId) => {
    setSelectedNoteId(jobResumeNoteId);
    getnotesbyId(jobResumeNoteId)
    // You can perform any additional actions here, such as opening a modal or navigating to another page.
  }; // State to store candi
  const handleEditorChange = (content) => {
    setContent(content);
  };
  const handleEditorChange2 = (emailContent) => {
    setEmailContent(emailContent);
  };
  console.log(Email)
  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
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

  // File Uploader JS
  const handleFileChange = (event) => {
    const files = event.target.files;
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const formik = useFormik({
    initialValues: {
      jobId: "",
      resumeId: "",
      emailContent: {
        subject: "",
        body: "",
      },
      emailSentDate: "",
      emailSentId: "",
      emailSentFrom: "",
      emailSentStatus: "",
      createdBy: "",

    },
    onSubmit: async (e, { resetForm }) => {
      try {
        const currentDate = new Date().toISOString();
        setEmailSentDate(currentDate);

        const response = await saveRecruitmentJobResumesEmailCommunication({
          jobId: jobId,
          resumeId: resumeId,
          emailContent: {
            subject: e.subject,
            body: e.body,
          },
          emailSentDate: currentDate,
          emailSentId: Email,
          emailSentFrom: "ekbwekj@gmail.com",

          createdBy: null
        })
        console.log(response)
        if (response.status === 200) {
          openNotification(
            "success",
            "Successful",
            response.message
          );
          resetForm();

        } else if (response.status === 500) {
          openNotification("error", "input field is empty..", response.message);
        }
      } catch (error) {

      }

    }


  })
  const [allEmail, setAllemail] = useState([])
  const getEmailCommunication = async () => {
    try {
      const response = await getAllRecruitmentJobResumesEmailCommunications({ resumeId })
      console.log(response)
      setAllemail(response.result)
    } catch (error) {

    }
  }
  useEffect(() => {
    getEmailCommunication()
    console.log(allEmail)
  }, [])

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


  const [notes, setnotes] = useState("")


  const formik1 = useFormik({
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
            createdBy: null,
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
            modifiedBy: null
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
      formik1.setFieldValue('notes', response.result[0].notes)
    } catch (error) {
      console.log(error)
    }

  }
  const dropdown1 = [
    {
      id: 1,
      label: "[candidate]",
      value: "candidate",
    },
    {
      id: 2,
      label: "[candidate_first_name]",
      value: "candidate_first_name",
    },
    {
      id: 3,
      label: "[company]",
      value: "company",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper rounded-[10px] dark:border dark:border-secondaryWhite border dark:border-opacity-10">
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Email</h6>
              {/* <ButtonClick iconAdd={true} buttonName="Add Cover Note" /> */}
            </div>
            <div className="flex items-center gap-2 pt-4">
              <p>Subject:</p>
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none"

                onChange={(e) => {
                  formik.setFieldValue("subject", e.target.value);
                }}
              />
            </div>
            <div className="pt-4">
              <TextEditor
                placeholder="Start typing your email"
                initialValue={formik.values.emailContent.body} // Corrected
                onChange={(e) => {
                  formik.setFieldValue("body", e); // Corrected
                }}
                minheight="300px"
                className="border-none"
                height="250px"
              />
              <Dropdown options={dropdown1} value="Placeholder" placeholder="Placeholder" icon={<PiBracketsCurly />} icondropDown={<PiBracketsCurly />}/>
            </div>
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
            className="flex items-center justify-between gap-2.5 p-1.5  rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <label className="p-2 cursor-pointer flex items-center gap-2">
              <RiAttachment2 size={18} className="text-primary" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept=".doc, .docx, .pdf, .jpg, .jpeg, .png" // Specify the allowed file types
              />
              Add Attachment
            </label>
            <div className="flex items-center gap-2.5">
              <ButtonClick buttonName="Cancel" />
              <ButtonClick handleSubmit={formik.handleSubmit} buttonName="Send Now" BtnType="primary" />
            </div>
          </div>
        </div>
        {allEmail.map((email, index) => (
          <div className="flex flex-col gap-4 divide-y box-wrapper"
            key={index}>
            <h6 className="h6">Previously Sent Email</h6>
            {/* <div className="v-divider h-[2px]" /> */}
            <div className="flex flex-col gap-4 pt-4 prevemail">
              <div className="flex items-center gap-2.5">
                <div className="size-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-full">
                  <p className="para">SN</p>
                </div>
                <div className="inline-flex flex-col items-start justify-start gap-1">
                  <p className="text-xs font-semibold leading-tight text-black dark:text-white ">

                  </p>
                  <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
                    {email.emailSentDate}
                  </p>
                </div>
              </div>
              <div className="v-divider" />
              <div className="space-y-3 pblack !font-normal">
                <div className="subject !font-semibold">
                  <p> Subject: {email.emailContent.subject}</p>
                </div>
                <p>{email.emailContent.body}</p>
                {/* <p>Dear Haseeb, </p>

              <p>
                We're sorry to inform you that your application for Web Designer
                with Oryx Digital wos unsuccessful.
              </p>

              <p>
                I would like to take this opportunity to thank you for your
                interest in the role. Being unsuccessful at this stage is most
                likely due to other applicants demonstrating more relevant
                experience on their CV.
              </p>

              <p>
                Please do not hesitate to apply again in the future for other
                positions. We will add your details to our talent pool and
                should a role matching your skills and experience arise in the
                future. we will be in touch.
              </p>

              <p>
                We'd like to Wish you the best Of luck With your future search
                'Or employment,
              </p>

              <p>
                <span>Best regards.</span>
                <br />
                <span>Sharekh Nair</span>
                <br />
                <span>Oryx Digital</span>
              </p> */}
              </div>
            </div>
            {/* <div className="flex flex-col gap-4 pt-4 prevemail">
            <div className="flex items-center gap-2.5">
              <div className="size-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-full">
                <p className="para">SN</p>
              </div>
              <div className="inline-flex flex-col items-start justify-start gap-1">
                <p className="text-xs font-semibold leading-tight text-black dark:text-white ">
                  You sent an email to Haseeb
                </p>
                <p className="text-xs font-normal leading-none text-black opacity-50 dark:text-white">
                  Jan 26 - 11:34
                </p>
              </div>
            </div>
            <div className="v-divider" />
            <div className="space-y-3 pblack !font-normal">
              <div className="subject !font-semibold">
                <p> Subject: haseeb, regarding your Web Designer application</p>
              </div>
              <p>Dear Haseeb, </p>

              <p>
                We're sorry to inform you that your application for Web Designer
                with Oryx Digital wos unsuccessful.
              </p>

              <p>
                I would like to take this opportunity to thank you for your
                interest in the role. Being unsuccessful at this stage is most
                likely due to other applicants demonstrating more relevant
                experience on their CV.
              </p>

              <p>
                Please do not hesitate to apply again in the future for other
                positions. We will add your details to our talent pool and
                should a role matching your skills and experience arise in the
                future. we will be in touch.
              </p>

              <p>
                We'd like to Wish you the best Of luck With your future search
                'Or employment,
              </p>

              <p>
                <span>Best regards.</span>
                <br />
                <span>Sharekh Nair</span>
                <br />
                <span>Oryx Digital</span>
              </p>
            </div>
          </div> */}
          </div>
        ))}

      </div>

      {/* RIGHT COLUMN  */}
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <div className="flex justify-between items-center">
            <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={9} />
            {/* <div className="flex text-xs gap-1 font-bold text-primary translate-y-[-8px]">
              <PiPushPinSlashBold />
              Unpin
            </div> */}
          </div>
          <TextEditor
            initialValue={formik1.values.notes}
            placeholder={"Type here....."}
            onChange={(e) => {
              formik1.setFieldValue('notes', e)
            }}
            minheight="250px"
          />
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Save" BtnType="primary" handleSubmit={formik1.handleSubmit} />
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

export default Emails;
