/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { useParams, useLocation } from "react-router-dom";
import {
  getRecruitmentJobResumesNoteById,
  updateRecruitmentJobResumesNote,
  saveRecruitmentJobResumesNote,
  getAllRecruitmentJobResumesNotes,
  getAllRecruitmentJobResumeActivities,
} from "../../Api1";
import { useFormik } from "formik";
import {
  RiArticleLine,
  RiCalendarLine,
  RiFileTransferLine,
  RiStickyNoteLine,
} from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

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
const ActivityFeed = () => {

  const primaryColor = localStorage.getItem("mainColor");

  const { resumeId } = useParams();

  const [candidateStatus, setcandidateStatus] = useState([]);

  const [jobId, setJobId] = useState(null);

  const { state } = useLocation();

  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [isPinned, setIsPinned] = useState(0);

  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleEditClick = (jobResumeNoteId) => {
    setSelectedNoteId(jobResumeNoteId);
    getnotesbyId(jobResumeNoteId);
  };
  
  useEffect(() => {
    if (state && state.jobID) {
      setJobId(state.jobID);
    } else {
      const storedJobId = localStorage.getItem("jobid");
      if (storedJobId) {
        setJobId(storedJobId);
      }
    }
  }, [state]);

  const getActivities = async () => {
    try {
      const response = await getAllRecruitmentJobResumeActivities(resumeId);
      setcandidateStatus(response.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const onTabChange = (tabId) => {
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };

  const [notes, setnotes] = useState("");

  const formik = useFormik({
    initialValues: {
      jobId: "",
      resumeId: "",
      notes: "",
      createdBy: "",
    },
    onSubmit: async (e) => {
      const result = e.notes.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");
      try {
        if (!selectedNoteId) {
          const response = await saveRecruitmentJobResumesNote({
            jobId: jobId,
            resumeId: resumeId,
            notes: result,
            createdBy: null,
          });
          getnotes();
          return response;
        } else {
          const response = await updateRecruitmentJobResumesNote({
            id: selectedNoteId,
            jobId: jobId,
            resumeId: resumeId,
            notes: result,
            isPinned: isPinned,
            modifiedBy: null,
          });
          getnotes();
          return response;
        }
      } catch (error) {
        return error;
      }
    },
  });

  const getnotes = async () => {
    try {
      const response = await getAllRecruitmentJobResumesNotes({
        resumeId: resumeId,
      });
      setnotes(response.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getnotes();
  }, []);

  const getnotesbyId = async (jobResumeNoteId) => {
    try {
      const response = await getRecruitmentJobResumesNoteById({
        id: jobResumeNoteId,
      });
      formik.setFieldValue("notes", response.result[0].notes);
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="box-wrapper">
          <div className="flex flex-col gap-6 ">
            <h6 className="h6">
              <span className="text-primary">Activity Feed</span>
            </h6>
            <div>
              {candidateStatus.map((status, i) => (
                <div className="relative flex pb-6" key={i}>
                  <div
                    className={`absolute inset-0  items-center justify-center h-full w-9 ${
                      i === candidateStatus.length - 1 ? `hidden` : `flex`
                    }`}
                  >
                    <div className="h-full w-px bg-[#F1F5F9] dark:bg-secondaryDark pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 size-8 2xl:size-9 rounded-full bg-[#F1F5F9] inline-flex items-center dark:bg-secondaryDark justify-center text-black dark:text-white text-opacity-50 relative z-10">
                    {status.scheduled === 1 ? (
                      <RiCalendarLine />
                    ) : status.previousStage === "" ? (
                      <RiArticleLine />
                    ) : (
                      <RiFileTransferLine />
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="pblack flex-grow pl-4 !font-normal">
                      <span
                        className="font-normal"
                        dangerouslySetInnerHTML={{
                          __html: status.description
                            .replace(
                              /<b>(.*?)<\/b>/g,
                              '<span class="bold">$1</span>'
                            ) // Make content within <b> tags bold
                            .replace(
                              /([^<b>]*)(<\/?b>)/g,
                              '<span class="grey">$1</span>$2'
                            ), // Make content outside <b> tags grey
                        }}
                      />
                      {status.scheduled === 1 ? (
                        <>
                          {/* <span className="!font-semibold">
                            {status.currentStage}
                          </span>
                          {" scheduled with "}
                          <span className="!font-semibold">{status.description}</span>
                          {" for "}
                          <span className="!font-semibold">
                            {status.InterviewDate}
                          </span>
                          {" at "}
                          <span className="!font-semibold">
                            {status.InterviewTime}
                          </span> */}
                        </>
                      ) : status.previousStage === "" ? (
                        // `${status.name} applied to ${status.position} at ${status.company}`
                        <>
                          {/* <span className="!font-semibold">{status.name}</span> */}
                          {/* {" applied to "}
                          <span className="!font-semibold">
                            {status.position}
                          </span>
                          {" at "}
                          <span className="!font-semibold">
                            {status.company}
                          </span> */}
                        </>
                      ) : (
                        // `${status.name} was moved from ${status.previousStage} to ${status.currentStage}`
                        <>
                          {/* <span className="!font-semibold">{status.name}</span>
                          {" was moved from "}
                          <span className="!font-semibold">
                            {status.previousStage}
                          </span>
                          {" to "}
                          <span className="!font-semibold">
                            {status.currentStage}
                          </span> */}
                        </>
                      )}
                    </p>
                    <p className="para !font-normal">{status.modifiedOn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
            initialValue={formik.values.notes}
            placeholder={"Type here....."}
            onChange={(e) => {
              formik.setFieldValue("notes", e);
            }}
            minheight="250px"
          />
          {/* <Editor
        name="description"
        onChange={(data) => {
          setData(data);
          formik.setFieldValue('notes', data)
        }}
        value={formik.values.notes}

        editorLoaded={editorLoaded}
      /> */}
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick
              buttonName="Save"
              BtnType="primary"
              handleSubmit={formik.handleSubmit}
            />
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          {notes &&
            notes.map((note, index) => (
              <div className="relative flex pb-6" key={index}>
                <div className="flex items-center justify-between w-full">
                  <p className="pblack flex-grow pl-4 !font-normal">
                    <strong>{note.notes}</strong>
                  </p>
                  <div className="flex items-center gap-6">
                    {" "}
                    {/* Added gap between createdOn and icons */}
                    <p className="para !font-normal">{note.createdOn}</p>
                    <div className="flex items-center gap-3">
                      {/* <TiPin
                  onClick={() => handlePinClick(note.jobResumeNoteId)}
                  style={{ color: selectedNoteId === note.jobResumeNoteId && isPinned === 1 ? 'blue' : 'gray' }}
                />  */}
                      <FaRegEdit
                        onClick={() => handleEditClick(note.jobResumeNoteId)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
