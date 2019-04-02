var fs = require ("fs");
var express = require("express");
var mysql = require("mysql");
var connectionData  = process.argv[2]; /*eslint no-undef: "off"*/

/*
Endpoint 1:
http://www.mocky.io/v2/5808862710000087232b75ac
{"clients":[{
         "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
         "name":"Britney",
         "email":"britneyblankenship@quotezart.com",
         "role":"admin"
      }]}

Endpoint 2:
http://www.mocky.io/v2/580891a4100000e8242b75c5

{"policies":[{
         "id":"64cceef9-3a01-49ae-a23b-3761b604800b",
         "amountInsured":1825.89,
         "email":"inesblankenship@quotezart.com",
         "inceptionDate":"2016-06-01T03:33:32Z",
         "installmentPayment":true,
         "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
      }]}
*/

fs.readFile( connectionData+".json", function (err, data) {
  if (err) throw err;
  var objServerData = JSON.parse(data);

var connection = mysql.createConnection(objServerData);

  //Open connection
  connection.connect();
  console.log("conectado!");

  //create server:
  var app = express();

  //parse JSON responses
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
  });

/*-01- Get user data filtered by user id ->
Can be accessed by users with role "users" and "admin" */
  app.get("/client/:id", function(req, res){
    var id = req.params.id;
    connection.query("SELECT * FROM clients WHERE id =("+id+");"
      ,function (err, data) {
        if(err) throw err;
        return res.send(data);
        });
    });

/*-02-Get user data filtered by user name ->
Can be accessed by users with role "users" and "admin" */
app.get("/client/:name", function(req, res){
  var id = req.params.name;
  connection.query("SELECT * FROM clients WHERE name =("+name+");"
    ,function (err, data) {
      if(err) throw err;
      return res.send(data);
      });
  });

/*-03- Get the list of policies linked to a user name
-> Can be accessed by users with role "admin" */
app.get("/policies/:name", function(req, res){
  var name = req.params.name;
  connection.query("SELECT id FROM clients WHERE name =("+name+");"
    ,function (err, data) {
      if(err) throw err;
      var clientId = data[0]["id"];
      connection.query("SELECT * FROM policies WHERE clientId =("+clientId+");"
        ,function (err, data) {
          if(err) throw err;
          return res.send(data);
          });
      });
  });

/*• Get the user linked to a policy number
-> Can be accessed by users with role "admin*/
app.get("/user/:policy_id", function(req, res){
  var policy_id = req.params.policy_id;
  connection.query("SELECT clientId FROM policies WHERE id =("+policy_id+");"
    ,function (err, data) {
      if(err) throw err;
      var clientId = data[0]["id"];
      connection.query("SELECT * FROM policies WHERE clientId =("+clientId+");"
        ,function (err, data) {
          if(err) throw err;
          return res.send(data);
          });
      });
  });



  //POST/login
  app.post("/login", function(req, res){
    var email = req.body.email;
    var id = req.body.id;
    connection.query("SELECT sha1('"+password+"')"
          ,function (err, data) {
            if(err) throw err;
            var idToCheck = data[0]["id"];

            connection.query("SELECT id, email, role FROM clients WHERE email =('"+email+"');"
                  ,function (err, data) {
                    if(err) throw err;
                    if(data[0] == undefined){
                      return res.send("wrongEmail")
                    } else if (idToCheck == data[0].id) {
                        console.log("contraseña correcta".green);
                        return res.send(data);
                        } else{
                          console.log("contraseña incorrecta".red)
                          return res.send("wrongPass")
                      }
                    });
            });
  });//post login



  app.listen(8000, function(){
    console.log("Server is listening in port 8000")
  })
