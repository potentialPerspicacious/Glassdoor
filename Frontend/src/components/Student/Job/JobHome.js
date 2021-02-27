import React, { Component } from 'react';
import StudentNavbar from '../Navbar/navbar_student';
import { Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import backendServer from '../../../webConfig';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';
import JobDetails from './JobDetails';
import ReactPaginate from 'react-paginate';

class JobHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      allJobs: [],
      filterJobs: [],
    };
    this.onClick = this.onClick.bind(this);
    this.onPostDateFilter = this.onPostDateFilter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onJobTypeFilter = this.onJobTypeFilter.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    const slice = this.state.filterJobs.slice(
      offset,
      offset + this.state.perPage
    );
    this.setState({
      currentPage: selectedPage,
      offset: offset,
      showJobs: slice,
      curJob: slice[0],
    });
  };

  onFocus = (e) => {
    console.log('focus');
    e.target.value = '';
    console.log(e);
  };

  onChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClick = (e, job) => {
    this.setState({
      curJob: job,
    });
  };

  componentWillMount = () => {
    this.setState({
      job_type: [
        { value: 'All Job Types', key: 1 },
        { value: 'Full-time', key: 2 },
        { value: 'Contract', key: 3 },
        { value: 'Internship', key: 4 },
        { value: 'Temporary', key: 5 },
      ],
      posting_filter: [{ value: 'All' }, { value: 'Most Recent' }],
      curJob: null,
      minSalary: '1',
      maxSalary: '9999999',
      location_filter: '',
    });
    this.getJobs(this.props);
  };

  onFilter() {
    var filteredList = this.state.allJobs;
    console.log('here');
    console.log(this.state);
    var list = [];
    if (filteredList && filteredList.length > 0) {
      if (this.state.location_filter !== '') {
        let location_filter = this.state.location_filter.toLowerCase();
        list = filteredList.filter((job) => {
          if (
            job.address &&
            job.address.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else if (
            job.state &&
            job.state.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else if (
            job.country &&
            job.country.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else if (
            job.city &&
            job.city.toLowerCase().includes(location_filter)
          ) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        list = filteredList;
      }
      console.log('after location: ', list.length);
      if (
        this.state.minSalary !== '1' &&
        this.state.maxSalary !== '9999999' &&
        this.state.minSalary !== '' &&
        this.state.maxSalary !== ''
      ) {
        list = list.filter((job) => {
          console.log('job');
          console.log(job);
          console.log(job.fromSalary);
          console.log(job.toSalary);
          console.log(this.state);
          if (job.fromSalary && job.toSalary) {
            return (
              parseInt(job.fromSalary) >= parseInt(this.state.minSalary) &&
              parseInt(job.toSalary) <= parseInt(this.state.maxSalary)
            );
          } else {
            return false;
          }
        });
      }
    }
    console.log('after all filter:', list.length);
    if (list.length > 0) {
      const slice = list.slice(0, this.state.perPage);
      this.setState({
        filterJobs: list,
        curJob: slice[0],
        showJobs: slice,
        minSalary: '1',
        maxSalary: '9999999',
        location_filter: '',
        offset: 0,
        currentPage: 0,
      });
    } else {
      this.setState({
        filterJobs: list,
        curJob: null,
        minSalary: '1',
        maxSalary: '9999999',
        location_filter: '',
        noRecords: 1,
      });
    }
  }

  getJobs(props) {
    let axiosLink = `${backendServer}student/job/all`;
    console.log('testing');
    console.log(props.location.state);
    if (
      props.location &&
      props.location.state &&
      props.location.state.search_param !== ''
    ) {
      axiosLink = `${backendServer}student/job/search/${props.location.state.search_param}`;
    }
    console.log(axiosLink);
    axios
      .get(axiosLink, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      })
      .then((response) => {
        if (response.data && response.data === 'NO_RECORD') {
          this.setState({
            status: response.data,
          });
        } else if (response.data) {
          console.log('response.data');
          console.log(response.data);
          const slice = response.data.data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          this.setState({
            allJobs: response.data.data,
            filterJobs: response.data.data,
            curJob: slice[0],
            showJobs: slice,
            pageCount: Math.ceil(
              response.data.data.length / this.state.perPage
            ),
            img: response.data.img,
            status: '',
          });

          this.forceUpdate();
        }
      })
      .catch((error) => {
        console.log('Error');
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProp) {
    console.log('Received: ', nextProp);
    this.setState({
      minSalary: '1',
      maxSalary: '9999999',
      location_filter: '',
      filterJobs: [],
      offset: 0,
      currentPage: 0,
      allJobs: [],
      showJobs: [],
      curJob: null,
    });
    this.getJobs(nextProp);
  }

  onPostDateFilter = (e, x) => {
    // sort
    console.log('onPostDateFilter');
    console.log(x.value);
    this.setState({
      selected_posting_filter: [{ value: x.value }],
    });
    let filteredList = this.state.filterJobs;
    if (x.value !== 'All' && filteredList) {
      filteredList.sort(function (a, b) {
        return new Date(b.posted_date) - new Date(a.posted_date);
      });
      const slice = filteredList.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        filterJobs: filteredList,
        showJobs: slice,
        curJob: slice[0],
      });
    }
  };

  onJobTypeFilter = (e, x) => {
    // sort
    console.log('onJobTypeFilter');
    console.log(x.value);
    /*this.setState({
      selected_posting_filter: [{ value: x.value }],
    });*/
    let filteredList = this.state.filterJobs;
    if (x.value === 'All Job Types') {
      this.setState({
        filterJobs: this.state.allJobs,
      });
    } else if (filteredList) {
      let list = [];
      list = filteredList.filter((job) => {
        console.log('job');
        console.log(job);
        console.log(this.state);
        if (job.jobType) {
          return job.jobType === x.value;
          //job.jobType.includes(location_filter)
        } else {
          return false;
        }
      });

      const slice = filteredList.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        filterJobs: list,
        showJobs: slice,
        curJob: slice[0],
      });
    }
  };

  render() {
    let jobTag = null;
    let curJob = null;
    let paginateElem = null;

    if (this.state && this.state.curJob) {
      curJob = this.state.curJob;
    }
    let renderOutput = [];
    if (this.state.status === 'NO_RECORD') {
      renderOutput = (
        <div
          style={{
            padding: '0px 10px 10px 10px',
            color: 'gray',
            fontSize: '18px',
          }}
        >
          Your search does not match any open jobs. Keep checking back for more
          jobs.
        </div>
      );
    }
    if (this.state && this.state.showJobs && this.state.showJobs.length > 0) {
      paginateElem = (
        <div style={{ marginLeft: '5mm', marginRight: '5mm' }}>
          <hr />
          <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      );
      let count = 0;
      jobTag = this.state.showJobs.map((job) => {
        var imgSrc =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACmpqZFRUVCQkLa2totLS3y8vJlZWUfHx9xcXHIyMgpKSnx8fE/Pz+Pj49VVVUJCQnCwsLq6uoUFBSurq7R0dH4+PhRUVFfX1+VlZWBgYEyMjKIiIhra2t5eXmgoKAZGRm2trbZ2dk3Nzfj4+M48jMoAAAEBklEQVR4nO3d6XqiMBSAYW1r3RcUt45t1er93+JMRwkawulRJI34fT95Auk7TF0wxVqNiIiIiIh+ve2Tp8a/JRzUPbX8LeGzL2ELIUKEPwijqgsHjfKa9UIQvpQ4w/y16sImwpJDWDyEZZcRzvcTof08GSeN+ld6wOCE3XokVH9Kxo2kcfVe3xwwQKHYiVCqjdBfCBHer7D1ZvXpFMZDe9zLvQi39sCGU9jLHLBzL8KpPXDmFLbn9jiE3kNoQpiE0HsITQiTEHoPoQlhEkLvqd89fbmFmQPejfC9Oz6r++QWju1xoxzhYnx13VKEeV19FaNAu8oLnxEiRHjW+nzH3AIW9uVHbvOx2Uz7AH8UjmZXtCtDePOKPOM/V174glARwuIhlEKoKStsipl3vHN53MnxMkL1ruUIu3FPaGPe+7fa0rhd+nNmhduNtGt88mqhHKH8Ckr5unQjvcefylOc/N1CwELxKgZChAh1wsWnVcspjDr2uJVauLR3HXkVXr3a5FMtnNm7dr0Ky7zmfRRmLoOOEV4VQhPCJIQ1hAgvDaEJYRLCGkKEl1Z0tcn9Ct/21p9kb93CL2vYvqUWTu1dn7wK86rOVQyECBGGK1wn4xbyuICFE/l2T41k3FgcNk2fJ7PChjzFvmThzQvvE9Jbh1AKoSaExUMohVBTRjhbDYRW5p1xZyeNW4irTcQpXkNZbSK/amO1CUKECBXC3Whx1ujZKYwWVqO2Wjiwpxh4FbLa5P6vCCNEiBDhIYSaEJoQJiGsIUR4aY8rrP5qk7V9c+exW2jfObr/oRZu7SmmXoWO+zu7hPXYGhVHamHeFFynQYjw4YXrZJz8uUUUsHD/PhR6N5cAp9Kw4Zu02mQmT8FqkwtDWDyEUgg1ISweQqlyhOvFSCp5Pu63llJDczyHcChOsUxXqpQj/CO/pkqW0E7kYSnIIWzJ+6av+H5XGJcljBEiRHgUvq6sNk5hvLPHqYWRvecq9imMJvbId6ewYw9rtrXC18y11g+v5/BaYV8vbNr7IrwqhGkIjyH8DqHZgFATwjSExxB+h9BsQKjpcYVRw7pj8/zPzYUT+z7TfoWZN+DtWwvzpgjsOk0BYV4IESL0IVzKU5QtnHbEkufJIsK1OMNn2Z89KSsiVIdQU1nCD7OhqkLOoa6QhdU/hwh1IdTEI01unEOzoarC6p9DhLpCFvJ7qAuhJoS5PbyQRxpdIQs5h7oQauJ/aW6Pew6b9jmc+xfOT74X5Otwr8JB4+K6m8MPbn+XyewgXKYbetaGCzr+dKdfhJJZHO5ocrw7w2mOTT+Ut0fu9suncB0ru8LeJbx8qoBSCa/41wwm3TlEGHL8Hv6vKX9FSOBlFsMREREREZGX/gIAA/VAN9vp3wAAAABJRU5ErkJggg==';
        if (this.state.img) {
          imgSrc = `${backendServer}company/imageUpload/${this.state.img[count]}`;
        }
        count++;
        console.log('imgSrc');
        return (
          <Card border-width='10px' style={{ width: '100%', color: 'black' }}>
            <Button
              onClick={(e) => this.onClick(e, job)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <Card.Body>
                <div class='d-flex'>
                  <div class='pull-left'>
                    <Card.Img
                      variant='top'
                      class='building-icon'
                      src={imgSrc}
                    ></Card.Img>
                  </div>
                  <div class='col-md-8'>
                    <Card.Title>
                      {/*`/student/interview/list/${value.id}`*/}
                      <div
                        className='ml-3'
                        style={{
                          color: '#505863',
                          font: '12px',
                          textAlign: 'left',
                        }}
                      >
                        {job.companyName}
                      </div>
                    </Card.Title>

                    <div
                      className='ml-3'
                      style={{
                        color: '#505863',
                        font: '16px',
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}
                    >
                      {job.title}
                    </div>
                    <div className='d-flex flex-row'>
                      <div
                        className='ml-3'
                        style={{ color: '#7f7f7f', textAlign: 'left' }}
                      >
                        {job.city}, {job.state}
                      </div>
                      <div
                        className='ml-3'
                        style={{ color: '#7f7f7f', textAlign: 'left' }}
                      >
                        {job.posted_date}
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Button>
          </Card>
        );
      });
    }

    let filterTag = null;
    if (jobTag) {
      filterTag = (
        <div
          className='d-flex flex-row'
          style={{ width: '80%', marginLeft: '90px', marginBottom: '20px' }}
        >
          <Multiselect
            options={this.state.posting_filter}
            displayValue='value'
            singleSelect
            name='posting_date'
            onSelect={this.onPostDateFilter}
            style={{
              multiselectContainer: { width: '10.5cm' },
            }}
            selectedValues={this.state.selected_posting_filter}
          />
          &nbsp;&nbsp;
          <Multiselect
            required={true}
            options={this.state.job_type}
            displayValue='value'
            singleSelect
            name='job_type'
            onSelect={this.onJobTypeFilter}
            style={{
              multiselectContainer: { width: '100%', fontSize: '16px' },
            }}
          />
          &nbsp;&nbsp;
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Min Salary'
              aria-label='min_salary'
              aria-describedby='basic-addon1'
              name='minSalary'
              onChange={this.onChange}
              onFocus={this.onFocus}
              type='number'
            />
          </InputGroup>
          &nbsp;&nbsp;
          <div>-</div>
          &nbsp;&nbsp;
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Max Salary'
              aria-label='max_salary'
              aria-describedby='basic-addon1'
              name='maxSalary'
              onChange={this.onChange}
              type='number'
              onFocus={this.onFocus}
            />
          </InputGroup>
          &nbsp;&nbsp;
          <InputGroup>
            <FormControl
              placeholder='Location'
              aria-label='location'
              aria-describedby='basic-addon1'
              name='location_filter'
              onChange={this.onChange}
              onFocus={this.onFocus}
            />
          </InputGroup>
          &nbsp;&nbsp;
          <InputGroup>
            <Button onClick={this.onFilter} variant='success'>
              Filter
            </Button>
          </InputGroup>
        </div>
      );
    }
    return (
      <div>
        <StudentNavbar />
        <br />
        <br />
        <div>{renderOutput}</div>
        {filterTag}
        <div className='row'>
          <div
            class='col-5'
            style={{
              paddingLeft: '2cm',
              overflowY: 'scroll',
              overflowX: 'hidden',
              position: 'relative',
              height: '730px',
            }}
          >
            <div>
              {jobTag}
              {paginateElem}
            </div>
          </div>
          <div
            class='col-7'
            style={{
              borderLeft: '1px solid #e6e6e6',
              overflowY: 'scroll',
              overflowX: 'hidden',
              position: 'relative',
              height: '730px',
            }}
          >
            <JobDetails info={curJob} />
          </div>
        </div>
      </div>
    );
  }
}

export default JobHome;
