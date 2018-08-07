import * as React from 'react';
require("./SiteScriptApp.scss");

import hub from "./hub/hub";
export default class SiteScriptsApp extends React.PureComponent<SiteScriptAppProps, {}> {
    render() {
        return (
            <div>SiteScriptsApp !
                <pre>
                    {JSON.stringify(hub.state.actionDefinitions, null, 2)}
                </pre>
            </div>
        );
    }
}

export interface SiteScriptAppProps {
    //props
}