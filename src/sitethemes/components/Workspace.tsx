import * as React from 'react';
import { Theme } from '../data/interfaces';
import hub from '../hub/hub';
import AdvancedEditor from './code/AdvancedEditor';
import ThemePallette from './theme/ThemePallette';

export default class Workspace extends React.PureComponent<WorkspaceProps, {}> {
    render() {
        return (
            <div className='workspace'>
                <ThemePallette name={ this.props.name } theme={ this.props.theme } />
                <AdvancedEditor json={ this.props.json } />
            </div>
        );
    } 
}

export interface WorkspaceProps {
    name: string,
    theme: Theme,
    json: string,
}