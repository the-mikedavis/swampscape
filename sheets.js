const google = require('googleapis').google,
  sheetID = '1eLbOphW67xeFqWnjqFyVU_2N03S77hk8ID4gKyiX1Qs',
  fullDataRange = [
    '0.0!A1:C8',
    //'1.0!A1:C2',
    '1.1!A1:C20',
    '1.2!A1:C20',
    '1.3!A1:C20',
    '1.4!A1:C20',
    '1.5!A1:C20',
    '1.6!A1:C20'
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

    cache.home = parseHome(data[0].values);
    for (var i = 1; i < data.length; i++)
      cache.guides.push(parseGuide(data[i].values));
  });
}

function parseHome(values) {
  values.splice(0, 4);
  let home = {};
  for (let value of values)
    home[value[0]] = value[2];
  return home;
}

//  keys for the `guide` hashmaps
var sections = [
  "video",  // a link?
  "description", // text
  "mapdata", // an array
  "fieldnotes"  // link to directory full of photos of notes (gallery?)
];

function parseGuide(values) {
  let guide = {};
  values.shift();
  guide.name = values.shift()[1];
  values.splice(0, 2);
  for (var i = 0, val = values[i]; i < values.length; val = values[++i]) {
    let section = parseInt(val[0].slice(-1));
    if (section === 2) {
      guide.mapdata = values.slice(i).map(arr => arr[2]);
      break;
    } else
      guide[sections[section]] = val[2];
  }
  return guide;
}

module.exports = { fullImport, cache };
