import Accordion from "../../common/Accordion";
import React from "react";

const userInfo = [
  {
    personal: [
      { label: "Email Address", value: "user@example.com" },
      { label: "Phone number", value: "+1234567890" },
      { label: "Salary Expectation", value: "$70,000" },
    ],
    other: [
      { label: "Location", value: "City, Country" },
      { label: "Work Type", value: "Full-time" },
    ],
  },
];

const Overview = () => {
  return (
    <div className="grid lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Accordion
          title="All Personal Informations"
          // description={t(
          //   "Automate_late_fine_for_employees_who_are_coming_late_to_work"
          // )}
          padding={true}
          className={" bg-white"}
          initialExpanded={true}
        >
          <div>
            {userInfo.map((user) => (
              <UserInfoComponent
                key={user.personal[0].value}
                personalInfo={user.personal}
              />
            ))}
          </div>
        </Accordion>
      </div>
      <div className="lg:col-span-4"></div>
    </div>
  );
};

const UserInfoComponent = ({ personalInfo }) => {
  return (
    <div className="vhcenter gap-2.5">
      <div className="w-8 h-8 iconI vhcenter">

      </div>
      {/* <h2>Personal Information:</h2>
      <ul>
        {personalInfo.map((info) => (
          <li key={info.label}>
            <strong>{info.label}:</strong> {info.value}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Overview;
