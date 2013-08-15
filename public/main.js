$(document).ready(function() {
	$('#example').dataTable( {
		"sPaginationType": "full_numbers",
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": 'example',
		"aoColumns": [
	      { "mData": "engine", sTitle:"engine" },
	      { "mData": "browser", sTitle:"browser" },
	      { "mData": "platform", sTitle:"platform" },
	      { "mData": "details.0", sTitle:"details" },
	      { "mData": "details.1", sTitle:"mode details" }
	    ]
	} );
} );