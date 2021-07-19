
// *****************************************************************************************
function receipt_sendInBulk() {
  receipt_send(option = 2);
}
// *****************************************************************************************
function receipt_sendSelection() {
  receipt_send(option = 1);
}
// *****************************************************************************************
function receipt_send(option) {

  // Initialization
  let isErrorState;
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let currentSheet = ss.getActiveSheet();
  let crmSheet = SpreadsheetApp.openById(SheetIdDatabase).getSheetByName(CRM.SheetName);

  // Verification
  /*
  if (option === 1 && validation_isSheetLocationWrong(currentSheet)) {
    const ui = SpreadsheetApp.getUi();
    ui.alert("Não funciona nessa aba!");
    return false;
  }
  */

  // Template
  let receiptId;
  receiptTemplate = DriveApp.getFileById(receiptTemplateId);

  // Data Loading
  let dataBulk = dataExtraction_extratDatafromCRMSheet(option);

  // Temp Folder Creation
  let tempFolder = useful_createTempFolder();

  // Action
  let counter = 0;

  dataBulk.forEach(dataRow => {
    isErrorState = false;
    if (option === 1 || $receipt_isSendingAllowed(dataRow, counter)) {
      try {
        Logger.log(`Send to: ${dataRow[crm.FullName - 1]} > ${formatDate(dataRow[crm.ConsultationDate - 1])} > R$${dataRow[crm.ConsultationValue - 1]},00`)
        receiptId = $receipt_create(dataRow, tempFolder);
        isErrorState = (receiptId === true) ? true : false;
        [dataRow, isErrorState] = isErrorState ? [dataRow, isErrorState] : $receipt_sendEmail(dataRow, receiptId);
        counter += $receipt_register(dataRow, crmSheet);
        //counter = (option === 1) ? counter + 1 : counter + $receipt_register(dataRow, crmSheet);
      }
      catch (err) {
        Logger.log("Error: " + err.toString());
      }
    }
  });

  // Temp Folder Deletion
  useful_deleteTempFolder(tempFolder);

  return true;
}
// *****************************************************************************************