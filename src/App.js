import React, { Component } from 'react';
import {render} from 'react-dom';
import HelloComponent from './HelloComponent.js';
import LikeComponent from './LikeComponent.js';

export default class App extends Component {
  render () {
    return (
      <div>
        <HelloComponent message='React' />
        <LikeComponent />
      </div>
    );
  }
}
