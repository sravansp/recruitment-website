import React, { useState, useEffect } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { IoMdAdd } from "react-icons/io";
import { getRecruitmentResumeById, getRecruitmentJobResumesNoteById, updateRecruitmentJobResumesNote, getAllRecruitmentJobResumesNotes, saveRecruitmentJobResumesNote } from "../../Api1";
import {
  RiArrowDownLine,
  RiFileList3Line,
  RiStickyNoteLine,
} from "react-icons/ri";
import PDFViewer from "../../common/PDFViewer";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import pdfFile from "../../../assets/documents/sample.pdf";
import { Formik, useFormik } from "formik";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { PiPushPinSlashBold } from "react-icons/pi";

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
const QA = [
  {
    id: 1,
    question: "Do you prefer an in-office setup or Remote?*",
    answer: "Remote",
  },
  {
    id: 2,
    question: "Are you legally eligible to work in the country?",
    answer: "Yes, I’ve resident visa",
  },
  {
    id: 3,
    question: "Do you prefer an in-office setup or Remote?",
    answer: "Remote",
  },
];
const CVResume = ({ showTextEditor, pdfUrl }) => {
  const [content, setContent] = useState("");
  const primaryColor = localStorage.getItem("mainColor");
  const { resumeId } = useParams()
  const [jobId, setJobId] = useState(null)
  const { state } = useLocation();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isPinned, setIsPinned] = useState(0);
  const [PdFViewer, setPdFViewer] = useState("");
  useEffect(() => {
    if (pdfUrl) {
      setPdFViewer(pdfUrl);
    }
  }, [pdfUrl]);

  console.log(PdFViewer, "PdFViewer data")

  const handleEditClick = (jobResumeNoteId) => {
    setSelectedNoteId(jobResumeNoteId);
    getnotesbyId(jobResumeNoteId)
    // You can perform any additional actions here, such as opening a modal or navigating to another page.
  }; //
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
  const handleEditorChange = (content) => {
    setContent(content);
  };

  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };


  const [notes, setnotes] = useState("")



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
      formik.setFieldValue('notes', response.result[0].notes)
    } catch (error) {
      console.log(error)
    }

  }

  const getCandidatesById = async () => {
    try {
      const response = await getRecruitmentResumeById(resumeId);


      setPdFViewer(response.result[0].resumeFile)


      console.log(response.result)
      console.log(PdFViewer)

    } catch (error) {
      console.error('Error updating workflow ID:', error);
    }
  };
  useEffect(() => {
    getCandidatesById()
  }, [])
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper">
          <div className="flex items-center justify-between">
            <h6 className="h6 !text-black dark:!text-white">CV / Resume</h6>
            {/* <ButtonClick buttonName="Add Cover Note" icon={<IoMdAdd />} /> */}
          </div>
          {PdFViewer &&
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 iconI vhcenter bg-[#F5F5F5] dark:bg-secondaryDark text-base rounded-lg ">
                  <div className="text-black opacity-50 ">
                    {<RiFileList3Line />}
                  </div>
                </div>
                <p className="text-xs font-semibold leading-tight text-black dark:text-white">
                  Pdfname.pdf
                </p>
              </div>
              {/* <ButtonClick
                buttonName="Download"
                BtnType="primary"
                icon={<RiArrowDownLine />}
              /> */}
            </div>
          }
          {PdFViewer &&
            <div className="divider-h" />
          }
          {PdFViewer &&
            <PDFViewer pdfUrl={PdFViewer} />
          }
          {!PdFViewer &&
            <div className="flex items-center pt-5">No Resume found</div>
          }
        </div>
        {/* 
        <div className="flex flex-col gap-5 divide-y box-wrapper">
          <div className="flex items-center justify-between">
            <h6 className="h6">Question</h6>
            <ButtonClick iconAdd={true} buttonName="Add Cover Note" />
          </div>
          <div className="inline-flex flex-col items-start justify-start pt-4 gap-7">
            {QA?.map((qans) => (
              <div className="flex flex-col gap-3" key={qans.id}>
                <div className="flex">
                  <div className="w-12 ">
                    <span className="pblack">Q{qans.id}.</span>
                  </div>
                  <div>
                    <span className="pblack !text-opacity-80">
                      {qans.question}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 ">
                    <p className="pblack">Ans.</p>
                  </div>
                  <p className="pblack !text-opacity-80">{qans.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* RIGHT COLUMN  */}
      <div className="lg:col-span-4">
        {showTextEditor ? (
          <><div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
            <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={9} />

            <TextEditor
              initialValue={formik.values.notes}
              onChange={(e) => {
                formik.setFieldValue('notes', e);
              }}
              minheight="250px" />

            <div
              className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <ButtonClick buttonName="Cancel" />
              <ButtonClick buttonName="Save" BtnType="primary" handleSubmit={formik.handleSubmit} />
            </div>
          </div><div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
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
            </div></>
        ) : null}
      </div>
    </div>
  );
};

export default CVResume;
