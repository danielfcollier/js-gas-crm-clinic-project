// *****************************************************************************************
function postRemainderToVerifyPaymentTransactions() {

  const dayNumber = (new Date()).getDay();
  const isNotCheckDay = !(dayNumber === 3 || dayNumber === 6);

  if (isNotCheckDay) {
    Logger.log("Not a check day for the manager!");
    return true;
  }
  Logger.log("Manager's check day!")

  const emailBodyPart1 = `Bom dia Daniel,
  <br><br>
  Por favor quando for possível verificar o pagamento para as seguintes pacientes:
  <br><br>`;

  const emailBodyPart2 = `<br>
  Este é um email automático para acompanhar os agendamentos.
  <br><br>
  Atenciosamente,<br>
  Daniel.
  <br><br>`;

  const dataBulk = dataExtraction_extratDatafromCrmSheet(2);

  const message = dataBulk
    .filter(dataRow => (dataRow[crm.StatusPayment - 1] !== "Confirmado")
      && ((dataRow[crm.PaymentType - 1] === "PIX") || (dataRow[crm.PaymentType - 1] === "Transferência")))
    .reduce(getMissingPaymentActionsMessage, "");

  if (message !== "") {
    const email = "adm@drageisa.com.br";
    const subject = '[Ops] Pagamentos aguardando confirmação';

    MailApp.sendEmail(email, subject, '', { htmlBody: emailBodyPart1 + message + emailBodyPart2 });
  }

  return true;
}
// *****************************************************************************************
function postRemainderForMissingConfirmations() {

  const dayNumber = (new Date()).getDay();
  const isNotCheckDay = !(dayNumber === 1 || dayNumber === 4);

  if (isNotCheckDay) {
    Logger.log("Not a payments check day for the secretary!");
    return true;
  }
  Logger.log("Secretary's payments check day!");

  const emailBodyPart1 = `<b>Bom dia Débora,</b>
  <br><br>
  Por favor quando for possível faz a "Confirmação Obrigatória" (por meio do teu menu) para o agendamento das seguintes pacientes:
  <br><br>`;

  const emailBodyPart2 = `<br>
  Este é um email automático para acompanhar os agendamentos.
  <br><br>
  Atenciosamente,<br>
  Daniel.
  <br><br>`;

  const dataBulk = dataExtraction_extratDatafromCrmSheet(2);
  const message = dataBulk
    .filter(dataRow => dataRow[crm.CRMStatus - 1] !== "Cancelada")
    .filter(dataRow => dataRow[crm.StatusPayment - 1] === "")
    .reduce(getMissingPaymentActionsMessage, "");

  if (message !== "") {
    const email = "consulta@drageisa.com.br";
    const subject = '[Sistema] Enviar "Confirmação Obrigatória"';

    MailApp.sendEmail(email, subject, '', { htmlBody: emailBodyPart1 + message + emailBodyPart2 });
  }

  return true;
}
// *****************************************************************************************
function postPaymentRemaindersForSecretary() {

  const emailBodyPart1 = `<b>Bom dia Débora,</b>
  <br><br>
  Envia por favor pelo WhatsApp o lembrete de pagamento/consulta para as seguintes pacientes:
  <br>
  (caso você já tenha enviado para alguma paciente, favor desconsiderar)
  <br><br>
  (caso a consulta seja ONLINE ou DIU: você pode ser mais tolerante com a paciente)
  <br>
  (caso a consulta seja PRESENCIAL: a paciente precisa te responder até amanhã de manhã, caso não
    responda você deve cancelar a consulta e marcar uma nova paciente.)
  <br><br>`;

  const emailBodyPart2 = `<b>
  ---
  <br><br>
  Caso a paciente te peça para reenviar a cobrança por email, você pode selecionar a paciente 
  na planilha Agendamentos ou Semana e reenviar com a função no menu "Agendamentos > Reenviar Cobrança".
  </b>
  <br><br>
  Este é um email automático para acompanhar os agendamentos.
  <br><br>
  Atenciosamente,<br>
  Daniel.
  <br><br>`;

  const dataBulk = dataExtraction_extratDatafromCrmSheet(2);
  const message = dataBulk
    .filter(dataRow => {
      const isNotTransfer = dataRow[crm.StatusPayment - 1] !== "Confirmado" &&
        dataRow[crm.PaymentType - 1] !== "PIX" && dataRow[crm.PaymentType - 1] !== "Transferência";
      return isNotTransfer && dataRow[crm.PaymentWatch - 1] === "Secretary";
    })
    .reduce(postPaymentRemainder, "");

  if (message !== "") {
    const email = "adm@drageisa.com.br";
    const subject = '[WhatsApp] Enviar Lembretes de Pagamento/Consulta - A Vencer';

    MailApp.sendEmail(email, subject, '', { htmlBody: emailBodyPart1 + message + emailBodyPart2 });
  }

  return true;
}
// *****************************************************************************************
function postPaymentRemaindersForManager() {

  const emailBodyPart1 = `
  <b>Débora,</b>
  <br><br>
  envia por favor mensagem para essas pacientes, caso alguma não responda até amanhã, pode
  cancelar a consulta dela e ver se é possível agendar uma nova consulta no horário disponível.
  <br><br>
  (caso você já tenha enviado lembrete de pagamento para alguma paciente pode proceder para o cancelamento)
  <br><br>
  Você pode usar a função do menu "Alterações > Cancelar Consulta" para cancelar a consulta no sistema.
  Ainda é preciso ir na agenda liberar o horário, mas o sistema te lembra caso você esqueça.
  <br><br>
  <b>---</b>
  <br><br>
  Envia por favor pelo WhatsApp o lembrete de pagamento/consulta para as seguintes pacientes:
  <br><br>`;

  const emailBodyPart2 = `
  <b>
  ---
  <br><br>
  Caso a paciente te peça para reenviar a cobrança por email, você pode selecionar a paciente 
  na planilha Agendamentos ou Semana e reenviar com a função no menu "Agendamentos > Reenviar Cobrança".
  </b>
  <br><br>
  Este é um email automático para acompanhar os agendamentos.
  <br><br>
  Atenciosamente,<br>
  Daniel.
  <br><br>`;

  const dataBulk = dataExtraction_extratDatafromCrmSheet(2);
  const message = dataBulk
    .filter(dataRow => {
      const isNotTransfer = dataRow[crm.StatusPayment - 1] !== "Confirmado" &&
        dataRow[crm.PaymentType - 1] !== "PIX" && dataRow[crm.PaymentType - 1] !== "Transferência";
      return isNotTransfer && dataRow[crm.PaymentWatch - 1] === "Manager";
    })
    .reduce(postPaymentRemainder, "");

  if (message !== "") {
    const email = "danielfcollier@gmail.com";
    const subject = '[WhatsApp] Enviar Lembretes de Pagamento/Consulta - Vencidas';

    MailApp.sendEmail(email, subject, '', { htmlBody: emailBodyPart1 + message + emailBodyPart2 });
  }

  return true;
}
// *****************************************************************************************
function postConsultationRemaindersForSecretary() {

}
// *****************************************************************************************
function getMissingPaymentActionsMessage(message, dataRow) {
  const consultationDate = dataRow[crm.ConsultationDate - 1] === "" ? "Falta a Data" : formatDate(dataRow[crm.ConsultationDate - 1]);
  const fullName = dataRow[crm.FullName - 1];
  const phone = dataRow[crm.Phone - 1];
  const row = dataRow[crm.Row - 1];

  return message + `- Na linha ${row} > ${consultationDate} > ${fullName} ${showPhone(phone)} <br>`;
}
// *****************************************************************************************
function postPaymentRemainder(message, dataRow) {
  const consultationDate = formatDate(dataRow[crm.ConsultationDate - 1]);
  const dueDate = formatDate(dataRow[crm.DueDate - 1]);
  const fullName = dataRow[crm.FullName - 1];
  const phone = dataRow[crm.Phone - 1];
  const row = dataRow[crm.Row - 1];
  let infoConsultation;
  switch (dataRow[crm.ConsultationKind - 1]) {
    case 'DIU':
      infoConsultation = ' <b>DIU > </b> ';
      break;
    case 'Online':
      infoConsultation = ' <b>ONLINE > </b> ';
      break;
    case 'Presencial':
      infoConsultation = ' <b>PRESENCIAL > </b> ';
      break;
    default:
      infoConsultation = '';
  }

  const messageBuilder = `- Na linha ${row} >${infoConsultation}${consultationDate} > ${fullName} ${showPhone(phone)}
  <br><br>
  <b>
  Bom dia ,
  <br><br>
  lembrando da sua consulta no dia *${consultationDate}*.
  <br><br>
  Preciso que me envie comprovante de pagamento da sua consulta com vencimento para *${dueDate}*.
  Bom dia ${getFirstName(fullName)}!
  <br><br>
  Passando pra lembrar da sua consulta com a Dra. Geisa, que está agendada *${consultationDate} às XX h*.
  <br><br>
  A reserva do horário fica confirmada após envio do comprovante de pagamento.<br>
  (Vencimento: *${dueDate}*).
  <br><br>
  ⚠️ *A agenda presencial é mais apertada, então precisamos dessa confirmação para garantir sua vaga.*
  <br><br>
  🙀 *Cancelamentos de última hora prejudicam quem está mais precisando.*
  <br><br>
  🙏 *Caso precise de prazo, por favor nos solicite. Também podemos reagendar sua consulta para uma 
  data que fique melhor para você.*
  <br><br>
  Agradecemos a sua comprensão 🌈
  <br><br><br>
  `;

  return message + messageBuilder;
}
// *****************************************************************************************