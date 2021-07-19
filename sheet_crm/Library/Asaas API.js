// *****************************************************************************************
function asaasApi_connection(endpoint, action, body) {

  // Initilization
  let params = {
    method: action,
    headers: {
      'access_token': asaasApiKey,
      'content-type': 'application/json'
    },
  };

  let isBodyNotEmpty = !(body === "");
  if (isBodyNotEmpty) {
    params.payload = JSON.stringify(body);
  }

  // Action
  let responseJSON = UrlFetchApp.fetch(endpoint, params);
  let responseText = JSON.parse(responseJSON.getContentText());

  //Logger.log(responseText);

  let responseCode = responseJSON.getResponseCode();

  // Verification
  if (responseCode === 200) {
    return responseText;
  }
  else {
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_buildBodyFor(type) {
  try {
    let body = eval("body" + type);
    return body;
  }
  catch (err) {
    Logger.log("Type either: [customer, payment, installment]");
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_getId(endpoint, body) {
  try {
    endpoint = asaasRoot + asaasEndpoint[endpoint];
    let response = asaasApi_connection(endpoint, "post", body);
    if (response === "error") {
      return response;
    }
    return response.id;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_getBarCode(paymentId) {
  let endpoint = asaasRoot + asaasEndpoint["payment"] + "/" + paymentId + "/identificationField";

  try {
    let response = asaasApi_connection(endpoint, "get", "");
    if (response === "error") {
      return response;
    }
    return response.identificationField;
  }
  catch (err) {
    Logger.log("Error in asaasApi_getBarCode(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getBarCode() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************
function asaasApi_changeDueDate(paymentId, dueDate) {
  let endpoint = asaasRoot + asaasEndpoint["payment"] + "/" + paymentId;

  try {
    let body = {
      'dueDate': dueDate,
    };
    let response = asaasApi_connection(endpoint, "post", body);
    if (response === "error") {
      return response;
    }
    return response;
  }
  catch (err) {
    Logger.log("Error in asaasApi_changeDueDate(), @endpoint: " + endpoint + " > " + err.toString())
    sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_changeDueDate() @endpoint: " + endpoint);
    return "error";
  }
}
// *****************************************************************************************