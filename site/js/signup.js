$(document).ready(function() {
      
    $("#signupSubmit").click(function(event){

       $.post( 
          'register',
          {
            username : $("#inputUsername").val(),
            password : $("#inputPassword").val(),
            phone_number : $("#inputPhoneNum").val()

          }
       );
  
    });

});
