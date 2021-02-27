import React, { Component } from 'react';
import { Image, ListGroup } from 'react-bootstrap';
import UploadImageModalForm from './uploadImageModal';
import backendServer from '../../../webConfig';
import { connect } from 'react-redux';

class SideBarStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileState: false,
      resumeState: false,
      jobPreferenceState: false,
      demographicsState: false,
      showModal: false,
    };
  }
  componentWillMount = () => {
    if (localStorage.getItem('active-list') === 'profile') {
      this.setState({ profileState: true });
    } else if (localStorage.getItem('active-list') === 'resume') {
      this.setState({ resumeState: true });
    } else if (localStorage.getItem('active-list') === 'jobPreference') {
      this.setState({ jobPreferenceState: true });
    } else if (localStorage.getItem('active-list') === 'demographics') {
      this.setState({ demographicsState: true });
    }
  };
  handleClose = () => this.setState({ showModal: false });
  handleShow = () => this.setState({ showModal: true });

  render() {
    let profilePicture = null;
    if (this.state) {
      profilePicture = `${backendServer}student/getProfilePicture/${localStorage.getItem(
        'sql_student_id'
      )}`;
    }
    return (
      <div>
        <UploadImageModalForm
          show={this.state.showModal}
          onHide={this.handleClose}
        />

        <Image
          src={profilePicture}
          style={{ width: '1.5cm' }}
          roundedCircle
          onClick={this.handleShow}
        />
        <br />
        <br />
        <ListGroup variant='flush'>
          <ListGroup.Item
            action
            variant='light'
            active={this.state.profileState}
            onClick={() => {
              localStorage.setItem('active-list', 'profile');
            }}
            style={{ color: 'black' }}
            href='/student/profile'
          >
            Profile
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant='light'
            active={this.state.resumeState}
            onClick={() => {
              localStorage.setItem('active-list', 'resume');
            }}
            style={{ color: 'black' }}
            href='/student/resume'
          >
            Resume
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant='light'
            active={this.state.jobPreferenceState}
            onClick={() => {
              localStorage.setItem('active-list', 'jobPreference');
            }}
            style={{ color: 'black' }}
            href='/student/jobPreference'
          >
            Job Preference
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant='light'
            active={this.state.demographicsState}
            onClick={() => {
              localStorage.setItem('active-list', 'demographics');
            }}
            style={{ color: 'black' }}
            href='/student/demographics'
          >
            Demographics
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant='light'
            active={this.state.applidJobsState}
            onClick={() => {
              localStorage.setItem('active-list', 'applied_jobs');
            }}
            style={{ color: 'black' }}
            href='/student/job/appliedJobs'
          >
            Job Applications
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentProfile_data: state.studentProfile.payload,
});

export default connect(mapStateToProps)(SideBarStudent);
