import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
console.log("🚀 ~ file: request.js ~ line 3 ~ API_URL", API_URL);

export const SEARCH_COMPANY_URL = `${API_URL}SearchCompanies.php?SearchValue=`;

export async function getRequest() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function getComapanyList(searchString) {
  const { data } = await axios.get(`SEARCH_COMPANY_URL${searchString}`);
  return data;
}
