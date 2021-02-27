import React, {Component} from 'react'
import SkillsDisplay from './displaySkills'
import { connect } from 'react-redux';

class SkillsData extends Component{
    constructor(props){
        super(props)
        this.state = {
            skills: []
        }
        this.skillsData = this.skillsData.bind(this);
        // this.getExperienceProps();
    }
    componentWillMount = () => {
        setTimeout(() => {
            this.setState({
                skills: this.props.studentProfile_data.skills
            })
          }, 800);

    }
    skillsData = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.skills && this.state.skills.length > 0) {
            items = this.state.skills
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <SkillsDisplay skills={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    render(){
        let section, renderOutput = [];
        if (this.state && this.state.skills && this.state.skills.length > 0) {
            section = this.skillsData(this.state.skills);
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

export default connect(mapStateToProps)(SkillsData);