const express = require('express'),
  nun = require('nunjucks');
const app = express();

nun.configure('templates', {
  autoescape: true,
  express: app
});

app.get('/', function(req, res) {
  res.send(req.query);
});

app.listen(3000, () => console.log('Listening on port 3000!'));
