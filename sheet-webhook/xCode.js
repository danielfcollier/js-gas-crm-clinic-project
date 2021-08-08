// ------------------------------------------------------------------------------------------------
/*
{"event":"PAYMENT_OVERDUE","payment":{"object":"payment","id":"pay_6539138723400195","dateCreated":"2021-07-08","customer":"cus_000018740001","paymentLink":null,"value":280,"netValue":278.01,"originalValue":null,"interestValue":null,"description":"Consulta Online - Modalidade Beija-flor","billingType":"UNDEFINED","status":"OVERDUE","dueDate":"2021-07-18","originalDueDate":"2021-07-18","paymentDate":null,"clientPaymentDate":null,"invoiceUrl":"https://www.asaas.com/i/6539138723400195","invoiceNumber":"61786531","externalReference":null,"deleted":false,"anticipated":false,"creditDate":null,"estimatedCreditDate":null,"bankSlipUrl":"https://www.asaas.com/b/pdf/6539138723400195","lastInvoiceViewedDate":null,"lastBankSlipViewedDate":null,"discount":{"value":0.00,"limitDate":null,"dueDateLimitDays":0,"type":"FIXED"},"fine":{"value":0.00,"type":"FIXED"},"interest":{"value":0.00,"type":"PERCENTAGE"},"postalService":false}}

{"event":"PAYMENT_RECEIVED","payment":{"object":"payment","id":"pay_8519890049784721","dateCreated":"2021-05-18","customer":"cus_000021043430","paymentLink":null,"value":360,"netValue":358.01,"originalValue":null,"interestValue":0,"description":"Consulta Presencial - Modalidade Beija-flor","billingType":"BOLETO","confirmedDate":"2021-06-26","status":"RECEIVED","dueDate":"2021-06-15","originalDueDate":"2021-06-15","paymentDate":"2021-06-26","clientPaymentDate":"2021-06-25","invoiceUrl":"https://www.asaas.com/i/8519890049784721","invoiceNumber":"57250951","externalReference":null,"deleted":false,"anticipated":false,"creditDate":"2021-06-26","estimatedCreditDate":null,"bankSlipUrl":"https://www.asaas.com/b/pdf/8519890049784721","lastInvoiceViewedDate":null,"lastBankSlipViewedDate":null,"discount":{"value":0.00,"limitDate":null,"dueDateLimitDays":0,"type":"FIXED"},"fine":{"value":0.00,"type":"FIXED"},"interest":{"value":0.00,"type":"PERCENTAGE"},"postalService":false}}
*/
// ------------------------------------------------------------------------------------------------
function doPost(e) {
  // Init database connection
  const tempDB = new TempDB();

  // New dataMember
  const tempMember = new Member(tempDB);

  // Parse data
  const dataReceiver = JSON.parse(e.postData.contents);

  // Transfer data to dataMember
  tempMember.init(dataReceiver);

  // Post data at the database
  tempDB.createDBRow(tempMember);
}
// ------------------------------------------------------------------------------------------------