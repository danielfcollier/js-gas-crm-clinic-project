// *****************************************************************************************
const boardCells = {
  AvailableCash: "C2",
  PendingCash: "E2",
  TotalCash: "G2"
};
// *****************************************************************************************
function patchFinanceBoard() {
  const boardSheet = SpreadsheetApp.getActive().getSheetByName("Board");

  const availableCash = asaasApi_getCurrentBalance();
  const pendingCash = asaasApi_getConfirmedBalance();
  const totalCash = availableCash + pendingCash;

  boardSheet.getRange(boardCells.AvailableCash).setValue(availableCash);
  boardSheet.getRange(boardCells.PendingCash).setValue(pendingCash);
  boardSheet.getRange(boardCells.TotalCash).setValue(totalCash);
  
  if (availableCash>=5000) {
    const subject = ` Há saldo para transferir!`
    const message = `Acesse: https://www.asaas.com/creditTransferRequest/index`

    sendEmailToOwner_customNotification(subject, message);
  }
}
// *****************************************************************************************