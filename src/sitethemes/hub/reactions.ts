import hub from "./hub";
import { palletteFromJson } from "../data/themeUtils";

let handleThemeColorUpdate = function(newThemeValue) {
    hub.state.theme.set({ [newThemeValue.themeKey]: newThemeValue.themeValue }).now();
    hub.cacheState();  
}

let handleThemeNameUpdate = function(name) {
    name.trim();
    hub.state.set({ name }).now();
    hub.cacheState();  
}

const handleJSONUpdate = function(json) {
    if (json) {
        hub.state.set({ json }).now();
        let theme = palletteFromJson(json);
        //console.log("Pallette Form JSON: ", theme);
        if (theme) {
            hub.state.set({ theme });
            hub.cacheState();
        }
    }
}

hub.on("json:update", handleJSONUpdate);
hub.on("theme:colorUpdate", handleThemeColorUpdate);
hub.on("theme:nameUpdate", handleThemeNameUpdate);