# Drafts
## What is draft handling?
## CRUD
### Create
```javascript
const entries = this.getModel().bindList("/Entries");
const result = entries.create({ // [!code focus]
    startTime: new Date(), // [!code focus]
    endTime: new Date(), // [!code focus]
}); // [!code focus]
this.getView().setBusy(true);
await result.created(); // [!code focus]
this.getView().setBusy(false);
```
[UI5 Documentation](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v4.ODataListBinding%23methods/create)
### Read
### Update
### Delete