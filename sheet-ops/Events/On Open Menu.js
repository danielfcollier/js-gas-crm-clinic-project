// *****************************************************************************************
function onOpen() {
  createMenu();
  putCurrentWeek();
}
// *****************************************************************************************
function createMenu() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('Gestão')
    .addItem('Receipt > Send Selection', 'receipt_sendSelection')
    .addItem('Set View > Current Week', 'putCurrentWeek')
    .addItem('Update Board', 'patchFinanceBoard')
    .addSeparator()
    .addItem('Delete Current Row', 'corrections_deleteSelectedRow')
    .addToUi();
}
// *****************************************************************************************
function putCurrentWeek() {
  const today = new Date();
  const weekNumber = today.getWeek();
  SpreadsheetApp
    .getActive()
    .getSheetByName("Semana")
    .getRange("F2")
    .setValue(weekNumber);
}
// *****************************************************************************************