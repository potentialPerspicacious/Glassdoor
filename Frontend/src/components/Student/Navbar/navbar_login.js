import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import glassdorNavIco from '../images/glassdoor-logotype-rgb.png';
import { Redirect } from 'react-router';
import ReactModalLogin from 'react-modal-login';
import axios from 'axios';
import backendServer from '../../../webConfig';
import jwt_decode from 'jwt-decode';

class LoginNavbar extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      authFlag: false,
      err: '',
      loading: false,
      error: null,
      showModal: false,
      loggedIn: null,
      initialTab: null,
      redirect: null,
      token: '',
    };
    this.openModal = this.openModal.bind(this);
  }

  onLogin() {
    // console.log('email: ' + document.querySelector('#email').value);
    // console.log('password: ' + document.querySelector('#password').value);

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
      this.setState({
        error: true,
      });
    } else {
      const login_data = {
        email: email,
        password: password,
      };

      axios
        .post(`${backendServer}student/login`, login_data)
        .then((response) => {
          console.log(response.data);
          this.setState({
            token: response.data,
            authFlag: true,
          });
          if (response.status === 200) {
            this.onLoginSuccess(response.data);
          } else {
            this.onLoginFail('form');
          }
        })
        .catch((err) => {
          console.log(err);
          this.onLoginFail('form');
        });
    }
  }

  onLoginSuccess(method, response) {
    if (this.state.token.length > 0) {
      localStorage.setItem('token', this.state.token);

      var decoded = jwt_decode(this.state.token.split(' ')[1]);
      localStorage.setItem('type', decoded.type);
      console.log('Localstorage data', decoded.type + decoded.id);
      if (localStorage.getItem('type') === 'student') {
        localStorage.setItem('sql_student_id', decoded.id);
        localStorage.setItem('first_name', decoded.first_name);
        localStorage.setItem('last_name', decoded.last_name);
        this.setState({
          redirect: <Redirect to='/student/home' />,
        });
      } else if (localStorage.getItem('type') === 'company') {
        localStorage.setItem('sql_company_id', decoded.id);
        localStorage.setItem('name', decoded.name);
        this.setState({
          redirect: <Redirect to='/company/home' />,
        });
      } else if (localStorage.getItem('type') === 'admin') {
        this.setState({
          redirect: <Redirect to='/admin/home' />,
        });
      }
    }
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null,
    });
    this.forceUpdate();
  }

  onLoginFail(method, response) {
    console.log('logging failed with ' + method);
    this.setState({
      error: true,
    });
  }

  startLoading() {
    this.setState({
      loading: true,
    });
  }

  finishLoading() {
    this.setState({
      loading: false,
    });
  }

  afterTabsChange() {
    window.location.reload();
    this.setState({
      error: null,
      showModal: false,
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = this.state.redirect;
    }
    return (
      <div>
        {redirectVar}
        <Navbar bg='transparent' expand='lg'>
          <Navbar.Brand href='/student/login'>
            <Image src={glassdorNavIco} style={{ width: '200px' }} />
          </Navbar.Brand>
          <Nav className='ml-auto'>
            <Button onClick={() => this.openModal()} variant='success'>
              Sign In
            </Button>
          </Nav>

          <ReactModalLogin
            visible={this.state.showModal}
            onCloseModal={this.closeModal.bind(this)}
            loading={this.state.loading}
            error={this.state.error}
            tabs={{
              afterChange: this.afterTabsChange.bind(this),
            }}
            loginError={{
              label: 'Invalid username or password',
            }}
            registerError={{
              label: "Couldn't sign up, please try again.",
            }}
            startLoading={this.startLoading.bind(this)}
            finishLoading={this.finishLoading.bind(this)}
            form={{
              onLogin: this.onLogin.bind(this),
              loginBtn: {
                label: 'Sign in',
              },
              loginInputs: [
                {
                  containerClass: 'RML-form-group',
                  label: 'Email',
                  type: 'email',
                  inputClass: 'RML-form-control',
                  id: 'email',
                  name: 'email',
                  placeholder: 'Email',
                },
                {
                  containerClass: 'RML-form-group',
                  label: 'Password',
                  type: 'password',
                  inputClass: 'RML-form-control',
                  id: 'password',
                  name: 'password',
                  placeholder: 'Password',
                },
              ],
            }}
          />
        </Navbar>
      </div>
    );
  }
}

export default LoginNavbar;
