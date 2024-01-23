# Batch Control
## What is batch control?
Batch control puts multiple operations into one single HTTP request.

This allows the developer to control when data is sent to the server. This is usually done when a (save) button is pressed.

To batch multiple requests together we have to give the context an UpdateGroupId

## Binding with batch control
In this example we bind a context to a dialog and set the UpdateGroupId.
```javascript
this.pDialog.then((oDialog) => {
    oDialog.bindElement({
        path: context.getPath(), // [!code focus]
        parameters: { $$updateGroupId: "Group" }, // [!code focus]
    });
    oDialog.open();
});
```
To send the requests, we have to use the submitBatch function with the UpdateGroupId as a parameter.
```javascript
saveDialog() {
    this.getOwnerComponent().getModel().submitBatch("Group"); // [!code focus]
    this._closeDialog();
}
```
To cancle the requests, we have to use have to use the resetChanges function with the UpdateGroupId as a parameter.
```javascript
saveDialog() {
    this.getOwnerComponent().getModel().resetChanges("Group"); // [!code focus]
    this._closeDialog();
}
```
## Creating & Editing with batch control with a dialog
### Example 1:
To create a new object, use the create() function after creating a List Binding (Aggregation Binding) with an UpdateGroupId.
```javascript
const oNewObject = this.getOwnerComponent()
    .getModel()
    .bindList("/Object", undefined, undefined, undefined, {
        $$updateGroupId: "Group",
    })
    .create();
oDialog.setBindingContext(oNewObject);
```
The create() function returns a context which can be directly bound to the dialog.

To edit, the object is bound to the dialog and given an updateGroupId.

This can be achieved with any function that allows binding a single object, such as bindElement(). 
```javascript
oDialog.bindElement(sPath, {
    $$updateGroupId: "Group",
});
```
To avoid having both a create and edit occur after each other, we should separate them with an if statement.
```javascript
if (!sPath) {
    const oNewObject = this.getOwnerComponent()
        .getModel()
        .bindList("/Object", undefined, undefined, undefined, {
            $$updateGroupId: "Group",
        })
        .create();
    oDialog.setBindingContext(oNewObject);
    .create();
    oBookDialog.setBindingContext(oNewBook);
} else {
    oDialog.bindElement(sPath, {
        $$updateGroupId: "Group",
    });
}
```
### Example 2:
Alternatively, the UpdateGroupId can be set on the Binding of the list or table...
```javascript
this.byId("Table").bindItems({
    path: "/Object",
    template: this.byId("template"),
    parameters: { $$updateGroupId: "Group" }
});
```
Now that the list has an UpdateGroupId, we can create a new object on it directly. Therefore, we do not need to create a new binding with an UpdateGroupId, but instead, we can retrieve the binding and create a new object on it.

As the oEvent context includes the UpdateGroupId, there is no need to create a new binding.
```javascript
oContext ??= this.byId("Table").getBinding("items").create();
oDialog.setBindingContext(oContext);
```
Here, a new context is created if it has not been set already, and then it is bound to the dialog.

**By using the exact same binding on the table and the dialog, any changes made in the dialog will also be applied to the table. However, these changes are only committed once we submit the batch.**