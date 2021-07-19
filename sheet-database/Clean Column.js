// *****************************************************************************************
function cleanColumn() {
  const crmSheet = SpreadsheetApp.getActive().getSheetByName("CRM");
  const arrayLength = crmSheet.getMaxRows() - 1;
  crmSheet.getRange(2, crm.Row, arrayLength).setValues(Array(arrayLength).fill([""]));
}
// *****************************************************************************************