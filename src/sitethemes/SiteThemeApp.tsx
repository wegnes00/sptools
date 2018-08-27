import * as React from 'react';
import Workspace from "./components/Workspace";
import hub from "./hub/hub";
import { RouterView } from "../sptoolsApp/interfaces";

(window as any).hub = hub;

export default class SiteThemeApp extends React.PureComponent<SiteThemeAppProps, {}> {
    componentDidMount() {
        hub.on("update", () => this.forceUpdate());
    }
    render() {
        return (
            <Workspace {...hub.state} />
        );
    }
}

export interface SiteThemeAppProps extends RouterView {
    //props
}