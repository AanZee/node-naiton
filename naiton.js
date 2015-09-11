'use strict';

/** Dependencies */
var querystring = require('querystring'),
	request = require('request'),
	md5 = require('MD5'),
	async = require('async'),
	parseString = require('xml2js').parseString,
	Promise = require('promise'),
	_ = require('lodash');


/**
 * Debug mode for this module to run this from the command prompt.
 */
var debugMode = false;
var components = ['Base64', 'Clientmanager', 'Businessmanager', 'Employeemanager', 'Brandmanager', 'Rolemanager', 'Basketmanager', 'Paymentmanager'];
var prefix = '[node-naiton] - ';

/**
 * =====================================================================================
 * Naiton client
 * =====================================================================================
 */

/**
 * Client
 * @param  {Object} options  Options object
 * @return {Client}          Returns itself
 */
var Client = function(options) {

	var defaults = {
		action: '',
		account: '',
		site_id: '',
		token: null,
		site_secure_code: '',
		env: 'production',
		returnType: 'object',
		userAgent: 'node-naiton-0.0.1',

		username: '',
		password: '',
		ipaddress: '',
		connectionstring: '',

		errors: {
			noresolve: 'There is no resolve defined, please define a resolve function.',
			noreject: 'There is no reject defined, please define a reject function.',
			notoken: 'There is no refresh token set, please authenticate using the function authenticate',
			nosuccessontoken: 'The credentials used to initialize the session are not correct.'
		},
		compression: '0',
		responseType: 'json'
	};

	var self = this;

	this.models = {};
	this.options = _.merge({}, defaults, options);

	if (this.options.env === 'test') {
		this.url = 'http://webservice.naiton.com';
	} else {
		this.url = 'http://webservice.naiton.com';
	}

	// Loop components from array
	components.forEach(function(component) {
		try {
			// Try to require the service file
			exports[component] = require('./components/' + component.toLowerCase())[component];
			self[component.toLowerCase()] = new exports[component](self);
		} catch (e) {
			// Cant be required, file probably doesn't exist
			console.log('Cant find file: ' + component + ' - ' + e);
		}
	});

	return this;
};


/**
 * Client constuctor
 * @param  {Object} options  Options object
 * @return {Client}          Returns a new instance of the Client object
 */
module.exports.createClient = function(options) {
	return new Client(options);
};

/**
 * =====================================================================================
 * POST system
 * =====================================================================================
 */

Client.prototype.randomUser = function(callback) {
	var req = request({
		url: 'https://randomuser.me/api/',
	}, function(err, res, data) {
		if (err) {
			throw err;
		}
		try {
			callback(JSON.parse(data).results[0].user);
		} catch (err) {
			callback(JSON.parse('{ "results": [ { "user": { "gender": "female", "name": { "title": "miss", "first": "lisa", "last": "roy" }, "location": { "street": "6484 esplanade du 9 novembre 1989", "city": "saint-denis", "state": "haute-saône", "zip": 48687 }, "email": "lisa.roy@example.com", "username": "lazyfrog552", "password": "fishy", "salt": "sFOBrw6f", "md5": "31e0b90022140a778aadc09c4a7f0de3", "sha1": "4f09db771673a7d9d28e8ac25b320120327c8c6d", "sha256": "6eb8ca28ac06581c252928274f348785d3eb76dbd6f9fac58efc0e3f168b2201", "registered": 1310889302, "dob": 1415933431, "phone": "02-85-16-16-18", "cell": "06-39-13-54-64", "INSEE": "2141116122237 45", "picture": { "large": "https://randomuser.me/api/portraits/women/7.jpg", "medium": "https://randomuser.me/api/portraits/med/women/7.jpg", "thumbnail": "https://randomuser.me/api/portraits/thumb/women/7.jpg" } } } ], "nationality": "FR", "seed": "f1be3711f4f067e703", "version": "0.7" }').results[0].user);
		}
	});
}

/**
 * Wrapper function for the POST requests
 * @param  {String}   path     Path to the resource
 * @param  {Object}   params   GET parameters
 * @param  {Function} callback Gets called after request is complete
 */
Client.prototype.post = function(body, resolve, reject) {
	var self = this;

	var req = request({
		url: this.url + this.options.action,
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Content-Length': Buffer.byteLength(body),
			'Connection': 'close'
		},
		encoding: 'utf-8',
		method: 'POST',
		body: body
	}, function(err, res, data) {
		var json = {};
		if (err) {
			reject(err);
		}

		switch (self.options.returnType) {
			case 'xml':
				parseString(data, function(err, parseResult) {
					json = parseResult;
				});
				break;
			case 'object':
				try {
					json = JSON.parse(data);
				} catch (err) {
					console.log(data);
				}
				break;
		}

		if (self.options.action === '/service/initializesession') {
			if (typeof json.success !== 'undefined') {
				self.options.token = json.success.token;
			} else {
				reject(self.options.errors.nosuccessontoken);
			}
		}
		resolve(data);
	});

}

/**
 * =====================================================================================
 * Authentication
 * =====================================================================================
 */

/**
 * Authenticate a set the token internally.
 * @param {Function} callback Gets called after request is complete
 */
Client.prototype.authenticate = function() {
	var body,
		self = this;

	// Server action.
	this.options.action = '/service/initializesession';

	// Body content
	body = '' +
		'<_routines>' +
		'<_routine>' +
		'<_name>InitializeSession</_name>' +
		'<_arguments>' +
		'<login>' + this.base64.encode(this.options.username) + '</login>' +
		'<password>' + this.options.password + '</password>' +
		'<ipaddress>' + this.base64.encode(this.options.ipaddress) + '</ipaddress>' +
		'<timeout>20</timeout>' +
		'<connectionstring>' + this.base64.encode(this.options.connectionstring) + '</connectionstring>' +
		'</_arguments>' +
		'<_options>' +
		'<_encoding field="login" isentry="1">1</_encoding>' +
		'<_encoding field="password" isentry="1">0</_encoding>' +
		'<_encoding field="ipaddress" isentry="1">1</_encoding>' +
		'<_encoding field="connectionstring" isentry="1">1</_encoding>' +
		'</_options>' +
		'</_routine>' +
		'<_returnType>json</_returnType>' +
		'</_routines>';

	// Return a new promise.
	return new Promise(function(resolve, reject) {
		self.post(body, resolve, reject);
	});

};

/**
 * =====================================================================================
 * Global function to check if calling a module function is properly done.
 * =====================================================================================
 */

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Client.prototype.verifyAPIUsage = function(prefix, resolve, reject) {
	if (typeof resolve === 'undefined' || resolve === null) {
		console.log(prefix + this.options.errors.noresolve);
		return false;
	} else if (typeof reject === 'undefined' || reject === null) {
		console.log(prefix + this.options.errors.noreject);
		return false;
	} else {
		return true;
	}
};

/**
 * =====================================================================================
 * Debug mode
 * =====================================================================================
 */

// Debug mode
if (debugMode) {
	var newClient = module.exports.createClient({
		env: 'test'
	});

	var mongoose = require('mongoose'),
		naitonClient = require('./models/naitonclient'),
		NaitonClient = mongoose.model('NaitonClient');

	newClient.authenticate().then(function(result) {

			// Get country list.
			async.waterfall([

				function(cb) {
					newClient.randomUser(function(result) {
						var user = result;
						cb(null, user);
					}, function(error) {
						cb(error, null);
					});
				},

				// Get businessess
				function(user, cb) {
					newClient.businessmanager.getbusinesslist(2, 1, function(result) {
						var list = JSON.parse(result).businessmanager_getbusinesslist,
							business = {};

						console.log('Waterfall start');
						console.log('Get businesses...');

						var i = 0,
							netherlands = {},
							belgium = {};

						for (i in list) {
							switch (list[i].businessname) {
								case "Herbal Wellness":
									business = list[i];
									break;
							}
						}

						cb(null, user, business);
					}, function(error) {
						cb(error, null);
					});
				},

				// Get countrylist
				function(user, business, cb) {
					newClient.clientmanager.getcountrylist(function(result) {
						console.log('Get country list...');
						cb(null, user, business, JSON.parse(result).clientmanager_getcountrylist);
					}, function(error) {
						cb(error, null);
					});
				},

				// Create client
				function(user, business, countrylist, cb) {

					var i = 0,
						netherlands = {},
						belgium = {},
						list = countrylist;

					for (i in list) {
						switch (list[i].code) {
							case "NL":
								netherlands = list[i];
								break;
							case "BE":
								belgium = list[i];
								break;
						}
					}

					var client = new NaitonClient({
						clientid: 0,
						firstname: user.name.first,
						infix: '',
						streetaddress: 'Erasmusbrug',
						lastname: user.name.last,
						gender: true,
						dateofbirth: new Date(),
						phone: '+31 (0)6 55 33 79 88',
						email: 'richard+' + (+new Date()) + '@aanzee.nl',
						password: 'nmjKli8',
						allownewsletter: true,
						addressid: 0,
						house: '19',
						houseadd: '',
						zipcode: '2202MN',
						city: 'Noordwijk',
						countryid: netherlands.countryid,
						businessid: business.businessid,
						companyid: 0,
						discountgroupid: 0,
						paymentdays: 0,
						creditline: 0,
						emailblacklist: true,
						returnvalue: ''
					});

					newClient.clientmanager.addclient(client, function(result) {
						console.log('Create client...');
						var client = JSON.parse(result).clientmanager_addclient;
						cb(null, client, business, netherlands);
					}, function(error) {
						console.log(error);
						cb(error, null, null, null);
					});

				},


				// Get main combos via for basketmanager.
				function(client, business, country, cb) {

					newClient.clientmanager.getclientdetails(client.arguments._clientid, function(result) {
						console.log('Get client from naiton...');
						var client = JSON.parse(result).clientmanager_getclientdetails[0];
						cb(null, client, business, country);
					}, function(error) {
						console.log(error);
						cb(error, null, null, null);
					});

				},

				// Get main combos via for basketmanager.
				function(client, business, country, cb) {

					newClient.basketmanager.getmaincombos(business.businessid, function(result) {
						console.log('Get combos...');
						var combos = JSON.parse(result).resultSet;
						cb(null, combos, client, business, country);
					}, function(error) {
						console.log(error);
						cb(error, null, null, null, null);
					});

				},

				// Get products for basketmanager.
				function(combos, client, business, country, cb) {

					newClient.basketmanager.getproducts('st', business.businessid, 2, function(result) {
						console.log('Get products for basket...');
						var products = JSON.parse(result).basketmanager_getproducts;
						cb(null, products, combos, client, business, country);
					}, function(error) {
						console.log(error);
						cb(error, null, null, null, null, null);
					});

				},

				// Get delivery service.
				function(products, combos, client, business, country, cb) {

					var orderWeight = '0.190',
						orderPrice = '0.00';

					newClient.basketmanager.getdeliveryservice(business, country, orderWeight, orderPrice, function(result) {
						console.log('Get delivery service...');
						var deliveryservice = JSON.parse(result).basketmanager_getdeliveryservice[0];
						cb(null, deliveryservice, orderWeight, orderPrice, products, combos, client, business, country);
					}, function(error) {
						console.log(error);
						cb(error, null, null, null, null, null, null);
					});

				},

				// Get add update order.
				function(deliveryservice, orderWeight, orderPrice, products, combos, client, business, country, cb) {

					newClient.basketmanager.addupdateorder(deliveryservice, client, products, business, country, function(result) {
						console.log('Get add update order...');

						var order = JSON.parse(result).basketmanager_addupdateorder;
						cb(null, order, deliveryservice, orderWeight, orderPrice, products, combos, client, business, country);
					}, function(error) {
						console.log(error);
						cb(error, null, null, null, null, null, null);
					});

				},

				// Add payment.
				function(order, deliveryservice, orderWeight, orderPrice, products, combos, client, business, country, cb) {

					var paymentSettings = {
						amount: '14.15',
						name: 'Startdosering'
					}

					newClient.paymentmanager.addpayment(client, paymentSettings, function(result) {
						console.log('Add payment...');
						var payment = JSON.parse(result).paymentmanager_addpayment;
						cb(null, payment, order, deliveryservice, orderWeight, orderPrice, products, combos, client, business, country);
					}, function(error) {
						console.log(error);
						cb(error, null, null, null, null, null, null, null);
					});

				},

				// Connect payment to order.
				function(payment, order, deliveryservice, orderWeight, orderPrice, products, combos, client, business, country, cb) {

					var paymentSettings = {
						amount: '14.15'
					}

					newClient.paymentmanager.addorderpayment(payment, order, paymentSettings, function(result) {
						console.log('Connect payment to order...');
						var products = JSON.parse(result).paymentmanager_addorderpayment;
						cb();
					}, function(error) {
						console.log(error);
						cb();
					});

				}

			], function() {
				console.log('Last action... done here.');
			});

		},
		function(error) {
			console.log(error);
		});

}