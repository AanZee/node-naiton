'use strict';

/**
 * =====================================================================================
 * Brand manager
 * =====================================================================================
 */

var Brandmanager = exports.Brandmanager = function (Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/brandmanager - ';

/**
* Get a list of brands with a primary key.
* @param {Function} callback Gets called after request is complete
*/
Brandmanager.prototype.getallbrandlistwithprimarykey = function (resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getallbrandlistwithprimarykey - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getallbrandlistwithprimarykey - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = ''+
			'<?xml version="1.0" encoding="utf-8"?>'+
			'<_routines>'+
				'<_routine>'+
					'<_name>brandmanager_getallbrandlistwithprimarykey</_name>'+
				'</_routine>'+
				'<_returnType>json</_returnType>'+
				'<_parallelExecution>0</_parallelExecution>'+
				'<_compression>0</_compression>'+
				'<_jsonDateFormat>0</_jsonDateFormat>'+
			'</_routines>';
			this.client.post(body, resolve, reject);

		}

	}

};