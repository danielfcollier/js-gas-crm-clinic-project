
// *****************************************************************************************
function weeksTest() {
  const testDate = new Date(2021, 0, 5);
  const weekSheet = SpreadsheetApp.getActive().getSheetByName("Weeks");
  const dates = weekSheet.getRange("D2:E106").getValues(); //106

  dates.forEach(dateArray => {
    dateArray[0] = incrementHours(dateArray[0]);
    dateArray[1] = incrementHours(dateArray[1]);
    Logger.log(`W${dateArray[0].getWeek()} > ${formatDate(dateArray[0])} --- W${dateArray[1].getWeek()} > ${formatDate(dateArray[1])}`)
  });
}
// *****************************************************************************************
function buildWeeklySummary(summaryYear = 2020) {
  const dataBulk = dataExtraction_extratDatafromCRMSheet(option = 2);

  //const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
  const dbSheet = SpreadsheetApp.openById(SheetIdDatabase).getSheetByName(CRM.SheetName);

  let weeklySumForConsultations = {};
  let weeklySumForCashFlow = {};

  dataBulk
    .filter(dataRow => {
      const isPaymentConfirmed = (dataRow[crm.StatusPayment - 1] === "Confirmado")
      const isPaymentVerified = (dataRow[crm.PaymentDate - 1] !== "");
      return isPaymentConfirmed && isPaymentVerified;
    })
    .forEach(dataRow => {
      const consultationDate = incrementHours(dataRow[crm.ConsultationDate - 1]);
      const paymentDate = incrementHours(dataRow[crm.PaymentDate - 1]);
      const consultationValue = dataRow[crm.ConsultationValue - 1];

      const yearWeekConsultation = `${consultationDate.getFullYear()}-${consultationDate.getWeek()}`;
      const yearWeekPayment = `${paymentDate.getFullYear()}-${paymentDate.getWeek()}`;

      if (weeklySumForConsultations[yearWeekConsultation] === undefined) {
        weeklySumForConsultations[yearWeekConsultation] = [consultationValue];
      }
      else {
        weeklySumForConsultations[yearWeekConsultation].push(consultationValue);
      }

      if (weeklySumForCashFlow[yearWeekPayment] === undefined) {
        weeklySumForCashFlow[yearWeekPayment] = [consultationValue];
      }
      else {
        weeklySumForCashFlow[yearWeekPayment].push(consultationValue);
      }
    });

  const summaryWeeks = getWeeklySummary(summaryYear);
  let weeklySummary = [];

  summaryWeeks.forEach((weekFlow, index) => {
    weeklySummary.push([
      weekFlow,
      weeklySumForConsultations[weekFlow] === undefined ? 0 : weeklySumForConsultations[weekFlow].reduce(getSum, 0),
      weeklySumForCashFlow[weekFlow] === undefined ? 0 : weeklySumForCashFlow[weekFlow].reduce(getSum, 0)
    ]);
    Logger.log(weeklySummary[index]);
  });

  //Logger.log(monthlySum["2020-3"])
  //const total = consultationValues.reduce(getSum, 0);
  //console.log(`>>> Total R$${total}`);
}
// *****************************************************************************************
function getWeeklySummary(summaryYear) {
  let summaryWeeks = [];
  for (let i = 1; i <= 52; i++) {
    summaryWeeks.push(`${summaryYear}-${i}`)
  }
  return summaryWeeks;
}
// *****************************************************************************************
function buildMonthlySummary(summaryYear = 2020) {
  const dataBulk = dataExtraction_extratDatafromCRMSheet(option = 2);

  let monthlySumForConsultations = {};
  let monthlySumForCashFlow = {};

  dataBulk
    .filter(dataRow => {
      const isPaymentConfirmed = (dataRow[crm.StatusPayment - 1] === "Confirmado")
      const isPaymentVerified = (dataRow[crm.PaymentDate - 1] !== "");
      return isPaymentConfirmed && isPaymentVerified;
    })
    .forEach(dataRow => {
      const consultationDate = incrementHours(dataRow[crm.ConsultationDate - 1]);
      const paymentDate = incrementHours(dataRow[crm.PaymentDate - 1]);
      const consultationValue = dataRow[crm.ConsultationValue - 1];

      const yearMonthConsultation = `${consultationDate.getFullYear()}-${consultationDate.getMonth() + 1}`;
      const yearMonthPayment = `${paymentDate.getFullYear()}-${paymentDate.getMonth() + 1}`;

      if (monthlySumForConsultations[yearMonthConsultation] === undefined) {
        monthlySumForConsultations[yearMonthConsultation] = [consultationValue];
      }
      else {
        monthlySumForConsultations[yearMonthConsultation].push(consultationValue);
      }

      if (monthlySumForCashFlow[yearMonthPayment] === undefined) {
        monthlySumForCashFlow[yearMonthPayment] = [consultationValue];
      }
      else {
        monthlySumForCashFlow[yearMonthPayment].push(consultationValue);
      }
    });

  const summaryMonths = getMonthlySummary(summaryYear);
  let monthlySummary = [];

  summaryMonths.forEach((monthFlow, index) => {
    monthlySummary.push([
      monthFlow,
      monthlySumForConsultations[monthFlow] === undefined ? 0 : monthlySumForConsultations[monthFlow].reduce(getSum, 0),
      monthlySumForCashFlow[monthFlow] === undefined ? 0 : monthlySumForCashFlow[monthFlow].reduce(getSum, 0)
    ]);
    Logger.log(monthlySummary[index]);
  });

  Logger.log(monthlySummary.map(summary => summary[1]).reduce(getSum, 0))
}
// *****************************************************************************************
function getMonthlySummary(summaryYear) {
  let summaryMonths = [];
  for (let i = 1; i <= 12; i++) {
    summaryMonths.push(`${summaryYear}-${i}`)
  }
  return summaryMonths;
}
// *****************************************************************************************
function getSum(total, num) {
  return total + num;
}
// *****************************************************************************************
const FROM_YEAR = 2020;
const FROM_MONTH = 01 - 1;
const FROM_DAY = 1;

const TO_YEAR = 2021;
const TO_MONTH = 12 - 1;
const TO_DAY = 1;
// *****************************************************************************************
function getLastWeek(consultationDate) {
  //const today = new Date();
  const fromDate = new Date(FROM_YEAR, FROM_MONTH, FROM_DAY);
  const toDate = new Date(TO_YEAR, TO_MONTH, TO_DAY);

  return (consultationDate.getTime() >= fromDate.getTime()) && (consultationDate.getTime() < toDate.getTime());
}
// *****************************************************************************************