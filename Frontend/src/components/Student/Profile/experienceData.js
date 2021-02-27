import React, {Component} from 'react'
import ExperienceDisplay from './displayExperience'
import { connect } from 'react-redux';

class ExperienceData extends Component{
    constructor(props){
        super(props)
        this.state = {
            experience: []
        }
        this.experienceData = this.experienceData.bind(this);
        // this.getExperienceProps();
    }
    componentWillMount = () => {
        setTimeout(() => {
            this.setState({
                experience: this.props.studentProfile_data.experience
            })
          }, 800);

    }
    experienceData = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.experience && this.state.experience.length > 0) {
            items = this.state.experience
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <ExperienceDisplay experience={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    render(){
        let section, renderOutput = [];
        if (this.state && this.state.experience && this.state.experience.length > 0) {
            section = this.experienceData(this.state.experience);
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

export default connect(mapStateToProps)(ExperienceData);