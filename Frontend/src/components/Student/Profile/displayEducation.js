import React, {Component} from 'react';
import education_placeholder from '../images/education_placeholder.jpg'
import {Image} from 'react-bootstrap'

class EducationDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div class="row" style={{padding: "0px 20px 10px 20px"}}>
                <div class='col-xs-2'>
                    <Image src={education_placeholder} thumbnail style={{width: "2cm"}} />
                </div>
            <div style={{marginTop: '5px'}} class='col-9'>
                <h5>{this.props.education.institution_name}</h5>
                <div style={{fontSize: '15px'}}>
                <p>{this.props.education.degree_certificate} - {this.props.education.field_of_study} <br />
                {this.props.education.location} <br/>
                {this.props.education.start_month} {this.props.education.start_year} - {this.props.education.end_month} {this.props.education.end_year} </p>
                <p style={{textAlign: 'justify'}}> {this.props.education.description} </p>
                </div>
                <hr />
            </div>
            </div>
      
        )
    }
}
export default EducationDisplay