import React, {Component} from 'react';
import StudentNavbar from '../Navbar/navbar_student'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {Card, Image} from 'react-bootstrap'
import axios from 'axios'
import backendServer from "../../../webConfig"
import ExploreJobsCard from './exploreJobsCard'
import ReactPaginate from 'react-paginate';
import ScaleLoader from "react-spinners/ScaleLoader";


class StudentHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentHome_data: {},
            offset: 0,
            job_items: [],
            perPage: 4,
            currentPage: 0,
            loading: true

        }
        this.jobItems = this.jobItems.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getJobs();

    }


    componentWillMount = () => {
        axios.get(`${backendServer}student/home/${localStorage.getItem("sql_student_id")}`, 
        {headers: { Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            this.setState({
                studentHome_data: response.data[0]
            })
        })
        localStorage.setItem("contri-list", 'salaries')
    }
    
    getJobs=()=> {
        setTimeout(() => {
            axios.get(`${backendServer}student/exploreJobs/${this.state.studentHome_data.state}`, 
            {headers: { Authorization: `${localStorage.getItem("token")}` }
            })
            .then(response => {
                const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.state.job_items = []
                this.setState({
                    job_items: this.state.job_items.concat(slice),
                    pageCount: Math.ceil(response.data.length / this.state.perPage),
                    loading: false
                });
            })
        }, 800)
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log(selectedPage)
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getJobs()
        });

    };


    jobItems = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.job_items && this.state.job_items.length > 0) {
            items = this.state.job_items
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <ExploreJobsCard job_items={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        } 
    };

    render() {
        let details = this.state.studentHome_data
        console.log(details)
        
        let job_title, location
        if(details.job_title === null){
            job_title = (<a style={{marginLeft:"8px", textDecoration: "none"}} 
            href='/student/profile' onClick={localStorage.setItem('active-list', 'profile')}>Add Job Title</a>)
        } else {
            job_title = (<a style={{marginLeft:"8px", textDecoration: "none"}}>{details.job_title}</a>)
        }
        if(details.city === null){
            location = (<a style={{marginLeft:"11px", textDecoration: "none"}} 
            href='/student/profile' onClick={localStorage.setItem('active-list', 'profile')}>Add Location</a>)

        } else {
            location = (<a style={{marginLeft:"11px", textDecoration: "none"}}>{details.city}</a>)
        }
        let section,
        renderOutput = [];

        if (this.state && this.state.job_items && this.state.job_items.length > 0) {
            section = this.jobItems(this.state.job_items);
            renderOutput.push(section);
                }else {
                    renderOutput = (
                        <div class='center' style = {{position: "fixed", top: "50%", left: "65%" }}>  
                        <ScaleLoader
                        size={50}
                        color={"green"}
                        loading={this.state.loading} />
                        </div>

                    )
                }
        let paginateElem = null
        if(this.state.job_items.length > 0){
            paginateElem = (
                <div>
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
                activeClassName={"active"}/></div>
            )
        }
        let profilePicture = null
        if (this.state) {
            profilePicture = `${backendServer}student/getProfilePicture/${localStorage.getItem("sql_student_id")}`;
        }
        return (
            <div> 
                <StudentNavbar />
                <br />
                <br />
                <div className="row">
                <div class="col-4" style={{paddingLeft:"2cm", paddingRight:"1cm"}}>
                    <a href='/student/profile' style={{textDecoration: "none", color: "black"}} onClick={localStorage.setItem('active-list', 'profile')}> 
                    <Card>
                    <Card.Body>
                    <Image src={profilePicture} style={{width:"1.5cm"}} roundedCircle/>
                    <br />
                    <br />

                    <Card.Title>
                         <span style={{textTransform:"uppercase", fontWeight: "bolder", fontFamily:"helvetica"}}> {details.first_name} {details.last_name} </span>
                    </Card.Title>

                    <Card.Text>
                        <FontAwesomeIcon icon={faBriefcase} /> 
                        {job_title}
                    </Card.Text>

                    <Card.Text>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> 
                        {location}
                    </Card.Text>
                    <hr />
                    </Card.Body>
                    </Card>
                    </a>
                </div>

                <div class="col-8" style={{borderLeft:"1px solid #e6e6e6"}}>
                    
                    <h4 style={{fontFamily:"helvetica", fontWeight:"bold"}}> Explore Jobs Near You</h4>
                    <hr />
                    <div class='row'>
                    {renderOutput}

                    </div>

                {paginateElem}
                    
                </div>
                </div>
            </div>
        )
    }

}
export default StudentHome;