# Batch Control
## What is batch control?
Batch control puts multiple operations into one single HTTP request.

This allows the developer to control when data is sent to the server. This is usually done when a (save) button is pressed.

## Binding with batch control
In this example a context gets binded to a dialog. Through the parameters of the binding we give the batch control an id.
```javascript
this.entryDialog.then((dialog) => {
    dialog.bindElement({
        path: context.getPath(), // [!code focus]
        parameters: { $$updateGroupId: "entryGroup" }, // [!code focus]
    });
    dialog.open();
});
```
