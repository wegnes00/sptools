import { JsonSchema, Theme, Pallette } from './interfaces';

export function palletteFromJson(input: string|JsonSchema) : Pallette {
    try {
        console.log(input);
        if (!validateJSON(input)) return null;
        if (typeof input === "string") {
            input = JSON.parse(input) as JsonSchema;
        }
        if (!input.name || !input.theme) return null;
        return {
            name: input.name,
            theme: _palletteFromJson(input.theme)
        };
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

export function palletteToJson(input: Pallette, json: string|JsonSchema) : string {
    try {
        console.log(input);
        if (typeof json === "string") {
            json = JSON.parse(json) as JsonSchema;
        }
        if (!json.name || !json.theme) return null;
        json.name = input.name;
        json.theme = { ...json.theme as any, ..._palletteToJson(input.theme) }
        return JSON.stringify(json, null, "\t");
    } catch(err) {
        // console.log("palletteFromJson", err);
        throw new Error("Unable to parse pallette to JSON.")
    }
}

function _palletteToJson(palletteTheme:Theme) : any {
    return {
        themePrimary: palletteTheme.primary,
        themeSecondary: palletteTheme.secondary,
        themeTertiary: palletteTheme.tertiary,
        accent: palletteTheme.accent,
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