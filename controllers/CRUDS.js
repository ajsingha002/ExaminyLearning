const { db } = require('../database');

const getData = async (model, query) => {
	let data;
	try {
		if(query === null){
			data = await model.findAll();
		}
		else {
			data = await model.findAll({
				where: query
			});
		}
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}

	return data;
}

const addData = async (model, query) => {
	console.log(query);
	let data;
	try {
		if(query === null)
			data = null;
		else
			data = await model.create(query);
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
}

const updateData = async (model, body, query) => {
	console.log(query);
	let data;
	try {
		if(body === null)
			data = null;
		else
			data = await model.update(body, {
				where : query
			});
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
}

const deleteData = async (model, query) => {
	console.log(query);
	let data;
	try {
		if(query === null)
			data = null;
		else
			data = await model.destroy({
				where : query
			});
	} catch(e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
}

module.exports = {
	getData : getData,
	addData : addData,
	updateData : updateData,
	deleteData : deleteData
}