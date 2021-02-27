import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_company';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getJobApplicantDetails,
  updateApplicantStatus,
} from '../../../store/actions/companyJobsAction';
import axios from 'axios';
import backendServer from '../../../webConfig';
import ReactPaginate from 'react-paginate';
import ScaleLoader from 'react-spinners/ScaleLoader';

class ApplicantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants: [],
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: null,
      loading: true,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    const args = this.props.location.state.job_id;
    this.props.getJobApplicantDetails(args);
    setTimeout(() => {
      let filteredData = this.props.applied_students.filter(
        (applicant) => applicant.application_status !== 'Withdrawn',
      );
      this.setState({
        applicants: filteredData,
        loading: false,
      });
    }, 500);
  }

  changeHandler = (e) => {
    const args = {
      _id: e.target.id,
      status: e.target.value,
    };
    console.log(args);
    this.props.updateApplicantStatus(args);

    window.location.reload();
  };

  openResume = (e) => {
    const resume_data = {};
    console.log(e.target.id);
    resume_data.resume = e.target.id;
    axios
      .post(`${backendServer}student/openResume/`, resume_data, {
        responseType: 'blob',
      })
      .then((response) => {
        let file_extension = resume_data.resume.substr(
          resume_data.resume.length - 3,
        );
        console.log(file_extension)
        if (file_extension === 'pdf') {
          var file = new Blob([response.data], { type: 'application/pdf' });
          const fileUrl = URL.createObjectURL(file);
          console.log(fileUrl);
          window.open(fileUrl);
        } else if (file_extension === 'doc') {
          var file = new Blob([response.data], { type: 'application/msword' });
          const fileUrl = URL.createObjectURL(file);
          window.open(fileUrl);
        } else {
          var file = new Blob([response.data], {
            type:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });
          const fileUrl = URL.createObjectURL(file);
          window.open(fileUrl);
        }
      });
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

  render() {
    console.log(this.state.applicants);
    let renderOutput = [];

    if (
      this.state &&
      this.state.applicants &&
      this.state.applicants.length > 0
    ) {
      const slice = this.state.applicants.slice(
        this.state.offset,
        this.state.offset + this.state.perPage,
      );
      var paginationElement = (
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={<span className='gap'>...</span>}
          pageCount={
            Math.ceil(this.props.applied_students.length / this.state.perPage) >
            0
              ? Math.ceil(
                  this.props.applied_students.length / this.state.perPage,
                )
              : 1
          }
          onPageChange={this.handlePageClick}
          forcePage={this.state.currentPage}
          containerClassName={'pagination'}
          previousLinkClassName={'previous_page'}
          nextLinkClassName={'next_page'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
        />
      );
      for (var i = 0; i < slice.length; i++) {
        console.log(slice[i].cover_file_name.split('split')[1]);
        const id = slice[i]._id;
        const filename = slice[i].resume_file_name;
        renderOutput.push(
          <div className='container' style={{ paddingRight: '60%' }}>
            <div className='col-md-12'>
              <Card.Body>
                <h6>
                  Applicant Name -{' '}
                  <Link
                    to={{
                      pathname: '/company/jobs/applicantdetails/viewapplicant',
                      state: {
                        student_id: slice[i].sql_student_id,
                      },
                    }}>
                    <a href='#'>
                      {slice[i].student_first_name} {slice[i].student_last_name}
                    </a>
                  </Link>
                </h6>
                {slice[i].resume_file_name && (
                  <h6>
                    {' '}
                    Resume -
                    <Button
                      variant='link'
                      onClick={this.openResume}
                      style={{ textDecoration: 'none' }}>
                      <h6 id={filename}>
                        {slice[i].resume_file_name.split('nameSplitter')[1]}{' '}
                      </h6>
                    </Button>
                  </h6>
                )}
                {slice[i].cover_file_name && (
                  <h6>
                    Cover Letter -
                    <Button
                      variant='link'
                      onClick={this.openResume}
                      style={{ textDecoration: 'none' }}>
                      <h6 id={slice[i].cover_file_name}>
                        {slice[i].cover_file_name.split('nameSplitter')[1]}{' '}
                      </h6>
                    </Button>
                  </h6>
                )}
                {slice[i].application_status && (
                  <h6>Application Status - {slice[i].application_status}</h6>
                )}
                <h6>
                  Change Status -{' '}
                  <select
                    id={id}
                    onChange={this.changeHandler}
                    value={this.state.value}>
                    <option value='select'>Select</option>
                    <option value='Submitted'>Submitted</option>
                    <option value='Reviewed'>Reviewed</option>
                    <option value='Initial Screening'>Initial Screening</option>
                    <option value='Interviewing'>Interviewing</option>
                    <option value='Hired'>Hired</option>
                    <option value='Rejected'>Rejected</option>
                  </select>
                </h6>
              </Card.Body>
              <hr />
            </div>
          </div>,
        );
      }
    } else {
      renderOutput = (
        <div
          class='center'
          style={{ position: 'fixed', top: '55%', left: '50%' }}>
          <ScaleLoader size={50} color={'green'} loading={this.state.loading} />
        </div>
      );
    }
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-5'>
              <h3
                style={{ color: '#028A0F', textAlign: 'center' }}
                className='pl-3'>
                Job Applicants
              </h3>
              <span style={{ float: 'right' }}>
                <Link
                  to={{
                    pathname: `/company/report/${this.props.location.state.title}`,
                  }}>
                  <Button variant='success'>View Job Statistics</Button>
                </Link>
              </span>
              <br />
            </div>
            {renderOutput}
            <center style={{ paddingLeft: '12%' }}>{paginationElement}</center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ApplicantDetails.propTypes = {
  getJobApplicantDetails: PropTypes.func.isRequired,
  updateApplicantStatus: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  applied_students: state.jobs.data.applied_students,
  status: state.jobs.status,
});

export default connect(mapStateToProps, {
  getJobApplicantDetails,
  updateApplicantStatus,
})(ApplicantDetails);
