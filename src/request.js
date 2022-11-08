import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const SEARCH_COMPANY_URL = `${API_URL}SearchCompanies.php?SearchValue=`;
export const CREATE_ACCOUNT_URL = `${API_URL}CreateCustomerForUK`;
export const USER_LOGIN_URL = `${API_URL}UKCustomerLogin`;
export const DASHBOARD_DATA_URL = `${API_URL}GetLeadMaster/`;
export const VERIFY_ACCOUNT_URL = `${API_URL}UKCustomerVerify`;

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

export async function getDashboardData(id) {
  const { data } = await axios.get(`${DASHBOARD_DATA_URL}${id}`);
  return data;
}

export function verifyAccount(token) {
  return axios.post(VERIFY_ACCOUNT_URL, {
    token: token,
  });
}
