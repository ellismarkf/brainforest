var path = require('path')
var express = require('express');
var app = express();
var port = process.env.PORT || 5000

app.set('port', port)
app.use(express.static( path.join( __dirname, 'dist')))

app.get('/', function (req, res) {
	res.send(__dirname + '/index.html')
})

app.listen(app.get('port'), function() {
	console.log('express server started & listening on port', app.get('port'))
})