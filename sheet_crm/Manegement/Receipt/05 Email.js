// *****************************************************************************************
function $receipt_sendEmail(dataRow, receiptId) {

    let isErrorState = false;

    try {
        if (SEND_RECEIPT_TEST_MODE) {
            dataRow[crm.Receipt - 1] = "Testado";
        }
        else {
            let emailBody = $receipt_buildHtml(dataRow, receiptId);
            MailApp.sendEmail(emailBody);
            dataRow[crm.Receipt - 1] = "Enviado";
        }
    }
    catch (err) {
        isErrorState = true;
        Logger.log("Error: " + err.toString());
    }
    return [dataRow, isErrorState];
}
// *****************************************************************************************
function $receipt_buildHtml(dataRow, receiptId) {
    // Initialization
    const htmlTemplateFile = "Receipt";
    let htmlEmailBody = HtmlService.createTemplateFromFile(htmlTemplateFile).evaluate().getContent();

    // Subject
    const customerId = dataRow[crm.CustomerId - 1];
    const subjectLine = "Recibo de Consulta Médica #" + customerId.replace(/[\D]*/igm, '');

    // Destination
    const emailDestination = dataRow[crm.Email - 1];

    // Information
    const firstName = getFirstName(dataRow[crm.FullName - 1]);
    const consultationDate = formatDate(dataRow[crm.ConsultationDate - 1], 1);
    const paymentDate = formatDate(dataRow[crm.PaymentDate - 1], 1);
    let locationPhone = phoneFlorianopolis;
    let imageCardCityBased = imageFlorianopolis;
    if (dataRow[crm.CRMStatus - 1] === "Brasília") {
        locationPhone = phoneBrasilia;
        imageCardCityBased = imageBrasilia;
    }

    // Replacement
    htmlEmailBody = htmlEmailBody.replace(/{firstName}/g, firstName);
    htmlEmailBody = htmlEmailBody.replace(/{consultationDate}/g, consultationDate);
    htmlEmailBody = htmlEmailBody.replace(/{paymentDate}/g, paymentDate);
    htmlEmailBody = htmlEmailBody.replace(/{locationPhone}/g, locationPhone);

    // Image Blob
    const imageBlob = UrlFetchApp
        .fetch(imageCardCityBased)
        .getBlob()
        .setName('drageisa');

    // PDF Blob
    const file = DriveApp.getFileById(receiptId);
    const receiptPdf = file.getAs(MimeType.PDF);

    // Constructor
    const emailBody = {
        to: emailDestination,
        bcc: "consulta@drageisa.com.br",
        subject: subjectLine,
        htmlBody: htmlEmailBody,
        name: "Equipe da Dra. Geisa",
        replyTo: "adm@drageisa.com.br",
        inlineImages:
        {
            myLogo: imageBlob
        },
        attachments: [receiptPdf]
    };

    return emailBody;
}
// *****************************************************************************************