// ***************************************************************************************** 
function $receipt_register(dataRow, crmSheet) {
    // Initialization
    let addToCounter = 0;
    let isReceiptSent = (dataRow[crm.Receipt - 1] === "Enviado") || SEND_RECEIPT_TEST_MODE;

    // Recording
    if (isReceiptSent) {
        addToCounter++;
        crmSheet.getRange(dataRow[crm.Row - 1], crm.Receipt).setValue(dataRow[crm.Receipt - 1]);
    }
    return addToCounter;
}
// *****************************************************************************************