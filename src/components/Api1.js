import axios from "axios";

// const apiUrl = 'http://10.10.6.118/loyaltri-recruitment-server/api/v1';
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

  const kwargs = { };

  return await apiRequest(action, method, kwargs);
};

// Job creation 
export const saveRecruitmentJobApplicationFormSetting = async (e) => {
  const action = "saveRecruitmentJobApplicationFormSetting";

  const method = "POST";



  return await apiRequest(action, method, e);
};


