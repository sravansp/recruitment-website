import axios from "axios";

const urlFileHandler = "https://alpha-jobs-api.loyaltri.com/api/fileHandler";
const fileAction = async (formData) => {
  try {
    const result = await axios.post(urlFileHandler, formData, {
      "Content-Type": "multipart/form-data",
    });
    // console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};
export { fileAction };