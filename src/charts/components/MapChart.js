import React from "react";
import { connect } from "react-redux";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const mapStateToProps = (state) => {
  return {
    caseAllCountries: state.caseAllCountries,
  };
};

const MapChart = (props) => {
  const setTooltip = (geo) => {
    let { NAME } = geo.properties;
    if (NAME === "United States of America") NAME = "USA";
    if (NAME === "Falkland Is.") NAME = "Falkland Islands (Malvinas)";
    if (NAME === "South Korea") NAME = "S. Korea";

    const country = props.caseAllCountries.find(
      (country) => country.country === NAME
    );

    if (country) {
      props.setTooltipContent(
        `<p>${NAME}</p>
        <p> TodayCase: ${country.todayCases} </p>
        <p> TodayDeath: ${country.todayDeaths} </p>
        <p> ActiveCase: ${country.active} </p>`
      );
    } else {
      props.setTooltipContent(`${NAME} \n TodayCase: 0`);
    }
  };

  return (
    <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltip(geo);
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default connect(mapStateToProps)(MapChart);
