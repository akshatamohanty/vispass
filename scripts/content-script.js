$(document).ready(function(){

	var password = $(':password');
	var submit_btn = password.closest('form').find(':submit');

	var str = password.val(); setTimeout( function(){
											console.log(str);
											console.log(password.get(0).value)
										}, 1000);
	var regex = /[^\w\s]/gi;

	alert(password.get(0).value);

	if(regex.test(str) == true) {
	    alert('Your search string contains illegal characters.');
	    submit_btn.prop('disabled', true);
	}

	var message = submit_btn.val();
	//submit_btn.val("Locked By VisPass");


	chrome.runtime.onMessage.addListener(
	    function(request, sender, sendResponse) {

			submit_btn.prop('disabled', false);
			submit_btn.val(message);

	        sendResponse({farewell: "goodbye"})
		});

});

