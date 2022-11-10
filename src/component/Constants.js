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
  PHONENUMBER: "phon_number",
  EMAIL: "email",
  RESIDENTIALSTATUS: "residentialStatus",
  ISPRIMARY: "is_primary",
  HOUSE_NUMBER: "house_number",
  HOUSE_NAME: "house_name",
  COUNTRY: "county",
  TOWN: "town",
  LIVINGSINCE: "livingSince",
  STREET: "street",
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
