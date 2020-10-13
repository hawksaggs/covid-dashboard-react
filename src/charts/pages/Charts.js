import React, {useEffect, useState} from "react";
import SplineChart from "../components/SplineChart";
import MapChart from "../components/MapChart";
import ReactTooltip from "react-tooltip";

import './Charts.css';

const Charts = (props) => {
    const [chartData, setChartData] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");

    const getHistorialDataIndia = async () => {
        const data = await fetch('https://disease.sh/v3/covid-19/historical/india?lastdays=all')
            .then(response => response.json());
        // console.log('getHistorialDataIndia: ', data);
        setChartData(data);
    };

    useEffect(() => {
        getHistorialDataIndia();
    }, []);

    return (
        <div className={""}>
            {/*<div className={"row"}>*/}
                <SplineChart data={chartData} />
            {/*</div>*/}
            {/*<div className={"row"}>*/}
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip html={true}>{content}</ReactTooltip>
            {/*</div>*/}
        </div>

    );
};

export default Charts;