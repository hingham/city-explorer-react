import React from 'react';

const Movies = props => {
    return (
      <section className="movie-container">
        <h3>Results from the Movie DB API</h3>
        <ul className="movie-results">
          {props.movies.map((film, idx) => {
            return <Film key={`card-${idx}`} film={film} />;
          })}
        </ul>
  
      </section>          
    )
  }
  
  const Film = props => {
    return (
      <li> 
        <p><span> {props.film.title} </span> Was released on {props.film.released_on}. Out of {props.film.total_votes} total votes, {props.film.titel} has an average vote of {props.film.average_votes} and a popularity score of {props.film.popularity}.</p> 
        <img src={props.film.image_url} alt="movie cover"/>
        <p>{props.film.overview}</p> 
      </li> 
    )
  }

  export default Movies;
  