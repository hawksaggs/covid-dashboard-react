import React, { useState } from "react";
import MaterialTable, { MTableToolbar } from 'material-table';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const DataTable = (props) => {
    const [value, setValue] = useState('');

    return (
        <MaterialTable
            title="Covid-19 Cases"
            columns={[
                {
                    title: 'State',
                    field: 'state',
                    cellStyle: {
                        backgroundColor: '#039be5',
                        color: '#FFF'
                    }
                },
                {
                    title: 'Cases',
                    field: 'cases'
                },
                {
                    title: 'Active',
                    field: 'active',
                    defaultSort: 'desc'
                },
                {
                    title: 'Recovered',
                    field: 'recovered'
                },
                {
                    title: 'Deaths',
                    field: 'deaths',
                },
                {
                    title: 'TodayCases',
                    field: 'todayCases'
                }, {
                    title: 'TodayActive',
                    field: 'todayActive'
                },
                {
                    title: 'TodayRecovered',
                    field: 'todayRecovered'
                }, {
                    title: 'TodayDeaths',
                    field: 'todayDeaths'
                },
            ]}
            data={props.data}
            style={{ width: "100%" }}
            options={{
                sorting: true,
                exportButton: true
            }}
            components={{
                Toolbar: props => (
                    <div>
                        <MTableToolbar {...props} />
                    </div>
                )
            }}
        />
    );
};

export default DataTable;