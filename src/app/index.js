import React from 'react';
import {render} from 'react-dom';
import HelloMessage from './HelloMessage.js';
import AwesomeComponent from './AwesomeComponent.js';

class App extends React.Component {
  render () {
    return (
      <div>
        <HelloMessage message='World' />
        <AwesomeComponent />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
