# Drafts

First to enable Draft handling you have to enable drafts for your entity.

```javascript
service Service {
    @odata.draft.enabled
    entity Entity  as
        projection on db.Entity;
}
```

## What is draft handling?

A draft is a temporary copy of an object, indicated by the IsActiveEntity column which is part of the key. An object can also have a draft, indicated by the HasDraftEntity column.

Entities with draft functionality cannot be created or edited directly. These functions are performed on the drafts and are subsequently applied to the object.

When we create, only a draft is created and not an actual object. In order to create the object, we have to 'activate' the draft.

To edit an object, a draft must first be created. The draft can then be edited before being activated.

### Read

If we do a normal binding as we always would we only objects are shown and not drafts.

To also see Drafts you have to write a filter to do so.

```javascript
this.byId("Table").bindItems({
  path: "/Objects",
  template: this.byId("template"),
  filters: new Filter("IsActiveEntity", FilterOperator.EQ, false), // [!code focus]
});
```

Alternatively, you can view both objects without drafts and drafts simultaneously like this.

```javascript
this.byId("Table").bindItems({
  path: "/Objects",
  template: this.byId("template"),
  filters: new Filter({
    // [!code focus]
    filters: [
      // [!code focus]
      new Filter( // [!code focus]
        "SiblingEntity/IsActiveEntity", // [!code focus]
        FilterOperator.EQ, // [!code focus]
        null // [!code focus]
      ), // [!code focus]
      new Filter("IsActiveEntity", FilterOperator.EQ, false), // [!code focus]
    ], // [!code focus]
    and: true, // [!code focus]
  }), // [!code focus]
});
```

### Create a new draft

```javascript
const pNewObject = this.getModel().bindList("/Objects").create(); // [!code focus]
this.getView().setBusy(true);
const oNewObject = await result.created(); // [!code focus]
this.getView().setBusy(false);
oNewObject.getPath(); // [!code focus]
```

The getPath() function can be used to bind the element to whatever we want.

### Edit an existing object

To edit an existing object, it is necessary to create a draft of it. However, since objects cannot have multiple drafts simultaneously, it is recommended to check for existing drafts first.

```javascript
if (context.getProperty("HasDraftEntity")) return;
```

To create a draft from an object, we need to write a normal context binding (element binding) and then call the cap created. Be careful not to forget that IsActiveEntity is part of the key.

```javascript
this.getOwnerComponent()
  .getModel()
  .bindContext(`${context.getPath()}/drafts.draftEdit(...)`, context)
  .execute();
```

### Activate

To activate a draft, we need to write a normal context binding (element binding) and then call the cap created. Be careful not to forget that IsActiveEntity is part of the key.

```javascript
this.getOwnerComponent()
  .getModel()
  .bindContext(`${context.getPath()}/drafts.draftActivate(...)`, context)
  .execute();
```
