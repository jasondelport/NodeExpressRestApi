import React from 'react';

class HelloMessage extends React.Component {
  render() {
    return (<h1>Say Hello {this.props.message}!</h1>);
  }
}

export default HelloMessage;
