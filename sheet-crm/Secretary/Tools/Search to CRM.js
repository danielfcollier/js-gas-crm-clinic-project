// *****************************************************************************************
function fromBuscarSheetToCrmSheet() {

  // Definitions
  let BUSCAR_SHEET_COLUMN_WITH_CRMID = "H";
  let BUSCAR_SHEET_ROW_OFFSET = 5;

  // Initialization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ui = SpreadsheetApp.getUi();
  let currentSheet = ss.getActiveSheet();
  let clientSheet = ss.getSheetByName(Client.SheetName);

  // User Interaction
  let message = 'Qual resultado você deseja adicionar?';
  let [isUserNotWantsToContinue, userResponse] = askUser_whatSheWants_andGetResponses(ui, message);
  if (isUserNotWantsToContinue) {
    return false;
  }

  // Response Validation
  let isResponseNotValid = Number(userResponse).toString() === 'NaN';
  if (isResponseNotValid) {
    ui.alert('Atenção: você precisa digitar o número correspondente na coluna "Resultado".');
    return false;
  }

  // Entry Validation
  let isEntryNotValid;
  let dataRowLocation = Number(userResponse) + BUSCAR_SHEET_ROW_OFFSET;
  [isEntryNotValid, message] = $isValidEntry(currentSheet, dataRowLocation);
  if (isEntryNotValid) {
    ui.alert(message);
    return false;
  }

  // Business Validation
  let isCustomerNotValid;
  [isCustomerNotValid, message] = $isValidCustomer(currentSheet, dataRowLocation);
  Logger.log(isCustomerNotValid);
  if (isCustomerNotValid) {
    ui.alert(message);
    return false;
  }

  // Getting Data
  let desiredClientId = currentSheet.getRange(BUSCAR_SHEET_COLUMN_WITH_CRMID + (dataRowLocation)).getValue();
  let dataRow = dataExtraction_searchDataRowInSheetColumnByTerm(clientSheet, Client.Id, desiredClientId);
  let isDataRowNotFound = (dataRow === "error") ||( dataRow === "not found") ;
  if (isDataRowNotFound) {
    ui.alert("Algo de errado aconteceu... tente novamente");
    return false;
  }

  // User Confirmation
  message = 'Agendar: ' + dataRow[Client.FullName - 1] + "?";
  if (askUser_ifSheWants_notToContinue(ui, message)) {
    return false;
  }

  // Action
  let isJobNotDone = dataLoading_copyDataFromClientDataRowToCrmSheet(dataRow);
  if (isJobNotDone) {
    ui.alert("Ops... algo deu errado, tente novamente!");
    return false;
  }
  
  // Successful
  ui.alert("Dados transferidos!");
  Logger.log(dataRow[Client.FullName - 1]);
  return true;
}
// *****************************************************************************************
// Verifies if the customer can acctualy book consultations. 
// Gives an error with the customer has issues with the company.
// *****************************************************************************************
function $isValidCustomer(sheet, dataRowLocation) {

  // Initialization
  let isCustomerNotValid = false;;
  let message;

  // Data Loading
  const customerStatus = sheet.getRange("I" + (dataRowLocation)).getValue();

  // Validation
  if (!customerStatus) {
    message = `Paciente com problemas cadastrais. Entre em contato a gestão. 
    Aguarde antes de responder à paciente.`;
    isCustomerNotValid = true;
  }

  //
  return [isCustomerNotValid, message];
}
// *****************************************************************************************
function $isValidEntry(sheet, dataRowLocation) {

  // Initialization
  let isCustomerNotValid;
  let message;

  // Data Loading
  let customerName = sheet.getRange("C" + (dataRowLocation)).getValue();

  // Validation
  if (customerName === "") {
    message = "Linha vazia! Execute novamente.";
    isCustomerNotValid = false;
  }

  //
  return [isCustomerNotValid, message];
}
// *****************************************************************************************