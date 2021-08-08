// *****************************************************************************************
function $booking_isDataNotValid(dataRow) {

  // Initialization
  let message = "";

  // Data Validation
  let isDataIntegrityNotValid;
  [isDataIntegrityNotValid, message] = $booking_isDataIntegrityNotValid(dataRow);
  if (isDataIntegrityNotValid) {
    return [true, message];
  }

  // Booking Validation
  let isBookingIntegrityNotValid;
  [isBookingIntegrityNotValid, message] = $booking_isBookingIntegrityNotValid(dataRow);
  if (isBookingIntegrityNotValid) {
    return [true, message];
  }

  //
  return [false, message];
}
// *****************************************************************************************
function $booking_isDataIntegrityNotValid(dataRow) {

  // Initilization
  let message = "";

  //
  let isEmailotValid = dataRow[crm.Email - 1] === "";
  if (isEmailotValid) {
    message = "Email inválido!";
    return [true, message];
  }

  //
  let isCPFNotValid = !(isValidCPF(dataRow[crm.CPF - 1]));
  if (isCPFNotValid) {
    message = "Número de CPF inválido! Por favor confirme número com paciente.";
    return [true, message];
  }

  //
  let isPhoneNotValid = !(isValidPhone(dataRow[crm.Phone - 1]));
  if (isPhoneNotValid) {
    message = "Formato de número de telefone incorreto.";
    return [true, message];
  }

  //
  let isZipCodeNotValid = !((isValidZipCode(dataRow[crm.ZipCode - 1]) || (dataRow[crm.ZipCode - 1]) === ""));
  if (isZipCodeNotValid) {
    message = "Número de CEP inválido! Por favor confirme número com paciente.";
    return [true, message];
  }

  //
  return [false, message];
}
// *****************************************************************************************
function $booking_isBookingIntegrityNotValid(dataRow) {

  // Initialization
  let message;

  //
  let isDateNotValid = (dataRow[crm.ConsultationDate - 1] === "");
  isDateNotValid = isDateNotValid ? true : !(isValidDate(formatDate(dataRow[crm.ConsultationDate - 1])));
  if (isDateNotValid) {
    message = "Há algum problema com a Data da Consulta.";
    return [true, message];
  }

  //
  let isCRMStatusNotValid = dataRow[crm.CRMStatus - 1] == "" || dataRow[crm.CRMStatus - 1] === "Cancelada" || dataRow[crm.CRMStatus - 1] === "Atendimento";
  if (isCRMStatusNotValid) {
    message = 'Confirme a cidade do agendamento pelo menu "Débora Secretária".';
    return [true, message];
  }

  //
  let isCRMKindNotValid = dataRow[crm.CRMKind - 1] == "";
  if (isCRMKindNotValid) {
    message = 'Informe o "Momento:" da consulta: 1ª Consulta ou Seguimento.';
    return [true, message];
  }

  //
  let isConsultationKindNotValid = dataRow[crm.ConsultationKind - 1] == "";
  if (isConsultationKindNotValid) {
    message = 'É preciso informar se a consulta é Online, Presencial ou DIU.';
    return [true, message];
  }

  //
  let isModalityNotValid = dataRow[crm.Modality - 1] == "";
  if (isModalityNotValid) {
    message = "Atenção: informe a modalidade da consulta.";
    return [true, message];
  }

  //
  let isConsultationValueNotValid = dataRow[crm.ConsultationValue - 1] === "error";
  if (isConsultationValueNotValid) {
    message = "Erro ao determinar o valor da consulta, verifique as informações."
    return [true, message];
  }

  //
  return [false, message];
}
// *****************************************************************************************