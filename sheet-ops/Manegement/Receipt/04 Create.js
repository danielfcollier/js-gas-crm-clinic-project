// *****************************************************************************************
function $receipt_create(dataRow, tempFolder) {

    let receiptId, isErrorState = false;

    try {

        // Naming
        let fileName = formatDate(dataRow[crm.PaymentDate - 1], 2);
        fileName = fileName + " Recibo de Consulta Médica - " + dataRow[crm.FullName - 1];

        // Initialization
        let receiptFile = receiptTemplate.makeCopy(fileName, tempFolder);
        receiptId = receiptFile.getId();
        let receiptDoc = DocumentApp.openById(receiptId);

        // Building
        let receiptBody = receiptDoc.getBody();

        receiptBody.replaceText("{Nome}", dataRow[crm.FullName - 1]);
        receiptBody.replaceText("{CPF}", showCPF(dataRow[crm.CPF - 1]));
        receiptBody.replaceText("{Valor}", dataRow[crm.ConsultationValue - 1] + ",00");
        receiptBody.replaceText("{Valor Extenso}", dataRow[crm.ConsultationValue - 1].toString().writtenNumber());
        receiptBody.replaceText("{Data}", formatDate(dataRow[crm.PaymentDate - 1], 1));

        receiptDoc.saveAndClose();
    }
    catch (err) {
        Logger.log("Error: " + err.toString());
        isErrorState = true;
        receiptId = isErrorState;
    }

    return receiptId;
}
// *****************************************************************************************