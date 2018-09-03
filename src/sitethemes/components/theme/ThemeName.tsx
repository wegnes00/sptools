import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import hub from '../../hub/hub';

export default class ThemeName extends React.PureComponent<ThemeNameProps, {}> {
    onChange = (newValue) => {
        hub.trigger("theme:nameUpdate", newValue);
    }
    render() {
        return (
            <div className="theme-name">
                <label>Name</label>
                <TextField value={ this.props.name } onChanged={ this.onChange } />
            </div>
        );
    } 
}

export interface ThemeNameProps {
    name: string
}