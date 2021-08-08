// *****************************************************************************************
// >>> CLIENT DATABASE ACCESS CONFIGURATION
// *****************************************************************************************
const CLIENT_DATABASE_LIMIT = 3000;
const MAX_PRICE = 900;

const SheetIdDatabase = "1u2Z-Lr6-Pb2KzfQWjajG1hRVXGFaGAtZvDX-fC_Fr5s";
const SheetIdCRM = "1pCcO2XlvO7jyE7EEQiyEJ6HieeLcQc4PotatmQ4z7uw";
const SheetIdManager = "1xXSIuu72koni-j0s0OKobP3qwu7VmRgnqf8UdiBxVLw";
const SheetIdUser = "1wJ2YB6j_gLBzgRy07W6xfmfNzf4Al2zFKS5RLst2kZQ";

// *****************************************************************************************
var Client = [];
var CRM = [];
var Lead = [];

var crm = [];

// *****************************************************************************************
Client.SheetName = "Client";
Client.MaxRange = "R";
Client.ConfigurationSheet = "Config";

CRM.SheetName = "CRM";

Lead.SheetName = "Lead";
Lead.MaxRange = "I";

crm.SheetName = "Agendamentos";
crm.MaxRange = "AD";
CRM.MaxRange = "AD";

// *****************************************************************************************
Client.Status = 1;
Client.FullName = 2;
Client.FirstName = 3;
Client.Id = 4;
Client.CPF = 5;
Client.RG = 6;
Client.Phone = 7;
Client.Email = 8;
Client.Birthday = 9;
Client.ZipCode = 10;
Client.Age = 11;
Client.Folder = 12;
Client.CustomerId = 13;
Client.LastConsultation = 14;
Client.LastDayCount = 15;
Client.TotalConsultations = 16;
Client.Since = 17;
Client.City = 18;
Client.WordPressId = 19;
Client.FlowControl = 20;
Client.EmailMarketing = 21;
Client.LastCampaign = 22;

// *****************************************************************************************
Lead.Since = 1;
Lead.FullName = 2;
Lead.FirstName = 3;
Lead.Email = 4;
Lead.Phone = 5;
Lead.Birthday = 6;
Lead.Age = 7;
Lead.ZipCode = 8;
Lead.Source = 9;

// *****************************************************************************************
crm.TimeStamp = 1;
crm.CRMId = 2;
crm.CRMStatus = 3;
crm.CRMKind = 4;
crm.FullName = 5;
crm.Birthday = 6;
crm.CPF = 7;
crm.RG = 8;
crm.Email = 9;
crm.ZipCode = 10;
crm.Phone = 11;
crm.ConsultationDate = 12;
crm.ConsultationTime = 13;
crm.ConsultationKind = 14;
crm.Modality = 15;
crm.PaymentType = 16;
crm.ConsultationValue = 17;
crm.Row = 18;
crm.StatusPayment = 19;
crm.Folder = 20;
crm.Receipt = 21;
crm.PhoneLink = 22;
crm.CustomerId = 23;
crm.PaymentId = 24;
crm.DueDate = 25;
crm.PaymentWatch = 26;
crm.PaymentDate = 27;
crm.OpexPayment = 28;
crm.OpexTaxes = 29;
crm.FlowControl = 30;

// *****************************************************************************************
// >>> CRM ACCESS CONFIGURATION
// *****************************************************************************************
const SHEET_OFFSET = 2;

const configSheets_ColumnIdentifierLocation = {
  "Agendamentos": "R",
  "CRM": "R",
  "Semana": "C"
}
// ****************************************************************************************