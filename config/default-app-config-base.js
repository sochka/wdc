module.exports.defaultAppConfigBase = {
  "skinName": "default",
  "title": "Title",
  "description": "Description",
  "keywords": [],
  "collaborations": [],
  "isPublished": true,
  "appWidgets": [
    {
      "type": "language-selector",
      "instanceName": "language-selector",
      "showFlags": true
    },
    {
      "type": "page-list",
      "instanceName": "page-list-nav"
    }
  ],
  "pages": [
    {
      "shortTitle": "Home",
      "href": "",
      "template": "1-col",
      "holders": {
        "column": {
          "widgets": [
            {
              "type": "title",
              "title": "Home page",
              "instanceName": "title-widget"
            },
            {
              "type": "htmlwidget",
              "instanceName": "main-page-html-widget",
              "text": "Empty home page. You can switch to design mode to edit this contents or add new widgets"
            }
          ]
        }
      }
    },
    {
      "shortTitle": "About",
      "href": "about",
      "template": "1-col",
      "holders": {
        "column": {
          "widgets": [
            {
              "type": "title",
              "title": "About author",
              "instanceName": "title"
            },
            {
              "type": "about",
              "instanceName": "about"
            }
          ]
        }
      }
    },
    {
      "href": "404",
      "template": "1-col",
      "holders": {
        "column": {
          "widgets": [
            {
              "type": "title",
              "title": "404 error",
              "instanceName": "title"
            },
            {
              "type": "htmlwidget",
              "text": "Page not found",
              "instanceName": "error-message"
            }
          ]
        }
      }
    }
  ]
}
