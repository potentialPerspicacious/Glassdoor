import React, { Component } from 'react';
import StudentNavbar from '../Navbar/navbar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Card } from 'react-bootstrap';
import JobApplicationModal from './JobApplicationModal';

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleApplicationClose = () => this.setState({ applicationShow: false });
  handleApplicationModalShow = () => this.setState({ applicationShow: true });

  render() {
    let info = null;
    let detailTag = null;
    let navBar = null;
    let disableApply = false;
    console.log(this.props);
    if (this.props.location && this.props.location.state) {
      console.log('this.props.location.state');
      console.log(this.props.location.state);
      info = this.props.location.state;
      navBar = (
        <div>
          <StudentNavbar />
          <br />
          <br />
        </div>
      );
    }
    if (this.props.info) {
      console.log('this.props.info');
      console.log(this.props.info);
      info = this.props.info;
    }

    if (info) {
      //find student
      let student_id = localStorage.getItem('sql_student_id');
      for (let i = 0; i < info.applied_students.length; i++) {
        if (info.applied_students[i].sql_student_id === student_id) {
          disableApply = true;
          break;
        }
      }

      detailTag = (
        <div style={{ width: '50%' }}>
          <div>
            <Card style={{ width: '22cm' }}>
              <Card.Img variant='top' style={{ width: '15rem' }} src='' />
              <Card.Title
                style={{
                  padding: '30px 20px 0px 20px',
                  fontWeight: 'bolder',
                  fontSize: '25px',
                }}
              >
                {info.companyName}
              </Card.Title>
              <div className='d-flex flex-row'>
                <div style={{ width: '22cm' }}>
                  <Card.Body>
                    <Card.Text>{info.industry}</Card.Text>
                    <br />
                    <Card.Text>
                      {' '}
                      {info.city} | {info.country}
                    </Card.Text>
                  </Card.Body>
                </div>
                <div style={{ float: 'right', padding: '40px 100px 0 0' }}>
                  <Button
                    variant='primary'
                    onClick={this.handleApplicationModalShow}
                    disabled={disableApply}
                  >
                    <div className='d-flex flex-row'>
                      <FontAwesomeIcon
                        icon={faShareSquare}
                        style={{ verticalAlign: 'middle' }}
                      />
                      <span>Apply</span>
                    </div>
                  </Button>
                  <JobApplicationModal
                    applicationShow={this.state.applicationShow}
                    applicationOnHide={this.handleApplicationClose}
                    jobDetails={{ _id: info._id }}
                  />
                </div>
              </div>
            </Card>
            <Card style={{ width: '22cm' }}>
              <Card.Title
                style={{
                  padding: '30px 20px 0px 20px',
                  fontWeight: 'bolder',
                  fontSize: '25px',
                }}
              >
                {info.title}
              </Card.Title>
              <Card.Body>
                <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                  Job Description
                </Card.Text>
                <Card.Text>{info.description}</Card.Text>
                <br />
                <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                  Responsibilities
                </Card.Text>
                <Card.Text>{info.responsibilities}</Card.Text>
                <br />
                <Card.Text style={{ fontWeight: 'bold', color: '#49504C' }}>
                  Qualifications
                </Card.Text>
                <Card.Text>{info.qualification}</Card.Text>
              </Card.Body>
            </Card>
            <br />
            <br />
          </div>
        </div>
      );
    }
    return (
      <div>
        {navBar}
        {detailTag}
      </div>
    );
  }
}

export default JobDetails;
