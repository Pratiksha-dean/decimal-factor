import axios from "axios";
import { setStepNo } from "./component/requestaquote/components/request-leftpanel";
export const API_URL = process.env.REACT_APP_PROD_API_URL;
export const SEARCH_COMPANY_URL = `${API_URL}api/SearchCompanies.php?SearchValue=`;
export const CREATE_ACCOUNT_URL = `${API_URL}api/CreateCustomerForUK`;
export const USER_LOGIN_URL = `${API_URL}api/UKCustomerLogin`;
export const DASHBOARD_DATA_URL = `${API_URL}api/GetLeadMaster/`;
export const VERIFY_ACCOUNT_URL = `${API_URL}api/UKCustomerVerify`;
export const FORGOT_PASSWORD_URL = `${API_URL}api/UKForgetPassword`;
export const DIRECTOR_LIST_API = `${API_URL}api/SearchCompanies.php?companyNumber=`;
export const LINK_ACCOUTING_URL = `${API_URL}api/CODAT/CreateCodatAccount`;
export const CHANGE_PASSWORD_URL = `${API_URL}api/UKPasswordChange`;
export const USER_DETAILS_URL = `${API_URL}api/getUkCustomerDetails/`;
export const UPDATE_USER_DETAILS_URL = `${API_URL}api/UpdateCustomerForUK/`;

export const RESET_PASSWORD_URL = `${API_URL}api/UKChangePassword`;

// app-uat.codat.io/
export const CODAT_BASE_URL = process.env.REACT_APP_PROD_CODAT_BASE_URL;

export const FINANCIAL_SERVICE_URL = `${API_URL}api/accountScore/5944/FinancialServices`;
export const INCOME_ANALYSIS_URL = `${API_URL}api/accountScore/5944/IncomeAnalysis`;
export const REGULAR_OUTGOINGS_URL = `${API_URL}api/accountScore/5944/RegularOutgoings`;
export const EVENTFEED_URL = `${API_URL}api/accountScore/5944/EventFeed`;
export const UPDATE_LOGIN_TIMES_URL = `${API_URL}api/UpdateCustomerLoginTimes/`;
export const UPLOAD_DOCUMENTS = `${API_URL}api/UKLeadattachments/`;
export const GET_DOCUMENTS = `${API_URL}api/getLeadMasterAttachmentsUK/`;
export const GET_ALL_DOCUMENTS = `${API_URL}api/GetLeadMasterAttachments/`;

export const GET_DOCUMENTS_BANK_STMT = `${API_URL}api/getLeadMasterAttachments/`;
export const DELETE_DOCUMENTS = `${API_URL}api/DeleteLeadMasterAttachment/`;
export const GET_BUSINESS_ACCOUNT_SCORE = `${API_URL}api/creditsafe/company/`;

export const UPLOAD_FILES = `${API_URL}api/LeadAttachmentsFile/`;

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
  localStorage.removeItem("provideConcentData");
  localStorage.removeItem("activeTabIndex");
  localStorage.removeItem("uploadBankStatement");
  localStorage.removeItem("open");
  setStepNo(1);
};

export async function getDirectorList(id) {
  const { data } = await axios.get(`${DIRECTOR_LIST_API}${id}`);
  return data;
}

export async function getLinkToAccountingData(payload) {
  const { data } = await axios.post(`${LINK_ACCOUTING_URL}`, payload);
  return data;
}

export async function getCompanyID(id) {
  const { data } = await axios.get(`${API_URL}api/CODAT/${id}/getCompanyId`);
  return data;
}

export async function checkAccountingStatus(id) {
  const { data } = await axios.get(`${API_URL}api/CODAT/${id}/checkStatus`);
  return data;
}

export async function getUserDetailsApi(id) {
  const { data } = await axios.get(`${USER_DETAILS_URL}${id}`);
  return data;
}

export async function updateUpdateCustomerInfo(payload, id) {
  const { data } = await axios.post(
    `${UPDATE_USER_DETAILS_URL}${id}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

export async function getBankingFinancialServices(id) {
  const { data } = await axios.get(
    `${API_URL}api/accountScore/${id}/FinancialServices`
  );
  return data;
}

export async function getBankingIncome(id) {
  const { data } = await axios.get(
    `${API_URL}api/accountScore/${id}/IncomeAnalysis`
  );
  return data;
}

export async function getRegularOutgoings(id) {
  const { data } = await axios.get(
    `${API_URL}api/accountScore/${id}/RegularOutgoings`
  );
  return data;
}

export async function getEventFeed(id) {
  const { data } = await axios.get(
    `${API_URL}api/accountScore/${id}/EventFeed`
  );

  return data;
}

export async function getAccountScore(id, payload) {
  const { data } = await axios.post(
    `${API_URL}api/leadUK/${id}/generateConsentForAccountScore`,
    payload
  );
  return data;
}

export async function checkBankingStatus(id) {
  const { data } = await axios.get(
    `${API_URL}api/leadUK/${id}/checkObvAccountScoreConsentStatus`
  );
  return data;
}

export async function bankingInsightsDownloadFile(fileType, id) {
  const { data } = await axios.get(
    `${API_URL}api/accountScore/downloadfile/${fileType}/${id}`
  );
  return data;
}

export async function updateLoginTimes(payload) {
  const { data } = await axios.post(UPDATE_LOGIN_TIMES_URL, payload);
  return data;
}

export async function uploadDocuments(payload, id) {
  const { data } = await axios.post(`${UPLOAD_DOCUMENTS}${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function getDocuments(id) {
  const { data } = await axios.get(`${GET_DOCUMENTS}${id}`);
  return data;
}

export async function getAllDocuments(id) {
  const { data } = await axios.get(`${GET_ALL_DOCUMENTS}${id}`);
  return data;
}

export async function uploadFiles(id, payload) {
  console.log("🚀 ~ file: request.js:205 ~ uploadFiles ~ payload", payload);
  const { data } = await axios.post(`${UPLOAD_FILES}${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function getDocumentBankStatements(id) {
  const { data } = await axios.get(`${GET_DOCUMENTS_BANK_STMT}${id}`);
  return data;
}

export async function deleteDocuments(id) {
  const { data } = await axios.post(`${DELETE_DOCUMENTS}${id}`);
  return data;
}

export async function getBusinessAccountScore(id) {
  const { data } = await axios.get(
    `${GET_BUSINESS_ACCOUNT_SCORE}${id}/creditSafeReportUK`
  );
  return data;
}

export async function downloadBusinessAccountScore(id) {
  const { data } = await axios.get(
    `${GET_BUSINESS_ACCOUNT_SCORE}${id}/creditSafeReportUKPDF`
  );
  return data;
}
