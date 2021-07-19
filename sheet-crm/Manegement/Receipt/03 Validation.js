// *****************************************************************************************
function $receipt_isSendingAllowed(dataRow, counter) {

    //
    let isConsultationNotBooked = (dataRow[crm.ConsultationDate - 1] === "");
    if (isConsultationNotBooked) {
        return false;
    }

    //
    let isConsultationConfirmed = (dataRow[crm.CRMStatus - 1] !== "Cancelada") && (dataRow[crm.CRMStatus - 1] !== "Atendimento");
    isConsultationConfirmed = isConsultationConfirmed && (dataRow[crm.CRMStatus - 1] !== "");

    //
    let isConsultationCharged = (dataRow[crm.PaymentType - 1] !== "Sem Cobrança");

    //
    let isPaymentConfirmed = (dataRow[crm.StatusPayment - 1] === "Confirmado");

    //
    let isReceiptSent = !((dataRow[crm.Receipt - 1] === "Enviado") || (dataRow[crm.Receipt - 1] === "Não Enviar"));

    //
    let isTestModeValid = !(dataRow[crm.Receipt - 1] === "Testado" && SEND_RECEIPT_TEST_MODE);

    // TEMPORARY
    let startDateToTime = (new Date(TEMPORARY_START_YEAR, TEMPORARY_START_MONTH, TEMPORARY_START_DAY)).getTime(); // TEMPORARY
    let isConsultationDateGreaterThanStartDate = (dataRow[crm.ConsultationDate - 1].getTime() > startDateToTime)

    let isSentLimitNotReached = (counter < MAX_RECEIPTS_SENT);

    // Requeriments Combination
    let isDataRowAllowedForSend = isConsultationConfirmed && isConsultationCharged;
    isDataRowAllowedForSend = isDataRowAllowedForSend && isPaymentConfirmed && isReceiptSent;
    isDataRowAllowedForSend = isDataRowAllowedForSend && isSentLimitNotReached;
    isDataRowAllowedForSend = isDataRowAllowedForSend && isTestModeValid;
    isDataRowAllowedForSend = isDataRowAllowedForSend && isConsultationDateGreaterThanStartDate; // TEMPORARY

    return isDataRowAllowedForSend;
}
// *****************************************************************************************