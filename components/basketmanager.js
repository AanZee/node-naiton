'use strict';

/**
 * =====================================================================================
 * Business manager
 * =====================================================================================
 */

var Basketmanager = exports.Basketmanager = function(Client) {
    this.client = Client;
    return this;
};

var prefix = '[node-naiton] components/businessmanager - ';

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.getmaincombos = function(employeeId, roleId, resolve, reject) {

    if (this.client.verifyAPIUsage(prefix + 'getmaincombos - ', resolve, reject)) {

        if (this.client.options.token === null) {
            console.log(prefix + 'getmaincombos - ' + this.client.options.errors.notoken);
        } else {

            // Server action.
            this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

            // Body content
            var body;
            body = '' +
                '<?xml version="1.0" encoding="utf-8"?>' +
                '<_routines>' +
                '<_routine>' +
                '<_name>basketmanager_getmaincombos</_name>' +
                '<_arguments>' +
                '<_businessid>611</_businessid>' +
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


getmaincombos

getproducts < _routines > < _routine > < _name > basketmanager_getproducts < /_name><_arguments><_productid>0</_productid > < _productname / > < _serial / > < _pricefrom isNull = "true" > null < /_pricefrom><_priceto isNull="true">null</_priceto > < _ean / > < _offer > 0 < /_offer><_imported>0</_imported > < _obsolete > 0 < /_obsolete><_brandid>0</_brandid > < _categoryid > 0 < /_categoryid><_stockid>0</_stockid > < _businessid > 611 < /_businessid><_limit>200</_limit > < _currencycourse > 1 < /_currencycourse></_arguments > < _options > < _writeSchema > 1 < /_writeSchema></_options > < /_routine><_compression>1</_compression > < _returnType > XML < /_returnType></_routines >