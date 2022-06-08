import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Box from "../components/Box";
import DataTable from "../components/DataTable";
import VaccineTable from "../components/VaccineTable";

import "./Home.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    caseWorldWide: state.caseWorldWide,
    caseIndia: state.caseIndia,
    caseAllCountries: state.caseAllCountries,
    countriesNames: state.countriesNames,
  };
};

const Home = (props) => {
  const [currCountry, setCurrCountry] = useState("India");
  const [country, SetCountry] = useState({});

  const getCaseWorldWide = async () => {
    const caseWorldWide = await fetch(
      "https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=true"
    ).then((response) => response.json());
    props.dispatch({ type: "WORLDWIDE", payload: caseWorldWide });
  };

  const getCaseIndia = async () => {
    const caseIndia = await fetch(
      "https://disease.sh/v3/covid-19/gov/india"
    ).then((response) => response.json());
    props.dispatch({ type: "INDIA", payload: caseIndia });
  };

  const getAllCountriesCases = async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=true&allowNull=false"
    ).then((response) => response.json());
    props.dispatch({ type: "ALL_COUNTRIES", payload: response });
    const countryList = response.map((item) => {
      return item.country;
    });
    // console.log("countryList: ", countryList);
    props.dispatch({ type: "COUNTRIES_NAMES", payload: countryList });
  };

  const setCountryCase = (val) => {
    const country = (props?.caseAllCountries || []).find(
      (item) => item.country === val
    );
    if (country) {
      SetCountry(country);
    }
  };

  const getData = async () => {
    return Promise.all([
      getCaseWorldWide(),
      getCaseIndia(),
      getAllCountriesCases(),
    ]).then(() => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={"row"}>
      <div className={"row"}>
        <div className="shadow-lg p-3 mb-3 mt-3 bg-white rounded">
          <div className={"center box-text m-0"}>
            <strong>Total Cases WorldWide</strong>
          </div>
          <div className={"row"}>
            <Box
              type={"Total"}
              count={props.caseWorldWide.cases}
              today={props.caseWorldWide.todayCases}
              class={"yellow"}
            />
            <Box
              type={"Active"}
              count={props.caseWorldWide.active}
              today={
                props.caseWorldWide.todayCases -
                props.caseWorldWide.todayRecovered
              }
              class={"blue"}
            />
            <Box
              type={"Recovered"}
              count={props.caseWorldWide.recovered}
              today={props.caseWorldWide.todayRecovered}
              class={"green"}
            />
            <Box
              type={"Deaths"}
              count={props.caseWorldWide.deaths}
              today={props.caseWorldWide.todayDeaths}
              class={"red"}
            />
          </div>
        </div>
      </div>
      <div className={"row"}>
        <div className="shadow-lg p-3 mb-3 bg-white rounded">
          <div className={"center box-text m-0"}>
            <strong>Total Cases {currCountry}</strong>
            <div>
              <Autocomplete
                value={currCountry}
                onChange={(event, newValue) => {
                  setCurrCountry(newValue);
                  setCountryCase(currCountry);
                }}
                id="combo-box-demo1"
                options={props.countriesNames}
                getOptionLabel={(option) => option}
                getOptionSelected={(option, value) => option === value}
                // style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Countries" variant="outlined" />
                )}
              />
            </div>
          </div>
          <div className={"row"}>
            <Box
              type={"Total"}
              count={country.cases}
              today={country.todayCases}
              class={"yellow"}
            />
            <Box
              type={"Active"}
              count={country.active}
              today={country.todayCases - country.todayRecovered}
              class={"blue"}
            />
            <Box
              type={"Recovered"}
              count={country.recovered}
              today={country.todayRecovered}
              class={"green"}
            />
            <Box
              type={"Deaths"}
              count={country.deaths}
              today={country.todayDeaths}
              class={"red"}
            />
          </div>
        </div>
      </div>

      {/*<TableComponent states={states}/>*/}
      {/*<div className={"row shadow-lg bg-white"}>*/}
      <DataTable data={props.caseIndia.states} />
      {/*</div>*/}
      {/*<div className={"shadow-lg bg-white mt-3"}>*/}
      <VaccineTable />
      {/*</div>*/}
    </div>
  );
};

export default connect(mapStateToProps)(Home);
