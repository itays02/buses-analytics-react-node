import React from 'react';
import ExpectedTimes from '../ExpectedTimes/ExpectedTimes';
import DriverTimes from "../DriverTimes/DriverTimes";
import {getExpectedTimes} from "../../utils/DataFetcher";

import './App.css';

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            drivingTimes: []
        }
    }

    componentDidMount() {
        getExpectedTimes().then(response => {
            if(response && response.data){
                this.setState({
                    drivingTimes: response && response.data,
                });
            }
        })
    }

    render() {
        return (
            <div>
                <ExpectedTimes drivingTimes={this.state.drivingTimes} />
                <DriverTimes drivingTimes={this.state.drivingTimes} />

            </div>
        );
    }
}

export default App;
