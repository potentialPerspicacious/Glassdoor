import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../../Student/Navbar/navbar_company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllJobs } from '../../../store/actions/companyJobsAction';
import ReactPaginate from 'react-paginate';
import ScaleLoader from 'react-spinners/ScaleLoader';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alljobs: [],
      showModal: false,
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: null,
      loading: true,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const args = localStorage.getItem('name');
    this.props.getAllJobs(args);
    setTimeout(() => {
      this.setState({
        alljobs: this.props.jobs,
        loading: false,
      });
    }, 500);
  }

  handleOpenModal(arg) {
    let jobdata = this.props.jobs.filter((job) => job._id === arg);
    this.setState({
      showModal: true,
      jobdata: jobdata[0],
      job_id: arg,
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

  render() {
    let renderOutput = [];

    if (this.state && this.state.alljobs && this.state.alljobs.length > 0) {
      const slice = this.state.alljobs.slice(
        this.state.offset,
        this.state.offset + this.state.perPage,
      );
      var paginationElement = (
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={<span className='gap'>...</span>}
          pageCount={
            Math.ceil(this.props.jobs.length / this.state.perPage) > 0
              ? Math.ceil(this.props.jobs.length / this.state.perPage)
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
        console.log(slice[i]);
        const job_id = slice[i]._id;

        renderOutput.push(
          <div className='container' style={{ paddingRight: '60%' }}>
            <div className='col-md-12'>
              <Card.Title>
                <a href='#' onClick={() => this.handleOpenModal(job_id)}>
                  Job Title - {slice[i].title}
                </a>
                <Modal
                  isOpen={this.state.showModal}
                  contentLabel='Minimal Modal Example'>
                  <h4 className='ml-3' style={{ color: ' #d0312d' }}>
                    Job Details
                  </h4>
                  {this.state.jobdata && (
                    <Card.Title style={{ marginLeft: '15px' }}>
                      {this.state.jobdata.title}
                    </Card.Title>
                  )}
                  <Card.Body>
                    {this.state.jobdata && (
                      <React.Fragment>
                        <p>
                          <strong>Company Name</strong> -{' '}
                          {this.state.jobdata.companyName}
                        </p>
                        <p>
                          <strong>Description</strong> -{' '}
                          {this.state.jobdata.description}
                        </p>
                        <p>
                          <strong>Responsibilities</strong> -
                          {this.state.jobdata.responsibilities}
                        </p>
                        <p>
                          <strong>Qualification</strong> -{' '}
                          {this.state.jobdata.qualification}
                        </p>
                        {this.state.jobdata.industry && (
                          <p>
                            <strong>Industry</strong> -{' '}
                            {this.state.jobdata.industry}
                          </p>
                        )}
                        {this.state.jobdata.country && (
                          <p>
                            <strong>Country</strong> -{' '}
                            {this.state.jobdata.country}
                          </p>
                        )}
                        {this.state.jobdata.workType && (
                          <p>
                            <strong>Work Type</strong> -{' '}
                            {this.state.jobdata.workType}
                          </p>
                        )}
                        {this.state.jobdata.address && (
                          <p>
                            <strong>Address</strong> -{' '}
                            {this.state.jobdata.address}
                          </p>
                        )}
                        {this.state.jobdata.city && (
                          <p>
                            <strong>City</strong> - {this.state.jobdata.city}
                          </p>
                        )}
                        {this.state.jobdata.state && (
                          <p>
                            <strong>State</strong> - {this.state.jobdata.state}
                          </p>
                        )}
                        {this.state.jobdata.zipcode && (
                          <p>
                            <strong>Zipcode</strong> -{' '}
                            {this.state.jobdata.zipcode}
                          </p>
                        )}
                        {this.state.jobdata.posted_date && (
                          <p>
                            <strong>Posted Date</strong> -{' '}
                            {this.state.jobdata.posted_date}
                          </p>
                        )}
                      </React.Fragment>
                    )}
                  </Card.Body>
                  <br />
                  <br />
                  <button className='mt-3 ml-3' onClick={this.handleCloseModal}>
                    Close Modal
                  </button>
                </Modal>
                <Card.Body>
                  {slice[i].applied_students && (
                    <Link
                      to={{
                        pathname: '/company/jobs/applicantdetails',
                        state: {
                          job_id: slice[i]._id,
                          title: slice[i].title,
                        },
                      }}>
                      <h6>
                        <a href='#' style={{ color: 'black' }}>
                          No of Applicants - {slice[i].applied_students.length}
                        </a>{' '}
                      </h6>
                    </Link>
                  )}

                  {slice[i].industry && <h6>Industry - {slice[i].industry}</h6>}
                  {slice[i].posted_date && (
                    <h6>Posted date - {slice[i].posted_date}</h6>
                  )}
                  <h6>
                    {slice[i].city && <span>{slice[i].city},</span>}
                    {slice[i].state && <span> {slice[i].state}</span>}
                  </h6>
                </Card.Body>
              </Card.Title>
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
                All Jobs
              </h3>
              <span style={{ float: 'right' }}>
                <Link
                  to={{
                    pathname: `/company/addjob`,
                  }}>
                  <Button variant='success'>Add New Job</Button>
                </Link>
              </span>
            </div>
            {renderOutput}
            <center style={{ paddingLeft: '12%' }}>{paginationElement}</center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Jobs.propTypes = {
  getAllJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
});

export default connect(mapStateToProps, { getAllJobs })(Jobs);
