import { ActionDefinition, SiteScriptAction } from "../data/interfaces";
import actionDefinitions from "../data/schemaParser";
import { FreezerObject } from "./hub";
import { actionsFromJson } from "../data/actionUtils";
import actionsJson from "./actionsJson";

export interface ApplicationState extends FreezerObject{
    actionDefinitions: ActionDefinition[],
    actions: SiteScriptAction[],
    json: string
}

let defaultState: ApplicationState = {
    actionDefinitions: actionDefinitions,
    actions: actionsFromJson(actionsJson),
    json: actionsJson
}
export default defaultState;