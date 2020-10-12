import React, {useEffect, useState} from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = (props) => {
    const [cases, setCases] = useState([]);
    const [deaths, setDeaths] = useState([]);
    const [recovered, setRecovered] = useState([]);

    const mapDataPoints = (props) => {
        // console.log('SplineChart: ', props);
        const cases = (props.data && props.data.timeline) ? Object.keys(props.data.timeline.cases).map((key) => {
            return {
                x: new Date(key),
                y: props.data.timeline.cases[key]
            };
        }) : [];
        // console.log('SplineChar | cases: ', cases);
        setCases(cases);

        const deaths = (props.data && props.data.timeline) ? Object.keys(props.data.timeline.deaths).map((key) => {
            return {
                x: new Date(key),
                y: props.data.timeline.deaths[key]
            };
        }) : [];
        // console.log('SplineChar | deaths: ', deaths);
        setDeaths(deaths);

        const recovered = (props.data && props.data.timeline) ? Object.keys(props.data.timeline.recovered).map((key) => {
            return {
                x: new Date(key),
                y: props.data.timeline.recovered[key]
            };
        }) : [];
        // console.log('SplineChar | recovered: ', recovered);
        setRecovered(recovered);
    };

    
    useEffect(() => {
        mapDataPoints(props);
    }, [props]);

    const options = {
        animationEnabled: true,
        title:{
            text: "COVID-19"
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "No of Cases",
            // prefix: "$"
        },
        data: [
            {
                yValueFormatString: "#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: cases,
                name:'cases',
                showInLegend: true
            },
            {
                yValueFormatString: "#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: deaths,
                name:'deaths',
                showInLegend: true
            },
            {
                yValueFormatString: "#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: recovered,
                name:'recovered',
                showInLegend: true
            }
        ]
    };
    return (
            <CanvasJSChart options = {options}
                /* onRef={ref => this.chart = ref} */
            />
    );
};

export default SplineChart;