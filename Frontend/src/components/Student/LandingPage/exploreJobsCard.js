import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faBuilding, faMapMarkerAlt, faScroll} from '@fortawesome/free-solid-svg-icons'
import {Card} from 'react-bootstrap'
import axios from 'axios'
import backendServer from "../../../webConfig"
import ReactReadMoreReadLess from "react-read-more-read-less";


class ExploreJobsCard extends Component {
    constructor(props){
        super(props)
        this.state ={

        }
    }

    render(){
        return(
            <div>
                    <div class='col-6' style = {{padding: "10px 5px 5px 25px"}}>
                    <Card style={{width: "25rem"}}>
                    <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faBriefcase} size='sm' /> 
                    <Link to={{pathname: '/student/job/jobdetails', state: this.props.job_items}}> {this.props.job_items.title}</Link>
                        {/* <a href='student/job/jobdetails' style={{textDecorationLine:"none"}}><span style={{fontSize: '18px', fontWeight: "400", fontFamily:"helvetica", padding:"10px 10px 0px 5px"}}> {this.props.job_items.title} </span> </a>  */}
                    </Card.Title>

                    <Card.Text>
                        <FontAwesomeIcon icon={faBuilding} size='xs' />  <span style={{fontSize: '14px', fontWeight: "300", padding:"0px 10px 10px 5px"}}> {this.props.job_items.companyName} </span> <br />
                        <FontAwesomeIcon icon={faMapMarkerAlt}size='xs' />   <span style={{fontSize: '14px', fontWeight: "300", padding:"0px 10px 10px 5px"}}> {this.props.job_items.city} </span> 
                    </Card.Text>

                    <Card.Text>
                    <FontAwesomeIcon icon={faScroll} size='xs' style={{marginRight: '2mm'}}/>  
                    <ReactReadMoreReadLess
                        charLimit={150}
                        readMoreText={"Read more"}
                        readLessText={"Read less"}
                        readMoreStyle={{color: 'green'}}
                        readLessStyle={{color: 'green'}}

                    >
                    {this.props.job_items.description}
                    </ReactReadMoreReadLess>
                    
                    </Card.Text>
                    <hr />
                    </Card.Body>
                    </Card>
                    </div>
                    
            </div>
        )
    }
}

export default ExploreJobsCard