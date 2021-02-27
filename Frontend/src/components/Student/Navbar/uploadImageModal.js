import axios from 'axios';
import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import backendServer from "../../../webConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import {Checkbox, FormControlLabel} from '@material-ui/core';


class UploadImageModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
          status: {},
          server_status: {},
          image: null,
        }
    }

    handleCheckBox = (e) => {
        this.setState({
            [e.target.name]: e.target.checked,
        });
    }

    handleFileSelected = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    }

    handleUploadFile = (e) => {
        e.preventDefault();
        const form_data = new FormData() 
        form_data.append('file', this.state.image)
        axios.post(`${backendServer}student/addProfilePicture/${localStorage.getItem("sql_student_id")}`, form_data,
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
        success.message = "Successfully uploaded the profile picture."
        setTimeout(function() {window.location = '/student/profile'}, 1500);
    } else if(this.state.server_status === 500){
        error.message = "Unable to upload the image."
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
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <div className="mb-3 center" style={{width: "50%", margin: "0 auto"}}>
            <Form.File id="formcheck-api-regular">
            <Form.File.Label  ><FontAwesomeIcon style={{marginLeft: '2.25cm', padding: ""}} icon={faUpload} size='3x' />
            <t style={{fontSize: "15px", marginLeft: "1.9cm"}}>jpg|png|gif</t>    
            </Form.File.Label>

            <Form.File.Input onChange={this.handleFileSelected} style={{display:"inline-block", padding: "5px"}} accept=".jpg,.png,.gif" title=''/>
            </Form.File>
            </div>
            </Form>

        </Modal.Body>
      
        <Modal.Footer>   
          <Button onClick={this.handleUploadFile} variant='success'>Upload Image</Button>
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

export default UploadImageModalForm;