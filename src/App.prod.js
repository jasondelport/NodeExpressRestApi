import React, { Component } from 'react';
import NobelPrizeList from './NobelPrizeList.js';

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Nobel Prize Laureates in Literature</h1>
        <NobelPrizeList url="/api/nobelprizes?category=literature" pollInterval={60000} />,
      </div>
    );
  }
}
