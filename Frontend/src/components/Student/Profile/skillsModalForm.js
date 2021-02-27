import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios'
import { connect } from 'react-redux';
import backendServer from "../../../webConfig"

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SkillsModalForm extends Component{
    constructor(props){
        super(props)
        this.state = {
          tags: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
    componentWillMount = () => {
        setTimeout(() => {
          if(this.props.studentProfile_data.skills){
          var react_tags = this.props.studentProfile_data.skills.map(function(elm) {
              return { id: elm.skill, text: elm.skill};
           });
           this.setState({
            tags: react_tags
          })
          }
        }, 800);
    }

    handleDelete(i) {
      const { tags } = this.state;
      this.setState({
        tags: tags.filter((tag, index) => index !== i),
      });
    }
  
    handleAddition(tag) {
     this.setState(state => ({ tags: [...state.tags, tag] }));
    }
  
    handleDrag(tag, currPos, newPos) {
      const tags = [...this.state.tags];
      const newTags = tags.slice();
  
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
  
      this.setState({ tags: newTags });
    }

    enterKey = () => {
      
    }
    saveChanges = () => {
      var skillsArray = this.state.tags.map(function(elm) {
        return { skill: elm.text};
     });
     axios.post(`${backendServer}student/addSkills/${localStorage.getItem("sql_student_id")}`, skillsArray,
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
        show={this.props.skillsShow}
        onHide={this.props.skillsOnHide}
        backdrop="static"
        keyboard={false}
        centered
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Add Skills</Modal.Title>
        </Modal.Header>
      
        <Modal.Body style={{padding:"10px 30px 10px 30px"}}>
        <div class='row'>
          <div class='col-10'>
        <ReactTags
          classNames = 'tags'
          tags={this.state.tags}
          delimiters={delimiters}
          inputFieldPosition="bottom"
          placeholder="Enter a skill (Ex. MERN stack)"
          
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
        /> </div> <div class='col-2'>
          {/* <Button variant='link' style={{textDecoration: 'none'}} onClick={this.enterKey} >
          <FontAwesomeIcon icon={faPlusCircle} style={{color: 'green', marginTop: "3mm"}} size='lg' />
          </Button> */}
          </div>
         </div>
        </Modal.Body>
      
        <Modal.Footer>   
          <Button onClick={this.saveChanges} variant='success'>Save changes</Button>
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

export default connect(mapStateToProps)(SkillsModalForm);