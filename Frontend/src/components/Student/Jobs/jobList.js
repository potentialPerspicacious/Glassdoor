import React, {Component} from 'react';
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import moment from 'moment'

class JobList extends Component {
    constructor(props){
        super(props)
        this.state ={
        }
    }
    render(){
        return(
            <div className='container border'>
            <br></br>
              <Card.Title>
              <Link to={ {pathname:`/student/job/jobdetails`,state: this.props.company_jobs}}
                          
                          style={{ textDecoration: 'none', color: '#1355a9' }}>
                          {this.props.company_jobs.title}
                        </Link>
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
        <h6>{this.props.company_jobs.companyName}- {this.props.company_jobs.city},{this.props.company_jobs.state}</h6>
                    </div>
                     <div>
                      <button style={{backgroundColor: "transparent",border: "none",  color: "green", fontSize: "20px"}}> <i class="far fa-heart"></i> </button>
                    </div>
                  </div>
                  <span style={{ float: 'right' }}>
                  <div>
                     <p  style={{ color: "grey", fontSize: "10px"}}>{moment(this.props.company_jobs.posted_date,'MM/DD/YYYY').fromNow()}</p>
                  
                    </div>
                  </span>
                </Card.Body>
              </Card.Title>
              
            </div>
          
        )
    }
}

export default JobList;