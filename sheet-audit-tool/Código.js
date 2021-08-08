// *****************************************************************************************
var opex = {
  "Date": 1,
  "Id": 2,
  "Type": 3,
  "Refund": 4,
  "Description": 5,
  "Value": 6,
  "Balance": 7,
  "InstallmentCount": 8,
  "ChargeId": 9
};
// *****************************************************************************************
function postReportResult() {

  let currentSheet, selectedRow, selectedSheetName;

  const RUN_FROM = "SHEET";

  switch(RUN_FROM) {
    case "SHEET":
      currentSheet = SpreadsheetApp.getActive().getActiveSheet();
      selectedRow = currentSheet.getActiveRange().getRow();
      selectedSheetName = currentSheet.getRange(selectedRow, 1).getDisplayValue();;
      break;
    case "EDITOR":
      selectedRow = 2;
      currentSheet = SpreadsheetApp.getActive().getSheetByName("Report");
      selectedSheetName = currentSheet.getRange(selectedRow, 1).getDisplayValue();
      break;
    default:
      selectedRow = 2;
      currentSheet = SpreadsheetApp.getActive().getSheetByName("Report");
      selectedSheetName = currentSheet.getRange(selectedRow, 1).getDisplayValue();
  }

  const selectedSheet = SpreadsheetApp.getActive().getSheetByName(selectedSheetName);
  const lastRow = dataExtraction_getLastRow(selectedSheet, "A7:C");
  const dataBulk = selectedSheet.getRange(7, 1, lastRow, selectedSheet.getMaxColumns()).getValues();

  let matrix = {};

  dataBulk
    .filter(dataRow => dataRow[opex.Value - 1] < 0)
    .filter(dataRow => !(dataRow[opex.Type - 1] === "Transferência" || dataRow[opex.Type - 1] === "Pagamento de conta"))
    .forEach(dataRow => {
      try {
        matrix[dataRow[opex.Type - 1]].push(dataRow[opex.Value - 1])
      }
      catch (err) {
        matrix[dataRow[opex.Type - 1]] = [];
        matrix[dataRow[opex.Type - 1]].push(dataRow[opex.Value - 1])
      }
    })

  let sums = [];

  for (data in matrix) {
    matrix[data] = -matrix[data].reduce(getSum, 0)
    sums.push(matrix[data])
    Logger.log(`${data} > R$${matrix[data]}`)
  }

  const total = sums.reduce(getSum, 0);
  Logger.log(`Total > R$${total}`)

  if (typeof matrix['Taxa de transferência'] === 'undefined') { matrix['Taxa de transferência'] = 0; }
  if (typeof matrix['Taxa de mensageiria'] === 'undefined') { matrix['Taxa de mensageiria'] = 0; }

  const subTotal = total - matrix['Taxa de transferência'] - matrix['Taxa de mensageiria'];

  Logger.log(`Taxas de Transferência > R$${matrix['Taxa de transferência']}`)
  Logger.log(`Taxas de Mensageiria > R$${matrix['Taxa de mensageiria']}`)

  currentSheet.getRange(selectedRow, 4).setValue(total);
  currentSheet.getRange(selectedRow, 5).setValue(matrix['Taxa de transferência']);
  currentSheet.getRange(selectedRow, 6).setValue(matrix['Taxa de mensageiria']);
  currentSheet.getRange(selectedRow, 7).setValue(subTotal);

}
// *****************************************************************************************
function getSum(total, num) {
  return (total * 1000 + num * 1000) / 1000;
}
// *****************************************************************************************