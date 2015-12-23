$(document).ready(function() {
			
            $("#signinSubmit").click(function(event){
				
               $.post( 
                  "http://localhost:8000/login",
                  {
                   username: $('#username').value,
                   password: $('#password').value
              	  },
                  function(data) {
                     alert(data);
                  }
               );
					
            });
				
         });