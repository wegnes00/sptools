import rawSchema from "./schema.20180805";
import { ActionDefinition, ActionDefinitionProperty } from "./interfaces";

function parseSchema() : ActionDefinition[] {
    // Parse the list of available 'root' actions
    return rawSchema.properties.actions.items.anyOf.map(i => i.$ref)
        // Turn $refs into action names
        .map(ref => ref.substr(ref.lastIndexOf("/") + 1))
        // Get the rawAction from the schema then parse it
        .map(actionName => parseAction(rawSchema.definitions[actionName]))
        // Sort by title
        .sort((a,b) => (
            a.title === b.title
                ? 0
                : a.title < b.title
                    ? -1
                    : 1
        ))
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
        if (key === "verb" || key === "subactions") return null;
        let rawProp = rawAction.properties[key];
        let prop : ActionDefinitionProperty= {
            id: key,
            title: rawProp.title,
            description: rawProp.description,
            type: rawProp.type,
            isRequired: rawAction.required.indexOf(key) >= 0,
        }
        // if the rawProp has an 'enum' prop, it's a choice
        if (rawProp.enum) {
            prop.choices = rawProp.enum;
            prop.type = "choice";
        }
        return prop;
    }).filter(p => p);
}

const actionDefinitions = parseSchema();
export default actionDefinitions;