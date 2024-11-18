/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TextEditor from "../../common/TextEditor/TextEditor";
import { Button, Dropdown, Menu } from "antd";
import ButtonClick from "../../common/Button";
import TabsNew from "../../common/TabsNew";
import { RiHome6Line, RiImage2Fill } from "react-icons/ri";
import { useFormik } from "formik";
import { useParams, useLocation } from "react-router-dom";
import {
  getAllRecruitmentQuestionnaireTemplates,
  updateRecruitmentJobResumesNote,
  getRecruitmentJobResumesNoteById,
  getRecruitmentQuestionnaireTemplateById,
  getRecruitmentJobById,
  getAllRecruitmentJobResumesNotes,
  saveRecruitmentJobResumesNote,
} from "../../Api1";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Questionaries = ({ QuestionareId, stageId }) => {
  const primaryColor = localStorage.getItem("mainColor");

  const onTabChange = (tabId) => {
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };

  const { resumeId } = useParams();

  const [jobId, setJobId] = useState(null);

  const { state } = useLocation();

  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [isPinned, setIsPinned] = useState(0);

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
    //   // content: <ActivityFeed />,
    //   icon: <BsFileEarmarkRichtext className="text-base" />,
    // },
  ];

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
  }, [resumeId]);

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

  const [questionareId, setquestionareId] = useState("");

  const [questionnaireData, setquestionnaireData] = useState([]);

  const getJodbyId = async () => {
    const response = await getRecruitmentJobById({ id: jobId });
    setquestionareId(response.result[0].questionnaireTemplateId);
  };

  useEffect(() => {
    if (jobId !== "null") {
      getJodbyId();
    }
  }, [jobId]);

  const [Allqestionare, setAllqestionare] = useState([]);

  const getAllQesutionare = async () => {
    try {
      const response = await getAllRecruitmentQuestionnaireTemplates({});
      setAllqestionare(
        response.result.map((each) => ({
          label: each.questionnaireTemplateName,
          values: each.questionnaireTemplateId,
        }))
      );
    } catch (error) {}
  };

  useEffect(() => {
    getAllQesutionare();
  }, []);

  const getQuestionare = async () => {
    try {
      const response = await getRecruitmentQuestionnaireTemplateById({
        id: parseInt(questionareId || QuestionareId),
      });
      setquestionnaireData(response.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (questionareId) {
      getQuestionare();
    }
  }, [questionareId || QuestionareId || stageId]);

  useEffect(() => {
    setquestionnaireData([]);
  }, [questionareId === "" || QuestionareId === "" || stageId === ""]);

  const menu = (
    <Menu>
      {Allqestionare.map((option) => (
        <Menu.Item
          key={option.values}
          onClick={({ key }) => setquestionareId(key)}
        >
          {option.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex flex-col gap-4 box-wrapper rounded-[10px] dark:border dark:border-secondaryWhite border dark:border-opacity-10">
          <div className="flex flex-col gap-4 divide-y">
            <div className="flex items-center justify-between">
              <h6 className="h6">Questionnaire </h6>
              <div
                className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
                // style={{ backgroundColor: `${primaryColor}10` }}
              >
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomCenter"
                >
                  <Button className="flex items-center gap-2 ml-auto">
                    <div className="text-primary text-xs font-bold">
                      Choose Questionaire
                    </div>
                    <IoIosArrowDown className="text-primary transition-all bg-transparent border-none outline-none 2xl:text-2xl" />
                  </Button>
                </Dropdown>
              </div>
            </div>

            <div className="pt-2">
              {questionnaireData && questionnaireData.length > 0 ? (
                questionnaireData.map((questionnaire, index) => (
                  <div key={index} className="mt-5">
                    <p className="text-gray-700 dark:text-white font-Inter font-weight:500">
                      <strong>{`Q${index + 1}. ${
                        questionnaire.questionnaireTemplateName
                      }`}</strong>
                    </p>
                    {questionnaire.questionaireTemplateDetailData &&
                      questionnaire.questionaireTemplateDetailData.map(
                        (question, idx) => (
                          <div key={idx} className="mt-3">
                            <p className="text-gray-700 dark:text-white font-Inter font-weight:500">
                              <strong>{`Q${question.questionnaireTemplateDetailsId}. ${question.question}`}</strong>
                            </p>
                            <p className="text-gray-700 dark:text-white font-Inter font-weight:500 pt-1">
                              <strong>Ans.</strong>{" "}
                              {question.answerMetaData[0]?.value || ""}
                            </p>
                          </div>
                        )
                      )}
                  </div>
                ))
              ) : (
                <div className="h-full gap-4 vhcenter box-wrapper borderb">
                  <div className="flex flex-col items-center gap-4">
                    <div className="size-11 bg-[#F9FAFB] dark:bg-secondaryDark rounded-full vhcenter">
                      <RiImage2Fill
                        size={60}
                        className="text-black text-opacity-50 dark:text-white"
                      />
                    </div>
                    <h6 className="h6">No questionnaire data available</h6>
                    <p className="para">
                      There is currently no questionnaire data to display.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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

export default Questionaries;
