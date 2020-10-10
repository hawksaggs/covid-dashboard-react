import React, {useEffect, useState} from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = (props) => {
    const [dataPoints, setDataPoints] = useState([]);

    const mapDataPoints = (props) => {
        console.log('SplineChart: ', props);
        const dataPoints = (props.data && props.data.timeline) ? Object.keys(props.data.timeline.cases).map((key) => {
            return {
                x: new Date(key),
                y: props.data.timeline.cases[key]
            };
        }) : [];
        console.log('SplineChar | dataPoints: ', dataPoints);
        setDataPoints(dataPoints);
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
        data: [{
            yValueFormatString: "#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints
        }]
    };
    return (
        <div>
            <CanvasJSChart options = {options}
                /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    );
};

export default SplineChart;