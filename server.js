var express = require('express');
var app = express();
var port = process.env.PORT || 5000

app.set('port', port)
app.use(express.static('dist'))

app.get('/', function (req, res) {
	res.send('index.html')
})

app.listen(app.get('port'), function() {
	console.log('express server started & listening on port', app.get('port'))
})