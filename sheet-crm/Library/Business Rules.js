// *****************************************************************************************
function businessRules_consultationPrice(dataRow) {

  // Initialization
  let kind = dataRow[crm.ConsultationKind - 1];
  let modality = dataRow[crm.Modality - 1];
  let paymentType = dataRow[crm.PaymentType - 1];
  let consultationValue = dataRow[crm.ConsultationValue - 1];

  // User Definition
  let isPriceDefinedByUser = ((paymentType === "Parcelamento") && (consultationValue !== ""));
  isPriceDefinedByUser = isPriceDefinedByUser || (paymentType === "Autorizada");
  if (isPriceDefinedByUser) {
    let isPriceDefined = !(consultationValue === "")
    return isPriceDefined ? consultationValue : "error";
  }

  // Not Charging
  let isNotToChargeCustomer = ((consultationValue === 0) || (consultationValue === ""));
  isNotToChargeCustomer = isNotToChargeCustomer && (paymentType === "Sem Cobrança");
  if (isNotToChargeCustomer) {
    return 0;
  }

  // Action
  let trueConsultationValue = (kind === "DIU") ? consultationInfos[kind] : consultationInfos[kind + modality];

  // Verification
  let isSomethingWrongWithPrice = (consultationValue === "") ? false : (trueConsultationValue !== consultationValue);
  if (isSomethingWrongWithPrice) {
    return "error";
  }

  //
  return (typeof (trueConsultationValue) == "undefined") ? "error" : trueConsultationValue;
}
// *****************************************************************************************
function businessRules_consultationDescription(dataRow) {

  // Initialization
  let kind = dataRow[crm.ConsultationKind - 1];
  let modality = dataRow[crm.Modality - 1];

  // Action
  return (kind === "DIU") ? "Consulta " + kind : "Consulta " + kind + " - Modalidade " + modality;
}
// *****************************************************************************************