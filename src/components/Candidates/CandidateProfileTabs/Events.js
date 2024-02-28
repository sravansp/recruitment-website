import React, { useState } from "react";
import TabsNew from "../../common/TabsNew";
import TextEditor from "../../common/TextEditor/TextEditor";
import ButtonClick from "../../common/Button";
import { RiCloseLine, RiImage2Fill, RiStickyNoteLine } from "react-icons/ri";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import FormInput from "../../common/FormInput";
import DateSelect from "../../common/DateSelect";
import TimeSelect from "../../common/TimeSelect";
import Dropdown from "../../common/Dropdown";
// Sample Data
import { duration, eventType, eventList } from "../../common/DataArrays";
import TextArea from "../../common/TextArea";
import MultiSelect from "../../common/MultiSelect";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const tabData = [
  {
    id: 9,
    title: "Notes",
    value: "notes",
    // content: <Overview />,
    icon: <RiStickyNoteLine className="text-base" />,
  },
  {
    id: 10,
    title: "Documents",
    value: "documents",
    // content: <ActivityFeed />,
    icon: <BsFileEarmarkRichtext className="text-base" />,
  },
];
const Events = () => {
  const [content, setContent] = useState("");
  const [showAddEventSection, setShowAddEventSection] = useState(false); // New state to manage the visibility of AddEventSection
  const primaryColor = localStorage.getItem("mainColor");

  const handleEditorChange = (content) => {
    setContent(content);
  };
  const handleCreateEventClick = () => {
    setShowAddEventSection(true);
  };

  const onTabChange = (tabId) => {
    // Do something when the tab changes if needed
    console.log(`Tab changed to ${tabId}`);
    if (tabId === 1) {
    } else if (tabId === 2) {
    }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN  */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        {/* {eventList.length == 0 ? <CreateEventSection /> : <Eventlist />} */}

        {eventList.length === 0 ? (
          showAddEventSection ? (
            <AddEventSection onCancel={() => setShowAddEventSection(false)} />
          ) : (
            <CreateEventSection onCreateEventClick={handleCreateEventClick} />
          )
        ) : (
          <Eventlist onCreateEventClick={handleCreateEventClick}/>
        )}
      </div>

      {/* RIGHT COLUMN  */}
      <div className="lg:col-span-4">
        <div className="rounded-lg bg-white dark:bg-secondaryDark p-1.5 ">
          <TabsNew tabs={tabData} onTabChange={onTabChange} initialTab={1} />
          <TextEditor
            initialValue={content}
            onChange={handleEditorChange}
            minheight="250px"
          />
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-4 rounded-lg"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Cancel" />
            <ButtonClick buttonName="Save" BtnType="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateEventSection = ({ onCreateEventClick }) => {
  return (
    <div className="h-full gap-4 vhcenter box-wrapper borderb">
      <div className="flex flex-col items-center gap-4">
        <div className=" size-11 bg-[#F9FAFB] dark:bg-secondaryDark rounded-full vhcenter">
          <RiImage2Fill className="text-black text-opacity-50 dark:text-white" />
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
const Eventlist = ({onCreateEventClick}) => {
  return (
    <div className="flex flex-col h-full gap-4">
      <ButtonClick
          buttonName="Create Event"
          BtnType="primary"
          handleSubmit={onCreateEventClick}
        />
      {eventList.map((events, i) => (
        <div className="flex flex-col gap-3 p-4 rounded-lg borderb" key={i}>
          <div className="flex items-center justify-between">
            <h6 className="h6">{events.eventName}</h6>
            <a
              onClick={(e) => e.preventDefault()}
              className="p-1 border border-transparent rounded cursor-pointer text-primary hover:border-primary"
            >
              <PiDotsThreeOutlineFill className="text-xl" />
            </a>
          </div>
          <div className="grid grid-cols-6">
            <p className="col-span-1 para">Date: {events.date}</p>
            <p className="col-span-1 para">Time: {events.time}</p>
            <p className="col-span-1 para">Duration: {events.duration}</p>
          </div>
          <p className="pblack">{events.note}</p>
          <div className="divider-h" />
          <div className="flex items-center gap-3">
            <p className="para">Attendies: </p>
            <div className="flex items-center gap-3">
              {events.attendies.map((atd, i) => (
                <div className="relative" key={i}>
                  <img
                    src="https://via.placeholder.com/60x60"
                    alt=""
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

const AddEventSection = ({ onCancel }) => {
  const [EventDropValue, setEventDropValue] = useState("online");
  const [durationValue, setDurationValue] = useState("15min");
  const primaryColor = localStorage.getItem("mainColor");

  return (
    <div className="flex flex-col h-full gap-8 box-wrapper borderb">
      <h6 className="h6">Schedule Event</h6>
      <div className="flex flex-col gap-4">
        <FormInput title="Event Name" placeholder="Enter Event Name" />
        <div className="grid gap-4 md:grid-cols-3">
          <DateSelect title="Date" className="w-full" />
          <TimeSelect title="Time" />
          <Dropdown
            title="Duration"
            options={duration}
            change={(e) => {
              setDurationValue(e);
            }}
            value={durationValue}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Dropdown
            change={(e) => {
              setEventDropValue(e);
            }}
            value={EventDropValue}
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
              <MultiSelect title="Attendees" className="" />
            </div>
            <div className="flex items-end col-span-1">
              <ButtonClick buttonName="Add" />
            </div>
          </div>
          <div className="flex items-center gap-3 selectedAtendies">
            {/* Loop Attendies Here  */}
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
          </div>
        </div>
        <TextArea title="Note" placeholder="Add note..." />
      </div>

      <div
        className="flex items-center justify-end gap-2.5 p-1.5 rounded-lg"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <ButtonClick buttonName="Cancel" />
        <ButtonClick
          buttonName="Send Invitation"
          BtnType="primary"
          handleSubmit={onCancel}
        />
      </div>
    </div>
  );
};

export default Events;
