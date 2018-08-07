import { ActionDefinition, SiteScriptAction } from "../data/interfaces";
import actionDefinitions from "../data/actionDefinitions";

export interface ApplicationState {
    actionDefinitions: ActionDefinition[],
    actions: SiteScriptAction[],
}

let defaultState: ApplicationState = {
    actionDefinitions: actionDefinitions,
    actions:[]
}
export default defaultState;