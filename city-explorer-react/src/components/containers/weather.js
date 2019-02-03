import React from 'react';


const Weather = props => {
    return (
      <section >
        <h3>Results from Dark Sky API</h3> 
      <ul className = "weather-results">
        {props.weather.map((forecast, idx) => {
          return <Forecast key={`card-${idx}`} forecast={forecast} />;
        })}
      </ul>
      </section>
    );
  };
  
  const Forecast = props =>{
    return (
    <li> The forecast for {props.forecast.time} is: {props.forecast.forecast}</li>
    )
  }


  export default Weather;
//   export {Weather, Forecast};