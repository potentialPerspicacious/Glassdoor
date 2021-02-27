import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_student';
import { Link } from 'react-router-dom';
import {Container,Col,Row, Form, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertNewReviewDetails } from '../../../store/actions/studentReviewAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp,faThumbsDown,faMinus} from '@fortawesome/free-solid-svg-icons';
class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange1 = this.handleCheckboxChange1.bind(this);
    this.handleCheckboxChange2 = this.handleCheckboxChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange1(e) {
    this.setState({ ceo_rating: e.target.value });
  }
  handleCheckboxChange2(e) {
    this.setState({ recommended: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const reviewData = {
      sql_student_id: localStorage.getItem('sql_student_id'),
      company: this.state.company,
      rating: this.state.rating,
      job_title: this.state.job_title,
      description: this.state.description,
      headline: this.state.headline,
      pros: this.state.pros,
      cons: this.state.cons,
      ceo_rating: this.state.ceo_rating,
      recommended: this.state.recommended,
    };
    console.log(reviewData);
    this.props.insertNewReviewDetails(reviewData);
    //fix redirection on submit
    console.log("review added")
  //   if(this.props.status === "Inserted Sucessfully"){
  //     alert("Inserted Sucessfully Message received");
  //     console.log("review added")
  //     //this.props.history.push('/student/contributions/reviews');
  //     setTimeout(function() {window.location = '/student/contributions/reviews'}, 1500);
  // }
  }

  render() {
    let error = {
      message: null
  }
  let success = {
      message: null
  }
  if(this.props.status === "Inserted Successfully"){
      success.message = "Successfully added your salary details."
      setTimeout(function() {window.location = '/student/contributions/reviews'}, 1500);
  } else if(this.state.server_status === 500){
      error.message = "Unable to make changes."
      setTimeout(function() {window.location = '/student/contributions/reviews'}, 2000);
  }
    return (
      <React.Fragment>
      <Navbar />
      <div className='container'>
      <div className='row'>
        <div className='col-md-5 ml-5 mb-5 mt-3'>
          <h4 style={{ color: '#3BB143', float: 'left' }}>
          Rate a Company
          </h4>
          <br />
          <br />
          <p>It only takes a minute! And your anonymous review will help other job seekers.</p>
          <hr className='mb-3'></hr>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    <strong>Company*</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='company'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    <strong>Overall Rating*</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='rating'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    <strong>Your Job Title*</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='job_title'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    <strong>Review Headline*</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='headline'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Description*</strong>
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    aria-label='With textarea'
                    required={true}
                    type='text'
                    name='description'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>            
                <Form.Group> 
                  <Form.Label>
                    <strong>Pros*</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='pros'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group> 
                  <Form.Label>
                    <strong>Cons*</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='cons'
                    onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Rate CEO Job Performance</strong>
                  </Form.Label>
                  <Form.Check
                    name='ceo_rating'
                    label='Positive'
                    value= {1}
                    onChange={this.handleCheckboxChange1}
                  />
                  <Form.Check
                    name='recommended'
                    label='Negative'
                    value={0}
                    onChange={this.handleCheckboxChange1}
                  />
                  <br></br>  
                  </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Recommend to a friend?</strong>
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    name='recommended'
                    label='Positive'
                    value= {1}
                    onChange={this.handleCheckboxChange2}
                  />
                  <Form.Check
                    name='recommended'
                    label='Negative'
                    value={0}
                    onChange={this.handleCheckboxChange2}
                  />
                  <br></br>
                  <Form.Check
                  label='I agree to the Glassdoor Terms of Use. This review of my experience at my current or former employer is truthful.'
                  />
                  </Form.Group>
                    <ButtonGroup aria-label='First group' className='mt-2'>
                  <Button variant='success' type='submit'>
                    Submit Review
                  </Button>
                </ButtonGroup>
              </Form>
              </div>
          </div>
        </div>
      </React.Fragment>

    );
  }
}

AddReview.propTypes = {
  insertNewReviewDetails: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.reviews.status,
});

export default connect(mapStateToProps, { insertNewReviewDetails })(AddReview);