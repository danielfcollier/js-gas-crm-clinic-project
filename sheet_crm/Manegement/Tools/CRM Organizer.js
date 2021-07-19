// *****************************************************************************************
function viewPendingCustomers() {
    const dataBulk = dataExtraction_extratDatafromCRMSheet(option = 2);

    const dbSheet = SpreadsheetApp.openById(SheetIdDatabase).getSheetByName(CRM.SheetName);

    dataBulk
        .filter(dataRow => {
            const isConsultationDone = (dataRow[crm.CRMStatus - 1] !== "Cancelada");
            const isConsultationPaid = (dataRow[crm.PaymentType - 1] !== "Sem Cobrança");
            const isPaymentNotReceived = (dataRow[crm.PaymentDate - 1] === "");
            return isConsultationDone && isConsultationPaid && isPaymentNotReceived;
        })
        .filter(dataRow => getLastWeek(dataRow[crm.ConsultationDate - 1]))
        .forEach(dataRow => Logger.log(`${formatDate(dataRow[crm.ConsultationDate - 1])} > ${dataRow[crm.FullName - 1]}`));
}
// *****************************************************************************************
function oldSheetOrganizer() {
    const dataBulk = dataExtraction_extratDatafromCRMSheet(option = 2);

    const dataFiltered = dataBulk
        .filter(dataRow => {
            const isPaymentConfirmed = (dataRow[crm.StatusPayment - 1] === "Confirmado");
            const isConsultationPaid = (dataRow[crm.PaymentType - 1] !== "Sem Cobrança");
            const isPaymentNotReceived = (dataRow[crm.PaymentDate - 1] !== "");
            const isNotWithAsaas = (dataRow[crm.PaymentId - 1] === "");
            return isPaymentConfirmed && isConsultationPaid && isPaymentNotReceived && isNotWithAsaas;
        })
        .filter(dataRow => getLastWeek(dataRow[crm.ConsultationDate - 1]));

    const consultationValues = dataFiltered.map(dataRow => dataRow[crm.ConsultationValue - 1]);

    const total = consultationValues.reduce(getSum, 0);
    Logger.log(`>>> Total R$${total}`);
}
// *****************************************************************************************