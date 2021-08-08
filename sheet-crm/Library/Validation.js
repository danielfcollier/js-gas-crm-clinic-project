// *****************************************************************************************
// >>> Where the User can Perform Actions
// *****************************************************************************************
function validation_isSheetLocationWrong(sheet, option = 3) {
  let sheetName = sheet.getSheetName();

  let isSheetLocationNotValid = false;

  switch (option) {
    case 1:
      isSheetLocationNotValid = !(sheetName === crm.SheetName);
      break;
    case 2:
      isSheetLocationNotValid = !(sheetName === "Semana");
      break;
    default:
      isSheetLocationNotValid = !(sheetName === crm.SheetName || sheetName === CRM.SheetName || sheetName === "Semana");
  }

  return isSheetLocationNotValid ? true : false;
}
  // *****************************************************************************************