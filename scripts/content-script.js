var $btn = $(':password').closest('form').find(':submit');
$btn.prop('disabled', true);

var message = $btn.val();
$btn.val("Locked By VisPass");


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

		$btn.prop('disabled', false);
		$btn.val(message);

        sendResponse({farewell: "goodbye"})
	});

