# Remote Service
To use any remote service, you require the installation of **@sap-cloud-sdk/resilience** and **@sap-cloud-sdk/http-client**.

To install, run these commands:
```sh
npm i @sap-cloud-sdk/resilience
```
```sh
npm i @sap-cloud-sdk/http-client
```

## OData Service

To begin, download the **.edmx** file and import it using the provided command.
```sh
cds import filepath
```
Our external service will be added to our package.json.
```JSON
"API": {
        "kind": "odata",
        "model": "srv/external/API"
      }
```
This will also generate the csn file in the srv.external folder.

Next, we need to import the API and create an entity in our schema.
```cds
using { API as api } from '../srv/external/API';

...

entity APIEntity as projection on api.Entity {
    ID,
    ...
}
```
Finally, we need to write our service and a custom handler. 
In the custom handler, we must connect to our API and, in an **on** handler, run the requests on our API.
```cds
using {db} from '../db/schema';

service Service {
    @readonly
    entity APIEntity as projection on db.APIEntity
}
```
```javascript
const cds = require("@sap/cds");

class adminService extends cds.ApplicationService {


  async init() {
    this.api = await cds.connect.to("API");
    const { APIEntity } = this.entities;

    this.on("READ", APIEntity, async (req, next) => {
      return this.api.run(req.query);
    });
    return super.init();
  }
}

module.exports = adminService;

```
This will not work for every use case. If a field is expanded, additional custom logic must be added to handle it.

Please see the following example.

## Rest Service
I am doing some **susy** stuff here, but it works.

Unlike conventional oData APIs, Rest APIs do not have **.csn** or **.edmx** files to create a file **.csn** from

For this example, I have selected **https://jsonplaceholder.typicode.com/comments** as it does not require an API key.

To begin, we must create an entity that represents an object from our API, either fully or partially, and add it to a service.

API resoponse:
```JSON
{
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
}
```
Entity:
```cds
@readonly
entity Comments {
        postId : Integer;
    key ID     : Integer;
        name   : String;
        email  : String;
        body   : String;
}
```
Service:
```cds
@Capabilities.KeyAsSegmentSupported : true
service RestService {
    @readonly
    entity Comments as projection on db.Comments
}
```
With the KeyAsSegmentSupported capability, the service accepts requests to get individual resources with the ID provided as a path segment, for example GET /weather/CurrentWeather/12345. This is a more REST-like way of reading resources by key, as opposed to OData's special syntax (GET /weather/CurrentWeather(12345)).

The next step is to add the connection to our **.cdsrc.json**. Note that we need the Base URL.
API resoponse:
```JSON
{
    "odata": {
      "flavor": "x4"
    },
    "requires": {
      "CommentsAPI": {
        "kind": "rest",
        "impl": "srv/external/rest-service.js",
        "credentials": {
          "url": "https://jsonplaceholder.typicode.com"
        }
      }
    }
  }
```
Usually, the path for **impl** should point to a **csn** or **cds** file. However, if we search for a JS file, we can overwrite the implementation with an empty function because we do not actually need an implementation.

```javascript
cds.service.impl(function () {});
```
Finally, we need to create a custom handler, similar to any API in Cap, that modifies our request and sends it to the remote service instead of our database.

```javascript
const cds = require("@sap/cds");

class adminService extends cds.ApplicationService {


  async init() {
    this.api = await cds.connect.to("CommentsAPI");
    const { Comments } = this.entities;


    this.before("READ", Comments, (req, next) => {
        //
    });
    this.on("READ", Comments, async (req, next) => {
      return this.api.run(req.query);
    });
    this.after("Read", Comments, (res, req) => {
        //
    });
    return super.init();
  }
}

module.exports = adminService;

```