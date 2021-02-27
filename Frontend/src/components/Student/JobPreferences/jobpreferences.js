import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import SideBarStudent from '../Navbar/sidebar_student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button, Card, InputGroup, Form} from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown';
import CurrencyInput from 'react-currency-input-field';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentProfile } from '../../../store/actions/studentProfileAction'
import backendServer from "../../../webConfig"


const KeyCodes = {
    comma: 188,
    enter: 13
  };

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class StudentJobPreferences extends Component {
    constructor(props){
        super(props)
        this.state = {
            jobSearchStatus: [{value: 'Not looking'}, 
            {value: 'Not looking, but open'}, 
            {value: 'Casually looking'},
            {value: 'Actively looking'}],

            jobTypeOptions: [{type: 'Full-time'},
            {type: 'Part-time'},
            {type: 'Contract'},
            {type: 'Internship'},
            {type: 'Temporary'},
            {type: 'Apprenticeship'},
            {type: 'Entry-level'}
         ],
         payPeriod: [{value: 'Per Year'}, {value: 'Per Month'}, {value: 'Per Hour'} ],
         companySize: [{type: '1-50'},
         {type: '51-200'},
         {type: '201-500'},
         {type: '501-1000'},
         {type: '1001-5000'},
         {type: '5001-10000'},
         {type: '10000+'},
        ],
        industry: [{type: 'Accounting & Legal'},
        {type: 'Aerospace & Defense'},
        {type: 'Agriculture & Forestry'},
        {type: 'Arts, Entertainment & Recreation'},
        {type: 'Biotech & Pharmaceuticals'},
        {type: 'Business Services'},
        {type: 'Construction, Repain and Maintenance'},
        {type: 'Consumer Service'},
        {type: 'Education'},
        {type: 'Finance'},
        {type: 'Government'},
        {type: 'Healthcare'},
        {type: 'Information Technology'},
        {type: 'Insurancee'},
        {type: 'Manufacturing'},
        {type: 'Media'},
        {type: 'Mining & Metals'},
        {type: 'Non-Profit'},
        {type: 'Oil, Gas, Energy & Utilities'},
        {type: 'Real Estate'},
        {type: 'Restaurants, Bars & Food Services'},
        {type: 'Retail'},
        {type: 'Telecommunication'},
        {type: 'Transportation & Logistics'},
        {type: 'Travel & Tourism'},
        ],  
        tags: [],
        job_types: [],
        tags_location: [],
        tags_dreamCompany: [],
        industry_select: [],
        company_size: [],
        suggestions: [{id: 'Software Engineer', text: 'Software Engineer'},
        {id: 'System Administrator', text: 'System Administrator'},
        {id: 'Data Analyst', text: 'Data Analyst'},
        {id: 'Data Scientist', text: 'Data Scientist'},
        {id: 'Network Administrator', text: 'Network Administrator'},
        {id: 'CIO', text: 'CIO'},
        {id: 'Database Administrator', text: 'Database Administrator'},
        {id: 'Computer Engineer', text: 'Computer Engineer'}
    
    ],
    suggestions_locations: [{id: 'San Jose', text: 'San Jose'},
    {id: 'Milpitas', text: 'Milpitas'},
    {id: 'Fremont', text: 'Fremont'},
    {id: 'Santa Clara', text: 'Santa Clara'},
    {id: 'Palo Alto', text: 'Palo Alto'},
    {id: 'Hayward', text: 'Hayward'},
    {id: 'Mountain View', text: 'Mountain View'},
    {id: 'Sunnyvale', text: 'Sunnyvale'}

    ],
    suggestions_companies: [{id: 'Google', text: 'Google'},
    {id: 'Facebook', text: 'Facebook'},
    {id: 'Amazon', text: 'Amazon'},
    {id: 'Apple', text: 'Apple'},
    {id: 'Microsoft', text: 'Microsoft'},
    {id: 'Nvidia', text: 'Nvidia'},
    {id: 'Salesforce', text: 'Salesforce'},
    {id: 'Morgan Stanley', text: 'Morgan Stanley'}

    ],
    remote: false,
    relocation: false,
    from_salary: '',
    to_salary: ''
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.handleDelete_locations = this.handleDelete_locations.bind(this);
    this.handleAddition_locations = this.handleAddition_locations.bind(this);
    this.handleDrag_locations = this.handleDrag_locations.bind(this);

    this.handleDelete_dreamCompany= this.handleDelete_dreamCompany.bind(this);
    this.handleAddition_dreamCompany = this.handleAddition_dreamCompany.bind(this);
    this.handleDrag_dreamCompany = this.handleDrag_dreamCompany.bind(this);
        
    }

    componentDidMount = () => {
        this.props.getStudentProfile()
        setTimeout(() => {
            if(this.props.studentProfile_data.job_preferences){
                var job_title = this.props.studentProfile_data.job_preferences.job_titles.map(function(elm) {
                    return {id: elm.title, text: elm.title};
                 });
                 var job_type = this.props.studentProfile_data.job_preferences.job_types.map(function(elm) {
                    return { type: elm.type};
                 });
                this.setState({
                    selected_job_search_status: [{value: this.props.studentProfile_data.job_preferences.job_search_status}],
                    tags: job_title,
                    select_job_types: job_type,
                    from_salary: (this.props.studentProfile_data.job_preferences.from_salary),
                    to_salary: (this.props.studentProfile_data.job_preferences.to_salary),
                    selected_pay_period: [{value: this.props.studentProfile_data.job_preferences.pay_period}]
                })

            } if (this.props.studentProfile_data.company_preferences){
                var selected_locations = this.props.studentProfile_data.company_preferences.locations.map(function(elm) {
                    return {id: elm.place, text: elm.place};
                 });
                 var selected_dream_companies = this.props.studentProfile_data.company_preferences.dream_companies.map(function(elm) {
                    return {id: elm.company_name, text: elm.company_name};
                 });
                 var selected_industry = this.props.studentProfile_data.company_preferences.industry.map(function(elm) {
                    return { type: elm.type};
                 });
                 var selected_company_size = this.props.studentProfile_data.company_preferences.company_sizes.map(function(elm) {
                    return { type: elm.size};
                 });
                 this.setState({
                    tags_location: selected_locations,
                    tags_dreamCompany: selected_dream_companies,
                    industry_select: selected_industry,
                    company_size: selected_company_size,
                    relocation: this.props.studentProfile_data.company_preferences.relocation,
                    remote: this.props.studentProfile_data.company_preferences.remote
                 })
            }
          }, 1000);

    }

    handleCheckBox = (e) => {
        console.log(e.target.checked)
        this.setState({
            [e.target.name]: e.target.checked,
        });
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
      
      handleDelete_locations(i) {
        const { tags_location } = this.state;
        this.setState({
            tags_location: tags_location.filter((tag, index) => index !== i),
        });
      }
    
    handleAddition_locations(tag) {
       this.setState(state => ({ tags_location: [...state.tags_location, tag] }));
      }
    
    handleDrag_locations(tag, currPos, newPos) {
        const tags_location = [...this.state.tags_location];
        const newTags = tags_location.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        this.setState({ tags_location: newTags });
      }

      handleDelete_dreamCompany(i) {
        const { tags_dreamCompany } = this.state;
        this.setState({
            tags_dreamCompany: tags_dreamCompany.filter((tag, index) => index !== i),
        });
      }
    
    handleAddition_dreamCompany(tag) {
       this.setState(state => ({ tags_dreamCompany: [...state.tags_dreamCompany, tag] }));
      }
    
    handleDrag_dreamCompany(tag, currPos, newPos) {
        const tags_dreamCompany = [...this.state.tags_dreamCompany];
        const newTags = tags_dreamCompany.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        this.setState({ tags_dreamCompany: newTags });
      }

    select_jobSearchStatus = (selectedList, selectedItem) => {
        this.setState({
            job_search_status: selectedItem.value
        })

    }
    select_jobType = (selectedList, selectedItem) => {
        this.setState({
            select_job_types: selectedList
        })
    }

    remove_jobType = (selectedList, selectedItem) => {
        this.setState({
            select_job_types: selectedList
        })
    }

    select_industry = (selectedList, selectedItem) => {
        this.setState({
            industry_select: selectedList
        })
    }

    remove_industry = (selectedList, selectedItem) => {
        this.setState({
            industry_select: selectedList
        })
    }

    select_companySize = (selectedList, selectedItem) => {
        this.setState({
            company_size: selectedList
        })
    }

    remove_companySize = (selectedList, selectedItem) => {
        this.setState({
            company_size: selectedList
        })
    }

    fromCurrency = (e) => {
        this.setState({
            from_salary: e
        })
    }

    toCurrency = (e) => {
        this.setState({
            to_salary: e
        })
    }

    payPeriod = (selectedList, selectedItem) => {
        this.setState({
            pay_period: selectedItem.value
        })

    }
    
    handleSaveChanges_JSS = () => {
        var job_type = this.state.select_job_types.map(function(elm) {
            return { type: elm.type};
         });
        var job_title = this.state.tags.map(function(elm) {
            return { title: elm.text};
         });
        const data = {
            job_search_status: this.state.job_search_status || this.props.studentProfile_data.job_preferences.job_search_status, 
            job_titles: job_title || this.props.studentProfile_data.job_preferences.job_titles,
            job_types: job_type ||  this.props.studentProfile_data.job_preferences.job_types,
            from_salary: this.state.from_salary ||  this.props.studentProfile_data.job_preferences.from_salary,
            to_salary: this.state.to_salary ||  this.props.studentProfile_data.job_preferences.to_salary,
            pay_period: this.state.pay_period ||  this.props.studentProfile_data.job_preferences.pay_period,
        }
        axios.post(`${backendServer}student/addJobPreferences/${localStorage.getItem("sql_student_id")}`, data,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                status: response.data,
                server_status: response.status
            })
   
        })
    }

    handleSaveChanges_CP = () => {
        var industry = this.state.industry_select.map(function(elm) {
            return { type: elm.type};
         });
        var locations = this.state.tags_location.map(function(elm) {
            return { place: elm.text};
         });
         var company_size = this.state.company_size.map(function(elm) {
            return { size: elm.type};
         });
         var dream_company = this.state.tags_dreamCompany.map(function(elm) {
            return { company_name: elm.text};
         });
        const data = {
            locations: locations || this.props.studentProfile_data.job_preferences.locations,
            relocation: this.state.relocation || this.props.studentProfile_data.job_preferences.relocation,
            remote: this.state.remote || this.props.studentProfile_data.job_preferences.remote ,
            industry: industry || this.props.studentProfile_data.job_preferences.industry,
            company_sizes: company_size || this.props.studentProfile_data.job_preferences.company_sizes,
            dream_companies: dream_company || this.props.studentProfile_data.job_preferences.dream_companies

        }
        axios.post(`${backendServer}student/addCompanyPreferences/${localStorage.getItem("sql_student_id")}`, data,
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                status2: response.data,
                server_status2: response.status
            })
   
        })
    }

    render() {
        let save_company_preferences = null
        let error = {
            message: null
        }
        let success = {
            message: null
        }
        let error2 = {
            message: null
        }
        let success2 = {
            message: null
        }
        if(this.state.status === 'CHANGES_SAVED'){
            success.message = "Updated job preferences."
            setTimeout(function() {window.location = '/student/jobPreference'}, 1500);
        } else if(this.state.server_status === 500){
            error.message = "Unable to make changes."
            setTimeout(function() {window.location = '/student/jobPreference'}, 2000);
        }
        if(this.state.status2 === 'CHANGES_SAVED'){
            success2.message = "Updated company preferences."
            setTimeout(function() {window.location = '/student/jobPreference'}, 1500);
        } else if(this.state.server_status2 === 500){
            error2.message = "Unable to make changes."
            setTimeout(function() {window.location = '/student/jobPreference'}, 2000);
        }

        if(this.state.tags_dreamCompany.length > 0) {
            save_company_preferences = (<Button onClick={this.handleSaveChanges_CP}
                style={{float: 'right', marginTop: "23mm"}}
                variant='success'>Save changes</Button>)
        } else {
            save_company_preferences = (
                <Button onClick={this.handleSaveChanges_CP}
                style={{float: 'right', marginTop: "10mm"}}
                variant='success'>Save changes</Button>
            )
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
                        <Card style={{width: "22cm"}}>
                            <Card.Title style={{padding: "30px 20px 0px 20px", fontWeight:"bolder", fontSize:"25px"}}>
                                Job Preferences
                            </Card.Title>
                            <Card.Body>
                                <Card.Text>Tell us what you’re looking for in a job and we’ll use this information to recommend the best jobs to you. This information will not be visible to employers.</Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                Where are you in your job search?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}> Select Job Search Status</label> 
                                
                                <Multiselect 
                                options = {this.state.jobSearchStatus}
                                displayValue = 'value'
                                singleSelect
                                onSelect = {this.select_jobSearchStatus}
                                style={ {  multiselectContainer: {width:"10.5cm"}}}
                                selectedValues = {this.state.selected_job_search_status}
                                />
                                </Card.Text>


                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                What job titles are you looking for?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}> Job Title</label> 
                                <ReactTags
                                classNames = 'tags'
                                tags={this.state.tags}
                                delimiters={delimiters}
                                inputFieldPosition="bottom"
                                placeholder="Enter a job title (Ex. Software Engineer)"
                                suggestions={this.state.suggestions}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrag={this.handleDrag}
        />
                                </Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                What types of jobs are you open to?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}>Job Types</label> 
                                <Multiselect 
                                options = {this.state.jobTypeOptions}
                                displayValue = 'type'
                                showCheckbox={true}
                                closeIcon = 'cancel'
                                style={ { chips: { background: "rgb(77, 166, 79)" }, multiselectContainer: {width:"10.5cm"}}}
                                closeOnSelect = {true}
                                onSelect = {this.select_jobType}
                                onRemove = {this.remove_jobType}
                                selectedValues = {this.state.select_job_types}
                                />
                                </Card.Text>

                                <br />
                                 <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                 What is your target salary range?
                                <br />
                                <br />
                                Add Salary Range
                                <br />
                                <br />
                                <div class='row'>
                                    <div class='col-md-3'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>From</label> 
                                    <CurrencyInput 
                                      name='from_salary'
                                      groupSeparator = ','
                                      decimalSeparator = '.'
                                      turnOffSeparators = {false}
                                      style={{borderRadius: '4px', border: '1px solid #cccccc', height:'10mm'}}
                                      prefix = '$'
                                      onChange = {this.fromCurrency}
                                      value={this.state.from_salary}

                                    />
                                    </div>
                                    <div class='col-md-3'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>To(optional)</label> 
                                    <CurrencyInput 
                                      name='to_salary'
                                      groupSeparator = ','
                                      decimalSeparator = '.'
                                      turnOffSeparators = {false}
                                      prefix = '$'
                                      style={{borderRadius: '4px', border: '1px solid #cccccc', height:'10mm'}}
                                      onChange = {this.toCurrency}
                                      value={this.state.to_salary}
                                    />

                                    </div>
                                </div>
                                <br />
                                <div class='row'>
                                    <div class='col-9'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>Pay Period</label> 
                                <Multiselect 
                                options = {this.state.payPeriod}
                                displayValue = 'value'
                                singleSelect
                                style={ {  multiselectContainer: {width:"10.5cm"}}}
                                onSelect = {this.payPeriod}
                                selectedValues = {this.state.selected_pay_period}
                                />
                                    </div>
                                    <div class='col-3'>
                                    <Button onClick={this.handleSaveChanges_JSS}
                                    style={{float: 'right', marginTop: "7.5mm"}}
                                    variant='success'>Save changes</Button>

                                    </div>
                                </div>

                            </Card.Text>
                            <div>
                            {error.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-danger'>{error.message}</div>}
                            {success.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-success'>{success.message}</div>}
                            </div>
                            </Card.Body>
                        </Card>
















                        <br />
                        <br/>
                        <Card style={{width: "22cm"}}>
                            <Card.Title style={{padding: "30px 20px 0px 20px", fontWeight:"bolder", fontSize:"25px"}}>
                                Company Preferences
                            </Card.Title>
                            <Card.Body>
                                <Card.Text>We use this information to help find you the best company matches.</Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                Where would you prefer to work?
                                <br />
                                <br />
                                <label style={{fontSize:"12px", fontWeight:'lighter'}}> Location</label> 
                                <ReactTags
                                classNames = 'tags'
                                tags={this.state.tags_location}
                                delimiters={delimiters}
                                inputFieldPosition="bottom"
                                placeholder="Enter a place (Ex. San Jose)"
                                suggestions={this.state.suggestions_locations}
                                handleDelete={this.handleDelete_locations}
                                handleAddition={this.handleAddition_locations}
                                handleDrag={this.handleDrag_locations}
                                />
                                <div class='row'>
                                    <div class='col-8'>
                                    <FormControlLabel
                                    style={{marginTop: '3mm'}}
                                    control={<Checkbox
                                        name="relocation"
                                        color="primary"
                                        style={{color: 'green'}}
                                        onChange = {this.handleCheckBox}
                                        checked={this.state.relocation}
                                    />}
                                    label="I'm open to relocation
                                    (Add locations you’d consider above)"
                                />  
                                    </div>
                                    <div class='col-4'>
                                    <FormControlLabel
                                style={{marginTop: '3mm'}}
                                    control={<Checkbox
                                        name="remote"
                                        color="primary"
                                        style={{color: 'green'}}
                                        onChange = {this.handleCheckBox}
                                        checked={this.state.remote}
                                    />}
                                    label="I want to work remotely"
                                />  
                                    </div>
                                </div>
      
                                </Card.Text>
                                <br />
                                <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                What industries and company sizes do you prefer?
                                <br />
                                <br />
                                <div class='row' >
                                    <div class='col-6'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>Industry</label> 
                                <Multiselect 
                                options = {this.state.industry}
                                placeholder='Industry'
                                displayValue = 'type'
                                showCheckbox={true}
                                closeIcon = 'cancel'
                                style={ { chips: { background: "rgb(77, 166, 79)" }, multiselectContainer: {width:"10.5cm"}}}
                                closeOnSelect = {true}
                                onSelect = {this.select_industry}
                                onRemove = {this.remove_industry}
                                selectedValues = {this.state.industry_select}
                                />
                                    </div>
                                    <div class='col-4'>
                                    <label style={{fontSize:"12px", fontWeight:'lighter'}}>Company size</label> 
                                <Multiselect 
                                options = {this.state.companySize}
                                placeholder='Company size'
                                displayValue = 'type'
                                showCheckbox={true}
                                closeIcon = 'cancel'
                                style={ { chips: { background: "rgb(77, 166, 79)" }, multiselectContainer: {width:"10.5cm"}}}
                                closeOnSelect = {true}
                                onSelect = {this.select_companySize}
                                onRemove = {this.remove_companySize}
                                selectedValues = {this.state.company_size}
                                />
                                    </div>
                                </div>


                                </Card.Text>

                                <br />
                                 <Card.Text style={{fontWeight:'bold', color:"#49504C"}}>
                                 What are your top 5 dream companies to work for?
                                <br />
                                <br />
                                 <div class='row'>
                                 <div class='col-9'>

                                 <label style={{fontSize:"12px", fontWeight:'lighter'}}> Company name</label> 
                                <ReactTags
                                classNames = 'tags'
                                tags={this.state.tags_dreamCompany}
                                delimiters={delimiters}
                                inputFieldPosition="bottom"
                                placeholder="Enter a company name (Ex. Facebook)"
                                suggestions={this.state.suggestions_companies}
                                handleDelete={this.handleDelete_dreamCompany}
                                handleAddition={this.handleAddition_dreamCompany}
                                handleDrag={this.handleDrag_dreamCompany}
                                />
                                 </div>
                                 <div class="col-3">
                                     {save_company_preferences}

                                 </div>
                                 </div>



                            </Card.Text>
                            <div>
                            {error2.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-danger'>{error2.message}</div>}
                            {success2.message && <div style={{width: '80%', margin:"0 auto", marginBottom:"5mm", textAlign: 'center', padding: "10px 10px 10px 10px"}} className='alert alert-success'>{success2.message}</div>}
                            </div>
                            </Card.Body>
                        </Card>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        ) 
    }
}

StudentJobPreferences.propTypes = {
    getStudentProfile: PropTypes.func.isRequired,
    studentProfile_data: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    studentProfile_data: state.studentProfile.payload,
  });
  
  export default connect(mapStateToProps, { getStudentProfile })(StudentJobPreferences);