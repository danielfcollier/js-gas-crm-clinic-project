// *****************************************************************************************
function useful_createTempFolder() {
    let tempFolder = DriveApp.createFolder("TEMP");
    return tempFolder;
}
// *****************************************************************************************
function useful_deleteTempFolder(tempFolder) {
    tempFolder.setTrashed(true);
    return true;
}
// *****************************************************************************************