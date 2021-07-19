// *****************************************************************************************
function putCancellationsRight() {
  const dataBulk = dataExtraction_extratDatafromCrmSheet(option = 2);
  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);

  dataBulk
    .filter(dataRow => {
      return dataRow[crm.CRMStatus - 1] === "Cancelada" && dataRow[crm.StatusPayment - 1] === "Enviado";
    })
    .forEach(dataRow => {
      const paymentId = dataRow[crm.PaymentId - 1];
      asaasApi_deletePayment(paymentId);
      crmSheet.getRange(dataRow[crm.Row-1],crm.ConsultationValue).setValue("");
      crmSheet.getRange(dataRow[crm.Row-1],crm.StatusPayment).setValue("");
      crmSheet.getRange(dataRow[crm.Row-1],crm.PaymentId).setValue("");
      crmSheet.getRange(dataRow[crm.Row-1],crm.DueDate).setValue("");
      crmSheet.getRange(dataRow[crm.Row-1],crm.PaymentWatch).setValue("");
      Utilities.sleep(100);
    });
}
// *****************************************************************************************