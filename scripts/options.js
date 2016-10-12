$(document).ready(function(){

  // get password from storage or use default
  var password; 
  chrome.storage.sync.get(function(items) {   
    password = items.vispass;
    if(password === undefined) 
      password = [0, 1, 2, 3, 4, 5, 6]; 

    resetIndices();  
  });

	var container = $('.container');
  for(var i=0; i < 42; i++){
      	var newBox = $('<div></div>');
      
      	// class for styling
      	newBox.addClass('box');
      
      	// id for identification
      	newBox.attr('id', i);

      	container.append(newBox);
  }



	function resetIndices(){

    console.log(password);

		$('.box').html("");
		for(var i=0; i<42; i++){
     		// color and add text in box if in password
      	if(password.indexOf(i) != -1){
      		$('#' + i).addClass('selected');
      		$('#' + i).html(password.indexOf(i));
      	}
      	else{
      		$('#' + i).removeClass('selected');
      	} 			
		}

	}

	// detects ID
	$('.box').click(function(e){

		var id =  parseInt(e.target.id);

    	// add to password if not selected
    	if(password.indexOf( id ) == -1){
    		password.push( id );
    		console.log(password)
    	}
   	else{
   		
   		if(password.length > 1){
   			password.splice(password.indexOf( id ), 1);
   		}

   	}

   	resetIndices();


	})

  $('#setPass').click(function(){
		// save password
		// 
		console.log(password);
		chrome.storage.sync.set({'vispass': password}, function() {
	          // Notify that we saved.
	          console.log('Settings saved', password);
        });

	})


});