import React, { Component } from 'react';
import './core.css';
import Header from './components/header.js';
import Container from './components/container.js';
import superagent from 'superagent';
import Weather from './components/containers/weather.js'
import Yelp from './components/containers/yelp.js'
import Movies from './components/containers/movies.js'
import Meetups from './components/containers/meetups.js'
import Trails from './components/containers/trails.js'
import {If, Then, Else} from './components/conditional.js'


/**
 *
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   *Creates an instance of App.
   * @param {props} props Takes in a parameter of props for all templates
   * @memberof App
   */
  constructor(props){
    super(props);
    this.state={
      api: 'https://city-explorer-backend.herokuapp.com',
      weather: [],
      movies: [],
      yelp: [],
      meetups: [],
      trails: [],
      error: false,
      show: 'hide'
    }
  }

  fetchCityData = (e)=>{
    e.preventDefault();
    this.setState({error: false});
    this.setState({show: ''});
    let searchQuery = e.target.elements.search.value;
    let ApiUrl = `${this.state.api}/location`

    superagent.get(ApiUrl).query({data: searchQuery})
    .then( (res) =>{
      console.log(res);
      let location = res.body;
      return location
    })
    .then((location)=>{
      console.log('location', location.formatted_query.split(',')[0].toLowerCase());
      this.displayMap(location);
      this.getResource('weather', location);
      this.getResource('movies', location);
      this.getResource('yelp', location);
      this.getResource('meetups', location);
      this.getResource('trails', location);
    })
    .catch(error => {      
      console.log( typeof(error), error.message );
      this.setState({error:  error.message})
      console.log('state error', this.state.error); 
      console.log(error);
        })
  }

    displayMap =  (location) => {
      let mapText = document.getElementsByClassName('.query-placeholder');
      mapText.textContent =   'we can change content';
      console.log('latitude: ',location.latitude, location.longitude);

      let map = document.getElementById('map');
      console.log('map element', map);
      map.setAttribute("src", `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude}%2c%20${location.longitude}&zoom=13&size=600x300&maptype=roadmap
      &key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk`);
    }

    getResource(resource, location){
      superagent.get(`${this.state.api}/${resource}`).query({data: location})
      .then(results =>{
        this.setState({ [resource] : results.body});
        console.log('state object', this.state);
      })
    }

  render() {

    return (
      <React.Fragment>
        <Header/>
        
        <form id="search-form" onSubmit = {this.fetchCityData}>
        <Container>
            <label htmlFor="search" >Search for a location</label>
            <input type="text" name="search" id="input-search" placeholder="Enter a location here"/>
            <button type="submit">Explore!</button>
        </Container>
        </form>

        <h2 className="query-placeholder"></h2>
          <If condition={this.state.error}>
            <Then>
                <div>{this.state.error}</div>
            </Then>

            <Else>
              <div className = {this.state.show}>
              <img id="map" src="" alt="Map of search query"/>
              <div className="column-container" >
              <Weather weather={this.state.weather} />;
              <Yelp yelp={this.state.yelp} />;
              <Meetups meetups={this.state.meetups} />;
              <Movies movies={this.state.movies} />;
              <Trails trails={this.state.trails} />;
              </div>
              </div>
            </Else>
        
          </If> 

      </React.Fragment>
    );
  }
}

export default App;
