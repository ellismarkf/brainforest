var express = require('express');
var app = express();

app.use(express.static('dist'))

app.get('/', function (req, res) {
	res.send('index.html')
})

app.listen(8080)