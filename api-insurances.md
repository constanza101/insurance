**Index:**
===
  * <a href="">Get clients by id</a>
  * <a href="">Get clients by name</a>
  * <a href="">Get policies by user name</a>
  * <a href="">Get clients by policy number</a>



**Get clients by id**
----
Returns all data of a single client.

* **URL**

  //client/:id

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
function getClients(){
var urlCilents = "http://www.mocky.io/v2/5808862710000087232b75ac"
var id = "a0ece5db-cd14-4f21-812f-966633e7be86"
var urlClientsById = urlCilents+"/"+id;
    $.get(urlCilents, function(response) {
        clientsList = response.clients;
        $("p").append(clientsList)
    });
}
```
