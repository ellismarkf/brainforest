# brainforest

[Braintree](https://www.braintreepayments.com/) provides a suite of tools to accept payments in an application, including a drop-in UI that validates card info and integrates with PayPal.  The simplest version of that UI uses query selectors to insert a pre-built form into the DOM.  That's great if your view code is already manipulating the DOM imperatively, but if you're using React, it goes against the declarative philosophy of the library.  

This project is (currently) a boilerplate for adding Braintree to a React/Redux app, and aims to eventually be a set of higher order components you can use that take advantage of React's component lifecycle hooks and declarative syntax.