$('input:password').hide();

console.log("Content Script Loaded");


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

    	console.log("Password Correct");
    	
    	$(":password" ).show();

        sendResponse({farewell: "goodbye"})
	});

