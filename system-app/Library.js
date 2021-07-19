// ------------------------------------------------------------------------------------------------
class Lib {
  // ----------------------------------------------------------------------------------------------
  static getFirstName(dataMember) {
    return fun_getFirstName(dataMember.FullName);
  }
  // ----------------------------------------------------------------------------------------------
  static getAge(dataMember) {
    return fun_getAge(dataMember.Birthday);
  }
  // ----------------------------------------------------------------------------------------------
  static getDaysDiff(date) {
    return Math.round((Date.now() - date.getTime()) / (CONSTS.MILLISECONDS_IN_A_DAY));
  }
  // ----------------------------------------------------------------------------------------------
  static getLastRow(sheet) {
    const rangeA1String = "A1:B";

    const dataRange = sheet.getRange(rangeA1String).getValues();

    let lastRowIndex;

    for (let i = dataRange.length - 1; i >= 0; i--) {
      lastRowIndex = i;
      let row = dataRange[i];
      let isBlank = row.every(function (c) { return c == ""; });
      if (!isBlank) {
        break;
      }
    }

    const lastRow = lastRowIndex + 1;

    return lastRow;
  }
  // ----------------------------------------------------------------------------------------------
};
// ------------------------------------------------------------------------------------------------
function fun_getFirstName(fullName) {
  return fullName.split(" ")[0];
}
// ------------------------------------------------------------------------------------------------
function fun_getAge(birthday) {
  const ageDate = new Date(Date.now() - birthday.getTime());
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
// ------------------------------------------------------------------------------------------------