import Navigationbar from '../../Student/Navbar/navbar_company';
import React, { Component } from 'react';
import {Button, Modal, Card} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
// import { FormInput } from 'react-native-elements'


class companyReview extends Component {

    constructor(props) {
        super(props); 
            this.state = {
                reviews: [],
                showModal: false,
                messages: '',
                reviewId: ''
            }
            this.handleOpenModal = this.handleOpenModal.bind(this);
            this.handleCloseModal = this.handleCloseModal.bind(this);
}

componentWillMount() {
    axios.get(`${backendServer}company/reviews/${localStorage.getItem("name")}`,
    {headers: { Authorization: `${localStorage.getItem("token")}` }
})
    .then(res => {
        this.setState({ reviews: res.data });
    });
}

handleOnClick = (e) => {
    const data = {
        id: e.target.parentElement.id,
        value: e.target.parentElement.value
    }
    console.log(data);
    axios.post(`${backendServer}company/reviews/favourite`, data)
    .then(response => { 
        console.log(response)    
        if(response.status === 200) {
            window.location = '/company/reviews'
        }
    })
}

createElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <i className='fa fa-star' aria-hidden='true' style={{ color: 'green' }}></i>,
      );
    }
    return elements;
  }

  handleOpenModal = (e) => {
    this.setState({ showModal: true });
    this.setState({reviewId: e.target.id})
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({
        message: e.target.value
    })
}
onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

handleSendMessage = (e) => {
    e.preventDefault();
    const data = {
       _id: this.state.reviewId,
        message: this.state.message,
    }
    console.log(data)
    axios.post(`${backendServer}admin/company/reply`, data)
    .then(response => {
        if(response.status === 200) {
            alert("Message successfully sent")
            window.location = '/company/reviews'
        }
    })
}

render() {
    
    console.log(this.state.reviews)
    let renderReviews;
    if (this.state.reviews) {
        renderReviews = this.state.reviews.map( rev => {
            console.log(rev.reply)
            let favourite = <i class="far fa-heart"></i>;
            let featured = <i class="far fa-flag"></i>
            let button1;
            let button2;
            let reply;

            if (rev.favorite === true && rev.featured === true) {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> <i class="fas fa-heart"></i> </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> <i class="fas fa-flag"></i> </button>
            }
            else if (rev.favorite === true) {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> <i class="fas fa-heart"></i> </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> {featured} </button>
            } else if (rev.featured === true) {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> {favourite} </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "red", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> <i class="fas fa-flag"></i> </button>
            } else {
                button1 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='favourite'> {favourite} </button>
                button2 = <button id = {rev._id} style={{backgroundColor: "transparent", border: "none", color: "grey", fontSize: "25px"}} onClick={this.handleOnClick} value='featured'> {featured} </button>
            }
            if(rev.reply) {
                reply = <h5 style={{marginLeft: "20px"}}> {localStorage.getItem("name")}'s reply: {rev.reply}</h5>
            } else {
                reply = <Button id = {rev._id} style={{marginLeft: "10px", backgroundColor: "green", border: "green"}} onClick={this.handleOpenModal}> Reply </Button>
            }

            return (
            <div>
                <br />
                <div class='card bg-light p-3'>
                    <h4 style={{paddingTop: "10px"}}> "{rev.headline}" </h4>
                    <p style={{marginLeft: "10px"}}>{rev.rating}.0 {this.createElements(rev.rating)}</p>
                    <p style={{marginLeft: "10px"}}> {rev.description}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px",  padding: "0px"}}>Pros</p>
                    <p style={{marginLeft: "10px"}}>{rev.pros}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px"}}>Cons</p>
                    <p style={{marginLeft: "10px"}}>{rev.cons}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <br />
                        {reply}
                        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <input class="form-control input-md" type='text' style={{ height: '70px'}} onChange={this.handleInputChange}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button style={{border: "1px solid green", backgroundColor: "green", color: 'white', borderRadius: '5px'}} onClick = {this.handleSendMessage}>Post</Button>
                            </Modal.Footer>
                        </Modal>
                        </div>
                        <div>
                            {button1}
                            {button2}
                        </div>
                    </div>
                    </div>
            </div>
            )
        })
    }
return(
    <React.Fragment>
    <Navigationbar />
    <div class='container'>
        <h1> {localStorage.getItem("name")} Reviews</h1>
        {renderReviews}
    </div>
    </React.Fragment>

)}
}



export default companyReview;