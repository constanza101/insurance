var fs = require("fs");
var express = require("express");
var colors = require("colors");
var mysql = require("mysql");
var connectionData = process.argv[2]; /*eslint no-undef: "off"*/

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

fs.readFile(connectionData + ".json", function(err, data) {
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
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
        next();
    });


//POST/clients
    app.post("/clients", function(req, res){
      var clients = req.body["clients"]

      for (var i = 0; i < clients.length; i++) {
         var id = clients[i]["id"]
         var name = clients[i]["name"]
         var email = clients[i]["email"]
         var role = clients[i]["role"]
      connection.query(
        "INSERT INTO clients (id, name, email, role) VALUES("
            +"'"+id+"','"+name+"','"+email+"','"+role+"');"
        ,function (err, data) {
            if(err) throw err;
         });
      }
      return res.send("clients saved")
  });

  //POST/policies
      app.post("/policies", function(req, res){
        var policies = req.body["policies"]

        for (var i = 0; i < policies.length; i++) {
           var id = policies[i]["id"];
           var amountInsured = policies[i]["amountInsured"];
           var email = policies[i]["email"];
           var inceptionDate = policies[i]["inceptionDate"];
           var installmentPayment = policies[i]["installmentPayment"];
           var clientId = policies[i]["clientId"];

        connection.query(
          "INSERT INTO insurance.policies (id, amountInsured, email, inceptionDate, installmentPayment, clientId) VALUES("
              +"'"+id+"',"+amountInsured+",'"+email+"','"+inceptionDate+"',"+installmentPayment+",'"+clientId+"');"
          ,function (err, data) {
              if(err) throw err;
           });
        }
        return res.send("policies saved")
    });




    /*-01- Get user data filtered by user id ->
    Can be accessed by users with role "users" and "admin" */
    //GET/clientById/:my_id/:client_id;
    app.get("/clientById/:my_id/:client_id", function(req, res) {
        var my_id = req.params.my_id;
        var client_id = req.params.client_id;
        connection.query("SELECT role FROM insurance.clients WHERE id =('" + my_id + "');", function(err, data) {
            if (err) throw err;
            if (data == "") {
              res.send("Not allowed to make this request - user id does not exist")
            }
            else if (data[0]["role"] == "user" || data[0]["role"] == "admin") {
              connection.query("SELECT * FROM insurance.clients WHERE id =('" + client_id + "');", function(err, data) {
                    if (err) throw err;
                    if (data == "") {
                      return res.send("Client id was not found in clients data base")
                    }
                    else {return res.send(data);}
                });
            }
            else {"Not authorized to make this request."}
        });
    });

    /*-02-Get user data filtered by user name ->
    Can be accessed by users with role "users" and "admin" */
    app.get("/clientByName/:my_id/:client_name", function(req, res) {
      var my_id = req.params.my_id;
      var client_name = req.params.client_name;
      connection.query("SELECT role FROM insurance.clients WHERE id =('" + my_id + "');", function(err, data) {
          if (err) throw err;
          if (data == "") {
            res.send("Not allowed to make this request - user id does not exist")
          }
          else if (data[0]["role"] == "user" || data[0]["role"] == "admin") {
              connection.query("SELECT * FROM insurance.clients WHERE name =('" + client_name + "');", function(err, data) {
                  if (err) throw err;
                  if (data == "") {
                    return res.send("Name was not found in clients data base")
                  }
                  else {return res.send(data);}
              });
          }
          else {
            return res.send("Not authorized to make this request.")
          }
      });
    });


    /*-03- Get the list of policies linked to a user name
    -> Can be accessed by users with role "admin" */
    app.get("/policiesByClientName/:my_id/:client_name", function(req, res) {
      var my_id = req.params.my_id;
      var client_name = req.params.client_name;
      connection.query("SELECT role FROM insurance.clients WHERE id =('" + my_id + "');", function(err, data) {
          if (err) throw err;
          if (data == "") {
            res.send("Not allowed to make this request - user id does not exist")
          }
          else if (data[0]["role"] == "admin") {
            connection.query("SELECT id FROM insurance.clients WHERE name =('" + client_name + "');", function(err, data) {
                if (err) throw err;
                if (data == "") {
                  res.send("Not allowed to make this request - user does not exist")
                }
                else{
                  var clientId = data[0]["id"];
                  connection.query("SELECT * FROM insurance.policies WHERE clientId =('" + clientId + "');", function(err, data) {
                      if (err) throw err;
                      if (data == "") {
                        return res.send(client_name + " does not have any policies")
                      }
                      else {return res.send(data);}
                  });
                }
            });
          }
          else {
            return res.send("You are not authorized to make this request.")
          }
      });
    });

    /*04- Get the user linked to a policy number
    -> Can be accessed by users with role "admin*/
    app.get("/clientByPolicy/:my_id/:policy_id", function(req, res) {

        var my_id = req.params.my_id;
        var policy_id = req.params.policy_id;
        connection.query("SELECT role FROM insurance.clients WHERE id =('" + my_id + "');", function(err, data) {
            if (err) throw err;
            if (data == "") {
              res.send("Not allowed to make this request - user id does not exist")
            }
            else if (data[0]["role"] == "admin") {
              connection.query("SELECT clientId FROM insurance.policies WHERE id =('" + policy_id + "');", function(err, data) {
                  if (err) throw err;
                  if (data == "") {
                    res.send("Not allowed to make this request - policy does not exist")
                  }
                  else{
                    var clientId = data[0]["clientId"];
                    connection.query("SELECT * FROM insurance.clients WHERE id =('" + clientId + "');", function(err, data) {
                      if (err) throw err;
                      return res.send(data);
                    }); //SELECT * FROM insurance.clients
                  }//else
              });//SELECT clientId FROM insurance.policies
            } //if "role" == "admin"
        }) //SELECT role from insurance.clients
    }); //app.get()

    app.listen(8000, function() {
        console.log("Server is listening in port 8000")
    })
});
