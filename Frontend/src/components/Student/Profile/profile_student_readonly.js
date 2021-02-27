import React, { Component } from 'react';
import Navbar from '../../Student/Navbar/navbar_company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faEnvelope,
  faPhone,
  faGlobeAmericas,
  faMapMarked,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Image } from 'react-bootstrap';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import BasicProfileModal from './basicProfile_modalForm_student';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentProfile } from '../../../store/actions/studentProfileAction';
import ExperienceData from './experienceData';
import SkillsData from './skillsData';
import EducationData from './educationData';
import backendServer from '../../../webConfig';

class StudentProfileRO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      experienceShow: false,
      skillsShow: false,
      educationShow: false,
      from_salary: '',
      to_salary: '',
      tags: [],
      job_types: [],
      tags_location: [],
      tags_dreamCompany: [],
      industry_select: [],
      company_size: [],
      jobSearchStatus: '',
      studentBasic_data: null,
    };
  }

  componentWillMount = () => {
    localStorage.setItem(
      'sql_student_id',
      this.props.location.state.student_id,
    );
    this.props.getStudentProfile();

    setTimeout(() => {
      let details = this.props.studentProfile_data;
      console.log('hello');
      console.log(details);

      if (details.job_preferences) {
        var job_title1 = details.job_preferences.job_titles.map(function (elm) {
          return { id: elm.title, text: elm.title };
        });
        var job_type = details.job_preferences.job_types.map(function (elm) {
          return { type: elm.type };
        });

        this.setState({
          selected_job_search_status: this.props.studentProfile_data
            .job_preferences.job_search_status,
          tags: job_title1,
          select_job_types: job_type,
          from_salary: details.job_preferences.from_salary,
          to_salary: details.job_preferences.to_salary,
          selected_pay_period: this.props.studentProfile_data.job_preferences
            .pay_period,
        });
      }
      if (this.props.studentProfile_data.company_preferences) {
        var selected_locations = this.props.studentProfile_data.company_preferences.locations.map(
          function (elm) {
            return { id: elm.place, text: elm.place };
          },
        );
        var selected_dream_companies = this.props.studentProfile_data.company_preferences.dream_companies.map(
          function (elm) {
            return { id: elm.company_name, text: elm.company_name };
          },
        );
        var selected_industry = this.props.studentProfile_data.company_preferences.industry.map(
          function (elm) {
            return { type: elm.type };
          },
        );
        var selected_company_size = this.props.studentProfile_data.company_preferences.company_sizes.map(
          function (elm) {
            return { type: elm.size };
          },
        );
        this.setState({
          tags_location: selected_locations,
          tags_dreamCompany: selected_dream_companies,
          industry_select: selected_industry,
          company_size: selected_company_size,
          relocation: this.props.studentProfile_data.company_preferences
            .relocation,
          remote: this.props.studentProfile_data.company_preferences.remote,
        });
      }
    }, 1000);
  };

  render() {
    let details = this.props.studentProfile_data;
    let job_title,
      location,
      phone_number,
      website,
      about_me,
      experience,
      skills,
      education;
    let tags = [];
    let select_job_types = [];
    let tags_location = [];
    let industry_select = [];
    let company_size = [];
    let tags_dreamCompany = [];

    let profilePicture = null;
    if (this.state) {
      profilePicture = `${backendServer}student/getProfilePicture/${localStorage.getItem(
        'sql_student_id',
      )}`;
    }

    if (details.job_title) {
      job_title = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faBriefcase} />
          <span style={{ marginLeft: '1mm' }}>{details.job_title}</span>
        </div>
      );
    }

    if (details.city) {
      location = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faMapMarked} />
          <span style={{ marginLeft: '1mm' }}>{details.city}</span>
        </div>
      );
    }

    if (details.phone_number) {
      phone_number = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faPhone} />
          <span style={{ marginLeft: '1mm' }}>{details.phone_number}</span>
        </div>
      );
    }

    if (details.website) {
      website = (
        <div style={{ marginTop: '1.75mm' }}>
          <FontAwesomeIcon icon={faGlobeAmericas} />
          <span style={{ marginLeft: '1mm' }}>{details.website}</span>
        </div>
      );
    }
    if (details.aboutMe) {
      about_me = (
        <div
          class='col-10'
          style={{ padding: '0px 20px 0px 0px', textAlign: 'justify' }}>
          {details.aboutMe}
        </div>
      );
    }
    if (details.experience) {
      experience = <ExperienceData />;
    }

    if (details.skills) {
      skills = <SkillsData />;
    }

    if (details.education) {
      education = <EducationData />;
    }
    if (this.state.tags && this.state.tags.length) {
      tags.push(
        <div>
          <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
            What job titles are you looking for?
          </h6>
          <p>
            <strong>Job title</strong> -{' '}
          </p>{' '}
        </div>,
      );

      for (let i = 0; i < this.state.tags.length; i++) {
        tags.push(<li>{this.state.tags[i].text}</li>);
      }
    }

    if (this.state.select_job_types && this.state.select_job_types.length) {
      select_job_types.push(
        <div>
          <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
            {' '}
            What types of jobs are you open to?
          </h6>
          <p>
            <strong>Job Types</strong> -{' '}
          </p>
        </div>,
      );
      for (let i = 0; i < this.state.select_job_types.length; i++) {
        select_job_types.push(<li>{this.state.select_job_types[i].type}</li>);
      }
    }

    if (this.state.tags_location && this.state.tags_location.length) {
      tags_location.push(
        <div>
          <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
            {' '}
            Where would you prefer to work?
          </h6>
        </div>,
      );
      for (let i = 0; i < this.state.tags_location.length; i++) {
        tags_location.push(<li>{this.state.tags_location[i].text}</li>);
      }
    }

    if (this.state.industry_select && this.state.industry_select.length) {
      industry_select.push(
        <div>
          <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
            {' '}
            What industries and company sizes do you prefer?
          </h6>
        </div>,
      );
      for (let i = 0; i < this.state.industry_select.length; i++) {
        industry_select.push(<li>{this.state.industry_select[i].type}</li>);
      }
    }

    if (this.state.company_size && this.state.company_size.length) {
      company_size.push(
        <div>
          <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
            {' '}
            Company size
          </h6>{' '}
        </div>,
      );
      for (let i = 0; i < this.state.company_size.length; i++) {
        company_size.push(<li>{this.state.company_size[i].type}</li>);
      }
    }

    if (this.state.tags_dreamCompany && this.state.tags_dreamCompany.length) {
      tags_dreamCompany.push(
        <div>
          <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
            {' '}
            What are your top 5 dream companies to work for?
          </h6>
        </div>,
      );
      for (let i = 0; i < this.state.tags_dreamCompany.length; i++) {
        tags_dreamCompany.push(<li>{this.state.tags_dreamCompany[i].text}</li>);
      }
    }

    return (
      <React.Fragment>
        <Navbar />
        <br />
        <br />
        <div
          className='row'
          style={{
            marginBottom: '12cm',
          }}>
          <div
            class='col-4'
            style={{
              paddingLeft: '2cm',
              paddingRight: '1cm',
            }}>
            <Card>
              <Card.Body>
                <Image
                  src={profilePicture}
                  style={{ width: '1.5cm' }}
                  roundedCircle
                />
                <br />
                <br />
                <Card.Title>
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 'bolder',
                      fontFamily: 'helvetica',
                    }}>
                    {' '}
                    {details.first_name} {details.last_name}{' '}
                  </span>
                </Card.Title>

                <hr />
              </Card.Body>
            </Card>
          </div>
          <div class='col-8' style={{ borderLeft: '1px solid #e6e6e6' }}>
            <div class='row'>
              <div class='col'>
                <h4
                  style={{
                    fontFamily: 'helvetica',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  {' '}
                  {details.first_name} {details.last_name}{' '}
                </h4>
              </div>
              <div class='col'>
                <BasicProfileModal
                  show={this.state.showModal}
                  onHide={this.handleClose}
                />
              </div>
            </div>

            <div class='row'>
              <div class='col col-md-4'>{job_title}</div>
              <div class='col col-md-4'>
                <div style={{ marginTop: '1.75mm' }}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span style={{ marginLeft: '1mm' }}>{details.email}</span>
                </div>
              </div>
              <div class='col col-md-4'>{phone_number}</div>
            </div>

            <div class='row'>
              <div class='col col-md-4'>{location}</div>
              <div class='col col-md-4'>{website}</div>
            </div>
            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              About Me
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleAboutMeModalShow}></Button>
            </h4>
            <hr />
            {about_me}

            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Experience
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleExperienceModalShow}></Button>
            </h4>
            <hr />
            {experience}

            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Skills
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleSkillsModalShow}></Button>
            </h4>
            <hr />
            {skills}

            <br />
            <br />
            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Education
              <Button
                variant='link'
                style={{ textDecoration: 'none' }}
                onClick={this.handleEducationModalShow}></Button>
            </h4>
            <hr />
            {education}
            <br />
            <br />

            <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
              {' '}
              Job Preferences
            </h4>
            <hr />
            {this.state.selected_job_search_status && (
              <div>
                <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
                  {' '}
                  Where are you in your job search?
                </h6>
                <p>
                  Job Search Status - {this.state.selected_job_search_status}
                </p>
              </div>
            )}
            <br />

            {tags}
            <br />
            <br />

            {select_job_types}
            <br />
            <br />
            {this.state.from_salary && (
              <div>
                <h6 style={{ fontWeight: 'bold', color: '#49504C' }}>
                  What is your target salary range?
                </h6>
                <div class='row'>
                  <div class='col-md-3'>
                    <p>
                      <strong>From</strong> - ${this.state.from_salary}
                    </p>
                  </div>
                  <div class='col-md-3'>
                    <p>
                      <strong>To</strong> - ${this.state.to_salary}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div class='row'>
              <div class='col-9'>
                {this.state.selected_pay_period && (
                  <p>
                    <strong>Pay Period</strong> -{' '}
                    {this.state.selected_pay_period}
                  </p>
                )}
              </div>
            </div>
            <br />
            <br />
            <div>
              <h4 style={{ fontFamily: 'helvetica', fontWeight: 'bold' }}>
                {' '}
                Company Preferences
              </h4>
              <hr />
              {tags_location}
              <br />
              <div class='row'>
                <div class='col-4'>
                  {this.state.relocation && (
                    <FormControlLabel
                      style={{ marginTop: '3mm' }}
                      control={
                        <Checkbox
                          name='relocation'
                          color='primary'
                          style={{ color: 'green' }}
                          onChange={this.handleCheckBox}
                          checked={this.state.relocation}
                        />
                      }
                      label="I'm open to relocation"
                    />
                  )}
                </div>
                <div class='col-4'>
                  {this.state.remote && (
                    <FormControlLabel
                      style={{ marginTop: '3mm' }}
                      control={
                        <Checkbox
                          name='remote'
                          color='primary'
                          style={{ color: 'green' }}
                          onChange={this.handleCheckBox}
                          checked={this.state.remote}
                        />
                      }
                      label='I want to work remotely'
                    />
                  )}
                </div>
              </div>
              <br />

              {industry_select}
              <br />
              {company_size}
              <br />
              {tags_dreamCompany}
              <br />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

StudentProfileRO.propTypes = {
  getStudentProfile: PropTypes.func.isRequired,
  studentProfile_data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  studentProfile_data: state.studentProfile.payload,
});

export default connect(mapStateToProps, { getStudentProfile })(
  StudentProfileRO,
);
