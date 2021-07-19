// *****************************************************************************************
function formatSheets() {
  formatFloraisSheet();
  formatReceitasSheet();
}
// *****************************************************************************************
function formatFloraisSheet() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Florais");

  sheet.getRange('A:A').activate();
  sheet.getActiveRangeList().setHorizontalAlignment('center');

  sheet.getRange('C:C').activate();
  sheet.getActiveRangeList().setHorizontalAlignment('center');

  sheet.getRange('D:D').activate();
  sheet.getActiveRangeList().setHorizontalAlignment('right');

  sheet.getRange('1:1').activate();
  sheet.getActiveRangeList().setHorizontalAlignment('center');

  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  sheet.getActiveRange().offset(1, 0, sheet.getActiveRange().getNumRows() - 1).sort({ column: 1, ascending: false });
};
// *****************************************************************************************
function formatReceitasSheet() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Receitas");
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  sheet.getActiveRange().offset(1, 0, sheet.getActiveRange().getNumRows() - 1).sort({ column: 1, ascending: true });
};
// *****************************************************************************************