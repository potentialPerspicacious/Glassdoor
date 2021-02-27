import React, {Component} from 'react'
import EducationDisplay from './displayEducation'
import { connect } from 'react-redux';

class EducationData extends Component{
    constructor(props){
        super(props)
        this.state = {
            education: []
        }
        this.educationData = this.educationData.bind(this);
    }
    componentWillMount = () => {
        setTimeout(() => {
            this.setState({
                education: this.props.studentProfile_data.education
            })
          }, 800);

    }
    educationData = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.education && this.state.education.length > 0) {
            items = this.state.education
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <EducationDisplay education={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    render(){
        let section, renderOutput = [];
        if (this.state && this.state.education && this.state.education.length > 0) {
            section = this.educationData(this.state.education);
            renderOutput.push(section);
                }
        return(
            <div>
                {renderOutput}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  studentProfile_data: state.studentProfile.payload,
});

export default connect(mapStateToProps)(EducationData);