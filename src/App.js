import React, { Component } from 'react';
import {render} from 'react-dom';
import HelloMessage from './HelloMessage.js';
import AwesomeComponent from './AwesomeComponent.js';

export default class App extends Component {
  render () {
    return (
      <div>
        <HelloMessage message='React' />
        <AwesomeComponent />
      </div>
    );
  }
}
