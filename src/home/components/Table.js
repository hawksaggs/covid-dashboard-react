import React, { useEffect, useState } from 'react';
import {
    Table
} from 'react-bootstrap';

const TableComponent = (props) => {
    const [data, setData] = useState([]);

    const headers = ['State', 'Cases', 'Active', 'Recovered', 'Deaths', 'TodayCases', 'TodayActive', 'TodayRecovered', 'TodayDeaths'];

    const syncData = () => {
        console.log('Table: ', props);
        console.log('Table: ', props.states);
        const stateData = (props.states || []).map((state) => {
            return (
                <tr>
                    <td>{state.state}</td>
                    <td>{state.cases}</td>
                    <td>{state.active}</td>
                    <td>{state.recovered}</td>
                    <td>{state.deaths}</td>
                    <td>{state.todayCases}</td>
                    <td>{state.todayActive}</td>
                    <td>{state.todayRecovered}</td>
                    <td>{state.todayDeaths}</td>
                </tr>
            )
        });
        setData(stateData);
    };
    

    useEffect(() => {
        syncData();
    }, [props]);


    return (
        <Table responsive>
            <thead>
                <tr>
                    {headers.map((key) => <th key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {/* {(props.states || []).map((state, index) => {
                    return (
                        <tr>
                            <td key={index + 1}>{state.state}</td>
                            <td key={index + 2}>{state.cases}</td>
                            <td key={index + 3}>{state.active}</td>
                            <td key={index + 4}>{state.recovered}</td>
                            <td key={index + 5}>{state.deaths}</td>
                            <td key={index + 6}>{state.todayCases}</td>
                            <td key={index + 7}>{state.todayActive}</td>
                            <td key={index + 8}>{state.todayRecovered}</td>
                            <td key={index + 9}>{state.todayDeaths}</td>
                        </tr>
                    )
                })} */}
                {data}
            </tbody>
        </Table>
    )
};

export default TableComponent;