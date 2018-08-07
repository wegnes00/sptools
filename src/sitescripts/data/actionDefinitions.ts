import rawSchema from "./schema.20180805";
import { ActionDefinition, ActionDefinitionProperty } from "./interfaces";

const ACTION_NAMES = [ 
    "createSiteColumn",
    "applyTheme",
    "setSiteLogo",
    "joinHubSite",
];

function parseSchema(actionNames:string[]) : ActionDefinition[] {
    return actionNames.map(parseAction);
}

function parseAction(name:string) : ActionDefinition {
    let rawAction = rawSchema.definitions[name];
    let actionDef : ActionDefinition = {
        id: rawAction.properties.verb.enum[0],
        title: rawAction.title,
        type: rawAction.type,
        description: rawAction.description,
        properties: parseProperties(rawAction),
        subactions: null,
    }   
    return actionDef;
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

const actionDefinitions = parseSchema(ACTION_NAMES);
export default actionDefinitions;