import React, {useEffect, useState} from "react";
import SplineChart from "../components/SplineChart";

const Charts = (props) => {
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getHistorialDataIndia = async () => {
        const data = await fetch('https://disease.sh/v3/covid-19/historical/india?lastdays=all')
            .then(response => response.json());
        console.log('getHistorialDataIndia: ', data);
        setChartData(data);
    };

    useEffect(() => {
        getHistorialDataIndia();
    }, []);

    return (
        <div>
            <SplineChart data={chartData} />
        </div>

    );
};

export default Charts;