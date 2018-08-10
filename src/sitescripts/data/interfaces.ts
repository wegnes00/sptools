
export interface ActionDefinition {
    verb: string,
    title: string,
    description: string,
    properties: ActionDefinitionProperty[],
    subactions?: ActionDefinition[],
    type: string,
}

export interface ActionDefinitionProperty {
    id: string,
    title: string,
    description: string,
    type: string, //string, object, array, number
    choices?: string[],
    isRequired: boolean,
}

export interface ActionProperty extends ActionDefinitionProperty {
    value?: any
}

export interface SiteScriptAction extends ActionDefinition {
    id: string,
    properties: ActionProperty[],
    subactions?: SiteScriptAction[],
}

export interface JsonSchema {
    $schema:string,
    actions: any[],
}