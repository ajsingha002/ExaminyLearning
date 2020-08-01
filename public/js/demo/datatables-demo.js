// Call the dataTables jQuery plugin
$(document).ready(function() {
	let userId = 2; //get from cookies
	getUpcomingActivities(userId)
	.then( (data) => {
		let tableData = [];
		if(data.status === "failure") {
			alert("Failure in getting Events. Kindly contact admin.");
		}
		else {
			tableData = [];
			data = data.values;
			data.forEach(element => {
				if((new Date(element.start))>=(new Date())) {
					let row = [
						element.title,
						element.start,
						element.end
					];
					tableData.push(row);
				}
			});
		}
		$('#dataTable').DataTable({
			data : tableData,
			"lengthChange": false,
			"searching": false,
			pageLength: 4,
			"pagingType": "full_numbers"
		});
	})
	.catch(err => {
		console.log(err);
	})
});

let getUpcomingActivities = (userId) => {
	return $.get( host+"/api/JOINS/events/userId/"+userId, function( data ) {
		if(data.status === "failure") {
			alert("Failure in getting Events. Kindly contact admin.");
		}
		else {
			return data;
		}
	});
}