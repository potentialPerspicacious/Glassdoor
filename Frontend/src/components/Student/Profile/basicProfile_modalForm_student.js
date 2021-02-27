import axios from 'axios';
import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import { connect } from 'react-redux';
import backendServer from "../../../webConfig"

class BasicProfileModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            status: {},
            server_status: {}
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
            first_name: this.state.first_name || this.props.studentProfile_data.first_name,
            last_name: this.state.last_name || this.props.studentProfile_data.last_name,
            job_title: this.state.job_title || this.props.studentProfile_data.job_title,
            city: this.state.city || this.props.studentProfile_data.city,
            address: this.state.address || this.props.studentProfile_data.address,
            email: this.state.email || this.props.studentProfile_data.email,
            state: this.state.state || this.props.studentProfile_data.state,
            zip: this.state.zip || this.props.studentProfile_data.zip,
            phone_number: this.state.phone_number || this.props.studentProfile_data.phone_number,
            website: this.state.website || this.props.studentProfile_data.website
        }
        axios.post(`${backendServer}student/basicProfile/${localStorage.getItem("sql_student_id")}`, data,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            console.log(response)
            this.setState({
                status: response.data[0].STATUS,
                server_status: response.status
            })

        })
        
    }

    render(){
        let details = (this.props.studentProfile_data)
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        if(this.state.status === 'CHANGES_SAVED'){
            success.message = "Successfully saved the details."
            setTimeout(function() {window.location = '/student/profile'}, 1500);
        } else if(this.state.server_status === 500){
            error.message = "Unable to make changes."
            setTimeout(function() {window.location = '/student/profile'}, 2000);
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
          <Modal.Title>Add Basic Profile</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
                <div class ='row'>
                    <div className='col-6'>
                    <Form.Group controlId="formBasicEmail">
                    < Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name='first_name' 
                    onChange={this.handleChange}
                    placeholder="First name" defaultValue={details.first_name} />
                    </Form.Group>
                    </div>
                    <div className='col-6'>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name='last_name' 
                    onChange={this.handleChange}
                    placeholder="Last name" defaultValue={details.last_name}/>
                    </Form.Group>
                    </div>
                </div>


                <Form.Group controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name='job_title' 
                onChange={this.handleChange}
                placeholder="Job title" defaultValue={details.job_title}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name='city' 
                onChange={this.handleChange}
                placeholder="Location" defaultValue={details.city}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" name='email' 
                onChange={this.handleChange}
                placeholder="Email address" defaultValue={details.email}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name='address' 
                onChange={this.handleChange}
                placeholder="Address" defaultValue={details.address}/>
                </Form.Group>

                <div class='row'>
                    <div class='col-4'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name='city' 
                onChange={this.handleChange}
                placeholder="City" defaultValue={details.city}/>
                </Form.Group>
                    </div>

                    <div class='col-4'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>State</Form.Label>
                <Form.Control type="email" name='state' 
                onChange={this.handleChange}
                placeholder="State" defaultValue={details.state}/>
                </Form.Group>
                    </div>

                    <div class='col-4'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" name='zip'
                onChange={this.handleChange}
                placeholder="Zipcode" defaultValue={details.zip}/>
                </Form.Group>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-6'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="email" name='phone_number'
                onChange={this.handleChange}
                placeholder="Phone" defaultValue={details.phone_number}/>
                </Form.Group>
                    </div>

                    <div class='col-6'>
                    <Form.Group controlId="formBasicEmail">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" name='website' 
                onChange={this.handleChange}
                placeholder="Website" defaultValue={details.website}/>
                </Form.Group>
                    </div>
                </div>



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
    studentProfile_data: state.studentProfile.payload,
  });
  
export default connect(mapStateToProps)(BasicProfileModal);