import React from 'react';
import $ from 'jquery';
import NobelPrize from './NobelPrize.js';

var NobelPrizeList = React.createClass({
  loadFromServer: function() {
    console.log('loading noble prize winners from server');
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    // add some dummy data to play with if api isn't working
    if (process.env.NODE_ENV === 'production') {
      return {data: []}
    } else {
      return {data: [{_id: "571f88b630655d55d3f26c59",year: "2015",category: "literature",laureates: [{id: "924",firstname: "Svetlana",surname: "Alexievich",motivation: "for her polyphonic writings, a monument to suffering and courage in our time",share: "1"}]}]};
    }
  },
  componentDidMount: function() {
    this.loadFromServer();
    setInterval(this.loadFromServer, this.props.pollInterval);
  },
  componentWillUnmount () {

  },
  render: function() {
      var npNodes = this.state.data.map(function(np) {
      return (
        <NobelPrize firstname={np.laureates[0].firstname} surname={np.laureates[0].surname} year={np.year} key={np._id}>
          {np.laureates[0].motivation}
        </NobelPrize>
      );
    });
    return (
      <div className="npList">
        {npNodes}
      </div>
    );
  }
});

export default NobelPrizeList;
