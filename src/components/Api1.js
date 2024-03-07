import axios from "axios";

// const apiUrl = 'http://192.168.29.185/loyaltri-recruitment-server/api/v1';
const apiUrl = 'https://alpha-jobs-api.loyaltri.com/api/v1';


const apiRequest = async (action, method, kwargs) => {
  try {
    const response = await axios.post(apiUrl, {
      action, 

      method,

      kwargs,
    });

    return response.data;
  } catch (error) {
    console.error("API request error:", error);

    throw error;
  }
};

export const getRecruitmentJobById = async (jobId) => {
  const action = "getRecruitmentJobById";

  const method = "POST";

  const kwargs = { jobId };

  return await apiRequest(action, method, jobId);
};

export const getAllRecruitmentJobs = async () => {
  const action = "getAllRecruitmentJobs";

  const method = "POST";

  const kwargs = {};

  return await apiRequest(action, method, kwargs);
};

export const saveRecruitmentJob = async (e) => {
  const action = "saveRecruitmentJob";

  const method = "POST";

  return await apiRequest(action, method, { ...e });
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

  return await apiRequest(action, method, e);
};

//Team Members
// export const getAllRecruitmentJobTeamMembers = async () => {
//   const action = "getAllRecruitmentJobTeamMembers";

//   const method = "POST";

//   const kwargs = {};

//   return await apiRequest(action, method, kwargs);
// };

export const getAllRecruitmentUserRoleMappings = async () => {
  const action = "getAllRecruitmentUserRoleMappings";

  const method = "POST";

  const kwargs = {};

  return await apiRequest(action, method, kwargs);
};export const getAllRecruitmentWorkFlows = async () => {
  const action = "getAllRecruitmentWorkFlows";

  const method = "POST";
  // const requestData = {
  //   // Include any other necessary parameters
  //   workFlowId: workFlowId,
  // };

  const kwargs = { };

  return await apiRequest(action, method, kwargs);
};
export const updateRecruitmentJob = async (id, workFlowId,modifiedBy) => {
  const action = "updateRecruitmentJob";
  const method = "POST";
  console.log(workFlowId)
  console.log(modifiedBy)
  // Construct the request payload
  const requestData = {
    id: id,
    workFlowId: workFlowId,
    modifiedBy:modifiedBy
    

    // Include any other necessary parameters
  };

  return await apiRequest(action, method, requestData);
};
export const getAllRecruitmentJobTeamMembers = async (jobId) => {
  const action = "getAllRecruitmentJobTeamMembers";

  const method = "POST";
  const requestData = {
    // Include any other necessary parameters
    jobId: jobId,
  };

  

  return await apiRequest(action, method, requestData);
};
export const getAllRecruitmentJobWorkFlowDetails = async (jobId) => {
  const action = "getAllRecruitmentJobWorkFlowDetails";

  const method = "POST";
  const requestData = {
    // Include any other necessary parameters
    jobId: jobId,
  };

  

  return await apiRequest(action, method, requestData);
};
export const getAllRecruitmentJobTemplates = async () => {
  const action = "getAllRecruitmentJobTemplates";

  const method = "POST";
  // const requestData = {
  //   // Include any other necessary parameters
  //   jobId: jobId,
  // };

  const kwargs = { };

  return await apiRequest(action, method, kwargs);
};
export const getAllRecruitmentEmailTemplates = async () => {
  const action = "getAllRecruitmentEmailTemplates";

  const method = "POST";
  // const requestData = {
  //   // Include any other necessary parameters
  //   jobId: jobId,
  // };

  const kwargs = { };

  return await apiRequest(action, method, kwargs);
};
export const getAllCandidatesByjobId = async (jobId) => {
  console.log(jobId)
  const action = "getAllCandidatesByjobId";

  const method = "POST";
  const requestData = {
    // Include any other necessary parameters
    jobId: jobId,
  };

  

  return await apiRequest(action, method, requestData);
};
export const getRecruitmentResumeById = async (id) => {
  const action = "getRecruitmentResumeById";

  const method = "POST";
  const requestData = {
    // Include any other necessary parameters
    id: id,
  };

  

  return await apiRequest(action, method, requestData);
};
export const saveRecruitmentJobResumesStage = async (jobId,resumeId,stageId,stageActions,stageRemarks) => {
  const action = "saveRecruitmentJobResumesStage";
console.log({
  // Include any other necessary parameters
  jobId: jobId,
  resumeId:resumeId,
  stageId:stageId,
  stageActions:stageActions,
  stageRemarks:stageRemarks

})
  const method = "POST";
  const requestData = {
    // Include any other necessary parameters
    jobId: jobId,
    resumeId:resumeId,
    stageId:stageId,
    stageActions:stageActions,
    stageRemarks:stageRemarks

  };

  

  return await apiRequest(action, method, requestData);
};