import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

const App = () => {
  const [lat, setLat] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setLat(position.coords.latitude),
      err => setErrorMessage(err.message)
    );
  }, [])
};

class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  // called when component is first rendered on screen
  // initial data loading -- one time
  componentDidMount() {
    
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="please allow geo location" />;
  }

  // react requires render method
  // keep expensive calls out (only return jsx)
  // move multiple return statements to helper method (keep conditionals out)
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
