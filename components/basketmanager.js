'use strict';

var Mustage = require('../lib/mustache.js/mustache'),
	fs = require('fs');

/**
 * =====================================================================================
 * Business manager
 * =====================================================================================
 */

var Basketmanager = exports.Basketmanager = function(Client) {
	this.client = Client;
	return this;
};

var prefix = '[node-naiton] components/basketmanager - ';

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.getproducts = function(searchTerm, businessId, limit, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getproducts - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getproducts - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<?xml version="1.0" encoding="utf-8"?>' +
				'<_routines>' +
				'<_routine>' +
				'<_name>basketmanager_getproducts</_name>' +
				'<_arguments>' +
				'<_productid>0</_productid>' +
				'<_productname><![CDATA[' + searchTerm + ']]></_productname>' +
				'<_serial />' +
				'<_pricefrom isNull="true">null</_pricefrom>' +
				'<_priceto isNull="true">null</_priceto>' +
				'<_ean />' +
				'<_offer>0</_offer>' +
				'<_imported>0</_imported>' +
				'<_obsolete>0</_obsolete>' +
				'<_brandid>0</_brandid>' +
				'<_categoryid>0</_categoryid>' +
				'<_stockid>0</_stockid>' +
				'<_businessid>' + businessId + '</_businessid>' +
				'<_limit>' + limit + '</_limit >' +
				'<_currencycourse>1</_currencycourse>' +
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

/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.getmaincombos = function(businessId, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getmaincombos - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getmaincombos - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>basketmanager_getmaincombos</_name>' +
				'<_arguments>' +
				'<_businessid>' + businessId + '</_businessid>' +
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


/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.getclientinfobyid = function(clientId, resolve, reject) {

	if (this.client.verifyAPIUsage(prefix + 'getclientinfobyid - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'getclientinfobyid - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executereturnsetpost?token=' + this.client.options.token + '&compression=0';

			// Body content
			var body;
			body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>basketmanager_getclientinfobyid</_name>' +
				'<_arguments>' +
				'<_clientid>' + clientId + '</_clientid>' +
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


/**
 * Get a list of brands with a primary key.
 * @param {Function} callback Gets called after request is complete
 */
Basketmanager.prototype.addupdateorder = function(client, products, business, country, resolve, reject) {

	var self = this;

	if (this.client.verifyAPIUsage(prefix + 'addupdateorder - ', resolve, reject)) {

		if (this.client.options.token === null) {
			console.log(prefix + 'addupdateorder - ' + this.client.options.errors.notoken);
		} else {

			// Server action.
			this.client.options.action = '/service/executenonquerypost?token=' + this.client.options.token + '&compression=0';

			var date = new Date();
			var yyyy = date.getFullYear().toString();
			var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
			var mpre = (mm < 10) ? '0' : '';
			var dd = date.getDate().toString();
			var dpre = (dd < 10) ? '0' : '';
			var offerDate = yyyy + '-' + mpre + mm + '-' + dpre + dd + ' 00:00:00';

			var body = '' +
				'<_routines>' +
				'<_routine>' +
				'<_name>basketmanager_addupdateorder</_name>' +
				'<_arguments>' +
				'<_orderid>null</_orderid>' +
				'<_clientid>' + new Buffer(client.personid.toString()).toString('base64') + '</_clientid>' +
				'<_employeeid>' + new Buffer('2').toString('base64') + '</_employeeid>' +
				'<_businessid>' + new Buffer(business.businessid.toString()).toString('base64') + '</_businessid>' +
				'<_sourceid>' + new Buffer('0').toString('base64') + '</_sourceid>' +
				'<_stockid>' + new Buffer('1').toString('base64') + '</_stockid>' +
				'<_billingrecipient>' + new Buffer(client.clientfullname).toString('base64') + '</_billingrecipient>' +
				'<_billingstreetaddress>' + new Buffer(client.streetaddress).toString('base64') + '</_billingstreetaddress>' +
				'<_billinghousenumber>' + new Buffer(client.housenumber).toString('base64') + '</_billinghousenumber>' +
				'<_billinghousenumberadd>' + new Buffer(client.housenumberadd).toString('base64') + '</_billinghousenumberadd>' +
				'<_billingzipcode>' + new Buffer(client.zipcode).toString('base64') + '</_billingzipcode>' +
				'<_billingcity>' + new Buffer(client.city).toString('base64') + '</_billingcity>' +
				'<_billingstate />' +
				'<_billingcountryid>' + new Buffer(country.countryid.toString()).toString('base64') + '</_billingcountryid>' +
				'<_deliveryrecipient isNull="true">' + new Buffer(client.clientfullname).toString('base64') + '</_deliveryrecipient>' +
				'<_deliverystreetaddress isNull="true">' + new Buffer(client.streetaddress).toString('base64') + '</_deliverystreetaddress>' +
				'<_deliveryhousenumber isNull="true">' + new Buffer(client.housenumber).toString('base64') + '</_deliveryhousenumber>' +
				'<_deliveryhousenumberadd isNull="true">' + new Buffer(client.housenumberadd).toString('base64') + '</_deliveryhousenumberadd>' +
				'<_deliveryzipcode isNull="true">' + new Buffer(client.zipcode).toString('base64') + '</_deliveryzipcode>' +
				'<_deliverycity isNull="true">' + new Buffer(client.city).toString('base64') + '</_deliverycity>' +
				'<_deliverystate isNull="true">' + new Buffer(client.city).toString('base64') + '</_deliverystate>' +
				'<_deliverycountryid>' + new Buffer(country.countryid.toString()).toString('base64') + '</_deliverycountryid>' +
				'<_discountcodeid>MA==</_discountcodeid>' +
				'<_discountcodeid>' + new Buffer('0').toString('base64') + '</_discountcodeid>' +
				'<_clientremark />' +
				'<_salesremark />' +
				'<_shipmentremark/>' +
				'<_externaltransaction />' +
				'<_clientreferencenumber />' +
				'<_referenceorderid>' + new Buffer('0').toString('base64') + '</_referenceorderid>' +
				'<_offerdate>' + new Buffer(offerDate).toString('base64') + '</_offerdate>' +
				'<_financiallyapproved>' + new Buffer('False').toString('base64') + '</_financiallyapproved>' +
				'<_affiliate />' +
				'<_cookieid />' +
				'<_historyxml />' +
				'<_servervariables/>' +
				'<_isordersuccesspagevisited>' + new Buffer('False').toString('base64') + '</_isordersuccesspagevisited>' +
				'<_savedate>' + new Buffer(offerDate).toString('base64') + '</_savedate>' +
				'<_ordersuccesspagevisitdate>' + new Buffer(offerDate).toString('base64') + '</_ordersuccesspagevisitdate>' +
				'<_detailsxml>' +
				new Buffer('<basket_dataset>' +
					'<xs:schema id="basket_dataset" xmlns="" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">' +
					'<xs:element name="basket_dataset" msdata:IsDataSet="true" msdata:MainDataTable="basket_table" msdata:UseCurrentLocale="true">' +
					'<xs:complexType>' +
					'<xs:choice minOccurs="0" maxOccurs="unbounded">' +
					'<xs:element name="basket_table">' +
					'<xs:complexType>' +
					'<xs:sequence>' +
					'<xs:element name="id" type="xs:int" minOccurs="0" />' +
					'<xs:element name="productid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="productname" type="xs:string" minOccurs="0" />' +
					'<xs:element name="quantity" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="salesprice" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="buyprice" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="discount" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="comment" type="xs:string" minOccurs="0" />' +
					'<xs:element name="statusid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="originalid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="ismanualedited" type="xs:boolean" minOccurs="0" />' +
					'<xs:element name="giveawayid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="discountmanual" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="discountcode" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="discountamount" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="discountx4y" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="discountquantity" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="discountperiodical" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="discountgroup" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="invoiceid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="creditinvoiceid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="deliveryid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="parentid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="dateexpiry" type="xs:dateTime" minOccurs="0" />' +
					'<xs:element name="giftcertificate" type="xs:string" minOccurs="0" />' +
					'<xs:element name="weight" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="originalweight" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="tax" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="relatedorderdetailsid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="relateddeliveryserviceid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="relatedaddressid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="recipient" type="xs:string" minOccurs="0" />' +
					'<xs:element name="streetaddress" type="xs:string" minOccurs="0" />' +
					'<xs:element name="housenumber" type="xs:string" minOccurs="0" />' +
					'<xs:element name="housenumberadd" type="xs:string" minOccurs="0" />' +
					'<xs:element name="zipcode" type="xs:string" minOccurs="0" />' +
					'<xs:element name="city" type="xs:string" minOccurs="0" />' +
					'<xs:element name="state" type="xs:string" minOccurs="0" />' +
					'<xs:element name="countryid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="addresscode" type="xs:string" minOccurs="0" />' +
					'<xs:element name="addressname" type="xs:string" minOccurs="0" />' +
					'<xs:element name="recipientcode" type="xs:string" minOccurs="0" />' +
					'<xs:element name="recipientemail" type="xs:string" minOccurs="0" />' +
					'</xs:sequence>' +
					'</xs:complexType>' +
					'</xs:element>' +
					'</xs:choice>' +
					'</xs:complexType>' +
					'</xs:element>' +
					'</xs:schema>' +
					'<basket_table>' +
					'<id>1</id>' +
					'<productid>57848</productid>' +
					'<productname>Startdosering</productname>' +
					'<quantity>1</quantity>' +
					'<salesprice>14.15000000</salesprice>' +
					'<buyprice>0.00000000</buyprice>' +
					'<discount>0</discount>' +
					'<comment />' +
					'<statusid>1</statusid>' +
					'<ismanualedited>false</ismanualedited>' +
					'<discountmanual>0</discountmanual>' +
					'<discountcode>0</discountcode>' +
					'<discountamount>0</discountamount>' +
					'<discountx4y>0</discountx4y>' +
					'<discountquantity>0</discountquantity>' +
					'<discountperiodical>0</discountperiodical>' +
					'<discountgroup>0</discountgroup>' +
					'<parentid>0</parentid>' +
					'<giftcertificate />' +
					'<weight>0.00000000</weight>' +
					'<originalweight>0.00000000</originalweight>' +
					'<tax>0.06000000</tax>' +
					'<relateddeliveryserviceid>4</relateddeliveryserviceid>' +
					'</basket_table>' +
					'</basket_dataset>').toString('base64') +
				'</_detailsxml>' +
				'<_featuresxml>' +
				new Buffer('<basket_dataset>' +
					'<xs:schema id="basket_dataset" xmlns="" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">' +
					'<xs:element name="basket_dataset" msdata:IsDataSet="true" msdata:MainDataTable="feature_table" msdata:UseCurrentLocale="true">' +
					'<xs:complexType>' +
					'<xs:choice minOccurs="0" maxOccurs="unbounded">' +
					'<xs:element name="feature_table">' +
					'<xs:complexType>' +
					'<xs:sequence>' +
					'<xs:element name="basketid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="productid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="featureid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="featurevalue" msdata:DataType="System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" type="xs:anyType" minOccurs="0" />' +
					'<xs:element name="orderdetailsid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="fileobjectid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="typeid" type="xs:int" minOccurs="0" />' +
					'<xs:element name="pricefactorrelative" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="pricefactorabsolute" type="xs:decimal" minOccurs="0" />' +
					'<xs:element name="measurementfactor" type="xs:decimal" minOccurs="0" />' +
					'</xs:sequence>' +
					'</xs:complexType>' +
					'</xs:element>' +
					'</xs:choice>' +
					'</xs:complexType>' +
					'</xs:element>' +
					'</xs:schema>' +
					'</basket_dataset>').toString('base64') +
				'</_featuresxml>' +
				'<_deleteids isNull="true">bnVsbA==</_deleteids>' +
				'<_deliveryaddresscode isNull="true">bnVsbA==</_deliveryaddresscode>' +
				'<_deliveryaddressname isNull="true">bnVsbA==</_deliveryaddressname>' +
				'<_deliveryrecipientcode />' +
				'<_deliveryrecipientemailadd isNull="true">bnVsbA==</_deliveryrecipientemailadd>' +
				'<_returnvalue isNull="true">bnVsbA==</_returnvalue>' +
				'</_arguments>' +
				'<_options>' +
				'<_commandTimeout>300</_commandTimeout>' +
				'<_encoding all="1" isentry="1">1</_encoding>' +
				'</_options>' +
				'</_routine>' +
				'<_compression>0</_compression>' +
				'<_returnType>json</_returnType>' +
				'</_routines>';

			self.client.post(body, resolve, reject);

		}

	}

};