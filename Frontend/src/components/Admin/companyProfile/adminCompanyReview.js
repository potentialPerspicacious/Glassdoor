import Navigationbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../webConfig';
import AdminLoginCheck from '../adminLoginCheck';

class adminCompanyReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentWillMount() {
    axios
      .get(
        `${backendServer}company/reviews/${this.props.match.params.companyName}`
      )
      .then((res) => {
        this.setState({ reviews: res.data });
      });
  }

  createElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <i
          className='fa fa-star'
          aria-hidden='true'
          style={{ color: 'green' }}
        ></i>
      );
    }
    return elements;
  }

  render() {
    console.log(this.state.reviews);
    let renderReviews;
    if (this.state.reviews) {
      renderReviews = this.state.reviews.map((rev) => {
        return (
          <div>
            <div class='card bg-light p-3'>
              <hr />
              <div class='container'>
                <h4> "{rev.headline}" </h4>
                <p style={{ marginLeft: '10px' }}>
                  {rev.rating}.0 {this.createElements(rev.rating)}
                </p>
                <p style={{ marginLeft: '10px' }}> {rev.description}</p>
                <p
                  style={{
                    fontWeight: 'bold',
                    marginLeft: '10px',
                    padding: '0px',
                  }}
                >
                  Pros
                </p>
                <p style={{ marginLeft: '10px' }}>{rev.pros}</p>
                <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>Cons</p>
                <p style={{ marginLeft: '10px' }}>{rev.cons}</p>
              </div>
              <br />
            </div>
          </div>
        );
      });
    }
    return (
      <React.Fragment>
        <AdminLoginCheck />
        <Navigationbar />
        <div class='container'>
          <h3 style={{ paddingTop: '2%' }}>
            {' '}
            {this.props.match.params.companyName} Reviews
          </h3>
          <br />
          {renderReviews}
        </div>
      </React.Fragment>
    );
  }
}

export default adminCompanyReview;
