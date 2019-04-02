var loggedIn = false;

function login(){
var email = $('#inputEmail').val();
var id = $('#inputId').val();
var data = {"email":email,"id": id};
var urlCilents = "http://www.mocky.io/v2/5808862710000087232b75ac"
var urlLogin = urlCilents+"/login"
var loggedIn = false;

  $.post(urlCilents, data, (response) => {
      var savedId = response[0]["id"];
      var savedEmail = response[0]["email"];
      var role = response[0]["role"]
      if (response == "wrongEmail" || "wrongPass"){
        return alert("datos incorrectos")
      }else if(id == savedId) {
        return loggedIn = true;
      }
  });
}

function getClientsBtId(loggedIn, id){
  if (loggedIn == true){
    getClients()
  }
}


function getClients(){
var urlCilents = "http://www.mocky.io/v2/5808862710000087232b75ac"
    $.get(urlCilents, function(response) {
        clientsList = response.clients;
        $("p").append(clientsList)
    });
}
