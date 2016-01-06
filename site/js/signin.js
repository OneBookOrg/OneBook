var signin = {
    onReady: function(){
      signin.authenticate();
   },

 authenticate: function(){
   $("#signinSubmit").on('click',function(){
   
      var usernameInput = $("#username").val();
      var passwordInput = $("#password").val();

          $.ajax({
              type: "POST",
              cache: "false",
              url: "http://localhost:8000/login",
              data: {username:usernameInput, password:passwordInput},
              success:function(){
                window.location.replace("/blank.html");
              },
              error:function(){
                signin.errorMessage();
              }
          });
    }
  },

  errorMessage: function(){
    var appendString =   "<div class='alert alert-danger alert-dismissable'>"+
                                     "   <a class='close' data-dismiss='alert' href='#'>&times;"+
                            +"</a>"+
                          +"<i class='icon-remove-sign'></i>"+
                                +"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi nunc, rutrum quis tincidunt ac"+
                          "</div>";
   $.("#error").append(appendString);
  }


};