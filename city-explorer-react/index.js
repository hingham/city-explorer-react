import React from 'react';
import ReactDOM from 'react-dom';

// import App from './app.js';

/**
 *
 *
 * @class Main
 * @extends {React.Component}
 */
class Main extends React.Component {
  render() {
    return (
        <div> hello city-explorer </div>
    // <App />;
    )}
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);