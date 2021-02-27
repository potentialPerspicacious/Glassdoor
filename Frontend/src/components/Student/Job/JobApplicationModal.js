import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import backendServer from '../../../webConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

class JobApplicationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeOptions: [],
      primaryResume: '',
      selected_resume: '',
      placeholder: '',
    };
    this.onClickResume = this.onClickResume.bind(this);
    this.onClickCover = this.onClickCover.bind(this);
    this.applyJob = this.applyJob.bind(this);
  }
  componentDidMount() {
    console.log('Here');
    let resumeTag = [];
    let nameSplitter = 'nameSplitter';
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${backendServer}student/profile/${localStorage.getItem(
          'sql_student_id'
        )}`,
        { headers: { Authorization: `${localStorage.getItem('token')}` } }
      )
      .then((response) => {
        this.setState({
          resumeOptions: response.data[0].resumes,
        });
        console.log('STUDENT DETAILS');
        console.log(response.data);

        if (response.data[0].resumes && response.data[0].resumes.length > 0) {
          for (let i = 0; i < response.data[0].resumes.length; i++) {
            if (response.data[0].resumes[i].resume.includes('!***!')) {
              nameSplitter = '!***!';
            } else {
              nameSplitter = 'nameSplitter';
            }
            if (response.data[0].resumes[i].is_primary) {
              this.setState({
                primaryResume: response.data[0].resumes[i].resume,
                placeholder: response.data[0].resumes[i].resume.split(
                  nameSplitter
                )[1],
              });
            }

            resumeTag.push({
              label: response.data[0].resumes[i].resume.split(nameSplitter)[1],
              value: response.data[0].resumes[i].resume,
            });
          }

          this.setState({
            resumeOptions: resumeTag,
            selected_resume: this.state.primaryResume,
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      });
  }
  onClickResume = (e) => {
    this.setState({
      selected_resume: e.value,
    });
  };
  onClickCover = (e) => {
    console.log('uploading file');
    console.log(e.target.files);
    this.setState({
      cover_file: e.target.files[0],
    });
  };

  applyJob = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append('cover_file', this.state.cover_file);
    form_data.append('resume_file_name', this.state.selected_resume);
    form_data.append('sql_student_id', localStorage.getItem('sql_student_id'));
    form_data.append('job_id', this.props.jobDetails._id);
    form_data.append('application_status', 'Submitted');

    axios
      .post(
        `${backendServer}student/job/apply/${localStorage.getItem(
          'sql_student_id'
        )}`,
        form_data,
        {
          headers: { Authorization: `${localStorage.getItem('token')}` },
        }
      )
      .then((response) => {
        console.log('response');
        console.log(response);
        this.setState({
          status: response.data,
          server_status: response.status,
        });
      });
  };

  render() {
    console.log('render');
    console.log(this.state);
    let error = {
      message: null,
    };
    let success = {
      message: null,
    };
    console.log('statetete');
    console.log(this.state);
    if (this.state.status === 'APPLIED') {
      success.message = 'Your application has been submitted';
      setTimeout(function () {
        window.location = '/student/profile';
      }, 1500);
    } else if (this.state.server_status === 500) {
      error.message = 'There was an error.Please try again';
      setTimeout(function () {
        window.location = '/student/profile';
      }, 2000);
    }

    const ModalFormContent = (
      <Modal
        show={this.props.applicationShow}
        onHide={this.props.applicationOnHide}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply to Job</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: '10px 30px 10px 30px' }}>
          <Form>
            <Form.Group>
              <Form.Label>Select Resume</Form.Label>
              <Dropdown
                options={this.state.resumeOptions}
                onChange={this.onClickResume}
                placeholder={this.state.placeholder}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ margin: '0px', padding: '0px' }}>
                Cover Letter
              </Form.Label>
              <Form.File id='formcheck-api-regular'>
                <Form.File.Label>
                  <FontAwesomeIcon
                    style={{ marginLeft: '2.25cm', padding: '' }}
                    icon={faUpload}
                    size='3x'
                  />
                  <t style={{ fontSize: '15px', marginLeft: '1.65cm' }}>
                    pdf|doc|docx
                  </t>
                </Form.File.Label>
                <Form.File.Input
                  onChange={this.onClickCover}
                  style={{ display: 'inline-block', padding: '5px' }}
                  accept='.pdf,.doc,.docx'
                  title=''
                />
              </Form.File>
            </Form.Group>
          </Form>
          <div>
            {error.message && (
              <div
                style={{
                  width: '80%',
                  margin: '0 auto',
                  marginBottom: '5mm',
                  textAlign: 'center',
                  padding: '10px 10px 10px 10px',
                }}
                className='alert alert-danger'
              >
                {error.message}
              </div>
            )}
            {success.message && (
              <div
                style={{
                  width: '80%',
                  margin: '0 auto',
                  marginBottom: '5mm',
                  textAlign: 'center',
                  padding: '10px 10px 10px 10px',
                }}
                className='alert alert-success'
              >
                {success.message}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.applyJob} variant='success'>
            Apply to Job
          </Button>
        </Modal.Footer>
      </Modal>
    );
    return <div>{ModalFormContent}</div>;
  }
}

export default JobApplicationModal;
