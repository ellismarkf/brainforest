var path = require('path')
var express = require('express');
var app = express();
var port = process.env.PORT || 5000

app.set('port', port)
app.use('/static', express.static( path.join( __dirname, 'dist')))

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.get('/dist/bundle.js', function(req, res) {
	res.sendFile(path.join(__dirname, 'dist/bundle.js'))
})

app.listen(app.get('port'), function() {
	console.log('express server started & listening on port', app.get('port'))
})