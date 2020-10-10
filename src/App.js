import React from 'react';
import './App.css';
import Header from "./shared/MainNavigation/Header";
import Home from "./home/pages/Home";
import Charts from "./charts/pages/Charts";

function App() {
  return (
      <React.Fragment>
        <Header/>
        <div className="container">
            <Home/>
            <Charts/>
        </div>
      </React.Fragment>
  );
}

export default App;
