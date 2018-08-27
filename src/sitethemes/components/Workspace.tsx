import * as React from 'react';
import { Theme } from '../data/interfaces';
import hub from '../hub/hub';
import AdvancedEditor from './code/AdvancedEditor';

export default class Workspace extends React.PureComponent<WorkspaceProps, {}> {
    render() {
        return (
            <div className='workspace'>
                <AdvancedEditor json={this.props.json} />
            </div>
        );
    } 
}

export interface WorkspaceProps {
    theme?: Theme,
    json: string,
}