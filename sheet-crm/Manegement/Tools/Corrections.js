// *****************************************************************************************
function corrections_deleteSelectedRow() {

  // Initialization
  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
  const currentRow= SpreadsheetApp.getActive().getActiveSheet().getActiveRange().getRow();
  
  // Deletion
  crmSheet.deleteRow(currentRow);

  // Logging
  Logger.log(`Row Deleted is ${currentRow}. Current data:`)
  Logger.log(dataExtraction_extratDatafromCrmSheet(1));
}
// *****************************************************************************************
function corrections_confirmTransferPayment(arg) {
  // Initialization
  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
  const currentSheet = SpreadsheetApp.getActive().getActiveSheet();
  const ui = SpreadsheetApp.getUi();

  // Verification
  if (validation_isSheetLocationWrong(currentSheet, option = 3)) {
    ui.alert("Não funciona nessa aba!");
    return false;
  }

  // Selection
  const dataRowLocation = dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentSheet.getActiveCell().getRow());

  // User Interaction: Get Payment Date
  const message = "Informe a data do pagamento formato dia/mês/ano:";
  const [isUserNotWantsToContinue, userResponse] = askUser_whatSheWants_andGetResponses(ui, message);
  const paymentDate = userResponse;

  // Validation: Payment Date
  const isDateNotValid = !(isValidDate(paymentDate));
  if (isUserNotWantsToContinue) {
    return ["", ""];
  }
  else if (isDateNotValid) {
    message = "Data inválida! " + "Insira a nova data no formato dd/mm/aaaa (exemplo 1/2/2021)." + " Tente novamente!";
    ui.alert(message);
    return false;
  }

  // Action
  if (dataRow[crm.PaymentType - 1] !== "Autorizada") {
    consultationValue = businessRules_consultationPrice(dataRow);
    crmSheet.getRange(dataRow[crm.Row - 1], crm.ConsultationValue).setValue(consultationValue);
  }
  crmSheet.getRange(dataRow[crm.Row - 1], crm.StatusPayment).setValue("Confirmado");

  const paymentId = dataRow[crm.PaymentId - 1];
  if (paymentId !== "noPaymentId") {
    crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentId).setValue("noPaymentId");
    if (paymentId !== "") { asaasApi_deletePayment(paymentId); }
  }

  crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentWatch).setValue("Received");
  crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentDate).setValue(paymentDate);
  crmSheet.getRange(dataRow[crm.Row - 1], crm.OpexPayment).setValue(0);

  // Done
  return true;
}
// *****************************************************************************************