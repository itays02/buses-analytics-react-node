import React from 'react';
import { groupBy } from 'underscore'
import Histogram from 'react-chart-histogram';
import { getDriversData } from '../../utils/DataFetcher';
import * as Time from "../../utils/Time";

import './driverTimes.css';

class DriverTimes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSection: undefined,
            allSections: [],
            allTravels: [],
            travelsMismatch: {},
            intervals: []
        };
    }

    componentDidMount() {
        getDriversData().then(response => {
            if (response && response.data) {
                this.setState({
                    allTravels: Object.values(groupBy(response.data, 'trip_id'))
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {drivingTimes} = this.props;
        if (drivingTimes.length > 0 && prevProps.drivingTimes.length < drivingTimes.length) {

            const rawSections = Object.keys(drivingTimes[0]).filter(section => section !== 'start' && section !== 'end');
            const allSections = rawSections.map(section => {
                const points = section.trim().split("-");
                return {
                    startPoint: points[0],
                    endPoint: points[1],
                    display: section
                }
            });

            this.setState({
                allSections,
                intervals: drivingTimes.map(interval => {
                    return {
                        start: interval['start'],
                        end: interval['end'],
                        display: interval['start'] + '-' + interval['end']
                    }
                })
            });
        }
    }

    selectSection(section) {
        const {intervals} = this.state;
        const travelsMismatch = {};
        intervals.forEach(interval => {
            travelsMismatch[interval.start + ' - ' + interval.end] = 0;
        });

        this.setState({
            selectedSection: section,
            travelsMismatch
        }, this.compareTravelTimeToExpected);

    }

    compareTravelTimeToExpected() {
        const {allTravels, selectedSection} = this.state;
        const expectedTimes = this.getExpectedTimesOfSection();

        allTravels.forEach(travel => {
            const firstStop = travel.find(stop => stop['stop_id'] === selectedSection.startPoint);
            const secondStop = travel.find(stop => stop['stop_id'] === selectedSection.endPoint);

            if (firstStop && secondStop) {
                const startDate = Time.getStartDate(firstStop['time'], secondStop['time']);
                const endDate = Time.getEndDate(firstStop['time'], secondStop['time']);
                const startTime = Time.getTime(startDate);

                const actualTime = (endDate - startDate) / 60000;
                const expectedTime = expectedTimes.find(interval => interval.start <= startTime && startTime <= interval.end);

                if (expectedTime && Math.abs(actualTime - expectedTime.expected) >= 2) {
                    this.updateMismatchCounter(expectedTime.start, expectedTime.end);
                }
            }
        });
    }

    updateMismatchCounter(startTime, endTime) {
        const {travelsMismatch} = this.state;
        const intervalKey = startTime + " - " + endTime;
        travelsMismatch[intervalKey]++;

        this.setState({
            travelsMismatch,
        });
    }

    getExpectedTimesOfSection() {
        const {selectedSection} = this.state;
        const intervalData = [];
        const {drivingTimes} = this.props;
        let currentInterval;

        for (let i = 0; i < drivingTimes.length; i++) {
            currentInterval = drivingTimes[i];

            if (currentInterval[selectedSection.display]) {
                intervalData.push({
                    start: currentInterval['start'],
                    end: currentInterval['end'],
                    expected: currentInterval[selectedSection.display]
                });
            }
        }
        return intervalData;
    }

    render() {
        const {allSections, selectedSection, travelsMismatch} = this.state;
        const graphOptions = {fillColor: '#FF8000', strokeColor: '#000000'};

        return (
            <div>
                <label>Choose your section: </label>
                <div>
                    {
                        allSections.map(section =>
                            <button key={section.display} onClick={() => this.selectSection(section)}>{section.display}
                            </button>)
                    }
                </div>
                {
                    selectedSection ?
                        (<div>
                            <label>You selected : {selectedSection.display}</label>
                            <div>
                                <Histogram
                                    xLabels={Object.keys(travelsMismatch)}
                                    yValues={Object.values(travelsMismatch)}
                                    width='400'
                                    height='200'
                                    options={graphOptions}
                                />
                            </div>
                        </div>) :
                        (<React.Fragment/>)
                }
            </div>
        );
    }
}

export default DriverTimes;