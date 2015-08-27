'use strict';

var _ = require('lodash');

/**
 * =====================================================================================
 * Client manager
 * =====================================================================================
 */

var Paymentmanager = exports.Paymentmanager = function(Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/paymentmanager - ';


/**
 * Get a list of brands with a primary key.
 * @param {Integer} The id of a client.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Paymentmanager.prototype.addpayment = function(client, payment, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'addclient - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addclient - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executenonquerypost?token=' + this.client.options.token + '&compression=0';

			var date = new Date();
			var yyyy = date.getFullYear().toString();
			var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
			var mpre = (mm < 10) ? '0' : '';
			var dd = date.getDate().toString();
			var dpre = (dd < 10) ? '0' : '';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine><_name>paymentmanager_addpayment</_name>' +
				'<_arguments>' +
				'<_paymentid isNull="true">null</_paymentid>' +
				'<_clientid>' + client.personid + '</_clientid>' +
				'<_paymentdate>' + yyyy + '-' + mpre + mm + '-' + dpre + dd + ' 00:00:00' + '</_paymentdate>' +
				'<_description><![CDATA[Payment allocated]]></_description>' +
				'<_amount>' + payment.amount + '</_amount>' +
				'<_source><![CDATA[' + payment.name + ']]></_source>' +
				'<_clientname><![CDATA[' + client.clientfullname + ']]></_clientname>' +
				'<_bankaccountid isNull="true">null</_bankaccountid>' +
				'<_ipaddress><![CDATA[172.20.30.131]]></_ipaddress>' +
				'<_transactionkey isNull="true">null</_transactionkey>' +
				'<_transactionstatusid isNull="true">null</_transactionstatusid>' +
				'<_paymentgatewaybusinessid>29</_paymentgatewaybusinessid>' +
				'<_country isNull="true">null</_country>' +
				'<_city isNull="true">null</_city>' +
				'<_returnvalue isNull="true">null</_returnvalue>' +
				'</_arguments>' +
				'<_options>' +
				'<_commandTimeout>300</_commandTimeout>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			// Send post request.
			this.client.post(body, resolve, reject);

		}

	}

};

/**
 * Get a list of brands with a primary key.
 * @param {Integer} The id of a client.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Paymentmanager.prototype.addorderpayment = function(payment, order, paymentSettings, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'addorderpayment - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addorderpayment - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executenonquerypost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine><_name>paymentmanager_addorderpayment</_name>' +
				'<_arguments>' +
				'<_paymentid>' + payment.arguments._paymentid + '</_paymentid>' +
				'<_orderid>' + order.arguments._orderid + '</_orderid>' +
				'<_paidsum>' + paymentSettings.amount + '</_paidsum>' +
				'<_returnvalue isNull="true">null</_returnvalue>' +
				'</_arguments>' +
				'<_options>' +
				'<_commandTimeout>300</_commandTimeout>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			// Send post request.
			this.client.post(body, resolve, reject);

		}

	}

};