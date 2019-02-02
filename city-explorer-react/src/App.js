import React, { Component } from 'react';
import './core.css';
import Header from './components/header.js';
// import UrlForm from './components/url-form.js';
import Container from './components/container.js';
import superagent from 'superagent';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      api: 'https://city-explorer-backend.herokuapp.com',
    }
  }

  fetchCityData = (e)=>{
    e.preventDefault();
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
      this.getResource('meetup', location);
      this.getResource('trails', location);
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
        console.log(results);
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

        <img id="map"   src="https://maps.googleapis.com/maps/api/staticmap?center=45%2c%20&zoom=13&size=600x300&maptype=roadmap
      &key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk" alt="Map of search query"/>
        <h2 className="query-placeholder"></h2>

      </React.Fragment>
    );
  }
}

export default App;
