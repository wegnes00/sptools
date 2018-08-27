import hub from "./hub";

const handleJSONUpdate = function(json) {
    if (json) {
        hub.state.set({ json }).now();
        hub.cacheState();
    }
} 
const handleUpdateProperty = function(propertyId, value) {
    console.log("Handle Update Property", propertyId, value);
}

hub.on('actions:updateProperty', handleUpdateProperty);
hub.on("json:update", handleJSONUpdate);