
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

```javascript

  app.get("/client/:id", function(req, res){
    var id = req.params.id;
    connection.query("SELECT * FROM clients WHERE id =("+id+");"
      ,function (err, data) {
        if(err) throw err;
        return res.send(data);
        });
    });
```
