import axios from 'axios';
import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import backendServer from "../../../webConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import ScaleLoader from "react-spinners/ScaleLoader";



class UploadImageModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
          status: {},
          server_status: {},
          images: [],
          loading: false

        }
        this.fileName = this.fileName.bind(this);

    }

    ListFiles = (props) => {
        return <li>{props.file_name}</li> 
    } 

    handleFileSelected = (e) => {
        if(e.target.files.length === 1){
            let newImage = this.state.images.concat(e.target.files[0])
            this.setState({
                images: newImage,
            });
        } else if (e.target.files.length > 1){
            var newImage; var img_arr = [];
            for(var i=0;i<e.target.files.length;i++){
                newImage = this.state.images.concat(e.target.files[i])
                img_arr.push(newImage[0])
            }
            this.setState({
                images: img_arr,
            });

        }


    }

    handleUploadFile = (e) => {
        e.preventDefault();
        const form_data = new FormData() 
        for (const key of Object.keys(this.state.images)) {
            form_data.append('company_images', this.state.images[key])
        }
        form_data.append('sql_student_id', localStorage.getItem('sql_student_id'))
        form_data.append('sql_company_id', this.props.companyID)
        form_data.append('company_name', this.props.companyName)
        this.setState({loading: true})
        axios.post(`${backendServer}student/addCompanyPictures/${this.props.companyID}`, form_data,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            console.log(response)
            this.setState({
                loading: false,
                status: response.data,
                server_status: response.status,
            })

        })
    }
        fileName = () => {
            var itemsRender = [], items, item;
            if (this.state && this.state.images && this.state.images.length > 0) {
                items = this.state.images
                if (items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        item = <this.ListFiles file_name={items[i].name}/>;
                        itemsRender.push(item);
                    }
                }
                return itemsRender;
            }
        };


    render(){
    let error = {
        message: null
    }
    let success = {
        message: null
    }
    if(this.state.status === 'CHANGES_SAVED'){
        success.message = "Successfully uploaded the images."
        setTimeout(function() {window.location = '/student/contributions/salaries'}, 1500);
    } else if(this.state.server_status === 500){
        error.message = "Unable to upload the image."
        setTimeout(function() {window.location = '/student/contributions/salaries'}, 2000);
    }
    let section, renderOutput = [];
    if (this.state && this.state.images && this.state.images.length > 0) {
        section = this.fileName(this.state.images);
        renderOutput.push(section);
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
          <Modal.Title>Upload Company Pictures</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
            <Form>
            <div className="mb-3 center" style={{width: "50%", margin: "0 auto"}}>
            <Form.File id="formcheck-api-regular">
            <Form.File.Label  ><FontAwesomeIcon style={{marginLeft: '2.25cm', padding: ""}} icon={faUpload} size='3x' />
            <t style={{fontSize: "15px", marginLeft: "1.9cm"}}>jpg|png|gif</t>    
            </Form.File.Label>

            <Form.File.Input onChange={this.handleFileSelected} name="company_images" style={{display:"inline-block", padding: "5px"}} accept=".jpg,.png,.gif" multiple/>
            </Form.File>
            <p style={{marginLeft:"1.4mm"}}>
                Selected files:   
                <i style={{fontSize: "15px"}}>
                        <ul style={{listStyleType:'none', paddingLeft: '0'}}>
                        {renderOutput}
                        </ul>
                </i> 

            </p>    
    
            </div>
            </Form>

                <div style={{marginLeft: "5.25cm"}}>
                <ScaleLoader
                size={50}
                color={"green"}
                loading={this.state.loading} />   
                </div>

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