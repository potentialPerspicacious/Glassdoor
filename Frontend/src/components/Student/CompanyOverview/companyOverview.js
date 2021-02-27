import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../webConfig';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CompanyCharts } from './Charts';
import { Col,Row,Button} from 'react-bootstrap';
import { FeaturedReview } from './FeaturedReview';
import { PositiveReview } from './PositiveReview';
import { NegativeReview } from './NegativeReview';
import {saveCompanyInfo,saveCompanyAverageRating,saveCompanyFeaturedReview,saveCompanyNegativeReview,saveCompanyPositiveReview} from '../../../store/actions/studentCompanyAction';
const qs = require('query-string');

class CompanyOverview extends Component {
  constructor(props) {
    super(props);
    console.log(('Props received overview:', props));
    this.routeParam = props.companyID;
    this.state = {
      user: {},
    };
  }
  // componentDidMount() {
  //   axios
  //     .post(`${backendServer}student/incrementVisits/${this.routeParam}`)
  //     .then((res) => {
  //       console.log('API has been hit for increment');
  //     });
  // }

componentDidMount(){
  this.incrementCount();
  this.getComapnayInfo();
  this.getAverageRating();
  this.getPositiveReview();
  this.getNegativeReview();
  this.getFeaturedReview();
}
incrementCount = () => {
  axios
    .post(`${backendServer}student/incrementVisits/${this.props.companyID}`)
    .then((res) => {
      console.log('API has been hit for increment');
    });
};
getComapnayInfo =() =>{
  axios
  .get(`${backendServer}company/profile/${this.props.companyID}`,
  {headers: { Authorization: `${localStorage.getItem("token")}` }})
  .then((res) => {
    if (res.status === 200) {
      if (res.data) {
        this.props.saveCompanyInfo(res.data);
        console.log(this.props.companyInfo);
      }
    }
  });
}
getPositiveReview = () => {
  axios
    .get(`${backendServer}company/reviews/positive/${this.props.companyName}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }})
    .then((res) => {
      if (res.status === 200) {
        if (res.data) {
          this.props.saveCompanyPositiveReview(res.data);
          console.log(this.props.company_positive);
        }
      }
    });
};

getNegativeReview = () => {
  axios
    .get(`${backendServer}company/reviews/negative/${this.props.companyName}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }})
    .then((res) => {
      if (res.status === 200) {
        if (res.data) {
          this.props.saveCompanyNegativeReview(res.data);
          console.log(this.props.company_negative);
        }
      }
    });
};
getFeaturedReview = () => {
  axios
    .get(`${backendServer}company/reviews/featured/${this.props.companyName}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }})
    .then((res) => {
      if (res.status === 200) {
        if (res.data) {
          this.props.saveCompanyFeaturedReview(res.data);
          console.log(this.props.company_featured);
        }
      }
    });
};

getAverageRating = () => {
  axios
    .get(`${backendServer}company/reviews/rating/${this.props.companyName}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }})
    .then((res) => {
      if (res.status === 200) {
        if (res.data) {
          console.log(res.data)
          this.props.saveCompanyAverageRating(res.data);
          console.log(this.props.company_avgRating);
        }
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
        style={{ color: 'green' }}
      ></i>
    );
  }
  return elements;
}
render() {
  return (
    <React.Fragment>
      <Row>
        <Col md={{ span: 8, offset: 0 }}>
            <React.Fragment>
            <div class='row w-100  mt-5 p-5  border rounded'>
            <div class='col-xs-12' style={{marginLeft: "15%"}}>
                <h5 style={{margin:"0px"}}> Website</h5>
                <p> {this.props.companyInfo.website} </p>
                <h5 style={{margin:"0px"}}> Company Size </h5>
                <p> {this.props.companyInfo.company_size} </p>
                <h5 style={{margin:"0px"}}> Company Type</h5>
                <p> {this.props.companyInfo.company_type} </p>
                <h5 style={{margin:"0px"}}> Revenue </h5>
                <p> {this.props.companyInfo.revenue} </p>
            </div>
            <div class='col-xs-3' style={{textAlign: "left", height: "100%", marginLeft: "40%", marginTop: "0%"}}>
                <div style={{marginLeft: "10px"}}>
                    <h5 style={{margin:"0px"}}> Headquarters </h5>
                    <p> {this.props.companyInfo.headquarters}</p>
                    <h5 style={{margin:"0px"}}> Industry </h5>
                    <p> {this.props.companyInfo.industry} </p>
                    <h5 style={{margin:"0px"}}> Founded </h5>
                    <p> {this.props.companyInfo.founded} </p>
                    <h5 style={{margin:"0px"}}> CEO Name</h5>
                    <p> {this.props.companyInfo.ceo_name} </p>
                </div>
            </div>
           
            <div class='col-xs-3' style={{marginLeft: "15%"}}>
                <br />
                <h5 style={{margin:"0px"}}> Mission </h5>
                <p>{this.props.companyInfo.mission}</p>
            </div>
            
                <CompanyCharts company_charts={this.props.company_avgRating}></CompanyCharts>

              <FeaturedReview
                company_featuredReview={this.props.company_featured}
              ></FeaturedReview>
              <PositiveReview
                company_positiveReview={this.props.company_positive}
              ></PositiveReview>
              <NegativeReview
                company_negativeReview={this.props.company_negative}
              ></NegativeReview>
            </div>
          </React.Fragment>
        </Col>
        <Col md={{ span: 4 }}>
          <Button variant='primary' href='/student/addreviews'>
            + Add Review
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
}

CompanyOverview.propTypes = {
  saveCompanyPositiveReview: PropTypes.func.isRequired,
  saveCompanyNegativeReview: PropTypes.func.isRequired,
  saveCompanyFeaturedReview: PropTypes.func.isRequired,
  saveCompanyAverageRating: PropTypes.func.isRequired,
  saveCompanyInfo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  company_positive: state.companyOverview.company_positive[0],
  company_negative: state.companyOverview.company_negative[0],
  company_featured: state.companyOverview.company_featured[0],
  company_avgRating: state.companyOverview.company_avgRating,
  companyInfo:state.companyOverview.companyInfo,
});


const mapDispatchToProps = (dispatch) => {
  return {
    saveCompanyPositiveReview: (data) => dispatch(saveCompanyPositiveReview(data)),
    saveCompanyNegativeReview: (data) => dispatch(saveCompanyNegativeReview(data)),
    saveCompanyFeaturedReview: (data) => dispatch(saveCompanyFeaturedReview(data)),
    saveCompanyAverageRating: (data) => dispatch(saveCompanyAverageRating(data)),
    saveCompanyInfo: (data) => dispatch(saveCompanyInfo(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverview);