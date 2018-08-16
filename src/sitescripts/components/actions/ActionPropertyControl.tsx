import * as React from 'react';
import { ActionProperty, SiteScriptAction } from '../../data/interfaces';
import hub from '../../hub/hub';
import "./ActionPropertyControl.scss";
export default class ActionPropertyControl extends React.PureComponent<ActionPropertyControlProps, {}> {
    onChange = (e) => {
        hub.trigger("actions:updateProperty", this.props.parentActionId, this.props.property.id, e.currentTarget.value || "");
    }
    render() {
        let property = this.props.property;
        return (
            <div className='property-control'>
                <label>{property.title}</label>
                <br />
                <input value={property.value} onChange={this.onChange} />
                <br/>
                <label>Type:{property.type} - {property.description}</label>

            </div>
        );
    }
}

export interface ActionPropertyControlProps {
    property: ActionProperty,
    parentActionId: string,
}