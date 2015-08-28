'use strict';

/**
 * =====================================================================================
 * Employee manager
 * =====================================================================================
 */

var Paymentgatewaymanager = exports.Paymentgatewaymanager = function(Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/paymentgatewaymanager - ';

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Paymentgatewaymanager.prototype.getpaymentservices = function(employeeId, resolve, reject) {


	if (this.client.verifyAPIUsage(prefix + 'getpaymentservices - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getpaymentservices - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>paymentgatewaysmanager_getpaymentservices</_name>' +
				'<_arguments>' +
				'<_companyid>' + employeeId + '</_companyid>' +
				'</_arguments>' +
				'</_routine>' +
				'<_returnType>json</_returnType>' +
				'<_parallelExecution>0</_parallelExecution>' +
				'<_compression>0</_compression>' +
				'<_jsonDateFormat>0</_jsonDateFormat>' +
				'</_routines>';

			// Send post request.
			this.client.post(body, resolve, reject);

		}

	}

};