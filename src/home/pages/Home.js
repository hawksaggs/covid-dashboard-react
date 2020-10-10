import React, {useEffect, useState} from "react";

import Box from "../components/Box";
import TableComponent from '../components/Table';
import DataTable from "../components/DataTable";

const Home = (props) => {
    const [cases, setCases] = useState('');
    const [todayCases, setTodayCases] = useState('');
    const [deaths, setDeaths] = useState('');
    const [todayDeaths, setTodayDeaths] = useState('');
    const [recovered, setRecovered] = useState('');
    const [todayRecovered, setTodayRecovered] = useState('');
    const [updated, setUpdated] = useState('');
    const [activeCase, setActiveCase] = useState('');
    const [indActive, setIndActive] = useState('');
    const [indRecovered, setIndRecovered] = useState('');
    const [indDeaths, setIndDeaths] = useState('');
    const [indCases, setIndCases] = useState('');
    const [indTodayActiveCases, setIndTodayActiveCases] = useState('');
    const [indTodayRecovered, setIndTodayRecovered] = useState('');
    const [indTodayDeaths, setIndTodayDeaths] = useState('');
    const [indTodayCases, setIndTodayCases] = useState('');
    const [states, setStates] = useState([]);

    const getCaseWorldWide = async () => {
        const caseWorldWide = await fetch('https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=true')
            .then(response => response.json());
        setCases(caseWorldWide.cases);
        setTodayCases(caseWorldWide.todayCases);
        setDeaths(caseWorldWide.deaths);
        setTodayDeaths(caseWorldWide.todayDeaths);
        setRecovered(caseWorldWide.recovered);
        setTodayRecovered(caseWorldWide.todayRecovered);
        setUpdated(caseWorldWide.updated);
        setActiveCase(caseWorldWide.active);
    };

    const getCaseIndia = async () => {
        const caseIndia = await fetch('https://disease.sh/v3/covid-19/gov/india')
            .then(response => response.json());
        setIndActive(caseIndia.total.active);
        setIndRecovered(caseIndia.total.recovered);
        setIndDeaths(caseIndia.total.deaths);
        setIndCases(caseIndia.total.cases);
        setIndTodayActiveCases(caseIndia.total.todayActive);
        setIndTodayRecovered(caseIndia.total.todayRecovered);
        setIndTodayDeaths(caseIndia.total.todayDeaths);
        setIndTodayCases(caseIndia.total.todayCases);
        setStates(caseIndia.states);
    };


    useEffect(() => {
        getCaseWorldWide();
        getCaseIndia();
    }, []);

    return (
        <div className={"row"}>
            <div className={"row"}>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <div className={"row box-text"}>
                        <strong>Total Cases WorldWide</strong>

                    </div>
                    <div className={"row"}>
                        <Box type={"Total"} count={cases} today={todayCases} class={"yellow"}/>
                        <Box type={"Active"} count={activeCase} class={"blue"}/>
                        <Box type={"Recovered"} count={recovered} today={todayRecovered} class={"green"}/>
                        <Box type={"Deaths"} count={deaths} today={todayDeaths} class={"red"}/>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <div className={"row box-text"}>
                        <strong>Total Cases India</strong>

                    </div>
                    <div className={"row"}>
                        <Box type={"Total"} count={indCases} today={indTodayCases} class={"yellow"}/>
                        <Box type={"Active"} count={indActive} today={indTodayActiveCases} class={"blue"}/>
                        <Box type={"Recovered"} count={indRecovered} today={indTodayRecovered} class={"green"}/>
                        <Box type={"Deaths"} count={indDeaths} today={indTodayDeaths} class={"red"}/>
                    </div>
                </div>
            </div>

            {/*<TableComponent states={states}/>*/}
            {/*<div className={"row"}>*/}
                <DataTable data={states}/>
            {/*</div>*/}

        </div>
    );
};

export default Home;