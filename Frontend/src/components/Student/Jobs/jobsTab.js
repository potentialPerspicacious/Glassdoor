import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
import ReactPaginate from 'react-paginate';
import ScaleLoader from "react-spinners/ScaleLoader";
import JobList from './jobList';

class JobsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_jobs: [],
      inputValue: '',
      offset: 0,
      company_jobs: [],
      perPage: 5,
      currentPage: 0,
      loading: true
    }
    this.companyJobs = this.companyJobs.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getJobs();
  }

  getJobs = () => {
    console.log("function called.")
    setTimeout(() => {
      axios.get(`${backendServer}student/job/${this.props.companyName}`,
      {headers: { Authorization: `${localStorage.getItem("token")}` }})
        .then(response => {
          console.log(response)
          const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.state.company_jobs = []
          this.state.student_jobs = response.data
          this.setState({
            company_jobs: this.state.company_jobs.concat(slice),
            pageCount: Math.ceil(response.data.length / this.state.perPage),
            loading: false
          });
        })
    }, 800)
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage)
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.getJobs()
    });

  };

  companyJobs = () => {
    console.log("this is called")
    var itemsRender = [], items, item;
    if (this.state && this.state.company_jobs && this.state.company_jobs.length > 0) {
      items = this.state.company_jobs
      if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
          item = <JobList company_jobs={items[i]} />;
          itemsRender.push(item);
        }
      }
      console.log(itemsRender)
      return itemsRender;
    }
  };
  searchChangeHandler = (e) => {
    console.log("onchange search", e.target.value)
    this.setState({
      inputValue: e.target.value
    })
  }
  search = (event) => {
    event.preventDefault();
    const company_jobs = this.state.student_jobs.filter(job => {
      console.log("inside search", this.state.inputValue)
      console.log((job.title.toLowerCase().includes(this.state.inputValue.toLowerCase()) || job.city.toLowerCase().includes(this.state.inputValue.toLowerCase())))
      return (job.title.toLowerCase().includes(this.state.inputValue.toLowerCase()) || job.city.toLowerCase().includes(this.state.inputValue.toLowerCase()))
    })

    console.log('Result after search filter', company_jobs)

    this.setState(() => ({ company_jobs }))
  }

  render() {
    let section,
      renderOutput = [];
    if (this.state && this.state.company_jobs && this.state.company_jobs.length > 0) {
      section = this.companyJobs(this.state.company_jobs);
      renderOutput.push(section);
    } else {
      renderOutput = (
        <div class='center' style={{ position: "fixed", top: "95%", left: "30%" }}>
          <ScaleLoader
            size={50}
            color={"green"}
            loading={this.state.loading}
          />
        </div>

      )
    }
    let paginateElem = null
    if (this.state.company_jobs.length > 0) {
      paginateElem = (
        <div>
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} /></div>
      )
    }

    return (

      <div style={{ margin: 'auto', width: '50%' }}>
        <div className='col-md-12 mt-5'>
          <div className='col-md-12 mt-5' style={{ display: 'flex' }}>
            <input type='text' placeholder='Search Job Title, or City' className='mr-sm-3'
              style={{ width: '8cm' }} value={this.state.inputValue} onChange={this.searchChangeHandler} />
            <Button onClick={this.search} variant='primary'>Find Jobs</Button>
          </div>
        </div>
        <br></br>
        <div class='row'>
          {renderOutput}
        </div>
        {paginateElem}

      </div>
    )
  }

}
export default JobsTab;
