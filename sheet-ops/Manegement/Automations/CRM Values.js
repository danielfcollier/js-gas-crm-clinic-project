// *****************************************************************************************
const OPS_START_YEAR = 2021;
const OPS_START_MONTH = 02 - 1;
const OPS_START_DAY = 01;
// *****************************************************************************************
function opsValues() {

  const dataBulk = dataExtraction_extratDatafromCrmSheet(2);
  const crmSheet = SpreadsheetApp.getActive().getSheetByName(CRM.SheetName);

  dataBulk
    .filter(dateSelection)
    .forEach((dataRow) => {
      Logger.log(`${dataRow[crm.FullName - 1]} > Row: ${dataRow[crm.Row - 1]}`);
    });
}
// *****************************************************************************************
function dateSelection(dataRow) {
  const consultationDate = dataRow[crm.ConsultationDate - 1];

  const startDate = new Date(OPS_START_YEAR, OPS_START_MONTH, OPS_START_DAY); // TEMPORARY
  const isConsultationDateGreaterThanStartDate = (consultationDate.getTime() > startDate.getTime())

  return isConsultationDateGreaterThanStartDate;
}
// *****************************************************************************************