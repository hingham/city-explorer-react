import React from 'react';

const Yelp = props => {
    return (
      <section className="yelp-container">
        <h3>Results from the Yelp API</h3>
        <ul className="yelp-results">
          {props.yelp.map((restaurant, idx) => {
            return <Restaurant key={`card-${idx}`} restaurant={restaurant} />;
          })}
          </ul> 
      </section>
    )
  }
  
  const Restaurant = props => {
    return (
      <li>
        <a href={props.restaurant.url}> {props.restaurant.name}</a>
        <p>The average rating is {props.restaurant.rating} out of 5 and the average cost is {props.restaurant.price} out of 4</p>
        <img src={props.restaurant.image_url} alt="restaurant" />
      </li>
    )
  }

  export default Yelp;