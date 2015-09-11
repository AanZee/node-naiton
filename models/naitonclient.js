'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * =====================================================================================
 * NaitonClient model
 * =====================================================================================
 */

var ClientSchema = new Schema({
	clientid: {
		type: String,
		trim: true,
		required: 'Clientid is required'
	},
	firstname: {
		type: String,
		trim: true,
		required: 'Firstname is required'
	},
	streetaddress: {
		type: String,
		trim: true,
		required: 'Firstname is required'
	},
	infix: {
		type: String,
		trim: true,
		required: 'Infix is required'
	},
	lastname: {
		type: String,
		trim: true,
		required: 'Infix is required'
	},
	gender: {
		type: Boolean,
		trim: true,
		required: 'Gender is required'
	},
	dateofbirth: {
		type: Date,
		trim: true,
		required: 'dateofbirth is required'
	},
	phone: {
		type: String,
		trim: true,
		required: 'Phone is required'
	},
	email: {
		type: String,
		trim: true,
		required: 'E-mail is required'
	},
	password: {
		type: String,
		trim: true,
		required: 'Password is required'
	},
	allownewsletter: {
		type: Boolean,
		trim: true,
		required: 'allownewsletter is required'
	},
	addressid: {
		type: Number,
		trim: true,
		required: 'addressid is required'
	},
	house: {
		type: String,
		trim: true,
		required: 'house is required'
	},
	houseadd: {
		type: String,
		trim: true,
		required: 'houseadd is required'
	},
	zipcode: {
		type: String,
		trim: true,
		required: 'zipcode is required'
	},
	city: {
		type: String,
		trim: true,
		required: 'city is required'
	},
	countryid: {
		type: Number,
		trim: true,
		required: 'countryid is required'
	},
	discountgroupid: {
		type: Number,
		trim: true,
		required: 'discountgroupid is required'
	},
	businessid: {
		type: Number,
		trim: true,
		required: 'businessid is required'
	},
	companyid: {
		type: Number,
		trim: true,
		required: 'companyid is required'
	},
	paymentdays: {
		type: Number,
		trim: true,
		required: 'paymentdays is required'
	},
	creditline: {
		type: Number,
		trim: true,
		required: 'creditline is required'
	},
	emailblacklist: {
		type: Boolean,
		trim: true,
		required: 'emailblacklist is required'
	},
	returnvalue: {
		type: String,
		trim: true
	}
}, {
	collection: 'clients'
});

mongoose.model('NaitonClient', ClientSchema);