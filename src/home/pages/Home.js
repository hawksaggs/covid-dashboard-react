import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Box from "../components/Box";
import DataTable from "../components/DataTable";
import VaccineTable from "../components/VaccineTable";

import './Home.css';

const Home = (props) => {
    const [totalCases, setTotalCases] = useState('');
    const [totalTodayCases, setTotalTodayCases] = useState('');
    const [totalDeaths, setTotalDeaths] = useState('');
    const [totalTodayDeaths, setTotalTodayDeaths] = useState('');
    const [totalRecovered, setTotalRecovered] = useState('');
    const [totalTodayRecovered, setTotalTodayRecovered] = useState('');
    const [totalActiveCase, setTotalActiveCase] = useState('');
    const [countryActive, setCountryActive] = useState('');
    const [countryRecovered, setCountryRecovered] = useState('');
    const [countryDeaths, setCountryDeaths] = useState('');
    const [countryCases, setCountryCases] = useState('');
    const [countryTodayActiveCases, setCountryTodayActiveCases] = useState('');
    const [countryTodayRecovered, setCountryTodayRecovered] = useState('');
    const [countryTodayDeaths, setCountryTodayDeaths] = useState('');
    const [countryTodayCases, setCountryTodayCases] = useState('');
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [value, setValue] = useState('India');
    const [allCountriesCase, setAllCountriesCase] = useState([]);

    const getCaseWorldWide = async () => {
        const caseWorldWide = await fetch('https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=true')
            .then(response => response.json());
        setTotalCases(caseWorldWide.cases);
        setTotalTodayCases(caseWorldWide.todayCases);
        setTotalDeaths(caseWorldWide.deaths);
        setTotalTodayDeaths(caseWorldWide.todayDeaths);
        setTotalRecovered(caseWorldWide.recovered);
        setTotalTodayRecovered(caseWorldWide.todayRecovered);
        setTotalActiveCase(caseWorldWide.active);
    };

    const getCaseIndia = async () => {
        const caseIndia = await fetch('https://disease.sh/v3/covid-19/gov/india')
            .then(response => response.json());
        setCountryActive(caseIndia.total.active);
        setCountryRecovered(caseIndia.total.recovered);
        setCountryDeaths(caseIndia.total.deaths);
        setCountryCases(caseIndia.total.cases);
        setCountryTodayActiveCases(caseIndia.total.todayActive);
        setCountryTodayRecovered(caseIndia.total.todayRecovered);
        setCountryTodayDeaths(caseIndia.total.todayDeaths);
        setCountryTodayCases(caseIndia.total.todayCases);
        setStates(caseIndia.states);
    };

    // const countryList = async () => {
    //     const response = await fetch('https://restcountries.eu/rest/v2/all')
    //         .then(response => response.json());
    //     console.log('CountryList: ', response);
    //     setCountries(response);
    // }

    const getAllCountriesCases = async () => {
        const response = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=true&allowNull=false')
            .then(response => response.json());
        const countryList = response.map((item) => {
            return item.country;
        });
        setCountries(countryList);
        setAllCountriesCase(response);
    }


    useEffect(() => {
        getCaseWorldWide();
        getCaseIndia();
        // countryList();
        getAllCountriesCases();
    }, []);

    return (
        <div className={"row"}>
            <div className={"row"}>
                <div className="shadow-lg p-3 mb-3 mt-3 bg-white rounded">
                    <div className={"center box-text m-0"}>
                        <strong>Total Cases WorldWide</strong>
                    </div>
                    <div className={"row"}>
                        <Box type={"Total"} count={totalCases} today={totalTodayCases} class={"yellow"}/>
                        <Box type={"Active"} count={totalActiveCase} today={totalTodayCases - totalTodayRecovered} class={"blue"}/>
                        <Box type={"Recovered"} count={totalRecovered} today={totalTodayRecovered} class={"green"}/>
                        <Box type={"Deaths"} count={totalDeaths} today={totalTodayDeaths} class={"red"}/>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className="shadow-lg p-3 mb-3 bg-white rounded">
                    <div className={"center box-text m-0"}>
                        <strong>Total Cases {value}</strong>
                        <div>
                        <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    console.log(newValue);
                                    setValue(newValue);
                                    const country = allCountriesCase.find(item => item.country === newValue);
                                    console.log(country);
                                    if (country) {
                                        setCountryCases(country.cases);
                                        setCountryTodayCases(country.todayCases);
                                        setCountryActive(country.active);
                                        setCountryTodayActiveCases(country.todayCases - country.todayRecovered);
                                        setCountryRecovered(country.recovered);
                                        setCountryTodayRecovered(country.todayRecovered);
                                        setCountryDeaths(country.deaths);
                                        setCountryTodayDeaths(country.todayDeaths);
                                    }
                                }}
                                id="combo-box-demo1"
                                options={countries}
                                getOptionLabel={(option) => option}
                                getOptionSelected={(option, value) => option === value}
                                // style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Countries" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className={"row"}>
                        <Box type={"Total"} count={countryCases} today={countryTodayCases} class={"yellow"}/>
                        <Box type={"Active"} count={countryActive} today={countryTodayActiveCases} class={"blue"}/>
                        <Box type={"Recovered"} count={countryRecovered} today={countryTodayRecovered} class={"green"}/>
                        <Box type={"Deaths"} count={countryDeaths} today={countryTodayDeaths} class={"red"}/>
                    </div>
                </div>
            </div>

            {/*<TableComponent states={states}/>*/}
            {/*<div className={"row shadow-lg bg-white"}>*/}
                <DataTable data={states} />
            {/*</div>*/}
            {/*<div className={"shadow-lg bg-white mt-3"}>*/}
                <VaccineTable />
            {/*</div>*/}
        </div>
    );
};

export default Home;