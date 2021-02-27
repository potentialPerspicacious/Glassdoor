import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
  DropdownButton,
  Dropdown,
  InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import glassdorNavIco from '../images/glassdoor-logotype-rgb.png';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Redirect } from 'react-router';

class StudentNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      SearchType: 'Jobs',
      searchKeyword: '',
      redirectVar: null,
    };
    this.search = this.search.bind(this);
  }

  search = () => {
    if (this.state.SearchType === 'Jobs') {
      this.setState({
        redirectVar: (
          <Redirect
            to={{
              pathname: '/student/job/home',
              state: { search_param: this.state.searchKeyword },
            }}
          />
        ),
      });
    }
    if (!this.state.searchKeyword) {
      return;
    } else {
      /*if (this.state.SearchType === 'Jobs') {
        let url = '/student/search/job/' + this.state.searchKeyword;
        this.setState({
          redirectVar: <Redirect to={url} />,
        });
      }*/
      if (this.state.SearchType === 'Companies') {
        let url = '/student/search/company/' + this.state.searchKeyword;
        this.setState({
          redirectVar: <Redirect to={url} />,
        });
      }
      if (this.state.SearchType === 'Interviews') {
        let url = '/student/search/interview/' + this.state.searchKeyword;
        this.setState({
          redirectVar: <Redirect to={url} />,
        });
      }
      if (this.state.SearchType === 'Salaries') {
        let url = '/student/search/salary/' + this.state.searchKeyword;
        this.setState({
          redirectVar: <Redirect to={url} />,
        });
      }
    }
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleLogout = () => {
    localStorage.clear();
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

  SearchType = (e) => {
    console.log('searchType:', e);
    this.setState({
      SearchType: e,
    });
  };

  render() {
    return (
      <div>
        {this.state.redirectVar}
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='/student/home'>
            <Image src={glassdorNavIco} style={{ width: '200px' }} />
          </Navbar.Brand>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Job Title, Keywords, or Company'
              className='mr-sm-3'
              style={{ width: '15cm' }}
              onChange={this.searchChangeHandler}
            />

            <InputGroup>
              <FormControl
                type='text'
                placeholder='What?'
                className='mr-xs-10'
                value={this.state.SearchType}
              />
              <DropdownButton
                as={InputGroup.Append}
                variant='light'
                title=''
                name='searchType'
                menuAlign='right'
                style={{ width: '0cm', marginLeft: '0.1mm' }}
                onSelect={this.SearchType}
              >
                <Dropdown.Item eventKey='Jobs'>Jobs</Dropdown.Item>
                <Dropdown.Item eventKey='Companies'>Companies</Dropdown.Item>
                <Dropdown.Item eventKey='Salaries'>Salaries</Dropdown.Item>
                <Dropdown.Item eventKey='Interviews'>Interviews</Dropdown.Item>
              </DropdownButton>
            </InputGroup>

            {/* <FormControl
              style={{ marginLeft: '5mm' }}
              type='text'
              placeholder='Location'
              className='mr-sm-4'
            /> */}
            <Button
              onClick={this.search}
              variant='success'
              style={{ marginLeft: '2cm' }}
            >
              Search
            </Button>
          </Form>
          <Nav>
            <NavDropdown
              style={{ marginLeft: '1.5cm' }}
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
                href='/student/profile'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'profile');
                }}
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/student/resume'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'resume');
                }}
              >
                Resumes
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/student/jobPreference'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'jobPreference');
                }}
              >
                Job Preference
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/student/demographics'
                style={{ padding: '15px 15px 15px 15px' }}
                onClick={() => {
                  localStorage.setItem('active-list', 'demographics');
                }}
              >
                Demographics
              </NavDropdown.Item>
              <NavDropdown.Item
                href='/student/job/appliedJobs'
                style={{ padding: '15px 15px 15px 15px' }}
              >
                Job Applications
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.setItem('contri-list', 'salaries');
                }}
                href='/student/contributions/salaries'
                style={{ padding: '15px 15px 15px 15px' }}
              >
                Contributions
              </NavDropdown.Item>
              <NavDropdown.Item
                href=''
                style={{ padding: '15px 15px 15px 15px' }}
              >
                Company Follows
              </NavDropdown.Item>
              <NavDropdown.Item
                href=''
                style={{ padding: '15px 15px 15px 15px' }}
              >
                Emails & Alerts
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href=''
                style={{ padding: '10px 15px 10px 15px' }}
              >
                Account Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href=''
                style={{ padding: '15px 15px 15px 15px' }}
              >
                Help Center
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={this.handleLogout}
                style={{ padding: '15px 15px 15px 15px' }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Nav
          class='navbar navbar-expand-md bg-light'
          style={{ borderTop: '0.5px solid #a9a9a9' }}
        >
          <div>
            <form class='form-inline mx-auto'>
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    fontSize: '15px',
                    backgroundColor: 'transparent',
                    color: '#555555',
                    border: 'none',
                    marginLeft: '5px',
                  }}
                  id='dropdown-basic'
                >
                  {' '}
                  <i class='fas fa-briefcase'></i> Jobs
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item style={{ background: 'none' }}>
                    Recent Activity
                  </Dropdown.Item>
                  <Dropdown.Item>Career Insights</Dropdown.Item>
                  <Dropdown.Item>Job Alerts</Dropdown.Item>
                  <Dropdown.Item>Saved</Dropdown.Item>
                  <Dropdown.Item>Applications</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    fontSize: '15px',
                    backgroundColor: 'transparent',
                    color: '#555555',
                    border: 'none',
                    marginLeft: '5px',
                  }}
                  id='dropdown-basic'
                >
                  {' '}
                  <i class='far fa-building'></i> Companies
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item style={{ background: 'none' }}>
                    Discover companies
                  </Dropdown.Item>
                  <Dropdown.Item>Compare Companies </Dropdown.Item>
                  <Dropdown.Item>Suggested Follows</Dropdown.Item>
                  <Dropdown.Item>Write a Review</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    fontSize: '15px',
                    backgroundColor: 'transparent',
                    color: '#555555',
                    border: 'none',
                    marginLeft: '5px',
                  }}
                  id='dropdown-basic'
                >
                  {' '}
                  <i class='fas fa-money-bill'></i> Salaries
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item style={{ background: 'none' }}>
                    Discover salary
                  </Dropdown.Item>
                  <Dropdown.Item>Salary Calculator </Dropdown.Item>
                  <Dropdown.Item>Analyze Offer</Dropdown.Item>
                  <Dropdown.Item>Add a Salary</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    fontSize: '15px',
                    backgroundColor: 'transparent',
                    color: '#555555',
                    border: 'none',
                    marginLeft: '5px',
                  }}
                  id='dropdown-basic'
                >
                  {' '}
                  <i class='far fa-comments'></i> Interviews{' '}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    style={{ background: 'none' }}
                    onClick={this.handleClick}
                  >
                    Discover Interviews
                  </Dropdown.Item>
                  <Dropdown.Item
                    href='/student/interview/add'
                    onClick={() => {
                      localStorage.setItem('active-list', 'add_interview');
                    }}
                  >
                    Add an Interview
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </form>
          </div>
        </Nav>
      </div>
    );
  }
}

export default StudentNavbar;
