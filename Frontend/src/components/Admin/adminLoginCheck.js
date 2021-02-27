import React, { Component } from 'react';
import { Redirect } from 'react-router';

class AdminLoginCheck extends Component {
  constructor(props) {
    super(props);
  }

  render(name) {
    let redirectVar = null;
    let verify = localStorage.getItem('type');
    if (verify !== 'admin') {
      redirectVar = <Redirect to='/signup' />;
    }
    return <div>{redirectVar}</div>;
  }
}

export default AdminLoginCheck;
