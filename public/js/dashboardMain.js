$( document ).ready(function() {
	//console.log( "ready!" );
	let pageName = "";
	let userId = "2"; //change to dynamic after login
	let courseDetails = {};

	//adds enrolled courses to view
	loadEnrolledCourses(userId);
	//adds available courses to view
	loadAvailableCourses();
	//showCourseDetails
	//loadCourseDetails();
});

let loadAvailableCourses = () => {
	$( '#availableCourses' ).on( 'click', () => {
		pageName = "Available Courses";
		$( '#mainContentWrapper' ).empty().append('<div class="container-fluid" id="mainContent"><div class="d-sm-flex align-items-center justify-content-between mb-4"><h1 class="h3 mb-0 text-gray-800">'+pageName+'</h1></div></div>');
		$.get( "http://localhost:3000/api/CRUDS/courses/", function( data ) {
			if(data.status === "failure") {
				alert("Failure in getting Courses. Kindly contact admin.");
			}
			else {
				let count = 0, rowNum = 0;
				$.each(data.values, function( index, value ) {
					if(count%2===0) { //adding row for per two element
						$( '#mainContent' ).append("<div class='row' id='row-"+count+"'></div>");
						rowNum = count; //setting row number for adding card
					}
					let template = Handlebars.templates.courseCard;
					value.count = count;
					//add card html to the row
					$("#row-"+rowNum).append(template(value));
					count++;
				});
			}
		});
	})
}

let loadEnrolledCourses = (userId) => {
	$( '#enrolledCourses' ).on( 'click', () => {
		pageName = "Enrolled Courses";
		$( '#mainContentWrapper' ).empty().append('<div class="container-fluid" id="mainContent"><div class="d-sm-flex align-items-center justify-content-between mb-4"><h1 class="h3 mb-0 text-gray-800">'+pageName+'</h1></div></div>');
		$.get( "http://localhost:3000/api/JOINS/courseEnrollment/userId/"+userId, function( data ) {
			if(data.status === "failure") {
				alert("Failure in getting Courses. Kindly contact admin.");
			}
			else {
				let count = 0, rowNum = 0;

				//iterate through all course enrollments
				$.each(data.values, function( index, value ) {
					if(count%2===0) { //adding row for per two element
						$( '#mainContent' ).append("<div class='row' id='row-"+count+"'></div>");
						rowNum = count; //setting row number for adding card
					}

					//setting course details on global scope
					courseDetails = value;

					//card html for each couse
					let card = '<div id="course-"'+count+' class="col-lg-6">'+
					'<input hidden value="'+value.courseId+'">'+
					'<div class="card shadow mb-4">'+
					'<div class="card-header py-3">'+
					'<h6 class="m-0 font-weight-bold text-primary">'+value.courseName+'</h6>'+
					'</div>'+
					'<div class="card-body">'+
					value.description+
					'<br><br>'+
					'<div class="d-flex flex-row justify-content-around card-header py-2" style="text-align: center;">'+
					'<div class="p-2 h5 mb-0 font-weight-bold text-gray-800">'+
					value.type+
					'</div>'+
					'<div class="p-2">'+
					'<i class="fas fa-rupee-sign" aria-hidden="true"></i>'+
					value.price+
					'/month'+
					'</div>'+
                    '<a href="#" class="btn btn-info btn-circle btn-sm" onClick=loadCourseDetails('+value.courseId+')><i class="fas fa-info-circle"></i></a>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>'

					//add card html to the row
					$("#row-"+rowNum).append(card);
					count++;
				});
			}
		});
		
	})	
}

let loadCourseDetails = (courseId) => {
	let template = Handlebars.templates.courseDetails;
	let data = {}; // ajax call for class data

	//class detals
	$.get( "http://localhost:3000/api/CRUDS/classes/courseId/"+courseId, function( data ) {
		if(data.status === "failure") {
			alert("Failure in getting Class Details. Kindly contact admin.");
		}
		else {
			data = data.values;
			let tableData = [];
			let ongoingClass = [];
			$.each(data, function (index, value) {
				let row = [
					value.date,
					value.topic,
					value.description,
					value.status,
					value.link
				];
				if(value.status==='Ongoing'||value.status==='ongoing') 
					ongoingClass = row;
				tableData.push(row);
			})
			$( '#mainContentWrapper' ).empty().append(template({courseName: courseDetails.courseName}));
			template = Handlebars.templates.classes;
			console.log(ongoingClass);
			if(ongoingClass.length===0)
				$( '#classes' ).append(template({ongoingClassLink : "None"}));
			else
				$( '#classes' ).append(template({ongoingClassLink : ongoingClass[4]}));
			populateClassDataTables(tableData);
		}
	});

	//assignment details

	$.get( "http://localhost:3000/api/CRUDS/classes/courseId/"+courseId, function( data ) {
		if(data.status === "failure") {
			alert("Failure in getting Class Details. Kindly contact admin.");
		}
		else {
			data = data.values;
			let tableData = [];
			let ongoingClass = [];
			$.each(data, function (index, value) {
				let row = [
					value.date,
					value.topic,
					value.description,
					value.status,
					value.link
				];
				if(value.status==='Ongoing'||value.status==='ongoing') 
					ongoingClass = row;
				tableData.push(row);
			})
			$( '#mainContentWrapper' ).empty().append(template({courseName: courseDetails.courseName}));
			template = Handlebars.templates.classes;
			console.log(ongoingClass);
			if(ongoingClass.length===0)
				$( '#classes' ).append(template({ongoingClassLink : "None"}));
			else
				$( '#classes' ).append(template({ongoingClassLink : ongoingClass[4]}));
			populateClassDataTables(tableData);
		}
	});

}

let populateClassDataTables = (data) => {
	console.log(data);
	$('#classDataTable').DataTable({
		data: data
	});
}