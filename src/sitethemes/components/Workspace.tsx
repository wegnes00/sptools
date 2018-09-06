import * as React from 'react';
import { Pallette } from '../data/interfaces';
import AdvancedEditor from './code/AdvancedEditor';
import Header from './WorkspaceHeader';
require("./Workspace.scss");

export default class Workspace extends React.PureComponent<WorkspaceProps, {}> {
    render() {
        return (
            <div className='workspace'>
                <Header pallette={ this.props.pallette } />
                <AdvancedEditor json={ this.props.json } />
            </div>
        );
    } 
}

export interface WorkspaceProps {
    pallette: Pallette,
    json: string,
}