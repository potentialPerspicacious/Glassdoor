import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_student';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import backendServer from '../../../webConfig';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';

class AddInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.AddQATag = this.AddQATag.bind(this);
    this.onDifficultySelect = this.onDifficultySelect.bind(this);
    this.onOfferSelect = this.onOfferSelect.bind(this);
    this.ThumbsDown = this.ThumbsDown.bind(this);
    this.ThumbsUp = this.ThumbsUp.bind(this);
    this.Minus = this.Minus.bind(this);

    this.state = {
      difficulty_option: [
        { value: 'Very Easy', key: 1 },
        { value: 'Easy', key: 2 },
        { value: 'Average', key: 3 },
        { value: 'Difficult', key: 5 },
      ],
      offer_option: [
        { value: 'No', key: 1 },
        { value: 'Yes, but I declined', key: 2 },
        { value: 'Yes, and I accepted', key: 3 },
      ],
      qaCount: 1,
      upColor: 'grey',
      upOpacity: '0.5',
      minusColor: 'grey',
      minusOpacity: '0.5',
      downColor: 'grey',
      downOpacity: '0.5',
      visualExp: '',
    };
  }

  ThumbsUp = (e) => {
    this.setState({
      upColor: 'green',
      upOpacity: '1',
      minusColor: 'grey',
      minusOpacity: '0.5',
      downColor: 'grey',
      downOpacity: '0.5',
      visualExp: 'Positive',
    });
  };
  ThumbsDown = (e) => {
    this.setState({
      downColor: 'red',
      downOpacity: '1',
      upColor: 'grey',
      upOpacity: '0.5',
      minusColor: 'grey',
      minusOpacity: '0.5',
      visualExp: 'Negative',
    });
  };
  Minus = (e) => {
    this.setState({
      minusColor: 'yellow',
      minusOpacity: '1',
      upColor: 'grey',
      upOpacity: '0.5',
      downColor: 'grey',
      downOpacity: '0.5',
      visualExp: 'Neutral',
    });
  };

  componentWillMount() {
    this.setState({
      difficulty_option: [
        { value: 'Very Easy', key: 1 },
        { value: 'Easy', key: 2 },
        { value: 'Average', key: 3 },
        { value: 'Difficult', key: 4 },
      ],
      offer_option: [
        { value: 'No', key: 1 },
        { value: 'Yes, but I declined', key: 2 },
        { value: 'Yes, and I accepted', key: 3 },
      ],
      qaCount: 1,
      interview_added: 0,
    });
  }

  AddQATag = (e) => {
    let qaCountVal = 0;
    if (this.state && this.state.qaCount) {
      qaCountVal = this.state.qaCount;
    }
    qaCountVal++;
    this.setState({
      qaCount: qaCountVal,
    });
  };

  changeHandler = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDifficultySelect = (e, x) => {
    this.setState({
      difficulty: x.key,
    });
  };

  onOfferSelect = (e, x) => {
    this.setState({
      offer_status: x.value,
    });
  };

  handleCheckboxChange(e) {
    this.setState({ workType: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let qaList = [];
    for (let i = 0; i < this.state.qaCount; i++) {
      let qa = {
        question: this.state['question' + i],
        answer: this.state['answers' + i],
      };
      qaList.push(qa);
    }
    const interviewData = {
      companyName: this.state.companyName,
      overall_experience: this.state.visualExp,
      job_title: this.state.job_title,
      description: this.state.description,
      difficulty: this.state.difficulty,
      offer_status: this.state.offer_status,
      qa: qaList,
      sql_student_id: localStorage.getItem('sql_student_id'),
    };
    console.log(interviewData);
    axios
      .post(`${backendServer}student/interview/add/`, interviewData, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          alert('Interview added');
          this.setState({
            interview_added: 1,
          });
        }
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  }

  render() {
    let qaTag = null;
    let redirectVar = null;

    if (this.state && this.state.interview_added) {
      redirectVar = <Redirect to='/student/contributions/interviews' />;
    }
    if (this.state && this.state.qaCount) {
      let nameList = [];
      for (let i = 0; i < this.state.qaCount; i++) {
        nameList.push(i);
      }
      qaTag = nameList.map((name) => {
        return (
          <div>
            {redirectVar}
            <Form.Group>
              <Form.Control
                as='textarea'
                aria-label='With textarea'
                required={true}
                type='text'
                name={'question' + name}
                onChange={this.changeHandler}
                placeholder='Q:What is the one thing that they asked you?'
              ></Form.Control>
              <Form.Label
                style={{
                  fontSize: '12px',
                  padding: '5px 0px 0px 12px',
                  color: '#858c94',
                }}
              >
                5 word minimum
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as='textarea'
                aria-label='With textarea'
                type='text'
                name={'answers' + name}
                onChange={this.changeHandler}
                placeholder='How did you answer this question?(Optional)'
              ></Form.Control>
            </Form.Group>
          </div>
        );
      });
    }
    var upColor = this.state.upColor;
    let downColor = this.state.downColor;
    let minusColor = this.state.minusColor;

    let downOpacity = this.state.downOpacity;
    var upOpacity = this.state.upOpacity;
    let minusOpacity = this.state.minusOpacity;

    console.log(
      upColor,
      downColor,
      minusColor,
      upOpacity,
      minusOpacity,
      downOpacity
    );
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-5 ml-5 mb-5 mt-3'>
              <h4 style={{ color: '#3BB143', float: 'left' }}>
                Tell us about a recent job interview
              </h4>
              <br />
              <hr className='mb-3'></hr>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    <strong>Employer *</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='companyName'
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Rate Overall Experience *</strong>
                  </Form.Label>
                  <div>
                    <div className='d-flex flex-row'>
                      <Button
                        variant='link'
                        style={{ textDecoration: 'none' }}
                        onClick={this.ThumbsUp}
                      >
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          style={{
                            verticalAlign: 'middle',
                            color: upColor,
                            opacity: upOpacity,
                            marginBottom: '2px',
                          }}
                          size='2x'
                        />
                      </Button>
                      <Button
                        variant='link'
                        style={{ textDecoration: 'none' }}
                        onClick={this.Minus}
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{
                            verticalAlign: 'middle',
                            color: minusColor,
                            opacity: minusOpacity,
                          }}
                          size='2x'
                        />
                      </Button>
                      <Button
                        variant='link'
                        style={{ textDecoration: 'none' }}
                        onClick={this.ThumbsDown}
                      >
                        <FontAwesomeIcon
                          icon={faThumbsDown}
                          style={{
                            verticalAlign: 'middle',
                            color: downColor,
                            opacity: downOpacity,
                            marginTop: '10px',
                          }}
                          size='2x'
                          onClick={this.ThumbsDown}
                        />
                      </Button>
                    </div>
                    <Form.Label
                      style={{
                        fontSize: '12px',
                        padding: '5px 0px 0px 12px',
                        color: '#858c94',
                        marginLeft: '54px',
                      }}
                    >
                      {this.state.visualExp}
                    </Form.Label>
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Job Title *</strong>
                  </Form.Label>
                  <Form.Control
                    required={true}
                    type='text'
                    name='job_title'
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Describe the Interview Process *</strong>
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    aria-label='With textarea'
                    required={true}
                    type='text'
                    name='description'
                    onChange={this.changeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Interview Difficulty *</strong>
                  </Form.Label>
                  <Multiselect
                    required={true}
                    options={this.state.difficulty_option}
                    displayValue='value'
                    singleSelect
                    name='difficulty'
                    onSelect={this.onDifficultySelect}
                    style={{
                      multiselectContainer: { width: '100%', fontSize: '16px' },
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Did you get an offer? *</strong>
                  </Form.Label>
                  <Multiselect
                    required={true}
                    options={this.state.offer_option}
                    displayValue='value'
                    singleSelect
                    name='offer_status'
                    onSelect={this.onOfferSelect}
                    style={{
                      multiselectContainer: { width: '100%', fontSize: '16px' },
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <strong>Interview Questions *</strong>
                  </Form.Label>
                  {qaTag}
                </Form.Group>
                <ButtonGroup aria-label='First group' className='mt-2'>
                  <Button variant='success' onClick={this.AddQATag}>
                    Add a Question
                  </Button>
                </ButtonGroup>
                <div className='d-flex flex-row-reverse'>
                  <ButtonGroup aria-label='Second group' className='mt-2'>
                    <Button variant='success' type='submit'>
                      Submit
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddInterview;
