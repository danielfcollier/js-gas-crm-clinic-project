// *****************************************************************************************
function getRowsToDelete() {
  const dayNumber = (new Date()).getDay();
  const isNotCheckDay = !(dayNumber === 6);

  if (isNotCheckDay) {
    return true;
  }

  const dataBulk = dataExtraction_extratDatafromCrmSheet(2);

  const numberofRowsToDelete = dataBulk.filter(dataRow => dataRow[crm.DeleteFlag - 1]).length;

  if (numberofRowsToDelete > 0) {
    const subject = ` Há linhas para deletar!`
    const message = `Você tem ${numberofRowsToDelete} linhas para deletar.`

    sendEmailToOwner_customNotification(subject, message);
  }

}
// *****************************************************************************************