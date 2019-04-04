
**Backend developer assessment.**
===

 <p>As an insurance company we've been asked to develop an application that manages some information about our insurance policies and company clients. To do that, we have two services that provide all the data we need:</p>

* The list of company clients can be found at: <a>http://www.mocky.io/v2/5808862710000087232b75ac </a>
* The list of company policies can be found at: <a>http://www.mocky.io/v2/580891a4100000e8242b75c5 </a>

With that information, we need to create a Web API that exposes the following services with some added constraints:

* Get user data filtered by user id -> Can be accessed by users with role "users" and "admin".
* Get user data filtered by user name -> Can be accessed by users with role "users" and "admin".
* Get the list of policies linked to a user name -> Can be accessed by users with role "admin".
* Get the user linked to a policy number -> Can be accessed by users with role "admin".

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



1. Data Base:
<br>
Given the tasks and the data shown at the two endpoints provided, I decided to work with a Relational/SQL data base, considering that SQL databases are ideal when the data will not need to be often changed. SQL databases are more consistent than NoSQL.  

2. API.
<br>
Using Node.js and its framework Express I made an <a href="">API</a> that allows 4 http "GET" requests :

Making use of Node's libraries "File System" and "Process", we can access to the connection data saved in other JS file, this is useful if we are working in 2 databases, for example "localhost" and "remote" databases.

HTTP requests:
* 01- Get user data filtered by user id ->
Can be accessed by users with role "users" and "admin".
<br><br>
  * Based on the data given at the endpoints I am using 2 params for authentication and request:<br>
    1: "my_id" will be the client id who is making the request. <br>
    2: "client_id" will be the id of the client of whom we want to get all the details.<br><br>
  * The first request will verify the ID of the user making the request ("my_id"). If it exists in the database, it will return their "role".
  (If we knew that "role" only has 2 options: "admin" and "user", and that they are "not null", technically we would not need to verify the "role" in order to make the next request, but I consider that it is safer to  do it in case we want to add other "roles" in the future)<br><br>
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



  * 02-Get user data filtered by user name -> Can be accessed by users with role "users" and "admin".

    * As in the previous case we will first verify the id of the user making the request.

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
