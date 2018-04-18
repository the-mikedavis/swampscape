const express = require('express'),
  nun = require('nunjucks'),
  app = express(),
  auth = require('./auth.js'),
  sheets = require('./sheets.js'),
  path = require('path');

const PORT = process.argv.length < 3 ? 3030 : parseInt(process.argv.slice(2).shift());

nun.configure('templates', {
  autoescape: true,
  express: app
});

auth(sheets.fullImport);
//  update from Google sheets
let interval = setInterval(() => auth(sheets.fullImport), 2 * 60 * 60 * 1000);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
  res.render("landing.html");
});

//-----------TODO: revise for new guides layout---------------------
app.get('/guides', function(req, res) {
  res.render('guides.html', sheets.cache);
});

app.get('/guides/:guide', function(req, res) {
  var guideIndex = sheets.cache.guides.map(g => g.name)
    .indexOf(req.params.guide);
  if (guideIndex === -1)
    res.render('404.html');
  else
    res.render('guide.html', sheets.cache.guides[guideIndex]);
});
//-------------------------------------------------------------------

app.get('/swamp-symphony', function(req, res) {
  res.render('symphony.html');
});

app.get('/about', function (req, res) {
  res.render('about.html');
});

app.listen(PORT, () => console.log('Listening on port %d!', PORT));
