import * as React from 'react';

import hub from "./hub/hub";
import Workspace from './components/Workspace';
import { RouterView } from "../sptoolsApp/interfaces";

(window as any).hub = hub;

export default class SiteScriptsApp extends React.PureComponent<SiteScriptAppProps, {}> {
    componentDidMount() {
        hub.on("update", () => this.forceUpdate());
    }
    render() {
        return (
            <Workspace {...hub.state} />
        );
    }
}

export interface SiteScriptAppProps extends RouterView {
    //props
}