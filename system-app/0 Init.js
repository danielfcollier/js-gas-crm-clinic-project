// ------------------------------------------------------------------------------------------------
const SHEET_ID = {
  DATABASES: "1u2Z-Lr6-Pb2KzfQWjajG1hRVXGFaGAtZvDX-fC_Fr5s",
  BOOKINGS: "1pCcO2XlvO7jyE7EEQiyEJ6HieeLcQc4PotatmQ4z7uw"
};
// ------------------------------------------------------------------------------------------------
const DB = {
  // ----------------------------------------------------------------------------------------------
  CLIENT: {
    NAME: "Client",
    FIELD: {
      Status: 1,
      FullName: 2,
      FirstName: 3,
      Id: 4,
      CPF: 5,
      RG: 6,
      Phone: 7,
      Email: 8,
      Birthday: 9,
      ZipCode: 10,
      Age: 11,
      Folder: 12,
      CustomerId: 13,
      LastConsultation: 14,
      LastDayCount: 15,
      TotalConsultations: 16,
      Since: 17,
      City: 18,
      WordPressId: 19,
      FlowControl: 20,
      EmailMarketing: 21,
      LastCampaign: 22
    }
  },
  // ----------------------------------------------------------------------------------------------
  CRM: {
    NAME: "CRM",
    FIELD: {
      TimeStamp: 1,
      CRMId: 2,
      CRMStatus: 3,
      CRMKind: 4,
      FullName: 5,
      Birthday: 6,
      CPF: 7,
      RG: 8,
      Email: 9,
      ZipCode: 10,
      Phone: 11,
      ConsultationDate: 12,
      ConsultationTime: 13,
      ConsultationKind: 14,
      Modality: 15,
      PaymentType: 16,
      ConsultationValue: 17,
      Row: 18,
      StatusPayment: 19,
      Folder: 20,
      Receipt: 21,
      PhoneLink: 22,
      CustomerId: 23,
      PaymentId: 24,
      DueDate: 25,
      PaymentWatch: 26,
      PaymentDate: 27,
      OpexPayment: 28,
      OpexTaxes: 29,
      DeleteFlag: 30,
      FlowControl: 31
    }
  },
  // ----------------------------------------------------------------------------------------------
  BOOKINGS: {
    NAME: "Agendamentos"
  }
  // ----------------------------------------------------------------------------------------------
};
// ------------------------------------------------------------------------------------------------
DB.BOOKINGS.FIELD = DB.CRM.FIELD;
// ------------------------------------------------------------------------------------------------
const CONSTS = {
  MILLISECONDS_IN_A_DAY: 1000*60*60*24
};
// ------------------------------------------------------------------------------------------------