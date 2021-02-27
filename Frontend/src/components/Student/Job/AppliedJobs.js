import React, { Component } from 'react';
import StudentNavbar from '../Navbar/navbar_student';
import SideBarStudent from '../Navbar/sidebar_student';
import { Button, Card } from 'react-bootstrap';
import backendServer from '../../../webConfig';
import axios from 'axios';

class AppliedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateApplicantStatus = this.updateApplicantStatus.bind(this);
    this.getMyJobs = this.getMyJobs.bind(this);
  }

  componentDidMount = () => {
    this.getMyJobs();
  };

  getMyJobs() {
    axios
      .get(
        `${backendServer}student/job/getMyJobs/${localStorage.getItem(
          'sql_student_id'
        )}`,
        {
          headers: { Authorization: `${localStorage.getItem('token')}` },
        }
      )
      .then((response) => {
        console.log('response from backend');
        console.log(response);
        this.setState({
          myJobs: response.data,
        });
      });
  }

  updateApplicantStatus(e) {
    const args = {
      status: e.target.value,
      _id: e.target.name,
    };

    axios
      .post(`${backendServer}glassdoor/jobs/applicantstatus/update`, args, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          alert('Application Withdrawn!');
        }
        this.getMyJobs();
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  }

  render() {
    let jobsTab = null;
    let student_id = localStorage.getItem('sql_student_id');
    let status = '';
    let application_id = '';

    if (this.state && this.state.myJobs) {
      jobsTab = this.state.myJobs.map((job) => {
        let withdrawBtn = false;
        for (let i = 0; i < job.applied_students.length; i++) {
          if (job.applied_students[i].sql_student_id === student_id) {
            status = job.applied_students[i].application_status;
            application_id = job.applied_students[i]._id;
            break;
          }
        }
        if (status === 'Withdrawn') {
          withdrawBtn = true;
        }
        return (
          <Card border-width='10px' style={{ width: '100%', color: 'black' }}>
            <Card.Body>
              <div className='row'>
                <div className='col'>
                  <div class='d-flex'>
                    <div class='pull-left'>
                      <Card.Img
                        variant='top'
                        class='building-icon'
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACmpqZFRUVCQkLa2totLS3y8vJlZWUfHx9xcXHIyMgpKSnx8fE/Pz+Pj49VVVUJCQnCwsLq6uoUFBSurq7R0dH4+PhRUVFfX1+VlZWBgYEyMjKIiIhra2t5eXmgoKAZGRm2trbZ2dk3Nzfj4+M48jMoAAAEBklEQVR4nO3d6XqiMBSAYW1r3RcUt45t1er93+JMRwkawulRJI34fT95Auk7TF0wxVqNiIiIiIh+ve2Tp8a/JRzUPbX8LeGzL2ELIUKEPwijqgsHjfKa9UIQvpQ4w/y16sImwpJDWDyEZZcRzvcTof08GSeN+ld6wOCE3XokVH9Kxo2kcfVe3xwwQKHYiVCqjdBfCBHer7D1ZvXpFMZDe9zLvQi39sCGU9jLHLBzL8KpPXDmFLbn9jiE3kNoQpiE0HsITQiTEHoPoQlhEkLvqd89fbmFmQPejfC9Oz6r++QWju1xoxzhYnx13VKEeV19FaNAu8oLnxEiRHjW+nzH3AIW9uVHbvOx2Uz7AH8UjmZXtCtDePOKPOM/V174glARwuIhlEKoKStsipl3vHN53MnxMkL1ruUIu3FPaGPe+7fa0rhd+nNmhduNtGt88mqhHKH8Ckr5unQjvcefylOc/N1CwELxKgZChAh1wsWnVcspjDr2uJVauLR3HXkVXr3a5FMtnNm7dr0Ky7zmfRRmLoOOEV4VQhPCJIQ1hAgvDaEJYRLCGkKEl1Z0tcn9Ct/21p9kb93CL2vYvqUWTu1dn7wK86rOVQyECBGGK1wn4xbyuICFE/l2T41k3FgcNk2fJ7PChjzFvmThzQvvE9Jbh1AKoSaExUMohVBTRjhbDYRW5p1xZyeNW4irTcQpXkNZbSK/amO1CUKECBXC3Whx1ujZKYwWVqO2Wjiwpxh4FbLa5P6vCCNEiBDhIYSaEJoQJiGsIUR4aY8rrP5qk7V9c+exW2jfObr/oRZu7SmmXoWO+zu7hPXYGhVHamHeFFynQYjw4YXrZJz8uUUUsHD/PhR6N5cAp9Kw4Zu02mQmT8FqkwtDWDyEUgg1ISweQqlyhOvFSCp5Pu63llJDczyHcChOsUxXqpQj/CO/pkqW0E7kYSnIIWzJ+6av+H5XGJcljBEiRHgUvq6sNk5hvLPHqYWRvecq9imMJvbId6ewYw9rtrXC18y11g+v5/BaYV8vbNr7IrwqhGkIjyH8DqHZgFATwjSExxB+h9BsQKjpcYVRw7pj8/zPzYUT+z7TfoWZN+DtWwvzpgjsOk0BYV4IESL0IVzKU5QtnHbEkufJIsK1OMNn2Z89KSsiVIdQU1nCD7OhqkLOoa6QhdU/hwh1IdTEI01unEOzoarC6p9DhLpCFvJ7qAuhJoS5PbyQRxpdIQs5h7oQauJ/aW6Pew6b9jmc+xfOT74X5Otwr8JB4+K6m8MPbn+XyewgXKYbetaGCzr+dKdfhJJZHO5ocrw7w2mOTT+Ut0fu9suncB0ru8LeJbx8qoBSCa/41wwm3TlEGHL8Hv6vKX9FSOBlFsMREREREZGX/gIAA/VAN9vp3wAAAABJRU5ErkJggg=='
                      ></Card.Img>
                    </div>
                    <div class='col-md-10'>
                      <Card.Title>
                        {/*`/student/interview/list/${value.id}`*/}
                        <div
                          className='ml-3'
                          style={{ color: '#505863', font: '12px' }}
                        >
                          {job.title}
                        </div>
                      </Card.Title>
                      <div className='d-flex flex-row'>
                        <div className='ml-3' style={{ color: '#404040' }}>
                          {job.companyName} -
                        </div>
                        <div className='ml-3' style={{ color: '#7f7f7f' }}>
                          {job.city}, {job.state}
                        </div>
                      </div>
                      <div
                        className='ml-3'
                        style={{
                          color: '#7f7f7f',
                          font: '7px',
                          boxSizing: 'border-box',
                        }}
                      >
                        Application Status: {status}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col'>
                  <Button
                    variant='success'
                    onClick={this.updateApplicantStatus}
                    style={{ float: 'right', marginRight: '5mm' }}
                    size='sm'
                    value='Withdrawn'
                    name={application_id}
                    disabled={withdrawBtn}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      });
    }

    return (
      <div>
        <StudentNavbar />

        <br />
        <br />

        <div className='row'>
          <div
            className='col-4'
            style={{ paddingLeft: '2cm', paddingRight: '1cm' }}
          >
            <SideBarStudent />
          </div>
          <div className='col-8' style={{ borderLeft: '1px solid #e6e6e6' }}>
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              My Job Applications{' '}
            </h4>
            <hr />
            <div className='col-8' style={{ borderLeft: '1px solid #e6e6e6' }}>
              {jobsTab}
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default AppliedJobs;
