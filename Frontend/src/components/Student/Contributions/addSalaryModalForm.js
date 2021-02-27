import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import backendServer from "../../../webConfig"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertNewSalaryDetails } from '../../../store/actions/studentSalaryAction';



class AddSalaryModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }
      handleSaveChanges = (e) => {
        e.preventDefault();
        const data = {
            sql_student_id: localStorage.getItem("sql_student_id"),
            company: this.state.company_name,
            base_salary: this.state.base_salary,
            currency: this.state.currency,
            bonus: this.state.bonus,
            job_title: this.state.job_title,
            year_of_experience: this.state.yoe,
            location: this.state.location,
        }
        this.props.insertNewSalaryDetails(data);
      }

    render(){
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(this.props.status === "Inserted Successfully"){
            success.message = "Successfully added your salary details."
            setTimeout(function() {window.location = '/student/contributions/salaries'}, 1500);
        } else if(this.state.server_status === 500){
            error.message = "Unable to make changes."
            setTimeout(function() {window.location = '/student/contributions/salaries'}, 2000);
        }

        const ModalFormContent =
        <Modal 
        show={this.props.show}
        onHide={this.props.onHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add Salary</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <Form.Label style={{fontWeight: "600"}}>Salary Details</Form.Label>

            
            <div class='row'>
                <div class='col-8'> 
                <Form.Group>
            <Form.Label>Base Salary</Form.Label>
            <Form.Control type='number' name='base_salary' onChange={this.handleChange} placeholder="Base salary" />
            </Form.Group>
                </div>
                <div class='col-4'>
                <Form.Group>
            <Form.Label>Currency</Form.Label>
            <Form.Control type='text' name='currency' onChange={this.handleChange} placeholder="USD, GBP..." />
            </Form.Group>
                </div>
            </div>

            <Form.Group>
            <Form.Label>Bonus</Form.Label>
            <Form.Control type='number' name='bonus' onChange={this.handleChange} placeholder="Bonus" />
            </Form.Group>

            <br />

            <Form.Label style={{fontWeight: "600"}}>Job Details</Form.Label>
            <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control type='text' name='company_name' onChange={this.handleChange} placeholder="Company name" />
            </Form.Group>

                <Form.Group>
            <Form.Label>Job Title</Form.Label>
            <Form.Control type='text' name='job_title' onChange={this.handleChange} placeholder="Job title" />
            </Form.Group>
                <div class='row'>
                <div class='col-6'> 
                <Form.Group>
            <Form.Label>Years of Experience</Form.Label>
            <Form.Control type='number' name='yoe' onChange={this.handleChange} placeholder="Years" />
            </Form.Group>
                </div>
                <div class='col-6'>
                <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type='text' name='location' onChange={this.handleChange} placeholder="Place" />
            </Form.Group>
                </div>
            </div>
            </Form>

        </Modal.Body>
      
        <Modal.Footer>   
          <Button onClick={this.handleSaveChanges} style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}}>Add Salary</Button>
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

AddSalaryModalForm.propTypes = {
    insertNewSalaryDetails: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
  };
  
const mapStateToProps = (state) => ({
    salary: state.salary,
    status: state.salary.status
  });

const mapDispatchToProps = (dispatch) => {
    return {
      insertNewSalaryDetails: (data) => dispatch(insertNewSalaryDetails(data)),
        
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(AddSalaryModalForm);