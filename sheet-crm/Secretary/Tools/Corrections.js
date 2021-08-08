// *****************************************************************************************
function corrections_numbertoString() {

  // Initialization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui = SpreadsheetApp.getUi();
  let currentSheet = ss.getActiveSheet();

  // Verification
  if (validation_isSheetLocationWrong(currentSheet, option = 1)) {
    ui.alert("Não funciona nessa aba!");
    return false;
  }

  // User Interaction
  let message = "Insira o número com zeros que você precisa corrigir:";
  let [isUserNotWantsToContinue, userResponse] = askUser_whatSheWants_andGetResponses(ui, message);
  if (isUserNotWantsToContinue) {
    return false;
  }

  // Action
  currentSheet.getCurrentCell().setValue('="' + userResponse + '"');

  // Update
  SpreadsheetApp.flush();

  // Further Actions
  corrections_applyDataTransformation();
  //
  return true;
}
// *****************************************************************************************
function corrections_askForRowDeletion() {

  // Initialization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui = SpreadsheetApp.getUi();
  let currentSheet = ss.getActiveSheet();
  let dataRow;

  // Verification
  if (validation_isSheetLocationWrong(currentSheet, option = 3)) {
    ui.alert("Não funciona nessa aba!");
    return false;
  }

  try {
    // Data Loading
    let dataRowLocation = dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentSheet.getActiveCell().getRow());
    dataRow = dataExtraction_getDataRow("crm", "row", dataRowLocation);
    $tempCreateCRMIdIfNotCreated(dataRow);

    // User Confirmation
    let message = "Solicitar exclusão para: " + dataRow[crm.FullName - 1] + "?";
    if (askUser_ifSheWants_notToContinue(ui, message)) {
      return false;
    }

    // Action
    MailApp.sendEmail(ownerEmail, "Apagar linha @Agendamentos, CRMId: " + dataRow[crm.CRMId - 1], "");
  }
  catch (err) {
    ui.alert("Ops... tente novamente!");
    Logger.log("Error: " + err.toString());
    return false;
  }

  // Successful
  ui.alert("Solicitação confirmada!");
  Logger.log(dataRow[crm.FullName - 1] + " > " + dataRow[crm.CRMId - 1]);
  return true;
}
// *****************************************************************************************
// *****************************************************************************************
// *****************************************************************************************
// >>> NEEDS IMPROVING
// *****************************************************************************************
// *****************************************************************************************
// *****************************************************************************************
function corrections_applyDataTransformation() {

  // Initialization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui = SpreadsheetApp.getUi();
  let currentSheet = ss.getActiveSheet();

  // Verification
  if (validation_isSheetLocationWrong(currentSheet, option = 1)) {
    ui.alert("Não funciona nessa aba!");
    return false;
  }

  // Data Loading
  let dataRowLocation = dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentSheet.getActiveCell().getRow());
  //let dataRow = dataExtraction_getDataRow("crm", "row", dataRowLocation);


  // Transformation
  let fullName = currentSheet.getRange(dataRowLocation, crm.FullName).getValue();
  let cpf = currentSheet.getRange(dataRowLocation, crm.CPF).getValue();
  let email = currentSheet.getRange(dataRowLocation, crm.Email).getValue();
  let zipcode = currentSheet.getRange(dataRowLocation, crm.ZipCode).getValue();
  let phone = currentSheet.getRange(dataRowLocation, crm.Phone).getValue();

  // Registration
  try {
    currentSheet.getRange(dataRowLocation, crm.FullName).setValue(formatOnEntry(fullName, "name"));
    currentSheet.getRange(dataRowLocation, crm.CPF).setValue(formatOnEntry(formatCPF(cpf), "numberToString"));
    currentSheet.getRange(dataRowLocation, crm.Email).setValue(formatEmail(email));
    currentSheet.getRange(dataRowLocation, crm.ZipCode).setValue(formatOnEntry(formatZipCode(zipcode), "numberToString"));
    currentSheet.getRange(dataRowLocation, crm.Phone).setValue(formatOnEntry(formatPhone(phone), "numberToString"));
  }
  catch (err) {
    ui.alert("Ops... aconteceu um erro indevido, entre em contato com o suporte.");
    sendEmailToOwner_errorNotification("[CRM] Secretary > corrections_applyDataTransformation()");
  }

  // Successful
  ui.alert("Sucesso!");
  Logger.log(fullName);
  //Logger.log(dataRow[crm.FullName - 1] + " > " + dataRow[crm.CRMId - 1]);
}
// *****************************************************************************************
function corrections_noPaymentType(crmSheet, dataRow) {

  // Initialization
  let isValidNoPayment = (dataRow[crm.PaymentType - 1] === "Autorizada") && (dataRow[crm.ConsultationValue - 1] === 0);

  // Verification
  if (isValidNoPayment) {
    dataRow[crm.PaymentType - 1] = "Sem Cobrança";
    crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentType).setValue(dataRow[crm.PaymentType - 1]);
  }

  //
  return dataRow;
}
// *****************************************************************************************
function $tempCreateCRMIdIfNotCreated(dataRow) {

  // Initialization
  let ss = SpreadsheetApp.getActive();
  let crmSheet = ss.getSheetByName(crm.SheetName);

  // Action
  let isNotThereCRMId = dataRow[crm.CRMId - 1] === "";
  if (isNotThereCRMId) {
    let crmId = "CRM-" + uniqueId();
    crmSheet.getRange(dataRow[crm.Row - 1], crm.CRMId).setValue(crmId);
  }
}
// *****************************************************************************************