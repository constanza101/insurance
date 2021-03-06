
**Backend developer assessment.**
===

 <p>As an insurance company we've been asked to develop an application that manages some information about our insurance policies and company clients. To do that, we have two services that provide all the data we need:</p>

* The list of company clients can be found at: <a>http://www.mocky.io/v2/5808862710000087232b75ac </a>
* The list of company policies can be found at: <a>http://www.mocky.io/v2/580891a4100000e8242b75c5 </a>

With that information, we need to create a Web API that exposes the following services with some added constraints:

* <a href="https://github.com/constanza101/insurance/blob/master/docs/insurances-API-test.md#01--get-user-data-filtered-by-user-id"> Get user data filtered by user id. </a> -> Can be accessed by users with role "users" and "admin".<a>

* <a href="https://github.com/constanza101/insurance/blob/master/docs/insurances-API-test.md#02-get-user-data-filtered-by-user-name"> Get user data filtered by user name. </a> -> Can be accessed by users with role "users" and "admin".

* <a href="https://github.com/constanza101/insurance/blob/master/docs/insurances-API-test.md#03--get-the-list-of-policies-linked-to-a-user-name"> Get the list of policies linked to a user name.  </a> -> Can be accessed by users with role "admin".

* <a href="https://github.com/constanza101/insurance/blob/master/docs/insurances-API-test.md#04--get-the-user-linked-to-a-policy-number"> Get the user linked to a policy number.  </a> -> Can be accessed by users with role "admin".

* <a href="https://github.com/constanza101/insurance/blob/master/docs/insurances-API-test.md#05--extra-post-http-requests"> EXTRA "POST" http requests: </a> -> For inserting into my database all the details of both endpoints provided.


* <a href="https://github.com/constanza101/insurance/blob/master/docs/api-insurances.md"> Documentation. </a>

We have the following constraints:
* REST API should be developed using some node framework (loopback or express)
* Think about licenses of 3d party libraries (if needed)
* Authentication and authorization. Take the user role from the web service that returns the list of company clients
As our stakeholders are very fussy, here you have some tips:
* Usage of last technologies (not less than node 6)
* Solution properly structured
* Usage of patterns
* Add everything you think it's needed to ensure product's quality
* Documentation.

**API for an insurances company**
===
- Node.js
- Express.js
- MySQL 


1. Data Base:<br>
Given the tasks and the data shown at the two endpoints provided, I decided to work with a Relational/SQL data base, considering that SQL databases are ideal when the data will not need to be often changed. SQL databases are more consistent than NoSQL.  

2. API.<br>
Using Node.js and its framework Express I developed an <a href="https://github.com/constanza101/insurance/blob/master/server.js">API</a> that allows 4 http "GET" requests required:

Making use of Node's libraries "File System" and "Process", we can access to the connection data saved in other JS file, this is useful if we are working in 2 databases, for example "localhost" and "remote" databases.

HTTP requests:

**01- Get user data filtered by user id.**
----
Can be accessed by users with role "users" and "admin".
<br><br>
  * Based on the data given at the endpoints I am using 2 params for authentication and request:<br>
    1: "my_id" will be the client id who is making the request. <br>
    2: "client_id" will be the id of the client of whom we want to get all the details.

  * The first request will verify the ID of the user making the request ("my_id"). If it exists in the database, it will return their "role".
  (If we knew that "role" only has 2 options: "admin" and "user", and that they are "not null", technically we would not need to verify the "role" in order to make the next request, but I consider that it is safer to  do it in case we want to add other "roles" in the future).

  * If "role" is "user" or "admin" they are allowed to request the client's data by the "client_id".If the "client_id" is not found in the database it returns a "not found" message, else it returns the data of the client requested.

  * Final "else" in case that "role" is not "user" or "admin".

```javascript

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
        else {return res.send("Not authorized to make this request.");}
    });
});
```


**02-Get user data filtered by user name.**
----

Can be accessed by users with role "user" and "admin".

*  As in the previous case we will first verify the id of the user making the request.

* If their "role" is "user" or "admin" they are allowed to request the clients data, by the "client_name".

* Again, if "my_id" or "client_name" do not exist in the database an "error message" is returned.


```javascript
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

```


**03- Get the list of policies linked to a user name.**
----
Can be accessed by users with role "admin".

* As in the previous cases we will first verify the "my_id" and "role" of the user making the request.

* If their "role" is "admin" they are allowed to request the clients' id, by the "client_name".

* Once we have the "clientId" returned, we can request the client's policies.

    * Error messages will be returned if:
      * "my_id" does not exist.
      * "client_name" does not exist.
      * "role" is not "admin".
      * Client does not have any policies.


```javascript
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
                  console.log("SELECT * FROM insurance.policies WHERE clientId =('" + clientId + "');");
                  connection.query("SELECT * FROM insurance.policies WHERE clientId =('" + clientId + "');", function(err, data) {
                      if (err) throw err;
                      console.log(data);
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

```  


**04- Get the user linked to a policy number.**
----
Can be accessed by users with role "admin".

  * As in the previous cases we will first verify the "my_id" and "role" of the user making the request.

  * If their "role" is "admin" they are allowed to request the clients' id, by the "policy_id".

  * Once we have the "clientId" returned, we can request the client's data by their id.

    * Error messages will be returned if:
      * "my_id" does not exist.
      * "client_id" does not exist.
      * "role" is not "admin".
      * policy_id is not valid.

```javascript
app.get("/clientByPolicy/:my_id/:policy_id", function(req, res) {
    var my_id = req.params.my_id;
    var policy_id = req.params.policy_id;
    connection.query("SELECT role FROM insurance.clients WHERE id =('" + my_id + "');", function(err, data) {
        if (err) throw err;
        if (data == "") {
          res.send("Not allowed to make this request - client id does not exist")
        }
        else if (data[0]["role"] == "admin") {
          connection.query("SELECT clientId FROM insurance.policies WHERE id =('" + policy_id + "');", function(err, data) {
              if (err) throw err;
              if (data == "") {
                res.send("Not allowed to make this request - policy id does not exist")
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
```


**05- Extra "POST" http requests.**
----

```javascript

//POST/clients
//USED for inserting all the clients data provided into my database
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
  //USED for inserting all the policies data provided into my database
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
```
