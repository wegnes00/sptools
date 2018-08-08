import hub from "./hub";
import { SiteScriptAction } from "../data/interfaces";

const handleAddAction = function(actionVerb, index) {
    let actionDefinition = hub.state.actionDefinitions.find(a => a.verb === actionVerb);
    if (actionDefinition) {
        let newAction = JSON.parse(JSON.stringify(actionDefinition)) as SiteScriptAction
        newAction.id = Date.now() + "";
        hub.state.actions.splice(index, 0, newAction);
    }
}

const handleReorderAction = function(actionId, newIndex) {
    let target = hub.state.actions.find(a => a.id === actionId);
    if (target) {
        let actions = hub.state.actions.filter(a => a.id !== actionId);
        actions.splice(newIndex, 0, target);
        hub.state.set( { actions }).now();
    }
}

hub.on("actions:add", handleAddAction);
hub.on("actions:reorder", handleReorderAction);