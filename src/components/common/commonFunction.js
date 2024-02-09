import API from "../Api";
import axios from "axios";

let organisationId = localStorage.getItem("organisationId");
let companyData;
const getCompanyList = async () => {
  console.log(API.HOST + API.GET_COMPANY_RECORDS + "/" + organisationId);
  const result = await axios.post(
    API.HOST + API.GET_COMPANY_RECORDS + "/" + organisationId
  );
  companyData = result.data.tbl_company;
  console.log(result.data.tbl_company);
};

export { getCompanyList, companyData };
