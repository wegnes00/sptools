import { Theme, Pallette } from "../data/interfaces";
import { FreezerObject } from "./hub";
import themeJson from "./themeJson";

export interface ApplicationState extends FreezerObject{
    pallette: Pallette,
    json: string
}

let defaultState: ApplicationState = {
    pallette:{
        name: "Skyline Spark",
        theme: {
            primary: "#E6003E",
            secondary: "#E6003E",
            tertiary: "#4B848E",
            accent: "#719D64"
        },
    },
    json: themeJson
}
export default defaultState;