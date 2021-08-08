// *****************************************************************************************
// *****************************************************************************************
function booking_cancelation() {
  /**
   * se for primeira consulta, pode apagar a pasta criada e o cadastro no Asaas.
   */
}
// *****************************************************************************************
// *****************************************************************************************
function booking_adjustCharge() {

}
// *****************************************************************************************
// >>>
// *****************************************************************************************
function booking_changeConsultationDate() {

  // Initialization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui = SpreadsheetApp.getUi();
  let currentSheet = ss.getActiveSheet();
  let crmSheet = ss.getSheetByName(crm.SheetName);

  // Verification
  if (validation_isSheetLocationWrong(currentSheet, option = 2)) {
    ui.alert("Não funciona nessa aba!");
    return false;
  }

  // User Interaction
  let message = "Insira a nova data no formato dd/mm/aaaa (exemplo 1/2/2021).";
  let [isUserNotWantsToContinue, userResponse] = askUser_whatSheWants_andGetResponses(ui, message);

  if (isUserNotWantsToContinue) {
    return false;
  }

  // Input Validation
  let isDateNotValid = !(isValidDate(userResponse))
  if (isDateNotValid) {
    ui.alert("Data inválida! " + message + " Tente novamente!");
    return false;
  }

  // Action
  let dataBulk = dataExtraction_extratDatafromCrmSheet(1);
  let dataRow = dataBulk[0];

  // Confirmation
  let isNotToConfirmDateChage = !askUser_ifDateChange_isConfirmed(ui, dataRow[crm.FullName - 1], userResponse);
  if (isNotToConfirmDateChage) {
    return false;
  }

  // Storing
  crmSheet.getRange(dataRow[crm.Row - 1], crm.ConsultationDate).setValue(userResponse);
  ui.alert("Data da consulta alterada com sucesso!");

  //
  return true;
}
// *****************************************************************************************
function booking_confirmConsultationCity(city) {
  // Initilization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui = SpreadsheetApp.getUi();

  let currentSheet = ss.getActiveSheet();
  let crmSheet = ss.getSheetByName(crm.SheetName);

  // Verification
  if (validation_isSheetLocationWrong(currentSheet, option = 3)) {
    ui.alert("Não funciona nessa aba!");
    return false;
  }

  // Get Data Info
  let dataRowLocation = dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentSheet.getActiveCell().getRow());

  // Confirmation
  let message = `Confirmar ${city} para ` + crmSheet.getRange("E" + dataRowLocation).getValue() + "?";
  if (askUser_ifSheWants_notToContinue(ui, message)) {
    return false;
  }

  // Action
  crmSheet.getRange("C" + dataRowLocation).setValue(city);
  ui.alert("Consulta confirmada!");

  //
  return true;
}
// *****************************************************************************************