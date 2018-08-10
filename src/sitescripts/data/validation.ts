import { SiteScriptAction, ActionProperty } from "./interfaces";

export function validateActions(actions:SiteScriptAction[]) : { isValid:boolean, messages: string[] } {
    let messages = _validateActions(actions);
    return {
        messages,
        isValid: (messages.length === 0)
    }
}


const _validateActions = function(actions:SiteScriptAction[]) : string[] {
    return actions.reduce((messages, action) => {
        return messages = [ ...messages, ..._validateAction(action)]
    }, [])
}

const _validateAction = function(action:SiteScriptAction) : string[] {
    let messages = action.properties.map(p => _validateProperty(p, action));

    return messages.filter(m => m);
}

const _validateProperty = function(property:ActionProperty, action:SiteScriptAction) : string {
    if (property.isRequired && !property.value) {
        return `${action.verb}.${property.id} is required`
    }
    return "";
}