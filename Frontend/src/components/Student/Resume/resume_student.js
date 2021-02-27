import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
import AddResumeModalForm from './addResumeModalForm'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentProfile } from '../../../store/actions/studentProfileAction'
import ResumeDisplay from './displayResume';



class StudentResume extends Component {
    constructor(props){
        super(props)
        this.state = {
            addResumeModal: false,
            resumes: []
        }
        
    }
    handleResumeModalClose = () => this.setState({addResumeModal: false});
    handleResumeModalShow = () => this.setState({addResumeModal: true});


    componentDidMount = () => {
        this.props.getStudentProfile()
        setTimeout(() => {
            this.setState({
                resumes: this.props.studentProfile_data.resumes.sort((a, b) =>
                (a.is_primary < b.is_primary) ? 1 : -1)
            })
          }, 800);
    }
    resumeData = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.resumes && this.state.resumes.length > 0) {
            items = this.state.resumes
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <ResumeDisplay resumes={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    render() {
        let section, renderOutput = [];
        if (this.state && this.state.resumes && this.state.resumes.length > 0) {
            section = this.resumeData(this.state.resumes);
            renderOutput.push(section);
                } else {
                    renderOutput = (<div style={{padding:"10px 10px 10px 10px", color: "green", fontWeight: "300"}}>
                        Please upload your recent resumes to show here.
                    </div>)
                }
        return (
            <div>
                <StudentNavbar />
                <br />
                <br />

                <div className='row'>
                    <div class="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}> 
                    <SideBarStudent />
                    </div>
                    <div class="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                    <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Manage Resumes 
                        <Button variant='link' style={{textDecoration: 'none', float: 'right', marginRight: '10mm'}} 
                        onClick={this.handleResumeModalShow}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        <AddResumeModalForm addResumeShow={this.state.addResumeModal} addResumeOnHide={this.handleResumeModalClose} />
                        </h4>                   
                        
                     < hr />
                     {renderOutput}
                </div>
                
                </div>
               
            </div>
        ) 
    }
}

StudentResume.propTypes = {
    getStudentProfile: PropTypes.func.isRequired,
    studentProfile_data: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    studentProfile_data: state.studentProfile.payload,
  });
  
  export default connect(mapStateToProps, { getStudentProfile })(StudentResume);