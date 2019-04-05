**Index:**
===

<p> This API of an insurance company allows the following Http requests</p>


  * <a href="https://github.com/constanza101/insurance/blob/master/docs/api-insurances.md#get-client-by-id">Get client by id</a>
  * <a href="https://github.com/constanza101/insurance/blob/master/docs/api-insurances.md#get-client-by-name">Get client by name</a>
  * <a href="https://github.com/constanza101/insurance/blob/master/docs/api-insurances.md#get-policies-by-client-name">Get policies by client name</a>
  * <a href="https://github.com/constanza101/insurance/blob/master/docs/api-insurances.md#get-client-by-policy-number">Get client by policy number</a>



**Get client by id**
----
01 - Returns all data of a single client.

* **URL**

  /clientById/:my_id/:client_id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `my_id=[string]`

  `client_id=[string]`


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br>
  * **Content:**

    `[{  
         "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
         "name":"Britney",
         "email":"britneyblankenship@quotezart.com",
         "role":"admin"
      }]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getclientbyId(){
var urldb = "localhost:8000"
var param1 = "/clientById"
var my_id = "a0ece5db-cd14-4f21-812f-966633e7be86"
var client_id = "a0ece5db-cd14-4f21-812f-966633e7be86"
var urlclientById = urldb+param1+"/"+my_id+"/"+client_id;

    $.get(urlclientById, function(response) {
        clientslist = response.client;
        $("p").append(clientslist)
    });
}
```

**Get client by name**
----
02 - Returns all data of a single client.

* **URL**

  /clientByName/:my_id/:client_name

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `my_id=[string]`

  `client_name=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br>
  * **Content:**

    `[{  
         "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
         "name":"Britney",
         "email":"britneyblankenship@quotezart.com",
         "role":"admin"
      }]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getClientByName(){
  var urlDB = "localhost:8000";
  var param1 = "/clientByName";
  var my_id = "a0ece5db-cd14-4f21-812f-966633e7be86";
  var client_name = "Britney";
  var urlClientByName = urlDB+param1+"/"+my_id+"/"+client_name;

    $.get(urlClientByName, function(response) {
        clientsList = response.client;
        $("p").append(clientsList)
    });
}
```


**Get policies by client name**
----
03 - Returns all policies of a single client.

* **URL**

  /policiesByClientName/:my_id/:client_name

* **Method:**

  `GET`

*  **URL Params** **(Required)**

`my_id=[string]`

`client_name=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

    `[{  
         "id":"64cceef9-3a01-49ae-a23b-3761b604800b",
         "amountInsured":1825.89,
         "email":"inesblankenship@quotezart.com",
         "inceptionDate":"2016-06-01T03:33:32Z",
         "installmentPayment":true,
         "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
      }]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getPoliciesOfClient(){
  var urlDB = "localhost:8000";
  var param1 = "/policiesByClientName";
  var my_id = "a0ece5db-cd14-4f21-812f-966633e7be86";
  var client_name = "Britney";
  var urlPoliciesByClientName = urlDB+param1+"/"+my_id+"/"+client_name;

    $.get(urlPoliciesByClientName, function(response) {
        policiesList = response.policies;
        $("p").append(policiesList)
    });
}
```


**Get client by policy number**
----
04 - Returns client owner of a policy number.

* **URL**

  /clientByPolicy/:my_id/:policy_id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `my_id=[string]`

  `policy_id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br/>
  * **Content:**

    `[{  
         "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
         "name":"Britney",
         "email":"britneyblankenship@quotezart.com",
         "role":"admin"
      }]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getClientByPolicy(){
  var urlDB = "localhost:8000";
  var param1 = "/clientByPolicy";
  var my_id = "0059ba44-75dc-4f73-9a9f-0e2376909e28";
  var policy_id = "0039b246-5ffa-4b90-b16f-fc9f2d4033d6";
  var urlClientByPolicy = urlDB+param1+"/"+my_id+"/"+policy_id;

    $.get(urlClientByPolicy, function(response) {
        policiesList = response.policies;
        $("p").append(policiesList)
    });
}
```
