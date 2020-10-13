import React, {memo, useEffect, useState} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent }) => {
    const [countriesCases, setCountriesCases] = useState([]);

    const getAllCountriesCase = async () => {
        const caseAllCountries = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=true')
            .then(response => response.json());
        console.log(caseAllCountries);
        setCountriesCases(caseAllCountries);
    };

    const setTooltip = (geo) => {
        console.log(geo);
        let {NAME} = geo.properties;
        if (NAME === 'United States of America') NAME = 'USA';
        if (NAME === 'Falkland Is.') NAME = 'Falkland Islands (Malvinas)';
        if (NAME === 'South Korea') NAME = 'S. Korea';
        console.log(NAME);
        // console.log(countriesCases);
        const country = countriesCases.find(country => country.country === NAME);
        console.log(country);
        if (country) {
            setTooltipContent(`<p>${NAME}</p> <p> TodayCase: ${country.todayCases} </p> <p> TodayDeath: ${country.todayDeaths} </p>`)
        } else {
            setTooltipContent(`${NAME} \n TodayCase: 0`)
        }

    }

    useEffect(() => {
        getAllCountriesCase();
    }, []);


    return (
        <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
            <ZoomableGroup>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            // console.log(geo);
                            return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    setTooltip(geo)
                                    // setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}
                                style={{
                                    default: {
                                        fill: "#D6D6DA",
                                        outline: "none"
                                    },
                                    hover: {
                                        fill: "#F53",
                                        outline: "none"
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: "none"
                                    }
                                }}
                            />)
                        })
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default memo(MapChart);