// *****************************************************************************************
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Funções")
    .addItem("Run Report", "postReportResult")
    .addItem("Sort Sheet","formatSheet")
    .addToUi();
}
// *****************************************************************************************
function formatSheet() {
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({column: 1, ascending: false});
};
// *****************************************************************************************