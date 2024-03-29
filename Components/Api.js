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

export const getRecruitmentJobById = async (id) => {
    const action = "getRecruitmentJobById";
    const method = "POST";
    const kwargs = { id }; 
    return await apiRequest(action, method, kwargs);
  };
export const getAllRecruitmentJobs = async () => {
    const action = "getAllRecruitmentJobs";
  
    const method = "POST";
  
    const kwargs = {};
  
    return await apiRequest(action, method, kwargs);
  };
  export const saveRecruitmentJobApplicationFormSetting = async (e) => {
    const action = "saveRecruitmentJobApplicationFormSetting";
  
    const method = "POST";
    const kwargs = e;
    const response = await apiRequest(action, method, kwargs);
    console.log("API Response:", response);
  
    return await apiRequest(action, method, kwargs);
  };

  export const saveRecruitmentResume = async (e) => {
    const action = "saveRecruitmentResume";
  
    const method = "POST";
    const kwargs = e;
    // const response = await apiRequest(action, method,{...e});
    // console.log("API Response:", response);
  
    return await apiRequest(action, method, kwargs);
  };
  export const saveRecruitmentJobResumesCustomField = async (e) => {
    const action = "saveRecruitmentJobResumesCustomField";
  
    const method = "POST";
    const kwargs = e;
    // const response = await apiRequest(action, method,{...e});
    // console.log("API Response:", response);
  
    return await apiRequest(action, method, kwargs);
  };
  export const saveRecruitmentResumeEducationalDetailBatch = async (e) => {
    const action = "saveRecruitmentResumeEducationalDetailBatch";
  
    const method = "POST";
    const kwargs = e;
    // const response = await apiRequest(action, method,[...e]);
    
    // console.log("API Request Data:", { action, method, kwargs });
    // console.log("API Response:", response);
  
    return await apiRequest(action, method, [...kwargs]);
  };
  export const saveRecruitmentResumesExperienceDetailBatch = async (e) => {
    const action = "saveRecruitmentResumesExperienceDetailBatch";
  
    const method = "POST";
    const kwargs = e;
    // const response = await apiRequest(action, method,[...e]);
    // console.log("API Response:", response);
  
    return await apiRequest(action, method, [...kwargs]);
  };
  export const getRecruitmentResumeById = async (id) => {
    const action = "getRecruitmentResumeById";
    const method = "POST";
    const kwargs = {  id: id }; 
    return await apiRequest(action, method, kwargs);
  };
  export const getAllRecruitmentResumeEducationalDetails = async (id) => {
    const action = "getAllRecruitmentResumeEducationalDetails";
    const method = "POST";
    const kwargs = { id }; 
    return await apiRequest(action, method, kwargs);
  };
  export const getAllRecruitmentResumesExperienceDetails = async (id) => {
    const action = "getAllRecruitmentResumesExperienceDetails";
    const method = "POST";
    const kwargs = { id }; 
    return await apiRequest(action, method, kwargs);
  };
  export const getAllRecruitmentJobResumesCustomFields = async (id) => {
    const action = "getAllRecruitmentJobResumesCustomFields";
    const method = "POST";
    const kwargs = { id }; 
    return await apiRequest(action, method, kwargs);
  };