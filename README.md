# brainforest

[Braintree](https://www.braintreepayments.com/) provides a suite of tools to enable easy payment processing in an application, including a drop-in UI that validates credit card info and integrates with PayPal.  The simplest version of that UI uses query selectors to insert a pre-built form into the DOM.  If your view code is already manipulating the DOM imperatively, the drop-in UI is a great fit, but if your application is built with React, using the drop-in UI means losing the power of describing UI as a function of data.

Other projects have already implemented [React wrappers around the drop-in UI](https://github.com/jeffcarp/braintree-react), but that doesn't really address the core paradigm discrepancy.

This project is (currently) a reference implementation for adding Braintree to a React/Redux app, and aims to eventually be a set of higher order components you can use that take advantage of React's component lifecycle hooks and declarative syntax.

## overview

**brainforest** is essentially a [direct tokenization implementation](https://developers.braintreepayments.com/reference/client-reference/javascript/v2/credit-cards#credit-card-direct-tokenization) of Braintree's [client SDK](https://github.com/braintree/braintree-web), powered by a Node server that integrates with Braintree's gateway via their [server API](https://github.com/braintree/braintree_node).  It uses some of Braintree's other open source projects, specifically [card-validator](https://github.com/braintree/card-validator), to handle (you guessed it) credit card validation, and also borrows heavily from Braintree's drop-in UI CSS.

### Features
- Live validation
- Dynamic input formatting
- Credit card validation with card type logos

## Usage

First, you'll need a Braintree account.  I won't pretend to be able to explain the application steps as well as Braintree themselves, so instead will just refer to [their instructions](https://www.braintreepayments.com/sandbox).

After setting up an account, you'll need to configure your Sandbox account and obtain your merchandId, publicKey, and privateKey.

_To run the demo locally:_

```
git clone https://github.com/ellismarkf/brainforest.git
cd brainforest
npm install
```
In [`server.dev.js`](https://github.com/ellismarkf/brainforest/blob/master/server.dev.js?ts=2#L15), swap the placeholder values with your corresponding merchantId, publicKey, and privateKey.

Start the server with `npm run start:dev`, then visit `http://localhost:3000` in your browser.

Et voila!

_To use **brainforest** in your project:_

Study (copy) the source code and implement (paste) as necessary.  It's my goal to eventually publish this as an npm module, such that it can be imported into a project and "Just Work", but it's not at that stage yet.