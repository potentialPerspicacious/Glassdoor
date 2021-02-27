import React, {Component} from 'react';
import ContributionsSidebar from '../Navbar/contributions_sideBar'
import StudentNavbar from '../Navbar/navbar_student'
import {Button, Card, Table} from 'react-bootstrap'
import axios from 'axios'
import backendServer from "../../../webConfig"
import StarRatings from 'react-star-ratings';
import ReactPaginate from 'react-paginate';




class InterviewContribution extends Component{
 constructor(props){
     super(props)
         this.state = {
            interview_reviews: [],
            offset: 0,
            perPage: 3,
            currentPage: 0

     }
     this.handlePageClick = this.handlePageClick.bind(this);

 }
 handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.componentWillMount()
    });

};

 componentWillMount = () => {
    axios.get(`${backendServer}student/studentInterviews/${localStorage.getItem("sql_student_id")}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }
    })
    .then(response => {
        const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.state.interview_reviews = []
        this.setState({
            interview_reviews: this.state.interview_reviews.concat(slice),
            pageCount: Math.ceil(response.data.length / this.state.perPage),
        });

    })

 }

 render(){
     let details = null;
     if(this.state.interview_reviews.length > 0){
        details = this.state.interview_reviews.map(interview => {
            return(
                <tr>
                    <td>{
                        <div>
                        <span style={{fontWeight: '600', fontSize: "15px", padding:"20px 10px 10px 10px"}}>{interview.job_title}</span> <br />
                    <span style={{fontSize: '15px', fontWeight: '500', padding:"20px 10px 10px 10px"}}>{interview.companyName} </span>
                    <p style={{padding: "20px 10px 10px 10px"}}> <span style={{fontWeight: "600"}}>{interview.overall_experience}</span> overall experience.  
                    <span> 
                        <div class='row'>
                            <div class='col-3.5' style={{marginTop: "0.60mm", marginLeft: '15px'}}> Difficulty:  </div>
                            <div class='col-5'><StarRatings rating={interview.difficulty} style={{display: 'none !important'}}
                        starRatedColor="green" numberOfStars={5} starDimension="17px"
                        starSpacing="1px"/></div>
                        </div></span></p>
                        <p style={{padding: "0px 10px 10px 10px"}}>
                            {interview.description}
                        </p>
                        <span style={{padding: "20px 0px 10px 10px"}}> Offer Status: <span style={{padding: "20px 10px 10px 0px", fontWeight: "600"}}>{interview.offer_status}</span>  </span>
                        <p> <a href='' style={{padding: "40px 10px 10px 10px", textDecoration: 'none'}}>Interview Questions</a></p>
                        </div>}</td>
    
                    <td style={{textAlign: "center", verticalAlign:"middle"}}>{interview.interview_date.split('T')[0]}</td>
                </tr>
            )
        })
     } else {
         details = (
         <tr>
            <td colSpan="2" style={{padding: "10px 10px 10px 10px", color:"#33333", verticalAlign:"middle"}}> Please add your interview experiences to show it here.</td>
         </tr>)
         }
         let paginateElem = null
         if(this.state.interview_reviews.length > 0){
             paginateElem = (
                 <div style= {{marginLeft:"5mm", marginRight:"5mm"}}>
                 <hr />
                 <ReactPaginate
                 previousLabel={"prev"}
                 nextLabel={"next"}
                 breakLabel={"..."}
                 breakClassName={"break-me"}
                 pageCount={this.state.pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"}
                 />
                 
                 </div>
             )
         }

     return(
        <div>
            <StudentNavbar />
       
        <div className='row' style={{background: "#eaeaea"}}>
        <div className="col-4 contri" style={{paddingLeft:"5cm"}}> 
        <ContributionsSidebar />
        </div>
        <div className="col-8 contri" style={{padding:"28px 20px 0px 20px"}}>  
        <Card  style={{ width: '44rem', padding:"10px 20px 20px 10px" }}>
        <Card.Body>
            <Card.Title>
                Interviews
            </Card.Title>
            
                <Card.Text>
                    <Button style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}} href='/student/interview/add'>
                        Share an Interview
                    </Button>
                </Card.Text>
                <br />
                <Card.Text>
                The Glassdoor team reviews every piece of content submitted by users, so please be patient. 
                Contributions with the 'Pending' status are being reviewed, and will appear on the site once they are approved.

                </Card.Text>
                <Card.Text>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th style={{width:"50%", padding:"10px 0px 10px 10px"}}>Details</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Submitted</th>

                        </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
                    </Table>
                </Card.Text>

            </Card.Body>
            {paginateElem}
            </Card>
            <br />
            <br/>               
            
        
    </div>
    </div>
    </div>
     )
 }
}
export default InterviewContribution