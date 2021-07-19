// *****************************************************************************************
function dataExtraction_extratDatafromCrmSheet(option = 10) {
  // Initialization
  let dataBulk, dataRow, dataRowLocation;
  let crmSheet =  SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
  let currentSheet = SpreadsheetApp.getActive().getActiveSheet();

  // Options
  switch (option) {
    case 1: // User Selection
      let currentRowLocation = currentSheet.getActiveCell().getRow()
      dataRowLocation = dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentRowLocation)
      dataRow = dataExtraction_getDataRow("crm", "row", dataRowLocation);
      dataBulk = [dataRow];
      break;
    case 2: // Bulk Action
      let lastRow = dataExtraction_getLastRow(crmSheet, "B1:E");
      dataBulk = crmSheet.getRange("A2" + ":" + crm.MaxRange + lastRow).getValues();
      break;
    default: // For Unit Testing
      dataRow = [new Date(2021, (2 - 1), 23), 'CRM-72865759-dfb8-74a5-1603-4d6b4cc367bc', 'Florianópolis',
        '1ª Consulta', 'Daniel Collier', new Date(1989, (9 - 1), 12), '00321278127', '6210487',
        'danielfcollier@gmail.com', '88060402', '+5648992858928', new Date(2021, (6 - 1), 1), '',
        'Online', 'Beija-flor', 'Autorizada', 600, 3, '', '', '', 'https://wa.me/5648992858928',
        '', '', ''];
      dataBulk = [dataRow];
  }
  return dataBulk;
}
// *****************************************************************************************
function dataExtraction_extratDatafromCRMSheet(option = 10) {
  // Initialization
  let dataBulk, dataRow, dataRowLocation;
  let crmSheet = SpreadsheetApp.getActive().getSheetByName(CRM.SheetName);
  let currentSheet = SpreadsheetApp.getActive().getActiveSheet();

  // Options
  switch (option) {
    case 1: // User Selection
      let currentRowLocation = currentSheet.getActiveCell().getRow()
      dataRowLocation = dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentRowLocation);
      dataRow = dataExtraction_getDataRow("CRM", "row", dataRowLocation);
      dataBulk = [dataRow];
      break;
    case 2: // Bulk Action
      let lastRow = dataExtraction_getLastRow(crmSheet, "B1:E");
      dataBulk = crmSheet.getRange("A2" + ":" + crm.MaxRange + lastRow).getValues();
      break;
    default: // For Unit Testing
      dataRow = [new Date(2021, (2 - 1), 23), 'CRM-72865759-dfb8-74a5-1603-4d6b4cc367bc', 'Florianópolis',
        '1ª Consulta', 'Daniel Collier', new Date(1989, (9 - 1), 12), '00321278127', '6210487',
        'danielfcollier@gmail.com', '88060402', '+5648992858928', new Date(2021, (6 - 1), 1), '',
        'Online', 'Beija-flor', 'Autorizada', 600, 3, '', '', '', 'https://wa.me/5648992858928',
        '', '', ''];
      dataBulk = [dataRow];
  }
  return dataBulk;
}
// *****************************************************************************************
// >>> Get True Last Row for a Given Range.
//
//  Credits: Learn Google SpreadSheets
// *****************************************************************************************
function dataExtraction_getLastRow(sheet, rangeA1String) {

  let dataRange = sheet.getRange(rangeA1String).getValues();

  let lastRowIndex;

  for (let i = dataRange.length - 1; i >= 0; i--) {
    lastRowIndex = i;
    let row = dataRange[i];
    let isBlank = row.every(function (c) { return c == ""; });
    if (!isBlank) {
      break;
    }
  }

  let lastRow = lastRowIndex + 1;

  return lastRow;
}
// *****************************************************************************************
// >>> Get Data Row from Search Term in a Given Sheet
// *****************************************************************************************
function dataExtraction_searchDataRowInSheetColumnByTerm(sheet, searchColumn, term) {
  try {
    let lastRow = dataExtraction_getLastRow(sheet, "A1:B" + sheet.getMaxRows());

    let searchVector = sheet.getRange(2, searchColumn, lastRow - 1).getValues();
    let searchVectorTransposed = transpose2(searchVector);
    searchVector = searchVectorTransposed[0];

    let searchRow = searchVector.findIndex(i => i === term) + 2;

    let dataRow = sheet.getRange(searchRow, 1, 1, sheet.getMaxColumns()).getValues();

    return dataRow[0];
  }
  catch (err) {
    sendEmailToOwner_errorNotification("[CRM] Library> dataExtraction_searchDataRowInSheetColumnByTerm()");
    return "error";
  }
}
// *****************************************************************************************
// >>> Get the Client Data from Client Sheet by Full Name search.
// *****************************************************************************************
function dataExtraction_getClientDataFromClientSheetByFullNameSearch(clientDataFieldColumn, fullName) {
  try {
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(Client.SheetName);

    let dataRow = dataExtraction_searchDataRowInSheetColumnByTerm(sheet, Client.FullName, fullName)
    let requestedClientData = dataRow[clientDataFieldColumn - 1];

    return requestedClientData;
  }
  catch (err) {
    sendEmailToOwner_errorNotification("[CRM] Library > dataExtraction_getClientDataFromClientSheetByFullNameSearch()");
    return false;
  }
}
// *****************************************************************************************
// >>> Find Data Row Location at the Crm Sheet given the Current Sheet and Row Location
// *****************************************************************************************
function dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentRowLocation) {
  try {
    let currentSheetName = currentSheet.getName();
    return currentSheet.getRange(configSheets_ColumnIdentifierLocation[currentSheetName] + currentRowLocation).getValue();
  }
  catch (err) {
    sendEmailToOwner_errorNotification("[CRM] > dataExtraction_findDataRowLocationAtCrmSheet()");
    return false;
  }
}
// *****************************************************************************************
// >>> Select Data for a given Row in a given Data Frame (object based on id or crm row position).
// TO DELETE
function dataExtraction_getDataRow(object, argType, rowOrId) {

  // Initialization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet;
  let myObject;

  try {
    myObject = eval(object);
  }
  catch (err) {
    sendEmailToOwner_errorNotification("[CRM] Library > dataExtraction_getDataRow()");
    return "Object Error: it has not been found.";
  }

  sheet = ss.getSheetByName(myObject.SheetName);

  if (sheet == null) {
    sheet = ss.getSheetByName(myObject.SheetNameAlternative);
  }

  if (sheet == null) {
    return "Object Error: it has not been found.";
  }

  // Eval how to and perform the data gathering
  switch (argType) {
    case "row":
      try {
        let myData = sheet.getRange("A" + rowOrId + ":" + myObject.MaxRange + rowOrId).getValues();

        return myData[0];
      }
      catch (err) {
        //do nothing for a while...
      }
      break;

    case "id":
      try {
        let myData = searchDatabaseById(sheet, rowOrId);

        return myData[0];
      }
      catch (err) {
        //do nothing for a while...
      }
      break;

    default:
      sendEmailToOwner_errorNotification("[CRM] Library > dataExtraction_getDataRow()");
      return false;
  }
  return false;
}
// *****************************************************************************************