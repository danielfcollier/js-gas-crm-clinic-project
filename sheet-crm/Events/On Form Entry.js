// *****************************************************************************************
function transformDataOnEntry(formEntry) {

  // Input
  let fullName = formEntry.namedValues['Nome Completo:'][0];
  let cpf = formEntry.namedValues['CPF:'][0];
  let email = formEntry.namedValues['Email:'][0];
  let zipcode = formEntry.namedValues['CEP:'][0];
  let phone = formEntry.namedValues['Telefone:'][0];

  let dataRowLocation = formEntry.range.getRow();
  let crmId = "CRM-" + uniqueId();

  // Intilization
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(crm.SheetName);

  // Action
  try {
    sheet.getRange(dataRowLocation, crm.CRMId).setValue(crmId);
    sheet.getRange(dataRowLocation, crm.FullName).setValue(formatOnEntry(fullName, "name"));
    sheet.getRange(dataRowLocation, crm.CPF).setValue(formatOnEntry(formatCPF(cpf), "numberToString"));
    sheet.getRange(dataRowLocation, crm.Email).setValue(formatEmail(email));
    sheet.getRange(dataRowLocation, crm.ZipCode).setValue(formatOnEntry(formatZipCode(zipcode), "numberToString"));
    sheet.getRange(dataRowLocation, crm.Phone).setValue(formatOnEntry(formatPhone(phone), "numberToString"));
    Logger.log(`Row@ ${dataRowLocation} > ${fullName} > ${crmId}`)
  }
  catch (err) {
    Logger.log("Error on entry form data transformation: " + crmId);
    sendEmailToOwner_errorNotification("[CRM] Events > On Form Entry.js > transformDataOnEntry()");
  }
}
// *****************************************************************************************
function formatOnEntry(variable, action) {
  switch (action.toLowerCase()) {
    case 'numbertostring':
      return '="' + variable + '"';
    case 'name':
      return '=TRIM(PROPER("' + variable + '"))';
  }
}
// *****************************************************************************************