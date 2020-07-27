const express = require('express');
const Joi = require('joi');
const router = express.Router();
const joins = require('../controllers/JOINS');

/* GET home page. */
//join data of course enrollment and courses table to return course data for a particular student
router.get('/courseEnrollment/userId/:id', async function(req, res, next) {
	let userId = req.params.id;
	let data = await joins.getCourseEnrollmentByUserId(userId);
	let response= {
		status : "success",
		values : data
	};
	res.send(response);
});

module.exports = router;
