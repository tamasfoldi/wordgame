var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var http = require('http');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/scripts')));
app.use('/Scripts', express.static(__dirname + '/node_modules/'));
app.set('views', __dirname + '/views');

app.engine('.html', require('ejs').renderFile);

app.get("/data/*", function (req, res) {
  fs.stat(__dirname + "/data" + req.params[0] + ".f", function (err, stats) {
    if (err) {
      res.status(404).send();
    } else {
      if (stats.isFile()) {
        res.status(200).send();
      } else {
        res.status(404).send();
      }
    }
  });
});

app.get("/partials/*", function (req, res) {
  var requestedView = path.join("./", req.url);
  res.render(requestedView);
});

app.get("/*", function (req, res) {
  res.render("index.html");
});



var port = process.env.PORT || 8080;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});