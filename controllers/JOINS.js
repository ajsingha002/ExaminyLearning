const db = require('../database');
const { QueryTypes } = require('sequelize');

// const model = {
// 	users : require('../models/Users'),
// 	courses : require('../models/Courses'),
// 	courseEnrollment : require('../models/CourseEnrollment')
// }



const getCourseEnrollmentByUserId = async (body) => {
	let data = [];
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

const getEventsByUserId = async (body) => {
	let data = [];
	try {

		//getting all courseIds user has enrolled for
		let query = "SELECT \"courseId\" FROM course_enrollment where to_number(\"userId\", '9999')=$userId;";
		let courseIdList= await db.query(query, { 
			bind : {userId : parseInt(body)},
			type: QueryTypes.SELECT 
		});

		//getting all courses from the courseIdList
		query = "SELECT * FROM courses where id in (SELECT to_number(\"courseId\", '9999') FROM course_enrollment where to_number(\"userId\", '9999')=$userId);";
		let coursesList = await db.query(query, { 
			bind : {userId : parseInt(body)},
			type: QueryTypes.SELECT 
		});

		//getting all classes from the courseIdList
		query = "SELECT * FROM classes where to_number(\"courseId\", '9999') in (SELECT to_number(\"courseId\", '9999') FROM course_enrollment where to_number(\"userId\", '9999')=2);";
		let classesList = await db.query(query, { 
			bind : {userId : parseInt(body)},
			type: QueryTypes.SELECT 
		});

		//getting all assignments from the courseIdList
		query = "SELECT * FROM assignment where to_number(\"courseId\", '9999') in (SELECT to_number(\"courseId\", '9999') FROM course_enrollment where to_number(\"userId\", '9999')=$userId);";
		let assignmentsList = await db.query(query, { 
			bind : {userId : parseInt(body)},
			type: QueryTypes.SELECT 
		});

		//getting all submissions from the courseIdList
		query = "SELECT * FROM submissions where to_number(\"userId\", '9999')=$userId";
		let submissionsList = await db.query(query, { 
			bind : {userId : parseInt(body)},
			type: QueryTypes.SELECT 
		});

		//getting all exams from the courseIdList
		query = "SELECT * FROM exams where to_number(\"courseId\", '9999') in (SELECT to_number(\"courseId\", '9999') FROM course_enrollment where to_number(\"userId\", '9999')=$userId);";
		let examsList = await db.query(query, { 
			bind : {userId : parseInt(body)},
			type: QueryTypes.SELECT 
		});

		//given event id - counter
		let eventId = 0;

		//iterate through classes and add in events list
		classesList.forEach((value) => {
			let course = getCourseDetails(coursesList, value.courseId);
			let event = {
				id : eventId,
				title : "Class - "+value.topic+" : "+course.courseName,
				start: value.date,
				end: value.date
			}
			if(value.status === "completed")
				event.backgroundColor = "#4e73df";
			else if(value.status === "ongoing")
				event.backgroundColor = "#e74a3b";
			else if(value.status === "scheduled")
				event.backgroundColor = "#1cc88a";

			data.push(event);
			eventId++;
		});

		//iterate through assignments and add in events list
		assignmentsList.forEach((value) => {
			let course = getCourseDetails(coursesList, value.courseId);
			let submission = getSubmissionDetails(submissionsList, value.id);
			let event = {
				id : eventId,
				title : "Assignment - "+value.description+" : "+course.courseName,
				start: value.due_date,
				end: value.due_date
			}
			if(submission)
				event.backgroundColor = "#1cc88a";
			else
				event.backgroundColor = "#f6c23e";

			data.push(event);
			eventId++;
		});

		//iterate through exams and add in events list
		examsList.forEach((value) => {
			let course = getCourseDetails(coursesList, value.courseId);
			let event = {
				id : eventId,
				title : "Exam - "+value.exam_name+" : "+course.courseName,
				backgroundColor : "#1cc88a"
			}
			if(value.exam_date) {
				event.start = value.exam_date;
				event.end = value.exam_date;
			}
			else {
				event.start = value.start_date;
				event.end = value.end_date;	
			}

			data.push(event);
			eventId++;
		});

	} catch (e) {
		console.log('\n\nError Occured : \n' + e);
		data = 'error';
	}
	return data;
}

const getCourseDetails = (courses, id) => {
	let retval;
	courses.forEach((value) => {
		if(value.id === parseInt(id)){
			retval = value;
		}
	});
	return retval;
}

const getSubmissionDetails = (submissions, id) => {
	let retval;
	submissions.forEach((value) => {
		if(parseInt(value.assignmentId) === id){
			retval = value;
		}
	});
	return retval;
}

module.exports = {
	getCourseEnrollmentByUserId : getCourseEnrollmentByUserId,
	getEventsByUserId : getEventsByUserId
}