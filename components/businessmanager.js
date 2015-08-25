'use strict';

/**
 * =====================================================================================
 * Business manager
 * =====================================================================================
 */

var Businessmanager = exports.Businessmanager = function(Client) {
    this.client = Client;
    return this;
};

var prefix = '[node-naiton] components/businessmanager - ';

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Businessmanager.prototype.getbusinesslist = function(employeeId, roleId, resolve, reject) {

    if (this.client.verifyAPIUsage(prefix + 'getbusinesslist - ', resolve, reject)) {

        if (this.client.options.token === null) {
            console.log(prefix + 'getbusinesslist - ' + this.client.options.errors.notoken);
        } else {

            // Server action.
            this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

            // Body content
            var body;
            body = '' +
                '<?xml version="1.0" encoding="utf-8"?>' +
                '<_routines>' +
                '<_routine>' +
                '<_name>businessmanager_getbusinesslist</_name>' +
                '<_arguments>' +
                '<_employeeid>' + employeeId + '</_employeeid>' +
                '<_roleid>' + roleId + '</_roleid>' +
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