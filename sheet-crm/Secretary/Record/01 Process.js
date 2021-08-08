function createMedicalRecord() {
    // Initialization
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const currentSheet = ss.getActiveSheet();
    const crmSheet = SpreadsheetApp.openById(SheetIdCRM).getSheetByName(crm.SheetName);
    const ui = SpreadsheetApp.getUi();
    let message, errorMessage = "", criticalErrorFlag = false, statusPayment = "";
    let dataRow, isDataIntegrityNotValid;

    try {
        // Validation: Sheet Location
        if (validation_isSheetLocationWrong(currentSheet)) {
            ui.alert("Não funciona nessa aba!")
            errorMessage = "Não funciona nessa aba!";
            criticalErrorFlag = false;
            throw "Validation: Sheet Location";
        }

        // Data Extraction
        let dataBulk = dataExtraction_extratDatafromCrmSheet(1);
        dataRow = dataBulk[0];

        // Validation: 1st Consultation && Payment Sent
        const isValid =
            dataRow[crm.CRMStatus - 1] !== "Cancelada" &&
            dataRow[crm.CRMKind - 1] === "1ª Consulta" &&
            isCustomerRecordNotCreated(dataRow) &&
            (dataRow[crm.StatusPayment - 1] === "Enviado" || dataRow[crm.StatusPayment - 1] === "Confirmado");

        if (!isValid) {
            ui.alert("Não é possível criar prontuário para esta paciente! Se tiver dúvida, peça ajuda.")
            return false;
        }

        //Action
        const recordId = fillMedicalRecord(dataRow);
        
        // Save Path
        const recordPath = `https://drive.google.com/drive/u/0/folders/${recordId}`;
        crmSheet.getRange(dataRow[crm.Row - 1], crm.Folder).setValue(recordPath);

        ui.alert(`Prontuário criado com sucesso!!! ${recordPath}`)
        
        // Transferir propriedade // TODO
    }
    catch (error) {
        ui.alert("Erro! Se persistir, peça ajuda!");
        console.log(`Error: ${error.message}`);
    }

}

function isCustomerRecordNotCreated(myData) {
    return myData[crm.Folder - 1] === "" ? true : false;
}

var recordTemplate;

function fillMedicalRecord(myData) {

    // Record Template
    let recordId;
    recordTemplate = DriveApp.getFileById("1kP9_ivGI925zqXJtToA7yaxsi_f7rmtJpSG8JfbJsZM");

    // Go to Records Root Dir
    const rootDir = DriveApp.getFolderById("11Nt9X07-O-q-Tv58z1uTkRm-q6zrRprB");

    // Create Folders
    const recordDir = rootDir.createFolder(myData[crm.FullName - 1]);
    recordDir.createFolder("Exames");
    recordDir.createFolder("Receitas");

    // Record from Template
    const recordFile = recordTemplate.makeCopy(myData[crm.FullName - 1], recordDir);
    recordId = recordFile.getId();

    // Fill the Body Template
    const recordDoc = DocumentApp.openById(recordId);
    let recordBody = recordDoc.getBody();

    recordBody.replaceText("{Nome}", myData[crm.FullName - 1]);
    recordBody.replaceText("{Aniversario}", formatDate(myData[crm.Birthday - 1],1));
    recordBody.replaceText("{CPF}", showCPF(myData[crm.CPF - 1]));
    recordBody.replaceText("{RG}", myData[crm.RG - 1]);
    recordBody.replaceText("{Email}", myData[crm.Email - 1]);
    recordBody.replaceText("{Telefone}", myData[crm.Phone - 1]);
    recordBody.replaceText("{CEP}", myData[crm.ZipCode - 1]);
    recordBody.replaceText("{Consulta}", formatDate(myData[crm.ConsultationDate - 1], 1));
    recordBody.replaceText("{Tipo}", myData[crm.ConsultationKind - 1]);
    recordBody.replaceText("{Modalidade}", myData[crm.Modality - 1]);

    recordDoc.saveAndClose();

    return recordDir.getId();
}