var $form = $(':password').closest('form');
$form.children().hide();

var message = $('<h3>Locked By VisPass</h3>')
$form.append(message);

console.log($form);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	
		$form.children().show();
		message.remove();

        sendResponse({farewell: "goodbye"})
	});

