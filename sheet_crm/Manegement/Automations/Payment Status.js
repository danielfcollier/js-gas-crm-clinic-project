// *****************************************************************************************
function putPaymentStatus() {

  const dataBulk = dataExtraction_extratDatafromCrmSheet(2);
  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);

  dataBulk
    .filter(isPaymentSent)
    .forEach(dataRow => {

      const [paymentWatch, paymentStatus, payDate, value, netValue, billingType] = getPaymentStatus(dataRow);
      patchPaymentStatus(dataRow, paymentWatch, paymentStatus, payDate, value, netValue, billingType);

      Utilities.sleep(100);
      Logger.log(`${dataRow[crm.FullName - 1]} > ${paymentStatus} > ${paymentWatch}`);
    });
  
  // ***************************************************************************************
  function isPaymentSent(dataRow) {
    return ((dataRow[crm.StatusPayment - 1] === "Enviado") && (dataRow[crm.PaymentId - 1] !== "noPaymentId"));
  }
  // ***************************************************************************************
  function getPaymentStatus(dataRow) {
    const [payStatus, payDate, viewStatus, value, netValue, billingType] = asaasApi_getPaymentStatus(dataRow[crm.PaymentId - 1]);
    const [paymentWatch, paymentStatus] = getPaymentWatch(payStatus, dataRow[crm.DueDate - 1], viewStatus);

    return [paymentWatch, paymentStatus, payDate, value, netValue, billingType];
  }
  // ***************************************************************************************
  function patchPaymentStatus(dataRow, paymentWatch, paymentStatus, payDate, value, netValue, billingType) {
    crmSheet.getRange(dataRow[crm.Row - 1], crm.StatusPayment).setValue(paymentStatus);
    crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentWatch).setValue(paymentWatch);

    if (paymentStatus === "Confirmado") {
      const opexValue = (100 * value - 100 * netValue) / 100;
      const paymentType = getPaymentType(billingType);
      
      crmSheet.getRange(dataRow[crm.Row - 1], crm.ConsultationValue).setValue(value);
      crmSheet.getRange(dataRow[crm.Row - 1], crm.OpexPayment).setValue(opexValue);
      if (paymentType !== "") { crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentType).setValue(paymentType) }
      crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentDate).setValue(payDate);
    }
  }
  // ****************************************************************************************
  function getPaymentWatch(payStatus, dueDate, viewStatus) {

    let paymentWatch, paymentStatus;

    // Conditionals: Asaas API
    const isPaymentReceived = (payStatus === "CONFIRMED") ||
      (payStatus === "RECEIVED") || (payStatus === "RECEIVED_IN_CASH");

    let isPaymentPending = (payStatus === "PENDING");
    if (dueDate !== "") {
      const todayTime = (new Date()).getTime();
      const dueTime = stringDateToDate(formatDate(dueDate).toString()).getTime();

      isPaymentPending = isPaymentPending && (todayTime >= dueTime);
    }

    const isPaymentViewed = viewStatus;
    const isPaymentOverDue = (payStatus === "OVERDUE");

    // Actions: Business Rules
    if (isPaymentReceived) {
      paymentWatch = "Received";
      paymentStatus = "Confirmado";
    }
    else if (isPaymentPending && isPaymentViewed) {
      paymentWatch = "Secretary"; //"Remainder"
      paymentStatus = "Enviado";
    }
    else if (isPaymentPending && !isPaymentViewed) {
      paymentWatch = "Secretary";
      paymentStatus = "Enviado";
    }
    else if (isPaymentOverDue) {
      paymentWatch = "Manager";
      paymentStatus = "Enviado";
    }
    else {
      paymentWatch = "";
      paymentStatus = "Enviado";
    }

    // Result
    return [paymentWatch, paymentStatus];
  }
  // ***************************************************************************************
  function getPaymentType(billingType) {
    switch (billingType) {
      case "BOLETO":
        return "Boleto Bancário";
      case "CREDIT_CARD":
        return "Cartão de Crédito";
      case "DEBIT_CARD":
        return "Cartão de Débito";
      default:
        return "";
    }
  }
  // ***************************************************************************************
}
// *****************************************************************************************