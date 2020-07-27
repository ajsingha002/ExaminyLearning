// Call the dataTables jQuery plugin
$(document).ready(function() {
	$('#dataTable').DataTable({
		"lengthChange": false,
		"searching": false,
		pageLength: 4,
		"pagingType": "full_numbers"
	});
});
