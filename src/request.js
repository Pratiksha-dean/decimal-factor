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
export const CHANGE_PASSWORD_URL = `${API_URL}UKPasswordChange`;
export const USER_DETAILS_URL = `${API_URL}getUkCustomerDetails/`;
export const UPDATE_USER_DETAILS_URL = `${API_URL}UpdateCustomerForUK/`;

export const RESET_PASSWORD_URL = `${API_URL}UKChangePassword`;

export const FINANCIAL_SERVICE_URL = `${API_URL}accountScore/5944/FinancialServices`;
export const INCOME_ANALYSIS_URL = `${API_URL}accountScore/5944/IncomeAnalysis`;
export const REGULAR_OUTGOINGS_URL = `${API_URL}accountScore/5944/RegularOutgoings`;
export const EVENTFEED_URL = `${API_URL}accountScore/5944/EventFeed`;

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

export function resetPassword(payload) {
  return axios.post(RESET_PASSWORD_URL, payload);
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
  localStorage.removeItem("personalInfo");
  localStorage.removeItem("applicationInfo");
  localStorage.removeItem("companyInfo");
  localStorage.removeItem("reviewPersonalInfo");
  localStorage.removeItem("reviewBusinessInfo");
  localStorage.removeItem("reviewAppInfo");
  localStorage.removeItem("businessInfo");
  localStorage.removeItem("directorData");
  localStorage.removeItem("merchantDirectorData");
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

export async function checkAccountingStatus(id) {
  const { data } = await axios.get(`${API_URL}CODAT/${id}/checkStatus`);
  return data;
}

export async function getUserDetailsApi(id) {
  const { data } = await axios.get(`${USER_DETAILS_URL}${id}`);
  return data;
}

export async function updateUpdateCustomerInfo(payload, id) {
  const { data } = await axios.post(`${UPDATE_USER_DETAILS_URL}${id}`, payload);
  console.log(
    "🚀 ~ file: request.js ~ line 58 ~ getLinkToAccountingData ~ data",
    data
  );
  return data;
}

export async function getBankingFinancialServices(id) {
  const { data } = await axios.get(
    `${API_URL}accountScore/${id}/FinancialServices`
  );
  return data;
}

export async function getBankingIncome(id) {
  const { data } = await axios.get(
    `${API_URL}accountScore/${id}/IncomeAnalysis`
  );
  return data;
}

export async function getRegularOutgoings(id) {
  const { data } = await axios.get(
    `${API_URL}accountScore/${id}/RegularOutgoings`
  );
  return data;
}

export async function getEventFeed(id) {
  const { data } = await axios.get(`${API_URL}accountScore/${id}/EventFeed`);

  return data;
}

export async function getAccountScore(id, payload) {
  const { data } = await axios.post(
    `${API_URL}leadUK/${id}/generateConsentForAccountScore`,
    payload
  );
  return data;
}

export async function checkBankingStatus(id) {
  const { data } = await axios.get(
    `${API_URL}leadUK/${id}/checkObvAccountScoreConsentStatus`
  );
  return data;
}

export async function bankingInsightsDownloadFile(fileType, id) {
  const { data } = await axios.get(
    `${API_URL}accountScore/downloadfile/${fileType}/${id}`
  );
  return data;
}
