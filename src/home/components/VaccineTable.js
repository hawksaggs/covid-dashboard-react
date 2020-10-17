import React, { useState, useEffect } from "react";

import DataTable from "../../shared/Components/DataTable";

const VaccineTable = (props) => {
    const [vaccineData, setVaccineData] = useState([]);

    const getVaccineData = async () => {
        const data = await fetch('https://disease.sh/v3/covid-19/vaccine')
            .then((response) => response.json());
        setVaccineData(data.data);
    }

    useEffect(() => {
        getVaccineData();
    }, []);

    return (
        <DataTable
            title={"Covid-19 Vaccines Candidates"}
            columns={[
                {
                    title: 'Candidate',
                    field: 'candidate',
                    cellStyle: {
                        backgroundColor: '#039be5',
                        color: '#FFF'
                    }
                },
                {
                    title: 'Trial Phase',
                    field: 'trialPhase',
                    // defaultSort: 'asc'
                },
                {
                    title: 'Sponsors',
                    field: 'sponsors',

                },
                {
                    title: 'Institutions',
                    field: 'institutions'
                }
            ]}
            data={vaccineData}
            style={{width:"100%", marginTop:"25px", marginLeft: "0px"}}
            options={{
                sorting: true,
                exportButton: true
            }}
        />
    );
};

export default VaccineTable;