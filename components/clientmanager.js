'use strict';

var _ = require('lodash');

/**
 * =====================================================================================
 * Client manager
 * =====================================================================================
 */

var Clientmanager = exports.Clientmanager = function(Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/clientmanager - ';

/**
 * Get a country by a code.
 * @param {Integer} The id of a country.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Clientmanager.prototype.getcountrybycode = function(code, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getcountrybycode - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getcountrybycode - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<?xml version="1.0" encoding="utf-8"?>' +
				'<_routines>' +
				'<_routine>' +
				'<_name>clientnmanager_getcountrybycode</_name>' +
				'<_arguments>' +
				'<_code><![CDATA[' + code + ']]></_code>' +
				'</_arguments>' +
				'<_options>' +
				'<_writeSchema>1</_writeSchema>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			// Post new client request
			this.client.post(body, resolve, reject);

		}

	}

};

/**
 * Get a list of countries.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Clientmanager.prototype.getcountrylist = function(resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getcountrylist - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getcountrylist - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<?xml version="1.0" encoding="utf-8"?>' +
				'<_routines>' +
				'<_routine>' +
				'<_name>clientmanager_getcountrylist</_name>' +
				'<_options>' +
				'<_writeSchema>1</_writeSchema>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			// Post new client request
			this.client.post(body, resolve, reject);

		}

	}

};

/**
 * Add a client.
 * @param {Object} The mongoose object containing all client information.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Clientmanager.prototype.addclient = function(client, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'addclient - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addclient - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executenonquerypost?token=' + this.client.options.token + '&compression=0';

			// Get date of birth parts.
			var yyyy = client.dateofbirth.getFullYear().toString();
			var mm = (client.dateofbirth.getMonth() + 1).toString(); // getMonth() is zero-based
			var mpre = (mm < 10) ? '0' : '';
			var dd = client.dateofbirth.getDate().toString();
			var dpre = (dd < 10) ? '0' : '';

			// Body content
			var body;
			body = '' +
				'<?xml version="1.0" encoding="utf-8"?>' +
				'<_routines>' +
				'<_routine>' +
				'<_name>clientmanager_addclient</_name>' +
				'<_arguments>' +
				'<_clientid><![CDATA[' + client.clientid + ']]></_clientid>' +
				'<_firstname><![CDATA[' + client.firstname + ']]></_firstname>' +
				'<_infix><![CDATA[' + client.infix + ']]></_infix>' +
				'<_lastname><![CDATA[' + client.lastname + ']]></_lastname>' +
				'<_gender>' + client.gender + '</_gender>' +
				'<_dateofbirth>' + yyyy + '-' + mpre + mm + '-' + dpre + dd + ' 00:00:00</_dateofbirth>' +
				'<_phone><![CDATA[' + client.phone + ']]></_phone>' +
				'<_email><![CDATA[' + client.email + ']]></_email>' +
				'<_password><![CDATA[' + client.password + ']]></_password>' +
				'<_allownewsletter>' + client.allownewsletter + '</_allownewsletter>' +
				'<_addressid><![CDATA[' + client.addressid + ']]></_addressid>' +
				'<_address><![CDATA[' + client.streetaddress + ']]></_address>' +
				'<_house><![CDATA[' + client.house + ']]></_house>' +
				'<_houseadd><![CDATA[' + client.houseadd + ']]></_houseadd>' +
				'<_zipcode><![CDATA[' + client.zipcode + ']]></_zipcode>' +
				'<_city><![CDATA[' + client.city + ']]></_city>' +
				'<_countryid>' + client.countryid + '</_countryid>' +
				'<_discountgroupid>' + client.discountgroupid + '</_discountgroupid>' +
				'<_businessid>' + client.businessid + '</_businessid>' +
				'<_companyid>' + client.companyid + '</_companyid>' +
				'<_paymentdays>' + client.paymentdays + '</_paymentdays>' +
				'<_creditline>' + client.creditline + '</_creditline>' +
				'<_emailblacklist>' + client.emailblacklist + '</_emailblacklist>' +
				'<_returnvalue isNull="true">' + client.returnvalue + '</_returnvalue>' +
				'</_arguments>' +
				'<_options />' +
				'</_routine>' +
				'<_compression>' + this.client.options.compression + '</_compression>' +
				'<_returnType>' + this.client.options.responseType + '</_returnType>' +
				'</_routines>';

			// Post new client request
			this.client.post(body, resolve, reject);

			/**
			 * EXAMPLE REQUEST
			 * ---------------
			 * <_routines><_routine><_name>clientmanager_addclient</_name><_arguments><_clientid><![CDATA[0]]></_clientid><_firstname><![CDATA[Gerhard Richard]]></_firstname><_infix /><_lastname><![CDATA[Edens]]></_lastname><_gender>True</_gender><_dateofbirth>1979-09-24 00:00:00</_dateofbirth><_phone><![CDATA[0655337988]]></_phone><_email><![CDATA[richard+1@aanzee.nl]]></_email><_password><![CDATA[asd123]]></_password><_allownewsletter>False</_allownewsletter><_addressid><![CDATA[0]]></_addressid><_address><![CDATA[Erasmusbrug]]></_address><_house><![CDATA[19]]></_house><_houseadd /><_zipcode><![CDATA[2202AC]]></_zipcode><_city><![CDATA[Noordwijk]]></_city><_countryid>1</_countryid><_discountgroupid>0</_discountgroupid><_businessid>611</_businessid><_companyid>0</_companyid><_paymentdays>0</_paymentdays><_creditline>0</_creditline><_emailblacklist>False</_emailblacklist><_returnvalue isNull="true">null</_returnvalue></_arguments><_options /></_routine><_compression>0</_compression><_returnType>XML</_returnType></_routines>
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


/**
 * Add a client.
 * @param {Object} The mongoose object containing all client information.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Clientmanager.prototype.getclientdetailsbyemail = function(email, businessid, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'addclient - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addclient - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>clientmanager_getclientdetailsbyemail</_name>' +
				'<_arguments>' +
				'<_businessid>' + businessid + '</_businessid>' +
				'<_email>' + this.client.base64.encode(email) + '</_email>' +
				'</_arguments>' +
				'<_options>' +
				'<_commandTimeout>300</_commandTimeout>' +
				'<_encoding all="1" isentry="1">1</_encoding>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>' + this.client.options.compression + '</_compression>' +
				'<_returnType>' + this.client.options.responseType + '</_returnType>' +
				'</_routines>';

			// Post new client request
			this.client.post(body, resolve, reject);
		}

	}

};

/**
 * Update a client,
 * @param {Object} The mongoose client object containing all the changes.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Clientmanager.prototype.updateclient = function(client, resolve, reject) {
	if (this.client.verifyAPIUsage(prefix + 'addclient - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addclient - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>clientmanager_updateclient</_name>' +
				'<_arguments>' +
				'<_clientid><![CDATA[' + client.clientid + ']]></_clientid>' +
				'<_firstname><![CDATA[' + client.firstname + ']]></_firstname>' +
				'<_infix><![CDATA[' + client.infix + ']]></_infix>' +
				'<_lastname><![CDATA[' + client.lastname + ']]></_lastname>' +
				'<_gender><![CDATA[' + client.gender + ']]></_gender>' +
				'<_dateofbirth>' + client.birthofdate + '</_dateofbirth>' +
				'<_phone><![CDATA[' + client.phone + ']]></_phone>' +
				'<_email><![CDATA[' + client.email + ']]></_email>' +
				'<_password><![CDATA[' + client.password + ']]></_email>' +
				'<_allownewsletter>' + client.allownewsletter + '</_allownewsletter>' +
				'<_addressid><![CDATA[' + client.addressid + ']]></_addressid>' +
				'<_address><![CDATA[' + client.address + ']]></_address>' +
				'<_house><![CDATA[' + client.house + ']]></_house>' +
				'<_houseadd><![CDATA[' + client.houseadd + ']]></_houseadd>' +
				'<_zipcode><![CDATA[' + client.zipcode + ']]></_zipcode>' +
				'<_city><![CDATA[' + client.city + ']]></_city>' +
				'<_countryid>' + client.countryid + '</_countryid>' +
				'<_discountgroupid>' + client.discountgroupid + '</_discountgroupid>' +
				'<_businessid>' + client.businessid + '</_businessid>' +
				'<_companyid>' + client.companyid + '</_companyid>' +
				'<_paymentdays>' + client.paymentdays + '</_paymentdays>' +
				'<_creditline>' + client.creditline + '</_creditline>' +
				'<_emailblacklist>' + client.emailblacklist + '</_emailblacklist>' +
				'<_returnvalue isNull="true">' + client.returnvalue + '</_returnvalue>' +
				'</_arguments>' +
				'<_options />' +
				'</_routine>' +
				'<_compression>' + this.client.options.compression + '</_compression>' +
				'<_returnType>' + this.client.options.responseType + '</_returnType>' +
				'</_routines>';

			// Send post request.
			this.client.post(body, resolve, reject);

		}

	}
};

/**
 * Get a list of clients.
 * @param {Object} The object containing a mongoose client.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Clientmanager.prototype.getfilteredclientlist = function(options, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'addclient - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addclient - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>clientmanager_getfilteredclientslist</_name>' +
				'<_arguments>' +
				'<_clientid>' + options.clientid + '</_clientid>' +
				'<_clientemail><![CDATA[' + options.clientemail + ']]></clientemail>' +
				'<_clientname><![CDATA[' + options.clientname + ']]></_clientname>' +
				'<_companyname><![CDATA[' + options.companyname + ']]></_companyname>' +
				'<_zipcode><![CDATA[' + options.zipcode + ']]></_zipcode>' +
				'<_countryid>' + options.countryid + '</_countryid>' +
				'<_businesslist>' + options.businessid + '</_businesslist>' +
				'<_housenumber>' + options.housenumber + '</_housenumber>' +
				'<_limit>' + options.limit + '</_limit>' +
				'</_arguments>' +
				'<_options>' +
				'<_writeSchema>' + options.writeSchema + '</_writeSchema>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>' + this.client.options.compression + '</_compression>' +
				'<_returnType>' + this.client.options.responseType + '</_returnType>' +
				'</_routines>';

			// Send post request.
			this.client.post(body, resolve, reject);

		}

		/**
		 *
		 * Posible return from server
		 * ------------------------------
		 
		 	<clientmanager_updateclient>
				<returnValue>-1</returnValue>
				<arguments>
					<_clientid>553502</_clientid>
					<_addressid>875122</_addressid>
					<_returnvalue>0</_returnvalue>
				</arguments>
			</clientmanager_updateclient>

		 *
		 */

	}

};

/**
 * Get a list of brands with a primary key.
 * @param {Integer} The id of a client.
 * @param {Function} callback Gets called after request is complete
 * @param {Function} callback Gets called after request is complete but has an error
 */
Clientmanager.prototype.getclientdetails = function(clientId, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'addclient - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addclient - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>clientmanager_getclientdetails</_name>' +
				'<_arguments>' +
				'<_clientid>' + clientId + '</_clientid>' +
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