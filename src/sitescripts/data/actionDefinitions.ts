import rawSchema from "./schema.20180805";
import { ActionDefinition, ActionDefinitionProperty } from "./interfaces";

function parseSchema() : ActionDefinition[] {
    // Parse the list of available 'root' actions
    return rawSchema.properties.actions.items.anyOf.map(i => i.$ref)
        // Turn $refs into action names
        .map(ref => ref.substr(ref.lastIndexOf("/") + 1))
        // Get the rawAction from the schema then parse it
        .map(actionName => parseAction(rawSchema.definitions[actionName]));
}

function parseAction(rawAction:any) : ActionDefinition {
    let actionDef : ActionDefinition = {
        verb: rawAction.properties.verb.enum[0],
        title: rawAction.title,
        type: rawAction.type,
        description: rawAction.description,
        properties: parseProperties(rawAction),
        subactions: parseSubactions(rawAction),
    }   
    return actionDef;
}

function parseSubactions(rawAction:any) : ActionDefinition[] {
    if (!rawAction.properties || !rawAction.properties.subactions) return null;
    return rawAction.properties.subactions.items.anyOf
        .map(i => i.$ref)
        .map(ref => {
            let parts = ref.split("/");
            let subActionKey = parts[parts.length - 1];
            let subActionParent = parts[parts.length - 2]
            let rawSubaction = rawSchema.definitions[subActionParent][subActionKey];
            return rawSubaction ? parseAction(rawSubaction) : null;
        })
        .filter(a => a);
}
function parseProperties(rawAction: any) : ActionDefinitionProperty[] {
    if (!rawAction.properties) return [];
    return Object.keys(rawAction.properties).map(key => {
        if (key === "verb") return null;
        let rawProp = rawAction.properties[key];
        console.log(rawAction.required, key)
        return {
            id: key,
            title: rawProp.title,
            description: rawProp.description,
            type: rawProp.type,
            isRequired: rawAction.required.indexOf(key) >= 0
        } as ActionDefinitionProperty
    }).filter(p => p);
}

const actionDefinitions = parseSchema();
export default actionDefinitions;