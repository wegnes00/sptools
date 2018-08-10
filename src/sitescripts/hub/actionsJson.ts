export default JSON.stringify({
    "$schema": "schema.json",
    "actions": [
        {
            "verb": "applyTheme",
            "themeName": "Fox Communities Theme"
        }, 
        {
            "verb": "associateExtension",
            "title": "TopNav",
            "location": "ClientSideExtension.ApplicationCustomizer",
            "clientSideComponentId": "c2de4f7d-5979-49dc-9b52-b81ccc1630b7",
            "clientSideComponentProperties": "{ \"menuSiteUrl\":\"https://foxcu.sharepoint.com/sites/intranet\"}",
            "scope": "Web"
        }
    ]
});