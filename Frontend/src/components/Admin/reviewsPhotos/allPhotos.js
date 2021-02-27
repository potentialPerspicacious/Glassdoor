import Navigationbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../../webConfig';
import ReactPaginate from 'react-paginate';
// import { FormInput } from 'react-native-elements'

class adminPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      tempUserPhotos: [],
      offset: 0,
      perPage: 10,
      currentPage: 0,
      pageCount: null,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    axios.get(`${backendServer}admin/review/allPhotos`).then((res) => {
      this.setState({ photos: res.data });
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

  handleOnClick = (e) => {
    console.log(e.target.value);
    const data = {
      value: e.target.value,
      id: e.target.id,
    };
    console.log(data);
    axios
      .post(`${backendServer}admin/review/approvePhotos`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.location = '/admin/allPhotos';
        }
      });
  };

  render() {
    console.log(this.state.photos);

    let renderReviews = [];
    const slice = this.state.photos.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    var paginationElement = (
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={<span className='gap'>...</span>}
        pageCount={
          Math.ceil(this.state.photos.length / this.state.perPage) > 0
            ? Math.ceil(this.state.photos.length / this.state.perPage)
            : 1
        }
        onPageChange={this.handlePageClick}
        forcePage={this.state.currentPage}
        containerClassName={'pagination'}
        previousLinkClassName={'previous_page'}
        nextLinkClassName={'next_page'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
    );
    renderReviews = slice.map((rev) => {
      let button1;
      let button2;
      if (rev.review_status === 'Pending') {
        button1 = (
          <Button
            id={rev._id}
            style={{ marginRight: '5px' }}
            variant='success'
            onClick={this.handleOnClick}
            value='Approved'>
            {' '}
            Approve{' '}
          </Button>
        );
        button2 = (
          <Button
            id={rev._id}
            variant='success'
            onClick={this.handleOnClick}
            value='Rejected'>
            {' '}
            Reject{' '}
          </Button>
        );
      } else if (rev.review_status === 'Rejected') {
        button1 = (
          <p style={{ color: 'red', fontSize: '20px' }}>
            <i class='fas fa-times-circle'></i>
          </p>
        );
      } else {
        button1 = (
          <p style={{ color: 'green', fontSize: '20px' }}>
            <i class='fas fa-check-square'></i>
          </p>
        );
      }
      return (
        <div>
          <br />
          <div class='card bg-light p-3'>
            <Image
              src={rev.s3Url}
              rounded
              style={{ height: '50%', width: '50%' }}
            />

            <h4 style={{ paddingTop: '10px' }}> {rev.company_name} </h4>
            <p style={{ marginLeft: '10px' }}> {rev.review_status}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p></p>
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  {button1}
                  {button2}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <Navigationbar />
        <div class='container'>
          <div className='row'>
            <div className='col-md-7'>
              <h1> All Photos</h1>
              {renderReviews}
              <center style={{ paddingLeft: '12%' }}>
                {paginationElement}
              </center>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default adminPhotos;
