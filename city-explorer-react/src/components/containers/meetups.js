import React from 'react';

const Meetups = props => {
  return (
    <section>
      <h3>Results from the Meetup API</h3>
      <ul className="meetups-results">
        {props.meetups.map((event, idx) => {
          return <Event key={`card-${idx}`} event={event} />;
        })}
        </ul> 
    </section>
  )
}

const Event = props => {
  return (
    <li>
      <a href={props.event.link}> {props.event.name}</a>
      <p>Hosted by: {props.event.host}</p>
      <p>Created on: {props.event.creation_date}</p>
      
    </li>
  )
}

export default Meetups;