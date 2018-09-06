
export interface Theme {
    primary: string,
    secondary: string,
    tertiary: string,
    accent: string
}

export interface Pallette {
    name:string,
    theme: Theme, 
}

export interface JsonSchema {
    name:string,
    isInverted: boolean,
    theme: string,
}