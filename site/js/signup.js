$(document).ready(function() {
      
    $("#signupSubmit").click(function(event){
      var username = $("#inputUsername").val();
      var password = $("#inputPassword").val();
      var phone_number = $("#inputPhoneNum").val();

      if(!username || !password || !phone_number){
        var appendString =   '<div class="alert alert-danger alert-dismissible" role="alert">'+
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                "<strong>Error:</strong> Username or Password provided was invalid. Please try again."+
                                    '</div>';

        $("#error").append(appendString);

      }
      else{
        $("#error").empty();
        $.post( 
          'register',
          {
            username : $("#inputUsername").val(),
            password : $("#inputPassword").val(),
            phone_number : $("#inputPhoneNum").val()

          },
          function(data){
            if(data.success){
              window.location.replace("/blank.html");
            }
            
          }
        );
      }
  
    });

});
