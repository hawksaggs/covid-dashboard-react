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
                {data}
            </tbody>
        </Table>
    )
};

export default TableComponent;