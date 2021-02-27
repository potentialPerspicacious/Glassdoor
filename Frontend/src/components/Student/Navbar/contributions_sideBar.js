import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap'


class ContributionsSidebar extends Component {
    constructor(props){
        super(props)
        this.state = {
            salariesState: false,
            reviewsState: false,
            interviewsState: false,
            photoState: false
        }
        
    }
    componentWillMount = () => {
        if(localStorage.getItem('contri-list') === 'salaries') {
            this.setState({salariesState: true})
        } else if(localStorage.getItem('contri-list') === 'reviews') {
            this.setState({reviewsState: true})
        }
        else if(localStorage.getItem('contri-list') === 'interviews') {
            this.setState({interviewsState: true})
        }
        else if(localStorage.getItem('contri-list') === 'photos') {
            this.setState({photoState: true})
        }
    }
    render() {
        return (
            <div style={{padding: '30px 20px 30px 20px', width:"8cm", height:"10cm"}}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item action variant='light'
                        active={this.state.salariesState}
                        onClick={()=>{localStorage.setItem('contri-list', 'salaries')}}
                        style={{color:"black"}}
                        href='/student/contributions/salaries'>
                        Salaries
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light'
                        active={this.state.reviewsState}
                        onClick={()=>{localStorage.setItem('contri-list', 'reviews')}}
                        style={{color:"black"}}
                        href='/student/contributions/reviews'>
                        Reviews
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light' 
                        active={this.state.interviewsState}
                        onClick={()=>{localStorage.setItem('contri-list', 'interviews')}}
                        style={{color:"black"}}
                        href='/student/contributions/interviews'>
                        Interviews
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light' 
                        active={this.state.photoState}
                        onClick={()=>{localStorage.setItem('contri-list', 'photos')}}
                        style={{color:"black"}}
                        href='/student/contributions/photos'>
                        Photos
                        </ListGroup.Item>
                    </ListGroup>

                    </div>
        ) 
    }
}

export default ContributionsSidebar