$(document).ready(function() {
      
    $("#signinSubmit").click(function(event){

       $.post( 
          'login',
          {
            username : $("#username").val(),
            password : $("#password").val()
          },
          function(){
          	window.location.replace("/blank.html");
          }
       );

  
    });

});
