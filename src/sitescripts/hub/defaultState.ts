import { ActionDefinition, SiteScriptAction } from "../data/interfaces";
import actionDefinitions from "../data/schemaParser";
import { FreezerObject } from "./hub";

export interface ApplicationState extends FreezerObject{
    actionDefinitions: ActionDefinition[],
    actions: SiteScriptAction[],
}

let defaultState: ApplicationState = {
    actionDefinitions: actionDefinitions,
    actions:[]
}
export default defaultState;