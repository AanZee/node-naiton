'use strict';

var Mustage = require('../lib/mustache.js/mustache'),
	fs = require('fs');

/**
 * =====================================================================================
 * Business manager
 * =====================================================================================
 */

var Basketmanager = exports.Basketmanager = function(Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/basketmanager - ';

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.getproducts = function(searchTerm, businessId, limit, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getproducts - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getproducts - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<?xml version="1.0" encoding="utf-8"?>' +
				'<_routines>' +
				'<_routine>' +
				'<_name>basketmanager_getproducts</_name>' +
				'<_arguments>' +
				'<_productid>0</_productid>' +
				'<_productname><![CDATA[' + searchTerm + ']]></_productname>' +
				'<_serial />' +
				'<_pricefrom isNull="true">null</_pricefrom>' +
				'<_priceto isNull="true">null</_priceto>' +
				'<_ean />' +
				'<_offer>0</_offer>' +
				'<_imported>0</_imported>' +
				'<_obsolete>0</_obsolete>' +
				'<_brandid>0</_brandid>' +
				'<_categoryid>0</_categoryid>' +
				'<_stockid>0</_stockid>' +
				'<_businessid>' + businessId + '</_businessid>' +
				'<_limit>' + limit + '</_limit >' +
				'<_currencycourse>1</_currencycourse>' +
				'</_arguments>' +
				'<_options>' +
				'<_writeSchema>1</_writeSchema>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			this.client.post(body, resolve, reject);

		}

	}

};

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.getmaincombos = function(businessId, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getmaincombos - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getmaincombos - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>basketmanager_getmaincombos</_name>' +
				'<_arguments>' +
				'<_businessid>' + businessId + '</_businessid>' +
				'</_arguments>' +
				'<_options>' +
				'<_writeSchema>1</_writeSchema>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			this.client.post(body, resolve, reject);

		}

	}

};


/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.getclientinfobyid = function(clientId, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getclientinfobyid - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getclientinfobyid - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>basketmanager_getclientinfobyid</_name>' +
				'<_arguments>' +
				'<_clientid>' + clientId + '</_clientid>' +
				'</_arguments>' +
				'<_options>' +
				'<_writeSchema>1</_writeSchema>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			this.client.post(body, resolve, reject);

		}

	}

};


/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.addupdateorder = function(client, products, business, country, resolve, reject) {

	var self = this;

	if (this.client.verifyAPIUsage(prefix + 'addupdateorder - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addupdateorder - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executenonquerypost?token=' + this.client.options.token + '&compression=0';

			// Body content
			fs.readFile('components/order.xml', 'utf8', function(err, xml) {
				if (err) {
					return console.log(err);
				}

				var date = new Date();
				var yyyy = date.getFullYear().toString();
				var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
				var mpre = (mm < 10) ? '0' : '';
				var dd = date.getDate().toString();
				var dpre = (dd < 10) ? '0' : '';

				var viewData = {
					client: client,
					products: products,
					business: business,
					country: country,
					offerDate: yyyy + '-' + mpre + mm + '-' + dpre + dd + ' 00:00:00',
					financiallyApproved: 'true'
				}
				var body = Mustage.render(xml, viewData).split('\t').join('').split('\r\n').join('').split('\r').join('').split('\n').join('');
				console.log(Mustage.render(xml, viewData));
				self.client.post(body, resolve, reject);

			});

		}

	}

};