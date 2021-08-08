// *****************************************************************************************
function $booking_registerCustomerIfNecessary(crmSheet, dataRow) {

  // Initialization
  let message = "";
  let customerId = dataRow[crm.CustomerId - 1];

  // Action
  let isCustomerNotRegistered = (customerId === "");
  if (isCustomerNotRegistered) {

    // Client Database Searching
    if (dataRow[crm.CRMKind - 1] === "Seguimento") {
      customerId = dataExtraction_getClientDataFromClientSheetByFullNameSearch(Client.CustomerId, dataRow[crm.FullName - 1]);
    }

    // Asaas API Registration
    if (customerId === "") {
      customerId = $booking_registerCustomer(dataRow);
    }

    // Error Handling
    if (customerId === "error") {
      message = "Aconteceu um erro possível, se persistir, peça ajuda.";
      return [customterId, message];
    }

    // Storing Customer Id
    crmSheet.getRange(dataRow[crm.Row - 1], crm.CustomerId).setValue(customerId);
  }

  //
  return [customerId, message];
}
// *****************************************************************************************
function $booking_registerCustomer(dataRow) {
  try {
    let body = asaasApi_buildBodyFor("customer");

    body["name"] = dataRow[crm.FullName - 1];
    body["email"] = dataRow[crm.Email - 1];
    body["phone"] = dataRow[crm.Phone - 1];
    body["mobilePhone"] = dataRow[crm.Phone - 1];
    body["cpfCnpj"] = dataRow[crm.CPF - 1];
    body["postalCode"] = dataRow[crm.ZipCode - 1];

    let responseId = asaasApi_getId("customer", body);

    return responseId;
  }
  catch (err) {
    Logger.log("Error in registering the customer in Asaas : " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Secretary > Booking > 03 Customter Registration.js > registerCustomer()");
    return "error";
  }
}
// *****************************************************************************************