import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import glassdorNavIco from '../images/glassdoor-logotype-rgb.png';
import { Redirect } from 'react-router';

class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      SearchType: 'Companies',
      searchKeyword: '',
      redirectVar: null,
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleLogout = () => {
    localStorage.removeItem('type');
    this.setState({
      redirectVar: <Redirect to='/student/login' />,
    });
  };

  searchChangeHandler = (e) => {
    console.log('Search keyword:', e);
    e.preventDefault();
    this.setState({
      searchKeyword: e.target.value,
    });
    console.log('keyword:', this.state.searchKeyword);
  };

  search = () => {
    if (this.state.SearchType === 'Companies') {
      let url = '/admin/search/company/' + this.state.searchKeyword;
      this.setState({
        redirectVar: <Redirect to={url} />,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.redirectVar}
        <Navbar bg='light' expand='lg'>
          {/* <Navbar.Brand href='/student/home'> */}
          <Image src={glassdorNavIco} style={{ width: '200px' }} />
          {/* </Navbar.Brand> */}
          <Form inline>
            <FormControl
              type='text'
              placeholder='Company'
              className='mr-sm-3'
              style={{ width: '10cm' }}
              onChange={this.searchChangeHandler}
            />
            <Button
              style={{
                backgroundColor: 'transparent',
                color: 'black',
                borderColor: 'grey',
              }}
              onClick={this.search}>
              <i class='fas fa-search'></i>
            </Button>
          </Form>
          <Nav>
            <Button
              href='/admin/allReviews'
              onClick={this.handleSearch}
              variant='success'
              style={{
                marginLeft: '10mm',
              }}
              type='submit'>
              {' '}
              Reviews{' '}
            </Button>
            <Button
              href='/admin/allPhotos'
              onClick={this.handleSearch}
              variant='success'
              style={{
                marginLeft: '10px',
              }}
              type='submit'>
              {' '}
              Photos{' '}
            </Button>
            <Button
              href='/admin/companyProfile'
              onClick={this.handleSearch}
              variant='success'
              style={{
                marginLeft: '10px',
              }}
              type='submit'>
              {' '}
              Company Profile{' '}
            </Button>
            <Button
              href='/admin/home'
              onClick={this.handleSearch}
              variant='success'
              style={{
                marginLeft: '10px',
              }}
              type='submit'>
              {' '}
              Analytics Dashboard{' '}
            </Button>
            <NavDropdown
              style={{ marginLeft: '0.5cm'}}
              title={
                <i
                  className='far fa-user-circle'
                  style={{ fontSize: '30px' }}
                ></i>
              }
              onMouseEnter={this.handleOpen}
              onMouseLeave={this.handleClose}
              show={this.state.isOpen}
              action
              variant='light'
              
            >
              <NavDropdown.Item
                onClick={this.handleLogout}
                style={{ padding: '10px 15px 10px 15px' }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default AdminNavbar;
