import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_company';
import { Link } from 'react-router-dom';
import { Form, Button, ButtonGroup, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import { Redirect } from 'react-router';
import { insertNewJobDetails } from '../../../store/actions/companyJobsAction';

class AddJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange(e) {
    this.setState({ workType: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = localStorage.getItem('sql_company_id');
    const name = localStorage.getItem('name');
    var today = new Date();
    var current_date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    const jobData = {
      companyName: name,
      title: this.state.title,
      description: this.state.description,
      responsibilities: this.state.responsibilities,
      qualification: this.state.qualification,
      fromSalary: this.state.fromSalary,
      toSalary: this.state.toSalary,
      industry: this.state.industry,
      country: this.state.country,
      workType: this.state.workType,
      jobType: this.state.jobType,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      posted_date: current_date,
      sql_company_id: id,
    };
    console.log(jobData);
    this.props.insertNewJobDetails(jobData);
    if (this.props.status === 'Inserted Successfully') {
      alert('Inserted Successfully');
      this.setState({
        redirect: true,
      });
    }
  }

  fromCurrency = (e) => {
    this.setState({
      fromSalary: e,
    });
  };

  toCurrency = (e) => {
    this.setState({
      toSalary: e,
    });
  };

  handleDropdownChange = (e) => {
    this.setState({
      jobType: e.target.value,
    });
  };

  render() {
    let redirectVar = null;
    if (this.state.redirect === true) {
      redirectVar = (
        <Redirect
          to={{
            pathname: '/company/jobs',
          }}
        />
      );
    }
    return (
      <React.Fragment>
        {redirectVar}
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-5 ml-5 mb-5 mt-3'>
              <h4 style={{ color: '#028A0F', float: 'left' }}>Add New Job</h4>
              <br />
              <hr className='mb-3'></hr>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    <strong>Company Name</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='companyName'
                    defaultValue={localStorage.getItem('name')}
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Job Title</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='title'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    aria-label='With textarea'
                    required={true}
                    type='text'
                    name='description'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Responsibilities</strong>
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    aria-label='With textarea'
                    required={true}
                    type='text'
                    name='responsibilities'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Qualification</strong>
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    aria-label='With textarea'
                    required={true}
                    type='text'
                    name='qualification'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Salary Range</strong>
                  </Form.Label>
                  <Form.Row>
                    <Col Col xs='auto' className='my-1'>
                      <Form.Label>
                        <strong>From</strong>
                      </Form.Label>
                      <CurrencyInput
                        name='fromSalary'
                        groupSeparator=','
                        decimalSeparator='.'
                        turnOffSeparators={false}
                        style={{
                          borderRadius: '4px',
                          border: '1px solid #cccccc',
                          height: '10mm',
                        }}
                        prefix='$'
                        onChange={this.fromCurrency}
                      />
                    </Col>
                    <Col xs='auto' className='my-1'>
                      <Form.Label>
                        <strong>To</strong>
                      </Form.Label>
                      <CurrencyInput
                        name='toSalary'
                        groupSeparator=','
                        decimalSeparator='.'
                        turnOffSeparators={false}
                        style={{
                          borderRadius: '4px',
                          border: '1px solid #cccccc',
                          height: '10mm',
                        }}
                        prefix='$'
                        onChange={this.toCurrency}
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Industry</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='industry'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Country</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='country'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Work Type</strong>
                  </Form.Label>
                  <Form.Check
                    name='remote'
                    label='Remote'
                    value='Remote'
                    onChange={this.handleCheckboxChange}
                  />
                  <Form.Check
                    name='In Person'
                    label='In Person'
                    value='In Person'
                    onChange={this.handleCheckboxChange}
                  />
                </Form.Group>
                <Form.Label>
                  <strong>Job Type</strong>
                </Form.Label>
                <Form.Group>
                  <select
                    onChange={this.handleDropdownChange}
                    value={this.state.value}>
                    <option value='select'>Select</option>
                    <option value='Full-time'>Full-time</option>
                    <option value='Part-time'>Part-time</option>
                    <option value='Contract'>Contract</option>
                    <option value='Internship'>Internship</option>
                    <option value='Temporary'>Temporary</option>
                  </select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Street Address</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='address'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>City</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='city'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>State</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='state'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Zipcode</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='zipcode'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <ButtonGroup aria-label='First group' className='mt-2'>
                  <Button variant='success' type='submit'>
                    Save Changes
                  </Button>
                </ButtonGroup>
                <Link to={{ pathname: '/company/jobs' }}>
                  <a style={{ marginLeft: '15px' }}>Cancel</a>
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddJob.propTypes = {
  insertNewJobDetails: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.jobs.status,
});

export default connect(mapStateToProps, { insertNewJobDetails })(AddJob);
