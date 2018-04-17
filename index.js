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

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
  res.render("landing.html");
});

app.get('/guides', function(req, res) {
  res.render('guides.html');
});

app.get('/guides/*', function(req, res) {
  var guideIndex = sheets.cache.guides.indexOf(req.url);
  if (guideIndex === -1)
    res.render('404.html');
  else
    res.render('guide.html', sheets.cache.guides[guideIndex]);
});

app.get('/sheet', function (req, res) {
  auth(sheets.fullImport);
  res.send('updated');
});

app.listen(PORT, () => console.log('Listening on port %d!', PORT));
