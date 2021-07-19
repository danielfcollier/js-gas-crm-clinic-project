// *****************************************************************************************
function patchCustomersFromCrmSheetToDatabase() {
  moveConfirmedCustomersFromCrmSheetToDatabase();
  moveCanceledCustomersFromCrmSheetToDatabase();
}
// *****************************************************************************************
function moveConfirmedCustomersFromCrmSheetToDatabase() {
  const dataBulk = dataExtraction_extratDatafromCrmSheet(option = 2);

  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
  const dbSheet = SpreadsheetApp.openById(SheetIdDatabase).getSheetByName(CRM.SheetName);

  dataBulk
    .filter(dataRow => {
      const isNotRowCopied = !(dataRow[crm.DeleteFlag - 1]);
      const isConsultationConfirmed = (dataRow[crm.CRMStatus - 1] !== "Cancelada");
      const isPaymentConfirmed = (dataRow[crm.StatusPayment - 1] === "Confirmado");
      return isNotRowCopied && isConsultationConfirmed && isPaymentConfirmed && isConsultationDone(dataRow[crm.ConsultationDate - 1]);
    })
    .reverse()
    .forEach(dataRow => {

      Logger.log(dataRow);

      let currentRow = dataRow[crm.Row - 1];

      dataRow[crm.CPF - 1] = '="' + dataRow[crm.CPF - 1] + '"';
      dataRow[crm.Phone - 1] = '="' + dataRow[crm.Phone - 1] + '"';
      dataRow[crm.ZipCode - 1] = '="' + dataRow[crm.ZipCode - 1] + '"';
      dataRow[crm.Row - 1] = "";

      dbSheet.appendRow(dataRow);

      crmSheet.getRange(currentRow, crm.DeleteFlag).setValue(true);
    });
}
// *****************************************************************************************
function moveCanceledCustomersFromCrmSheetToDatabase() {
  const dataBulk = dataExtraction_extratDatafromCrmSheet(option = 2);

  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
  const dbSheet = SpreadsheetApp.openById(SheetIdDatabase).getSheetByName(CRM.SheetName);

  dataBulk
    .filter(dataRow => {
      const isNotRowCopied = !(dataRow[crm.DeleteFlag - 1]);
      const isConsultationCanceled = (dataRow[crm.CRMStatus - 1] === "Cancelada");
      const isPaymentNotConfirmed = (dataRow[crm.StatusPayment - 1] !== "Confirmado");
      return isNotRowCopied && isConsultationCanceled && isPaymentNotConfirmed;
    })
    .reverse()
    .forEach(dataRow => {

      Logger.log(dataRow);

      let currentRow = dataRow[crm.Row - 1];

      dataRow[crm.CPF - 1] = '="' + dataRow[crm.CPF - 1] + '"';
      dataRow[crm.Phone - 1] = '="' + dataRow[crm.Phone - 1] + '"';
      dataRow[crm.ZipCode - 1] = '="' + dataRow[crm.ZipCode - 1] + '"';
      dataRow[crm.Row - 1] = "";

      dbSheet.appendRow(dataRow);

      crmSheet.getRange(currentRow, crm.DeleteFlag).setValue(true);
    });
}
// *****************************************************************************************
function deleteMovedCrmEntries() {

  const dataBulk = dataExtraction_extratDatafromCrmSheet(option = 2);
  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);

  let deleteStatus = dataBulk
    .map(deletionRules)
    .reverse()
    .map(rowDeletionRoutine, crmSheet);

  let counter = deleteStatus
    .reduce((total, currentValue) => total + currentValue, 0);

  Logger.log(`Number of row(s) deleted: ${counter}`)
  
  // ***************************************************************************************
  function deletionRules(dataRow) {
    return dataRow[crm.DeleteFlag - 1];
  }
  // ***************************************************************************************
  function rowDeletionRoutine(isBusinessRules, index, array) {
    if (isBusinessRules) {
      let rowPosition = array.length - index + 1;
      this.deleteRow(rowPosition);
      return 1;
    }
    return 0;
  }
  // ***************************************************************************************
}
// *****************************************************************************************
function isToday(dateArg) {
  const today = new Date();

  const todayString = Utilities.formatDate(today, gmtDayTime, "yyyy-MM-dd");
  const dateString = Utilities.formatDate(dateArg, gmtDayTime, "yyyy-MM-dd");

  return (todayString === dateString) ? true : false;
}
// *****************************************************************************************
function isConsultationDone(consultationDate) {
  const today = new Date();

  const todayString = Utilities.formatDate(incrementDate(today, -7), gmtDayTime, "yyyy-MM-dd");
  const dateString = Utilities.formatDate(consultationDate, gmtDayTime, "yyyy-MM-dd");

  return (dateString < todayString) ? true : false;
}
// *****************************************************************************************