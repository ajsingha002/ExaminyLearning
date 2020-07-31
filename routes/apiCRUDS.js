const express = require('express');
const Joi = require('joi');
const router = express.Router();
const users = require('../controllers/Users');
const courses = require('../controllers/Courses');
const assignment = require('../controllers/Assignment');
const courseEnrollment = require('../controllers/CourseEnrollment');
const submissions = require('../controllers/Submissions');
const exams = require('../controllers/Exams');
const classes = require('../controllers/Classes');
const materials = require('../controllers/Materials');

/* GET home page. */
router.get('/users/', async function(req, res, next) {
	let data = await users.get(null);
	let response= {
		status : "success",
		values : data
	};
	res.send(response);
});

router.get('/users/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await users.get(null);
		let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await users.get(id);
		let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/users/username/:username', async function(req, res, next) {
	let username = req.params.username;
	if( username === null || username === undefined || username === '' ) {
		let data = await users.get(null);
		let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await users.get({ username : username});
		let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/users/firstname/:firstname', async function(req, res, next) {
	let firstname = req.params.firstname;
	if( firstname === null || firstname === undefined || firstname === '' ) {
		let data = await users.get(null);
		let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await users.get({ firstname : firstname });
		let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/users/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		username: Joi.string().alphanum().trim().min(5).max(256).required() ,
		password: Joi.string().trim().min(10).max(256).required() ,
		firstname: Joi.string().trim().max(256).required() ,
		lastname: Joi.string().trim().max(256).required() ,
		permission: Joi.string().trim().max(256).required() ,
		type: Joi.string().trim().max(256).required() ,
		email: Joi.string().trim().email().required() ,
		phone: Joi.string().trim().required() 
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		validation.value.createdBy = validation.value.username;
		validation.value.updatedBy = validation.value.username;
		data = await users.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.put('/users/', async function(req, res, next) {
	let data;
	const schema  = Joi.alternatives().try(
		Joi.object().keys({
			id: Joi.number().required(),
			username: Joi.string().alphanum().trim().min(5).max(256) ,
			password: Joi.string().trim().min(10).max(256) ,
			firstname: Joi.string().trim().max(256) ,
			lastname: Joi.string().trim().max(256) ,
			permission: Joi.string().trim().max(256) ,
			type: Joi.string().trim().max(256) ,
			email: Joi.string().trim().email() ,
			phone: Joi.string().trim() 
		}),
		Joi.object().keys({
			id: Joi.number(),
			username: Joi.string().alphanum().trim().min(5).max(256).required() ,
			password: Joi.string().trim().min(10).max(256) ,
			firstname: Joi.string().trim().max(256) ,
			lastname: Joi.string().trim().max(256) ,
			permission: Joi.string().trim().max(256) ,
			type: Joi.string().trim().max(256) ,
			email: Joi.string().trim().email() ,
			phone: Joi.string().trim() 
		}),
	);
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await users.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/users/', async function(req, res, next) {
	let data;
	const schema  = Joi.alternatives().try(
		Joi.object().keys({
			id: Joi.number().required(),
			username: Joi.string().alphanum().trim().min(5).max(256)
		}),
		Joi.object().keys({
			id: Joi.number(),
			username: Joi.string().alphanum().trim().min(5).max(256).required()
		}),
	);
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await users.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.get('/courses/', async function(req, res, next) {
	let data = await courses.get(null);
			let response = {
			status : "success",
			values : data
		};
		res.send(response);
});

router.get('/courses/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await courses.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await courses.get(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/courses/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		courseName: Joi.string().trim().min(5).max(256).required() ,
		description: Joi.string().trim().min(10).required() ,
		type: Joi.string().trim().max(256).required() ,
		price: Joi.string().trim().max(256).required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		validation.value.createdBy = "asingha";
		validation.value.updatedBy = "asingha";
		data = await courses.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.put('/courses/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required(),
		courseName: Joi.string().trim().min(5).max(256) ,
		description: Joi.string().trim().min(10) ,
		type: Joi.string().trim().max(256) ,
		price: Joi.string().trim().max(256)
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await courses.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/courses/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await courses.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.get('/assignment/', async function(req, res, next) {
	let data = await assignment.get(null);
			let response = {
			status : "success",
			values : data
		};
		res.send(response);
});

router.get('/assignment/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await assignment.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await assignment.get(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/assignment/courseId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await assignment.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await assignment.getAssignmentByCourseId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/assignment/userId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await assignment.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await assignment.getAssignmentByUserId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/assignment/:courseId/:userId', async function(req, res, next) {
	let courseId = req.params.courseId;
	let userId = req.params.userId;
	if( courseId === null || courseId === undefined || courseId === '' ) {
		let data = await assignment.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await assignment.getAssignmentByCourseIdUserId(courseId, userId);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/assignment/', async function(req, res, next) {
	//add user id from token
	req.body.userId = "2";
	let data;
	const schema  = Joi.object().keys({
		courseId: Joi.string().required() ,
		userId: Joi.string(),
		due_date: Joi.string(),
		file_link: Joi.string().trim(),
		total_marks: Joi.string().trim() ,
		reference: Joi.string().trim() ,
		description: Joi.string().trim() ,
		comment: Joi.string().trim() 
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		validation.value.createdBy = "asingha";
		validation.value.updatedBy = "asingha";
		data = await assignment.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.put('/assignment/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required(),
		courseId: Joi.string(),
		userId: Joi.string(),
		due_date: Joi.string(),
		file_link: Joi.string().trim(),
		total_marks: Joi.string().trim() ,
		reference: Joi.string().trim() ,
		description: Joi.string().trim() ,
		comment: Joi.string().trim() 
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await assignment.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/assignment/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await assignment.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.get('/courseEnrollment/', async function(req, res, next) {
	let data = await courseEnrollment.get(null);
			let response = {
			status : "success",
			values : data
		};
		res.send(response);
});

router.get('/courseEnrollment/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await courseEnrollment.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await courseEnrollment.get(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/courseEnrollment/courseId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await courseEnrollment.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await courseEnrollment.getCourseEnrollmentByCourseId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/courseEnrollment/userId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await courseEnrollment.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await courseEnrollment.getCourseEnrollmentByUserId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/courseEnrollment/', async function(req, res, next) {
	//add user id from token
	req.body.userId = "2";
	let data;
	const schema  = Joi.object().keys({
		courseId: Joi.string().required() ,
		userId: Joi.string()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		validation.value.createdBy = "asingha";
		validation.value.updatedBy = "asingha";
		data = await courseEnrollment.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.put('/courseEnrollment/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required(),
		courseId: Joi.string(),
		userId: Joi.string()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await courseEnrollment.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/courseEnrollment/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await courseEnrollment.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.get('/submissions/', async function(req, res, next) {
	let data = await submissions.get(null);
			let response = {
			status : "success",
			values : data
		};
		res.send(response);
});

router.get('/submissions/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await submissions.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await submissions.get(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/submissions/assignmentId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await submissions.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await submissions.getSubmissionsByAssignmentId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/submissions/examId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await submissions.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await submissions.getSubmissionsByExamId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/submissions/', async function(req, res, next) {
	//add user id from token
	req.body.userId = "2";
	let data;
	const schema  = Joi.alternatives().try(
		Joi.object().keys({
			assignmentId: Joi.string().trim(),
			examId: Joi.string().trim().required() ,
			userId: Joi.string().trim(),
			file_link: Joi.string().trim(),
			marks: Joi.string().trim() ,
			comment: Joi.string().trim() 
		}),
		Joi.object().keys({
			assignmentId: Joi.string().trim().required() ,
			examId: Joi.string().trim(),
			userId: Joi.string().trim(),
			file_link: Joi.string().trim(),
			marks: Joi.string().trim() ,
			comment: Joi.string().trim() 
		})
	);
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		validation.value.createdBy = "asingha";
		validation.value.updatedBy = "asingha";
		data = await submissions.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	console.log(data);
	res.send(response);
});

router.put('/submissions/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required(),
		assignmentId: Joi.string().trim(),
		examId: Joi.string().trim(),
		userId: Joi.string(),
		file_link: Joi.string().trim(),
		marks: Joi.string().trim() ,
		comment: Joi.string().trim() 
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await submissions.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/submissions/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await submissions.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.get('/exams/', async function(req, res, next) {
	let data = await exams.get(null);
			let response = {
			status : "success",
			values : data
		};
		res.send(response);
});

router.get('/exams/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await exams.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await exams.get(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/exams/courseId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await exams.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await exams.getExamsByCourseId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/exams/userId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await exams.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await exams.getExamsByUserId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/exams/', async function(req, res, next) {
	//add user id from token
	req.body.userId = "2";
	let data;
	const schema  = Joi.object().keys({
		exam_name: Joi.string().trim().required() ,
		courseId: Joi.string().trim().required() ,
		userId: Joi.string().trim(),
		exam_date: Joi.string().trim(),
		start_date: Joi.string().trim(),
		end_date: Joi.string().trim(),
		description: Joi.string().trim(),
		comment: Joi.string().trim() ,
		reference: Joi.string().trim()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		validation.value.createdBy = "asingha";
		validation.value.updatedBy = "asingha";
		data = await exams.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.put('/exams/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required(),
		exam_name: Joi.string().trim() ,
		courseId: Joi.string().trim() ,
		userId: Joi.string().trim() ,
		exam_date: Joi.string().trim(),
		start_date: Joi.string().trim(),
		end_date: Joi.string().trim(),
		description: Joi.string().trim(),
		comment: Joi.string().trim() ,
		reference: Joi.string().trim()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await exams.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/exams/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await exams.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.get('/classes/', async function(req, res, next) {
	let data = await classes.get(null);
			let response = {
			status : "success",
			values : data
		};
		res.send(response);
});

router.get('/classes/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await classes.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await classes.get(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/classes/courseId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await classes.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await classes.getClassesByCourseId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/classes/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		courseId: Joi.string().trim().required(),
		topic: Joi.string().trim().required(),
		description: Joi.string().trim().required(),
		date: Joi.string().trim().required(),
		status: Joi.string().trim().required(),
		link: Joi.string().trim().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		validation.value.createdBy = "asingha";
		validation.value.updatedBy = "asingha";
		data = await classes.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.put('/classes/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required(),
		courseId: Joi.string().trim(),
		topic: Joi.string().trim(),
		description: Joi.string().trim(),
		date: Joi.string().trim(),
		status: Joi.string().trim(),
		link: Joi.string().trim()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await classes.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/classes/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await classes.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.get('/materials/', async function(req, res, next) {
	let data = await materials.get(null);
			let response = {
			status : "success",
			values : data
		};
		res.send(response);
});

router.get('/materials/id/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await materials.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await materials.get(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.get('/materials/courseId/:id', async function(req, res, next) {
	let id = req.params.id;
	if( id === null || id === undefined || id === '' ) {
		let data = await materials.get(null);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
	else {
		let data = await materials.getMaterialsByCourseId(id);
				let response = {
			status : "success",
			values : data
		};
		res.send(response);
	}
});

router.post('/materials/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		name: Joi.string().trim().required(),
		courseId: Joi.string().trim().required(),
		description: Joi.string().trim().required(),
		file_link: Joi.string().trim().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		validation.value.createdBy = "asingha";
		validation.value.updatedBy = "asingha";
		data = await materials.add(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.put('/materials/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required(),
		name: Joi.string().trim(),
		courseId: Joi.string().trim(),
		description: Joi.string().trim(),
		file_link: Joi.string().trim()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await materials.update(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

router.delete('/materials/', async function(req, res, next) {
	let data;
	const schema  = Joi.object().keys({
		id: Joi.number().required()
	});
	const validation = schema.validate(req.body);
	let response = {
		status : "failure"
	};
	if(validation.error) {
		response.status = "failure";
		response.value = validation;
	}
	else {
		//add code to extract username from token later
		// validation.value.createdBy = validation.value.username;
		// validation.value.updatedBy = validation.value.username;
		data = await materials.del(validation.value);
		if(data !== 'error' || data !==null || data !==undefined) {
			response.status = "success";
			response.value = validation.value
		}
		else {
			response.status = "failure";
		}
	}
	res.send(response);
});

module.exports = router;
