$(document).ready(function(){

  // get password from storage or use default
  var password; 
  var res; 
  chrome.storage.sync.get(function(items) {   
    
        if(items.vispass === undefined){
          items.vispass = { 'pass': [0, 1, 2, 3], 'res': 0 }
        }

        password = items.vispass.pass;
        res = items.vispass.res;

        if(password === undefined) 
          password = [0, 1, 2, 3]; 
        if(res === undefined)
          res = 0;

        // select the resolution
        $('#res'+res).addClass('res-selected');  

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

  $('.res-btn').click(function(e){

      // remove class from others
      $('#res'+res).removeClass('res-selected');

      res = parseInt(e.target.id[3]); 
      $('#res'+res).addClass('res-selected');

      save();

  })

  $('#setPass').click(function(){
		
      save();
      window.close();

	})

  function save(){

    var json = {
          'pass': password,
          'res' : res
    }
    chrome.storage.sync.set({'vispass': json } , function() {
            // Notify that we saved.
            console.log('Settings saved', json);
            
        });    
  }


});