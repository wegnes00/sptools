import { Theme } from "../data/interfaces";
import { FreezerObject } from "./hub";
import themeJson from "./themeJson";

export interface ApplicationState extends FreezerObject{
    theme?: Theme,
    json: string
}

let defaultState: ApplicationState = {
    json: themeJson
}
export default defaultState;