const google = require('googleapis').google,
  sheetID = '1eLbOphW67xeFqWnjqFyVU_2N03S77hk8ID4gKyiX1Qs',
  fullDataRange = [
    '0.0!A1:C8',
    //'1.0!A1:C2',
    '1.1!A1:C20',
    '1.2!A1:C20',
    '1.3!A2:C20',
    '1.4!A2:C20',
    '1.5!A2:C20',
    '1.6!A2:C20'
  ],
  fullDataRequest = {
    spreadsheetId: sheetID,
    ranges: fullDataRange
  },
  cache = {
    home : {},
    guides : [ ]
  };

function fullImport (auth) {
  const sheets = google.sheets( {version: 'v4', auth} );
  sheets.spreadsheets.values.batchGet(fullDataRequest, function (err, data) {
    if (err) return console.log('The API returned an error: ' + err);
    data = data.data.valueRanges;
    console.log("data:", data);
    console.log(data[1].values);
    cache.home = parseHome(data[0].values);
  });
}

function parseHome(values) {
  values.splice(0, 4);
  let home = {};
  for (let value of values)
    home[parseFloat(value[0])] = value[2];
  return home;
}

function parseGuide(values) {
  let guide = {};
  values.shift();
  guide.name = values.shift()[1];
  values.splice(0, 2);
  for (let val in values) {
    let section = values.substring();
    if (val[0] === '1.1.3') {
      guide.fieldNotes = val[2];
      continue;
    }
    
  }
}

module.exports = { fullImport, cache };
