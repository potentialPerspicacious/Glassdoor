import axios from 'axios';
import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';
import 'react-dropdown/style.css';
import backendServer from "../../../webConfig"
import { connect } from 'react-redux';



class DemographicsModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            raceEthnicity:[{race: 'American Indian or Alaska Native'},
            {race: 'Southeast Asian'},{race: 'Black or African American'}, 
            {race: 'Hispanic or Latino'}, {race: 'Native Hawaiian or Other Pacific Islander'},
            {race: 'East Asian'},
            {race: 'South Asian'},
            {race: 'Middle Eastern'},
            {race: 'White'},
            {race: 'Prefer Not to Say'},

            ],
            genderIdentity: [{gender: 'Man'},
            {gender: 'Woman'},
            {gender: 'Non-Binary'},
            {gender: 'Prefer Not to Say'}],

            sexualOrientation: [{orientation: 'Yes'},
            {orientation: 'No'},
            {orientation: 'Prefer Not to Say'}],

            disabilities_list: [{disability: 'Yes'},
            {disability: 'No'},
            {disability: 'Prefer Not to Say'}],

            careGiver: [{value: 'Yes, as a Parent or Guardian of a child/children'},
            {value: 'Yes, as a Caregiver of an ill, disabled or elderly family member'}, {value: "No"},
            {value: "Prefer Not to Say"}],

            veteranStatus: [{status: 'Yes'},
            {status: 'No'},
            {status: 'Prefer Not to Say'}],

        }
    }

    componentWillMount = () => {
        setTimeout(() => {
            if( (this.props.studentDemographics_data.ethnicity !== null ) && (this.props.studentDemographics_data.ethnicity !== 'null' )){
                this.setState({
                    selected_race_ethnicity: [{race: this.props.studentDemographics_data.ethnicity}],
                })
            }
            if( (this.props.studentDemographics_data.gender !== null ) && (this.props.studentDemographics_data.gender !== 'null' )){
                this.setState({
                    selected_gender_identity: [{gender: this.props.studentDemographics_data.gender}],
                })
            }
            if( (this.props.studentDemographics_data.disability !== null ) && (this.props.studentDemographics_data.disability !== 'null' )){
                this.setState({
                    selected_disabilities: [{disability: this.props.studentDemographics_data.disability}],
                })
            }
            if( (this.props.studentDemographics_data.veteran_status !== null ) && (this.props.studentDemographics_data.veteran_status !== 'null' )){
                this.setState({
                    selected_veteran_status: [{status: this.props.studentDemographics_data.veteran_status}],
                })
            }
            if( (this.props.studentDemographics_data.sexual_orientation !== null ) && (this.props.studentDemographics_data.sexual_orientation !== 'null' )){
                this.setState({
                    selected_sexual_orientation: [{orientation: this.props.studentDemographics_data.sexual_orientation}],
                })
            }
            if( (this.props.studentDemographics_data.parent_caregiver !== null ) && (this.props.studentDemographics_data.parent_caregiver !== 'null' )){
                this.setState({
                    selected_care_giver: [{value: this.props.studentDemographics_data.parent_caregiver}]
                })
            }
        }, 800)

    }

    select_race_ethnicity = (selectedList, selectedItem) => {
        this.setState({
            race_ethnicity: selectedItem.race
        })
    }
    select_gender_identity = (selectedList, selectedItem) => {
        this.setState({
            gender_identity: selectedItem.gender
        })
    }
    select_veteran_status = (selectedList, selectedItem) => {
        this.setState({
            veteran_status: selectedItem.status
        })
    }
    select_sexual_orientation = (selectedList, selectedItem) => {
        this.setState({
            sexual_orientation: selectedItem.orientation
        })
    }
    select_disabilities = (selectedList, selectedItem) => {
        this.setState({
            disabilities: selectedItem.disability
        })
    }
    select_care_giver = (selectedList, selectedItem) => {
        this.setState({
            care_giver: selectedItem.value
        })
    }


    
      handleSaveChanges = (e) => {
        e.preventDefault();
        const data = {
          race_ethnicity: this.state.race_ethnicity || this.props.studentDemographics_data.ethnicity,
          gender_identity: this.state.gender_identity || this.props.studentDemographics_data.gender,
          sexual_orientation: this.state.sexual_orientation || this.props.studentDemographics_data.sexual_orientation,
          disabilities: this.state.disabilities || this.props.studentDemographics_data.disability,
          care_giver: this.state.care_giver || this.props.studentDemographics_data.parent_caregiver,
          veteran_status: this.state.veteran_status || this.props.studentDemographics_data.veteran_status
        }
        axios.post(`${backendServer}student/addDemographics/${localStorage.getItem("sql_student_id")}`, data,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                status: response.data[0].STATUS,
                server_status: response.status
            })
  
        })
      }

    render(){
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(this.state.status === 'CHANGES_SAVED'){
            success.message = "Updated your demographics."
            setTimeout(function() {window.location = '/student/demographics'}, 1500);
        } else if(this.state.server_status === 500){
            error.message = "Unable to make changes."
            setTimeout(function() {window.location = '/student/demographics'}, 2000);
        }

        const ModalFormContent =
        <Modal 
        show={this.props.demographicsShow}
        onHide={this.props.demographicsOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Update Demographics</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <Form.Group>
            <Form.Label style={{fontSize: "13px", fontWeight: 'bold'}}>With which race and/or ethnicity do you identify?</Form.Label>
            <Multiselect 
            options = {this.state.raceEthnicity}
            displayValue = 'race'
            singleSelect
            onSelect = {this.select_race_ethnicity}
            style={ {  multiselectContainer: {width:"11.5cm"}}}
            selectedValues = {this.state.selected_race_ethnicity}
            placeholder="Race/Ethnicity"
           
                                /> 
            </Form.Group>

            <Form.Group>
            <Form.Label style={{fontSize: "13px", fontWeight: 'bold'}}>With which gender identity do you most identify?</Form.Label>
            <Multiselect 
            options = {this.state.genderIdentity}
            displayValue = 'gender'
            singleSelect
            onSelect = {this.select_gender_identity}
            style={ {  multiselectContainer: {width:"11.5cm"}}}
            selectedValues = {this.state.selected_gender_identity}
            placeholder="Gender Identity"
           
                                />            </Form.Group>

            <Form.Group>
            <Form.Label style={{fontSize: "13px", fontWeight: 'bold'}}>Do you identify as a member of the Lesbian, Gay, Bisexual, Transgender and/or Queer (LGBTQ+) community? </Form.Label>
            <Multiselect 
            options = {this.state.sexualOrientation}
            displayValue = 'orientation'
            singleSelect
            onSelect = {this.select_sexual_orientation}
            style={ {  multiselectContainer: {width:"11.5cm"}}}
            selectedValues = {this.state.selected_sexual_orientation}
            placeholder="Sexual Orientation"
           
                                />               </Form.Group>

            <Form.Group>
            <Form.Label style={{fontSize: "13px", fontWeight: 'bold'}}>
            Do you have a long-lasting or chronic condition that substantially limits one or more of your major life activities?</Form.Label>
            <Multiselect 
            options = {this.state.disabilities_list}
            displayValue = 'disability'
            singleSelect
            onSelect = {this.select_disabilities}
            style={ {  multiselectContainer: {width:"11.5cm"}}}
            selectedValues = {this.state.selected_disabilities}
            placeholder="Disability"
           
                                />    
            </Form.Group>

            <Form.Group>
            <Form.Label style={{fontSize: "13px", fontWeight: 'bold'}}>
            Do you have family responsibilities as a parent or caregiver?</Form.Label>
            <Multiselect 
            options = {this.state.careGiver}
            displayValue = 'value'
            singleSelect
            onSelect = {this.select_care_giver}
            style={ {  multiselectContainer: {width:"11.5cm"}}}
            selectedValues = {this.state.selected_care_giver}
            placeholder="Care-Giver"
           
                                />    
            </Form.Group>

            <Form.Group>
            <Form.Label style={{fontSize: "13px", fontWeight: 'bold'}}>
            Are you a US military veteran?</Form.Label>
            <Multiselect 
            options = {this.state.veteranStatus}
            displayValue = 'status'
            singleSelect
            onSelect = {this.select_veteran_status}
            style={ {  multiselectContainer: {width:"11.5cm"}}}
            selectedValues = {this.state.selected_veteran_status}
            placeholder="Veteran Status"
           
                                />    
            </Form.Group>

            </Form>

        </Modal.Body>
      
        <Modal.Footer>   
          <Button onClick={this.handleSaveChanges} variant='success'>Save changes</Button>
        </Modal.Footer>
        <div>
            {error.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-danger'>{error.message}</div>}
            {success.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-success'>{success.message}</div>}
        </div>
      </Modal>;
        return (
          <div>
            {ModalFormContent}
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    studentDemographics_data: state.studentProfile.payload,
  });
  
  export default connect(mapStateToProps)(DemographicsModalForm);