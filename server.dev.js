const path = require('path');
const express = require('express');
const formData = require('multer')();
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const braintree = require('braintree')
const app = express();
const port = process.env.PORT || 3000
app.set('port', port)

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "3tm2p5bx7s85jjr2",
  publicKey: "g9vh5ftwjvbzky74",
  privateKey: "78e59c7032b1b311639e0b5422c27e56"
});

console.log('running in development mode')
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
	publicPath: config.output.publicPath,
	contentBase: 'src',
	stats: {
		colors: true,
		hash: true,
		timings: true,
		chunks: true,
		chunkModules: true,
		modules: true
	}
});

app.use(middleware);
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

app.post("/donate", formData.single(), function (req, res, next) {
	var nonce = req.body.paymentMethodNonce
	var amount = req.body.amount
	console.log(nonce)
		// Use payment method nonce here
	gateway.transaction.sale({
		amount: amount,
		paymentMethodNonce: nonce,
		options: {
			submitForSettlement: true
		}
	},
	function(err, result) {
		if (result) {
			if (result.success) {
				console.log("Transaction ID: " + result.transaction.id)
				res.json({ success: true, txn_id: result.transaction.id, result: result })
			} else {
				var deepErrors = result.errors.deepErrors();

				deepErrors.forEach( err => {
					console.log(err.attribute)
					console.log(err.code)
					console.log(err.message)
				})

				res.json({ success: false, err: result.message, deepErrors: deepErrors })
			}
		} else {
			console.log(err)
			res.json({ success: false, err: err })
		}
	});
});

app.listen(app.get('port'), '0.0.0.0', function(err) {
	if (err) {
		console.log(err);
	}
	console.log('express server started & listening on port', app.get('port'))
})
