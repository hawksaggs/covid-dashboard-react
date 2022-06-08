import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ReactTooltip from "react-tooltip";

import SplineChart from "../components/SplineChart";
import MapChart from "../components/MapChart";

import './Charts.css';

const Charts = (props) => {
    const [chartData, setChartData] = useState({});
    const [countries, setCountries] = useState(new Map());
    const [countrySelected, setCountrySelected] = useState('India');
    const [historicalData, setHistoricalData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");

    const getHistorialData = async () => {
        const data = await fetch('https://disease.sh/v3/covid-19/historical?lastdays=all')
            .then(response => response.json());
        // console.log('getHistorialData: ', data);
        const countries = data.reduce((prev, curr) => {
            if (prev.has(curr.country) && curr.province) {
                prev.get(curr.country).add(curr.province);
            } else {
                prev.set(curr.country, new Set());
            }
            return prev;
        }, new Map());
        setCountries(countries);
        setHistoricalData(data);
        const country = data.find(item => item.country === countrySelected);
        if (country) {
            setChartData(country);
        }
        // setTimeout(function() {
        //     fetchCountryData();
        // }, 3000);
        
    };

    const fetchCountryData = () => {
        console.log('fetchCountryData: ', historicalData);
        const country = historicalData.find(item => item.country === countrySelected);
        if (country) {
            setChartData(country);
        }
    }

    useEffect(() => {
        getHistorialData();
    }, []);

    return (
        <div className={"mt-3"}>
            <div className={"shadow-lg bg-white"}>
                <Autocomplete
                    value={countrySelected}
                    onChange={(event, newValue) => {
                        setCountrySelected(newValue);
                        fetchCountryData();
                    }}
                    id="countries"
                    options={Array.from(countries.keys())}
                    getOptionLabel={(option) => option}
                    // getOptionSelected={(option, value) => option === value}
                    // style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Countries" variant="outlined" />}
                />
                <SplineChart data={chartData} />
            </div>
            <div className={"shadow-lg bg-white mt-3"}>
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip html={true}>{content}</ReactTooltip>
            </div>
        </div>

    );
};

export default Charts;