// ------------------------------------------------------------------------------------------------
class Member {
  // ----------------------------------------------------------------------------------------------
  constructor(database, row = "") {
    let dataArray;
    this.database = database;

    if (typeof row === "number") {
      dataArray = this.database.readDBRow(row);
    }
    else {
      dataArray = new Array(this.database.maxColumns - 1);
    }

    this.mapToMember(dataArray, { type: "array" });
  }
  // ----------------------------------------------------------------------------------------------
  rules() {
    this.database.applyDBRules(this);
  }
  // ----------------------------------------------------------------------------------------------
  init(initObj = {}) {
    for (const property in initObj) {
      this[property] = initObj[property];
    }

    this.rules();
  }
  // ----------------------------------------------------------------------------------------------
  apply(callback) {
    return callback(this);
  }
  // ----------------------------------------------------------------------------------------------
  update(dataObj) {
    for (const property in dataObj) {
      if (this.hasOwnProperty(property) && dataObj[property] !== null) {

        this.logUpdate({
          From: this[property],
          To: dataObj[property],
          Id: this.Id,
          Property: property
        });

        this[property] = dataObj[property];
      }
    }

    this.rules();
  }
  // ----------------------------------------------------------------------------------------------
  checkProperty(invitedMember, thisProperty, iventedMemberProperty = null) {
    return (this[thisProperty] === invitedMember[iventedMemberProperty ?? thisProperty]) ?
      null : invitedMember[iventedMemberProperty ?? thisProperty];
  }
  // ----------------------------------------------------------------------------------------------
  mapToMember(dataToMap, options = { type: "member" }) {
    if (options.type === "array") {
      this.database.Keys.forEach((property, index) => this[property] = dataToMap[index] ?? "");
    }
    else if (options.type === "member") {
      this.mapToMember(this.database.mapToArray(dataToMap), { type: "array" });
    }
  }
  // ----------------------------------------------------------------------------------------------
  logUpdate(objLog) {
    console.log(`### Member Update # Id: ${objLog.Id} > Property: ${objLog.Property}` +
      ` > From: ${objLog.From} > To: ${objLog.To}`);
  }
  // ----------------------------------------------------------------------------------------------
}
// ------------------------------------------------------------------------------------------------