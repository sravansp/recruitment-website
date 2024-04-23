import cash from "../assets/images/Cash.png";
import workplace from "../assets/images/policy/hourglass.png";
import workaholic from "../assets/images/policy/fingerprint.png";
import deadline from "../assets/images/policy/work timing.png";
import time from "../assets/images/policy/Time.png";
import VectorLine from "../assets/images/policy/Vector.png";

import document from "../assets/images/documents_5972418 1.png";
import pricing from "../assets/images/pricing_12015225 (1) 1.png";
import Avatar from "../assets/images/Avatar.png";
import whatsapp from "../assets/images/whats app.png";
import linkedIn from "../assets/images/Linked.png";
import Message from "../assets/images/Message.png";

import passport from "../assets/images/onBoarding/Passport.png";
import group from "../assets/images/onBoarding/Group.png";
import bank from "../assets/images/onBoarding/bank.png";
import educationCertificate from "../assets/images/onBoarding/Education Certificate.png";

import OnSite from "../assets/images/OnSite.jpg"
import Hybrid from "../assets/images/Hybrid1.jpg"
import Remote from "../assets/images/Remote1.jpg"


// Leave Template

import TravelLocation from "../assets/images/leave/TravelLocation.svg";
import Virus from "../assets/images/leave/virus.svg";
import Mother from "../assets/images/leave/mother.svg";
import Kaaba from "../assets/images/leave/kaaba.svg";
import Calendar from "../assets/images/leave/Calendar.svg";
import { PiCloudWarningBold, PiLockOpenBold } from "react-icons/pi";
import { title } from "faker/lib/locales/az";
import { TbSettingsCheck } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import { RiMenu2Line } from "react-icons/ri";
import { FaRegDotCircle } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineShortText } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaLaptop } from "react-icons/fa6";
// const { t } = useTranslation();

const bloodGroup = [
  {
    id: 1,
    label: "A+",
    value: "A+",
  },
  {
    id: 2,
    label: "A-",
    value: "A-",
  },
  {
    id: 3,
    label: "B+",
    value: "B+",
  },
  {
    id: 2,
    label: "B-",
    value: "B-",
  },
  {
    id: 2,
    label: "AB+",
    value: "AB+",
  },
  {
    id: 2,
    label: "AB-",
    value: "AB-",
  },
  {
    id: 2,
    label: "O+",
    value: "O+",
  },
  {
    id: 2,
    label: "O-",
    value: "O-",
  },
];
const leavelimitPer = [
  {
    id: 1,
    label: "Month",
    value: "Month",

  },
  {
    id: 2,
    label: "Quarterly",
    value: "Quarterly",

  },
  {
    id: 3,
    label: "Half Yearly",
    value: "Half Yearly",

  },
  {
    id: 4,
    label: "Annualy",
    value: "Annualy",

  },
]
const regularOvertime = [
  {
    id: 1,
    title: "Onsite ",
    description:
      "Employees work from Office",
    image: OnSite,
    value: "Onsite",
  },
  {
    id: 2,
    title: "Hybrid",
    description:
      "Employees work from  Office and work form Home",
    image: Hybrid,
    value: "Hybrid",
  },
  {
    id: 3,
    title: "Remote",
    description:
      "Employees work form Home",
    image: Remote,
    value: "Remote",
  },
];
const automationPolicies = [
  {
    id: 1,
    title: "Time In-Out Policies",
    description:
      "Set rules for Late Entry, Early Exit, Breaks & Overtime based on punch-in and punch-out time.",
    value: 1,
    img: workplace,
    bgImage: VectorLine,
  },
  {
    id: 2,
    title: "Over Time Policy",
    description:
      "Set rules for Late Entry, Early Exit, Breaks & Overtime based on punch-in and punch-out time.",
    value: 2,
    img: time,
    bgImage: VectorLine,
  },
  {
    id: 3,
    title: "Less Working Hours",
    description:
      "Set rules for Late Entry, Early Exit, Breaks & Overtime based on punch-in and punch-out time.",
    value: 3,
    img: deadline,
    bgImage: VectorLine,
  },
  {
    id: 4,
    title: "Miss Punch Policy",
    description:
      "Set rules for Late Entry, Early Exit, Breaks & Overtime based on punch-in and punch-out time.",
    value: 4,
    img: workaholic,
    bgImage: VectorLine,
  },
];
const allowanceType = [
  { value: "fixedAmount", label: "Fixed Amount" },
  { value: "multiplier", label: "Multiplier" },
];
const MultiplyBy = [
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
];
const deductionTypeOption = [
  {
    label: "Warning",
    value: "warning",
    icon: <PiCloudWarningBold className="text-primary font-bold" />,
  },
  {
    label: "Half Day",
    value: "halfDay",
    icon: <PiCloudWarningBold className="text-primary font-bold" />,
  },
  {
    label: "Full Day",
    value: "fullDay",
    icon: <PiCloudWarningBold className="text-primary font-bold" />,
  },
  {
    label: "Per Minutes",
    value: "perMinutes",
    icon: <PiCloudWarningBold className="text-primary font-bold" />,
  },
  {
    label: "Fixed Amount",
    value: "fixedAmount",
    icon: <PiCloudWarningBold className="text-primary font-bold" />,
  },
];
const Deduction = [
  { value: "basicSsalary", label: "Basic salary" },
  { value: "grossSalary", label: "Gross Salary" },
];

const occurrence = [
  { label: "1 Time", value: 1 },
  { label: "2 Time", value: 2 },
  { label: "3 Time", value: 3 },
  { label: "4 Time", value: 4 },
  { label: "5 Time", value: 5 },
];

const lateentrypolicy = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "If Employee late",
        type: "time",
        inputType: "lateEntryMinutesOne",
        description: "No late fine for 15 mins",
        line: true,
        display: true,
      },
      {
        title: "Deduction Type",
        type: "dropdown",
        inputType: "lateEntryDeductionTypeOne",
        description: "Description",
        // valuecheck: "DeductionType",
        line: true,
        option: deductionTypeOption,
        icon: true,
        display: true,
      },
      // {
      //   title: "Deduction Component",
      //   type: "dropdown",
      //   inputType: "lateEntryDeductionTypeOne",
      //   description: "Lorem ipsum dolor sit amet",
      //   line: true,
      //   option: Deduction,
      //   display: false,
      // },
      {
        title: "Set Occurrence",
        type: "dropdown",
        option: occurrence,
        enter: "number",
        valuecheck: "SetOccurrence",
        inputType: "lateEntryOccurrenceOne",
        description: "Fine will effect after _ occurunce",
        display: true,
      },
    ],
  },
];

const breakRule = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "If Employee late",
        type: "time",
        inputType: "breakRuleMinutesOne",
        description: "No late fine for 15 mins",
        line: true,
      },
      {
        title: "Deduction Type",
        type: "dropdown",
        inputType: "breakRuleDeductionTypeOne",
        description: "Description",
        // valuecheck: "DeductionComponent",
        line: true,
        option: deductionTypeOption,
        icon: true,
      },
      {
        title: "Set Occurrence",
        valuecheck: "SetOccurrence",
        type: "dropdown",
        option: occurrence,
        inputType: "breakRuleOccurrenceOne",
        description: "Fine will effect after _ occurunce",
      },
    ],
  },
];

const exitRule = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "If Employee Early",
        type: "time",
        inputType: "exitRuleMinutesOne",
        description: "No late fine for 15 mins",
        line: true,
      },
      {
        title: "Deduction Type",
        type: "dropdown",
        inputType: "exitRuleDeductionTypeOne",
        description: "Description",
        // valuecheck: "DeductionComponent",
        line: true,
        option: deductionTypeOption,
        icon: true,
      },
      {
        title: "Set Occurrence",
        valuecheck: "SetOccurrence",
        type: "dropdown",
        option: occurrence,
        inputType: "exitRuleOccurrenceOne",
        description: "Fine will effect after _ occurunce",
      },
    ],
  },
];

const extraHoursOnWeekDays = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "If Employee works more than",
        type: "time",
        inputType: "extraHoursMinutes",
        description: "No late fine for 30 mins",
        line: true,
      },
      {
        title: "Deduction Type",
        type: "dropdown",
        inputType: "extraHoursAllowanceType",
        description: "Automate late fine for employee",
        line: true,
        option: deductionTypeOption,
        icon: true,
      },
      {
        title: "Set Occurrence",
        // valuecheck: "SetOccurrence",
        type: "dropdown",
        option: occurrence,
        inputType: "customRateOccurrence",
        description: "Fine will effect after _ occurunce",
      },
      // {
      //   title: "Amount",
      //   type: "input",
      //   enter: "number",
      //   inputType: "extraHoursAmmount",
      //   description: "amount will be deducted",
      // },
    ],
  },
];

const customRateExtraHours = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "If Employee works more than",
        type: "time",
        inputType: "customRateMinutes",
        description: "No late fine for 30 mins",
        line: true,
      },
      {
        title: "Deduction Type",
        type: "dropdown",
        inputType: "customRateDeductionType",
        description: "Automate late fine for employee",
        line: true,
        option: deductionTypeOption,
        icon: true,
      },
      {
        title: "Set Occurrence",
        // valuecheck: "SetOccurrence",
        type: "dropdown",
        option: occurrence,
        inputType: "customRateOccurrence",
        description: "Fine will effect after _ occurunce",
      },
      // {
      //   inputCount: 1,
      //   title: "Multiply by ",
      //   type: "dropdown",
      //   inputType: "customRateMultiplyBy",
      //   // description: "amount will be deducted",
      // },
      // {
      //   inputCount: 2,
      //   title: "Multiply Component ",
      //   type: "dropdown",
      //   inputType: "customRateMultiplyComponent",
      //   description: "Lorem ipsum dolor sit amet",
      // },
    ],
  },
];
const lessWorkinghours = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "If employee works less than",
        type: "time",
        inputType: "lessWorkingemployee",
        description: "No fine for 15 mins",
        line: true,
      },
      {
        title: "Deduction Type",
        type: "dropdown",
        inputType: "lessWorkingDeductionType",
        description: "Description",
        line: true,
        // valuecheck: "DeductionComponent",
        option: deductionTypeOption,
        icon: true,
      },
      {
        title: "Set Occurrence",
        type: "dropdown",
        // valuecheck: "DeductionComponent",
        option: occurrence,
        inputType: "lessWorkingOccurrence",
        description: "Fine will effect after _ occurunce",
      },
    ],
  },
];
const missPunchPolicy = [
  {
    id: 1,
    rowType: "First",
    field: [
      // {
      //   title: "Enter Count",
      //   type: "input",
      //   enter: "number",
      //   inputType: "missPunchCount",
      //   description: "more than 2 times",
      //   line: true,
      // },
      {
        title: "Deduction Type",
        type: "dropdown",
        inputType: "missPunchDeductionType",
        description: "Description",
        option: deductionTypeOption,
        line: true,
        icon: true,
      },
      {
        title: "Set Occurrence",
        type: "dropdown",
        // valuecheck: "DeductionComponent",
        option: occurrence,
        inputType: "missPunchOccurrence",
        description: "Fine will effect after _ occurunce",
      },
    ],
  },
];

const addHolidayType = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "Holiday Name",
        type: "input",
        inputType: "holidayName",
        // description: "No fine for 15 mins",
        // line: true,
      },
      {
        title: "Holiday type",
        type: "dropdown",
        inputType: "holidayType",
        // description: "Description",
        // line: true,
      },
    ],
  },
];
const holidayHeader = [
  {
    Holiday: [
      {
        id: 1,
        title: "Policy Name",
        // value: ["company", "isActive"],
        value: "policyName",
        // flexColumn: true,
        subvalue: "policyName",
      },
      {
        id: 2,
        title: "Holiday Type",
        value: "holidayType",
        // block: true,
      },
      {
        id: 3,
        title: "Date",
        value: "address",
      },
      {
        id: 4,
        title: "Applicability",
        value: "",
        // actionToggle: true,
      },
      {
        id: 5,
        title: "Applicable to",
        value: "joiningDate",
      },
      {
        id: 6,
        title: "Modified by",
        value: "joiningDate",
      },
      {
        id: 7,
        title: "Modified On",
        value: "joiningDate",
      },

      {
        id: 8,
        title: "Status",
        value: "isActive",
      },
      {
        id: 9,
        title: "Status",
        value: "isActive",
      },
    ],
  },
];
const policiesMenu = [
  {
    id: 0,
    value: 0,
    title: "Policies",
    data: "policies",
  },
  {
    id: 1,
    value: 1,
    title: "Create Policy",
    data: "createPolicy",
  },
  {
    id: 2,
    value: 2,
    title: "Assign Policy",
    data: "assignPolicy",
  },
];

const HolidaySteps = [
  {
    id: 0,
    value: 0,
    title: "Add Holiday",
    data: "addHoliday",
  },
  {
    id: 1,
    value: 1,
    title: "Applicability",
    data: "applicability",
  },
];
const holidayApplicable = [
  {
    id: 1,
    label: "Employee",
    value: "employee",
    // value: 1,
    color: "primary",
  },
  {
    id: 2,
    label: "Department",
    value: "department",
    // value: 2,

    color: "green",
  },
  {
    id: 3,
    label: "Designation",
    value: "designation",
    // value: 3,

    color: "blue",
  },
  {
    id: 4,
    label: "Location",
    value: "location",
    // value: 4,

    color: "yellow",
  },
  {
    id: 5,
    label: "Entity",
    value: "entityId",
    // value: 5,
  },
  {
    id: 6,
    label: "Company",
    value: "company",
    // value: 6,
  },
  {
    id: 7,
    label: "Branch",
    value: "branch",
    // value: 7,
  },
  {
    id: 8,
    label: "Grade",
    value: "grade",
    // value: 8,
  },
];

const ApplicableOn = [
  {
    rowType: "First",
    titleOne: "Applicable On",
    inputTypeOne: "applicableOn",
    titleTwo: "Select",
    inputTypeTwo: "category",
    description: "Fine after 5 mins",
    line: true,
  },
];
const holidayType = [
  {
    title: "National",
    value: "National",
  },
  {
    title: "Restricted Holiday",
    value: "Restricted Holiday",
  },
  {
    title: "State",
    value: "State",
  },
  {
    title: "Public",
    value: "Public",
  },
];
const remainingTasks = [
  {
    title: "Complete your profile details",
    description: "add your work, education, and other personal details",
    image: document,
    profile: Avatar,
    buttonName: "Pending",
    colorFrom: "#104FC9",
    colorTo: "#104FC9",
  },
  {
    title: "Complete your payroll onboarding",
    description: "add your bank details for seamless transactions",
    image: pricing,
    profile: Avatar,
    buttonName: "Pending",
    colorFrom: "#FDBF75",
    colorTo: "#FFAD62",
  },
  {
    title: "Upload your document details",
    description: "upload required document proofs ",
    image: document,
    profile: Avatar,
    buttonName: "Pending",
    colorFrom: "#4B5DFF",
    colorTo: "#654CFF",
  },
];
const teammates = [
  {
    image: Avatar,
    title: "Drew Cano",
    description: "Chief Operations Officer",
    medias: [whatsapp, linkedIn, Message],
  },
  {
    image: Avatar,
    title: "Drew Cano",
    description: "Chief Operations Officer",
    medias: [whatsapp, linkedIn, Message],
  },
  {
    image: Avatar,
    title: "Drew Cano",
    description: "Chief Operations Officer",
    medias: [whatsapp, linkedIn, Message],
  },
];
const upoadDocuments = [
  {
    title: "Complete your profile details",
    description: "add your work, education, and other personal details",
    image: passport,
    imageStyle: {
      width: "32px",
      height: " 44.884px",
    },
    profile: Avatar,
    buttonName: "Pending",
    colorFrom: "#104FC9",
    colorTo: "#104FC9",
  },
  {
    title: "Complete your payroll onboarding",
    description: "add your bank details for seamless transactions",
    image: group,
    imageStyle: {
      width: "40px",
      height: "40px",
    },

    profile: Avatar,
    buttonName: "Pending",
    colorFrom: "#FDBF75",
    colorTo: "#FFAD62",
  },
  {
    title: "Upload your document details",
    description: "upload required document proofs ",
    image: bank,
    imageStyle: {
      width: "40px",
      height: "40px",
    },
    profile: Avatar,
    buttonName: "Pending",
    colorFrom: "#4B5DFF",
    colorTo: "#654CFF",
  },
  {
    title: "Upload your document details",
    description: "upload required document proofs ",
    image: educationCertificate,
    imageStyle: {
      width: "28.276px",
      height: "40px",
    },

    profile: Avatar,
    buttonName: "Pending",
    colorFrom: "#4B5DFF",
    colorTo: "#654CFF",
  },
];
const policiesHeader = [
  {
    Policies: [
      {
        id: 1,
        title: "Policy Name",
        value: "workPolicyName",
      },
      {
        id: 2,
        title: "Description",
        value: "dewscription",
      },
      {
        id: 3,
        title: "Status",
        value: "isActive",
      },
      {
        id: 4,
        title: "Action",
        value: "action",
        dotsVertical: true,
      },
    ],
  },
];
const holidayHeaderList = [
  {
    Holiday: [
      {
        id: 1,
        title: "Holiday Name",
        value: "holidayName",
      },
      {
        id: 2,
        title: "Holiday Type",
        value: "holidayType",
      },
      {
        id: 3,
        title: "Holiday Date",
        value: "holidayDate",
      },

      {
        id: 4,
        title: "Status",
        value: "isActive",
      },
      // {
      //   id: 4,
      //   title: "Action",
      //   value: "",
      //   action: true,
      // },
    ],
  },
];
const accountType = [
  {
    title: "Current",
    value: "current",
  },
  {
    title: "Savings",
    value: "savings",
  },
];
const maritalStatus = [
  {
    title: "Married",
    value: "Married",
  },
  {
    title: "Unmarried",
    value: "unmarried",
  },
];
const stepSchemeSteps = [
  {
    id: 0,
    value: 0,
    title: "Add Shift Scheme",
    data: "addShiftScheme",
  },
  {
    id: 1,
    value: 1,
    title: "Assign Shift Scheme",
    data: "assignShiftScheme",
  },
];
const assignNavigateBtn = [
  { id: 1, value: "employees", label: "Employees" },
  { id: 2, value: "departments", label: "Departments" },
  { id: 3, value: "locations", label: "Locations" },
];
const shiftSchemeAvigateBtn = [
  { id: 1, value: "VariableSchedule", label: "Variable Schedule" },
  { id: 2, value: "RosterSchedule", label: "Roster Schedule" },
];

const unusedLeaveRule = [
  {
    id: 1,
    label: "Carry Forward",
    value: "Carry Forward",
    description: "Leaves will be added to next cycle",

  },
  {
    id: 2,
    label: "laps",
    value: "laps",
    description: "Leaves will be cancelled after the cycle ends",

  },
  {
    id: 3,
    label: "Encash",
    value: "Encash",
    description: "Leaves can be encashed at the end of the cycle"

  },
]
const PaymentType = [
  {
    id: 1,
    label: "paid",
    value: "paid",
  },
  {
    id: 2,
    label: "unpaid",
    value: "unpaid",
  },

]
const moreAssetsList = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "Asset types",
        type: "dropdown",
        inputType: "assetId",
      },
      {
        title: "Asset",
        type: "input",
        inputType: "assetName",
      },
      {
        title: "Description",
        type: "textArea",
        inputType: "assetDescription",
      },
      {
        title: "Is asset under warranty",
        description: "Set asset warrant informations",
        type: "radio",
        inputType: "isWarranty",
      },
    ],
  },
];

const moreDocumentList = [
  {
    id: 1,
    rowType: "First",
    field: [
      {
        title: "Document Types",
        type: "dropdown",
        inputType: "documentId",
      },
      {
        title: "Document",
        type: "input",
        inputType: "document",
      },
      {
        title: "Is asset under warranty",
        description: "Set asset warrant informations",
        type: "upload",
        inputType: "isWarranty",
      },
      {
        title: "Description",
        type: "textArea",
        inputType: "documentDescription",
      },
    ],
  },
];
const employeeDocumentHeader = [
  {
    EmployeeDocument: [
      {
        id: 1,
        title: "Document Name",
        value: "filename",
      },
      {
        id: 2,
        title: "Valid From",
        value: "validFrom",
      },
      {
        id: 3,
        title: "Valid To",
        value: "validTo",
      },

      {
        id: 9,
        title: "Status",
        value: "isActive",
      },
    ],
  },
];
const employeeAssetsHeader = [
  {
    EmployeeAssets: [
      {
        id: 1,
        title: "AssetsName Name",
        value: "asset",
      },
      {
        id: 2,
        title: "pecification",
        value: "assetSpecification",
      },
      {
        id: 3,
        title: "Serial No",
        value: "serialNo",
      },
      {
        id: 4,
        title: "ValidUpto",
        value: "validUpto",
      },

      {
        id: 9,
        title: "Status",
        value: "isActive",
      },
    ],
  },
];


//RECRUITMENT
const Form = [
  {
    id: 1,
    label: "Multiple Choice",
    value: "MultipleChoice",
    icon: <FaRegDotCircle />

  },
  {
    id: 2,
    label: "Short Answer",
    value: "ShortAnswer",
    icon: <MdOutlineShortText />
  },
  {
    id: 3,
    label: "Paragraph",
    value: "Paragraph",
    icon: <RiMenu2Line />
  },
  {
    id: 4,
    label: "Checkboxes",
    value: "Checkboxes",
    icon: <MdOutlineCheckBox />
  },
  {
    id: 5,
    label: "Drop-down",
    value: "Drop-down",
    icon: <IoIosArrowDropdown />
  },
  // {
  //   id: 6,
  //   label: "Drop-down",
  //   value: "Drop-down",
  // },

];
const cardData = [
  {
    id: 1,
    label: "Sourced",
    value: "Sourced",


  },
  {
    id: 2,
    label: "Applied",
    value: "Applied",

  },
  {
    id: 3,
    label: "Personal Interview",
    value: "PPersonal Interview",
    icon: <RiMenu2Line />
  },
  {
    id: 4,
    label: "Phone Screen",
    value: "Phone Screen",
    icon: <MdOutlineCheckBox />
  },
  {
    id: 5,
    label: "Hired",
    value: "Drop-down",
    icon: <IoIosArrowDropdown />
  },
  {
    id: 6,
    label: "Offer",
    value: "Offer",
  },
  {
    id: 7,
    label: "Final review",
    value: "Final review",
  },
];

const Requirment = [
  {
    id: 1,
    label: "Urgent",
    value: "Urgent"
  },
  {
    id: 2,
    label: "Not urgent",
    value: "Not Urgent"
  },
  {
    id: 3,
    label: "Mid level",
    value: "Mid Level"
  },
  // {
  //   id:4,
  //   label:"Mid Senior Level",
  //   value:"Mid Senior Level"
  // },
]
const JobType = [
  {
    id: 1,
    label: "Full Time",
    value: "Full Time"
  },
  {
    id: 2,
    label: "Part Time",
    value: "Part Time."
  },
  // {
  //   id:3,
  //   label:"Mid level",
  //   value:"Mid level"
  // },
]
const experiencelevel = [
  {
    id: 1,
    label: "Director Level",
    value: "DirectorLevel"
  },
  {
    id: 2,
    label: "Manager Level",
    value: "ManagerLevel"
  },
  {
    id: 3,
    label: "Senior Level",
    value: "SeniorLevel"
  },
  {
    id: 4,
    label: "Mid Senior Level",
    value: "MidSeniorLevel"
  },
  {
    id: 5,
    label: "Junior Level",
    value: "JuniorLevel"
  },
  {
    id: 1,
    label: "Fresher",
    value: "Fresher"
  },

]

const eductaion = [

  {
    id: 1,
    label: "Above Post Graduate",
    value: "AbovePostGraduate"
  },
  {
    id: 2,
    label: "Post Graduate",
    value: "PostGraduate"
  },
  {
    id: 3,
    label: "Graduate",
    value: "Graduate"
  },
  {
    id: 4,
    label: "Under Graduate",
    value: "UnderGraduate"
  },
  {
    id: 5,
    label: "School Level",
    value: "SchoolLevel"
  },
]
const saleryCurrency = [
  {
    id: 1,
    label: "AED",
    value: "AED",

  },
  {
    id: 2,
    label: "INR",
    value: "INR",

  }
]


const JobDesc = [
  {
    id: 1,
    label: "IT Admin",
    value: "it_admin",

  },
  {
    id: 2,
    label: "Teacher",
    value: "teacher",

  }
]

const Employees = [
  {
    id: 1,
    img: Avatar,
    name: "ashik",
    employeeid: "EMP ID: #234567",
    email: "alexanderpaul@company.com",
    designation: "Super Admin",


  },
  {
    id: 2,
    img: Avatar,
    name: "aness",
    employeeid: "EMP ID: #234568",
    email: "alexanderpaul@company.com",
    designation: "Super ",
  }
]


const evaluation = [

  {
    id: 1,
    companyId: "",
    evaluationTemplateId: "",
    question: "",
    answerMetaData: [
      {
        id: 1,
        key: "",
        value: "",
      }
    ],
    description: "",
    createdBy: "ashik"
  },

]


export {
  bloodGroup,
  regularOvertime,
  automationPolicies,
  allowanceType,
  MultiplyBy,
  lateentrypolicy,
  breakRule,
  exitRule,
  holidayHeader,
  HolidaySteps,
  holidayApplicable,
  ApplicableOn,
  holidayType,
  extraHoursOnWeekDays,
  customRateExtraHours,
  lessWorkinghours,
  missPunchPolicy,
  remainingTasks,
  teammates,
  upoadDocuments,
  policiesMenu,
  policiesHeader,
  holidayHeaderList,
  accountType,
  maritalStatus,
  stepSchemeSteps,
  assignNavigateBtn,
  shiftSchemeAvigateBtn,
  addHolidayType,
  leavelimitPer,
  unusedLeaveRule,
  PaymentType,
  moreAssetsList,
  moreDocumentList,
  employeeDocumentHeader,
  employeeAssetsHeader,
  deductionTypeOption,
  occurrence,
  Deduction,
  Form,
  cardData,
  Requirment,
  JobType,
  experiencelevel,
  eductaion,
  saleryCurrency,
  JobDesc,
  Employees,
  evaluation
};
