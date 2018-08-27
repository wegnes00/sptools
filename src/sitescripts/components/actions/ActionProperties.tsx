import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import "./ActionProperties.scss";
import ActionPropertyControl from './ActionPropertyControl';

export default class ActionProperties extends React.PureComponent<ActionPropertiesProps, {}> {
    render() {
        let { action } = this.props;
        return (
            <div className='action-properties'>
                {action.properties.filter(p => p.isRequired).map(p => (
                    <ActionPropertyControl key={p.id} parentActionId={this.props.action.id} property={p} />
                ))}
                {action.properties.filter(p => !p.isRequired).map(p => (
                    <ActionPropertyControl key={p.id} parentActionId={this.props.action.id} property={p} />
                ))}
            </div>
        );
    }
}

export interface ActionPropertiesProps {
    action:SiteScriptAction
}