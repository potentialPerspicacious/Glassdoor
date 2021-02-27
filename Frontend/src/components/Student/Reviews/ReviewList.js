import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'

class ReviewList extends Component {
  constructor(props){
      super(props)
      this.state ={
      }
  }   
  createElements=(n) => {
        var elements = [];
        for (let i = 0; i < n; i++) {
          elements.push(
            <i className='fa fa-star' aria-hidden='true' style={{ color: 'green' }}></i>,
          );
        }
        return elements;
      } 
      creatCards=(n) => {
        var elements = [];
        if(n=== 1) {
          elements.push(
            <i className='fa fa-square' aria-hidden='true' style={{ color: 'green' }}></i>,
          );
        }
        if(n=== 0){
          elements.push(
            <i className='fa fa-square' aria-hidden='true' style={{ color: 'red' }}></i>,
          );
        }
        return elements;
      } 
      render(){
        return(
        <div >
                    <p style={{marginLeft: "10px", fontSize: "20px", color:"#1355a9",fontWeight: "bold"}}>"{this.props.review_items.headline}"</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p style={{marginLeft: "10px"}}>{this.props.review_items.rating}.0 {this.createElements(this.props.review_items.rating)}</p>
                    <p style={{marginLeft: "10px"}}>Recommends {this.creatCards(this.props.review_items.ceo_rating)}</p>
                    <p style={{marginLeft: "10px"}}>Approves of CEO {this.creatCards(this.props.review_items.recommended)}</p>
                    </div>
                    <p style={{marginLeft: "10px"}}> {this.props.review_items.description}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px",  padding: "0px"}}>Pros</p>
                    <p style={{marginLeft: "10px"}}>{this.props.review_items.pros}</p>
                    <p style={{fontWeight: "bold", marginLeft: "10px"}}>Cons</p>
                    <p style={{marginLeft: "10px"}}>{this.props.review_items.cons}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                             </div>
                        <div>
                            <Button style={{backgroundColor: "transparent", bordercolor: "DodgerBlue",hoverbackground:"DodgerBlue", color: "#1355a9", fontSize: "15px"}}>Helpful({this.props.review_items.helpful})</Button>
                        </div>
                    </div>
            </div>
  )
}
};

export default ReviewList;