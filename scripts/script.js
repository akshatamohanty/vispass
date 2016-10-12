$(document).ready(function(){

      var sequence = [];
      var password;
      var res;

      // get password from storage
      chrome.storage.sync.get(function(items) {   
          
          password = items.vispass.pass;   
          res = items.vispass.res;

          if(password === undefined || res === undefined){
            //alert("Password has not been set. Please set your password from options.");
            //close();
          }

          if(password === undefined)
            password = [0, 1, 2, 3]
          if(res === undefined)
            res = 0;

      });
      
      // get background image from storage
      // 
      

      // used to send message when password is correct
      var sendMessage = function(){

          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

              chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                  
                  console.log(response);
                  window.close();

              });
          });       
      }

      var container = $('.container');
      for(var i=0; i < 42; i++){
          var newBox = $('<div></div>');
          
          // class for styling
          newBox.addClass('box');
          
          // id for identification
          newBox.attr('id', i);


          container.append(newBox);
      }


      // detects ID
      $('.box').click(function(e){

          addToSequence(parseInt(e.target.id));
      
      })


      function addToSequence(id){
          
          sequence.push(id);

          if(sequence.length == password.length)
            checkPass();

      }

      function checkPass(){

          var flag = true;

          for(var i=0; i < password.length; i++){

              // it's a 7x6 grid
              // 0 1 2 3 4 5 6 
              // 7 8 9 10 11 12 13
              // 14 15 16 17 18 19
              // 20 21 22 23 24 25 26
              // 27 28 29 30 31 32 33
              // 34 35 36 37 38 39 40 
              // 41 42
              var elementPos = $('#' + password[i]).position();
              var targetPos = $('#' + sequence[i]).position();

              if( Math.abs(elementPos.left - targetPos.left) > 40*(res+1) || Math.abs(elementPos.top - targetPos.top) > 40*(res+1)){

                    flag = false; 
                    break;

              }
              


          }

          // compare sequence & password
          if(flag){

            // select all form elements and enable autocomplete
            //alert('Correct!');

            sendMessage();
          
          }
          else{

             alert('Wrong Password');
             //$('.container').css({'background-color' : 'red'});
             sequence = [];
             //window.close();
          }
          
      }



})



