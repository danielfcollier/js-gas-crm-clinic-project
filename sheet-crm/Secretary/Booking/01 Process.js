// *****************************************************************************************
function booking_process() {

  // Initialization
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const currentSheet = ss.getActiveSheet();
  const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
  const ui = SpreadsheetApp.getUi();
  let message, errorMessage = "", criticalErrorFlag = false, statusPayment = "";
  let dataRow, isDataIntegrityNotValid;

  //
  try {
    // Validation: Sheet Location
    if (validation_isSheetLocationWrong(currentSheet)) {
      errorMessage = "Não funciona nessa aba!";
      criticalErrorFlag = false;
      throw "Validation: Sheet Location";
    }

    // Data Extraction
    let dataBulk = dataExtraction_extratDatafromCrmSheet(1);
    dataRow = dataBulk[0];

    // Consultation Parameters
    consultationDescription = businessRules_consultationDescription(dataRow);
    dataRow[crm.ConsultationValue - 1] = businessRules_consultationPrice(dataRow);

    // Error Sent Status Handling
    if ((dataRow[crm.StatusPayment - 1] === "Erro") && (dataRow[crm.PaymentId - 1] !== "")) {
      Logger.log("---- Error Handling Routine ----")
      dataRow[crm.DueDate - 1] = $booking_getDueDateForCustomPayment(dataRow);
      if ($booking_sendCustomerCharge(dataRow)) {
        statusPayment = "Enviado";
        message = "Sucesso! Email de cobrança enviado."
      }
      else {
        statusPayment = "Erro";
        message = "Tente de novo! Se persistir, peça ajuda.";
      }

      // Successful
      $booking_storeSentStatus(crmSheet, dataRow, statusPayment);
      ui.alert(message);
      Logger.log(dataRow[crm.FullName - 1] + " > " + dataRow[crm.CRMId - 1]);
      return true;
    }

    // Verification: Payment Status
    let isPaymentCharged = (dataRow[crm.StatusPayment - 1] === "Confirmado") || (dataRow[crm.StatusPayment - 1] === "Enviado");
    if (isPaymentCharged) {
      errorMessage = "Pagamento já enviado ou confirmado!";
      criticalErrorFlag = false;
      statusPayment = dataRow[crm.StatusPayment - 1];
      throw "Verification: Payment Status";
    }

    // Validation: Data Integrity
    [isDataIntegrityNotValid, errorMessage] = $booking_isDataNotValid(dataRow);
    if (isDataIntegrityNotValid) {
      criticalErrorFlag = false;
      statusPayment = "invalid data";
      throw "Validation: Data Integrity";
    }

    // Secretary Misbehavior Correction
    if (dataRow[crm.TimeStamp - 1] === "" || dataRow[crm.CRMId - 1]) {
      dataRow[crm.TimeStamp - 1] = new Date();
      dataRow[crm.CRMId - 1] = "CRM-" + uniqueId();
      crmSheet.getRange(dataRow[crm.Row - 1], crm.TimeStamp).setValue(dataRow[crm.TimeStamp - 1]);
      crmSheet.getRange(dataRow[crm.Row - 1], crm.CRMId).setValue(dataRow[crm.CRMId - 1]);
    }

    // Customer Registration
    [dataRow[crm.CustomerId - 1], errorMessage] = $booking_registerCustomerIfNecessary(crmSheet, dataRow);
    let isCustomerRegistrationNotValid = (dataRow[crm.CustomerId - 1] === "") || (dataRow[crm.CustomerId - 1] === "error");
    if (isCustomerRegistrationNotValid) {
      criticalErrorFlag = false;
      throw "Customer Registration";
    }

    // User Confirmation
    message = "Criar cobrança para " + dataRow[crm.FullName - 1] + "?";
    if (askUser_ifSheWants_notToContinue(ui, message)) {
      return false;
    }

    // Payment Type Correction
    dataRow = corrections_noPaymentType(crmSheet, dataRow);

    // Payment Creation
    [dataRow[crm.PaymentId - 1], dataRow[crm.DueDate - 1], errorMessage] = $booking_createPaymentCharge(ui, crmSheet, dataRow);

    // Validation: Payment Process
    let isPaymentCreationNotValid = (dataRow[crm.PaymentId - 1] === "") || (dataRow[crm.PaymentId - 1] === "error");
    if (isPaymentCreationNotValid) {
      criticalErrorFlag = (dataRow[crm.PaymentId - 1] === "error") ? true : false;
      throw "Payment Creation";
    }

    // Sending Payment
    let isItToSend = !((dataRow[crm.PaymentType - 1] === "Sem Cobrança") || (dataRow[crm.PaymentId - 1] === "noPaymentId"));
    if (isItToSend) {
      let isSendNotSuccessful = !($booking_sendCustomerCharge(dataRow));
      if (isSendNotSuccessful) {
        criticalErrorFlag = true;
        statusPayment = "Erro";
        errorMessage = "Erro apenas no envio, tente novamente!"
        throw "Sending Payment";
      }
      else {
        statusPayment = "Enviado";
      }
    }
  }
  catch (err) {
    // Error Routine
    if (errorMessage !== "") { ui.alert(errorMessage); }
    Logger.log("Error in booking_process(): " + err.toString());
    if (criticalErrorFlag) { sendEmailToOwner_errorNotification("[CRM] Secretary/Booking > booking_process() " + err.toString()); }
    $booking_storeSentStatus(crmSheet, dataRow, statusPayment);
    Logger.log(dataRow[crm.FullName - 1] + " > " + dataRow[crm.CRMId - 1]);
    return false;
  }

  // Storing Status
  $booking_storeSentStatus(crmSheet, dataRow, statusPayment);

  // Successful
  ui.alert("Cobrança enviada com sucesso!");
  Logger.log(dataRow[crm.FullName - 1] + " > " + dataRow[crm.CRMId - 1]);
  return true;
}
// *****************************************************************************************
function $booking_storeSentStatus(crmSheet, dataRow, statusPayment) {

  // Initialization
  const isNoPaymentHere = (dataRow[crm.PaymentId - 1] === "noPaymentId");
  const isNoPaymentType = (dataRow[crm.PaymentType - 1] === "Sem Cobrança");

  // Action
  statusPayment = isNoPaymentHere ? "Enviado" : statusPayment;
  statusPayment = (isNoPaymentType && statusPayment !== "invalid data") ? "Confirmado" : statusPayment;

  // Storing
  if (statusPayment !== "invalid data") {
    crmSheet.getRange(dataRow[crm.Row - 1], crm.StatusPayment).setValue(statusPayment);
  }
}
// *****************************************************************************************