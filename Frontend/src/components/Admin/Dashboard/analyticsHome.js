import Navbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import ApexChart from './mostReviewed';
import TopRated from './topRated';
import TopCeo from './topCeo';
import TopStudents from './topStudents';
import ReviewsPerday from './reviewsPerday';
import TopVisits from './topVisits';
import '../../../Admin.css';
import AdminLoginCheck from '../adminLoginCheck';

class AnalyticsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyRating: [],
    };
  }

  render() {
    return (
      <React.Fragment>
        <AdminLoginCheck />
        <Navbar />

        <div class='row'>
          <div class='col-md-4'>
            <div>
              <h3>
                <b>Number of reviews today:</b>
              </h3>
              <ReviewsPerday></ReviewsPerday>
            </div>
          </div>
          <div class='col-md-4'>
            <div>
              <h3>
                <b>Top 5 most rated companies:</b>
              </h3>
              <TopRated></TopRated>
            </div>
          </div>
          <div class='col-md-4'>
            <div>
              <h3>
                <b>Top 5 most reviewed companies: </b>
              </h3>
              <ApexChart></ApexChart>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-md-4'>
            <div>
              <h3>
                <b>Top 10 most viewed companies:</b>
              </h3>
              <TopVisits></TopVisits>
            </div>
          </div>
          <div class='col-md-4'>
            <div>
              <h3>
                <b>Top 10 CEO's:</b>
              </h3>
              <TopCeo></TopCeo>
            </div>
          </div>
          <div class='col-md-4'>
            <div>
              <h3>
                <b>Top 5 students based on total accepted reviews made:</b>
              </h3>
              <TopStudents></TopStudents>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsHome;
