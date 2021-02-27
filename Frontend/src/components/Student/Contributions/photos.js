import React, {Component} from 'react';
import ContributionsSidebar from '../Navbar/contributions_sideBar'
import StudentNavbar from '../Navbar/navbar_student'
import {Button, Card, Table, Image} from 'react-bootstrap'
import axios from 'axios'
import backendServer from "../../../webConfig"
import ReactPaginate from 'react-paginate';



class PhotosContribution extends Component{
 constructor(props){
     super(props)
         this.state = {
            offset: 0,
            photos: [],
            perPage: 5,
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
    axios.get(`${backendServer}student/getStudentPhotos/${localStorage.getItem("sql_student_id")}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }
    })
    .then(response => {
        const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.state.photos = []
        this.setState({
            photos: this.state.photos.concat(slice),
            pageCount: Math.ceil(response.data.length / this.state.perPage),
        });

    })

 }
 render(){
    let details= null;

    if(this.state.photos.length > 0){
       details = this.state.photos.map(photos => {
           return(
               <tr>
                   <td>{
                       <div>
                        <Image src={photos.s3Url} style={{width:"5cm", height:"3cm", padding:"5px 5px 0px 50px"}}/> <br />
                        <i style={{padding:"0px 5px 10px 50px", fontSize:"13px", fontWeight:"400"}}> Uploaded to: {photos.company_name} </i>
                       </div>}</td>
   
                   <td style={{textAlign: "center", verticalAlign:"middle"}}>{photos.date.split('T')[0]}</td>
                   
                   <td style={{textAlign: "center", verticalAlign:"middle", fontWeight: "600"}}>{photos.review_status}</td>

                   
               </tr>
           )
       })
    } else {
        details = (
            <tr>
               <td colSpan="3" style={{padding: "10px 10px 10px 10px", color:"#33333", verticalAlign:"middle"}}> Please upload photos to show it here.</td>
            </tr>)
    }
    let paginateElem = null
    if(this.state.photos.length > 0){
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
        <Card style={{ width: '44rem', padding:"10px 20px 0px 10px" }}>
        <Card.Body>
            <Card.Title>
                Photos
            </Card.Title>
            
                <Card.Text>
                    <Button style={{backgroundColor: '#1861bf', borderColor: "#1861bf"}} href='/student/tabs/photos'>
                        Add Photos
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
                        <th style={{padding:"10px 0px 10px 10px"}}>Status</th>

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
export default PhotosContribution