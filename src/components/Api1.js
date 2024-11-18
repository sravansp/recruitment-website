import axios from "axios";

// const apiUrl = 'http://192.168.29.185/loyaltri-recruitment-server/api/v1';
// const apiUrl = 'https://alpha-jobs-api.loyaltri.com/api/v1';
// const apiUrl = 'https://jobs-api.loyaltri.com/api/v1';

// const apiUrl = 'https://web-jobs-api.loyaltri.com/api/v1';
const apiUrl = "http://192.168.0.36/loyaltri-recruitment-server/api/v1";

// const apiUrl = "https://demo-jobs-api.loyaltri.com/api/v1";

const token = localStorage.getItem("token");

const apiRequest = async (action, method, kwargs) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        action,
        method,
        kwargs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecruitmentJobById = async (id) => {
  const action = "getRecruitmentJobById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobs = async (Data) => {
  const action = "getAllRecruitmentJobs";
  const method = "POST";
  const kwargs = Data;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJob = async (e) => {
  const action = "saveRecruitmentJob";
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const deleteRecruitmentJobById = async (id) => {
  const action = "deleteRecruitmentJobById";
  const method = "POST";
  const kwargs = { id };
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentResumes = async () => {
  const action = "getAllRecruitmentResumes";
  const method = "POST";
  const kwargs = {};
  return await apiRequest(action, method, kwargs);
};

// Job creation
export const saveRecruitmentJobApplicationFormSetting = async (e) => {
  const action = "saveRecruitmentJobApplicationFormSetting";
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentUserRoleMappings = async () => {
  const action = "getAllRecruitmentUserRoleMappings";
  const method = "POST";
  const kwargs = {};
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentWorkFlows = async (data) => {
  const action = "getAllRecruitmentWorkFlows";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentJob = async (data) => {
  const action = "updateRecruitmentJob";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobTeamMembers = async (jobId) => {
  const action = "getAllRecruitmentJobTeamMembers";
  const method = "POST";
  const requestData = {
    jobId: 31,
  };
  return await apiRequest(action, method, requestData);
};

export const getAllRecruitmentJobWorkFlowDetails = async (jobId) => {
  const action = "getAllRecruitmentJobWorkFlowDetails";
  const method = "POST";
  const requestData = {
    jobId: jobId,
  };
  return await apiRequest(action, method, requestData);
};

export const getAllRecruitmentJobTemplates = async (data) => {
  const action = "getAllRecruitmentJobTemplates";
  const method = "POST";
  // const requestData = {
  //   // Include any other necessary parameters
  //   jobId: jobId,
  // };
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentEmailTemplates = async (data) => {
  const action = "getAllRecruitmentEmailTemplates";
  const method = "POST";
  // const requestData = {
  //   // Include any other necessary parameters
  //   jobId: jobId,
  // };
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentLetterTemplates = async (data) => {
  const action = "getAllRecruitmentLetterTemplates";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentQuestionnaireTemplates = async (data) => {
  const action = "getAllRecruitmentQuestionnaireTemplates";
  const method = "POST";
  // const requestData = {
  //   // Include any other necessary parameters
  //   jobId: jobId,
  // };
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllCandidatesByjobId = async (jobId) => {
  const action = "getAllCandidatesByjobId";
  const method = "POST";
  const requestData = {
    jobId: jobId,
  };
  return await apiRequest(action, method, requestData);
};

export const getRecruitmentResumeById = async (id) => {
  const action = "getRecruitmentResumeById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJobResumesStage = async (data) => {
  const action = "saveRecruitmentJobResumesStage";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentResume = async (data) => {
  const action = "saveRecruitmentResume";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentEvaluationTemplate = async (e) => {
  const action = "saveRecruitmentEvaluationTemplate";
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentEvaluationTemplateDetailBatch = async (
  formattedData
) => {
  try {
    const action = "saveRecruitmentEvaluationTemplateDetailBatch";
    const method = "POST";
    const kwargs = formattedData;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentResumeEducationalDetailBatch = async (
  formattedData
) => {
  try {
    const action = "saveRecruitmentResumeEducationalDetailBatch";
    const method = "POST";
    const kwargs = formattedData;
    const response = await apiRequest(action, method, kwargs);
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentResumesExperienceDetailBatch = async (
  formattedData
) => {
  try {
    const action = "saveRecruitmentResumesExperienceDetailBatch";
    const method = "POST";
    const kwargs = formattedData;
    const response = await apiRequest(action, method, kwargs);
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentQuestionnaireTemplateDetailBatch = async (
  formattedData
) => {
  try {
    const action = "saveRecruitmentQuestionnaireTemplateDetailBatch";
    const method = "POST";
    const kwargs = formattedData;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const getAllRecruitmentEvaluationTemplateDetails = async () => {
  const action = "getAllRecruitmentEvaluationTemplateDetails";
  const method = "POST";
  const kwargs = {};
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentWorkFlow = async (e) => {
  try {
    const action = "saveRecruitmentWorkFlow";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentQuestionnaireTemplate = async (e) => {
  const action = "saveRecruitmentQuestionnaireTemplate";
  // const method = "POST";
  // const kwargs = e;
  // return await apiRequest(action, method, kwargs);
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentEmailTemplate = async (e) => {
  const action = "saveRecruitmentEmailTemplate";
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentLetterTemplate = async (e) => {
  const action = "saveRecruitmentLetterTemplate";
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentWorkFlowStageBatch = async (e) => {
  try {
    const action = "saveRecruitmentWorkFlowStageBatch";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentEvaluationTemplateWithDetails = async (e) => {
  try {
    const action = "saveRecruitmentEvaluationTemplateWithDetails";
    const method = "POST";
    const kwargs = e;
    const response = await apiRequest(action, method, kwargs);
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentJobTemplate = async (e) => {
  try {
    const action = "saveRecruitmentJobTemplate";
    const method = "POST";
    const kwargs = e;
    const response = await apiRequest(action, method, kwargs);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllRecruitmentEvaluationTemplates = async (data) => {
  const action = "getAllRecruitmentEvaluationTemplates";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentJobTemplateById = async (id) => {
  const action = "getRecruitmentJobTemplateById";
  const method = "POST";
  const kwargs = { id: id };
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentJobTemplate = async (data) => {
  const action = "updateRecruitmentJobTemplate";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const insertOrUpdateRecruitmentJobApplicationFormSettingWithJobId =
  async (Data) => {
    const action =
      "insertOrUpdateRecruitmentJobApplicationFormSettingWithJobId";
    const method = "POST";
    const kwargs = Data;
    return await apiRequest(action, method, kwargs);
  };

export const getAllRecruitmentUsers = async (data) => {
  const action = "getAllRecruitmentUsers";
  const method = "POST";
  const kwargs = data || {};
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJobTeamMemberBatch = async (data) => {
  const action = "saveRecruitmentJobTeamMemberBatch";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getJobStatics = async (data) => {
  const action = "getJobStatics";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentWorkFlowById = async (id) => {
  const action = "getRecruitmentWorkFlowById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const updateWorkFlowWithStages = async (e) => {
  try {
    const action = "updateWorkFlowWithStages";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const getRecruitmentEvaluationTemplateById = async (id) => {
  const action = "getRecruitmentEvaluationTemplateById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const updateEvaluationTemplateWithDetails = async (e) => {
  try {
    const action = "updateEvaluationTemplateWithDetails";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const updateQuestionnaireTemplateWithDetails = async (e) => {
  try {
    const action = "updateQuestionnaireTemplateWithDetails";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const getRecruitmentQuestionnaireTemplateById = async (id) => {
  const action = "getRecruitmentQuestionnaireTemplateById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentEmailTemplateById = async (id) => {
  const action = "getRecruitmentEmailTemplateById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentEmailTemplate = async (e) => {
  try {
    const action = "updateRecruitmentEmailTemplate";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const updateRecruitmentLetterTemplate = async (data) => {
  const action = "updateRecruitmentLetterTemplate";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentResumesExperienceDetails = async (resumeId) => {
  const action = "getAllRecruitmentResumesExperienceDetails";
  const method = "POST";
  const kwargs = { resumeId };
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentResumeEducationalDetails = async (resumeId) => {
  const action = "getAllRecruitmentResumeEducationalDetails";
  const method = "POST";
  const kwargs = { resumeId };
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentLetterTemplateById = async (id) => {
  const action = "getRecruitmentLetterTemplateById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobResumeActivities = async (resumeId) => {
  const action = "getAllRecruitmentJobResumeActivities";
  const method = "POST";
  const kwargs = { resumeId };
  return await apiRequest(action, method, kwargs);
};

export const getResumeJobDetails = async (data) => {
  const action = "getResumeJobDetails";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentJobResumesMapping = async (data) => {
  const action = "updateRecruitmentJobResumesMapping";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJobResumesEmailCommunication = async (e) => {
  const action = "saveRecruitmentJobResumesEmailCommunication";
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobResumesEmailCommunications = async (
  resumeId
) => {
  const action = "getAllRecruitmentJobResumesEmailCommunications";
  const method = "POST";
  const kwargs = resumeId;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJobResumesEvent = async (e) => {
  const action = "saveRecruitmentJobResumesEvent";
  const method = "POST";
  const kwargs = e;
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentJobResumesEventById = async (id) => {
  const action = "getRecruitmentJobResumesEventById";
  const method = "POST";
  const kwargs = id;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobResumesEvents = async (data) => {
  const action = "getAllRecruitmentJobResumesEvents";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJobResumesNote = async (data) => {
  const action = "saveRecruitmentJobResumesNote";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobResumesNotes = async (data) => {
  const action = "getAllRecruitmentJobResumesNotes";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobResumesEvaluations = async (data) => {
  const action = "getAllRecruitmentJobResumesEvaluations";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJobResumesEvaluationBatch = async () => {
  const action = "saveRecruitmentJobResumesEvaluationBatch";
  const method = "POST";
  const kwargs = {};
  return await apiRequest(action, method, kwargs);
};

export const saveOrUpdateRecruitmentJobResumesEvaluationBatch = async (e) => {
  try {
    const action = "saveOrUpdateRecruitmentJobResumesEvaluationBatch";
    const method = "POST";
    const kwargs = e;
    const response = await apiRequest(action, method, kwargs);
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentJobResumesOfferLetter = async (e) => {
  try {
    const action = "saveRecruitmentJobResumesOfferLetter";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const getAllEmployee = async (data) => {
  const action = "getAllEmployee";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentRoles = async () => {
  const action = "getAllRecruitmentRoles";
  const method = "POST";
  const kwargs = {};
  return await apiRequest(action, method, kwargs);
};

export const addRecruitmentUserWithRoleMapping = async (e) => {
  try {
    const action = "addRecruitmentUserWithRoleMapping";
    const method = "POST";
    const kwargs = e;
    return await apiRequest(action, method, kwargs);
  } catch (error) {
    throw error;
  }
};

export const saveRecruitmentJobDescriptionTemplate = async (Data) => {
  const action = "saveRecruitmentJobDescriptionTemplate";
  const method = "POST";
  const kwargs = Data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobDescriptionTemplates = async (data) => {
  const action = "getAllRecruitmentJobDescriptionTemplates";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentJobDescriptionTemplateById = async (data) => {
  const action = "getRecruitmentJobDescriptionTemplateById";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentJobDescriptionTemplate = async (data) => {
  const action = "updateRecruitmentJobDescriptionTemplate";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentJobResumesNoteById = async (data) => {
  const action = "getRecruitmentJobResumesNoteById";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentJobResumesNote = async (data) => {
  const action = "updateRecruitmentJobResumesNote";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getRecruitmentUserById = async (data) => {
  const action = "getRecruitmentUserById";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardStaticDatas = async (data) => {
  const action = "getDashboardStaticDatas";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardApplicationFrequencyRate = async (data) => {
  const action = "getDashboardApplicationFrequencyRate";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardUpcommingInterviewSchedules = async (data) => {
  const action = "getDashboardUpcommingInterviewSchedules";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardLiveJobs = async (data) => {
  const action = "getDashboardLiveJobs";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardCandidateSource = async (data) => {
  const action = "getDashboardCandidateSource";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardAgeDistribution = async (data) => {
  const action = "getDashboardAgeDistribution";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardNewApplicants = async (data) => {
  const action = "getDashboardNewApplicants";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getDashboardAgeOfJobs = async (data) => {
  const action = "getDashboardAgeOfJobs";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentUserRoleMapping = async (data) => {
  const action = "updateRecruitmentUserRoleMapping";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const addJobToResume = async (data) => {
  const action = "addJobToResume";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentJobResumesOfferLetters = async (data) => {
  const action = "getAllRecruitmentJobResumesOfferLetters";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const getAllRecruitmentFunctions = async (data) => {
  const action = "getAllRecruitmentFunctions";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentRole = async (data) => {
  const action = "saveRecruitmentRole";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const saveOrUpdateRecruitmentRoleFunctionBatch = async (data) => {
  const action = "saveOrUpdateRecruitmentRoleFunctionBatch";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const updateRecruitmentResume = async (data) => {
  const action = "updateRecruitmentResume";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

export const AutomateResumesInStage = async (data) => {
  const action = "AutomateResumesInStage";
  const method = "POST";
  const kwargs = data;
  return await apiRequest(action, method, kwargs);
};

const API = {
  UPDATE_Job_Templates: "toggleRecruitmentJobTemplateStatus",
  UPDATE_Job_Description: "toggleRecruitmentJobDescriptionTemplateStatus",
  UPDATE_Workflow: "toggleRecruitmentWorkFlowStatus",
  UPDATE_Email: "toggleRecruitmentEmailTemplateStatus",
  UPDATE_EvaluationS: "toggleRecruitmentEvaluationTemplateStatus",
  UPDATE_Questionaire: "toggleRecruitmentQuestionnaireTemplateStatus",
  UPDATE_Letter: "toggleRecruitmentLetterTemplateStatus",
  UpDate_jobs: "toggleRecruitmentJobStatus",

  //delete API
  DELETE_Job_Templates: "deleteRecruitmentJobTemplateById",
  DELETE_Job_Description: "deleteRecruitmentJobDescriptionTemplateById",
  DELETE_Workflow: "deleteRecruitmentWorkFlowById",
  DELETE_Email: "deleteRecruitmentEmailTemplateById",
  DELETE_Evaluation: "deleteRecruitmentEvaluationTemplateById",
  DELETE_Questionaire: "deleteRecruitmentQuestionnaireTemplateById",
  DELETE_Letter: "deleteRecruitmentLetterTemplateById",
};
export default API;

const action = async (actionUrl, params = {}, url = apiUrl, headers) => {
  // let returnValue;
  try {
    const result = await axios.post(
      url,
      {
        action: actionUrl,
        method: "POST",
        kwargs: params,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};
export { action };

// file handling url
// const urlFileHandler = "https://alpha-jobs-api.loyaltri.com/api/fileHandler";
const urlFileHandler = "https://demo-jobs-api.loyaltri.com/api/fileHandler";
// const urlFileHandler = "https://web-jobs-api.loyaltri.com/api/fileHandler";
// const urlFileHandler = "https://jobs-api.loyaltri.com/api/fileHandler";
const fileAction = async (formData) => {
  try {
    const result = await axios.post(urlFileHandler, formData, {
      "Content-Type": "multipart/form-data",
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
export { fileAction };
