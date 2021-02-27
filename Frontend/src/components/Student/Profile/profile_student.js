import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faPen, faPlusCircle,faEnvelope, faPhone, faGlobeAmericas, faMapMarked } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
import BasicProfileModal from './basicProfile_modalForm_student'
import AboutMeModalForm from './aboutMe_modalForm'
import ExperienceModalForm from './experienceModalForm'
import SkillsModalForm from './skillsModalForm'
import EducationModalForm from './educationModalForm'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentProfile } from '../../../store/actions/studentProfileAction'
import ExperienceData from './experienceData'
import SkillsData from './skillsData'
import EducationData from './educationData'

class StudentProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            aboutMeShow: false,
            experienceShow: false,
            skillsShow: false,
            educationShow: false,
            studentBasic_data: {}
        }
        
    }
    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});

    handleAboutMeClose = () => this.setState({aboutMeShow: false});
    handleAboutMeModalShow = () => this.setState({aboutMeShow: true});

    handleExperienceClose = () => this.setState({experienceShow: false});
    handleExperienceModalShow = () => this.setState({experienceShow: true});

    handleSkillsClose = () => this.setState({skillsShow: false});
    handleSkillsModalShow = () => this.setState({skillsShow: true});

    handleEducationClose = () => this.setState({educationShow: false});
    handleEducationModalShow = () => this.setState({educationShow: true});



    componentWillMount = () => {
        this.props.getStudentProfile()
        localStorage.setItem("contri-list", 'salaries')
    }

    render() {
        let details = this.props.studentProfile_data
        let job_title, location, phone_number, website, about_me, experience, skills, education

        if(details.job_title === null){
            job_title = (<Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow} >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add job title
            </span>
            </Button>)
        } else {
            job_title = (<div style={{marginTop: '1.75mm'}}><FontAwesomeIcon icon={faBriefcase} />
            <span style={{marginLeft:"1mm"}}>
            {details.job_title}
            </span></div>)
        }

        if(details.city === null){
            location = (<Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow} >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add location
            </span>
            </Button>)

        } else {
            location = (<div style={{marginTop: '1.75mm'}}><FontAwesomeIcon icon={faMapMarked} />
            <span style={{marginLeft:"1mm"}}>
            {details.city}
            </span></div>)
        }

        if(details.phone_number === null){
            phone_number = (<Button variant='link' style={{textDecoration: 'none', marginLeft:"12mm"}} onClick={this.handleShow} >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add phone number
            </span>
            </Button>)

        } else {
            phone_number = (<div style={{marginTop: '1.75mm'}}><FontAwesomeIcon icon={faPhone} />
            <span style={{marginLeft:"1mm"}}>
            {details.phone_number}
            </span></div>)
        }

        if(details.website === null){
            website = (<Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add website
            </span>
            </Button>)

        } else {
            website = (<div style={{marginTop: '1.75mm'}}><FontAwesomeIcon icon={faGlobeAmericas} />
            <span style={{marginLeft:"1mm"}}>
            {details.website}
            </span></div>)
        }
        if(!details.aboutMe){
            about_me = (<Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleAboutMeModalShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{color:"black", marginLeft:"1.5mm"}}> 
            Add an introduction about yourself with a brief summary of your experience.
            </span>
            </Button>)

        } else {
            about_me = (
            <div class='col-10' style={{padding: "0px 20px 0px 0px", textAlign: 'justify'}}>
            {details.aboutMe}
            </div>)
        }
        if(!details.experience || details.experience.length === 0){
            experience = (<Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleExperienceModalShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{color:"black", marginLeft:"1.5mm"}}> 
            Add your experience and qualification to be an assest to your potentian employer.
            </span>
            </Button>)
        } else {
            experience = (<ExperienceData />)
        }

        if(!details.skills || details.skills.length === 0){
            skills = (<Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleSkillsModalShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{color:"black", marginLeft:"1.5mm"}}> 
            Add your skills to show your employer that you have the ability to succeed in the role.
            </span>
            </Button>)
        } else {
            skills = (<SkillsData />)
        }

        if(!details.education || details.education.length === 0){
            education = (<Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleEducationModalShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{color:"black", marginLeft:"1.5mm"}}> 
            Add your education background to help employers understand more about your fit for the role.
            </span>
            </Button>)
        } else {
            education = (<EducationData />)
        }

        return (
            <div>
                <StudentNavbar />
                <br />
                <br />

                <div className='row'>
                    <div class="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}> 
                    <SideBarStudent />
                    </div>
                    <div class="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                        <div class='row'>
                        <div class="col">
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold", textTransform: "uppercase"}}> {details.first_name} {details.last_name}  </h4>
                        </div>
                        <div class='col'>
                        <Button style={{float: 'right', marginRight:"1mm"}} variant='link' onClick={this.handleShow} >
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        <BasicProfileModal show={this.state.showModal} onHide={this.handleClose} />
                        </div>
                        </div>


                    <div class='row'>
                        <div class='col col-md-4'>
                        {job_title}
                        </div>
                        <div class='col col-md-4'>
                        <div style={{marginTop: '1.75mm'}}><FontAwesomeIcon icon={faEnvelope} />
                        <span style={{marginLeft:"1mm"}}>
                        {details.email}
                        </span></div>
                        </div>
                        <div class='col col-md-4'>
                        {phone_number}
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col col-md-4'>
                        {location}
                        </div>
                        <div class='col col-md-4'>
                        {website}
                        </div>
                    </div>
                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> About Me  
                        <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleAboutMeModalShow} >
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        <AboutMeModalForm aboutMeShow={this.state.aboutMeShow} aboutMeOnHide={this.handleAboutMeClose} />
                        </h4>
                        <hr />
                        {about_me}

                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Experience 
                        <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleExperienceModalShow}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        <ExperienceModalForm experienceShow={this.state.experienceShow} experienceOnHide={this.handleExperienceClose} />
                        </h4>
                        <hr />
                        {experience}

                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Skills  
                        <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleSkillsModalShow}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        <SkillsModalForm skillsShow={this.state.skillsShow} skillsOnHide={this.handleSkillsClose} />

                        </h4>
                        <hr />
                        {skills}
                    
                    <br />
                    <br />
                        <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Education  
                        <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleEducationModalShow}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        <EducationModalForm educationShow={this.state.educationShow} educationOnHide={this.handleEducationClose} />

                        </h4>
                        <hr />
                        {education}
                        <br />
                        <br />

                </div>
                </div>
            </div>
        ) 
    }
}

StudentProfile.propTypes = {
    getStudentProfile: PropTypes.func.isRequired,
    studentProfile_data: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    studentProfile_data: state.studentProfile.payload,
  });
  
  export default connect(mapStateToProps, { getStudentProfile })(StudentProfile);