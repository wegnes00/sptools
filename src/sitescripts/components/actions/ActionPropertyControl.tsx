import * as React from 'react';
import { ActionProperty, SiteScriptAction } from '../../data/interfaces';
import hub from '../../hub/hub';
import "./ActionPropertyControl.scss";
export default class ActionPropertyControl extends React.PureComponent<ActionPropertyControlProps, {}> {
    onChange = (e) => {
        let value = e.currentTarget.value;
        if (this.props.property.type === "boolean") value = e.currentTarget.checked;
        hub.trigger("actions:updateProperty", this.props.parentActionId, this.props.property.id, value || "");
    }
    renderInput = () => {
        let property = this.props.property;
        if (property.type === "choice") {
            return(
                <select onChange={this.onChange} value={property.value}>
                    {property.choices.map(choice => <option key={choice}>{choice}</option>)}
                </select>
            )
        } else if (property.type === "boolean") {
            return <input type="checkbox" checked={property.value} onChange={this.onChange} />
        }
        else {
            return <input value={property.value} onChange={this.onChange} />
        }
    }
    render() {
        let property = this.props.property;
        return (
            <div className='property-control'>
                <label>{property.title}</label>
                <br />
                {this.renderInput()}
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