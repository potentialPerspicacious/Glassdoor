import React, { Component } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import UploadImageModalForm from './uploadImageModal'
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios'
import backendServer from "../../../webConfig"
import ReactPaginate from 'react-paginate';


class PhotosTab extends Component {
    constructor(props){
        super(props) 
        this.state = {
            showModal: false,
            offset: 0,
            photo_items: [],
            perPage: 9,
            currentPage: 0,
            loading: true

        }
    
        this.photoItems = this.photoItems.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getPhotos();
    }
    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getPhotos()
        });

    };


    getPhotos=()=> {
        setTimeout(() => {
            axios.get(`${backendServer}student/getCompanyPhotos/${this.props.companyID}`, 
            {headers: { Authorization: `${localStorage.getItem("token")}` }
            })
            .then(response => {
                if(response.data === "NO_PHOTOS_AVAILABLE"){
                    this.setState({
                        loading: false,
                        status: response.data
                    })
                } else {
                    const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                    this.state.photo_items = []
                    this.setState({
                        photo_items: this.state.photo_items.concat(slice),
                        pageCount: Math.ceil(response.data.length / this.state.perPage),
                        loading: false
                    });
                }

            })
        }, 800)
    }

    ImageBox = (props) => {
        return <Image src={props.s3Url} style={{width:"9cm", height:"8cm", padding:"5px 5px 10px 20px"}}/>
    } 

    photoItems = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.photo_items && this.state.photo_items.length > 0) {
            items = this.state.photo_items
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <this.ImageBox s3Url={items[i].s3Url}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    render(){
        let section,
        renderOutput = [];
        if(this.state.status === "NO_PHOTOS_AVAILABLE" || this.state.photo_items.length===0){
            renderOutput = (<div style={{padding: "0px 10px 10px 10px", color:"gray", fontSize: "18px"}}>
                This company has no photos available. Be the first to add them.
            </div>)
        } else
        if (this.state && this.state.photo_items && this.state.photo_items.length > 0) {
            section = this.photoItems(this.state.photo_items);
            renderOutput.push(section);
                }else {
                    renderOutput = (
                        <div class='center' style = {{position: "fixed", top: "60%", left: "50%" }}>  
                        <ScaleLoader
                        size={50}
                        color={"green"}
                        loading={this.state.loading} />
                        </div>

                    )
                }
                let paginateElem = null
                if(this.state.photo_items.length > 0){
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
                <UploadImageModalForm show={this.state.showModal} onHide={this.handleClose} companyID={this.props.companyID}
                companyName={this.props.companyName} />

                <div class='col-11' style={{padding: "20px 10px 30px 225px"}}>
                <Card>
                    <div class='row'>
                    <div class='col-12'>
                        <Button style={{float:"right", marginRight:"20px", marginTop:"20px", marginBottom: "20px", backgroundColor:"#1861bf", color:"white"}} onClick={this.handleShow}>Add Photos</Button>

                    </div>

                    </div>
                    <div class="row">
                        <div className='col-12'>
                        {renderOutput}

                        </div>
                    </div>
                
                {paginateElem}
                </Card>
        
                </div>


            </div>
        )
    }
}

export default PhotosTab