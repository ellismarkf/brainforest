const path = require('path');
const express = require('express');
// const enforce = require('express-sslify');
const formData = require('multer')();
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const braintree = require('braintree')

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "3tm2p5bx7s85jjr2",
  publicKey: "g9vh5ftwjvbzky74",
  privateKey: "78e59c7032b1b311639e0b5422c27e56"
});

app.set('port', port)

if (isDeveloping) {
	console.log('running in development mode')
	const compiler = webpack(config);
	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	app.use(middleware);
	// app.use(enforce.HTTPS())
	app.use(webpackHotMiddleware(compiler));
	app.use("/client_token", function (req, res, next) {
	  gateway.clientToken.generate({}, function (err, response) {
	    res.json({ token: response.clientToken });
	  });
	});

	app.get('*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		res.end();
	});

} else {

	// app.use(enforce.HTTPS())
	app.use("/client_token", function (req, res, next) {
	  gateway.clientToken.generate({}, function (err, response) {
	    res.json({ token: response.clientToken });
	  });
	});
	app.use('/static', express.static( path.join( __dirname, 'dist')))
	app.get('*', function response(req, res) {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}

app.post("/donate", formData.single(), function (req, res, next) {
	var nonce = req.body.payment_method_nonce
		// Use payment method nonce here
	gateway.transaction.sale({
		amount: '5.00',
		paymentMethodNonce: 'fake-valid-visa-nonce',
		options: {
			submitForSettlement: true
		}
	},
	function(err, result) {
		if (result) {
			if (result.success) {
				console.log("Transaction ID: " + result.transaction.id)
				res.json({ success: true, txn_id: result.transaction.id })
			} else {
				console.log(result.message)
			}
		} else {
			console.log(err)
		}
	});
});

app.listen(app.get('port'), 'localhost', function(err) {
	if (err) {
		console.log(err);
	}
	console.log('express server started & listening on port', app.get('port'))
})
