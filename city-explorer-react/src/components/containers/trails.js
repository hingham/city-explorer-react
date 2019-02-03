import React from 'react';


const Trails = props => {
  return (
    <section className="trails-results" >
      <ul className="trails-results">
        {props.trails.map((hike, idx) => {
          return <Hike key={`card-${idx}`} hike={hike} />;
        })}
        </ul> 
    </section>
  )
}

const Hike = props => {
  return (
    <li>
      <p>Hike name: <a href={props.hike.trail_url}> {props.hike.name}</a> {props.hike.location}, Distance: {props.hike.length} miles</p>
      <p>{props.hike.condition_date} at {props.hike.condtion_time}, trails conditosn were reported as: {props.hike.conditions}</p>
      <p>This trail has a rating of {props.hike.stars} stars (out of {props.hike.star_votes} votes)</p>
      <p> {props.hike.summary}</p>
    </li>
  )
}

export default Trails;