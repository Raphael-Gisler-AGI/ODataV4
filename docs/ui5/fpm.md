# Flexibel Programing Model (FPM)

Similar to smart tables and smart lists, FMP allows us to use Fiori elements in our custom applications, not only for OData V2 but also for V4.
The Flexible Programming Model allows you to combine the flexibility of a freestyle app with the convenience of cds annotations.
This is achieved by linking to your CDS annotations.
If you want to learn more about CDS annotations, visit [DJ Adams's blog.](https://qmacro.org/blog/posts/2023/03/10/a-deep-dive-into-odata-and-cds-annotations/)

## Generate an FPM App

Using the Template Wizard select a Custom Page as your application template.

Inside of the main folder you will find your xml and js files.

```zsh
webapp/ # [!code focus]
├─ ext # [!code focus]
│  ├─ main/ # [!code focus]
├─ i18n/
├─ localService/
├─ test/
├─ Component.js
├─ index.html
└─ manifest.json
```

## Building Blocks

Building blocks allow you to grab fiori elements using your own annotations and put them straight into your freestyle app.

Try out the different Building Blocks [here](https://sapui5.hana.ondemand.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview).

```xml
<macros:FilterBar
    id="FilterBar"
    metaPath="@com.sap.vocabularies.UI.v1.SelectionFields"
    liveMode="true" />
<macros:Table
    id="Table"
    metaPath="@com.sap.vocabularies.UI.v1.LineItem"
    filterBar="FilterBar" />
```

Defining the annotations:

```javascript
UI: {
    SelectionFields: [
        title
    ],
    LineItem       : [
        {Value: title},
        {Value: genre.name}
    ],
}
```

This results in us having a fully functioning Fiori Elemnts Table and FilterBar inside of our freestyle app.

## Routing

When creating the pages using the SAP Fiori Application Modeler all of the routing should be taken care of by default.

It is important though to understand what the Application Modeler is doing under the hood.
What it does is it writes to the manifest.json file inside of your webapp folder.
So let's have a closer look at what it does.

Routes are defined in the same way as in a standard UI5 app.

```json
"routes": [
    {
        "name": "BooksMain",
        "pattern": ":?query:",
        "target": "BooksMain"
    },
    {
        "name": "BooksObjectPage",
        "pattern": "Books({BooksKey}):?query:",
        "target": "BooksObjectPage"
    }
]
```

```json
"targets": {
    "BooksMain": {
        "type": "Component",
        "id": "BooksMain",
        "name": "sap.fe.core.fpm",
        "options": {
            "settings": {
                "viewName": "fpm.ext.main.view.Main",
                "contextPath": "/Books",
                "navigation": {
                    "Books": {
                        "detail": {
                            "route": "BooksObjectPage"
                        }
                    }
                }
            }
        }
    },
    "BooksObjectPage": {
        "type": "Component",
        "id": "BooksObjectPage",
        "name": "sap.fe.core.fpm",
        "options": {
            "settings": {
                "viewName": "fpm.ext.main.view.ObjectPage",
                "contextPath": "/Books"
            }
        }
    }
}
```
