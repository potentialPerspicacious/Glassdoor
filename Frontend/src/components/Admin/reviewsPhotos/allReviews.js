import Navigationbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
// import { FormInput } from 'react-native-elements'
import ReactPaginate from 'react-paginate';

class adminReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      tempUserReviews: [],
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: null,
    };
    this.handleCheckboxtypeChange = this.handleCheckboxtypeChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    axios.get(`${backendServer}admin/review/allReviews`).then((res) => {
      this.setState({ reviews: res.data, tempUserReviews: res.data });
    });
  }

  handleOnClick = (e) => {
    console.log(e.target.value);
    const data = {
      value: e.target.value,
      id: e.target.id,
    };
    console.log(data);
    axios
      .post(`${backendServer}admin/review/approve`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.location = '/admin/allReviews';
        }
      });
  };

  createElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <i
          className='fa fa-star'
          aria-hidden='true'
          style={{ color: 'green' }}></i>,
      );
    }
    return elements;
  }

  handleCheckboxtypeChange(e) {
    e.preventDefault();
    let reviewStatus_type = e.target.id;
    let filteredData = this.state.reviews.filter(
      (review) => review.approvedstatus === reviewStatus_type,
    );

    if (reviewStatus_type === 'All Reviews') {
      filteredData = this.state.reviews;
    }
    this.setState({ tempUserReviews: filteredData });
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
    let renderReviews;
    if (this.state.tempUserReviews) {
      const slice = this.state.tempUserReviews.slice(
        this.state.offset,
        this.state.offset + this.state.perPage,
      );
      var paginationElement = (
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={<span className='gap'>...</span>}
          pageCount={
            Math.ceil(this.state.tempUserReviews.length / this.state.perPage) >
            0
              ? Math.ceil(
                  this.state.tempUserReviews.length / this.state.perPage,
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
      renderReviews = slice.map((rev) => {
        let button1;
        let button2;
        if (rev.approvedstatus === 'Pending') {
          button1 = (
            <Button
              id={rev._id}
              style={{ marginRight: '5px' }}
              variant='success'
              onClick={this.handleOnClick}
              value='Approved'>
              {' '}
              Approve{' '}
            </Button>
          );
          button2 = (
            <Button
              id={rev._id}
              variant='success'
              onClick={this.handleOnClick}
              value='Rejected'>
              {' '}
              Reject{' '}
            </Button>
          );
        } else if (rev.approvedstatus === 'Rejected') {
          button1 = (
            <p style={{ color: 'red', fontSize: '20px' }}>
              <i class='fas fa-times-circle'></i>
            </p>
          );
        } else {
          button1 = (
            <p style={{ color: 'green', fontSize: '20px' }}>
              <i class='fas fa-check-square'></i>
            </p>
          );
        }

        return (
          <div>
            <br />
            <div class='card bg-light p-3'>
              <h4 style={{ paddingTop: '10px' }}> "{rev.headline}" </h4>
              <p style={{ marginLeft: '10px' }}>
                {rev.rating}.0 {this.createElements(rev.rating)}
              </p>
              <p style={{ marginLeft: '10px' }}> {rev.description}</p>
              <p
                style={{
                  fontWeight: 'bold',
                  marginLeft: '10px',
                  padding: '0px',
                }}>
                Pros
              </p>
              <p style={{ marginLeft: '10px' }}>{rev.pros}</p>
              <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>Cons</p>
              <p style={{ marginLeft: '10px' }}>{rev.cons}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p></p>
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    {button1}
                    {button2}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <React.Fragment>
        <Navigationbar />
        <div class='container'>
          <h1> All Reviews</h1>
          <div
            className='btn-group btn-group-toggle mt-3'
            data-toggle='buttons'>
            <label
              class='btn btn-outline-success rounded-pill active'
              style={{ marginRight: '10px' }}>
              <input
                type='radio'
                name='All Reviews'
                id='All Reviews'
                autocomplete='off'
                onClick={this.handleCheckboxtypeChange}
                checked
              />
              All Reviews
            </label>
            <label
              class='btn btn-outline-success rounded-pill'
              style={{ marginRight: '10px' }}>
              <input
                type='radio'
                name='Approved'
                id='Approved'
                autocomplete='off'
                onClick={this.handleCheckboxtypeChange}
              />
              Approved
            </label>
            <label
              class='btn btn-outline-success rounded-pill'
              style={{ marginRight: '10px' }}>
              <input
                type='radio'
                name='Pending'
                id='Pending'
                autocomplete='off'
                onClick={this.handleCheckboxtypeChange}
              />
              Pending
            </label>
            <label
              class='btn btn-outline-success rounded-pill'
              style={{ marginRight: '10px' }}>
              <input
                type='radio'
                name='Rejected'
                id='Rejected'
                autocomplete='off'
                onClick={this.handleCheckboxtypeChange}
              />
              Rejected
            </label>
          </div>
          {renderReviews}
          <center style={{ paddingLeft: '12%' }}>{paginationElement}</center>
        </div>
      </React.Fragment>
    );
  }
}

export default adminReview;
