import { ActionDefinition, SiteScriptAction, JsonSchema } from "./interfaces";
import { validateActions } from "./validation";
import actionDefinitions from "./schemaParser";

export const  generateActionId = function(actionDefinition:ActionDefinition|SiteScriptAction, existingActions:SiteScriptAction[]) {
    let existingActionsWithSameVerb = existingActions.filter(a => a.verb === actionDefinition.verb);
    return `${actionDefinition.verb}:${Date.now()}`
}
export function createActionFromDefinition (actionDefinition:ActionDefinition) {
    let newAction = JSON.parse(JSON.stringify(actionDefinition)) as SiteScriptAction
    newAction.id = generateActionId(actionDefinition, hub.state.actions);
    return newAction;
}

export function actionsFromJson(input: string|JsonSchema) : SiteScriptAction[] {
    try {
        if (typeof input === "string") {
            input = JSON.parse(input) as JsonSchema;
        }
        return input.actions.map(_actionFromJson);
    } catch(err) {
        console.log("actionsFromJson", err);
        throw new Error("Unable to parse SiteScript JSON")
    }
}

// WARNING: Not immutable! 
function _copyProperties(rawAction:any, action:SiteScriptAction) {
    Object.keys(rawAction).forEach(key => {
        let targetProperty = action.properties.find(p => p.id === key);
        if (targetProperty) {
            targetProperty.value = rawAction[key]
        }
    })
}
function _actionFromJson(rawAction:any) : SiteScriptAction {
    let definition = actionDefinitions.find(a => a.verb === rawAction.verb);
    if (!definition) return null;
    
    var action = createActionFromDefinition(definition);
    _copyProperties(rawAction, action);
    if (rawAction.subactions) {
        rawAction.subactions.forEach(rawSubaction => {
            let targetSubAction = action.subactions.find(a => a.verb === rawSubaction.verb);
            if (targetSubAction) {
                _copyProperties(rawSubaction, targetSubAction);
            }
        })
    }
    return action;
}

export const actionsToJson = function(actions:SiteScriptAction[]) : any {
    let validation = validateActions(actions);
    if (!validation.isValid) {
        console.log("Invalid Actions", validation.messages);
        throw new Error("The Actions are not valid: " + validation.messages.join(", "));
    }
    let json = {
        "$schema": "schema.json",
        "actions": actions.map(_actionToJson)
    }
    return json;
}

const _actionToJson = function(action:SiteScriptAction) : any {
    let jsonAction : any = action.properties.reduce((obj, property) => {
        if (property.value !== undefined) {
            obj[property.id] = property.value;
        } 
        return obj;
    }, { verb: action.verb })

    if (action.subactions) {
        jsonAction.subactions = action.subactions.map(_actionToJson);
    }
    return jsonAction;
}

