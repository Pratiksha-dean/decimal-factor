export const directorFieldNames = {
  NATUREOFCONTROL: "natures_of_control",
  FIRSTNAME: "fullName",
  LASTNAME: "lastName",
  DOB_day: "01",
  DOB_month: "05",
  DOB_year: "1972",
  SHAREHOLDERDOBFULLFORMAT: "ShareHolderDOBFullFormat",
  ADDRESSLINE1: "address_line_1",
  ADDRESSLINE2: "address_line_2",
  POSTALCODE: "postal_code",
  PHONENUMBER: "phonnumber",
  EMAIL: "email",
  EMAILID: "email_id",
  RESIDENTIALSTATUS: "residentialStatus",
  ISPRIMARY: "is_primary",
  HOUSE_NUMBER: "house_number",
  HOUSE_NAME: "house_name",
  COUNTY: "county",
  TOWN: "town",
  LIVINGSINCE: "livingSince",
  STREET: "street",
  CHOOSEADDRESS: "chooseAddress",
  TOTALSHARECOUNT: "totalShareCount",
  ADDRESSLINE1: "address_line_1",
  ADDRESSLINE2: "address_line_2",
  HIDDENSHAREHOLDERID: "HiddenShareHolderId",
  KINDOFSHAREHOLDER: "kindofShareHolder",
  WHENTOMOVETOADDRESS: "livingSince",
  PREVIOUSADDRESS: "previousAddress",
  ADDRESS: "address",
  POSTCODE: "postcode",
  HOUSENUMBER: "houseNumber1",
  HOUSENAME: "houseName",
  PREVIOUSADDSHAREHOLDERID: "shareholderNo",
  SHAREHOLDERARRAY: "ShareHolderArr",
};

export const residentialStatusList = [
  { value: "18001", label: "Owner occupier" },
  { value: "18002", label: "Living with parents, family" },
  { value: "18003", label: "Living with Guardian" },
  { value: "18004", label: "Tenant furnished" },
  { value: "18005", label: "Tenant unfurnished" },
  { value: "18006", label: "Council tenant" },
  { value: "18007", label: "Living with others" },
  { value: "18008", label: "joint owner" },
  { value: "18009", label: "Other" },
  { value: "18010", label: "Owned With Mortgage" },
  { value: "18011", label: "Owner Outright" },
  { value: "18012", label: "Dormitory" },
  { value: "18013", label: "Owner occupier with mortgage" },
  { value: "18014", label: "Employment provided housing" },
  { value: "18015", label: "Owner occupier" },
  { value: "18016", label: "Owner non occupier" },
  { value: "18017", label: "Tenant" },
  { value: "18018", label: "Unknown" },
  { value: "18019", label: "Living Abroad" },
];

export const passwordRegex =
  /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

export const weekDayArray = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const dateSuffix = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
  5: "th",
  6: "th",
  7: "th",
  8: "th",
  9: "th",
  10: "th",
  11: "th",
  12: "th",
  13: "th",
  14: "th",
  15: "th",
  16: "th",
  17: "th",
  18: "th",
  19: "th",
  20: "th",
  21: "st",
  22: "nd",
  23: "rd",
  24: "th",
  25: "th",
  26: "th",
  27: "th",
  28: "th",
  29: "th",
  30: "th",
  31: "st",
};

export const removeDoubleSpace = (name) => {
  return name.replace(/\s{2,}/g, " ");
};

export const formatNumberInput = (input) => {
  var nStr = input + "";
  nStr = nStr.replace(/\,/g, "");
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  input = x1 + x2;
  return input;
};

export const removeComma = (value) => {
  var num1 = value.replace(/[, ]+/g, "").trim();
  return num1;
};

export const numberRegex = /^\d+$/;
