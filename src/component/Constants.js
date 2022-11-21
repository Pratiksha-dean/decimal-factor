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

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL;
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

