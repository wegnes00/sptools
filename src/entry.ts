import * as React from "react";
import * as ReactDOM from "react-dom";
import hub from "./sitescripts/hub/hub";
import SiteScriptApp from "./sitescripts/SiteScriptApp";

(<any>window).hub = hub;
ReactDOM.render(React.createElement(SiteScriptApp), document.getElementById("root"));