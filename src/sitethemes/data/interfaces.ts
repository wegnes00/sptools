
export interface Theme {
    name: string,
    primary: string,
    secondary: string,
    tertiary: string,
    accent: string,
    advanced: JsonSchema
}

export interface JsonSchema {
    $schema:string,
}