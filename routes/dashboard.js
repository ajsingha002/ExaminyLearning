const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//get user type by id
	//if user==student
	let partial = 'dashboardStudent';
	//else 
	//partial = 'dashboardTeacher';
	res.render(partial, { 
		layout: 'dashboardStudentLayout',
		title: 'Examiny Learning',
		username: 'Arghajyoti Singha',
		profileImgLink: 'https://source.unsplash.com/QAB-WJcbgJk/60x60',
		courses: '3',
		attendance: '13',
		totalClasses: '20',
		assignmentTotal: '10',
		assignmentCompleted: '3',
		assignmentStatus: '30' 
	});
});

module.exports = router;
