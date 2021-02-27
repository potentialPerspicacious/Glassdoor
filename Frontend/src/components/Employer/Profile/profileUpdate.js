import React, { Component } from 'react';
import Navigationbar from '../../Student/Navbar/navbar_company';
//import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
//import { bindActionCreators } from 'redux';

class updateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: '',
      user: {}
    };
  }
  
  componentWillMount() {
    axios.get(`${backendServer}company/profile/${localStorage.getItem("sql_company_id")}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }
  })
    .then(res => {
        this.setState({ user: res.data });
    });
}

onChange= (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

onImageChange = (e) => {
  if(e.target.files && e.target.files[0]) {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  }
}


handleImageUpload = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', this.state.file);
  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };
  axios.post(`${backendServer}company/imageUpload/company`, formData, uploadConfig)
  .then(response => {
      alert("Image uploaded successfully!");
      this.setState({
          user_image: response.data
        });
      })
      .catch(err => {
      console.log("Error");
  });
}

handleUpdate = (e) => {
  e.preventDefault();
  const data = {
    street: e.target.street.value,
    city: e.target.city.value,
    state: e.target.state.value,
    website: e.target.website.value,
    company_size: e.target.company_size.value,
    company_type: e.target.company_type.value,
    revenue: e.target.revenue.value,
    headquarters: e.target.headquarters.value,
    industry: e.target.industry.value,
    founded: e.target.founded.value,
    mission: e.target.mission.value,
    ceo_name: e.target.ceo_name.value,
    cphoto_file_name: this.state.fileText
  }
  console.log(data);
  axios.post(`${backendServer}company/profile/update/${localStorage.getItem("sql_company_id")}`, data,
  {headers: { Authorization: `${localStorage.getItem("token")}` }
})
  .then (response => {
    if(response.status === 200 ) {
      alert("Company profile updated successfully")
      window.location = '/company/home'
    }
  })
};

    render() {
      console.log(this.state.user)
      return (
        <React.Fragment>
          <Navigationbar />
          <div class='container'>
            <div class='row'>
              <div class='col-md-6' style={{ marginBottom: '5%' }}>
                <br />
                <h3 style={{ margin: "15px, 0px", color: 'green', float: 'left' }}> {this.state.user.name}'s Profile</h3>
                <br />
                <hr class='mb-3'></hr>
                <Form onSubmit ={this.handleUpdate}>
                <Form.Group controlId='street'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong >Street</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="street" onChange={this.onChange} type='text' defaultValue={this.state.user.street}/>
                </Form.Group>
                <Form.Group controlId='city'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>City</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                    This field is required.
                  </Form.Text>
                  <Form.Control name="city" onChange={this.onChange} type='text' defaultValue={this.state.user.city}/>
                </Form.Group>
                <Form.Group controlId='state'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>State</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                    This field is required.
                  </Form.Text>
                  <Form.Control name="state" onChange={this.onChange} type='text' defaultValue={this.state.user.state} />
                </Form.Group>
                <Form.Group controlId='website'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Website</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                    This field is required.
                  </Form.Text>
                  <Form.Control name="website" onChange={this.onChange} type='text' defaultValue={this.state.user.website} />
                </Form.Group>
                <Form.Group controlId='company_size'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Company Size</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                    This field is required.
                  </Form.Text>
                  <Form.Control name="company_size" onChange={this.onChange} type='text' defaultValue={this.state.user.company_size} />
                </Form.Group>
                <Form.Group controlId='company_type'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Company Type</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                    This field is required.
                  </Form.Text>
                  <Form.Control name="company_type" onChange={this.onChange} type='text' defaultValue={this.state.user.company_type} />
                </Form.Group>
                <Form.Group controlId='revenue'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Revenue</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                  This field is required.
                  </Form.Text>
                  <Form.Control name="revenue" onChange={this.onChange} type='text' defaultValue={this.state.user.revenue} />
                </Form.Group>
                <Form.Group controlId='headquarters'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Headquarters</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                  This field is required.
                  </Form.Text>
                  <Form.Control name="headquarters" onChange={this.onChange} type='text' defaultValue={this.state.user.headquarters} />
                </Form.Group>
                <Form.Group controlId='industry'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Industry</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                  This field is required.
                  </Form.Text>
                  <Form.Control name="industry" onChange={this.onChange} type='text' defaultValue ={this.state.user.industry}/>
                </Form.Group>
                <Form.Group controlId='founded'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Founded</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                  This field is required.
                  </Form.Text>
                  <Form.Control name="founded" onChange={this.onChange} type='text' defaultValue ={this.state.user.founded} />
                </Form.Group>
                <Form.Group controlId='mission'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>Mission</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted' >
                  This field is required.
                  </Form.Text>
                  <Form.Control name="mission" onChange={this.onChange} type='text' defaultValue ={this.state.user.mission} />
                </Form.Group>
                <Form.Group controlId='ceo_name'>
                  <Form.Label style={{margin: "0px", padding: "0px"}}>
                    <strong>CEO Name</strong>
                  </Form.Label>
                  <Form.Text style={{margin: "0px", padding: "0px"}} className='text-muted'>
                  This field is required.
                  </Form.Text>
                  <Form.Control name="ceo_name" onChange={this.onChange} type='text'  defaultValue ={this.state.user.ceo_name}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <strong>Add a photo</strong>
                    </Form.Label>
                    <div class="custom-file">
                    <input type="file" name="image" accept="image/*" onChange={this.onImageChange}/>
                  </div>
                </Form.Group>
                <Button style={{backgroundColor: "green", border: "1px solid green"}} onClick={this.handleImageUpload}>
                  Upload
                </Button>
                <br />
                <br />
                <Button style={{backgroundColor: "green", border: "1px solid green"}} type='submit'>
                 Save changes
                </Button>
                <a href='/company/home' style={{ marginLeft: '15px' }}>
                  Cancel
                </a>
                </Form>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

//   updateRestaurant.propTypes = {
//     getRest: PropTypes.func.isRequired,
//     updateRest: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired,
//     status: PropTypes.object.isRequired
//   }
  
//   const mapStateToProps = state => { 
//       return ({
//       user: state.restProfile.user,
//       status: state.restProfile.status
//   })};
  
//   export default connect(mapStateToProps, { getRest, updateRest })(updateRestaurant);
export default updateCompany;