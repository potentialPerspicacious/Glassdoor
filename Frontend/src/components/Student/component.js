import React, { Component } from 'react';

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      str: this.props.str,
    };
    console.log('Params:', this.props.str);
  }

  render() {
    return <div key={this.props.str}>{this.props.str}</div>;
  }
}

export default Comp;
