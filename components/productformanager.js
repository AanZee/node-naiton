'use strict';

var _ = require('lodash');

/**
 * =====================================================================================
 * Client manager
 * =====================================================================================
 */

var Productformanager = exports.Productformanager = function(Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/productformanager - ';

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Productformanager.prototype.getproduct = function(client, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getproduct - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getproduct - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>productformanager_getproduct</_name>' +
				'<_arguments />' +
				'<_options>' +
				'<_writeSchema>1</_writeSchema>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			console.log(body);

			// Post new client request
			this.client.post(body, resolve, reject);

			/**
			 * EXAMPLE REQUEST
			 * ---------------
			 * <_routines><_routine><_name>productformanager_getproduct</_name><_arguments /><_options><_writeSchema>1</_writeSchema></_options></_routine><_compression>1</_compression><_returnType>XML</_returnType></_routines>
			 *
			 */

			/**
			 *
			 * EXAMPLE RESPONSE
			 * ----------------
			 * <clientmanager_addclient><returnValue>-1</returnValue><arguments><_clientid>553502</_clientid><_addressid>875122</_addressid><_returnvalue>0</_returnvalue></arguments></clientmanager_addclient>
			 *
			 */

		}

	}

};