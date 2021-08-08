// *****************************************************************************************
function $booking_sendCustomerCharge(dataRow) {

  // Get Template
  const htmlTemplate = $booking_getHtmlTemplate(dataRow);

  // Get Email Body
  const emailBody = $booking_buildChargeEmailBody(dataRow, htmlTemplate);

  // Send Action
  try {
    MailApp.sendEmail(emailBody);
    return true;
  }
  catch (err) {
    return false;
  }
}
// *****************************************************************************************
function $booking_getHtmlTemplate(dataRow) {

  // Initialization
  let templateFile = "Pay01 Payment";

  // Action
  const isInstallmentPayment = (dataRow[crm.PaymentType - 1] === "Parcelamento");
  if (isInstallmentPayment) {
    templateFile = "Pay01 Installment";
  }

  // Creating
  const htmlTemplate = HtmlService.createTemplateFromFile(templateFile).evaluate().getContent();

  //
  return htmlTemplate;
}
// *****************************************************************************************
function $booking_buildChargeEmailBody(dataRow, htmlTemplate) {

  // Parameters
  const customerId = dataRow[crm.CustomerId - 1];
  const subjectLine = "Orientações de pagamento #" + customerId.replace(/[\D]*/igm, '');
  const emailDestination = dataRow[crm.Email - 1];
  const logoCardBlob = $booking_getLogoCardBlob(dataRow);
  const htmlMessage = $booking_getHtmlChargeBody(dataRow, htmlTemplate);

  // Building
  const emailBody = {
    to: emailDestination,
    bcc: "consulta@drageisa.com.br",
    subject: subjectLine,
    htmlBody: htmlMessage,
    name: "Equipe da Dra. Geisa",
    replyTo: "consulta@drageisa.com.br",
    inlineImages:
    {
      myLogo: logoCardBlob
    }
  };

  //
  return emailBody;
}
// *****************************************************************************************
function $booking_getLogoCardBlob(dataRow) {

  // Location
  const imageCardCityBased = (dataRow[crm.CRMStatus - 1] === "Brasília") ? imageBrasilia : imageFlorianopolis;

  // Get Blob
  const logoCardBlob = UrlFetchApp.fetch(imageCardCityBased).getBlob().setName('drageisa');

  //
  return logoCardBlob;
}
// *****************************************************************************************
function $booking_getHtmlChargeBody(dataRow, htmlTemplate) {

  // Initialization
  let htmlMessage = htmlTemplate;

  // Definitions
  const firstName = dataRow[crm.FullName - 1].split(" ")[0];
  const consultationValue = dataRow[crm.ConsultationValue - 1];
  const paymentId = dataRow[crm.PaymentId - 1].replace(/pay_/g, "");
  const dueDate = formatDate(dataRow[crm.DueDate - 1], 1);

  // Location
  const locationPhone = (dataRow[crm.CRMStatus - 1] === "Brasília") ? phoneBrasilia : phoneFlorianopolis;

  // Substitution
  htmlMessage = htmlMessage.replace(/{firstName}/g, firstName);
  htmlMessage = htmlMessage.replace(/{consultationDescription}/g, consultationDescription);
  htmlMessage = htmlMessage.replace(/{consultationValue}/g, consultationValue);
  htmlMessage = htmlMessage.replace(/{dueDate}/g, dueDate);
  htmlMessage = htmlMessage.replace(/{paymentId}/g, paymentId);
  htmlMessage = htmlMessage.replace(/{locationPhone}/g, locationPhone);

  // Installment Case
  const isInstallmentSend = !(dataRow[crm.PaymentType - 1] === "Parcelamento") && (MODE_ASAAS);
  if (isInstallmentSend) {
    let barCode = asaasApi_getBarCode(dataRow[crm.PaymentId - 1]);

    if (barCode === "error") {
      barCode = "Por favor, solicite a Débora caso prefira essa opção.";
    }

    htmlMessage = htmlMessage.replace(/{barCode}/g, barCode);
  }

  //
  return htmlMessage;
}
// *****************************************************************************************