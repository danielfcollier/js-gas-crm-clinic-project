// *****************************************************************************************
function payment_manualSentConfirmation() {
    payment_manualSelectionAction("Enviado");
}
// *****************************************************************************************
function payment_manualConfirmation() {
    payment_manualSelectionAction("Confirmado");
}
// *****************************************************************************************
function payment_cleanField() {
    payment_manualSelectionAction("");
}
// *****************************************************************************************
function payment_setError() {
    payment_manualSelectionAction("Erro");
}
// *****************************************************************************************
function payment_manualSelectionAction(arg) {
    // Initialization
    const crmSheet = SpreadsheetApp.openById(SheetIdDatabase).getSheetByName(CRM.SheetName);
    const currentSheet = SpreadsheetApp.getActive().getActiveSheet();
    const ui = SpreadsheetApp.getUi();

    // Verification
    if (validation_isSheetLocationWrong(crmSheet, option = 3)) {
        ui.alert("Não funciona nessa aba!");
        return false;
    }

    // Selection
    let dataRowLocation = dataExtraction_findDataRowLocationAtCrmSheet(currentSheet, currentSheet.getActiveCell().getRow());

    // Action
    crmSheet.getRange(dataRowLocation, crm.StatusPayment).setValue(arg);

    Logger.log(dataRowLocation);
}
// *****************************************************************************************