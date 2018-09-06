import hub from "./hub";
import { downloadFile, getDateString } from "../../utils/utils";
import { palletteFromJson, palletteToJson } from "../data/themeUtils";
import { JsonSchema } from "../../sitescripts/data/interfaces";

let handleThemeColorUpdate = function(newThemeValue) {
    hub.state.pallette.theme.set({ [newThemeValue.themeKey]: newThemeValue.themeValue }).now();
    let json = palletteToJson(hub.state.pallette, hub.state.json);
    hub.state.set({ json });
    hub.cacheState();  
}

let handleThemeNameUpdate = function(name) {
    hub.state.pallette.set({ name }).now();
    let json = palletteToJson(hub.state.pallette, hub.state.json);
    hub.state.set({ json });
    hub.cacheState();  
}

let handleJSONUpdate = function(json) {
    if (json) {
        hub.state.set({ json }).now();
        let themeJson = palletteFromJson(json);
        if (themeJson) {
            hub.state.pallette.set({ name: themeJson.name, theme: themeJson.theme });
            hub.cacheState();
        }
    }
}

let handleJSONDownload = function(type) {
	if (type === "json") {
		downloadFile(`${hub.state.pallette.name}_${getDateString()}.json`, hub.state.json);
	}
}

hub.on("json:update", handleJSONUpdate);
hub.on("json:download", handleJSONDownload);
hub.on("theme:colorUpdate", handleThemeColorUpdate);
hub.on("theme:nameUpdate", handleThemeNameUpdate);