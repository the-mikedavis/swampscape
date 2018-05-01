const VIMEO_EMBED = "https://vimeo.com/api/oembed.json?url=";
const google = require('googleapis').google,
  https = require('https'),
  showdown = require('showdown'),
  converter = new showdown.Converter(),
  sheetID = '1eLbOphW67xeFqWnjqFyVU_2N03S77hk8ID4gKyiX1Qs',
  fullDataRange = [
    '0.0!A1:C20',  //if you overshoot these, it trims the results
    //'1.0!A1:C2',
    '1.1!A1:C20',
    '1.2!A1:C20',
    '1.3!A1:C20',
    '1.4!A1:C20',
    '1.5!A1:C20',
    '1.6!A1:C20',
    '3.0!A1:C20'
  ],
  fullDataRequest = {
    spreadsheetId: sheetID,
    ranges: fullDataRange
  },
  cache = {
    home : {},
    guides : [ ],
    about: {}
  };

function fullImport (auth) {
  const sheets = google.sheets( {version: 'v4', auth} );
  sheets.spreadsheets.values.batchGet(fullDataRequest, function (err, data) {
    if (err) return console.log('The API returned an error: ' + err);
    data = data.data.valueRanges;

    cache.home = parseHome(data[0].values);
    for (var i = 1; i < 7; i++)
      cache.guides.push(parseGuide(data[i].values, '1.' + i));

    cache.about = parseAbout(data[7].values);
  });
}

function parseHome(values) {
  values.splice(0, 4);
  let home = {};
  for (let value of values)
    home[value[0]] = value[2];

  if (home["0.4"] && /^https?:\/\//g.test(home["0.4"])) {
    //  go get the video embed stuff
    https.get(VIMEO_EMBED + escape(home["0.4"]), function (res) {
      var data = "";
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        home.video = JSON.parse(data);
        home.video.html = home.video.html.replace(/width="\d+"/, 'width="100%"');
      });
    });
  }
  return home;
}
function parseAbout(values) {
  values.splice(0, 4);
  let about = {};
  for (let value of values)
    about[value[0]] = converter.makeHtml(value[2]);
  return about;
}

//  keys for the `guide` hashmaps
var sections = [
  "video",  // a link
  "description", // text
  "mapdata", // an array
  "scapename",  // string
  "video360"
];

function parseGuide(values, number) {
  let guide = {};
  values.shift();
  guide.number = number;
  guide.slug = values.shift()[1].replace(/\s+/g, "");
  values.splice(0, 2);
  for (var i = 0, val = values[i]; i < values.length; val = values[++i]) {
    let section = parseInt(val[0].slice(-1));
    if (section === 2) {
      guide.mapdata = values.slice(i).map(arr => arr[2]);
      break;
    } else if (section === 1)
      guide[sections[section]] = converter.makeHtml(val[2]);
    else
      guide[sections[section]] = val[2];
  }
  if (guide.video && /^https?:\/\//g.test(guide.video)) {
    //  go get the video embed stuff
    https.get(VIMEO_EMBED + escape(guide.video), function (res) {
      var data = "";
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        guide.vimeo = JSON.parse(data);
        guide.vimeo.html = guide.vimeo.html.replace(/width="\d+"/, 'width="100%"');
      });
    });
  }
  if (guide.video360 && /^https?:\/\//g.test(guide.video360)) {
    https.get(VIMEO_EMBED + escape(guide.video360), function (res) {
      var data = "";
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        guide.vimeo360 = JSON.parse(data);
        guide.vimeo360.html = guide.vimeo360.html.replace(/width="\d+"/, 'width="100%"');
      });
    });
  }
  return guide;
}

module.exports = { fullImport, cache };
