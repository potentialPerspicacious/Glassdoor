import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_student';
//port { Link } from 'react-router-dom';
import {Container,Col,Row, Form, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertNewReviewDetails } from '../../../store/actions/companyReviewAction';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange(e) {
    this.setState({ workType: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const reviewData = {
      companyName: this.state.companyName,
      rating: this.state.rating,
      description: this.state.description,
      headline: this.state.headline,
      pros: this.state.pros,
      cons: this.state.cons,
      helpfull: this.state.helpfull,
      ceo_rating: this.state.ceo_rating,
      recommended: this.state.recommended,
    };
    console.log(reviewData);
    this.props.insertNewReviewDetails(reviewData);
  }

  render() {
    return (
        <Container className="mt-5 mb-5">                                           
                    <Row>
        <Navbar />
        <Col sm={8} md={8} lg={8}>
              <h4 style={{ color: '#3BB143', float: 'left' }}>Rate a Company</h4>
              <br />
              <hr className='mb-3'></hr>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    <strong>Company</strong>
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
                    <strong>Description</strong>
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
                    label='Approve'
                    value='true'
                    onChange={this.handleCheckboxChange}
                  />
                  <Form.Check
                    name='ceo_rating'
                    label='Disapprove'
                    value='false'
                    onChange={this.handleCheckboxChange}
                  />
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
                    value='true'
                    onChange={this.handleCheckboxChange}
                  />
                  <Form.Check
                    name='recommended'
                    label='Negative'
                    value='false'
                    onChange={this.handleCheckboxChange}
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
              
              </Col>
               
                

<Col sm={4} md={4} lg={4}>
              <p><b>Keep it Real</b><br></br>
Thank you for contributing to the community. Your opinion will help others make decisions about jobs and companies.
<br></br>
<b>Please stick to the Community Guidelines and do not post:</b><br></br>
<ul>
<li>Aggressive or discriminatory language</li>
<li>Profanities</li>
<li>Trade secrets/confidential information</li>
</ul>
Thank you for doing your part to keep Glassdoor the most trusted place to find a job and company you love. See the Community Guidelines for more details.</p>
                </Col>
                </Row>
</Container>

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
