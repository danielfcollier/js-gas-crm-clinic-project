// *****************************************************************************************
function $booking_createPaymentCharge(ui, crmSheet, dataRow) {

  // Initialization
  let paymentId = "", message = "", dueDate = "";
  let apiPaymentType = $booking_getApiPaymentType(dataRow);

  // Not Charging
  let isNotToCreatePaymentHere = (apiPaymentType === "noPaymentHere");
  if (isNotToCreatePaymentHere) {
    paymentId = "noPaymentId";
    dueDate = $booking_getDueDateForCustomPayment(dataRow);
  }

  // Creation
  let isToCreatePaymentHere = !isNotToCreatePaymentHere;
  if (isToCreatePaymentHere) {
    [paymentId, dueDate] = $booking_createPayment(ui, dataRow, apiPaymentType);

    // Verification
    if (paymentId === "error") {
      message = "Problema crítico, peça ajuda ao desenvolvedor.";
    }
    else if (paymentId === "") {
      message = "Verifique as informações da consulta e tente novamente!";
    }
  }

  // Storing
  crmSheet.getRange(dataRow[crm.Row - 1], crm.PaymentId).setValue(paymentId);
  crmSheet.getRange(dataRow[crm.Row - 1], crm.DueDate).setValue(formatDate(dueDate));

  //
  return [paymentId, dueDate, message];
}
// *****************************************************************************************
function $booking_getApiPaymentType(dataRow) {

  // Initialization
  let apiPaymentType;

  // Action
  let isPaymentNotHere = (noPaymentHere.indexOf(dataRow[crm.PaymentType - 1]) !== -1);
  if (isPaymentNotHere) {
    apiPaymentType = "noPaymentHere";
  }
  else {
    switch (dataRow[crm.PaymentType - 1]) {
      case "Parcelamento":
        apiPaymentType = "installment";
        break;
      case "Sem Cobrança":
        apiPaymentType = "noPaymentHere";
        break;
      default:
        apiPaymentType = "payment";
    }
  }

  //
  return apiPaymentType;
}
// *****************************************************************************************
function $booking_createPayment(ui, dataRow, apiPaymentType) {

  // Initialization
  let dueDate, paymentId;
  let body;
  let installmentCount = "", isNotValidInstallment;

  // Getting Due Date
  switch (apiPaymentType) {
    case "installment":
      // Action
      [dueDate, installmentCount] = $booking_getDueDateForInstallment(ui);

      // Validation
      isNotValidInstallment = $booking_isValidInstallment(dueDate, installmentCount);
      if (isNotValidInstallment) {
        return ["", dueDate];
      }
      break;

    default:
      // Action
      dueDate = $booking_getDueDateForCustomPayment(dataRow);
  }

  // Storing Due Date
  dataRow[crm.DueDate - 1] = dueDate;

  // Not Charging
  if (apiPaymentType === "noPaymentHere") {
    paymentId = "noPaymentId";
    return [paymentId, dueDate];
  }

  // Build Body
  body = asaasApi_buildBodyFor(apiPaymentType);

  // API Payment 
  paymentId = $booking_getApiPayment(dataRow, body, installmentCount);

  //
  return [paymentId, dueDate];
}
// *****************************************************************************************
function $booking_isValidInstallment(dueDate, installmentCount) {

  // Initialization
  let isNotValidInstallment;

  // Validation
  isNotValidInstallment = (installmentCount === "error") || (installmentCount === "");
  isNotValidInstallment = isNotValidInstallment || (dueDate === "error") || (dueDate === "");

  //
  return isNotValidInstallment;
}
// *****************************************************************************************
function $booking_getDueDateForInstallment(ui) {

  // Initialization
  let message, userResponse, isUserNotWantsToContinue;
  let installmentCount, dueDate = "";

  // User Interaction: Get Installment Count
  message = "Informe o número de parcelas:";
  [isUserNotWantsToContinue, userResponse] = askUser_whatSheWants_andGetResponses(ui, message);
  installmentCount = Number(userResponse);

  // Validation: Installment Count
  let isInstallmentCountNotValid = (isNaN(installmentCount)) || (installmentCount < 0) || (installmentCount > MAX_INSTALLMENT_COUNT);
  if (isUserNotWantsToContinue) {
    return ["", ""];
  }
  else if (isInstallmentCountNotValid) {
    message = "Número inválido ou além do máximo permitido (10)." + " Tente novamente!";
    ui.alert(message);
    installmentCount = "error";
    return [dueDate, installmentCount];
  }

  // User Interaction: Get Due Date
  message = "Informe a data do 1º vencimento no formato dia/mês/ano:";
  [isUserNotWantsToContinue, userResponse] = askUser_whatSheWants_andGetResponses(ui, message);
  dueDate = userResponse;

  // Validation: Due Date
  let isDueDateNotValid = !(isValidDate(dueDate));
  if (isUserNotWantsToContinue) {
    return ["", ""];
  }
  else if (isDueDateNotValid) {
    message = "Data inválida! " + "Insira a nova data no formato dd/mm/aaaa (exemplo 1/2/2021)." + " Tente novamente!";
    ui.alert(message);
    dueDate = "error";
    return [dueDate, installmentCount];
  }

  // Date Transformation
  dueDate = stringDateToDate(dueDate);

  // Valid Date
  dueDate = $booking_getValidDueDate(dueDate);

  //
  return [dueDate, installmentCount];
}
// *****************************************************************************************
function $booking_getDueDateForCustomPayment(dataRow) {

  // Initialization
  let dueDate;

  // Action
  const isInPersonConsultation = (dataRow[crm.ConsultationKind - 1] === "Presencial") || dataRow[crm.ConsultationKind - 1] === "DIU";
  if (isInPersonConsultation && DUE_DATE_TIGHT_RULE) {
    dueDate = incrementDate(dataRow[crm.ConsultationDate - 1], -DUE_DATE_DAYS_TIGHT);
    //dueDate = incrementDate(new Date(), DUE_DATE_DAYS_TIGHT);
  }
  else {
    dueDate = incrementDate(dataRow[crm.ConsultationDate - 1], -DUE_DATE_DAYS_COUNT);
  }

  // Valid Date
  dueDate = $booking_getValidDueDate(dueDate);

  //
  return dueDate;
}
// *****************************************************************************************
function $booking_getValidDueDate(dueDate) {

  // Initialization
  dueDate = incrementHours(dueDate);
  let dateNow = incrementHours(new Date());

  // Validation
  let isDueDateNotValid = dueDate.getTime() <= dateNow.getTime();
  if (isDueDateNotValid) {
    dueDate = incrementDate(dateNow, DUE_DATE_DAYS_SLACK);
  }

  //
  return dueDate;
}
// *****************************************************************************************
function $booking_getApiPayment(dataRow, body, installmentCount) {

  // Initialization
  body["dueDate"] = formatDate(dataRow[crm.DueDate - 1], 2);
  body["customer"] = dataRow[crm.CustomerId - 1];
  body["description"] = consultationDescription;

  if (installmentCount !== "") {
    body["installmentCount"] = installmentCount;
    body["totalValue"] = dataRow[crm.ConsultationValue - 1];
  }
  else {
    body["value"] = dataRow[crm.ConsultationValue - 1];
  }

  // Action
  let responseId = asaasApi_getId("payment", body);

  //
  return responseId;
}
// *****************************************************************************************