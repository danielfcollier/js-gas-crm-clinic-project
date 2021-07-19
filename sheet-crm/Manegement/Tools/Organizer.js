// *****************************************************************************************
function rawOrganizer() {
  const dataBulk = dataExtraction_extratDatafromCRMSheet(option = 2);

  dataBulk
    .forEach(dataRow => Logger.log(dataRow[crm.FullName - 1]));
}
// *****************************************************************************************
const SHEET_NAME = 'CRM';
const SHEET_COLUMN = 'W';
const SHEET_END_RANGE = 20;
const FILTERING_CONDITION = '';
// *****************************************************************************************
function sheetOrganizer() {

  const currentSheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);

  const dataRange = currentSheet
    .getRange(`${SHEET_COLUMN}${SHEET_OFFSET}:${SHEET_COLUMN}${SHEET_END_RANGE}`);

  const dataBulk = dataRange.getValues();

  dataBulk
    .filter(field => field[0] !== "")
    .forEach(field => {
      const customerId = field[0];
      Logger.log(customerId.replace(/[\D]*/igm, ''))
    });
}
// *****************************************************************************************
function bulkOrganizer() {
  const dataBulk = dataExtraction_extratDatafromCRMSheet(option = 2);

  const dbSheet = SpreadsheetApp.openById(SheetIdDatabase).getSheetByName(CRM.SheetName);

  let cpfSet = new Set();
  let nameSet = new Set();

  dataBulk
    .forEach(dataRow => {
      nameSet.add([dataRow[crm.FullName - 1].trim(), dataRow[crm.CPF - 1].toString()])
      cpfSet.add(dataRow[crm.CPF - 1].toString())
    });

  [...nameSet]
    .filter(data => data[0] !== "")
    .forEach(data => Logger.log(data));

  // const difference = new Set([...mySet1].filter(x => !mySet2.has(x)))
  new Set([...cpfSet]
    .forEach(cpf => {
      let startSize = nameSet.size;
      nameSet.delete(cpf)
      let endSize = nameSet.size;
      if ((startSize - endSize) > 1) { Logger.log(cpf) }
    })
  );

  Logger.log(nameSet.size)
  Logger.log(cpfSet.size)
  //Logger.log(newSet.size)
}
// *****************************************************************************************