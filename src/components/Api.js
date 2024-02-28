const API = {
  HOST: "http://192.168.0.38/loyaltri-server",
  // HOST: "http://192.168.0.37/ci-news",

  // HOST: "https://alpha-api.loyaltri.com",
  // HOST: "http://192.168.0.55/loyaltri-recruitment-server/api/v1",

  // theme settings
  Theme_Settings: "/AppearanceTheme/create_appearanceTheme",

  //  company
  ADD_COMPANY: "/company/create_company",
  // ADD_COMPANY: "/create_company",
  UPDATE_COMPANY: "/company/update_company",
  GET_COMPANY_RECORDS: "/company",
  DELETE_COMPANY_RECORD: "/company/delete_company",
  GET_COMPANY_ID_BASED_RECORDS: "/company/show_company",
  UPDATE_ONLY_ISACTIVE: "/company/updateisActive_company",

  // DESIGNATION

  ADD_DESIGNATION: "/designation/create_designation",
  GET_DESIGNATION_RECORDS: "/designation",
  UPDATE_DESIGNATION: "/designation/update_designation",
  GET_DESIGNATIONID_BASED_RECORDS: "/designation/show_designation",
  DELETE_DESIGNATION_RECORD: "/designation/delete_designation",

  //  Assets Types

  ADD_ASSETS_TYPES: "/assetType/create_AssetType",
  UPDATE_ASSETS_TYPES: "/assetType/update_AssetType",
  GET_ASSETS_TYPESID_BASED_RECORDS: "/assetType/show_AssetType",
  GET_ASSETS_TYPES_RECORDS: "/assetType",
  DELETE_ASSETS_TYPES_RECORDS: "/assetType/delete_AssetType",

  // Document Types

  ADD_DOCUMENT_TYPES: "/documentType/create_documentType",
  UPDATE_DOCUMENT_TYPES: "/documentType/update_documentType",
  GET_DOCUMENTID_BASED_RECORDS: "/documentType/show_documentType",
  GET_DOCUMENT_TYPES_RECORDS: "/documentType",
  DELETE_DOCUMENT_TYPES_RECORDS: "/documentType/delete_documentType",

  // Organisaction

  GET_ORGANISACTION_RECORDS: "/organisation",
  // GET_ORGANISACTION_RECORDS: "/organisation/show_org",
  UPDATE_ORGANISACTION: "/organisation/update_org",

  // login

  LOGIN_USER: "/AdminLogin",

  // Location

  ADD_LOCATION: "/location/create_location",
  GET_LOCATION: "/location",
  UPDATE_LOCATION: "/location/update_location",
  GET_LOCATIONID_BASED_RECORDS: "/location/show_Location",
  DELETE_LOCATION: "/location/delete_location",

  // department

  ADD_DEPARTMENT: "/department/create_department",
  GET_DEPARTMENT: "/department",
  UPDATE_DEPARTMENT: "/department/update_department",
  GET_DEPARTMENT_ID_BASED_RECORDS: "/department/show_department",
  DELETE_DEPARTMENT: "/department/delete_department",

  // category

  ADD_CATEGORY: "/category/create_category",
  GET_CATEGORY: "/category",
  UPDATE_CATEGORY: "/category/update_category",
  GET_CATEGORY_ID_BASED_RECORDS: "/category/show_category",
  DELETE_CATEGORY: "/category/delete_category",

  // subCategory

  ADD_SUB_CATEGORY: "/subCategory/create_subcategory",
  GET_SUB_CATEGORY: "/subCategory",
  UPDATE_SUB_CATEGORY: "/SubCategory/update_subcategory",
  GET_SUB_CATEGORY_ID_BASED_RECORDS: "/SubCategory/show_subcategory",
  DELETE_SUB_CATEGORY: "/subCategory/delete_subcategory",

  // leaveType

  ADD_LEAVE_TYPES: "/leaveType/create_leaveType",
  ADD_ASSIGN_LEAVE_TYPES: "/AssignleaveType/create_assignleaveType",
  GET_LEAVE_TYPES: "/leaveType",
  UPDATE_LEAVE_TYPES: "/LeaveType/update_leaveType",
  GET_LEAVE_TYPES_ID_BASED_RECORDS: "/leaveType/show_leaveType",
  DELETE_LEAVE_TYPES: "/leaveType/delete_leaveType",

  //Assign LeavTyepes
  // ADD_ASSIGN_LEAVE_TYPES: "/AssignleaveType/create_assignleaveType",

  // shift

  GET_SHIFT_RECORDS: "/shift",
  UPDATE_SHIFT: "/shift/update_shift",
  ADD_SHIFT: "/shift/create_shift",
  DELETE_SHIFT_RECORD: "/shift/delete_shift",
  GET_SHIFT_ID_BASED_RECORDS: "/shift/show_shift",
  DELETE_SHIFT: "/shift/delete_shift",

  // shiftScheme

  ADD_SHIFT_SCHEME: "/shiftScheme/create_shiftScheme",
  GET_SHIFT_SCHEME: "/shiftScheme",
  UPDATE_SHIFT_SCHEME: "/shiftScheme/update_shiftScheme",
  GET_SHIFT_SCHEME_ID_BASED_RECORDS: "/shiftScheme/show_shiftScheme",
  DELETE_SHIFT_SCHEME: "/shiftScheme/delete_shiftScheme",
  ADD_ASSIGN_SHIFT_SCHEME: "/employeeShiftScheme/create_EmployeeShiftScheme",

  // employee
  GET_EMPLOYEE: "/employee",
  ADD_EMPLOYEE: "/employee/create_employee",
  GET_EMPLOYEE_ID_BASED_RECORDS: "/employee/show_employee",
  ADD_EMPLOYEE_ADDRESS: "/employeeAddress/create_employeeAddress",
  ADD_EMPLOYEE_BASIC_DETAILS: "/employeeBiodata/create_employeeBiodata",
  ADD_EMPLOYEE_COMPANY: "/employeeCompany/create_employeeCompany",
  GET_EMPLOYEE_DOCUMENT: "/employeeDocuments",
  ADD_EMPLOYEE_DOCUMENT: "/employeeDocuments/create_EmployeeDocuments",
  GET_EMPLOYEE_ASSETS: "/employeeAssets",
  ADD_EMPLOYEE_ASSETS: "/employeeAssets/create_EmployeeAssets",

  // Work Policy
  GET_EMPLOYEE_WORK_POLICY: "/workPolicy",
  ADD_EMPLOYEE_WORK_POLICY: "/WorkPolicy/create_workPolicy",
  GET_ID_BASED_EMPLOYEE_WORK_POLICY: "/WorkPolicy/show_workPolicy",
  DELETE_EMPLOYEE_WORK_POLICY: "/WorkPolicy/delete_workPolicy",
  ADD_EMPLOYEE_WORK_POLICY_DETAILS:
    "/WorkPolicyDetails/create_workPolicyDetails",

  // Less Working Hours

  ADD_LESS_WORKING_HOURS_POLICY: "/shortTimePolicy/create_ShorttimePolicy",

  // Candidate Onboarding

  CET_CANDIDATE_PERSIONAL: "/employeePersonal",
  ADD_CANDIDATE_PERSIONAL: "/candidatePersonal/create_candidatePersonal",
  ADD_CANDIDATE_WORK_EXPERIENCE:
    "/candidateworkExperience/create_workExperiece",
  ADD_CANDIDATE_BANK_DETAILS:
    "/CandidatebankDetails/create_candidatebankDetails",

  // Holiday

  GET_HOLIDAY: "/holiday",
  ADD_HOLIDAY_RECORDS: "/holiday/create_Holiday",
  ADD_HOLIDAY_APPLICABLE: "/holidayApplicable/create_HolidayApplicable",

  // OverTime Policies

  GET_OVERTIME_POLICY: "/overtimePolicy",
  ADD_OVERTIME_POLICY: "/overtimePolicy/create_OvertimePolicy",

  //Policy

  ADD_ASSIGN_POLICY: "/employeeCompany/create_employeeCompany",
  GET_SHORT_TIME_POLICY: "/shortTimePolicy",

  // Miss Punch Policy

  GET_MISS_PUNCH_POLICY: "/misspunchPolicy",
  ADD_MISS_PUNCH_POLICY: "/MisspunchPolicy/create_MisspunchPolicy",

  // Leave Type

  GET_LEAVE_TYPE: "/leaveType/leavetype_Records",

  // country List

  GET_COUNTRY_LIST: "/country",

  // City List

  GET_CITY_LIST: "/Citylocality",

  // State List

  GET_STATE_LIST: "/StateProvince",

  // Religion List

  GET_RELIGION_LIST: "/religion",
};

export default API;
