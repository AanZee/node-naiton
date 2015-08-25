'use strict';

/**
 * =====================================================================================
 * Base64
 * =====================================================================================
 */

var util = require('util');

/**
* Base64
* @param  {Object} options  Options object
* @return {Client}          Returns itself
*/
var Base64 = exports.Base64 = function (Client) {
	this.client = Client;
	return this;
};


Base64.prototype.encode = function(str) {
	return new Buffer(str).toString('base64');
};
Base64.prototype.decode = function(str) {
	return new Buffer(str).toString('utf8');
};