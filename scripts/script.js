$(document).ready(function(){

      var sequence = [];
      var password;

      // get password from storage
      chrome.storage.sync.get(function(items) {   
        password = items.vispass   
        if(password === undefined){
          password = [0, 1, 2, 3, 4, 5, 6];
          chrome.storage.sync.set({'vispass': password});
        }
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

          // compare sequence & password
          if(sequence.equals(password)){

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




/*
 *  Array comparison solution
 */
// http://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});