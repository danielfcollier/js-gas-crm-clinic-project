// *****************************************************************************************
// >>> GMT TIME ZONE: OFFSET TO LOCAL TIME
// *****************************************************************************************
const TIMEZONE_OFFSET = 2;
const gmtDayTime = "GMT-03:00";

// *****************************************************************************************
// >>> CONTACT INFORMATION
// *****************************************************************************************
const phoneFlorianopolis = "(48) 99962-3819";
const imageFlorianopolis = "https://drageisa.com.br/wp-content/uploads/2021/02/cartão-email-drageisa.png";

const phoneBrasilia = phoneFlorianopolis;
const imageBrasilia = imageFlorianopolis;

// *****************************************************************************************
// >>> PRICES AND DESCRIPTIONS FOR 2021
// *****************************************************************************************
const DUE_DATE_DAYS_COUNT = 3;     // Payment 3 days before Consultation Date for Online Consultations
const DUE_DATE_DAYS_SLACK = 2;     // Payment 2 days after today for late reservations
const DUE_DATE_TIGHT_RULE = true;
const DUE_DATE_DAYS_TIGHT = 10;    // Payment 10 days before Consultation Date for In Person Consultations
//const DUE_DATE_DAYS_TIGHT = 1;   // (Rule change to the above) Payment 1 day after Booking Date for In Person Consultations

const conventionalPayments = ["", "Boleto", "Cartão de Crédito", "Cartão de Débito", "PIX"];
const noPaymentHere = ["Transferência", "Dinheiro", "Cheque"];

const MAX_INSTALLMENT_COUNT = 10;

const consultationInfos = {
  "OnlineFloral": 180,
  "OnlineArtemísia": 180,
  "OnlineEmergência": 180,
  "OnlineBeija-flor": 280,
  "OnlineGirassol": 480,
  "PresencialArtemísia": 240,
  "PresencialEmergência": 240,
  "PresencialBeija-flor": 360,
  "PresencialGirassol": 720,
  "DIU": 900
};

var consultationDescription;

// *****************************************************************************************
// >>> CUSTOMER FOLDER INFORMATION
// *****************************************************************************************
const FOLDER_DRIVE_LOCATION = "https://drive.google.com/drive/u/0/folders/";
const FOLDER_ID_CUSTOMER_FOLDER = "11Nt9X07-O-q-Tv58z1uTkRm-q6zrRprB";

// *****************************************************************************************
// >>> RECEIPT INFORMATION
// *****************************************************************************************
const MAX_RECEIPTS_SENT = 30;

const TEST_MODE = false;
const emailTeste = "adm@drageisa.com.br";

const driveFolder = "https://drive.google.com/drive/u/0/folders/";

const receiptTemplateId = "1giFLFRE0QJ-Q3c37yQ-_qjeB-xZraFXbiDa0UsnOVog";
var receiptTemplate;

// *****************************************************************************************
// >>> ERROR HANDLING IMPROVED
//
// Notifies the spreadsheet developer in case of error.
// *****************************************************************************************
const ownerEmail = "adm@drageisa.com.br";

// *****************************************************************************************
function sendEmailToOwner_errorNotification(functionName) {
  try {
    let messageBody = " @Date: " + formatDate(new Date(), 2);
    MailApp.sendEmail(ownerEmail, "Error @" + functionName, messageBody);
    return true;
  }
  catch (err) {
    Logger.log("CRITICAL ERROR @sendEmailToOwner_errorNotification(): reserve more emails to warning messages!");
    Logger.log("Error: " + err.toString());
    return false;
  }
}
// *****************************************************************************************
function sendEmailToOwner_customNotification(subject, message) {
  try {
    const today = new Date();

    MailApp.sendEmail(ownerEmail, formatDate(today, 2) + subject, message);
    return true;
  }
  catch (err) {
    Logger.log("CRITICAL ERROR @sendEmailToOwner_customNotification(): reserve more emails to warning messages!");
    Logger.log("Error: " + err.toString());
    return false;
  }
}
// *****************************************************************************************