/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { RiImage2Fill, RiStickyNoteLine } from "react-icons/ri";
import FormInput from "../../common/FormInput";
import DateSelect from "../../common/DateSelect";
import TimeSelect from "../../common/TimeSelect";
import Dropdown from "../../common/Dropdown";
// Sample Data
import { duration, eventType } from "../../common/DataArrays";
import TextArea from "../../common/TextArea";
import MultiSelect from "../../common/MultiSelect";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import {
  getRecruitmentJobResumesNoteById,
  updateRecruitmentJobResumesNote,
  getAllRecruitmentJobResumesNotes,
  saveRecruitmentJobResumesNote,
  getAllRecruitmentJobResumesEvents,
  saveRecruitmentJobResumesEvent,
  getAllRecruitmentUsers,
} from "../../Api1";
import { useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { notification } from "antd";
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
const Events = () => {
  const [content, setContent] = useState("");

  const { state } = useLocation();

  const [showAddEventSection, setShowAddEventSection] = useState(false);

  const primaryColor = localStorage.getItem("mainColor");

  const { resumeId } = useParams();

  const [eventList, seteventList] = useState([]);

  const [jobId, setJobId] = useState(null);

  const [notes, setnotes] = useState("");

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

  const handleCreateEventClick = () => {
    setShowAddEventSection(true);
  };

  const onTabChange = (tabId) => {
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };

  const getEvents = async () => {
    try {
      const response = await getAllRecruitmentJobResumesEvents({
        resumeId: resumeId,
      });
      seteventList(response.result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

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

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        {/* {eventList.length == 0 ? <CreateEventSection /> : <Eventlist />} */}

        {eventList.length === 0 ? (
          showAddEventSection ? (
            <FormSection onCancel={() => setShowAddEventSection(false)} />
          ) : (
            <CreateEventSection onCreateEventClick={handleCreateEventClick} />
          )
        ) : showAddEventSection ? (
          <FormSection onCancel={() => setShowAddEventSection(false)} />
        ) : (
          <Eventlist
            onCreateEventClick={handleCreateEventClick}
            primaryColor={primaryColor}
          />
        )}
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

// CREATE EVENT SECTION
const CreateEventSection = ({ onCreateEventClick }) => {
  return (
    <div className="h-full gap-4 vhcenter box-wrapper borderb">
      <div className="flex flex-col items-center gap-4">
        <div className=" size-11 bg-[#F9FAFB] dark:bg-secondaryDark rounded-full vhcenter">
          <RiImage2Fill
            size={25}
            className="text-black text-opacity-50 dark:text-white"
          />
        </div>
        <h6 className="h6"> You don't have any events now</h6>
        <p className="para">
          You can schedule meeting at any moment you want, Click at Create Event
          meeting to set one.
        </p>
        <ButtonClick
          buttonName="Create Event"
          BtnType="primary"
          handleSubmit={onCreateEventClick}
        />
      </div>
    </div>
  );
};

// EVENT LIST SECTION
const Eventlist = ({ onCreateEventClick, primaryColor }) => {
  const { resumeId } = useParams();
  const [eventList, seteventList] = useState([]);

  const getEvents = async () => {
    try {
      const response = await getAllRecruitmentJobResumesEvents({
        resumeId: resumeId,
      });

      console.log(response);
      seteventList(
        response.result.map((item) => ({
          id: item.jobResumeEventId,
          eventName: item.eventName,
          date: new Date(item.eventDateTime).toLocaleDateString(),
          time: new Date(item.eventDateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          duration: item.eventDetails.duration,
          type: item.eventDetails.eventType,
          url: item.eventDetails.eventUrl,
          note: "", // You can add your own logic to populate this field
          attendees: item.attendees.map((attendee) => ({
            name: attendee.userName,
            img: attendee.userImage,
          })),
        }))
      );
    } catch (errro) {
      console.log(errro);
    }
  };
  useEffect(() => {
    getEvents();
    console.log(eventList);
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
      <div
        className="flex items-center gap-2.5 p-1.5 rounded-lg"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <ButtonClick
          buttonName="Create New Event"
          BtnType="primary"
          handleSubmit={onCreateEventClick}
        />
      </div>

      {eventList.map((event, index) => (
        <div
          className="flex flex-col gap-3 p-4 bg-white rounded-lg borderb dark:bg-transparent"
          key={index}
        >
          <div className="flex items-center justify-between">
            <h6 className="h6">{event.eventName}</h6>
            <a
              onClick={(e) => e.preventDefault()}
              className="p-1 border border-transparent rounded cursor-pointer text-primary hover:border-primary"
            >
              <PiDotsThreeOutlineFill className="text-xl" />
            </a>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-1 para">Date: {event.date}</p>
            <p className="col-span-1 para">Time: {event.time}</p>
            <p className="col-span-1 para">Duration: {event.duration}</p>
          </div>
          <p className="pblack !font-normal">{event.note}</p>
          <div className="divider-h" />
          <div className="flex items-center gap-3">
            <p className="para">Attendees: </p>
            <div className="flex items-center gap-3">
              {event.attendees.map((attendee, attendeeIndex) => (
                <div className="relative" key={attendeeIndex}>
                  {/* Render attendee image here */}
                  <img
                    src={attendee.img || "https://via.placeholder.com/60x60"}
                    alt={attendee.name}
                    className="rounded-full size-9"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// EVENT FORM SECTION
const FormSection = ({ onCancel }) => {
  const [EventDropValue, setEventDropValue] = useState("online");
  const [durationValue, setDurationValue] = useState("15min");
  const primaryColor = localStorage.getItem("mainColor");
  const [jobId, setJobId] = useState(null);
  const { state } = useLocation();
  const { resumeId } = useParams();
  const [selectedvalue, setselectedvalue] = useState("");
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
  const formik = useFormik({
    initialValues: {
      jobId: "",
      resumeId: "",
      eventName: "",
      eventDetails: {
        eventType: "",
        eventDate: "",
        eventTime: "",
        duration: "",
        eventUrl: "",
        notes: "",
      },
      attendees: [],

      createdBy: "",
    },
    onSubmit: async (e) => {
      try {
        const response = await saveRecruitmentJobResumesEvent({
          jobId: jobId,
          resumeId: resumeId,
          eventName: e.eventName,
          eventDetails: {
            eventType: e.eventType,
            eventDate: e.eventDate,
            eventTime: e.eventTime,
            duration: e.duration,
            eventUrl: e.eventUrl,
            notes: e.notes,
          },
          attendees: selectedvalue,
          createdBy: null,
        });
        console.log(response);
        if (response.status == 200) {
          openNotification("success", "Successful", response.message);
          formik.resetForm();
        } else if (response.status === 500) {
          openNotification("error", response.message);
        }
      } catch (error) {}
    },
  });
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleAddUser = (userId) => {
    if (!selectedUserIds.includes(userId)) {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
    setselectedvalue(userId); // Set selectedValue to the updated selectedUserIds array
  };
  console.log(selectedvalue);

  const [employee, setEmpoloyee] = useState([]);
  const employeeList = async () => {
    try {
      const response = await getAllRecruitmentUsers();
      setEmpoloyee(
        response.result.map((item) => ({
          label: item.userName,
          value: item.userId,
          Image: item.userImage,
          modifiedOn: item.modifiedOn,
          createdOn: item.createdOn,
          roleId: item.roleId,
        }))
      );
    } catch (error) {}
  };
  useEffect(() => {
    employeeList();
    console.log(employee);
  }, []);

  return (
    <div className="flex flex-col h-full gap-8 box-wrapper borderb">
      <h6 className="h6">Schedule Event</h6>
      <div className="w-4/5">
        <div className="flex flex-col gap-4">
          <FormInput
            title="Event Name"
            placeholder="Enter Event Name"
            value={formik.values.eventName}
            change={(e) => {
              formik.setFieldValue("eventName", e);
              console.log(e);
            }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            <DateSelect
              title="Date"
              className="w-full"
              value={formik.values.eventDate}
              change={(e) => {
                formik.setFieldValue("eventDate", e);
              }}
            />
            <TimeSelect
              title="Time"
              value={formik.values.eventTime}
              change={(e) => {
                formik.setFieldValue("eventTime", e);
              }}
            />
            <Dropdown
              title="Duration"
              options={duration}
              change={(e) => {
                formik.setFieldValue("duration", e);
              }}
              value={formik.values.duration}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Dropdown
              change={(e) => {
                formik.setFieldValue("eventType", e);
              }}
              value={formik.values.eventType}
              title="Event type"
              options={eventType}
              className="md:col-span-1"
            />
            {EventDropValue !== "offline" && (
              <div className="md:col-span-2">
                <FormInput
                  title="URL Link"
                  placeholder="Enter URL Link"
                  websiteLink={true}
                  value={formik.values.eventUrl}
                  change={(e) => {
                    formik.setFieldValue("eventUrl", e);
                  }}
                />
              </div>
            )}
          </div>
          <p className="para">
            This event will take place on the May 15, 2023 from 02:00 PM until
            5:45 PM
          </p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <MultiSelect
                  title="Attendees"
                  className=""
                  options={employee}
                  value={selectedvalue}
                  change={(e) => {
                    handleAddUser(e);
                  }}
                />
              </div>
            </div>
            {/* <div className="flex items-center gap-3 selectedAtendies">
            
            <div className="relative">
              <img
                src="https://via.placeholder.com/60x60"
                alt=""
                className="rounded-full size-12"
              />
              <div className="absolute top-0 right-0 text-white rounded-full cursor-pointer deleteImg size-4 vhcenter bg-slate-500 ring-2 ring-white">
                <RiCloseLine />
              </div>
            </div>
            <div className="relative">
              <img
                src="https://via.placeholder.com/60x60"
                alt=""
                className="rounded-full size-12"
              />
               <div className="absolute top-0 right-0 text-white rounded-full cursor-pointer deleteImg size-4 vhcenter bg-slate-500 ring-2 ring-white">
                <RiCloseLine />
              </div>
            </div>
            <div className="relative">
              <img
                src="https://via.placeholder.com/60x60"
                alt=""
                className="rounded-full size-12"
              />
              <div className="absolute top-0 right-0 text-white rounded-full cursor-pointer deleteImg size-4 vhcenter bg-slate-500 ring-2 ring-white">
                <RiCloseLine />
              </div>
            </div>
            <div className="relative">
              <img
                src="https://via.placeholder.com/60x60"
                alt=""
                className="rounded-full size-12"
              />
              <div className="absolute top-0 right-0 text-white rounded-full cursor-pointer deleteImg size-4 vhcenter bg-slate-500 ring-2 ring-white">
                <RiCloseLine />
              </div>
            </div>
          </div> */}
          </div>

          <TextArea
            title="Note"
            placeholder="Add note..."
            value={formik.values.notes}
            change={(e) => {
              formik.setFieldValue("notes", e);
            }}
          />
        </div>
      </div>

      <div
        className="flex items-center justify-end gap-2.5 p-1.5 rounded-lg"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <ButtonClick buttonName="Cancel" handleSubmit={onCancel} />
        <ButtonClick
          buttonName="Send Invitation"
          BtnType="primary"
          handleSubmit={formik.handleSubmit}
        />
      </div>
      {contextHolder}
    </div>
  );
};

export default Events;
