import React, {Component} from 'react';
import ContributionsSidebar from '../Navbar/contributions_sideBar'
import StudentNavbar from '../Navbar/navbar_student'
import {Button, Card, Table} from 'react-bootstrap'
import axios from 'axios'
import backendServer from "../../../webConfig"
import StarRatings from 'react-star-ratings';
import ReactPaginate from 'react-paginate';


class ReviewContribution extends Component{
 constructor(props){
     super(props)
         this.state = {
            company_reviews: [],
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
    axios.get(`${backendServer}student/studentReviews/${localStorage.getItem("sql_student_id")}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }
    })
    .then(response => {
        console.log(response)
        const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.state.company_reviews = []
        this.setState({
            company_reviews: this.state.company_reviews.concat(slice),
            pageCount: Math.ceil(response.data.length / this.state.perPage),
        });

    })

 }
 render(){
     let details= null; let review_contributions_count = null;

     if(this.state.company_reviews.length > 0){
        details = this.state.company_reviews.map(reviews => {
            return(
                <tr>
                    <td>{
                        <div>
                        <span style={{fontWeight: '600', fontSize: "15px", padding:"20px 10px 10px 10px"}}>{reviews.job_title}</span> <br />
                    <span style={{fontSize: '15px', fontWeight: '500', padding:"20px 10px 10px 10px"}}>{reviews.company} </span>
                    <p style={{padding: "20px 10px 10px 10px"}}> <span style={{fontWeight: "600"}}><a href='/student/reviews' style={{textDecoration: 'none'}}> "{reviews.headline}" </a></span>  
                    <span> 
                        <div class='row'>
                            <div class='col-3.5' style={{marginTop: "0.60mm", marginLeft: '25px'}}> Rating:  </div>
                            <div class='col-5'><StarRatings rating={reviews.rating} style={{display: 'none !important'}}
                        starRatedColor="green" numberOfStars={5} starDimension="17px"
                        starSpacing="1px"/></div>
                        </div></span></p>
                        <p style={{padding: "0px 10px 10px 10px"}}>
                            {reviews.description}
                        </p>
                        <span style={{padding: "20px 0px 0px 10px", fontWeight: "600"}}> Pros: </span> <br />
                        <li style={{marginLeft:"3mm", padding:"0px 0px 10px 10px"}}> <span style={{fontWeight: "400", left:"-10px", position:"relative"}}>
                        {reviews.pros} </span> </li>
                       

                        <p>
                        <span style={{padding: "20px 0px 0px 10px", fontWeight: "600"}}> Cons: </span> <br />
                        <li style={{marginLeft:"3mm", padding:"0px 0px 0px 10px"}}> <span style={{fontWeight: "400", left:"-10px", position:"relative"}}>
                        {reviews.cons} </span> </li>

                        </p>
                        </div>}</td>
    
                    <td style={{textAlign: "center", verticalAlign:"middle"}}>{reviews.date.split('T')[0]}</td>
                    
                    <td style={{textAlign: "center", verticalAlign:"middle", fontWeight: "600"}}>{reviews.approvedstatus}</td>

                    
                </tr>
            )
        })
        review_contributions_count = (
            <div>
                <br />
                You have contributed <span style={{fontWeight:"600"}}>{this.state.company_reviews.length}</span> job/company reviews.
            </div>
        )
     } else {
         details = (
         <tr>
            <td colSpan="3" style={{padding: "10px 10px 10px 10px", color:"#33333", verticalAlign:"middle"}}> Please add your reviews to show it here.</td>
         </tr>)
        review_contributions_count = (
                    <div>
                        <br />
                        You have <span style={{fontWeight:"600"}}>no</span> contributions in job/company reviews.
                    </div>
                )
         }
         let paginateElem = null
         if(this.state.company_reviews.length > 0){
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
        <Card  style={{ width: '44rem', padding:"10px 20px 0px 10px" }}>
        <Card.Body>
            <Card.Title>
                Reviews
            </Card.Title>
            
                <Card.Text>
                    <Button style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}} href='/student/addreviews'>
                        Write a Review
                    </Button>
                </Card.Text>
                <br />
                <Card.Text>
                The Glassdoor team reviews every piece of content submitted by users, so please be patient. 
                Contributions with the 'Pending' status are being reviewed, and will appear on the site once they are approved.
                <br />
                <p>
                {review_contributions_count}
                </p>
                </Card.Text>
                <Card.Text>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th style={{width:"60%", padding:"10px 0px 10px 10px"}}>Details</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Submitted</th>
                        <th style={{padding:"10px 0px 10px 10px"}}>Review Status</th>

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
            <br />   
        
    </div>
    </div>
    </div>
     )
 }
}
export default ReviewContribution