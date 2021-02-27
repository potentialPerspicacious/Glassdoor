import React, {Component} from 'react';
import building_placeholder from '../images/building_placeholder.jpg'
import {Image} from 'react-bootstrap'

class ExperienceDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div class="row" style={{padding: "0px 20px 10px 20px"}}>
                <div class='col-xs-2'>
                    <Image src={building_placeholder} thumbnail style={{width: "2cm"}} />
                </div>
            <div style={{marginTop: '5px'}} class='col-9'>
                <h5>{this.props.experience.title}</h5>
                <div style={{fontSize: '15px'}}>
                <a style={{textDecoration: 'none'}} href=''> {this.props.experience.company_name}</a>
                <p>{this.props.experience.location} <br/>{this.props.experience.start_month} {this.props.experience.start_year} - {this.props.experience.end_month} {this.props.experience.end_year} </p>
                <p style={{textAlign: 'justify'}}> {this.props.experience.description} </p>
                </div>
                <hr />
            </div>
            </div>
      
        )
    }
}
export default ExperienceDisplay