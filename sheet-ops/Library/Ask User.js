// *****************************************************************************************
// >>> Prompts a Question for the User.
// *****************************************************************************************
function askUser_whatSheWants_andGetResponses(ui, message) {
    let response = ui.prompt("Ação Requisitada", message, ui.ButtonSet.YES_NO);
    let userResponse = response.getResponseText();
    let isUserNotWantsToContinue = false;;
    if (response.getSelectedButton() !== ui.Button.YES) {
        isUserNotWantsToContinue = true;
    }
    return [isUserNotWantsToContinue, userResponse];
}
// *****************************************************************************************
// >>> Prompts a YES or NO Question for the User.
// *****************************************************************************************
function askUser_ifSheWants_notToContinue(ui, message) {
    let isNotToGoOn = !(ui.alert(message, ui.ButtonSet.YES_NO) === ui.Button.YES);

    return isNotToGoOn;
}
// *****************************************************************************************
// >>> Ask the user if she wants to confirm the chages.
// *****************************************************************************************
function askUser_ifDateChange_isConfirmed(ui, name, date) {
    let response = ui.alert('Altetar data da consulta de ' + name + " para " + date + "?", ui.ButtonSet.YES_NO);

    return (response === ui.Button.YES) ? true : false;
}
// *****************************************************************************************