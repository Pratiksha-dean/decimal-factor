import axios from "axios";
import { setStepNo } from "./component/requestaquote/components/request-leftpanel";
const API_URL = process.env.REACT_APP_API_URL;
export const SEARCH_COMPANY_URL = `${API_URL}SearchCompanies.php?SearchValue=`;
export const CREATE_ACCOUNT_URL = `${API_URL}CreateCustomerForUK`;
export const USER_LOGIN_URL = `${API_URL}UKCustomerLogin`;
export const DASHBOARD_DATA_URL = `${API_URL}GetLeadMaster/`;
export const VERIFY_ACCOUNT_URL = `${API_URL}UKCustomerVerify`;
export const FORGOT_PASSWORD_URL = `${API_URL}UKForgetPassword`;
export const DIRECTOR_LIST_API = `${API_URL}SearchCompanies.php?companyNumber=`;
export const LINK_ACCOUTING_URL = `${API_URL}CODAT/CreateCodatAccount`;
export const CHANGE_PASSWORD_URL = `${API_URL}UKChangePassword`;

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

export function changePassword(payload) {
  return axios.post(CHANGE_PASSWORD_URL, payload);
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

export function forgotPassword(payload) {
  return axios.post(FORGOT_PASSWORD_URL, payload);
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userDetails");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("dashboardStepNumber");
  localStorage.removeItem("applicationInfo");
  localStorage.removeItem("companyInfo");
  localStorage.removeItem("reviewPersonalInfo");
  localStorage.removeItem("reviewBusinessInfo");
  localStorage.removeItem("reviewAppInfo");
  localStorage.removeItem("businessInfo");
  setStepNo(1);
};

export async function getDirectorList(id) {
  const { data } = await axios.get(`${DIRECTOR_LIST_API}${id}`);
  return data;
}

export async function getLinkToAccountingData(payload) {
  const { data } = await axios.post(`${LINK_ACCOUTING_URL}`, payload);
  console.log(
    "🚀 ~ file: request.js ~ line 58 ~ getLinkToAccountingData ~ data",
    data
  );
  return data;
}

export async function getCompanyID(id) {
  const { data } = await axios.get(`${API_URL}CODAT/${id}/getCompanyId`);
  return data;
}

export async function checkLinkingStatus(id) {
  const { data } = await axios.get(`${API_URL}CODAT/${id}/checkStatus`);
  return data;
}

// https://sales.decimalfactor.com/staging/api/CODAT/6150/getCompanyId
