**Index:**
===

<p> This API of an insurance company allows the following Http requests</p>


  * <a href="https://github.com/constanza101/insurance/blob/master/api-insurances.md#get-client-by-id">Get client by id</a>
  * <a href="https://github.com/constanza101/insurance/blob/master/api-insurances.md#get-client-by-name">Get client by name</a>
  * <a href="https://github.com/constanza101/insurance/blob/master/api-insurances.md#get-policies-by-client-name">Get policies by client name</a>
  * <a href="https://github.com/constanza101/insurance/blob/master/api-insurances.md#get-client-by-policy-number">Get client by policy number</a>



**Get client by id**
----
Returns all data of a single client.

* **URL**

  /client/:id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
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
var urlCilents = "http://www.mocky.io/v2/5808862710000087232b75ac"
var id = "a0ece5db-cd14-4f21-812f-966633e7be86"
var urlclientById = urlCilents+"/"+id;
    $.get(urlCilents, function(response) {
        clientslist = response.client;
        $("p").append(clientslist)
    });
}
```

**Get client by name**
----
Returns all data of a single client.

* **URL**

  /client/:name

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `name=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
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
function getclientByName(){
var urlCilents = "http://www.mocky.io/v2/5808862710000087232b75ac"
var name = "Britney"
var urlclientById = urlCilents+"/"+name;
    $.get(urlclientById, function(response) {
        clientslist = response.client;
        $("p").append(clientslist)
    });
}
```


**Get policies by client name**
----
Returns all policies of a single client.

* **URL**

  /policies/:name

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `name=[string]`

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
var urlPolicies = "http://www.mocky.io/v2/580891a4100000e8242b75c5"
var name = "Britney"
var urlPoliciesByName = urlPolicies+"/"+name;
    $.get(urlPoliciesByName, function(response) {
        policiesList = response.policies;
        $("p").append(policiesList)
    });
}
```


**Get client by policy number**
----
Returns client owner of a policy number.

* **URL**

  /user/:policy_id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

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
function getclientByPolicy(){
var urlclient = "http://www.mocky.io/v2/580891a4100000e8242b75c5"
var policy_id = "64cceef9-3a01-49ae-a23b-3761b604800b"
var urlPoliciesByName = urlCilents+"/"+policy_id;
    $.get(urlPoliciesByName, function(response) {
        policiesList = response.policies;
        $("p").append(policiesList)
    });
}
```
