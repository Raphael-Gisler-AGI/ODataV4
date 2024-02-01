# Remote Service

The consumption of any Remote Service first requires the installation of the following packages: **@sap-cloud-sdk/resilience** and **@sap-cloud-sdk/http-client**.

To install these packages, run the following commands:

```sh
npm i @sap-cloud-sdk/resilience
```

```sh
npm i @sap-cloud-sdk/http-client
```

## OData Service

You begin, by downloading the **.edmx** file for the respective Service and importing it using the provided command. (The **.edmx** file can be found under the API Specification on the Buissness Accelerator Hub)

```sh
cds import <"filepath">
```

The external service will be added automatically to your package.json.

```JSON
"<API-Name>": {
        "kind": "odata",
        "model": "srv/external/<API-Name>"
      }
```

This will also generate a csn file in the srv.external folder. This file describes the db structure of the Remote Service.

Next, you need to import the API and create an entity in our schema.

```javascript
using { <"API-Name"> as api } from '../srv/external/<API-Name>';

...

entity APIEntity as projection on api.Entity {
    ID,
    ...
}
```

Finally, you need to write your service.


```javascript
using {db} from '../db/schema';

service Service {
    @readonly
    entity APIEntity as projection on db.APIEntity
}
```
CAP allows custom handlers for HTTP Requests you can implement them in a js file which needs to be named like the corresponding service

In the custom handler,you must connect to your API and, in an **on** handler, run the requests on your API.

HTTP Requests for remote services arent passed automatically, which means you have to send them manually as following; 

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
Some use cases need further custom logic to be implementet, for example the expansion of a field. 

## Rest Service

Unlike conventional oData APIs, Rest APIs do not have **.csn** or **.edmx** files to create a file **.csn** from

For this example, I have selected **https://jsonplaceholder.typicode.com/comments** as it does not require an API key.

To begin, you must create an entity that represents an object from our API, either fully or partially, and add it to a service.

API resoponse:

```json
{
  "postId": 1,
  "id": 1,
  "name": "id labore ex et quam laborum",
  "email": "Eliseo@gardner.biz",
  "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
}
```

Entity:

```javascript
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

```javascript
@Capabilities.KeyAsSegmentSupported : true
service RestService {
    @readonly
    entity Comments as projection on db.Comments
}
```

With the KeyAsSegmentSupported capability, the service accepts requests to get individual resources with the ID provided as a path segment, for example GET /weather/CurrentWeather/12345. This is a more REST-like way of reading resources by key, as opposed to OData's special syntax (GET /weather/CurrentWeather(12345)).

The next step is to add the connection to our **.cdsrc.json**. Note that you need the Base URL.
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

Usually, the path for **impl** should point to a **csn** or **cds** file. However, if you search for a JS file, you can overwrite the implementation with an empty function because you do not actually need an implementation.

```javascript
cds.service.impl(function () {});
```

Finally, you need to create a custom handler, similar to any API in Cap, that modifies our request and sends it to the remote service instead of our database.

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
