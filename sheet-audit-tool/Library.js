// *****************************************************************************************
function dataExtraction_getLastRow(sheet, rangeA1String) {

  let dataRange = sheet.getRange(rangeA1String).getValues();

  let lastRowIndex;

  for (let i = dataRange.length - 1; i >= 0; i--) {
    lastRowIndex = i;
    let row = dataRange[i];
    let isBlank = row.every(function (c) { return c == ""; });
    if (!isBlank) {
      break;
    }
  }

  let lastRow = lastRowIndex + 1;

  return lastRow;
}
// *****************************************************************************************