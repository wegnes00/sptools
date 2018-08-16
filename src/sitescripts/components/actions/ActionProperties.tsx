import * as React from 'react';
import { SiteScriptAction } from '../../data/interfaces';
import "./ActionProperties.scss";

export default class ActionProperties extends React.PureComponent<ActionPropertiesProps, {}> {
    parseProperties = () : { label:string, value:any }[] => {
        return this.props.action.properties.map(property => {
            if (!property.isRequired && !property.value) return null;
            return {
                label: property.id,
                value: (property.isRequired && !property.value)
                    ? "REQUIRED"
                    : property.value
            }
        }).filter(p => p);
    }
    render() {
        return (
            <div className='action-properties'>
                {this.parseProperties().map(keyvalue => (
                    <div key={keyvalue.label}><span>{keyvalue.label}:{keyvalue.value}</span></div>
                ))}
            </div>
        );
    }
}

export interface ActionPropertiesProps {
    action:SiteScriptAction
}