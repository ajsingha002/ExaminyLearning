const model = require('../models/Users');
const cruds = require('./CRUDS');
let get = async (body) => {
	try {
		let query;
		if(body === null)
			query = null;
		else
			query = {id : body};
		data = await cruds.getData(model, query);
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
} 

let add = async (body) => {
	console.log(body);
	try {
		data = await cruds.addData(model, body);
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
} 

let update = async (body) => {
	console.log(body);
	try {
		let query;
		if(body.username === undefined || body.username === null ) {
			query = {id : body.id};
			delete body.id;
		} 
		else {
			query = {username : body.username};
			delete body.username
		}
		data = await cruds.updateData(model, body, query);
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
} 

let del = async (body) => {
	console.log(body);
	try {
		let query;
		if(body.username === undefined || body.username === null ) {
			query = {id : body.id};
		} 
		else {
			query = {username : body.username};
		}
		data = await cruds.deleteData(model, query);
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
} 

module.exports = {
	get : get,
	add : add,
	update : update,
	del : del
}