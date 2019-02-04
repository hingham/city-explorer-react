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

// Static Routes
app.use('/docs', express.static('docs'));

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

  fetchCityData =  async e=>{
    e.preventDefault();
    this.setState({error: false});
    this.setState({show: ''});
    let searchQuery = e.target.elements.search.value;
    let ApiUrl = `${this.state.api}/location`
    try{
    let results = await superagent.get(ApiUrl).query({data: searchQuery})
    let location = results.body;
    this.displayMap(location);
    Promise.all([ this.getInfo('weather', location), this.getInfo('movies', location), this.getInfo('yelp', location), this.getInfo('meetups', location), this.getInfo('trails', location)]);
    } catch(error){
      this.setState({error:  error.message})
    }
  }

    displayMap =  (location) => {
      let mapText = document.getElementsByClassName('.query-placeholder');
      mapText.textContent =   'we can change content';
      let map = document.getElementById('map');
      map.setAttribute("src", `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude}%2c%20${location.longitude}&zoom=13&size=600x300&maptype=roadmap
      &key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk`);
    }

    getInfo = (Info, location) => {
      superagent.get(`${this.state.api}/${Info}`).query({data: location})
      .then(results =>{
        this.setState({ [Info] : results.body});
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
