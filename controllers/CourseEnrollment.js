const model = require('../models/CourseEnrollment');
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
		let query = {id : body.id};
		delete body.id;
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
		let query = {id : body.id};
		delete body.id;
		data = await cruds.deleteData(model, query);
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
} 

let getCourseEnrollmentByCourseId = async (body) => {
	try {
		let query;
		if(body === null)
			query = null;
		else
			query = {courseId : body};
		data = await cruds.getData(model, query);
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
}

let getCourseEnrollmentByUserId = async (body) => {
	try {
		let query;
		if(body === null)
			query = null;
		else
			query = {userId : body};
		data = await cruds.getData(model, query);
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
	del : del,
	getCourseEnrollmentByCourseId : getCourseEnrollmentByCourseId,
	getCourseEnrollmentByUserId : getCourseEnrollmentByUserId
}