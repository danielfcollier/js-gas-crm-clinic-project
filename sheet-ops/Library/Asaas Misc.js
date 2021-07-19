  // *****************************************************************************************
  function asaasApi_getCurrentBalance() {
    let endpoint;
  
    try {
      endpoint = asaasRoot + asaasEndpoint["finance"] + "/getCurrentBalance";
      let response = asaasApi_connection(endpoint, "get", "");
      if (response === "error") {
        return response;
      }
      return response.totalBalance;
    }
    catch (err) {
      Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
      sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
      return "error";
    }
  }
  // *****************************************************************************************
  function asaasApi_getConfirmedBalance() {
    let endpoint;
  
    try {
      endpoint = asaasRoot + asaasEndpoint["payment"] + "?status=CONFIRMED&limit=100";
      let response = asaasApi_connection(endpoint, "get", "");
      if (response === "error") {
        return response;
      }
  
      response = (response.data.map(element => element.netValue * 100).reduce(getSum, 0)) / 100;
  
      function getSum(total, num) {
        return total + num;
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
  //
  //Logger.log(JSON.stringify(asaasApi_getTransactions("2021-03-01","2021-03-04")));
  //
  function asaasApi_getTransactions(startDate, finishDate) {
    let endpoint;
    let offset = 0;
    let queryString = `?startDate=${startDate}&finishDate=${finishDate}&offset=${offset}&limit=60`;
    Logger.log(queryString)
  
    try {
      endpoint = asaasRoot + asaasEndpoint["transactions"] + queryString;
      let response = asaasApi_connection(endpoint, "get", "");
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
  function notTested_asaasApi_payBill(barCode, payDate, dueDate, value, description) {
    let endpoint;
  
    let body = {
      'identificationField': barCode,
      'scheduleDate': payDate,
      'description': description,
      'discount': 0,
      'dueDate': dueDate,
      'value': value
    };
  
    try {
      endpoint = asaasRoot + asaasEndpoint["bill"];
      let response = asaasApi_connection(endpoint, "post", body);
      if (response === "error") {
        return response;
      }
      return response.totalBalance;
    }
    catch (err) {
      Logger.log("Error in asaasApi_getId(), @endpoint: " + endpoint + " > " + err.toString())
      sendEmailToOwner_errorNotification("[CRM] Library > asaasApi_getId() @endpoint: " + endpoint);
      return "error";
    }
  }
  // *****************************************************************************************
  function notTested_asaasApi_doBankTransfer() {
  
    let body = {
      'value': 5000.00,
      'bankAccount': {
        'bank': {
          'code': '237'
        },
        'accountName': 'Conta do Banco Inter',
        'ownerName': 'Geisa Nery Batista Oliveira',
        'ownerBirthDate': '1985-04-01',
        'cpfCnpj': '00848392108',
        'agency': '0001',
        'account': '9999991',
        'accountDigit': '1',
        'bankAccountType': 'CONTA_CORRENTE',
      }
    };
  
    try {
      endpoint = asaasRoot + asaasEndpoint["transfer"];
      let response = asaasApi_connection(endpoint, "post", body);
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
  function notTested_asaasApi_refundPayment(paymentId) {
    let endpoint;
  
    try {
      endpoint = asaasRoot + asaasEndpoint["payment"] + `/${paymentId}/refund`;
      let response = asaasApi_connection(endpoint, "post", "");
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