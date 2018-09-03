import * as React from 'react';
import styles from "./ColorPicker.module.scss"
import { ColorPicker as FabricColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
require("./ColorPicker.module.scss");

export default class ColorPicker extends React.PureComponent<ColorPickerProps, ColorPickerState> {
    elem: HTMLDivElement
    state = {
        pickerVisible: false
    }
    renderPicker = () => {
        if (!this.state.pickerVisible) return null;
        return (
            <Callout
                gapSpace={ 0 }
                target={ this.elem }
                setInitialFocus={ true }
                directionalHint={ DirectionalHint.topCenter }
                coverTarget={true}
                isBeakVisible={ false }
                onDismiss={() => this.setState({ pickerVisible: false })}
            >   
                <FabricColorPicker 
                    color={ this.getColor() }
                    onColorChanged={this.props.onChange}
                />
            </Callout>
        );
    }
    getColor = () => {
        return this.props.value === null || this.props.value === undefined 
            ? "#225d9f"
            : this.props.value
    }
    openPicker = () => {
        this.setState({ pickerVisible: true })
    }
    render() {
        let cssClass = [
            styles.colorPicker,
            this.props.className
        ].filter(c => c).join(" ");
        return (
            <div ref={el => this.elem = el} className={cssClass}>
                {this.props.label && (<div className="label">{this.props.label}</div>)}
                <div className="inputGrouping">
                    <TextField value={this.getColor()} onChanged={this.props.onChange} />
                    <span className="square" style={{ background: this.getColor()}} onClick={this.openPicker} />
                </div>
                {this.renderPicker()}
            </div>
        );
    }
}

export interface ColorPickerState {
    pickerVisible: boolean
}
export interface ColorPickerProps {
    value: string,
    onChange: (newColor:string) => void
    label?: string,
    className?:string,
}