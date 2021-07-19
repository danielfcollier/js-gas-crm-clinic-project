// ------------------------------------------------------------------------------------------------
function run() {
  const clientDB = new ClientDB();
  const crmDB = new CrmDB();

  const clientMember = new Member(clientDB);
  const crmMember = new Member(crmDB, 543);

  clientMember.mapToMember(crmMember);

  const clientInitObj = {
    Status: (crmMember.StatusPayment === "Confirmado") ? true : false,
    City: crmMember.CRMStatus,
    Id: crmMember.CustomerId,
    Since: crmMember.ConsultationDate,
    LastConsultation: crmMember.ConsultationDate,
    TotalConsultations: 1
  };

  clientMember.init(clientInitObj);

  console.log(clientMember);

  //const crmMember = new Member(crmDB, 543);
  const paymentStatus = (crmMember.StatusPayment === "Confirmado") ? true : false;
  const clientUpdateObj = {
    Phone: clientMember.checkProperty(crmMember, "Phone"),
    Email: clientMember.checkProperty(crmMember, "Email"),
    ZipCode: clientMember.checkProperty(crmMember, "ZipCode"),
    LastConsultation: clientMember.checkProperty(crmMember, "LastConsultation", "ConsultationDate"),
    TotalConsultations: clientMember.TotalConsultations + 1,
    City: clientMember.checkProperty(crmMember, "City", "CRMStatus"),
    Status: (clientMember.Status === paymentStatus) ? null : paymentStatus,
  };
  clientMember.update(clientUpdateObj);


  //clientDB.createDBRow(clientMember);
}
// ------------------------------------------------------------------------------------------------
function run2() {
  const clientDB = new ClientDB();
  const clientMember = new Member(clientDB);

  const crmDB = new CrmDB();
  const crmMember = new Member(crmDB);

  const dataBulk = crmDB.readDB();

  const dataFiltered = dataBulk
    .filter(dataRow => {
      crmMember.mapToMember(dataRow, { type: "array" });

      return (crmMember.CRMStatus !== "Cancelada") &&
        (crmMember.CRMKind === "1ª Consulta") &&
        (crmMember.CustomerId !== '') &&
        (crmMember.ConsultationDate.getTime() > (new Date(2020, 1, 1)).getTime());
    })
    .filter(dataRow => {
      crmMember.mapToMember(dataRow, { type: "array" });

      const [dataArray, row] = clientDB.readDBId(crmMember.CustomerId);
      return row === -1;
    })
    .forEach(dataRow => {

      crmMember.mapToMember(dataRow, { type: "array" });

      clientMember.mapToMember(crmMember);

      const clientInitObj = {
        Status: (crmMember.StatusPayment === "Confirmado") ? true : false,
        City: crmMember.CRMStatus,
        Id: crmMember.CustomerId,
        Since: crmMember.ConsultationDate,
        LastConsultation: crmMember.ConsultationDate,
        TotalConsultations: 1
      };

      //clientMember.init(clientInitObj);

      //clientDB.createDBRow(clientMember);

      console.log(dataRow)
    })



  /*
    .forEach(dataRow => {
      crmMember.mapToMember(dataRow, { type: "array" });
      clientMember.mapToMember(crmMember);
      clientMember.update();
      console.log(clientMember)
    })
  */
}
// ------------------------------------------------------------------------------------------------