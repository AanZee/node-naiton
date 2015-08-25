'use strict';

/**
 * =====================================================================================
 * Employee manager
 * =====================================================================================
 */

var Employeemanager = exports.Employeemanager = function (Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/employeemanager - ';

/**
* Get a list of brands with a primary key.
* @param {Function} callback Gets called after request is complete
*/
Employeemanager.prototype.getemployees = function (employeeId, roleId, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getemployees - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getemployees - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = ''+
			'<?xml version="1.0" encoding="utf-8"?>'+
			'<_routines>'+
				'<_routine>'+
					'<_name>employeeschedulermanager_getemployees</_name>'+
					'<_arguments>'+
					'<_businessid>5</_businessid>'+
					'<_businessid>4</_businessid>'+
					'<_businessid>3</_businessid>'+
					'<_businessid>11</_businessid>'+
					'<_businessid>2</_businessid>'+
					'<_businessid>1</_businessid>'+
					'<_businessid>611</_businessid>'+
					'<_businessid>596</_businessid>'+
					'<_businessid>9</_businessid>'+
					'<_roleid>0</_roleid>'+
					'<_username />'+
					'</_arguments>'+
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

