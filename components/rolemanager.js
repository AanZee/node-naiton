'use strict';

/**
 * =====================================================================================
 * Role manager
 * =====================================================================================
 */

var Rolemanager = exports.Rolemanager = function (Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/rolemanager - ';

/**
* Get a list of brands with a primary key.
* @param {Function} callback Gets called after request is complete
*/
Rolemanager.prototype.getrole = function (resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getrole - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getrole - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = ''+
			'<?xml version="1.0" encoding="utf-8"?>'+
			'<_routines>'+
				'<_routine>'+
					'<_name>rolemanager_getrole</_name>'+
					'<_arguments />'+
					'<_options>'+
					'<_writeSchema>1</_writeSchema>'+
					'</_options>'+
				'</_routine>'+
				'<_compression>0</_compression>'+
				'<_returnType>json</_returnType>'+
			'</_routines>';
			
			this.client.post(body, resolve, reject);

		}

	}

};



