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

::: info
The metapath defines **what** annotation is being searched for.

The contextPath defines **in which** entity the annotation is being searched.
:::

In this case we are searching for the SelectionFields and a LineItem inside of the Entity Books.

::: code-group

```xml [Main.view.xml]
<macros:FilterBar
    id="BooksFilterBar"
    metaPath="@com.sap.vocabularies.UI.v1.SelectionFields"
    contextPath="/Books"
    liveMode="true" />
<macros:Table
    id="BooksTable"
    metaPath="@com.sap.vocabularies.UI.v1.LineItem"
    contextPath="/Books"
    filterBar="BooksFilterBar" />
```

:::

Defining the annotations:

::: code-group

```javascript [annotations.cds]
UI: {
    SelectionFields: [
        title
    ],
    LineItem       : [
        {Value: title},
        {Value: genre.name}
    ]
}
```

:::

This results in us having a fully functioning Fiori Elemnts Table and FilterBar inside of our freestyle app.

## Routing

When creating the pages using the SAP Fiori Application Modeler all of the routing should be taken care of by default.

It is important though to understand what the Application Modeler is doing under the hood.
What it does is it writes to the manifest.json file inside of your webapp folder.
So let's have a closer look at what it does.

Routes are defined in the same way as in a standard UI5 app.

::: code-group

```json [manifest.json]
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

:::

For our targets we have to define the type as Component instead of View.

The name has to be the path to the FPM Component ("sap.fe.core.fpm").

Inside of the settings we define the contextPath which is the entity that will be binded to the page.

The navigation is also defined inside of the settings. The key of the navigation object is the entity that we want to navigate from.

::: code-group

```json [manifest.json]
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

:::

### NavBar

If you want something like a Navigation Bar or a Side Bar that doesn't change when routing then you need to implement a NavContainer

For this you have to create a view that contains a [NavContainer](https://sapui5.hana.ondemand.com/#/entity/sap.m.NavContainer).
You should also give it an id. This will later be used in the manifest.json to define the config of all routes.

The same view needs to extend to a [NavContainer Controller](https://sapui5.hana.ondemand.com/#/api/sap.fe.core.rootView.NavContainer).

::: tip
If you extend to the NavContainer controller directly you can use the class path: **sap.fe.core.rootView.NavContainer**

If you create your own controller you need to extend to the module: **sap/fe/core/rootView/NavContainer.controller**
:::

::: code-group

```xml [Root.view.xml]
<NavContainer id="appContent" />
```

:::

::: code-group

```json [manifest.json] {3}
"routing": {
    "config": {
        "controlId": "appContent"
    }
}
```
:::

The rootView tells your app what it should load first. From there it will find the NavContainer and load the Component for the corresponding route.

::: code-group

```json [manifest.json]
"rootView": {
    "id": "RootView",
    "viewName": "fpm.ext.main.view.Root"
}
```

:::
