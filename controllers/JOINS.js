const db = require('../database');
const { QueryTypes } = require('sequelize');

// const model = {
// 	users : require('../models/Users'),
// 	courses : require('../models/Courses'),
// 	courseEnrollment : require('../models/CourseEnrollment')
// }



const getCourseEnrollmentByUserId = async (body) => {
	let data;
	try {
		let query = 'select cid_1 as "courseId", "courseName", "description", "type", "price" from ' +
					'(SELECT TO_NUMBER( a."courseId", \'99999\') cid_1 , b.id cid_2,  TO_NUMBER( a."userId", \'99999\') as "userId", ' +
					'b."courseName" as "courseName", b.description as "description", ' +
					'b.type as "type", b.price as "price" ' +
					'FROM course_enrollment a, courses b ) course ' +
					'where cid_1 = cid_2 and "userId" = $userId ' ;
		data = await db.query(query, { 
			bind : {userId : parseInt(body)},
			type: QueryTypes.SELECT 
		});

	} catch (e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
}

module.exports = {
	getCourseEnrollmentByUserId : getCourseEnrollmentByUserId
}