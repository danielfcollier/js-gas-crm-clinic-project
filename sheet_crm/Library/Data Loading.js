// *****************************************************************************************
// >>> Copy the given Data from Client Sheet to Crm Sheet
// *****************************************************************************************
function dataLoading_copyDataFromClientDataRowToCrmSheet(dataRow) {
  let isJobNotDone;
  try {
    let ss = SpreadsheetApp.getActive();
    let sheet = ss.getSheetByName(crm.SheetName);

    let lastRow = dataExtraction_getLastRow(sheet, "C1:E");
    let dataRowLocation = lastRow + 1;

    sheet.getRange(dataRowLocation, crm.TimeStamp).setValue(new Date());
    sheet.getRange(dataRowLocation, crm.CRMId).setValue("CRM-" + uniqueId());
    sheet.getRange(dataRowLocation, crm.CRMKind).setValue("Seguimento");
    sheet.getRange(dataRowLocation, crm.FullName).setValue(dataRow[Client.FullName - 1]);
    sheet.getRange(dataRowLocation, crm.Birthday).setValue(dataRow[Client.Birthday - 1]);
    sheet.getRange(dataRowLocation, crm.CPF).setValue('=' + '"' + dataRow[Client.CPF - 1] + '"');
    sheet.getRange(dataRowLocation, crm.RG).setValue(dataRow[Client.RG - 1]);
    sheet.getRange(dataRowLocation, crm.Email).setValue(dataRow[Client.Email - 1]);
    sheet.getRange(dataRowLocation, crm.ZipCode).setValue(dataRow[Client.ZipCode - 1]);
    sheet.getRange(dataRowLocation, crm.Phone).setValue('=' + '"' + dataRow[Client.Phone - 1] + '"');
    sheet.getRange(dataRowLocation, crm.Folder).setValue(dataRow[Client.Folder - 1]);
    sheet.getRange(dataRowLocation, crm.CustomerId).setValue(dataRow[Client.CustomerId - 1]);

    isJobNotDone = false;
  }
  catch (err) {
    sendEmailToOwner_errorNotification("[CRM] Library > dataLoading_copyDataFromClientDataRowToCrmSheet()");
    isJobNotDone = true;
  }
  return isJobNotDone;
}
// *****************************************************************************************