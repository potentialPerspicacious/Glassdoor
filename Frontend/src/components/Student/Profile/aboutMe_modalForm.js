import axios from 'axios';
import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import backendServer from "../../../webConfig"
import { connect } from 'react-redux';


class AboutMeModalForm extends Component{
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
        description: this.state.description || this.props.studentProfile_data.aboutMe
      }
      axios.post(`${backendServer}student/aboutMe/${localStorage.getItem("sql_student_id")}`, data,
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
        show={this.props.aboutMeShow}
        onHide={this.props.aboutMeOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add About Me</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <Form.Label>Description</Form.Label>
            <Form.Control name='description' as='textarea' defaultValue={details.aboutMe}
            placeholder="About Me" rows={10} onChange={this.handleChange}/>
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

export default connect(mapStateToProps)(AboutMeModalForm);