import { ActionDefinition } from "../data/interfaces";
import actionDefinitions from "../data/actionDefinitions";

export interface ApplicationState {
    actionDefinitions: ActionDefinition[]
}

let defaultState: ApplicationState = {
    actionDefinitions: actionDefinitions
}
export default defaultState;