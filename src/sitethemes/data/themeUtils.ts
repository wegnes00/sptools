import { JsonSchema, Theme } from './interfaces';

export function palletteFromJson(input: string|JsonSchema) : Theme {
    try {
        console.log(input);
        if (!validateJSON(input)) return null;
        if (typeof input === "string") {
            input = JSON.parse(input) as JsonSchema;
        }
        if (!input.name || !input.theme) return null;
        // console.log(input.theme);
        return _palletteFromJson(input.theme);
    } catch(err) {
        // console.log("palletteFromJson", err);
        throw new Error("Unable to parse Site Theme JSON")
    }
}

function _palletteFromJson(rawTheme:any) : Theme {
    return {
        primary: rawTheme.themePrimary,
        secondary: rawTheme.themeSecondary,
        tertiary: rawTheme.themeTertiary,
        accent: rawTheme.accent,
    }
}

export const validateJSON = function(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    } catch(err) {
        return false
    }
}

// export const actionsToJson = function(actions:SiteScriptAction[]) : string {
//     let validation = validateActions(actions);
//     if (!validation.isValid) {
//         console.log("Invalid Actions", validation.messages);
//         throw new Error("The Actions are not valid: " + validation.messages.join(", "));
//     }
//     let json = {
//         "$schema": "schema.json",
//         "actions": actions.map(_actionToJson).filter(a => a)
//     }
//     return JSON.stringify(json, null, "\t");
// }

// const _actionToJson = function(action:SiteScriptAction) : any {
//     let jsonAction : any = action.properties.reduce((obj, property) => {
//         if (property.value !== undefined) {
//             obj[property.id] = property.value;
//             if (property.type === "boolean") {
//                 console.log("bool", property.value);
//                 obj[property.id] = property.value ? true : false
//             }
//             else if (property.type === "number") {
//                 try {
//                     obj[property.id] = parseInt(property.value, 10);
//                 } catch (err) {}
//             }
//             else if (property.type === "object") {
//                 try {
//                     console.log(property.value)
//                     obj[property.id] = JSON.parse(property.value);
//                 } catch(err) {
//                     obj[property.id] = { "ERROR": "Invalid JSON object" }
//                 }
//             } 
//         } 
//         return obj;
//     }, { verb: action.verb })

//     if (action.subactions) {
//         jsonAction.subactions = action.subactions.map(_actionToJson).filter(a => a);
//     }
//     return Object.keys(jsonAction).length > 1 ? jsonAction : null;
// }