const express = require('express'),
  nun = require('nunjucks'),
  app = express(),
  auth = require('./auth.js'),
  sheets = require('./sheets.js');

const PORT = process.argv.length < 3 ? 3030 : parseInt(process.argv.slice(2).shift());

nun.configure('templates', {
  autoescape: true,
  express: app
});

app.get('/', function(req, res) {
  res.send(req.query);
});

app.get('/sheet', function (req, res) {
  auth(sheets.fullImport);
  res.send('updated');
});

app.listen(PORT, () => console.log('Listening on port %d!', PORT));
