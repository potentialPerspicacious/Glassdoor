import Navigationbar from '../../Student/Navbar/navbar_student';
import React, { Component } from 'react';
import { CardImg, Button } from 'react-bootstrap';
import Comp from '../component';
import CompanyOverview from '../CompanyOverview/companyOverview';
import ReviewTab from '../Reviews/ReviewTab';
import AddSalary from '../Salary/AddSalary';
import JobsTab from '../Jobs/jobsTab';
import Interview from '../Interview/InterviewList';
import Answers from '../Interview/InterviewAnswers';
import PhotosTab from '../Photos/photosTab';
import backendServer from '../../../webConfig';

class HomeTabs extends Component {
  constructor(props) {
    super(props);

    this.loadComp = this.loadComp.bind(this);
    console.log('props:', this.props);
    if (this.props.location.category) {
      if (this.props.location.category === 'reviews') {
        console.log('in if condition');
        this.state = {
          loadComponent: (
            <ReviewTab
              companyName={this.props.location.companyName}
            ></ReviewTab>
          ),
        };
      } else if (this.props.location.category === 'overview') {
        this.state = {
          loadComponent: (
            <CompanyOverview
              companyID={this.props.location.companyID} companyName={this.props.location.companyName}
            ></CompanyOverview>
          ),
        };
      } else if (this.props.location.category === 'salaries') {
        this.state = {
          loadComponent: (
            <AddSalary
              companyName={this.props.location.companyName}
            ></AddSalary>
          ),
        };
      }
    } else if (this.props.location.category === 'interviews') {
      this.state = {
        loadComponent: (
          <Interview id={this.props.location.companyID}></Interview>
        ),
      };
    } else if (this.props.location.category === 'answers') {
      this.state = {
        loadComponent: <Answers state={this.props.location.state}></Answers>,
        showInterviewBtn: 1,
      };
    } else if (this.props.location.category === 'photos') {
      this.state = {
        loadComponent: (
          <PhotosTab
            companyID={this.props.location.companyID}
            companyName={this.props.location.companyName}
          ></PhotosTab>
        ),
      };
    } else {
      this.state = {
        loadComponent: <Comp str='This is Overview'></Comp>,
      };
    }
  }

  componentWillReceiveProps(nextProp) {
    console.log('Received: ', nextProp);
    if (
      nextProp.location.category &&
      nextProp.location.category === 'answers'
    ) {
      this.setState({
        loadComponent: <Answers state={nextProp.location.state}></Answers>,
      });
    }
  }

  componentDidMount() {
    if (
      this.props.location.category &&
      this.props.location.category === 'interviews'
    ) {
      this.setState({
        loadComponent: (
          <Interview id={this.props.location.companyID}></Interview>
        ),
      });
    }

    if (
      this.props.location.category &&
      this.props.location.category === 'answers'
    ) {
      this.setState({
        loadComponent: <Answers state={this.props.location.state}></Answers>,
      });
    }
  }
  loadComp(param, tag = 'na') {
    console.log('Button clicked', param, tag);
    this.setState({
      loadComponent: param,
    });
    this.forceUpdate();
  }

  render() {
    // TODO add image link
    var imgSrc = `${backendServer}company/imageUpload/${this.props.location.filename}`;
    let loadComponent = null;
    if (this.state && this.state.loadComponent) {
      loadComponent = this.state.loadComponent;
    }
    return (
      <React.Fragment>
        <Navigationbar />
        <div style={{ margin: '5px' }}>
          <div class='jumbotron' style={{ paddingBottom: '0px' }}>
            <div class='row'>
              <div
                class='col-xs-3 card profilePic'
                style={{ position: 'absolute' }}
              >
                <card>
                  <CardImg
                    style={{ height: '200px', width: '175px' }}
                    src={imgSrc}
                    className='profileImg'
                  />
                </card>
              </div>
              <div class='col-xs-4 profileName' style={{ marginLeft: '200px' }}>
                <h1>
                  <b>{this.props.location.companyName}</b>
                </h1>

                <br />

                <Button
                  onClick={() =>
                    this.loadComp(
                      <CompanyOverview
                        companyID={this.props.location.companyID} companyName={this.props.location.companyName}
                      ></CompanyOverview>
                    )
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Overview{' '}
                </Button>
                <Button
                 onClick={() =>
                  this.loadComp(
                    <JobsTab
                      companyName={this.props.location.companyName}
                    ></JobsTab>
                  )
                }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Jobs{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(
                      <ReviewTab
                        companyName={this.props.location.companyName}
                      ></ReviewTab>
                    )
                  }
                  href=''
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Reviews{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(
                      <Interview
                        id={this.props.location.companyID}
                      ></Interview>,
                      'interviews'
                    )
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Interviews{' '}
                </Button>
                <Button
                  onClick={() =>
                    this.loadComp(
                      <AddSalary
                        companyName={this.props.location.companyName}
                      ></AddSalary>
                    )
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Salaries{' '}
                </Button>
                <Button
                  class='tab_button'
                  onClick={() =>
                    this.loadComp(
                      <PhotosTab
                        companyID={this.props.location.companyID}
                        companyName={this.props.location.companyName}
                      ></PhotosTab>
                    )
                  }
                  style={{
                    backgroundColor: 'transparent',
                    color: 'green',
                    border: 'none',
                    borderLeft: '1px solid #e6e6e6',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  Photos{' '}
                </Button>
              </div>
            </div>
          </div>
          {/* <div class='row' style={{ marginLeft: '10px' }}>
            <div
              class='col-xs-3'
              style={{
                textAlign: 'left',
                height: '100%',
                marginLeft: '40%',
                marginTop: '5%',
              }}
            ></div>
            <hr />
          </div> */}
        </div>
        {loadComponent}
      </React.Fragment>
    );
  }
}

export default HomeTabs;
