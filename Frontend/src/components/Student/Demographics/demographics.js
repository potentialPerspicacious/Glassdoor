import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen } from '@fortawesome/free-solid-svg-icons'
import {Button, Image} from 'react-bootstrap'
import DemographicsModalForm from './demographicsModalForm';
import demographics_image from '../images/demographics_image.png'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentDemographics } from '../../../store/actions/studentProfileAction'
import backendServer from "../../../webConfig"
import axios from 'axios'


class StudentDemographics extends Component {
    constructor(props){
        super(props)
        this.state = {
            demographicsShow: false,
        }
        
    }
    handleClose = () => this.setState({demographicsShow: false});
    handleShow = () => this.setState({demographicsShow: true});

    componentWillMount = () => {
        this.props.getStudentDemographics()
    }

    handleDeleteDemographics = () => {
        alert("Are you sure you want to delete your demographics information?")
        axios.get(`${backendServer}student/deleteDemographics/${localStorage.getItem("sql_student_id")}`,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                status: response.data[0].STATUS,
                server_status: response.status
            })
  
        })

    }


    render() {
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(this.state.status === 'CHANGES_SAVED'){
            success.message = "Successfully deleted your demographics data."
            setTimeout(function() {window.location = '/student/demographics'}, 1500);
        } else if(this.state.server_status === 500){
            error.message = "Unable to make changes."
            setTimeout(function() {window.location = '/student/demographics'}, 2000);
        }

        let race_ethnicity_display, gender_display, sexual_orientation_display, disability_display,
        care_giver_display, veteran_status_display = null;
        if(this.props.studentDemographics_data.ethnicity === "American Indian or Alaska Native"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        } else if (this.props.studentDemographics_data.ethnicity === "Southeast Asian"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }
        else if (this.props.studentDemographics_data.ethnicity === "Black or African American"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }
        else if (this.props.studentDemographics_data.ethnicity === "Hispanic or Latino"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }
        else if (this.props.studentDemographics_data.ethnicity === "East Asian"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }
        else if (this.props.studentDemographics_data.ethnicity === "South Asian"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }
        else if (this.props.studentDemographics_data.ethnicity === "Middle Eastern"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }

        else if (this.props.studentDemographics_data.ethnicity === "White"){
            race_ethnicity_display = (<div>
               <p>
               I identify my race or ethnicity as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }

        
        else if(this.props.studentDemographics_data.ethnicity === "Prefer Not to Say"){
            race_ethnicity_display = (<div>
               <p>
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.ethnicity}</span>
               </p>
            </div>)
        }
        else {
            race_ethnicity_display = (
            <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add race/ethnicity
            </span>
            </Button>)
        }

        if(this.props.studentDemographics_data.gender === ("Man")){
            gender_display = (<div>
               <p>
               I identify my gender as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.gender}</span>
               </p>
            </div>)
        } else if(this.props.studentDemographics_data.gender === ("Woman")){
            gender_display = (<div>
               <p>
               I identify my gender as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.gender}</span>
               </p>
            </div>)
        }
        else if(this.props.studentDemographics_data.gender === ("Non-Binary")){
            gender_display = (<div>
               <p>
               I identify my gender as:  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.gender}</span>
               </p>
            </div>)
        }
         else if(this.props.studentDemographics_data.gender === "Prefer Not to Say"){
            gender_display = (<div>
               <p>
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.gender}</span>
               </p>
            </div>)
        } 
        else {
            gender_display = (
            <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add gender
            </span>
            </Button>)
        }
        if(this.props.studentDemographics_data.sexual_orientation === 'No'){
            sexual_orientation_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.sexual_orientation}</span>
               , I am not a member of the LGBTQ+ community
               </p>
            </div>)
        } else if(this.props.studentDemographics_data.sexual_orientation === 'Yes'){
            sexual_orientation_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.sexual_orientation}</span>
               , I am a member of the LGBTQ+ community
               </p>
            </div>)
        } else if(this.props.studentDemographics_data.sexual_orientation === 'Prefer Not to Say'){
            sexual_orientation_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.sexual_orientation}</span>
               </p>
            </div>)
        }  
        
        else {
            sexual_orientation_display = (
            <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add sexual orientation
            </span>
            </Button>)
        }

        if(this.props.studentDemographics_data.disability === 'No'){
            disability_display = (<div>
               <p>
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.disability}</span>
               , I do not have a disability
               </p>
            </div>)
        } else if(this.props.studentDemographics_data.disability === 'Yes'){
            disability_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.disability}</span>
               , I do have a disability
               </p>
            </div>)
        }  
        else if(this.props.studentDemographics_data.disability === 'Prefer Not to Say'){
            disability_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.disability}</span>
               </p>
            </div>)
        }  else {
            disability_display = (
            <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add disability
            </span>
            </Button>)
        }


        if(this.props.studentDemographics_data.parent_caregiver === "Yes, as a Parent or Guardian of a child/children"){
            care_giver_display = (<div>
               <p>
               <span style={{fontWeight: 'bold'}}> Yes</span>
               , I am a parent or guardian of a child/children
               </p>
            </div>)
        }
        else if(this.props.studentDemographics_data.parent_caregiver === 'Yes, as a Caregiver of an ill, disabled or elderly family member'){
            care_giver_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> Yes</span>
               , I am a caregiver of an ill, disabled or elderly family member
               </p>
            </div>)
        }  else if(this.props.studentDemographics_data.parent_caregiver === 'No'){
            care_giver_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> No</span>
               , I do not have responsibilities as a parent or caregiver
               </p>
            </div>)
        }   else if(this.props.studentDemographics_data.parent_caregiver === 'Prefer Not to Say'){
            care_giver_display = (<div>
               <p>  
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.parent_caregiver}</span>
               </p>
            </div>)
        }  
         else {
            care_giver_display = (
            <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add parent/care giver
            </span>
            </Button>)
        }

        if(this.props.studentDemographics_data.veteran_status === 'No'){
            veteran_status_display = (<div>
               <p>
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.veteran_status}</span>
               , I am not a US military veteran
               </p>
            </div>)
        } else if(this.props.studentDemographics_data.veteran_status === 'Yes'){
            veteran_status_display = (<div>
               <p>
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.veteran_status}</span>
               , I am a US military veteran
               </p>
            </div>)
        } else if(this.props.studentDemographics_data.veteran_status === 'Prefer Not to Say'){
            veteran_status_display = (<div>
               <p>
               <span style={{fontWeight: 'bold'}}> {this.props.studentDemographics_data.veteran_status}</span>
               </p>
            </div>)
        }  
        else {
            veteran_status_display = (
            <Button variant='link' style={{textDecoration: 'none'}} onClick={this.handleShow}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{marginLeft:"1mm"}}>
            Add vetertan status
            </span>
            </Button>)
        }
        return (
            <div>
                <StudentNavbar />
                <DemographicsModalForm demographicsShow={this.state.demographicsShow} demographicsOnHide={this.handleClose} />

                <br />
                <br />

                <div className='row'>
                    <div className="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}> 
                    <SideBarStudent />
                    </div>
                    <div className="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                    <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Demographics  </h4>
                    <hr />
                    <h6 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Help End Inequality  </h6>
                    <div className='row'>
                    <div className='col-6'>
                        <span style={{fontSize: '15px'}}>
                    Shine a light on inequities in the workplace. Anonymously share your demographics to help pinpoint pay and diversity disparities.
                    Providing your demographic information is optional and, if provided, it will not be shared with employers. This information will be collected and used in accordance with our Privacy Policy.           
                        </span>
                    </div>
                    <div className = 'col-5'>
                    <Image src={demographics_image} style={{ width:"8cm"}} />
                    </div>
                    </div>

                    <div className='row'>
                        <div className="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Race/Ethnicity  </h5>
                        </div>
                        <div className='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{color:"gray"}} icon={faPen} size='' />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div className='col col-8'>
                        {race_ethnicity_display}
                        </div>
                        <br />

                    
                        <div className='row'>
                        <div className="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Gender  </h5>
                        </div>
                        <div className='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{color:"gray"}} icon={faPen} size='' />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div className='col col-8'>
                            {gender_display}
                        </div>
                        <br />



                        <div className='row'>
                        <div className="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Sexual Orientation  </h5>
                        </div>
                        <div className='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{color:"gray"}} icon={faPen} size='' />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div className='col col-8'>
                        {sexual_orientation_display}
                        </div>
                        <br />

                        <div class='row'>
                        <div class="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Disability  </h5>
                        </div>
                        <div class='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div class='col col-8'>
                            {disability_display}
                        </div>
                        <br />
                        <br />


                        <div class='row'>
                        <div class="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Parent or Caregiver  </h5>
                        </div>
                        <div class='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div class='col col-8'>
                        {care_giver_display}
                        </div>
                        <br />
                        <br />

                        <div class='row'>
                        <div class="col">
                        <h5 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Veteran Status  </h5>
                        </div>
                        <div class='col'>
                        <Button variant='link' onClick={this.handleShow} style={{float: 'right', marginRight: '5mm'}} size='sm'>
                        <FontAwesomeIcon style={{marginTop:"", color:"gray"}} icon={faPen} size="sm" />
                        </Button>
                        </div>
                        </div>
                    <hr />
                    <div class='col col-8'>
                        {veteran_status_display}
                        </div>
                        <br />
                        <br />
                        <div>
                        {error.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-danger'>{error.message}</div>}
                        {success.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-success'>{success.message}</div>}
                        </div>
                        <Button onClick={this.handleDeleteDemographics} variant='danger'>Delete Demographics</Button>
                        <br />
                        <br />



                    </div>
                </div>
            </div>
        ) 
    }
}

StudentDemographics.propTypes = {
    getStudentDemographics: PropTypes.func.isRequired,
    studentDemographics_data: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    studentDemographics_data: state.studentProfile.payload,
  });
  
  export default connect(mapStateToProps, { getStudentDemographics })(StudentDemographics);