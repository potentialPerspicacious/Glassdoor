import axios from 'axios';
import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import backendServer from "../../../webConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import {Checkbox, FormControlLabel} from '@material-ui/core';


class AddResumeModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
          status: {},
          server_status: {},
          resume: null,
          is_primary: false
        }
    }

    handleCheckBox = (e) => {
        this.setState({
            [e.target.name]: e.target.checked,
        });
    }

    handleFileSelected = (e) => {
        this.setState({
            resume: e.target.files[0]
        });
    }

    handleUploadFile = (e) => {
        e.preventDefault();
        const form_data = new FormData() 
        form_data.append('file', this.state.resume)
        form_data.append('is_primary', this.state.is_primary)
        axios.post(`${backendServer}student/addResume/${localStorage.getItem("sql_student_id")}`, form_data,
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
        success.message = "Successfully uploaded the resume."
        setTimeout(function() {window.location = '/student/resume'}, 1500);
    } else if(this.state.server_status === 500){
        error.message = "Unable to upload the resume."
        setTimeout(function() {window.location = '/student/resume'}, 2000);
    }

        const ModalFormContent =
        <Modal 
        show={this.props.addResumeShow}
        onHide={this.props.addResumeOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Upload Resume</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <div className="mb-3 center" style={{width: "50%", margin: "0 auto"}}>
            <Form.File id="formcheck-api-regular">
            <Form.File.Label  ><FontAwesomeIcon style={{marginLeft: '2.25cm', padding: ""}} icon={faUpload} size='3x' />
            <t style={{fontSize: "15px", marginLeft: "1.65cm"}}>pdf|doc|docx</t>    
            </Form.File.Label>

            <Form.File.Input onChange={this.handleFileSelected} style={{display:"inline-block", padding: "5px"}} accept=".pdf,.doc,.docx" title=''/>
            </Form.File>
            <FormControlLabel
            style={{marginLeft: '2mm', marginTop: "2mm"}}
            control={
            <Checkbox
            name="is_primary"
            style={{color: 'green', marginRight:"1px"}}
            onChange={this.handleCheckBox}
            />}
            label="Select this as primary"
            />  
            </div>
            </Form>

        </Modal.Body>
      
        <Modal.Footer>   
          <Button onClick={this.handleUploadFile} variant='success'>Upload Resume</Button>
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

export default AddResumeModalForm;