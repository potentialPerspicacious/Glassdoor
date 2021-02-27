import axios from 'axios';
import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import backendServer from "../../../webConfig"



class ExperienceModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            monthOptions: [{value: 'January'},
            {value: 'February'},
            {value: 'March'},
            {value: 'April'},
            {value: 'May'},
            {value: 'June'},
            {value: 'July'},
            {value: 'August'},
            {value: 'September'},
            {value: 'October'},
            {value: 'November'},
            {value: 'December'},],
            start_month: {},
            end_month: {}

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
      }
    _onClickStartMonth = (e) => {
        this.setState({
            start_month: e.value,
        });
      }
    _onClickEndMonth = (e) => {
        this.setState({
            end_month: e.value,
        });
      }
      handleSaveChanges = (e) => {
        e.preventDefault();
        const data = {
          title: this.state.title,
          company_name: this.state.company_name,
          location: this.state.location,
          start_month: this.state.start_month,
          start_year: this.state.start_year,
          end_month: this.state.end_month,
          end_year: this.state.end_year,
          description: this.state.description
        }
        axios.post(`${backendServer}student/addExperience/${localStorage.getItem("sql_student_id")}`, data,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                status: response.data,
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
            success.message = "Successfully saved the details."
            setTimeout(function() {window.location = '/student/profile'}, 1500);
        } else if(this.state.server_status === 500){
            error.message = "Unable to make changes."
            setTimeout(function() {window.location = '/student/profile'}, 2000);
        }

        const ModalFormContent =
        <Modal 
        show={this.props.experienceShow}
        onHide={this.props.experienceOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' name='title' onChange={this.handleChange} placeholder="Title" />
            </Form.Group>

            <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control type='text' name='company_name' onChange={this.handleChange} placeholder="Name" />
            </Form.Group>

            <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type='text' name='location' onChange={this.handleChange} placeholder="Location" />
            </Form.Group>

            <div class='row'>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>Start Month</Form.Label>
                    <Dropdown 
                    onChange={this._onClickStartMonth}
                    placeholder='Month'
                    options = {this.state.monthOptions}
                    />
                    </Form.Group>

                </div>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control type='text' name='start_year' onChange={this.handleChange} placeholder='Year' />
                    </Form.Group>
       
                </div>
            </div>

            <div class='row'>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>End Month</Form.Label>
                    <Dropdown 
                    placeholder='Month' onChange={this._onClickEndMonth}
                    options = {this.state.monthOptions}
                    />
                    </Form.Group>

                </div>
                <div class='col-4'>
                    <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control type='text' name='end_year' onChange={this.handleChange} placeholder='Year' />
                    </Form.Group>
       
                </div>
            </div>

            <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' name='description' 
            onChange={this.handleChange}
            placeholder="Description" rows={5} />
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

export default ExperienceModalForm