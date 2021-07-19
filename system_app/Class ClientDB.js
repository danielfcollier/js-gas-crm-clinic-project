// ------------------------------------------------------------------------------------------------
class ClientDB extends DBConnection {
  // ----------------------------------------------------------------------------------------------
  constructor() {
    const dataObj = {
      SheetId: SHEET_ID.DATABASES,
      SheetName: DB.CLIENT.NAME,
      Keys: DB.CLIENT.FIELD
    };

    super(dataObj);
  }
  // ----------------------------------------------------------------------------------------------
  applyDBRules(dataMember) {
    dataMember.FirstName = dataMember.apply(Lib.getFirstName);
    dataMember.Age = (dataMember.Birthday === "") ? "" : dataMember.apply(Lib.getAge);
    dataMember.LastDayCount = (dataMember.LastConsultation === "") ? "" : Lib.getDaysDiff(dataMember.LastConsultation);

    super.applyDBRules();
  }
  // ----------------------------------------------------------------------------------------------
}
// ------------------------------------------------------------------------------------------------