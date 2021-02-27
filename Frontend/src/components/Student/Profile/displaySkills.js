import React, {Component} from 'react';
import building_placeholder from '../images/building_placeholder.jpg'
import {Image} from 'react-bootstrap'

class SkillsDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div class="skill" style={{}}>
            {this.props.skills.skill}
            </div>
        )
    }
}
export default SkillsDisplay