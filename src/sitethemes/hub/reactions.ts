import hub from "./hub";

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
        hub.cacheState();
    }
}

hub.on("json:update", handleJSONUpdate);
hub.on("theme:colorUpdate", handleThemeColorUpdate);
hub.on("theme:nameUpdate", handleThemeNameUpdate);