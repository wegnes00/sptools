import hub from "./hub";
import { SiteScriptAction } from "../data/interfaces";
import { generateActionId, actionsToJson, actionsFromJson } from "../data/actionUtils";
import actionDefinitions from "../data/schemaParser";

const handleAddAction = function(actionVerb, index) {
    let actionDefinition = hub.state.actionDefinitions.find(a => a.verb === actionVerb);
    if (actionDefinition) {
        let newAction = JSON.parse(JSON.stringify(actionDefinition)) as SiteScriptAction
        newAction.id = generateActionId(actionDefinition, hub.state.actions);
        hub.state.actions.splice(index, 0, newAction);
    }
}

const handleReorderAction = function(actionId, newIndex) {
    let target = hub.state.actions.find(a => a.id === actionId);
    if (target) {
        let actions = hub.state.actions.filter(a => a.id !== actionId);
        actions.splice(newIndex, 0, target);
        hub.state.set( { actions }).now();
        actionsToJson(hub.state.actions);
    }
}

const handleRemoveAction = function(actionId) {
    let actions = hub.state.actions.filter(a => a.id !== actionId);
    hub.state.set( { actions }).now();
}

hub.on("actions:add", handleAddAction);
hub.on("actions:remove", handleRemoveAction);
hub.on("actions:reorder", handleReorderAction);

const json = JSON.stringify({
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
})