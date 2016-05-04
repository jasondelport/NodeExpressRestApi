import React from 'react';

var NobelPrize = React.createClass({
  render: function() {
    return (
      <div className="nobelPrize">
        <h2 className="title">
          {this.props.firstname} {this.props.surname} {this.props.year}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

export default NobelPrize;
