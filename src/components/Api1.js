import axios from "axios";

  const apiUrl = 'http://192.168.29.185/loyaltri-recruitment-server/api/v1';
// const apiUrl = 'https://alpha-jobs-api.loyaltri.com/api/v1';


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

  export const getRecruitmentJobById = async (id) => {
    const action = "getRecruitmentJobById";

    const method = "POST";

    const kwargs = id ;
   
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
  const kwargs = e;
  const response = await apiRequest(action, method, kwargs);
  console.log("API Response:", response);

  return await apiRequest(action, method, kwargs);
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
};

export const getAllRecruitmentWorkFlows = async () => {
  const action = "getAllRecruitmentWorkFlows";

  const method = "POST";


  const kwargs = {};

  return await apiRequest(action, method, kwargs);
};
export const updateRecruitmentJob = async (data) => {
  const action = "updateRecruitmentJob";
  const method = "POST";
 
  // Construct the request payload
  const kwargs= data;
  

  return await apiRequest(action, method, kwargs);
};
export const getAllRecruitmentJobTeamMembers = async (jobId) => {
  const action = "getAllRecruitmentJobTeamMembers";

  const method = "POST";
  const requestData = {
    // Include any other necessary parameters
    jobId: 31,
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

  const kwargs = {};

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
// export const getAllRecruitmentQuestionnaireTemplateDetails = async () => {
//   const action = "getAllRecruitmentQuestionnaireTemplateDetails";

//   const method = "POST";
//   // const requestData = {
//   //   // Include any other necessary parameters
//   //   jobId: jobId,
//   // };

//   const kwargs = { };

//   return await apiRequest(action, method, kwargs);
// };
export const getAllRecruitmentLetterTemplates = async () => {
  const action = "getAllRecruitmentLetterTemplates";

  const method = "POST";


  const kwargs = {};

  return await apiRequest(action, method, kwargs);
};
export const getAllRecruitmentQuestionnaireTemplateDetails = async () => {
  const action = "getAllRecruitmentQuestionnaireTemplateDetails";

  const method = "POST";
  // const requestData = {
  //   // Include any other necessary parameters
  //   jobId: jobId,
  // };

  const kwargs = {};

  return await apiRequest(action, method, kwargs);
};

// export const getAllRecruitmentQuestionnaireTemplateDetails = async () => {
//   const action = "getAllRecruitmentQuestionnaireTemplateDetails";

//   const method = "POST";

//   const kwargs = {};

//   return await apiRequest(action, method, kwargs);
// };



// export const getAllRecruitmentLetterTemplates = async () => {
//   const action = "getAllRecruitmentLetterTemplates";

//   const method = "POST";
//   // const requestData = {
//   //   // Include any other necessary parameters
//   //   jobId: jobId,
//   // };

  const kwargs = {};

//   return await apiRequest(action, method, kwargs);
// };
export const getAllCandidatesByjobId = async (jobId) => {
  console.log(jobId);
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
export const saveRecruitmentJobResumesStage = async (
  jobId,
  resumeId,
  stageId,
  stageActions,
  stageRemarks
) => {
  const action = "saveRecruitmentJobResumesStage";
  console.log({
    // Include any other necessary parameters
    jobId: jobId,
    resumeId: resumeId,
    stageId: stageId,
    stageActions: stageActions,
    stageRemarks: stageRemarks,
  });
  const method = "POST";
  const requestData = {
    // Include any other necessary parameters
    jobId: jobId,
    resumeId: resumeId,
    stageId: stageId,
    stageActions: stageActions,
    stageRemarks: stageRemarks,
  };
  return await apiRequest(action, method, requestData);
};

// export const saveRecruitmentEvaluationTemplateDetailBatch = async (data) => {
//   const action = "saveRecruitmentEvaluationTemplateDetailBatch";

//   const method = "POST";
//   const kwargs=data;
// return await apiRequest(action, method, kwargs);
// };
export const saveRecruitmentEvaluationTemplate = async (e) => {
  const action = "saveRecruitmentEvaluationTemplate";
  

  const method = "POST";
  const kwargs=e
  console.log("API Request Data:", { action, method, kwargs });
return await apiRequest(action, method, kwargs);
};
export const saveRecruitmentEvaluationTemplateDetailBatch = async (formattedData) => {
  try {
    const action = "saveRecruitmentEvaluationTemplateDetailBatch";
    const method = "POST";
    const kwargs = formattedData;
    
    console.log("API Request Data:", { action, method, kwargs });

    const response = await apiRequest(action, method, kwargs);

    console.log("API Response:", response);

    return response;
  } catch (error) {
    console.error("Error in saveRecruitmentEvaluationTemplateDetailBatch:", error);
    throw error; // Re-throw the error to handle it where the function is called.
  }
};


export const saveRecruitmentQuestionnaireTemplateDetailBatch = async (formattedData) => {
  try {
    const action = "saveRecruitmentQuestionnaireTemplateDetailBatch";
    const method = "POST";
    const kwargs = formattedData;
    
    console.log("API Request Data:", { action, method, kwargs });

    const response = await apiRequest(action, method, kwargs);

    console.log("API Response:", response);

    return response;
  } catch (error) {
    console.error("Error in saveRecruitmentQuestionnaireTemplateDetailBatch:", error);
    throw error; // Re-throw the error to handle it where the function is called.
  }
};
// export const getAllRecruitmentQuestionnaireTemplateDetails = async () => {
//   const action = "getAllRecruitmentQuestionnaireTemplateDetails";

//   const method = "POST";

//   const kwargs = {};

//   return await apiRequest(action, method, kwargs);
// };
export const getAllRecruitmentEvaluationTemplateDetails = async () => {
  const action = "getAllRecruitmentEvaluationTemplateDetails";

  const method = "POST";

  const kwargs = {};

  return await apiRequest(action, method, kwargs);
};
// export const getAllRecruitmentLetterTemplates = async () => {
//   const action = "getAllRecruitmentLetterTemplates";

//   const method = "POST";

//   const kwargs = {};

//   return await apiRequest(action, method, kwargs);
// };


export const saveRecruitmentWorkFlow = async (e) => {
  try {
    const action = "saveRecruitmentWorkFlow";
    const method = "POST";
    const kwargs = e;
    
    console.log("API Request Data:", { action, method, kwargs });

    const response = await apiRequest(action, method, kwargs);

    console.log("API Response:", response);

    return response;
  } catch (error) {
    console.error(
      "Error in saveRecruitmentEvaluationTemplateDetailBatch:",
      error
    );
    throw error; // Re-throw the error to handle it where the function is called.
  }
};

export const saveRecruitmentQuestionnaireTemplate = async (e) => {
  const action = "saveRecruitmentQuestionnaireTemplate";

  // const method = "POST";
  // const kwargs = e;

  // console.log("API Request Data:", { action, method, kwargs });

  // const response = await apiRequest(action, method, kwargs);

  // console.log("API Response:", response);
  // return await apiRequest(action, method, kwargs);  

  const method = "POST";
  const kwargs=e
  console.log("API Request Data:", { action, method, kwargs });
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
export const saveRecruitmentWorkFlowStage = async (e) => {
  try {
    const action = "saveRecruitmentWorkFlowStage";
    const method = "POST";
    const kwargs = e;
    
    console.log("API Request Data:", { action, method, kwargs });

    const response = await apiRequest(action, method, kwargs);

    console.log("API Response:", response);

    return response;
  } catch (error) {
    console.error("Error in saveRecruitmentWorkFlowStage:", error);
    throw error; // Re-throw the error to handle it where the function is called.
  }
};
export const saveRecruitmentEvaluationTemplateWithDetails = async (e) => {
  try {
    const action = "saveRecruitmentEvaluationTemplateWithDetails";
    const method = "POST";
    const kwargs = e;
    
    console.log("API Request Data:", { action, method, kwargs });

    const response = await apiRequest(action, method, kwargs);

    console.log("API Response:", response);

    return response;
  } catch (error) {
    console.error("Error in saveRecruitmentWorkFlowStage:", error);
    throw error; // Re-throw the error to handle it where the function is called.
  }
};
export const saveRecruitmentJobTemplate = async (e) => {
  try {
    const action = "saveRecruitmentJobTemplate";
    const method = "POST";
    const kwargs = e;
    
    console.log("API Request Data:", { action, method, kwargs });

    const response = await apiRequest(action, method, kwargs);

    console.log("API Response:", response);

    return response;
  } catch (error) {
    console.error("Error in saveRecruitmentWorkFlowStage:", error);
    throw error; // Re-throw the error to handle it where the function is called.
  }
};
export const getAllRecruitmentEvaluationTemplates = async () => {
  const action = "getAllRecruitmentEvaluationTemplates";

  const method = "POST";

  const kwargs = {};

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
export const insertOrUpdateRecruitmentJobApplicationFormSettingWithJobId = async (Data) => {
  const action = "insertOrUpdateRecruitmentJobApplicationFormSettingWithJobId";

  const method = "POST";

  const kwargs = Data;

  return await apiRequest(action, method, kwargs);
};
export const getAllRecruitmentUsers = async () => {
  const action = "getAllRecruitmentUsers";

  const method = "POST";

  const kwargs = {};

  return await apiRequest(action, method, kwargs);
};
export const saveRecruitmentJobTeamMemberBatch = async (data) => {
  const action = "saveRecruitmentJobTeamMemberBatch";

  const method = "POST";

  const kwargs = data;

  return await apiRequest(action, method, kwargs);
};

