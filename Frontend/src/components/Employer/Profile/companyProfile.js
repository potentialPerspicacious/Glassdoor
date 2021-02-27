import Navigationbar from '../../Student/Navbar/navbar_company';
import React, { Component } from 'react';
import {CardImg, Button } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';


class companyProfile extends Component {

    constructor(props) {
        super(props); 
            this.state = {
                user: {}
            }
}

componentWillMount() {
    axios.get(`${backendServer}company/profile/${localStorage.getItem("sql_company_id")}`, 
    {headers: { Authorization: `${localStorage.getItem("token")}` }
})
    .then(res => {
        this.setState({ user: res.data });
    });
}

render() {
    console.log(this.state.user)
    //console.log(this.props.user);
    var fileName = this.state.user.cphoto_file_name
    var imgSrc = `${backendServer}company/imageUpload/${fileName}`
    return (
        <React.Fragment>
        <Navigationbar />
        <div style={{margin:"5px"}}>
        <div class='jumbotron' style={{paddingBottom: "0px"}}>
                <div class='row'>
                    <div class='col-xs-3 card profilePic' style={{position:"absolute"}}>
                        <card>
                            <CardImg style={{height: "200px", width: "175px"}} src={imgSrc} className='profileImg'/>
                        </card>
                    </div>
                    <div class='col-xs-4 profileName' style={{marginLeft: "200px"}}>
                        <h1>{this.state.user.name}</h1>
                        <h6> {this.state.user.street}</h6>
                        <h6> {this.state.user.city}, {this.state.user.state}</h6>
                        <br />
                        <Button href = '/company/home' style={{backgroundColor: "transparent", color: "green", border: "none", fontSize: "23px" }}> Overview </Button>
                        <Button href = '/company/jobs'style={{backgroundColor: "transparent", color: "green", border: "none", borderLeft: "1px solid #A9A9A9", fontSize: "23px"}}> Jobs </Button>
                        <Button href = '/company/reviews' style={{backgroundColor: "transparent", color: "green", border: "none", borderLeft: "1px solid #A9A9A9", fontSize: "23px"}}> Reviews </Button>
                        {/*<Button style={{backgroundColor: "transparent", color: "green", border: "none", borderLeft: "1px solid #e6e6e6", fontSize: "25px"}}> Applicants </Button> */}
                        <Button href = '/company/profileUpdate' style={{float: "right", marginLeft: "500px"}} variant='success'> Update profile details</Button>
                    </div>
                </div>
        </div>
        <div class='row' style={{ marginLeft:"10px"}}>
            <div class='col-xs-12' style={{marginLeft: "15%"}}>
                <h3 style={{color:'green'}}> {this.state.user.name} overview</h3>
                <hr />
                <h5 style={{margin:"0px"}}> Website</h5>
                <p> {this.state.user.website} </p>
                <h5 style={{margin:"0px"}}> Company Size </h5>
                <p> {this.state.user.company_size} </p>
                <h5 style={{margin:"0px"}}> Company Type</h5>
                <p> {this.state.user.company_type} </p>
                <h5 style={{margin:"0px"}}> Revenue </h5>
                <p> {this.state.user.revenue} </p>
            </div>
            <div class='col-xs-3' style={{textAlign: "left", height: "100%", marginLeft: "40%", marginTop: "5%"}}>
                <div style={{marginLeft: "10px"}}>
                    <h5 style={{margin:"0px"}}> Headquarters </h5>
                    <p> {this.state.user.headquarters}</p>
                    <h5 style={{margin:"0px"}}> Industry </h5>
                    <p> {this.state.user.industry} </p>
                    <h5 style={{margin:"0px"}}> Founded </h5>
                    <p> {this.state.user.founded} </p>
                    <h5 style={{margin:"0px"}}> CEO Name</h5>
                    <p> {this.state.user.ceo_name} </p>
                </div>
            </div>
            <hr />
            <div class='col-xs-3' style={{marginLeft: "15%"}}>
                <br />
                <h5 style={{margin:"0px"}}> Mission </h5>
                <p>{this.state.user.mission}</p>
            </div>
            </div>
         </div>
    </React.Fragment>
    )}
}

export default companyProfile;


