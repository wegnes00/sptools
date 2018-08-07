import * as React from 'react';
require("./SiteScriptApp.scss");

import hub from "./hub/hub";
export default class SiteScriptsApp extends React.PureComponent<SiteScriptAppProps, {}> {
    render() {
        return (
            <div>
                <h1>Coming Soon: A GUI to build SharePoint 
                     <a target='_blank' href='https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-design-json-schema'>
                        Site Script JSON
                    </a>
                </h1>
                <p>
                    
                    <a target='_blank' href='https://react-beautiful-dnd.netlify.com/?selectedKind=complex%20vertical%20list&selectedStory=nested%20vertical%20lists&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel'>
                        Drag and Dropabble Script Actions
                    </a>
                </p>
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