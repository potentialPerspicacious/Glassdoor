import React, { Component } from 'react';
import {Modal,Col,Row,Form,Button,ButtonGroup,} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {insertNewSalaryDetails} from '../../../store/actions/studentSalaryAction';
import 'react-bootstrap/ModalHeader';
import axios from 'axios';
import backendServer from '../../../webConfig';
import SalaryList from './SalaryList';
import ReactPaginate from 'react-paginate';
import ScaleLoader from "react-spinners/ScaleLoader";

class AddSalary extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false,
      offset: 0,
      salary_items: [],
      perPage: 5,
      currentPage: 0,
     loading: true
     };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.salaryItems = this.salaryItems.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getSalary();
  }

  getSalary=()=> {
    console.log("function called.")
    setTimeout(() => {
        axios.get(`${backendServer}student/salary/${this.props.companyName}`,
        {headers: { Authorization: `${localStorage.getItem("token")}` }})
        .then(response => {
          console.log(response)
            const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.state.salary_items = []
            this.setState({
                salary_items: this.state.salary_items.concat(slice),
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
        this.getSalary()
    });

};

salaryItems = () => {
  console.log("this is called")
  var itemsRender = [], items, item;
  if (this.state && this.state.salary_items && this.state.salary_items.length > 0) {
      items = this.state.salary_items
      if (items.length > 0) {
          for (var i = 0; i < items.length; i++) {
              item = <SalaryList salary_items={items[i]}/>;
              itemsRender.push(item);
          }
      }
      console.log(itemsRender)
      return itemsRender;
  } 
};
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const salaryData = {
      company: this.state.company,
      base_salary: this.state.base_salary,
      currancy: this.state.currancy,
      bonus: this.state.bonus,
      job_title: this.state.job_title,
      year_of_experience: this.state.year_of_experience,
      location: this.state.location,
      sql_student_id: localStorage.getItem('sql_student_id'),
    };
    console.log(salaryData);
    this.props.insertNewSalaryDetails(salaryData);
    console.log(this.props.status);
    if (this.props.status === 'Inserted Successfully') {
      this.hideModal();
    }
  }

  render() {
    let error = {
      message: null
  }
  let success = {
      message: null
  }
  if(this.props.status === "Inserted Successfully"){
      success.message = "Successfully added your salary details."
      setTimeout(function() {window.location = '/student/contributions/salaries'}, 1500);
  } else if(this.state.server_status === 500){
      error.message = "Unable to make changes."
      setTimeout(function() {window.location = '/student/contributions/salaries'}, 2000);
  }
    let section,
    renderOutput = [];

    if (this.state && this.state.salary_items && this.state.salary_items.length > 0) {
        section = this.salaryItems(this.state.salary_items);
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
    if(this.state.salary_items.length > 0){
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
            <Col  md={{ span: 6, offset: 3 }}>
                <div class='row w-100  mt-5 p-5  border rounded'>
                  {renderOutput}
                </div>
                  {paginateElem}
           </Col>            
          <Col  md={{ span: 3, offset: 0 }}>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <Modal.Header closeButton onClick={this.hideModal}>
                <Modal.Title>Add a Salary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                  <h12>Your anonymous salary will help other job seekers.</h12>
                  <br></br>
                  <h6> Salary Details*</h6>
                  <Form.Group>
                    <Form.Label>Base Salary*</Form.Label>
                    <Form.Control
                      required={true}
                      type='text'
                      name='base_salary'
                      onChange={this.changeHandler}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Currency*</Form.Label>
                    <Form.Control
                      required={true}
                      type='text'
                      name='currancy'
                      onChange={this.changeHandler}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Bonus</Form.Label>
                    <Form.Control
                      type='number'
                      name='bonus'
                      onChange={this.changeHandler}
                    ></Form.Control>
                  </Form.Group>
                  <h6>Job Details*</h6>
                  <Form.Group>
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      required={true}
                      type='text'
                      name='company'
                      onChange={this.changeHandler}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Job Title*</Form.Label>
                    <Form.Control
                      required={true}
                      type='text'
                      name='job_title'
                      onChange={this.changeHandler}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Years of Experience*</Form.Label>
                    <Form.Control
                      required={true}
                      type='text'
                      name='year_of_experience'
                      onChange={this.changeHandler}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Location*</Form.Label>
                    <Form.Control
                      required={true}
                      type='text'
                      name='location'
                      onChange={this.changeHandler}
                    ></Form.Control>
                  </Form.Group>
                  <ButtonGroup aria-label='First group' className='mt-2'>
                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                  </ButtonGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>

            <Button variant='primary' onClick={this.showModal}>
              + Add Salary
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  }

AddSalary.propTypes = {
  insertNewSalaryDetails: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  salary: state.salary,
  status: state.salary.status
});
const mapDispatchToProps = (dispatch) => {
  return {
    insertNewSalaryDetails: (data) => dispatch(insertNewSalaryDetails(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSalary);
