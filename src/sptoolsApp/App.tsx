import * as React from 'react';
import TabbedNav from "./TabbedNav/TabbedNav";
import Tab from './TabbedNav/Tab';
import { Router, Location } from '@reach/router';
import SiteScriptsView from '../sitescripts/SiteScriptApp';
import SiteThemeView from '../sitethemes/SiteThemeApp';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Location>
                    {({location}) => (
                        <TabbedNav>
                            <Tab path="/sitescripts" icon="" activePath={location.pathname} />
                            <Tab path="/sitethemes" icon="" activePath={location.pathname}/>
                        </TabbedNav>
                    )}
                </Location>
                <div className='content'>
                    <Router>
                        <SiteScriptsView path="/sitescripts" default />
                        <SiteThemeView path="/sitethemes" />
                    </Router>
                </div>
            </div>
        );
    }
}