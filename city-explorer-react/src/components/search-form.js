import React from "react";


class SearchForm extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div>
          <form id="search-form" class="hide">
            <label for="search">Search for a location</label>
            <input type="text" name="search" id="input-search" placeholder="Enter a location here"/>
            <button type="submit">Explore!</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

{/* export default SearchForm; */}