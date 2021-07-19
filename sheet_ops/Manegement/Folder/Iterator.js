function databaseFolderIterator() {

    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Backup");
  
    let folderProntuarios = DriveApp.getFolderById("11Nt9X07-O-q-Tv58z1uTkRm-q6zrRprB");
    let folderIterator = folderProntuarios.getFolders();
  
    //var pastaBackup = DriveApp.getFolderById("1iZyvOtqmiG1fbZpjzb78M2jixzie1nCr");
  
    //var hoje = new Date();
  
    //var pastaSemana = DriveApp.createFolder(dataFormatada(hoje,2));
    //pastaSemana.moveTo(pastaBackup)
  
    //var pdfContentBlob;
    //var tempFile;
  
    let currentFolder;
  
    let folderName = [];
    let folderId = [];
    
    let fileIterator;
    let currentFile;
    let currentFileName;
  
    let fileName = [];
    let fileId = [];
  
    let otherFiles = [];
  
    let k = 0;
    let folderCounter = 0;
    let fileCounter = 0;
    let errorCounter = 0;
    
    let myArray = [];
  
    let isFileProntuarioEmpty;
  
  
    while (folderIterator.hasNext()) { //folderIterator.hasNext()
      try {
        myArray[k] = [];
  
        currentFolder = folderIterator.next();
  
        folderName[k] = currentFolder.getName();
        folderId[k] = currentFolder.getId();
  
        fileIterator = currentFolder.getFiles();
        fileName[k] = "";
        fileId[k] = "";
        otherFiles[k] = "";
  
        while (fileIterator.hasNext()) {
          currentFile = fileIterator.next();
          currentFileName = currentFile.getName();
  
          if (folderName[k].trim().toLowerCase() == currentFileName.trim().toLowerCase()) {
            fileName[k] = currentFileName;
            fileId[k] = currentFile.getId();
            fileCounter++;
          }
        }
  
        isFileProntuarioEmpty = fileName[k]==="";
        if (isFileProntuarioEmpty){
          createFileProntuario();
        }
  
        myArray[k] = [folderName[k],folderId[k],fileName[k],fileId[k],[otherFiles[k]]];
  
        folderCounter++;
  
        /*
        tempFile = DriveApp.getFileById(prontuariosId[k]);
        pdfContentBlob = tempFile.getAs(MimeType.PDF);
        pastaBackup.createFile(pdfContentBlob).setName(temp[k].getName());
        */
      } catch (err) {
        errorCounter++;
      }
      k++;
    }
  
    sheet.getRange("A2:E"+(folderCounter+1)).setValues(myArray)
  
    //Logger.log(myArray)
  
    Logger.log(folderCounter)
    Logger.log(fileCounter)
    Logger.log(errorCounter)
  }
  
  function createFileProntuario(){
  
  
  }
  
  
  //*****************************************************************************************
  // Google Drive Tutorial, Files, Folders, Copy Files, DriveApp, Iterator
  //*****************************************************************************************
  
  function getTheFiles() {
  
    //var driveApp = DriveApp.
    var folderIterator = DriveApp.getFolderByName("Downloaded Pictures");
    var folder = folderIterator.next();
  
    var largeFolder = folder.getFolderByName("large").next();
    var smallFolder = folder.getFolderByName("small").next();
  
    var filesIterator = folder.getFiles();
  
    var i = 1;
  
    while (filesIterator.hasNext()) {
      var file = filesIterator.next();
      var fileName = file.getName();
      var fileSize = file.getSize();
  
      ss.getRange(i, 1).setValue(fileName);
      ss.getRange(i, 2).setValue(fileSize);
      //Logger.log(filename);
      i++;
  
      if (fileSize > 200) {
        file.makeCopy(largeFolder);
      } else {
        file.makeCopy(smallFolder);
      }
  
    }
  
  }