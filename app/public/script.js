const HelloMessage = React.createClass({
  render() {
    return <h1>Hello {this.props.message}!</h1>
  }
});

ReactDOM.render(
  <HelloMessage message='World' />,
  document.getElementById('root')
)
