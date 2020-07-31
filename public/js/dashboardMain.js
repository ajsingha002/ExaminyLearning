$( document ).ready(function() {
	let pageName = "";
	let userId = "2"; //change to dynamic after login - store in cookie
	let courseDetails = {};
	//adds enrolled courses to view
	loadEnrolledCourses(userId);
	//adds available courses to view
	loadAvailableCourses();
	//adds Event Calender to view
	loadEventCalender(userId);
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

let loadEnrolledCourses = () => {
	let userId = 2; //load userId from cookie
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
                    '<a href="#" class="btn btn-info btn-circle btn-sm" onClick="loadCourseDetails(\''+value.courseName+'\','+value.courseId+')"><i class="fas fa-info-circle"></i></a>'+
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

let loadEventCalender = (userId) => {
	$( '#eventCalendar' ).on( 'click', () => {
		pageName = "Event Calender";
		$( '#mainContentWrapper' ).empty().append('<div class="container" id="mainContent"><div class="d-sm-flex align-items-center justify-content-between mb-4"><h1 class="h3 mb-0 text-gray-800">'+pageName+'</h1></div></div>');
		getEventsforUser(userId)
			.then((data) => {
				let template = Handlebars.templates.eventCalender;
				$('#mainContent').append(template());
				var calendarEl = document.getElementById('calendar');
				var calendar = new FullCalendar.Calendar(calendarEl, {
					themeSystem: 'bootstrap',
					initialView: 'dayGridMonth',
					eventDidMount: function(info) {
						$(info.el).tooltip({
							title: info.event.title,
							placement: 'top',
							trigger: 'hover',
							container: 'body'
						});
					},
					events : data.values
				});
				calendar.render();
				setTimeout(
					function() 
					{
						$(".fc-next-button").click();
						$(".fc-prev-button").click();
					}, 1);
			}).catch((err) => {
				console.log(err);
			});
	})

}

let getEventsforUser = (userId) => {
	return $.get( "http://localhost:3000/api/JOINS/events/userId/"+userId, function( data ) {
		if(data.status === "failure") {
			alert("Failure in getting Events. Kindly contact admin.");
		}
		else {
			return data;
		}
	});
}

let loadCourseDetails = (courseName, courseId) => {
	let userId = 2; //get user id from cookie
	let template = Handlebars.templates.courseDetails;
	$( '#mainContentWrapper' ).empty().append(template({courseName: courseName}));
	//class details
	loadClassesDetails(courseId);
	//assignment details
	loadAssignmentsDetails(courseId, userId);
	//material details
	loadMaterialsDetails(courseId);
}

//loads classes tab details
let loadClassesDetails = (courseId) => {
	//ajax call for class data
	$.get( "http://localhost:3000/api/CRUDS/classes/courseId/"+courseId, function( data ) {
		if(data.status === "failure") {
			alert("Failure in getting Class Details. Kindly contact admin.");
		}
		else {
			data = data.values;
			//array to be sent for populating datatables for Assignments
			let tableData = [];
			//ongoing class, if any, to be stored here
			let ongoingClass = [];
			//looping through all classes for the course to add in table
			$.each(data, function (index, value) {
				let row = [
					value.date,
					value.topic,
					value.description,
					value.status,
					value.link
				];
				//checking if any ongoing class for the course is present
				if(value.status==='Ongoing'||value.status==='ongoing') 
					ongoingClass = row;
				tableData.push(row);
			})
			//compiling handlebars
			let template = Handlebars.templates.classes;

			//adding ongoing class details to top card
			if(ongoingClass.length===0)
				$( '#classes' ).empty().append(template({ongoingClassLink : "None"}));
			else
				$( '#classes' ).empty().append(template({ongoingClassLink : ongoingClass[4]}));
			//Initiating Datatables for Classes
			populateClassDataTables(tableData);
		}
	});
}

//loads Assignments tab details 
let loadAssignmentsDetails = (courseId, userId) => {
	//ajax call to get assignments for Course Id
	$.get( "http://localhost:3000/api/CRUDS/assignment/courseId/"+courseId, function( assignmentData ) {
		if(assignmentData.status === "failure") {
			alert("Failure in getting Assignement Details. Kindly contact admin.");
		}
		else {
			//ajax call to get all submissions
			$.get( "http://localhost:3000/api/CRUDS/submissions/", function( submissionData ) {
				if(submissionData.status === "failure") {
					alert("Failure in getting Submission Details. Kindly contact admin.");
				}
				else {

					//getting values from response
					assignmentData = assignmentData.values;
					submissionData = submissionData.values;
					//array to be sent for populating datatables for Assignments
					let tableData = [];

					//looping through each assignment data to crete row for table
					$.each(assignmentData, function (i, assignment) {
						//row data for each row in Datatable
						let row = [
							assignment.id,
							assignment.due_date,
							assignment.description,
							assignment.reference,
							assignment.comment,
							assignment.file_link,
							assignment.total_marks,
						];
						//Submission Status
						row.push("Pending");
						//Submission Marks
						row.push("Ungraded");
						//Submission Date
						row.push("NA");
						//Submission ID
						row.push("-1");

						//checking if any submission if found for this user and course for the particular assignment
						$.each(submissionData, function (j, submission) {
							if((parseInt(submission.assignmentId) === assignment.id) && (parseInt(submission.userId) === userId)) {
								//Submission Status
								row[row.length-4]="Submitted";
								//Submission Marks
								row[row.length-3]=submission.marks===null ? "Ungraded" : submission.marks;
								//Submission Date
								row[row.length-2]=submission.updatedAt;
								//Submission ID
								row[row.length-1]=submission.id;
							}
						});
						//adding each row to datatable array
						tableData.push(row);
					});
					//compiling Assignment handlebars
					template = Handlebars.templates.assignments;
					//add assignment template html to assignment tab
					$( '#assignment' ).empty().append(template());
					//adding hook on dismiss of upload modal to refresh assingment tab for table update
					$('#assingnmentModal').on('hidden.bs.modal', function () {
						loadAssignmentsDetails(courseId, userId);
					})
					//funtion updates datatables
					populateAssignmentsDataTables(tableData);
				}
			});
		}
	});
}

//loads Materials tab details 
let loadMaterialsDetails = (courseId) => {
	//ajax call to get assignments for Course Id
	$.get( "http://localhost:3000/api/CRUDS/materials/courseId/"+courseId, function( materialsData ) {
		if(materialsData.status === "failure") {
			alert("Failure in getting Assignement Details. Kindly contact admin.");
		}
		else {
			materialsData = materialsData.values;
			//array to be sent for populating datatables for Assignments
			let tableData = [];
			//looping through all materials for the course to add in table
			$.each(materialsData, function (index, value) {
				//adding each row array
				let row = [
					value.id,
					value.name,
					value.description,
					value.file_link,
					value.updatedAt
				];
				tableData.push(row);
			})
			//compiling handlebars
			let template = Handlebars.templates.materials;

			$( '#materials' ).empty().append(template());
			//Initiating Datatables for Classes
			populateMaterialsDataTables(tableData);
		}
	});
}

//pupulate classes data in classes tab
let populateClassDataTables = (data) => {
	$('#classDataTable').DataTable({
		data: data
	});
}

//populates assignment data in assignment tab
let populateAssignmentsDataTables = (data) => {

	$('#assignmentsDataTable').DataTable({
		data: data,
		columnDefs : [
			{
				//defines html for upload or change of submission buttion
				targets : [7],
				render : function(data, type, row) {
					let html = "";
					if(data === 'Submitted') {
						//sending assingment id and submission id to modal function for adding or updating submission
						html = '<a href="#" onClick=submitAssignment('+row[0]+','+row[10]+') id="submitBtn" class="btn btn-success btn-icon-split" data-toggle="modal" data-target="#assingnmentModal">'+
						'<span class="icon text-white-50">'+
						'<i class="fas fa-check"></i>'+
						'</span>'+
						'<span class="text">Submitted</span>'+
						'</a>';
					}
					else {
						//sending assingment id and submission id to modal function for adding or updating submission
						html = '<a href="#" onClick=submitAssignment('+row[0]+','+row[10]+') id="pendingBtn" class="btn btn-warning btn-icon-split" data-toggle="modal" data-target="#assingnmentModal">'+
						'<span class="icon text-white-50">'+
						'<i class="fas fa-exclamation-triangle"></i>'+
						'</span>'+
						'<span class="text">Pending</span>'+
						'</a>';	
					}
					return html;
				}     
			},
			{
				//defines html for assignment download button
				targets : [5],
				render : function(data, type, row) {
					let html = '<a href="#" onClick=downloadFile('+data+') id="dnldBtn" class="btn btn-primary btn-icon-split">'+
						'<span class="icon text-white-50">'+
						'<i class="fas fa-download"></i>'+
						'</span>'+
						'<span class="text">Download</span>'+
						'</a>';
					return html;
				}     
			},
			{
				targets : [0,10],
				visible : false
			}
		]
	});
}

//populates materials data in materials tab
let populateMaterialsDataTables = (data) => {
	
	$('#materialsDataTable').DataTable({
		data: data,
		columnDefs : [
			{
				//defines html for materail download button
				targets : [3],
				"className": "text-center",
				render : function(data, type, row) {
					let html = '<a href="#" onClick=downloadFile('+data+') id="dnldBtn" class="btn btn-primary btn-icon-split">'+
						'<span class="icon text-white-50">'+
						'<i class="fas fa-download"></i>'+
						'</span>'+
						'<span class="text">Download</span>'+
						'</a>';
					return html;
				}     
			},
			{
				targets : [0],
				visible : false
			}
		]
	});
}

//called for modal control to add or update assignment submission
let submitAssignment = (assignId, submitId) => {
	//get user Id from cookie
	let userId = 2;
	//button for download - if no submission is present alert
	$("#oldSubmitAssignLink").on("click", () => {	
		if(submitId < 0)
			alert("No submission present to download.")
	});
	//there is already a submission - setup for download button of aold assignment submission
	if(submitId > 0) {
		//get submission details by id
		$.get( "http://localhost:3000/api/CRUDS/submissions/id/"+submitId, function( data ) {
			if(data.status === "failure") {
				alert("Failure in getting Submission Details for modal. Kindly contact admin.");
			}
			else {
				//setting button to green as previous submission can be downloaded
				$('#oldSubmitAssignLink').removeClass("btn-secondary");
				$('#oldSubmitAssignLink').addClass("btn-success");
				//button for download of already submitted assignment
				$("#oldSubmitAssignLink").on("click", () => {
					//calling download funtion for any download
					downloadFile(data.values[0].file_link);
				});
			}
		});
	}
	else {
		//setting button to gray as submission failed and to stop download attempt
		$('#oldSubmitAssignLink').removeClass("btn-success");
		$('#oldSubmitAssignLink').addClass("btn-secondary");
	}

	//initialize drag and drop and upload form
	uploadFormSetup(assignId, submitId);
}

let uploadFormSetup = (assignId, submitId) => {
	//code for drag and drop and upload facility

	var dropZone = document.getElementById('drop-zone');
	var uploadForm = document.getElementById('js-upload-form');
	uploadForm.addEventListener('submit', function(e) {
		var uploadFiles = document.getElementById('js-upload-files').files;
		e.preventDefault();
		startUpload(uploadFiles, assignId, submitId);
	});
	
	dropZone.ondrop = function(e) {
		e.preventDefault();
		this.className = 'upload-drop-zone';
		document.getElementById('js-upload-files').files = e.dataTransfer.files;
		startUpload(e.dataTransfer.files, assignId, submitId);
	};
	
	dropZone.ondragover = function() {
		this.className = 'upload-drop-zone drop';
		return false;
	};
	
	dropZone.ondragleave = function() {
		this.className = 'upload-drop-zone';
		return false;
	};
}

//function to upload list of files received - uploads only first file in the list
var startUpload = function(files, assignId, submitId) {
	//calls file upload route and gets file id for new upload
	let form = $('#js-upload-form')[0]; // You need to use standard javascript object here
	let formData = new FormData(form);
	$.ajax({
		url: "http://localhost:3000/api/files/upload/",
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		method: 'POST',
		success: function(data){
			if(data.status==="success") {
				let fileId = data.values.id;
				//if already submission is present, then updates submission
				if(submitId > 0) {
					$.ajax({
						type : "PUT", 
						url : "http://localhost:3000/api/CRUDS/submissions/", 
						data : {id : submitId, file_link : fileId},
						success : (data) => {
							//on success submission, alert user and activate button to download submitted assignment.
							if(data.status==="success") {
								//redraw assignment tab
								// let userId = 2 //get user Id from cookie
								// loadAssignmentsDetails(courseDetails.courseId, user)
								alert("Assignment submission updated successfully!");
								$('#oldSubmitAssignLink').removeClass("btn-secondary");
								$('#oldSubmitAssignLink').addClass("btn-success");
							} else {
								//deactivate download button
								alert("Assignment submission failed!");
								$('#oldSubmitAssignLink').removeClass("btn-success");
								$('#oldSubmitAssignLink').addClass("btn-secondary");
							}
						}
					});
				}
				//no submission is present, so new submission is to be added
				else {
					//preparing object for adding submission - assignment id received in args
					//get user id from cookie
					userId = 2;
					let submitdata = {
						assignmentId : assignId,
						userId : userId,
						file_link : fileId
					};
					//ajax call for post request - addition of new submission
					//toggle button status on success or failure
					$.post( "http://localhost:3000/api/CRUDS/submissions/", submitdata, (data) => {
						if(data.status==="success") {
							alert("Assignment submitted successfully!");
							$('#oldSubmitAssignLink').removeClass("btn-secondary");
							$('#oldSubmitAssignLink').addClass("btn-success");
						} else {
							alert("Assignment submission failed!");
							$('#oldSubmitAssignLink').removeClass("btn-success");
							$('#oldSubmitAssignLink').addClass("btn-secondary");
						}
					});
				}
			} else {
				alert("Assignment Upload Failed!");
				$('#oldSubmitAssignLink').removeClass("btn-success");
				$('#oldSubmitAssignLink').addClass("btn-secondary");
			}
		}
	});
}

//generic funtion for download of any file - args : File ID
let downloadFile = (fileId) => {
	//post call for downloading assignment - in modal
	let form = '<form id="downloadForm" action="http://localhost:3000/api/files/download/" method="POST">' + 
					'<input type="hidden" name="id" value="'+fileId+'">' +
				'</form>';
	$('#assignment').append(form);
	$('#downloadForm').submit();
	$('#downloadForm').remove();
}