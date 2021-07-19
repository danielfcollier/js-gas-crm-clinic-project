// *****************************************************************************************
function formatSheets() {
    formatCRMSheet();
}
// *****************************************************************************************
function formatCRMSheet() {

    const spreadsheet = SpreadsheetApp.getActive();
    const sheet = spreadsheet.getSheetByName("CRM");

    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();

    spreadsheet.getActiveRangeList().setFontFamily('Arial')
        .setFontSize(10)
        .setFontColor('#000000')
        .setFontWeight(null)
        .setFontWeight('bold')
        .setFontWeight(null)
        .setFontLine('none')
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

    spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort({ column: 12, ascending: false });

    spreadsheet.getRange('C:E').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('left');

    spreadsheet.getRange('F:G').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center');

    spreadsheet.getRange('H:H').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('right');

    spreadsheet.getRange('I:I').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('left');

    spreadsheet.getRange('J:K').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center');

    spreadsheet.getRange('L:L').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setNumberFormat('dd/MM/yyyy');

    spreadsheet.getRange('M:M').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setNumberFormat('hh"h"mm');

    spreadsheet.getRange('N:P').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('left');

    spreadsheet.getRange('Q:R').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center');

    spreadsheet.getRange('W:X').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('left');

    spreadsheet.getRange('Y:Y').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setNumberFormat('dd/MM/yyyy');

    spreadsheet.getRange('AA:AA').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('center')
        .setNumberFormat('dd/MM/yyyy');

    spreadsheet.getRange('AB:AC').activate();
    spreadsheet.getActiveRangeList().setHorizontalAlignment('right');

    spreadsheet.getRange('1:1').activate();
    spreadsheet.getActiveRangeList().setFontColor('#ffdd8f')
        .setFontWeight('bold')
        .setBackground('#a30050')
        .setHorizontalAlignment('center');
};
  // *****************************************************************************************