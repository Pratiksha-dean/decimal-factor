import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
console.log("🚀 ~ file: request.js ~ line 3 ~ API_URL", API_URL);

export const SEARCH_COMPANY_URL = `${API_URL}SearchCompanies.php?SearchValue=`;
export const CREATE_ACCOUNT_URL = `${API_URL}SearchCompanies.php?SearchValue=`;
export const USER_LOGIN_URL = `${API_URL}/login`;

export async function getRequest() {
  const { data } = await axios.get(API_URL);
  return data;
}



export function createAccount(payload) {
  return axios.post(CREATE_ACCOUNT_URL, payload);
}

export function login(email, password) {
  return axios.post(USER_LOGIN_URL, {
    email,
    password,
  });
}
