import React, { Component } from 'react';
import { Col,Row,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {saveReview,saveAverageRating,saveFeaturedReview,saveNegativeReview,savePositiveReview} from '../../../store/actions/studentReviewAction';
import 'react-bootstrap/ModalHeader';
import axios from 'axios';
import backendServer from '../../../webConfig';
import  ReviewList  from './ReviewList';
import { Charts } from './Charts';
import { FeaturedReview } from './FeaturedReview';
import { PositiveReview } from './PositiveReview';
import { NegativeReview } from './NegativeReview';
import ReactPaginate from 'react-paginate';
import ScaleLoader from "react-spinners/ScaleLoader";

class ReviewTab extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      offset: 0,
      review_items: [],
      perPage: 1,
      currentPage: 0,
     loading: true
     };
    this.changeHandler = this.changeHandler.bind(this);
    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.review_items = this.review_items.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getReview();
  }

  componentDidMount() {
    this.getAverageRating();
    this.getPositiveReview();
    this.getNegativeReview();
    this.getFeaturedReview();
  }
  // getReview = () => {
  //   axios
  //     .get(`${backendServer}student/reviews/${this.props.companyName}`)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         if (res.data) {
  //           this.props.saveReview(res.data);
  //           console.log(this.props.review);
  //           //this.props.saveEvents(res.data);
  //         }
  //       }
  //     });
  // };
  getReview=()=> {
    console.log("function called.")
    setTimeout(() => {
        axios.get(`${backendServer}student/reviews/${this.props.companyName}`,
        {headers: { Authorization: `${localStorage.getItem("token")}` }})
        .then(response => {
          console.log(response)
            const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.state.review_items = []
            this.setState({
                review_items: this.state.review_items.concat(slice),
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
      this.getReview()
  });

};

review_items = () => {
  console.log("this is called")
  var itemsRender = [], items, item;
  if (this.state && this.state.review_items && this.state.review_items.length > 0) {
      items = this.state.review_items
      if (items.length > 0) {
          for (var i = 0; i < items.length; i++) {
              item = <ReviewList review_items={items[i]}/>;
              itemsRender.push(item);
          }
      }
      console.log(itemsRender)
      return itemsRender;
  } 
};

  getPositiveReview = () => {
    axios
      .get(`${backendServer}company/reviews/positive/${this.props.companyName}`,
      {headers: { Authorization: `${localStorage.getItem("token")}` }})
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            this.props.savePositiveReview(res.data);
            console.log(this.props.positive);
          }
        }
      });
  };

  getNegativeReview = () => {
    axios
      .get(`${backendServer}company/reviews/negative/${this.props.companyName}`,
      {headers: { Authorization: `${localStorage.getItem("token")}` }})
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            this.props.saveNegativeReview(res.data);
            console.log(this.props.negative);
          }
        }
      });
  };
  getFeaturedReview = () => {
    axios
      .get(`${backendServer}company/reviews/featured/${this.props.companyName}`,
      {headers: { Authorization: `${localStorage.getItem("token")}` }})
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            this.props.saveFeaturedReview(res.data);
            console.log(this.props.featured);
          }
        }
      });
  };

  getAverageRating = () => {
    axios
      .get(`${backendServer}company/reviews/rating/${this.props.companyName}`,
      {headers: { Authorization: `${localStorage.getItem("token")}` }})
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            this.props.saveAverageRating(res.data);
            console.log(this.props.avgRating);
          }
        }
      });
  };
  createElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <i
          className='fa fa-star'
          aria-hidden='true'
          style={{ color: 'green' }}
        ></i>
      );
    }
    return elements;
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // handleCheckboxChange(e) {
  //   this.setState({ workType: e.target.value });
  // }


  addVote = (id) => {
    const data = {
      _id: id,
    };
    console.log(data);
    axios
      .post(`${backendServer}student/reviews/helpful`, data)
      .then((response) => {
        if (response.status === 200) {
          console.log('vote added.');
        }
      });
  };
  render() {
    let section,
    renderOutput = [];

    if (this.state && this.state.review_items && this.state.review_items.length > 0) {
        section = this.review_items(this.state.review_items);
        renderOutput.push(section);
            }else {
                renderOutput = (
                    <div class='center' style = {{position: "fixed", top: "70 %", left: "30%" }}>  
                    <ScaleLoader
                    size={50}
                    color={"green"}
                   loading={this.state.loading}
                     />
                    </div>

                )
            }
    let paginateElem = null
    if(this.state.review_items.length > 0){
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
    return (
      <React.Fragment>
        <Row>
        <Col  md={{ span: 8, offset: 0 }}>
            <React.Fragment>
                <div class='row w-100  mt-5 p-5  border rounded' >
                  <Charts charts={this.props.avgRating}></Charts>
                <FeaturedReview
                  featuredReview={this.props.featured}
                ></FeaturedReview>
                <PositiveReview
                  positiveReview={this.props.positive}
                ></PositiveReview>
                <NegativeReview
                  negativeReview={this.props.negative}
                ></NegativeReview>
                </div>
                <div class='row w-100  mt-5 p-5  border rounded'>
                    {renderOutput}

                    </div>

                {paginateElem}
                  
             
            </React.Fragment>
          </Col>
          <Col  md={{ span: 3, offset: 0 }}>
            <Button variant='primary' href='/student/addreviews'>
              + Add Review
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ReviewTab.propTypes = {
  status: PropTypes.object.isRequired,
  saveReview: PropTypes.func.isRequired,
  savePositiveReview: PropTypes.func.isRequired,
  saveNegativeReview: PropTypes.func.isRequired,
  saveFeaturedReview: PropTypes.func.isRequired,
  saveAverageRating: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
  positive: state.review.positive[0],
  negative: state.review.negative[0],
  featured: state.review.featured[0],
  avgRating: state.review.avgRating,
});
const mapDispatchToProps = (dispatch) => {
  return {
    saveReview: (data) => dispatch(saveReview(data)),
    savePositiveReview: (data) => dispatch(savePositiveReview(data)),
    saveNegativeReview: (data) => dispatch(saveNegativeReview(data)),
    saveFeaturedReview: (data) => dispatch(saveFeaturedReview(data)),
    saveAverageRating: (data) => dispatch(saveAverageRating(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewTab);
