import { ActionDefinition, SiteScriptAction } from "./interfaces";

export const  getActionId = function(actionDefinition:ActionDefinition, existingActions:SiteScriptAction[]) {
    let existingActionsWithSameVerb = existingActions.filter(a => a.verb === actionDefinition.verb);
    return `${actionDefinition.verb}(${existingActionsWithSameVerb.length + 1})`
}