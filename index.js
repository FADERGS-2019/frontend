var express = require('express');
var app = express();

app.use(express.static('dist'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

app.listen(3000, function () {
  console.log('Application listening on port 3000!');
});