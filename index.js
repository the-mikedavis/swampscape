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


//-------------------PAGES------------------------------
app.get('/', function(req, res) {
  res.render("landing.html", sheets.cache);
});

app.get('/swamp-slider', function(req, res) {
  res.render("slider.html", sheets.cache);
});

app.get('/guides', function(req, res) {
  res.render('guides.html', sheets.cache);
});

app.get('/swamp-symphony', function(req, res) {
  res.render('symphony.html', sheets.cache);
});

app.get('/about', function (req, res) {
  res.render('about.html', sheets.cache);
});
//------------------------------------------------------

app.listen(PORT, () => console.log('Listening on port %d!', PORT));
