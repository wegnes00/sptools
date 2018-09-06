import * as React from 'react';
import { Pallette } from '../data/interfaces';
import ThemePallette from './theme/ThemePallette';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import hub from '../hub/hub';
require("./Workspace.scss");

export default class WorkspaceHeader extends React.PureComponent<WorkspaceHeaderProps, {}> {
    downloadJson = (e) => {
        hub.trigger("json:download", "json");
    }
    render() {
        return (
            <div className='workspace-header'>
                <ThemePallette name={ this.props.pallette.name } theme={ this.props.pallette.theme } />
                <ActionButton onClick={ this.downloadJson } iconProps={{ iconName: 'Download'}}>Download Theme</ActionButton>
            </div>
        );
    } 
}

export interface WorkspaceHeaderProps {
    pallette: Pallette
}