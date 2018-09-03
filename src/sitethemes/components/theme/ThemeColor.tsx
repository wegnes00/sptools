import * as React from 'react';
import ColorPicker from '../../../components/color_picker/ColorPicker';
import hub from '../../hub/hub';

export default class ThemeColor extends React.PureComponent<ThemeColorProps, {}> {
    onChange = (newValue) => {
        let newThemeValue = {
            themeKey: this.props.label,
            themeValue: newValue
        }
        hub.trigger("theme:colorUpdate", newThemeValue);
    }
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <ColorPicker value={this.props.value} onChange={this.onChange} />
            </div>
        );
    } 
}

export interface ThemeColorProps {
    value: string,
    label: string,
}