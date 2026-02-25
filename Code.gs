const START_ROW = 2;   // names start at row 2
const COL_NAME = 1;    // A
const COL_CHECK = 2;   // B
const COL_CHOICE = 3;  // C
const OPTIONS_RANGE = 'D1:D4';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index').setTitle('Names Form');
}

function listSheets() {
  return SpreadsheetApp.getActive().getSheets().map(s => s.getName());
}

function getSheetData(sheetName) {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(sheetName);
  if (!sh) throw new Error(`Sheet not found: ${sheetName}`);

  // Options from D1:D4
  const options = sh.getRange(OPTIONS_RANGE).getValues()
    .flat()
    .map(v => (v ?? '').toString().trim())
    .filter(v => v.length > 0);

  const lastRow = sh.getLastRow();
  if (lastRow < START_ROW) {
    return { options, rows: [] };
  }

  // Read A:C for all rows
  const data = sh.getRange(START_ROW, COL_NAME, lastRow - START_ROW + 1, 3).getValues();

  const rows = [];
  for (let i = 0; i < data.length; i++) {
    const rowNum = START_ROW + i;
    const name = (data[i][0] ?? '').toString().trim();
    if (!name) continue;

    const checked = data[i][1] === true; // Column B
    const choice = (data[i][2] ?? '').toString();

    rows.push({ rowNum, name, checked, choice });
  }

  return { options, rows };
}

/**
 * Persist a single row's state.
 * checked -> column B (TRUE/FALSE)
 * choice  -> column C (string)
 */
function updateRow(sheetName, rowNum, checked, choice) {
  const sh = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sh) throw new Error(`Sheet not found: ${sheetName}`);

  sh.getRange(rowNum, COL_CHECK).setValue(!!checked);
  sh.getRange(rowNum, COL_CHOICE).setValue(choice ?? '');
  return true;
}

/**
 * Reset: unhide all by clearing Column B.
 * If you also want to clear Column C, set clearChoices=true from the UI.
 */
function resetSheet(sheetName, clearChoices) {
  const sh = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sh) throw new Error(`Sheet not found: ${sheetName}`);

  const lastRow = sh.getLastRow();
  if (lastRow < START_ROW) return true;

  // Clear Column B (checkbox)
  sh.getRange(START_ROW, COL_CHECK, lastRow - START_ROW + 1, 1).clearContent();

  // Optional: clear Column C (choice)
  if (clearChoices) {
    sh.getRange(START_ROW, COL_CHOICE, lastRow - START_ROW + 1, 1).clearContent();
  }
  return true;
}
