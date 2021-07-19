// *****************************************************************************************
function asaasApi_getPaymentStatus(paymentId) {
  let endpoint, response;

  try {
    endpoint = asaasRoot + asaasEndpoint["payment"] + `/${paymentId}`;
    response = asaasApi_connection(endpoint, "get", "");

    if (response === "error") { return [response, "", ""]; }

    const paymentStatus = [response.status, response.clientPaymentDate, 
      (response.lastInvoiceViewedDate !== null), response.value, response.netValue, response.billingType];

    return paymentStatus;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
    return [response, "", ""];
  }
}
// *****************************************************************************************
function asaasApi_deleteCustomer(customerId) {
  let endpoint;

  try {
    endpoint = asaasRoot + asaasEndpoint["customer"] + `/${customerId}`;
    let response = asaasApi_connection(endpoint, "delete", "");
    if (response === "error") {
      return response;
    }
    return response.deleted;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_deletePayment(paymentId) {
  let endpoint;

  try {
    endpoint = asaasRoot + asaasEndpoint["payment"] + `/${paymentId}`;
    let response = asaasApi_connection(endpoint, "delete", "");
    if (response === "error") {
      return response;
    }
    return response.deleted;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_updateCustomer(customerId, bodyUpdate) {
  let endpoint;

  try {
    endpoint = asaasRoot + asaasEndpoint["customer"] + `/${customerId}`;
    let response = asaasApi_connection(endpoint, "post", bodyUpdate);
    if (response === "error") {
      return response;
    }
    return response;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_updatePayment(paymentId, bodyUpdate) {
  let endpoint;

  try {
    endpoint = asaasRoot + asaasEndpoint["payment"] + `/${paymentId}`;
    let response = asaasApi_connection(endpoint, "post", bodyUpdate);
    if (response === "error") {
      return response;
    }
    return response;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_receiveInCash(paymentId, payDate, value) {
  let endpoint;

  let body = {
    'paymentDate': payDate,
    'value': value,
  };

  try {
    endpoint = asaasRoot + asaasEndpoint["payment"] + `/${paymentId}/receiveInCash`;
    let response = asaasApi_connection(endpoint, "post", body);
    if (response === "error") {
      return response;
    }
    return response.deleted;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************