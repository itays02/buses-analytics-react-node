import React from 'react';
import './expectedTimes.css';

class ExpectedTimes extends React.Component {
    render() {

        const {drivingTimes} = this.props;
        let timesTable = [];

        if (drivingTimes && drivingTimes.length > 0) {
            timesTable[0] = ['Interval',
                ...(Object.keys(drivingTimes[0]).filter(section => section !== 'start' && section !== 'end'))];

            for (let i = 0; i < drivingTimes.length; i++) {
                timesTable[i + 1] = [drivingTimes[i]['start'] + '-' + drivingTimes[i]['end'], ...Object.values(drivingTimes[i])];
            }
        }
        return timesTable.length > 0 ? (
            <div>
                <label>The expected times by section: </label>
                <table className="expectedTable">
                    <tbody>
                    <tr>
                        {timesTable[0].map(title =>
                            <th key={title}>{title}</th>)
                        }
                    </tr>
                    {
                        timesTable.map((interval, index) => index > 0 ?
                            (<tr key={index}>
                                {
                                    interval.map((driveTime, index) => index === 0 || index > 2 ?
                                        (<td key={index}>{driveTime}</td>) :
                                        React.Fragment
                                    )
                                }
                            </tr>) : React.Fragment)
                    }
                    </tbody>
                </table>
            </div>
        ) : React.Fragment;
    }
}

export default ExpectedTimes;