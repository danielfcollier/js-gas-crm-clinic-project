// ------------------------------------------------------------------------------------------------
class CrmDB extends DBConnection {
  // ----------------------------------------------------------------------------------------------
  constructor() {
    const dataObj = {
      SheetId: SHEET_ID.DATABASES,
      SheetName: DB.CRM.NAME,
      Keys: DB.CRM.FIELD
    };

    super(dataObj);
  }
  // ----------------------------------------------------------------------------------------------
}
// ------------------------------------------------------------------------------------------------