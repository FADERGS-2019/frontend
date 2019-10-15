var express = require('express');
var app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));

// Handle a get request to an api route
app.get('/your-api-route/:id', function (req, res) {

  // You can retrieve the :id parameter via 'req.params.id'
  res.send(`Did GET /your-api-route/${req.params.id}!`);
});


app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});