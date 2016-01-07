
$(document).ready(function() {
      
    $("#signinSubmit").click(function(event){

       $.post( "login", {username : $("#username").val(), password : $("#password").val()}, function(data){
          if(data.success){
            window.location.replace("/blank.html");
          }
          else{
            alert("Login Failed. Make sure your username and password are correct.");
          }
       })
        

        
    });

});


