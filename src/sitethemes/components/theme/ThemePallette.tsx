import * as React from 'react';
import { Theme } from '../../data/interfaces';
import ThemeColor from './ThemeColor';
import ThemeName from './ThemeName';

export default class ThemePallette extends React.PureComponent<ThemePalletteProps, {}> {  
    render() {
        let themeProps = Object.keys(this.props.theme);
        return (
            <div className='theme-pallette'>
                <ThemeName name={ this.props.name } />
                { themeProps.map(t => <ThemeColor value={ this.props.theme[t] } label={ t.toString() } />) }
            </div>
        );
    } 
}

export interface ThemePalletteProps {
    name: string,
    theme: Theme,
}