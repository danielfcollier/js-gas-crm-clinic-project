// *****************************************************************************************
function onOpen() {
  createMenu();
  putCurrentWeek();
  patchSearchField();
}
// *****************************************************************************************
function createMenu() {
  SpreadsheetApp.getUi()
    .createMenu('Débora Secretária')
    .addItem("Agendamentos > Consulta/Whats em Florianópolis", 'booking_confirmCityFln')
    .addItem("Agendamentos > Consulta/Whats em Brasília", 'booking_confirmCityBsb')
    .addSeparator()
    .addItem('CONFIRMAÇÃO OBRIGATÓRIA', 'booking_process')
    .addSeparator()
    .addItem('CRIAR PRONTUÁRIO', 'createMedicalRecord')
    .addSeparator()
    .addItem("Alterações > Mudar Data da Consulta", 'booking_changeConsultationDate')
    .addItem("Alterações > Corrigir Valor de CPF/Telefone/CEP", 'corrections_numbertoString')
    .addSeparator()
    .addItem("Solicitações > Remover Linha com Entrada Duplicada", 'corrections_askForRowDeletion')
    .addSeparator()
    .addItem("Notificações > WhatsApp sem Conexão", 'secretaryNotifyNoConnection')
    .addToUi();
}
// *****************************************************************************************
function booking_confirmCityFln() {
  booking_confirmConsultationCity("Florianópolis");
}
// *****************************************************************************************
function booking_confirmCityBsb() {
  booking_confirmConsultationCity("Brasília");
}
// *****************************************************************************************
function secretaryNotifyNoConnection() {
  const subject = " WhatsApp sem Conexão";
  const message = "";
  sendEmailToOwner_customNotification(subject, message);
}
// *****************************************************************************************
function putCurrentWeek() {
  const today = new Date();
  const weekNumber = today.getWeek();
  SpreadsheetApp
    .getActive()
    .getSheetByName("Semana")
    .getRange("E2")
    .setValue(weekNumber);
}
// *****************************************************************************************
function patchSearchField() {
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getSheetByName('Buscar');
  sheet.getRange('C1').activate();
  sheet.getActiveRangeList().setFontSize(12)
    .setBackground('#f4cccc')
    .setFontWeight('bold');

}