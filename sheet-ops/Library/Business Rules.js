// *****************************************************************************************
function businessRules_consultationPrice(dataRow) {

  // Initialization
  let kind = dataRow[crm.ConsultationKind - 1];
  let modality = dataRow[crm.Modality - 1];
  let paymentType = dataRow[crm.PaymentType - 1];
  let consultationValue = dataRow[crm.ConsultationValue - 1];

  // Verification
  let isNotHereThePriceDefinition = (paymentType === "Parcelamento") || (consultationValue !== "");
  if (isNotHereThePriceDefinition) {
    return consultationValue;
  }

  // Action
  consultationValue = (kind === "DIU") ? consultationInfos[kind] : consultationInfos[kind + modality];
  return (typeof (consultationValue) == "undefined") ? "error" : consultationValue;
}
// *****************************************************************************************
function businessRules_consultationInfo(dataRow) {

  // Initialization
  let kind = dataRow[crm.ConsultationKind - 1];
  let modality = dataRow[crm.Modality - 1];

  // Action
  try {
    return (kind === "DIU") ? "Consulta " + kind : "Consulta " + kind + " - Modalidade " + modality;
  }
  catch (err) {
    return "error";
  }
}
// *****************************************************************************************