// ------------------------------------------------------------------------------------------------
/*
{
   "event":"PAYMENT_RECEIVED",
   "payment":{
      "object":"payment",
      "id":"pay_8519890049784721",
      "dateCreated":"2021-05-18",
      "customer":"cus_000021043430",
      "paymentLink":null,
      "value":360,
      "netValue":358.01,
      "originalValue":null,
      "interestValue":0,
      "description":"Consulta Presencial - Modalidade Beija-flor",
      "billingType":"BOLETO",
      "confirmedDate":"2021-06-26",
      "status":"RECEIVED",
      "dueDate":"2021-06-15",
      "originalDueDate":"2021-06-15",
      "paymentDate":"2021-06-26",
      "clientPaymentDate":"2021-06-25",
      "invoiceUrl":"https://www.asaas.com/i/8519890049784721",
      "invoiceNumber":"57250951",
      "externalReference":null,
      "deleted":false,
      "anticipated":false,
      "creditDate":"2021-06-26",
      "estimatedCreditDate":null,
      "bankSlipUrl":"https://www.asaas.com/b/pdf/8519890049784721",
      "lastInvoiceViewedDate":null,
      "lastBankSlipViewedDate":null,
      "discount":{
         "value":0.00,
         "limitDate":null,
         "dueDateLimitDays":0,
         "type":"FIXED"
      },
      "fine":{
         "value":0.00,
         "type":"FIXED"
      },
      "interest":{
         "value":0.00,
         "type":"PERCENTAGE"
      },
      "postalService":false
   }
}
*/
// ------------------------------------------------------------------------------------------------
class TempDB extends DBConnection {
  // ----------------------------------------------------------------------------------------------
  constructor() {
    const dataObj = {
      SheetId: DB.LEAD.ID,
      SheetName: DB.LEAD.NAME,
      Keys: DB.LEAD.FIELD
    };

    super(dataObj);
  }
  // ----------------------------------------------------------------------------------------------
  applyDBRules(dataMember) {
    dataMember.TimeStamp = new Date();
    dataMember.PaymentId = dataMember.payment.id;
    dataMember.CustomerId = dataMember.payment.customer;
    dataMember.StatusPayment = dataMember.payment.status;
    dataMember.PaymentDate = dataMember.payment.paymentDate;
    dataMember.ConsultationValue = dataMember.payment.value;
    dataMember.PaymentType = dataMember.payment.billingType;
    
    super.applyDBRules();
  }
  // ----------------------------------------------------------------------------------------------
}
// ------------------------------------------------------------------------------------------------