// *****************************************************************************************
// >>> REMOVE FROM GITHUB
// *****************************************************************************************
const MODE_ASAAS = true; // true > production, false > sandbox

const ASAAS_API_KEY_PRODUCTION = "7cf0c7ee2bceded46004e2da6dbba3c786916a0451a6aa64620e31a43c3cfb86";
const ASAAS_API_KEY_SANDBOX = "46d2046504f2ac6562a8996226bd213b9c97ecfe08cb08bd6691f42f48cc919f";

const rootProduction = "https://www.asaas.com";
const rootSandbox = "https://sandbox.asaas.com";

const asaasRoot = MODE_ASAAS ? rootProduction : rootSandbox;
const asaasApiKey = MODE_ASAAS ? ASAAS_API_KEY_PRODUCTION : ASAAS_API_KEY_SANDBOX;

// *****************************************************************************************
// >>> ASAAS API CONFIGURATION
// *****************************************************************************************
const customersEndpoint = "/api/v3/customers";
const paymentsEndpoint = "/api/v3/payments";
const installmentsEndpoint = "/api/v3/installments";
const financeEndpoint = "/api/v3/finance";
const transfersEndpoint = "/api/v3/transfers";
const transactionsEndpoint = "/api/v3/financialTransactions";
const billEndpoint = "/api/v3/bill";

const asaasEndpoint = {
  "customer": customersEndpoint,
  "payment": paymentsEndpoint,
  "installment": installmentsEndpoint,
  "finance": financeEndpoint,
  "transfer": transfersEndpoint,
  "transactions": transactionsEndpoint,
  "bill": billEndpoint
}

var bodycustomer = {
  "name": [],
  "email": [],
  "phone": [],
  "mobilePhone": [],
  "cpfCnpj": [],
  "postalCode": [],
  'addressNumber': "s/n",
  "notificationDisabled": true,
  "emailEnabledForProvider": false,
  "smsEnabledForProvider": false,
  "emailEnabledForCustomer": false,
  "smsEnabledForCustomer": false,
  "phoneCallEnabledForCustomer": false
};

var bodypayment = {
  'customer': [],
  'billingType': 'UNDEFINED',
  'dueDate': [],
  'value': [],
  'description': [],
  'postalService': false
};

var bodyinstallment = {
  'customer': [],
  'billingType': 'BOLETO',
  'installmentCount': [],
  'dueDate': [],
  'totalValue': [],
  'description': [],
  'postalService': false
};
// *****************************************************************************************