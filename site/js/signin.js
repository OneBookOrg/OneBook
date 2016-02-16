
$(document).ready(function() {
      
    $("#signinSubmit").click(function(event){

       $.post( "login", {username : $("#username").val(), password : $("#password").val()}, function(data){
          if(data.success){
            window.location.replace("/dashboard.html");
          }
          else{
            addError(); 

          }
       })
        
        
    });
});

function addError(){

    var appendString =   '<div class="alert alert-danger alert-dismissible" role="alert">'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                "<strong>Error:</strong> Username or Password provided was invalid. Please try again."+
                                    '</div>';
   $("#error").append(appendString);
  
}

