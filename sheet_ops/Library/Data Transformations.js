// *****************************************************************************************
// >>> Name
// *****************************************************************************************
function getFirstName(fullName) {
  return fullName.split(" ")[0];
}
// *****************************************************************************************
// >>> Email
// *****************************************************************************************
function formatEmail(email) {
  return email.toLowerCase().replace(/\s/g, "");
}
// *****************************************************************************************
// >>> CPF
// *****************************************************************************************
function formatCPF(cpf) { //cleanNumberString(number)
  return cpf.toString().replace(/\D/g, '');
}
// *****************************************************************************************
// Credits: https://gist.github.com/joaohcrangel/8bd48bcc40b9db63bef7201143303937
function isValidCPF(cpf) {
  cpf = cpf.toString();
  if (typeof cpf !== "string") return false
  cpf = cpf.replace(/[\s.-]*/igm, '')
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return false
  }
  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11)) resto = 0
  if (resto != parseInt(cpf.substring(9, 10))) return false
  soma = 0
  for (var i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11)) resto = 0
  if (resto != parseInt(cpf.substring(10, 11))) return false
  return true
}
// *****************************************************************************************
function showCPF(cpf) {
  cpf = cpf.toString().replace(/[^\d]/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
// *****************************************************************************************
// >>> Phone
// *****************************************************************************************
function formatPhone(phone) {

  let internationalNumber = cleanPhone(phone);
  let isInternational = (internationalNumber[0] === "+") ? true : false;
  let isInternatiaonalFormatBR = false;
  let localNumber;

  if (isInternational) {
    isInternatiaonalFormatBR = (internationalNumber.slice(0, 3) === "+55") ? true : false;

    if (!isInternatiaonalFormatBR) {
      return internationalNumber;
    }
    else {
      localNumber = internationalNumber.slice(3);
    }
  }
  else {
    localNumber = internationalNumber;
  }

  isInternatiaonalFormatBR = (localNumber.length > 11 && localNumber.slice(0, 2) === "55") ? true : false;

  if (isInternatiaonalFormatBR) {
    localNumber = localNumber.slice(2);
  }

  if (localNumber.length === 10) {
    localNumber = localNumber.slice(0, 2) + "9" + localNumber.slice(2);
  }

  return localNumber;
  // ***************************************************************************************
  function cleanPhone(phone) {
    return phone.toString().replace(/[^\d+]/g, '');
  }
}
// *****************************************************************************************
function isValidPhone(phone) {

  let localPattern = new RegExp("^\\d{11}$");
  let internationalPattern = new RegExp("^\\+\\d{13,15}$");

  return (localPattern.test(phone) || internationalPattern.test(phone));
}
// *****************************************************************************************
function showPhone(phone) {
  phone = phone.toString();

  if (phone.length===11) {
    phone = phone.replace(/(\d{2})(\d{5})(\d{3})/, "($1) $2-$3");
  }
  else {
    phone = `+${phone}`;
  }

  return phone;
}
// *****************************************************************************************
// >>> ZipCode
// *****************************************************************************************
function isValidZipCode(zipcode) {

  if (zipcode === "") {
    return false;
  }

  let objZipcode = Maps.newGeocoder().geocode(zipcode);

  return objZipcode.status === "OK";
}
// *****************************************************************************************
function formatZipCode(zipcode) {
  return zipcode.toString().replace(/[\s.-]*/igm, '')
}
// *****************************************************************************************
function showZipCode(zipcode) {
  zipcode = zipcode.toString().replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");
  return zipcode;
}
// *****************************************************************************************
// >>> Price
// *****************************************************************************************
function isValidPrice(price) {
  if (!(typeof (price) === "number")) {
    return false;
  }
  return (price < MAX_PRICE && price >= 0) ? true : false;
}
// *****************************************************************************************
// >>> Date
// *****************************************************************************************
function isValidDate(date) {
  try {
    let dateSplit;

    if ((typeof date) === 'number') {
      dateSplit = formatDate(date, 1).split("/");
    }
    else if ((typeof date) === 'string') {
      dateSplit = date.split("/");
    }
    else {
      return false;
    }

    let dd = Number(dateSplit[0]);
    let mm = Number(dateSplit[1]);
    let yyyy = Number(dateSplit[2]);
    let year = (new Date).getUTCFullYear();

    let statement = (1 <= dd) && (dd <= 31) && (1 <= mm) && (mm <= 12) && ((year - 1) <= yyyy) && (yyyy <= (year + 1));

    if (statement) {
      return true;
    }
    else {
      return false;
    }
  }
  catch (err) {
    sendEmailToOwner_errorNotification("[CRM] Library > Data Transformations.js > isValidDate()");
    return false;
  }
}
// *****************************************************************************************
function formatDate(date, type = 1) {

  switch (type) {
    case 1:
      return Utilities.formatDate(date, "GMT-03:00", "dd/MM/yyyy");
    case 2:
      return Utilities.formatDate(date, "GMT-03:00", "yyyy-MM-dd");
    default:
      return Utilities.formatDate(date, "GMT-03:00", "dd/MM/yyyy");
  }
  /*
  let day = date.getDate().toString();
  let dayF = (day.length == 1) ? '0' + day : day;
  let month = (date.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
  let monthF = (month.length == 1) ? '0' + month : month;
  let yearF = date.getFullYear();

  switch (type) {
    case 1:
      return dayF + "/" + monthF + "/" + yearF;
    case 2:
      return yearF + "-" + monthF + "-" + dayF;
    default:
      return dayF + "/" + monthF + "/" + yearF;
  }
  */
}
// *****************************************************************************************
// Credits: https://stackoverflow.com/questions/6356164/simple-javascript-date-math-not-really
function incrementDate(date, amount) {
  let tmpDate = new Date(date);
  tmpDate.setDate(tmpDate.getDate() + amount)
  return tmpDate;
};
// *****************************************************************************************
function incrementHours(date) {
  let tmpDate = new Date(date);
  tmpDate.setHours(tmpDate.getHours() + TIMEZONE_OFFSET)
  return tmpDate;
};
// *****************************************************************************************
function stringDateToDate(date, option = 1) {

  let year, month, day;
  let dateSplit;

  switch (option) {
    case 2:
      dateSplit = date.split("-");
      year = dateSplit[0];
      month = dateSplit[1];
      day = dateSplit[2];
      break;
      
    default:
      dateSplit = date.split("/");
      day = dateSplit[0];
      month = dateSplit[1];
      year = dateSplit[2];
  }

  return new Date(year + "-" + month + "-" + day + "T12:00:00Z")
}
// *****************************************************************************************
// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
// Week starts on Sunday
Date.prototype.getWeek = function () {
  let date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  let week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7);
}
// *****************************************************************************************
// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function () {
  let date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}
// *****************************************************************************************