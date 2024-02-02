# UI5 Page

This Page explains how to implement an OData V4 CAP Service

## Basics

OData V4 is bound directly to the frontend and any changes to an object are sent directly to the backend as a patch request.

With a few exceptions, we only have access to our backend through our view and not through the controller.

We create a binding just as we do for JSON models.

In the controller we can use any of the [**List Binding (Aggregation Binding)**](https://sapui5.hana.ondemand.com/sdk/#/topic/91f057786f4d1014b6dd926db0e91070) functions.

```javascript
this.byId("Table").bindList("/Objects");
```

Alternatively, we can create the binding directly in the frontend.

```xml
<Table id="Table" items="{/Objects}"> // [!code focus]
...
</Table>
```

### sPath

The sPath sometimes comes up when talking about databindings.
localhost:4004/service/**entity(key)**
The **bold** part is what we call the sPath. It allows to search for individual entities.

# CRUD

## Create

Creating a new entity is only possible on [**List Binding (Aggregation Binding)**](https://sapui5.hana.ondemand.com/sdk/#/topic/91f057786f4d1014b6dd926db0e91070) using the [**create()**](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.ODataListBinding%23methods/create) function.

```javascript
pNewObject = oListBinding.create();
```

The [**create()**](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.ODataListBinding%23methods/create) function returns a promise of a context, with the [**created()**](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.Context%23methods/created) we can check if this promise has been resolved.

```javascript
oNewObject = pNewObject.created();

oDialog.setBindingContext(oNewObject);
//or
oDialog.bindElement(oNewObject.getPath());
```

The context allows us to bind the new object to something.

The create function also has optional parameters. We can find these in the UI5 documentation. The first and most important parameter allows us to set initial data for our created object.

[Create documentation](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v4.ODataListBinding/methods/create)

```javascript
oNewObject = pNewObject.created({ value1: "val1" });
```

## Read

Reading is done using data bindings. Alternatively we can also use some functions to access objects from the controller.

[**requestObject()**](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v4.Context%23methods/requestObject):
Returns a promise on the value for the given path relative to the context.

[**requestProperty()**](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v4.Context%23methods/requestProperty):
Returns a promise on the property value(s) for the given path(s) relative to the context. The value(s) will be requested from the backend if necessary.

[**getObject()**](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v4.Context%23methods/getObject):
Returns the value for the given path relative to this context

[**getProperty()**](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v4.Context%23methods/getProperty):
Returns the property value for the given path relative to this context.

Have a look at [this page](https://sapui5.hana.ondemand.com/#/topic/17b30ac2d5474078be31e695e97450cc.html) for more information.

## Update

Updating happens automatically. The moment we change a value for something that is bound, an automatic patch request is sent to the backend.

More on this on the [Draft](drafts.md) and [Batch Controll](batchcontrol.md) pages.

The [**setProperty()**](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.Context%23methods/setProperty) function allows us to change values from the controller.

```javascript
context.setProperty("property", "value");
```

## Delete

The [**delete()**](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.Context%23methods/delete) function can be called on a context and it deletes the object for that context.

It is also the only CRUD functionality that can be directly called on the model.

```javascript
model.delete(sPath);
```
